import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../component/Layout";
import DoctorList from "../component/DoctorList";

const HomePage = () => {
  const [doctor, setDoctor] = useState(null);
  //get user data
  const getUserData = async () => {
    try {
      await axios.post(
        "api/v1/user/getAllDoctors",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Homepage</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
