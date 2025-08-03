"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSideBar } from "@/utils/store/sidebar";

type NavbarProps = {
  heading: string;
};

const Navbar: React.FC<NavbarProps> = ({ heading }) => {
  const dispatch = useDispatch();

  const openSidebar = () => {
    dispatch(setSideBar(true));
    console.log("Sidebar open triggered");
  };

  return (
    <div className="navbar">
      <div className="navbar-leftSection">
        <Image
          src="/images/sidebar.png"
          alt="sidebar icon"
          width={30}
          height={30}
          className="sidebar-logo"
          onClick={openSidebar}
        />
        <div className="navbar-heading">{heading}</div>
      </div>

      <div className="navbar-icons">
        <Image
          src="/images/navbar-mail.png"
          alt="mail icon"
          width={24}
          height={24}
        />
        <Image
          src="/images/navbar-bell.png"
          alt="notification icon"
          width={24}
          height={24}
        />
        <Image
          src="/images/navbar-user.jpg"
          alt="user icon"
          width={34}
          height={38}
          className="user-icon"
        />
      </div>
    </div>
  );
};

export default Navbar;
