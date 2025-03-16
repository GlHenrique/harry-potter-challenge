import ContentList from "./(components)/ContentList";
import Filter from "./(components)/filter";
import Header from "./(components)/header";

export default function Home() {
  return (
    <>
      <Header />
      <Filter />
      <ContentList />
    </>
  );
}
