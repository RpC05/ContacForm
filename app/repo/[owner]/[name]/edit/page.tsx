import { EditorPage } from "@/components/editor-page"

export default function RepoEditPage({
  params,
  searchParams,
}: {
  params: { owner: string; name: string }
  searchParams: { branch?: string; fork?: string }
}) {
  return <EditorPage owner={params.owner} name={params.name} branch={searchParams.branch} fork={searchParams.fork} />
}
