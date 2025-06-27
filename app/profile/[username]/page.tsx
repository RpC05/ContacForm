import { ProfilePage } from "@/components/profile-page"

export default function Profile({
  params,
}: {
  params: { username: string }
}) {
  return <ProfilePage username={params.username} />
}
