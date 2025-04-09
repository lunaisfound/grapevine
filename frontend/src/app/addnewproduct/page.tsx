"use client";

import React, { useState } from "react";
import { Input, Button, DatePicker, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const { RangePicker } = DatePicker;

interface Product {
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

const AddNewProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [dateRange, setDateRange] = useState<any>([]);

  const handleAddProduct = () => {
    if (!productName || quantity <= 0 || price <= 0 || !imageUrl) {
      message.error("Please fill out all fields correctly.");
      return;
    }
    const newProduct: Product = {
      name: productName,
      quantity,
      price,
      imageUrl,
    };
    setProducts([...products, newProduct]);
    setProductName("");
    setQuantity(1);
    setPrice(0);
    setImageUrl("");
  };

  const handleRemoveProduct = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handlePost = async () => {
    const [startDate, endDate] = dateRange || [];
    const storeId = "store-abc123";

    try {
      const productData = {
        name: products[0]?.name,
        quantity: products[0]?.quantity,
        price: products[0]?.price,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        imageUrl: products[0]?.imageUrl,
        isDraft: false,
        createdBy: "user_id_or_email",
      };

      const docRef = await addDoc(
        collection(db, `stores/${storeId}/products`),
        productData
      );
      console.log("Document written with ID: ", docRef.id);
      message.success("Product posted successfully!");
    } catch (err) {
      console.error("Error:", err);
      message.error("Failed to post product");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2
        style={{
          fontSize: 40,
          fontWeight: 600,
          marginBottom: 16,
          color: "#61572D",
        }}
      >
        Add new Products
      </h2>

      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            color: "#61572D",
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 4,
            display: "inline-block",
          }}
        >
          Duration
        </label>
        <br />
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          style={{ borderRadius: 8, padding: 8 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        <span style={{ width: 400, color: "#61572D" }}>Name of Product</span>
        <span style={{ width: 80, color: "#61572D" }}>Quantity</span>
        <span style={{ width: 100, color: "#61572D" }}>Price</span>
        <span style={{ width: 200, color: "#61572D" }}>Image</span>
        <span style={{ width: 100, color: "#61572D" }}></span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Input
          placeholder="e.g. tomato"
          style={{
            width: 400,
            backgroundColor: "#FFF7BA",
            borderRadius: 8,
            height: 50,
          }}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{
            width: 80,
            backgroundColor: "#FFF7BA",
            borderRadius: 8,
            height: 50,
          }}
        />
        <Input
          type="number"
          prefix="$"
          min={0.01}
          step={0.01}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{
            width: 100,
            backgroundColor: "#FFF7BA",
            borderRadius: 8,
            height: 50,
          }}
        />
        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            width: 200,
            backgroundColor: "#FFF7BA",
            borderRadius: 8,
            height: 50,
          }}
        />
        <Button
          onClick={handleAddProduct}
          icon={<PlusOutlined />}
          style={{ backgroundColor: "#FFF7BA", border: "none", height: 50 }}
        >
          Add
        </Button>
      </div>

      {products.map((product, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            background: "#FFF7BA",
            padding: 8,
            borderRadius: 8,
            marginBottom: 8,
          }}
        >
          <span style={{ width: 400 }}>{product.name}</span>
          <span style={{ width: 80 }}>{product.quantity}</span>
          <span style={{ width: 100 }}>${product.price.toFixed(2)}</span>
          <span style={{ width: 200 }}>{product.imageUrl}</span>
          <Button
            danger
            onClick={() => handleRemoveProduct(idx)}
            style={{ borderRadius: 8 }}
          >
            Remove Product
          </Button>
        </div>
      ))}

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button style={{ borderRadius: 8 }}>Save Draft</Button>
        <Button
          type="primary"
          onClick={handlePost}
          style={{
            backgroundColor: "#5E4A00",
            borderColor: "#5E4A00",
            borderRadius: 8,
          }}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default AddNewProduct;
