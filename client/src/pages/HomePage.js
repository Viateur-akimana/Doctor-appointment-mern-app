import { useEffect } from "react";
import axios from "axios";
import Layout from "../component/Layout";

const HomePage = () => {
  const getUserData = async () => {
    try {
      await axios.post('api/v1/user/getUserData', {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  );
}

export default HomePage;
