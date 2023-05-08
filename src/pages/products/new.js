import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import React, { useState } from "react";

export default function New() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}
