import { useQueries } from "@tanstack/react-query";

const useUserRepos = (users: any[]) => {
  return useQueries({
    queries: users.map((user) => ({
      queryKey: ["repos", user.login],
      queryFn: async () => {
        const response = await fetch(`https://api.github.com/users/${user.login}/repos?&per_page=10`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
          }
        });

        return response.json();
      },
      staleTime: 60000,
    })),
  });
};

export default useUserRepos;
