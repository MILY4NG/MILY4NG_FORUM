import { Inter } from "next/font/google";
import  "bootstrap/dist/css/bootstrap.css"
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import BootStrapClient from "./components/bootstrapclient";
import LogoutButton from "./logoutbutton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MILY4NG FORUM",
  description: "MILY4NG FORUM",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
          <div className="container-fluid" data-bs-theme="dark">
            <Link href="/" className="navbar-brand">게시판</Link>
            
            {
              session ?
              <div className="dropdown-center">
                <Link href="/write">글쓰기</Link>
                <a className="dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                  {session.user.name}
                </a>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li><LogoutButton></LogoutButton></li>
                </ul>
              </div>
              :
              <div className="d-flex" role="search">
                <Link href="/signin">로그인</Link>
              </div>
            }
              

          </div>
        </nav>

        <div>{children}</div>
        
        <BootStrapClient></BootStrapClient>
        <footer className="col-12 p-4 mx-auto border-3 border-top text-center" style={{height: "200px", color: 'lightgray'}}>
           MADE BY MILY4NG 
        </footer>
      </body>
    </html>
  );
}
