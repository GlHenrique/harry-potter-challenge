import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="flex flex-col max-w-[200px]">
      <div className="w-[150px] h-[209px]">
        <Image
          alt="character-1"
          height={209}
          objectFit="contain"
          src="https://ik.imagekit.io/hpapi/harry.jpg"
          width={150}
        />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-xl">Name</h4>
        <h3 className="font-semibold text-base">Real Name</h3>
      </div>
      <div className="flex flex-col">
        <p className="text-sm uppercase font-extralight">House</p>
        <p className="text-sm uppercase font-extralight">Gender</p>
        <p className="text-sm uppercase font-extralight">Patronus</p>
      </div>
    </div>
  );
}
