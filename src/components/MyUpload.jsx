import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { dalImg, uploadFileUrl } from "../utils/tools";

const MyUpload = ({ imageUrl, setImageUrl }) => {
  const [loading, setLoading] = useState(false); // 加载状态

  const handleChange = (info) => {
    // info.file.status表示上传状态
    // uploading表示进行中
    // done表示完成
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      //   getBase64(info.file.originFileObj, (url) => {
      //     setLoading(false);
      //     setImageUrl(url);
      //   });
      console.log(info);
      setLoading(false);
      setImageUrl(info.file?.response?.data);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Upload
      // name表示服务器端接口接收的表单数据的name属性
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      // action表示服务器端上传接口地址
      action={uploadFileUrl}
      // 上传之前执行
      // beforeUpload={beforeUpload}
      // 上传中执行
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={dalImg(imageUrl)}
          alt="avatar"
          style={{
            width: "100%",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default MyUpload;
