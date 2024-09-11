import ProductSearchFrom from "@/components/products/ProductSearchFrom";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: { category: true },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const filteredProducts = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultado de búsqueda {searchParams.search}</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchFrom />
      </div>
      {filteredProducts.length ? (
        <ProductTable products={filteredProducts} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
