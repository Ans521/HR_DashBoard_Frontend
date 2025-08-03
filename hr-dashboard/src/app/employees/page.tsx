"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { useDispatch } from "react-redux";
import { addEmployee } from "@/utils/store/employe";
import type { AppDispatch } from '../../utils/store';
import { AxiosError } from "axios";
import EmployeeInfo from "@/components/employeeInfo";
import api from "@/lib/axiosInstance";


const Employees: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const formReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setPosition("");
    setDate("");
  };

  const fetchEmployeesData = async () => {
    try {
      const res = await api.get("/employees", { withCredentials: true });
      dispatch(addEmployee(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmployeeData = async () => {
    setError("");

    if (!name || !email || !phone || !department || !position || !date) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const res = await api.patch(
        "/employees/update",
        {
          name,
          email,
          phone,
          department,
          position,
          dateOfJoining: date,
        },
        { withCredentials: true }
      );

      if(res.status === 200) {
        alert("Employee details updated successfully");
        setShowForm(false);
        formReset();
        fetchEmployeesData();        
      }

    } catch (err : unknown) {
      if (err instanceof AxiosError) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
  } else {
      console.error("Unexpected error:", err);
      setError("Something went wrong");
  }

    }
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  return (
    <div className="right-panel">
      <Navbar heading="Employees" />

      <EmployeeInfo
        fetchEmployeesData={fetchEmployeesData}
        setShowForm={setShowForm}
      />

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2>Edit Employee Details</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowForm(false);
                  formReset();
                }}
              >
                ✖
              </button>
            </div>

            <form
              className="candidate-form"
              onSubmit={(e) => e.preventDefault()}
            >
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
              <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department*"
                required
              />
              <select
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select Position*</option>
                {["Intern", "Full Time", "Senior", "Junior", "Team Lead"].map(
                  (pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  )
                )}
              </select>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date of Joining*"
                required
              />
              {error && <p className="candidate-error">{error}</p>}
              <button
                type="submit"
                onClick={updateEmployeeData}
                className="submit-btn"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
