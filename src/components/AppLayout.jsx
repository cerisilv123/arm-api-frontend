/**
 * AppLayout.js
 * 
 * AppLayout is a layout component that serves as a container for the main content of a page, 
 * alongside common components like Navbar and Sidebar. The layout dynamically adjusts based on the state of the sidebar.
 *
 * The component expects two props:
 * - isSidebarExpanded (bool): Determines whether the sidebar is expanded or not. This influences the margin applied 
 *   to the main content area to ensure it doesn't overlap with the sidebar.
 * - children (node): The content to be rendered within the layout. This can be any React component or HTML element.
 *
 * The layout includes:
 * - Navbar: A top navigation bar that remains constant across different pages.
 * - Sidebar: A vertical navigation menu that can be expanded or collapsed.
 * - A main content area where children components are rendered. The margin of this area is adjusted based on the 
 *   state of the sidebar to maintain a cohesive layout.
 *
 * PropTypes are used for type checking the props to ensure they are of the correct type and passed correctly by 
 * parent components.
 */

import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppLayout = ({ isSidebarExpanded, children }) => {
    
  return (
    <div className='flex'>
        <Navbar/>
        <Sidebar/>
        <div className={`flex-grow w-full mt-20 mr-24 px-8 ${isSidebarExpanded ? 'ml-96' : 'ml-28'}`}>
            {children}
        </div>
    </div>
  );
};

AppLayout.propTypes = {
  isSidebarExpanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default AppLayout;