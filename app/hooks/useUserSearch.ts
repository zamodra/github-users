import { useQuery } from "@tanstack/react-query";

const useUserSearch = (searchQuery: string, page: number) => {
  return useQuery({
    queryKey: ["users", searchQuery, page],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}&per_page=20&page=${page}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        } 
      });
      const data = await response.json();
      return {
        users: data.items || [],
        total_count: data.total_count,
      };
    },
    enabled: !!searchQuery,
    staleTime: 60000,
  });
};

export default useUserSearch;