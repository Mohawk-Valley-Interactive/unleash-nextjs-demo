import NavBar from "./components/NavBar";
import AuthenticationProvider from "./context/AuthorizationProvider";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <AuthenticationProvider>
          <div className="bg-gray-100 min-h-screen w-screen">
            <div className="max-w-screen-2xl m-auto bg-white text-black">
              <NavBar />
              {children}
            </div>
          </div>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
