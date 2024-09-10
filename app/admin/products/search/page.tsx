import Heading from "@/components/ui/Heading";

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {

  console.log(searchParams.search);


  return (
    <>
      <Heading>Resultado de búsqueda</Heading>
    </>
  );
}
