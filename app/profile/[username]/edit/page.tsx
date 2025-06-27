import { ProfileEditPage } from "@/components/profile-edit-page"

export default function ProfileEdit({
  params,
}: {
  params: { username: string }
}) {
  return <ProfileEditPage username={params.username} />
}
