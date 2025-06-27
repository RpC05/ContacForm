import { IssuesPage } from "@/components/issues-page"

export default function RepoIssuesPage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <IssuesPage owner={params.owner} name={params.name} />
}
