import useProfile, { UserData } from "@/hooks/useProfile";
import Link from "next/link";

interface Props {
  profileListData: UserData[];
}
export default function ProfileList({ profileListData }: Props) {
  profileListData.sort((a, b) => (a.email > b.email ? 1 : -1));
  return (
    <div>
      {profileListData.map((p) => (
        <Link href={`/profile/${p.email}`}>
          <p>
            {p.email} - {p.first_name} {p.last_name}
          </p>
        </Link>
      ))}
    </div>
  );
}
