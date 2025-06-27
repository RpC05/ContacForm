import { RepositoryMusicspace } from "@/components/repository-musicspace"

export default function RepoMusicspacePage({
  params,
}: {
  params: { owner: string; name: string }
}) {
  return <RepositoryMusicspace owner={params.owner} name={params.name} />
}
