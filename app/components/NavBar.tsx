import Link from "next/link";
import AuthButton from "./AuthButton";

export default function NavBar() {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link
        href="/"
        className="font-bold text-gray-700 text-2xl"
      >
        OpenTable
      </Link>
      <div>
        <div className="flex mr-6">
          <AuthButton isSignIn={true} />
          <AuthButton isSignIn={false} />
        </div>
      </div>
    </nav>
  );
}
