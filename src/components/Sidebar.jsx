/**
 * Sidebar component for navigation in the application.
 * 
 * This component renders a sidebar with various navigation options like 'Dashboard', 'Applications', and 'Support'.
 * It allows toggling between expanded and collapsed states, and highlights the currently selected item.
 * Additional features include displaying a badge for extra information and handling navigation via React Router's `useNavigate`.
 * 
 * @component
 * 
 * @example
 * return (
 *   <Sidebar />
 * );
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload, MdOutlineQuestionMark } from 'react-icons/md';
import { TbFileAnalytics } from "react-icons/tb";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";

import badge from './badge.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState('applications');
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleItemClick = (item, path) => {
    setSelectedItem(item);
    navigate(path);
  };

  const getStyleForItem = (item) => {
    if (item === selectedItem) {
      return "bg-gray-950 fill-gray-950 text-white";
    } else {
      return "text-gray-950";
    }
  };

  return (
    <div className={`fixed top-0 transition-width duration-300 ${isOpen ? 'w-56' : 'w-0'} h-full flex flex-col border-r border-gray-200`}>
      <div className="flex items-center mt-6">
        {isOpen && (
          <span className="text-md font-bold text-gray-950 ml-6">upsellr.</span>
        )}
        <div className={`ml-auto ${isOpen ? 'mr-6' : 'ml-6'}`}>
          {
            isOpen ? 
              <GoSidebarCollapse size={20} className="cursor-pointer" onClick={toggleSidebar} /> :
              <GoSidebarExpand size={20} className="cursor-pointer" onClick={toggleSidebar} />
          }
        </div>
      </div>
      {isOpen && (
        <>
        <div>
          <div className={`text-gray-950 flex items-center mt-7 ml-2 mr-4 p-2 rounded-xl space-x-2 cursor-pointer`}>
            <span className="font-medium text-xs">Main tools</span>
          </div>
          <div className={`flex items-center ml-4 mr-4 p-2 rounded-lg space-x-2 cursor-pointer ${getStyleForItem('dashboard')}`} onClick={() => handleItemClick('upload', '/upload')}>
            <MdOutlineFileUpload size={20} />
            <span className="font-medium text-sm">Upload data</span>
          </div>
          <div className={`flex items-center ml-4 mr-4 p-2 rounded-lg space-x-2 cursor-pointer ${getStyleForItem('applications')}`} onClick={() => handleItemClick('results', '/results')}>
            <TbFileAnalytics size={20} />
            <span className="font-medium text-sm">Results</span>
          </div>
        </div>
        <div className="mb-4 mt-auto">
          <div className={`text-slate-500 flex items-center mt-7 ml-2 mr-4 p-2 rounded-xl space-x-2 cursor-pointer`}>
            <span className="font-medium text-xs">Support and help</span>
          </div> 
          <div className={`flex items-center ml-4 mr-4 p-2 rounded-lg space-x-2 cursor-pointer ${getStyleForItem('get-help')}`} onClick={() => handleItemClick('get-help', '/get-help')}>
            <MdOutlineQuestionMark size={20} />
            <span className="font-medium text-sm">Get help</span>
          </div>  
          <div className="items-center px-5 py-4 rounded-lg mt-2 ml-3 mr-3 border shadow-md bg-gradient-to-bl from-gray-200 from-10% via-white via-30% to-white to-90%">
            <div className="flex">
              <div className="mb-3  mr-2 rounded-full">
                <img src={badge} alt="Find out more star" className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="mb-4 mt-1 text-md font-semibold text-slate-700">DOCS</h3>
            </div>
            <p className="mb-3 text-xs font-medium text-slate-600">
              Check out the documentation for the API.
            </p>
            <button className="px-6 py-2 border border-transparent text-xs font-normal rounded-md text-white bg-gray-950 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Take me there
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;