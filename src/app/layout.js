import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import { Container } from "./page.module";

import { ThemeProvider } from "@/contexts/themeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Collection App",
    description: "Developed by andria",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <Container>
                        <AuthProvider>
                            <Navbar />
                            {children}
                        </AuthProvider>
                    </Container>
                </ThemeProvider>
            </body>
        </html>
    );
}
