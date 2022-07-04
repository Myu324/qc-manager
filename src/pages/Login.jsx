import { Card, Form, Input, Button, message } from "antd";
import React from "react";
import { loginAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

function Login() {
  const nav = useNavigate();
  return (
    <div className="login">
      <Card title="登录" style={{ width: "500px", margin: " 180px auto" }}>
        <Form
          labelCol={{ span: 3 }}
          onFinish={async (v) => {
            //调接口
            const res = await loginAPI({
              userName: v.username,
              password: v.password,
            });
            if (res.code === 1) {
              message.success("登录成功");
              nav("/admin");
              setToken(res.data);
            } else {
              message.error(res.data);
            }
          }}
        >
          <Form.Item
            label="用户名"
            rules={[
              {
                required: true,
                message: "用户名不能为空",
              },
            ]}
            name="username"
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "70%", margin: "0 auto" }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
