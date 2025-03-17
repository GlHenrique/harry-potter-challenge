import Header from "@/app/(components)/header";
import HomeContent from "@/app/(components)/HomeContent";

import ScrollToTopButton from "./(components)/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />;
      <HomeContent />
      <ScrollToTopButton />
    </>
  );
}
