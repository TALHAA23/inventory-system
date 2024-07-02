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
      <body className="lg:grid grid-cols-[300px_auto]">
        <SideMenu />
        <section>
          <NavBar />
          {children}
        </section>
      </body>
    </html>
  );
}
