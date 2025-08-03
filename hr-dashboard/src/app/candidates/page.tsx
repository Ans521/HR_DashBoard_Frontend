/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import CandidatesInfo from "@/components/candidatesInfo"
import api from "@/lib/axiosInstance";
import { useDispatch } from "react-redux";
import { addCandidates } from "@/utils/store/candidates";
const Candidates: React.FC = () => {
  // ✅ TypeScript-typed state
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setExperience("");
    setResume(null);
  };

  const addCandidate = async () => {
    setError("");

    if (!name || !email || !phone || !position || !experience) {
      setError("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    const fields: Record<string, string> = {
      name,
      email,
      phone,
      position,
      experience,
    };

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const res = await api.post("/candidates/addCandidate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if(res.status === 200) {
        alert("Candidate added successfully");
        formReset();
        setShowForm(false);
        fetchCandidatesData();
      }
    } catch (err : any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const fetchCandidatesData = async () => {
    try {
      const res : any = await api.get("/candidates", {
        withCredentials: true,
      });
      dispatch(addCandidates(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCandidatesData();
  }, []);

  return (
    <div className="right-panel">
      <Navbar heading="Candidates" />

      <CandidatesInfo
        fetchCandidatesData={fetchCandidatesData}
        setShowForm={setShowForm}
      />

      {/* ✅ Add Candidate Form */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Add New Candidate</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✖
              </button>
            </div>

            <form className="candidate-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name*"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address*"
                required
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number*"
                required
              />
              <select
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select Position*</option>
                <option value="Intern">Intern</option>
                <option value="Full Time">Full Time</option>
                <option value="Senior">Senior</option>
                <option value="Junior">Junior</option>
                <option value="Team Lead">Team Lead</option>
              </select>
              <input
                type="text"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience in years"
                required
              />

              <input
                type="file"
                id="resume"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                name="resume"
                accept=".pdf,.doc,.docx"
                required
              />

              {error && <p className="candidate-error">{error}</p>}

              <button
                type="submit"
                onClick={addCandidate}
                className="submit-btn"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
