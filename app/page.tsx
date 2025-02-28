'use client'

import { useState } from "react"
import {
  Accordion,
} from "@/components/ui/accordion"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import SearchForm from "@/app/components/SearchForm"
import UserList from "@/app/components/UserList";
import PaginationComponent from "@/app/components/Pagination"

import useUserRepos from "./hooks/useUserRepos"
import useUserSearch from "./hooks/useUserSearch"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
})


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
    <div className="max-w-[400px] p-3 w-full mx-auto h-screen text-xs font-medium flex flex-col scrollbar-hide overflow-y-none overflow-x-none">
      <SearchForm form={form} onSubmit={onSubmit}/>      
      <Accordion type="single" collapsible>
        <UserList users={users?.users} loadingUsers={loadingUsers} repoQueries={repoQueries} />
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </Accordion>
    </div>
  );
}

export default Home