import { PullRequestsPage } from "@/components/pull-requests-page"

export default function RepoPullsPage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <PullRequestsPage owner={params.owner} name={params.name} />
}
