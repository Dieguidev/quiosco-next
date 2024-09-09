import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  return products;
}

// esto es un type que infiere el tipo de retorno de la funcion getProducts
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Heading>Administrar Productos </Heading>
      <ProductTable products={products} />
    </>
  );
}
