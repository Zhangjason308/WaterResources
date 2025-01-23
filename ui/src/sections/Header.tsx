import Logo from "../assets/ottawa.png";
import Image from 'next/image';
import MenuIcon from "../assets/menu.svg";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-6">
        <div className="container">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <MenuIcon className="h-6 w-6 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <Link href="#about">
                About Us
              </Link>
              <Link href="#tutorial">
                Tutorial
              </Link>
              <a href="#map">Map</a>
              <a href="#">Contact Us</a>
            </nav>
          </div>
        </div>
      </div>
    </header> 
  )
};
