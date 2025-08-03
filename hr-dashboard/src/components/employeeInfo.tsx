/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store";
import api from "@/lib/axiosInstance";
import Image from "next/image";

type EmployeesDataProps = {
  fetchEmployeesData: () => void;
  setShowForm: (value: boolean) => void;
};

const EmployeeInfo: React.FC<EmployeesDataProps> = ({
  fetchEmployeesData,
  setShowForm,
}) => {
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const employees = useSelector((state: RootState) => state.employee);

  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "To be updated";
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  };

  const deleteEmployee = async (id: string) => {
    try {
      const res = await api.delete(`/employees/delete/${id}`, { withCredentials: true });
      if (res.status === 200) {
        alert("Employee deleted successfully");
        fetchEmployeesData();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const tableHeadings = [
    "Sr no.",
    "Employee Name",
    "Email Address",
    "Phone Number",
    "Position",
    "Department",
    "Date Of Joining",
    "Action",
  ];

  return (
    <div className="candidates-container">
      <section className="header">
        <div className="header-filters">
          <select id="position">
            <option value="">Position</option>
            <option value="designer">Designer</option>
            <option value="human resource">Human Resource</option>
            <option value="developer">Developer</option>
          </select>
        </div>
      </section>

      <div className="candidates-list">
        <ul className="headings-container">
          {tableHeadings.map((heading) => (
            <li key={heading}>{heading}</li>
          ))}
        </ul>

        {employees &&
          (employees as any).map((employee: any, index: any) => (
            <ul className="candidate-data-container" key={employee._id}>
              <li>{index + 1}</li>
              <li>{employee.name}</li>
              <li>{employee.email}</li>
              <li>{employee.phone}</li>
              <li>{employee.position}</li>
              <li>{employee.department}</li>
              <li>{formatDate(employee.dateOfJoining)}</li>

              <li
                onMouseEnter={() =>
                  setActiveActionId((prev) =>
                    prev === employee._id ? null : employee._id
                  )
                }
                onMouseLeave={() => setActiveActionId(null)}
                className="action-container"
              >
                <div style={{ position: "relative"}}>
                  <Image
                    className="action-icon"
                    src="/images/action-icon.png"
                    alt="Actions"
                    width={10}
                    height={10}
                  />
                </div>

                {activeActionId === employee._id && (
                  <ul className="action-buttons">
                    <li onClick={() => setShowForm(true)}>Edit</li>
                    <li onClick={() => deleteEmployee(employee._id)}>Delete</li>
                  </ul>
                )}
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default EmployeeInfo;
