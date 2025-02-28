import LoadingSkeleton from "./LoadingSkeleton";
import UserItem from "./UserItem";

const UserList = ({ users, loadingUsers, repoQueries }: { users:any, loadingUsers:any, repoQueries:any }) => (
  <>
    {loadingUsers && Array(15).fill(0).map((_, index) => <LoadingSkeleton key={index} userIndex={index} />)}
    
    {!loadingUsers && users?.map((user:any, index:number) => {
      const { data: repos = [], isLoading: loadingRepos } = repoQueries[index] || {};
      return <UserItem key={user.id} user={user} repos={repos} loadingRepos={loadingRepos} />;
    })}
  </>
);

export default UserList;
