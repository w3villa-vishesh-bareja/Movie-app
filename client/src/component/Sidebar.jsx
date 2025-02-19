import { useState, useEffect } from "react";
import { FaHome, FaSearch, FaBookmark, FaCog, FaSignOutAlt } from "react-icons/fa";
import { RiMovie2Line } from "react-icons/ri";
import { HiDownload } from "react-icons/hi";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineUpcoming } from "react-icons/md";
import SidebarMenu from "./SidebarMenu";

const menuData = [
  {
    heading: "Menu",
    items: [
      { title: "Home", icon: FaHome },
      { title: "Discovery", icon: FaSearch },
      { title: "Coming Soon", icon: MdOutlineUpcoming },
      { title: "Recent", icon: BsClockHistory },
    ],
  },
  {
    heading: "Library",
    items: [
      { title: "Bookmarked", icon: FaBookmark },
      { title: "Top Rated", icon: RiMovie2Line },
      { title: "Downloaded", icon: HiDownload },
    ],
  },
  {
    heading: "Settings",
    items: [
      { title: "Settings", icon: FaCog },
      { title: "Logout", icon: FaSignOutAlt },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Home");

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`h-screen bg-zinc-950  text-white p-5 ${isOpen ? "w-70" : "w-20"}`}>
      <div>
        {menuData.map((section, index) => (
          <SidebarMenu 
            key={index} 
            isOpen={isOpen} 
            heading={section.heading} 
            items={section.items} 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem} 
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
