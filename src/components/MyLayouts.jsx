import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
  TableOutlined,
  ShoppingOutlined,
  SmileOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import User from "../pages/User";
import Notices from "../pages/Notices";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Dashboard from "../pages/dashboard";
import Banners from "../pages/Banners";
import Info from "../pages/Info";
import Categories from "../pages/Categories";
import BannersCategories from "../pages/BannersCategories";
const { Header, Sider, Content } = Layout;
const navList = [
  {
    key: "/admin/dashboard",
    icon: <SmileOutlined />,
    label: "欢迎",
  },
  {
    key: "/admin/notices",
    icon: <BellOutlined />,
    label: "公告管理",
  },
  {
    key: "/admin/banners",
    icon: <TableOutlined />,
    label: "轮播图管理",
    children: [
      {
        key: "/admin/banners/categories",
        label: "轮播图分类",
      },
      {
        key: "/admin/banners/index",
        label: "轮播图列表",
      },
    ],
  },
  {
    key: "/admin/user",
    icon: <UserOutlined />,
    label: "用户管理",
  },
  {
    key: "/admin/products",
    icon: <ShoppingOutlined />,
    label: "商品管理",
    children: [
      {
        key: "/admin/products/list",
        label: "商品列表",
      },
      {
        key: "/admin/products/categories",
        label: "商品分类",
      },
    ],
  },
  {
    key: "/admin/orders",
    icon: <ShopOutlined />,
    label: "订单管理",
  },
];
let openKey;
function MyLayouts() {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const cItem = navList.find(
    (item) => location.pathname.indexOf(item.key) === 0
  );
  openKey = cItem.key;
  return (
    <>
      {
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
            }}
          >
            <div className="logo">
              <img
                src="https://img2.baidu.com/it/u=1350776945,2827676350&fm=253&fmt=auto&app=138&f=JPEG?w=396&h=386"
                alt=""
              />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={location.pathname}
              defaultOpenKeys={[openKey]}
              onClick={({ key }) => {
                nav(key);
              }}
              items={navList}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
              }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "4px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route path="user" element={<User />} />
                <Route path="notices" element={<Notices />} />
                <Route path="products/list" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="banners/index" element={<Banners />} />
                <Route
                  path="banners/categories"
                  element={<BannersCategories />}
                />
                <Route path="user/info" element={<Info />} />
                <Route path="products/categories" element={<Categories />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      }
    </>
  );
}

export default MyLayouts;
