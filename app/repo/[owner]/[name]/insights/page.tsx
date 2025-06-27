import { InsightsPage } from "@/components/insights-page"

export default function RepoInsights({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <InsightsPage owner={params.owner} name={params.name} />
}
