"use client";

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }
    const response = await createProduct(result.data);
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    toast.success("Producto registrado correctamente");
    redirect("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form className="space-y-5" action={handleSubmit}>
        {children}

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value={"Registrar producto"}
        />
      </form>
    </div>
  );
}
