import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TimePicker, message } from "antd";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailabilty, setIsAvailability] = useState(false);

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
  //Handling booking routes
  const handleBooking = async () => {
    try {
      setIsAvailability(true)
      if(!date && ! time){
        return alert("date & time is required")
      }
      dispatch(showLoading());
      const res = await axios.post(
        "api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  //handling booking availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "api/v1/user/book-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailability(true);
        message.success(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
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
              aria-required = {"true"}
              className="mt-3"
                format="DD-MM-YYYY"
                onChange={(values) => {
                  setIsAvailability(false);
                  setDate(moment(values)).format("DD-MM-YYYY");
                }}
              />
              <TimePicker
                 aria-required = {"true"} 
                format="HH:MM"
                className="mt-3"
                onChange={(values) => {
                  setIsAvailability(false);
                  setTime(moment(values)).format("HH:MM");
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check availability
              </button>
              {!isAvailabilty && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book now
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
