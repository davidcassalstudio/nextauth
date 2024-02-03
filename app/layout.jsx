import AuthProvider from "@/components/AuthProvider"
import { Header } from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
