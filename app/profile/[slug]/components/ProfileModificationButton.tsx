import useProfile, { UserData } from "@/hooks/useProfile";

interface Props {
  profileData: UserData | null;
}
export default function ProfileModificationButton({ profileData }: Props) {
  return <div>Profile Modification Button</div>;
}
