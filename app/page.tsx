'use client'

import { useState } from "react"
import {
  Accordion,
} from "@/components/ui/accordion"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQuery, useQueries } from "@tanstack/react-query";

import SearchForm from "@/app/components/SearchForm"
import UserList from "@/app/components/UserList";
import PaginationComponent from "@/app/components/Pagination"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
})

export const useUserSearch = (searchQuery: string, page: number) => {
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

export const useUserRepos = (users: any[]) => {
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


const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("zam");

  const { data:users, isLoading: loadingUsers } = useUserSearch(searchQuery, currentPage);
  const repoQueries = useUserRepos(users?.users || []);

  const totalUsers = users?.total_count || 0;
  const totalPages = Math.ceil(totalUsers / 20);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    setSearchQuery(values.username)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-[400px] w-full mx-auto h-screen text-xs font-medium flex flex-col scrollbar-hide overflow-y-none overflow-x-none">
      <SearchForm form={form} onSubmit={onSubmit}/>      
      <Accordion type="single" collapsible>
        <UserList users={users?.users} loadingUsers={loadingUsers} repoQueries={repoQueries} />
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </Accordion>
    </div>
  );
}

export default Home