import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };

    if (editedCategory) {
      data._id = editedCategory._id;

      await axios.put("/api/categories", { ...data, _id: editedCategory._id });

      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  async function deleteCategory(category) {
    const { _id: id } = category;

    await axios.delete("/api/categories?id=" + id);
    fetchCategories();
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <div className="p-1 px-2 border border-black rounded-lg">
        <label className="text-2xl">
          {editedCategory
            ? "Edit Category:" + ` ${editedCategory.name}`
            : "Create New Category"}
        </label>
        <form onSubmit={saveCategory} className="flex gap-1 mt-2">
          <input
            type="text"
            placeholder="Category Name"
            className="mb-0"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <select
            className="mb-0"
            value={parentCategory}
            onChange={(e) => {
              setParentCategory(e.target.value);
            }}
          >
            <option value="">No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button type="submit" className="py-1 btn-primary">
            Save
          </button>
        </form>
      </div>
      <table className="mt-4 basic">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="mr-1 btn-primary"
                  >
                    Edit
                  </button>
                  {/* <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button> */}
                  <Modal deleteCategory={deleteCategory} category={category} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

