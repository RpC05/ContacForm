import { CodespacePage } from "@/components/codespace-page"

export default function RepoCodespacePage({
  params,
  searchParams,
}: {
  params: { owner: string; name: string }
  searchParams: { branch?: string }
}) {
  return <CodespacePage owner={params.owner} name={params.name} branch={searchParams.branch} />
}
