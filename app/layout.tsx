import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import NavBar from "./_components/NavBar";
import SideMenu from "./_components/SideMenu";
import "./globals.css";
export const metadata = {
  title: "Inventory Mangment System",
  description: "An e-commerece inventary system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer position="top-right" />
        <div className="lg:grid grid-cols-[300px_auto] min-h-screen">
          <SideMenu />
          <section>
            <NavBar />
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
