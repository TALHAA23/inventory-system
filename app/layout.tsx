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
      <body className="grid grid-rows-[60px_minmax(calc(100vh-60px),auto)] grid-cols-[200px_auto]">
        <nav className="bg-red-700 col-span-full"></nav>
        <aside className=" bg-blue-600">menu</aside>
        {children}
      </body>
    </html>
  );
}
