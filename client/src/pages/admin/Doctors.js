import Layout from "../../component"
import React, { useState, useEffect } from "react";
import axios from "axios"
import { message } from "antd";


const Doctors = () => {
  const getDoctors = async () => {
    const [doctors, setDoctors] = useState([]);
    try {
      const res = await axios.get("api/v1/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')
  };

  //change account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "api/v1/admin/changeAccountStatus",
        { doctorId: record._Id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: ( record) => {
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-primary"
              onClick={() => handleAccountStatus(record, "Approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>;
      },
    },
  ];

  return (
    <Layout>
      <h4>All doctors</h4>
    </Layout>
  );
}};

export default Doctors;
