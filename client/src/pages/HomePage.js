import React, { useEffect } from "react";
import axios from "axios";

const HomePage = async () => {
  try {
    const res = await axios.post(
      "api/v1/user/getUserData",
      {},
      {
        headers: {
          Authorization: "bearer" + localStorage.getItem("token"),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  useEffect(() => {
    getUserData();
  }, []);

  return <div></div>;
};

export default HomePage;
