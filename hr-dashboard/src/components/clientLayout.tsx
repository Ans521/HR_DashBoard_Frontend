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

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
    
  return (
    <div className="main-content">
        {sideBar && (
              <div className="left-panel">
                <LeftPanel />
              </div>
            )}
      {children}
    </div>
  );
}
