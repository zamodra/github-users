import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CardSkeleton } from "./LoadingSkeleton";
import RepoCard from "./RepoCard";

const UserItem = ({ user, repos, loadingRepos }: { user:any, repos:any, loadingRepos:any }) => {
  const NO_REPOSITORIES = (!repos.length || !repos) && !loadingRepos;
  return (
    <AccordionItem key={user.id} value={`user-${user.id}`}>
      <AccordionTrigger>
        <div className="flex gap-2 flex-row items-center">
          <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full" />
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {NO_REPOSITORIES && <p style={{ textAlign: "center" }}>No repositories found.</p>}
        {loadingRepos && <CardSkeleton />}
        {!loadingRepos && repos.map((repo:any) => <RepoCard key={repo.id} repo={repo} />)}
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserItem;