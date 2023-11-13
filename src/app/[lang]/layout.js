import { Inter, Open_Sans } from "next/font/google";
import "./globals.scss";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import styles from "./page.module.scss";

import { ThemeProvider } from "@/contexts/themeContext";
import { SearchProvider } from "@/contexts/searchContext";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: "500" });

export const metadata = {
  title: "Collection App",
  description: "Developed by andria",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body className={openSans.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <ThemeProvider>
            <SearchProvider>
              <div className={styles.container}>
                <Navbar params={params} />
                {children}
              </div>
            </SearchProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
