import React, { useState, useParams, useEffect } from "react";
import { Form, Input, Col, Row, TimePicker, message } from "antd";
import axios from "axios";
import Layout from "../../component/Layout";
import { useDispatch, useNavigate, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const Profile = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "api/v1/doctor/updateProfile",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        Navigate("/");
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("There is problem in updating profile");
    }
  };
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      {doctor && (
        <Form Layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
          <h6 className="text-light">Personal Details:</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="firstname"
                name="firstname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your firstname" />
              </Form.Item>
              <Form.Item
                label="lastname"
                name="lastname"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your lastname" />
              </Form.Item>
              <Form.Item
                label="phone"
                name="phonenumber"
                required
                rules={[{ required: true }]}
              >
                <Input type="integer" placeholder="Your phone number here" />
              </Form.Item>
              <Form.Item
                label="email"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your email" />
              </Form.Item>
              <Form.Item label="website" name="website">
                <Input type="text" placeholder="website" />
              </Form.Item>
              <Form.Item
                label="address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your address" />
              </Form.Item>
            </Col>
          </Row>
          <h6 className="text-light">Professional Details:</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your specialization" />
              </Form.Item>
              <Form.Item label="FeesPerConsultation" name="feesperconsultation">
                <Input type="text" placeholder="Your fessperconsultation" />
              </Form.Item>
              {/* <Form.Item */}
                {/* // label="Timing" */}
                {/* // name="timing" */}
                {/* // required */}
                {/* // rules={[{ required: true }]} */}
            {/* //   > */}
                {/* <TimePicker.RangePicker /> */}
              {/* </Form.Item> */}
            </Col>
            <Col xs={24} md={24} lg={8} />
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
