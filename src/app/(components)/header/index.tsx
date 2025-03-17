import { getHouse } from "@/app/actions/action";

import MyHouse from "../MyHouse";

export default async function Header() {
  const storedHouse = await getHouse();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-10 pb-5 px-5">
      <div>
        <h1 className="max-sm:text-xl text-3xl">Harry Potter Challenge</h1>
        <h2 className="max-sm:text-sm text-xl">Welcome to HP Card Game ⚡️</h2>
      </div>
      <MyHouse house={storedHouse?.value || "Gryffindor"} />
    </header>
  );
}
