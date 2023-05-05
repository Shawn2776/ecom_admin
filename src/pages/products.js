import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export default function Products() {
  return (
    <Layout>
      <Link
        href="/products/new"
        className="bg-blue-900 text-white py-1 px-2 rounded-md"
      >
        Add New Product
      </Link>
    </Layout>
  );
}
