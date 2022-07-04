import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getUserAPI,
  addUserAPI,
  delUserByIdAPI,
  loadOneByIdAPI,
  modifyUserByIdAPI,
} from "../services/auth";
import { dalImg } from "../utils/tools";
import MyUpload from "../components/MyUpload";

function User() {
  const [isShow, setIsShow] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState();
  const [total, setTotal] = useState(0);
  const [currentId, setCurrentId] = useState(-1); // 通过currentId判断当前是新增还是修改
  const [MyForm] = Form.useForm(); //获取表单实例
  const [query, setQuery] = useState({});
  useEffect(() => {
    loadData();
  }, [page, query]);
  const loadData = async () => {
    const res = await getUserAPI(page);
    setList(res.data);
    setTotal(res.total);
  };
  const columns = [
    {
      title: "序号",
      render(c, r, i) {
        return <>{i + 1}</>;
      },
    },
    {
      title: "用户名",
      dataIndex: "userName",
      width: 260,
    },
    {
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      title: "头像",
      render(c) {
        return (
          <>
            <img
              src={dalImg(c.avatar)}
              alt="123"
              style={{ width: "80px", maxHeight: "100px" }}
            />
          </>
        );
      },
    },
    {
      title: "性别",
      dataIndex: "gender",
    },

    {
      title: "地址",
      dataIndex: "address",
    },
    {
      title: "操作",
      render(c) {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={async () => {
                setCurrentId(c.id);
                setIsShow(true);
                setImageUrl(c.coverImage);
                const res = await loadOneByIdAPI(c.id);
                MyForm.setFieldsValue({
                  userName: res.userName,
                  nickName: res.nickName,
                  address: res.address,
                  gender: res.gender,
                });
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="是否确认删除"
              onConfirm={async () => {
                console.log(c.id);
                await delUserByIdAPI(c.id);
                setQuery({});
                message.success("删除成功");
              }}
            >
              <Button type="danger" size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Card title="用户列表">
      <Table
        dataSource={list}
        columns={columns}
        rowKey={(list) => list.id}
        pagination={{
          total,
          onChange(page) {
            setPage(page);
          },
        }}
      />
      <Modal
        visible={isShow}
        width="500px"
        title="用户信息修改"
        onCancel={() => setIsShow(false)}
        destroyOnClose={true}
        onOk={() => {
          MyForm.submit();
        }}
      >
        <Form
          labelCol={{ span: 3 }}
          form={MyForm}
          preserve={false}
          onFinish={async (v) => {
            if (currentId > -1) {
              await modifyUserByIdAPI(currentId, {
                ...v,
                coverImage: imageUrl,
              });
            } else {
              await addUserAPI({ ...v, coverImage: imageUrl });
            }
            message.success("保存数据成功");
            setIsShow(false);
            setQuery({});
          }}
        >
          <Form.Item
            label="昵称"
            name="nickName"
            rules={[{ required: true, message: "昵称不能为空" }]}
          >
            <Input placeholder="请输入内容"></Input>
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Input placeholder="请输入内容"></Input>
          </Form.Item>
          <Form.Item label="地址" name="address">
            <Input placeholder="请输入内容"></Input>
          </Form.Item>
          <Form.Item label="主图">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default User;
