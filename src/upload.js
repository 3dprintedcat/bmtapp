import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export const imageURLExport = (image) =>{
    localStorage.setItem("tmp", image);
}

export const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
        setLoading(true);
        return;
    }
    if (Array.from(info.file.response)[0] === "T") {
      setLoading(false);
      setImageUrl("http://localhost:3000/uploads/" + info.file.name);
      message.success(`${info.file.name} file uploaded successfully`);
      imageURLExport("http://localhost:3000/uploads/" + info.file.name)
    } else if (Array.from(info.file.response)[0] === "S") {
        imageURLExport()
      setLoading(false);
      message.error(info.file.response);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (<>
    <Upload
      name="fileToUpload"
      action="http://localhost:3000/upload"
      listType="picture-card"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="uploaded image" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
    
  </>
  );
};

