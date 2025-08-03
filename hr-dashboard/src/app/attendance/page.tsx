"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
import Navbar from "@/components/navbar";
import { useDispatch } from "react-redux";
import { addEmployee } from "@/utils/store/employe";
import { useAppSelector } from "@/utils/store";
import api from "@/lib/axiosInstance";

const Attendance = () => {
  const employees = useAppSelector((state) => state.employee);
  const dispatch = useDispatch();

  const handleStatusChange = async (status, id) => {
    try {
      await api.patch(`/employees/attendance/${status}/${id}`, {}, { withCredentials: true });
      fetchAttendanceData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const res = await api.get(`/employees`, { withCredentials: true });
      if (res.status === 200) {
        dispatch(addEmployee(res.data.data));
        fetchAttendanceData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const headerFields = [
    "Sr no.",
    "Employee Name",
    "Email Address",
    "Position",
    "Department",
    "Attendance Status",
  ];

  return (
    <div className="right-panel">
      <Navbar heading={"Attendance"} />

      <div className="candidates-container">
        {/* ✅ Header section */}
        <section className="header">
          <div className="header-filters">
            <select id="position" className="">
              <option value="">Status</option>
              <option value="new">Present</option>
              <option value="scheduled">Absent</option>
            </select>
          </div>
        </section>

        {/* ✅ Main container */}
        <div className="candidates-list">
          {/* 🔹 Loop for headings */}
          <ul className="headings-container">
            {headerFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>

          {/* 🔹 Loop for employees */}
          {(employees as any)?.map((employee, index) => {
            const values = [
              index + 1,
              employee.name,
              employee.email,
              employee.position,
              employee.department,
            ];

            return (
              <ul className="candidate-data-container" key={employee._id}>
                {/* 🔹 Render dynamic fields */}
                {values.map((val, idx) => (
                  <li key={idx}>{val}</li>
                ))}

                {/* 🔹 Attendance dropdown as last item */}
                <li>
                  <select
                    value={employee.attendanceStatus}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, employee._id)
                    }
                    className={
                      employee.attendanceStatus === "present"
                        ? "candidate-selected"
                        : employee.attendanceStatus === "absent"
                        ? "candidate-rejected"
                        : ""
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
