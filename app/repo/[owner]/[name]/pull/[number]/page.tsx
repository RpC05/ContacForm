import { PullRequestDetailPage } from "@/components/pull-request-detail-page"

export default function PullRequestDetail({
  params,
}: {
  params: { owner: string; name: string; number: string }
}) {
  return <PullRequestDetailPage owner={params.owner} name={params.name} number={Number.parseInt(params.number)} />
}
