import { ComparePage } from "@/components/compare-page"

export default function Compare({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <ComparePage owner={params.owner} name={params.name} />
}
