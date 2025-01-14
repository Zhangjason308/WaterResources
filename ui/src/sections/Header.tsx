import Logo from "../assets/logo-apex.png";
import Image from 'next/image';
import MenuIcon from "../assets/menu.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-md">
      <div className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <MenuIcon className="h-6 w-6 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">About Us</a>
              <a href="#">Map</a>
              <a href="#">Post</a>
              <a href="#">Contact Us</a>
            </nav>
          </div>
        </div>
      </div>
    </header> 
  )
};
