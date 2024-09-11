"use client";

import { ProductSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      categoryId: Number(formData.get("categoryId")),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach(error => {
        toast.error(error.message)
      })
      return;
    }

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
