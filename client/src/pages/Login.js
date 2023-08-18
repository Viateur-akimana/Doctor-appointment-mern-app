import React from "react";
import "../styles/RegisterStyle.css";
import { Button, Form, Input } from "antd";
import { link } from "react-router-dom";
const Login = () => {
  //form handler
  const onFinishHandler = (values) => {
    console.log("Success:", values);
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
        <link to="/login" className="m-2">
          Already user login here
        </link>
        <Button className="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
