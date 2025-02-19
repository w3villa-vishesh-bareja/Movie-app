function SidebarHeadings({ icon: Icon, heading, isActive, onClick }) {
    return (
      <li 
        className={`flex items-center gap-4 text-xl cursor-pointer text-gray-400 hover:text-red-500 ${isActive ? "text-red-500" : ""}`} 
        onClick={onClick}
      >
        <Icon size={20} /> {heading}
      </li>
    );
  }
  
  export default SidebarHeadings;
  