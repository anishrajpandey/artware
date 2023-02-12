import "./globals.css";
import Navbar from "./Navbar";
import ContextProvider from "@/context/useContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Navbar />

          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
