import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test, describe, vi, beforeAll } from "vitest";
import { AuthComponent } from "./AuthComponent";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../../contexts/user/UserProvider";
import { TasksProvider } from "../../contexts/task/TaskContext";
import supabase from "../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import type * as ReactRouterDOM from "react-router-dom";

vi.mock("../../utils/supabaseClient", () => ({
  __esModule: true,
  default: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      getSession: vi.fn().mockResolvedValue({
        data: { session: { user: { email: "test@example.com" } } },
      }),
      onAuthStateChange: vi.fn().mockImplementation((callback) => {
        callback("SIGNED_IN", { user: { email: "test@example.com" } });
        return () => {};
      }),
    },
    from: vi.fn().mockImplementation(() => {
      return {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [{ id: "1", name: "Sample Task List" }],
            error: null,
          }),
        }),
      };
    }),
    channel: vi.fn().mockImplementation(() => {
      return {
        on: vi.fn().mockReturnValue({
          subscribe: vi.fn().mockResolvedValue({}),
        }),
      };
    }),
    removeChannel: vi.fn().mockImplementation(() => {
      return {
        on: vi.fn().mockReturnValue({
          unsubscribe: vi.fn().mockResolvedValue({}),
        }),
      };
    }),
  },
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof ReactRouterDOM;
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

beforeAll(() => {
  window.alert = vi.fn();
});

describe("AuthComponent", () => {
  const MockAuthComponent = ({ url }: { url: string }) => {
    return <AuthComponent url={url} />;
  };

  test("handleSubmit triggers sing in successfully", async () => {
    const mockSignIn = supabase.auth.signInWithPassword as ReturnType<
      typeof vi.fn
    >;
    const mockNavigate = useNavigate as ReturnType<typeof vi.fn>;
    mockSignIn.mockResolvedValue({ error: null });
    mockNavigate.mockReturnValue(() => {});

    render(
      <MemoryRouter>
        <UserProvider value={null}>
          <TasksProvider>
            <MockAuthComponent url="/login" />
          </TasksProvider>
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter an email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(mockNavigate).toHaveBeenCalled();
  });

  test("handle submit triggers sign up successfully", async () => {
    const mockSignUp = supabase.auth.signUp as ReturnType<typeof vi.fn>;
    mockSignUp.mockResolvedValue({ error: null });

    render(
      <MemoryRouter>
        <UserProvider value={null}>
          <TasksProvider>
            <MockAuthComponent url="/register" />
          </TasksProvider>
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter an email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter a password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: {
          data: {
            username: "testuser",
            avatar:
              "https://i.pinimg.com/736x/0a/bf/33/0abf33085bcf7d2f4697a348931f679d.jpg",
          },
        },
      });
    });
  });
});
