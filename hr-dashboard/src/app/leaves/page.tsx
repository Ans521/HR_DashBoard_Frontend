/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useDispatch } from "react-redux";
import LeaveInfo from "@/components/leaveInfo";
import { setLeaves } from "@/utils/store/leaves";
import api from "@/lib/axiosInstance";
const Leaves = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  const formReset = () => {
    setName("");
    setDepartment("");
    setDate("");
    setDocument(null);
    setReason("");
    setError("");
  };

  const addLeave = async () => {
    setError("");

    if (!name || !department || !date || !reason || !document) {
      setError("Please fill all the fields");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("department", department);
    data.append("date", date);
    data.append("document", document);
    data.append("reason", reason);

    try {
      const res = await api.post("/leave/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if(res.status === 200) {
        alert("Leave added successfully");
        formReset();
        fetchLeavesData();
        setShowForm(false);
      }
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const fetchLeavesData = async () => {
    try {
      const res = await api.get("/leaves", { withCredentials: true });
      dispatch(setLeaves(res.data.data));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLeavesData();
  }, []);

  return (
    <div className="right-panel">
      <Navbar heading="Leaves" />

      <LeaveInfo fetchLeavesData={fetchLeavesData} setShowForm={setShowForm} />

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Add New Leave</h2>
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
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department*"
                required
              />

              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <input
                type="file"
                id="document"
                onChange={(e) => setDocument(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx"
                required
              />

              <input
                type="text"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason*"
                required
              />

              {error && <p className="candidate-error">{error}</p>}

              <button type="submit" onClick={addLeave} className="submit-btn">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
