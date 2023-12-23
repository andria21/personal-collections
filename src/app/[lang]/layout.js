import { Inter, Open_Sans, Montserrat } from "next/font/google";
import "./globals.scss";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.scss";

import { ThemeProvider } from "@/contexts/themeContext";
import { SearchProvider } from "@/contexts/searchContext";
import { UsersProvider } from "@/contexts/usersContext";
import { TagsProvider } from "@/contexts/tagsSearchContext";
import NewNavbar from "@/components/new-navbar/NewNavbar";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: "500" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Collection App",
  description: "Developed by andria",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body
        className={`${montserrat.className} theme dark`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <UsersProvider>
            <ThemeProvider>
              <SearchProvider>
                <TagsProvider>
                  <div className={styles.container}>
                    <NewNavbar params={params} />
                    {children}
                  </div>
                </TagsProvider>
              </SearchProvider>
            </ThemeProvider>
          </UsersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
