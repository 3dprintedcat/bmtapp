import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { imageURLExport, UploadImage } from '../upload';

const { TextArea } = Input;
const imageURLImport = () =>{
 return( localStorage.getItem("tmp"));
}
const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = () => {
    console.log(imageURLImport())
    if (imageURLImport() !== "undefined"){
    var image = imageURLImport();
    axios.post('http://localhost:3000/items/', {
      title: name,
      description,
      price,
      image,
    })
      .then((response) => {
        console.log(response.data);
        setName('');
        setDescription('');
        setPrice(0);
        imageURLExport();
        window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      message.error("Please Enter An Image")
    }
  };

  return (
    <div>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <br />
      <TextArea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <br />
      <Input
        type="number"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />
      <br />
      <UploadImage/>
      
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Add Item
      </Button>
    </div>
  );
};

export default AddItem;
