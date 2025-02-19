import SidebarHeadings from "./SidebarHeadings";

const SidebarMenu = ({ isOpen, heading, items, selectedItem, setSelectedItem }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <h3 className="cursor-pointer hover:text-red-500 mb-2 text-gray-400">{isOpen ? heading : ""}</h3>
      <ul className="space-y-4 mb-2">
        {items.map((item, index) => (
          <SidebarHeadings 
            key={index} 
            icon={item.icon} 
            heading={isOpen ? item.title : ""} 
            isActive={selectedItem === item.title} 
            onClick={() => setSelectedItem(item.title)} 
          />
        ))}
      </ul>
      <div className="border-b border-gray-400"></div>
    </div>
  );
};

export default SidebarMenu;
