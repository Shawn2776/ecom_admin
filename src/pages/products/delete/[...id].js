import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [productInfo, setProductInfo] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <div className="w-[50%] mx-auto h-[200px] flex flex-col items-center justify-center border-2 shadow-xl mt-10">
        <h1 className="flex flex-col items-center justify-center">
          <p>Do you reall ywant to delete</p>
          <p>
            <b>&quo;{productInfo?.title}&quo;</b>?
          </p>
        </h1>
        <div className="flex mt-4 space-x-10">
          <button onClick={deleteProduct} className="btn-red">
            Yes
          </button>
          <button onClick={goBack} className="btn-default">
            No
          </button>
        </div>
        <p className="mt-5 italic">(This action cannot be undone)</p>
      </div>
    </Layout>
  );
}
