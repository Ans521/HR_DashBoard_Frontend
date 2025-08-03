"use client";

import { useEffect, useState } from "react";
import LeftPanel from "./LeftPanel";
import { setSideBar } from "@/utils/store/sidebar";
import { useAppDispatch, useAppSelector } from "@/utils/store";
import { usePathname } from "next/navigation";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const sideBar = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const [hasToken, setHasToken] = useState(false);
  const pathname = usePathname()
  useEffect(() => {
    const handleResize = () => {
      dispatch(setSideBar(window.innerWidth >= 1100));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const shouldShowSidebar = pathname !== "/" && sideBar;
  return (
    <div className="main-content">
        {shouldShowSidebar && (
              <div className="left-panel">
                <LeftPanel />
              </div>
            )}
      {children}
    </div>
  );
}
