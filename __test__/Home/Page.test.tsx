import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import useUserRepos from "@/app/hooks/useUserRepos";
import useUserSearch from "@/app/hooks/useUserSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

jest.mock("@/app/page", () => {
  const actualModule = jest.requireActual("@/app/page");
  return {
    __esModule: true,
    ...actualModule, 
    useUserSearch: jest.fn(), 
    useUserRepos: jest.fn(),
  };
});

const mockedUseUserRepos = useUserRepos as jest.Mock;

jest.mock("@/app/components/SearchForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: { username: string }) => void }) => (
    <div data-testid="search-form">
      <button onClick={() => onSubmit({ username: "newUser" })}>
        Submit Search
      </button>
    </div>
  ),
}));

jest.mock("@/app/components/Pagination", () => ({
  __esModule: true,
  default: ({
    currentPage,
    setCurrentPage,
    totalPages,
  }: {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
  }) => (
    <div data-testid="pagination-component">
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  ),
}));

jest.mock("@/app/components/UserList", () => ({
  __esModule: true,
  default: ({
    users,
    loadingUsers,
    repoQueries,
  }: {
    users?: Array<{ login: string }>;
    loadingUsers: boolean;
    repoQueries: any;
  }) => (
    <div data-testid="user-list">
      {loadingUsers ? (
        <span>Loading...</span>
      ) : (
        users?.map((user) => <div key={user.login}>{user.login}</div>)
      )}
    </div>
  ),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search form, user list, and pagination", async () => {

    renderWithClient(<Home />);

    // WORKS
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("user-list")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-component")).toBeInTheDocument();

  });

  it("updates the search query and resets the page when the form is submitted", async () => {

    renderWithClient(<Home />);

    fireEvent.click(screen.getByText("Submit Search"));

  });
});