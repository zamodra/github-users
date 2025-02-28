import { renderHook, waitFor } from "@testing-library/react";
import useUserSearch from "@/app/hooks/useUserSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

global.fetch = jest.fn();

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }
);
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useUserSearch Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  it("fetches users from GitHub API when searchQuery is provided", async () => {
    const mockData = {
      items: [{ login: "testuser", id: 1 }],
      total_count: 1,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
      ok: true,
    });

    const { result } = renderHook(() => useUserSearch("test", 1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(fetch).toHaveBeenCalledWith(
      "https://api.github.com/search/users?q=test&per_page=20&page=1",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(result.current.data).toEqual({
      users: [{ login: "testuser", id: 1 }],
      total_count: 1,
    });
  });

  it("does not fetch when searchQuery is empty", async () => {
    const { result } = renderHook(() => useUserSearch("", 1), { wrapper: createWrapper() });

    expect(result.current.isFetching).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("handles API errors gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockRejectedValueOnce(new Error("API Error")),
      ok: false,
    });

    const { result } = renderHook(() => useUserSearch("",0), { wrapper: createWrapper() });

    await waitFor(() => expect(!result.current.data).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});