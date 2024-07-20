"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks: { title: string; path: string }[] = [
  { title: "home", path: "/" },
  { title: "listing", path: "/listing" },
  { title: "shop", path: "/shop" },
  { title: "low stock-alerts", path: "/stock-alerts" },
  { title: "export data", path: "/export" },
];
const SideMenu = () => {
  const pathname = usePathname();
  return (
    <aside
      id="side-menu"
      className="bg-color-2 scale-x-0 origin-left lg:scale-x-100 fixed z-50 h-full w-[300px] lg:sticky lg:max-h-screen lg:w-auto top-0 capitalize text-white gap-2 flex items-center transition-all duration-100 ease-in"
    >
      <ul className="w-full mx-2 space-y-1">
        {NavLinks.map((item, index) => (
          <li
            key={index}
            className="menu-list-item w-full px-2 rounded  onHover-bg-color-5 hover:font-bold"
          >
            <Link
              href={item.path}
              className={
                pathname == item.path ? "block active-link py-1" : "block py-1"
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
