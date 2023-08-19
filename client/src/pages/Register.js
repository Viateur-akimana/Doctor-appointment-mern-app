import React from "react";
import "../styles/RegisterStyle.css";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
 const  navigate = useNavigate();
  //this is form handler
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post("api/v1/user/register", values);
      if (res.data.success) {
        localStorage.setItem("token",res.data.token)
        message.success("user registered successfully");
        navigate("/login");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  return (
    <div className="form-container">
      <Form
        layout="vertical"
        className="register-form"
        onFinish={onFinishHandler}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="Password" required />
        </Form.Item>
        <Link to="/login" className="m-2">
          Already user login here
        </Link>
        <Button className="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Register;
