"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/utils/store";
import { setSideBar } from "@/utils/store/sidebar";
import { usePathname } from "next/navigation";
import api from "@/lib/axiosInstance";

const LeftPanel: React.FC = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch()
  const handleLogout = async () => {
    try {
      const res = await api.post(
        "/logout",
        {},
        { withCredentials: true }
      );
      if(res.status === 200) {
        alert("User logged out successfully");
        setShowLogout(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeSideBar = () => {
    if (window.innerWidth >= 1270) return
        dispatch(setSideBar(false))
        console.log("Sidebar closed (handle state here)");
  };
  const pathname = usePathname();

  return (
    <div>
      <div className="logo-container flex items-center justify-between p-4">
        <Link href="/" onClick={closeSideBar}>
          <Image
            className="logo"
            src="/images/Logo.png"
            alt="logo"
            width={120}
            height={50}
          />
        </Link>

        {typeof window !== "undefined" && window.innerWidth <= 1270 ? (
          <div onClick={closeSideBar} className="cursor-pointer text-xl">
            ✖
          </div>
        ) : null}
      </div>
    <div>
        <input
        className="search-container"
        type="text"
        placeholder="Search..."
        />
    </div>
      <section className="p-4">
        <h1 className="font-bold mb-2">Recruitment</h1>
        <div className="flex items-center gap-2">
            <Image
                src="/images/candidates-icon.png"
                alt="Candidates"
                width={30}
                height={20}
            />
          <Link href="/candidates" onClick={closeSideBar}  className={pathname === "/candidates" ? "nav-link active" : "nav-link"}>
            Candidates
          </Link>
        </div>
      </section>

      {/* ✅ Organization Section */}
      <section className="p-4">
        <h1 className="font-bold mb-2">Organization</h1>

        <div className="flex items-center gap-2">
          <Image src="/images/employees-icon.png" alt="Employees" width={20} height={20} />
          <Link href="/employees" onClick={closeSideBar} className={pathname === "/employees" ? "nav-link active" : "nav-link"}>
            Employees
          </Link>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Image src="/images/attendance-icon.png" alt="Attendance" width={20} height={20} />
          <Link href="/attendance" onClick={closeSideBar} className={pathname === "/attendance" ? "nav-link active" : "nav-link"}>
            Attendance
          </Link>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Image src="/images/leaves-icon.png" alt="Leaves" width={20} height={20} />
          <Link href="/leaves" onClick={closeSideBar} className={pathname === "/leaves" ? "nav-link active" : "nav-link"}>
            Leaves
          </Link>
        </div>
      </section>

      <section className="p-4">
        <h1 className="font-bold mb-2">Logout</h1>
        <div className="flex items-center gap-2">
          <Image src="/images/logout-icon.png" alt="Logout" width={20} height={20} />
          <p
            onClick={() => setShowLogout(true)}
            className="logout-button"
          >
            Logout
          </p>
        </div>
      </section>

      {showLogout && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="text-lg mb-4">Are you sure you want to logout?</h3>
            <div className="popup-actions flex gap-2">
              <button
                onClick={() => setShowLogout(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
