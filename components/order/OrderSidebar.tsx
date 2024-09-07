import { prisma } from "@/src/lib/prisma";


async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export default async function OrderSidebar() {
  const categories = await getCategories();
  console.log(categories);

  return <div className="md:w-72 md:h-screen bg-white">OrderSidebar</div>;
}
