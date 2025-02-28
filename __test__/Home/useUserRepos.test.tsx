import { renderHook, waitFor } from "@testing-library/react";
import { useUserRepos } from "@/app/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';

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

describe('useUserRepos Hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches repositories for a user successfully', async () => {
    const mockRepos = [{ id: 1, name: 'Repo1' }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRepos),
      } as Response)
    );

    const users = [{ login: 'testuser' }];

    const { result } = renderHook(() => useUserRepos(users), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current[0].data).toEqual(mockRepos);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/testuser/repos?&per_page=10',
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
        },
      }
    );
  });

  it('handles API fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject(new Error("Repo API error")),
      } as Response)
    );
    const users = [{ login: "invalid_user" }];

    const { result } = renderHook(() => useUserRepos(users), {
      wrapper: createWrapper(),
    });
  
    await waitFor(() => expect(result.current[0].isPending).toBeTruthy());
    await waitFor(() => expect(!result.current[0].data).toBe(true));
    expect(result.current[0].error).toBeInstanceOf(Error);

  });
});