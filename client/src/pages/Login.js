import React from "react";
import "../styles/RegisterStyle.css";
import { Button, Form, Input, message } from "antd";
import { link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  //form handler
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post("api/v1/user/login", values);
      if (res.data.success) {
        message.success("Login successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("");
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
        <Form.Item>
          <link to="/login" className="m-2">
            Not yet user have account
          </link>
          <Button className="primary" type="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
