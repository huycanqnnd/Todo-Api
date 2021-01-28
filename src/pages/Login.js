import { Form, Input, Button, Checkbox, Modal } from "antd";
import Home from "./Home";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const handleChangeUser = (value) => {
    setUserName(value);
  };

  const handleChangePassword = (value) => {
    setPassword(value);
  };

  let users = [
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: "123456",
    },
  ];

  let history = useHistory();

  const handleChangeLogin = () => {
    const isvalid = users.find(
      (user) => user.name === userName && user.password === password
    );
    if (isvalid) {
      history.push("/todo");
    } else {
      showModal();
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={(e) => handleChangeUser(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: false, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) => handleChangePassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              handleChangeLogin();
            }}
          >
            Submit
          </Button>
          <Modal
            title="Message"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Sai thông tin user hoặc password! Mời bạn đăng nhập lại.</p>
          </Modal>
        </Form.Item>
      </Form>
    </div>
  );
}
