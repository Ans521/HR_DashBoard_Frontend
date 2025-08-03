"use client";

import { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import { setSideBar } from "@/utils/store/sidebar";
import { useAppDispatch, useAppSelector } from "@/utils/store";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const sideBar = useAppSelector((state) => state.sidebar);
      const dispatch = useAppDispatch();
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      dispatch(setSideBar(window.innerWidth >= 1100));
    };
        const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) setHasToken(true)

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
    
  return (
    <div className="main-content">
        {sideBar && hasToken && (
              <div className="left-panel">
                <LeftPanel />
              </div>
            )}
      {children}
    </div>
  );
}
