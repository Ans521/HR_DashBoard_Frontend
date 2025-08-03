"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from '../utils/store'; 
import api from "@/lib/axiosInstance";

type Candidate = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
  experience: string;
  resumeUrl: string;
};

type Props = {
  fetchCandidatesData: () => Promise<void>;
  setShowForm: (show: boolean) => void;
};

const statusOptions = ["new", "scheduled", "ongoing", "selected", "rejected"];
const positionOptions = ["designer", "human resource", "developer"];

const tableHeaders = [
  "Sr no.",
  "Candidate Name",
  "Email Address",
  "Phone Number",
  "Position",
  "Status",
  "Experience",
  "Action",
];


const CandidatesInfo: React.FC<Props> = ({ fetchCandidatesData, setShowForm }) => {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const candidates = useSelector((state: RootState) => state.candidates);

  const handleStatusChange = async (status: string, id: string) => {
    try {
      const res = await api.patch(`/candidates/${status}/${id}`, {}, { withCredentials: true });
      if(res.status === 200) {
        alert("Status changed successfully");
        fetchCandidatesData();
      }
    } catch (err) {
      console.error("Error changing status:", err);
    }
  };

  const deleteCandidate = async (id: string) => {
    try {
      const res = await api.delete(`/employees/delete/${id}`, { withCredentials: true });
      if(res.status === 200) {
        alert("Candidate deleted successfully");
        fetchCandidatesData();
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="candidates-container">
      <section className="header">
        <div className="header-filters">
          <select id="status">
            <option value="">Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                `${status[0].toUpperCase()}${status.slice(1)}`
              </option>
            ))}
          </select>

          <select id="position">
            <option value="">Position</option>
            {positionOptions.map((pos) => (
              <option key={pos} value={pos}>
                `${pos[0].toUpperCase()}${pos.slice(1)}`
              </option>
            ))}
          </select>
        </div>

        <div className="header-actions">
          <button className="btn" onClick={() => setShowForm(true)}>
            Add Candidate
          </button>
        </div>
      </section>

      <div className="candidates-list">
        <ul className="headings-container">
          {tableHeaders.map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>

        {candidates &&
          candidates?.map((candidate: Candidate, index: number) => (
            <ul className="candidate-data-container" key={candidate._id}>
              <li>{index + 1}</li>
              <li>{candidate.name}</li>
              <li>{candidate.email}</li>
              <li>{candidate.phone}</li>
              <li>{candidate.position}</li>
              <li>
                <select
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(e.target.value, candidate._id)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </li>
              <li>{candidate.experience} years</li>

              <li
                onMouseEnter={() =>
                  setActiveActionId((prev) => (prev === candidate._id ? null : candidate._id))
                }
                onMouseLeave={() => setActiveActionId(null)}
                className="action-container"
              >
                <Image
                  src="/images/action-icon.png"
                  alt="action icon"
                  width={24}
                  height={24}
                  className="action-icon"
                />
                {activeActionId === candidate._id && (
                  <ul className="action-buttons-candidates">
                    <li>
                      <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                        Download Resume
                      </a>
                    </li>
                    <li onClick={() => deleteCandidate(candidate._id)}>Delete Candidate</li>
                  </ul>
                )}
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default CandidatesInfo;
