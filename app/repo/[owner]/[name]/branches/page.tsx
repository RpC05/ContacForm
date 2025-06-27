import { BranchesPage } from "@/components/branches-page"

export default function RepoBranchesPage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <BranchesPage owner={params.owner} name={params.name} />
}
