import { render, screen, fireEvent, act } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { ChangeAvatar } from "./ChangeAvatar";
import { UserProvider } from "../../contexts/user/UserProvider";
import { TestUser } from "../../types/UserTypes";

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
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: null, error: null }),
        getPublicUrl: vi
          .fn()
          .mockReturnValue({ publicUrl: "https://example.com/avatar.jpg" }),
      }),
    },
  },
}));

vi.mock("../../contexts/user/useUser", () => ({
  useUser: vi.fn(() => ({
    user: {
      user_metadata: {
        username: "testuser",
        full_name: "Test User",
        avatar_url: "https://example.com/avatar.jpg",
      },
      id: "123",
    },
  })),
}));

const MockUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: TestUser | null;
}) => {
  return <UserProvider value={user}>{children}</UserProvider>;
};

describe("ChangeAvatar Component", () => {
  const mockUser = {
    user_metadata: {
      username: "testuser",
      full_name: "Test User",
      avatar_url: "https://example.com/avatar.jpg",
    },
    id: "123",
  };

  const mockOnUpload = vi.fn();
  const mockOnClose = vi.fn();

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn().mockReturnValue("mocked_url");

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      drawImage: vi.fn(),
      toDataURL: vi.fn().mockReturnValue("mocked_data_url"),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders ChangeAvatar component", async () => {
    await act(async () => {
      render(
        <MockUserProvider user={mockUser}>
          <ChangeAvatar onUpload={mockOnUpload} onClose={mockOnClose} />
        </MockUserProvider>
      );
    });

    expect(screen.getByText(/Обновить фото/i)).toBeInTheDocument();
    expect(screen.getByTestId("avatar-upload-input")).toBeInTheDocument();
  });

  test("uploads new avatar", async () => {
    await act(async () => {
      render(
        <MockUserProvider user={mockUser}>
          <ChangeAvatar onUpload={mockOnUpload} onClose={mockOnClose} />
        </MockUserProvider>
      );
    });

    const input = screen.getByTestId("avatar-upload-input");

    const file = new File(["dummy content"], "avatar.jpg", {
      type: "image/jpeg",
    });

    Object.defineProperty(input, "files", {
      value: [file],
    });

    await act(async () => {
      fireEvent.change(input);
    });

    const cropButton = screen.getByText("Сохранить");
    expect(cropButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(cropButton);
    });
  });
});
