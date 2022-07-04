import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import { HashRouter as Router } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
