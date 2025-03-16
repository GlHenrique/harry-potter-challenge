import MyHouse from "../MyHouse";

export default function Header() {
  return (
    <header className="flex items-center justify-between pt-10 pb-5 px-5">
      <div>
        <h1 className="text-3xl">Harry Potter Challenge</h1>
        <h2 className="text-xl">Welcome to HP Card Game ⚡️</h2>
      </div>
      <MyHouse />
    </header>
  );
}
