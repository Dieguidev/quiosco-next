import ProductSearchFrom from "@/components/products/ProductSearchFrom";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productsCount() {
  const count = await prisma.product.count();
  return count;
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: { category: true },
  });

  return products;
}

// esto es un type que infiere el tipo de retorno de la funcion getProducts
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) {
    redirect("/admin/products");
  }

  const [productsData, totalProducts] = await Promise.all([
    getProducts(page, pageSize),
    productsCount(),
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) {
    redirect("/admin/products");
  }

  return (
    <>
      <Heading>Administrar Productos </Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={"/admin/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchFrom />
      </div>
      <ProductTable products={productsData} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
