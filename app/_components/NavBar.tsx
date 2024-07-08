import Link from "next/link";

const NavBar = () => {
  return (
    <nav className=" bg-color-3 h-[60px] px-2 sticky z-50 top-0 font-bold text-2xl text-white flex items-center justify-between">
      <label htmlFor="menu-toggler" className="h-full aspect-square lg:hidden">
        <img
          src="/icons/menu-dots-square-svgrepo-com.svg"
          alt="toggle-menu"
          className=" h-full aspect-square"
        />
      </label>
      <input id="menu-toggler" type="checkbox" hidden />
      <Link href=".">E-commerce Inventory</Link>
    </nav>
  );
};

export default NavBar;
