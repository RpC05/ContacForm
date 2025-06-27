import { RepositoryPage } from "@/components/repository-page"

export default function RepoPage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <RepositoryPage owner={params.owner} name={params.name} />
}
