import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TimePicker } from "antd";
import { values } from "lodash";

const BookingPage = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailabilty, setIsAvailability] = useState();

  // get user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        // Added 'const res =' before axios.post
        "api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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
    //eslint-disable-next-line     
  }, [params.doctorId]); // Added 'params.doctorId' as a dependency

  return (
    <Layout>
      <h3>Booking page</h3>
      <div className="container">
        {doctor && (
          <>
            <h4>
              Dr. {doctor.firstname} {doctor.lastname}
            </h4>
            <h4>Fees: {doctor.feesPerConsultation}</h4>{" "}
            {/* Fixed the closing bracket */}
            <h4>
              Timings: {doctor.timings[0]}-{doctor.timings[1]}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker 
              format="DD-MM-YYYY" 
              onChange={(values=>setDate(moment(values)).format("DD-MM-YYYY"))}
              />
              <TimePicker.RangePicker
               format="HH:MM"
               onChange={(values=>setTimings(moment(values[0])).format("HH:MM"),moment(values[1]).format("HH:MM"))}
              />
              <button className="btn btn-primary mt-2">Check availability</button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>Book now</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
