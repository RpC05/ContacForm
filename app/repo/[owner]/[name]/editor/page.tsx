import { EditorPage } from "@/components/editor-page"

export default function RepoEditorPage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <EditorPage owner={params.owner} name={params.name} />
}
