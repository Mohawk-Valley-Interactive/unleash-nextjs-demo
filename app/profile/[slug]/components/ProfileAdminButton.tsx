import { UserData } from "@/hooks/useProfile";

interface Props {
  profileData: UserData | null;
}

export default function ProfileAdminButton({ profileData }: Props) {
  return profileData && profileData.admin ? <p>Profile Admin Button</p> : <></>;
}
