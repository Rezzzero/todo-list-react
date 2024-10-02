import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Navbar } from "./Navbar";
import { UserProvider } from "../../contexts/user/UserProvider";
import { TasksProvider } from "../../contexts/task/TaskContext";
import { MemoryRouter } from "react-router-dom";
import { TestUser } from "../../types/UserTypes";

const MockUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: TestUser | null;
}) => {
  return <UserProvider value={user}>{children}</UserProvider>;
};

describe("Navbar", () => {
  test("navbar render without errors", () => {
    render(
      <MemoryRouter>
        <MockUserProvider user={null}>
          <TasksProvider>
            <Navbar />
          </TasksProvider>
        </MockUserProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/TaskManager/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  test("opens modal when edit icon is clicked", async () => {
    const mockUser = {
      user: {
        user_metadata: {
          username: "testuser",
          full_name: "Test User",
          avatar_url: "https://example.com/avatar.jpg",
        },
        id: "123",
      },
    };

    render(
      <MemoryRouter>
        <MockUserProvider user={mockUser}>
          <TasksProvider>
            <Navbar />
          </TasksProvider>
        </MockUserProvider>
      </MemoryRouter>
    );

    const avatarEditIcon = screen.getByTestId("avatar-edit-icon");
    fireEvent.click(avatarEditIcon);

    await waitFor(() => {
      expect(screen.getByText(/Обновить фото/i)).toBeInTheDocument();
    });
  });
});
