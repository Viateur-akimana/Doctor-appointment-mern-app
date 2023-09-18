import axios from "axios";
import React, { useState,useEffect } from "react";
import { message,Table } from "antd";
import moment from "moment"
import Layout from "../../component/Layout";


const Appointments = () => {
  const [appointment, setAppointment] = useState([]);
  //getting appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get("api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success){
        message.success("Appointments")
        setAppointment(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
getAppointments()
  }, [])
  const columns =[
    {
        title:"ID",
        dataIndex:"_id"
    },{
        title:"Name",
        dataIndex:"name",
        render:(text,record)=>{
            <span>
                {record.doctorInfo.firstname} {record.doctorInfo .lastname}
            </span>
        }

    },{
   title:"Date && Time",
   dataIndex:"date",
   render:(text,record)=>{
    {moment(record.date).format("DD-MM-YYYY")}
    {moment(record.time).format("HH:MM")}
   }
    },{
        title:"Status",
        dataIndex:"status" 
    }
  ] 
  
  return (
    <Layout>
      <h6>Appointments</h6>
      <Table columns={columns} datasource={appointment}/>
    </Layout>
  );
};

export default Appointments;
