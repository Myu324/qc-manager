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
  Select,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  getProductAPI,
  addProductAPI,
  delProductByIdAPI,
  loadOneByIdAPI,
  modifyProductByIdAPI,
} from "../services/products";
import { getProductcategoryAPI } from "../services/categories";
import { dalImg } from "../utils/tools";
import MyUpload from "../components/MyUpload";

function Products() {
  const [isShow, setIsShow] = useState(false);
  const [list, setList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentId, setCurrentId] = useState(-1); // 通过currentId判断当前是新增还是修改
  const [MyForm] = Form.useForm(); //获取表单实例
  const [query, setQuery] = useState({});
  // 富文本的内容

  useEffect(() => {
    loadData();
    loadCategories();
  }, [page, query]);
  const loadData = async () => {
    const res = await getProductAPI(page);
    setList(res.data);
    setTotal(res.total);
  };
  const loadCategories = async () => {
    const res = await getProductcategoryAPI();
    setCategories(res.data);
  };
  const columns = [
    {
      title: "序号",
      render(c, r, i) {
        return <>{i + 1}</>;
      },
    },
    {
      title: "名字",
      dataIndex: "name",
      width: 260,
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "库存",
      dataIndex: "amount",
    },
    {
      title: "主图",
      render(c) {
        return (
          <>
            <img
              src={dalImg(c.coverImage)}
              alt="123"
              style={{ width: "80px", maxHeight: "100px" }}
            />
          </>
        );
      },
    },
    {
      title: "分类",
      render(c) {
        return c.category ? c.category.name : "暂无";
      },
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
                  name: res.name,
                  desc: res.desc,
                  price: res.price,
                  amount: res.amount,
                  category: res.category?.name,
                });
              }}
            >
              修改
            </Button>
            <Button
              onClick={async () => {
                console.log(c.id);
                await delProductByIdAPI(c.id);
                setQuery({});
                message.success("删除成功");
              }}
              type="danger"
              size="small"
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <Card
      title="商品列表"
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => {
              setIsShow(true);
              setCurrentId(-1);
              setImageUrl(""); // 重置图片地址
            }}
          />
        </>
      }
    >
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
        title="商品编辑"
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
              await modifyProductByIdAPI(currentId, {
                ...v,
                coverImage: imageUrl,
              });
            } else {
              await addProductAPI({ ...v, coverImage: imageUrl });
            }
            message.success("保存数据成功");
            setIsShow(false);
            setQuery({});
          }}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[{ required: true, message: "名字不能为空" }]}
          >
            <Input placeholder="请输入内容"></Input>
          </Form.Item>
          <Form.Item label="分类" name="category">
            <Select>
              {categories.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: "价格不能为空" }]}
          >
            <Input placeholder="请输入价格" prefix="￥" suffix="元"></Input>
          </Form.Item>
          <Form.Item
            label="库存"
            name="amount"
            rules={[{ required: true, message: "库存不能为空" }]}
          >
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

export default Products;
