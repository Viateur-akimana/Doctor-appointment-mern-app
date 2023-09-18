import React from "react";
import Layout from "../../component/Layout";
const DoctorAppointments = () => {
  //get doctor appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get("api/v1/doctor/doctor-appointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success("Appointments");
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  const handleStatus = async(record,status) =>{
    try {
      const res = await axios.post("api/v1/doctor/update-status",{appointmentsId:record._id,status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        message.success(res.data.message)
        getAppointments()
      }

    } catch (error) {
      console.log(error);
message.error("Something went wrong")
    }
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date && Time",
      dataIndex: "date",
      render: (text, record) => {
        {
          moment(record.date).format("DD-MM-YYYY");
        }
        {
          moment(record.time).format("HH:MM");
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "Approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>;
      },
    },
  ];
  return (
    <Layout>
      <h6>Doctor Appointments</h6>
      <Table columns={columns} datasource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
