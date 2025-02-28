import { render, screen } from "@testing-library/react";
import UserItem from "@/app/components/UserItem";

jest.mock("@/app/components/RepoCard", () => jest.fn(() => <div>Mock RepoCard</div>));
jest.mock("@/components/ui/accordion", () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("UserItem Component", () => {
  const mockUser = {
    id: 1,
    login: "testUser",
    avatar_url: "https://example.com/avatar.jpg",
    html_url: "https://github.com/testUser",
  };

  test("renders user details correctly", () => {
    render(<UserItem user={mockUser} repos={[]} loadingRepos={false} />);

    expect(screen.getByText("testUser")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "testUser" })).toHaveAttribute("src", mockUser.avatar_url);
    expect(screen.getByRole("link", { name: "testUser" })).toHaveAttribute("href", mockUser.html_url);
  });

  test("displays 'No repositories found' when there are no repositories", () => {
    render(<UserItem user={mockUser} repos={[]} loadingRepos={false} />);
    
    expect(screen.getByText("No repositories found.")).toBeInTheDocument();
  });

  test("shows loading skeleton when repositories are loading", () => {
    const { container } = render(<UserItem user={mockUser} repos={[]} loadingRepos={true} />);

    expect(container.querySelector("p")).not.toBeInTheDocument(); // No "No repositories found."
  });

  test("renders repository list when repositories are available", () => {
    const mockRepos = [{ id: 1, name: "Repo1" }];
    
    render(<UserItem user={mockUser} repos={mockRepos} loadingRepos={false} />);
    
    expect(screen.getByText("Mock RepoCard")).toBeInTheDocument();
  });

});