/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import api from "@/lib/axiosInstance";
import { useAppSelector } from "@/utils/store";
import Image from "next/image";

type Leave = {
  _id: string;
  name: string;
  department: string;
  date: string;
  reason: string;
  status: string;
  document: string;
};

type Props = {
  fetchLeavesData: () => Promise<void>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeaveInfo: React.FC<Props> = ({ fetchLeavesData, setShowForm }) => {
  const leavesData = useAppSelector((state) => state.leaves);

  // ✅ Update leave status
  const handleStatusChange = async (status: string, id: string) => {
    try {
      const res = await api.patch(`/leaves/${status}/${id}`, {}, { withCredentials: true });
      if (res.status === 200) {
        alert("Status changed successfully");
        fetchLeavesData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getFullYear()).slice(-2)}`;
  };

  const statusOptions = ["Approved", "Pending", "Rejected"];

  return (
    <div className="candidates-container">
      <section className="header">
        <div className="header-filters">
          <select id="status">
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="header-actions">
          <button className="btn" onClick={() => setShowForm(true)}>
            Add Leave
          </button>
        </div>
      </section>

      {/* ✅ Main container */}
      <div className="candidates-list">
        <ul className="headings-container">
          {["Sr no.", "Employee Name", "Date", "Reason", "Status", "Docs"].map((heading) => (
            <li key={heading}>{heading}</li>
          ))}
        </ul>

        {leavesData &&
          (leavesData as any).map((leave: Leave, index: number) => (
            <ul className="candidate-data-container" key={leave._id}>
              <li>{index + 1}</li>
              <li className="leave-name">
                <h3>{leave.name}</h3>
                <p>{leave.department}</p>
              </li>
              <li>{formatDate(leave.date)}</li>
              <li>{leave.reason}</li>
              <li>
                <select
                  value={leave.status}
                  onChange={(e) => handleStatusChange(e.target.value, leave._id)}
                  className={leave.status === "approved" ? "candidate-selected" : ""}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <a href={leave.document} target="_blank" rel="noopener noreferrer">
                  {/* ✅ Using next/image for optimized images */}
                  <Image
                    src="/images/document-icon.png"
                    alt="document"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default LeaveInfo;
