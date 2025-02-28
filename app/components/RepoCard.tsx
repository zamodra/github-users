import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const RepoCard = ({ repo }: { repo:any }) => (
  <Card key={repo.id} className="mb-2">
    <CardHeader className="flex flex-row justify-between">
      <CardTitle>{repo.name}</CardTitle>
      <div className="flex flex-row gap-2">
        <CardTitle>{repo.stargazers_count}</CardTitle>
        <i className="fa-solid fa-star"></i>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{repo.description || "No description available"}</CardDescription>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        View Repository
      </a>
    </CardContent>
  </Card>
);

export default RepoCard
