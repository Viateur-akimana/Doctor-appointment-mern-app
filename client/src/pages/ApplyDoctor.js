import React from "react";
import { Form, Input, Col, Row, TimePicker } from "antd";
import Layout from "../component/Layout";

const ApplyDoctor = () => {
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form Layout="vertical" onFinish={handleFinish} className="m-3">
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
            <Form.Item
              label="Timing"
              name="timing"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker/>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}/>
          <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary" type="submit">Submit</button>
            </Col>

        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
