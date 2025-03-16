import { CharactersResponse } from "@/app/services/characters/types";

import ItemCard from "../ItemCard";

type ContentListProps = {
  items: CharactersResponse[];
};

export default function ContentList({ items }: ContentListProps) {
  return (
    <main className="py-5 px-5">
      <h3 className="text-2xl w-fit mb-5">All characters</h3>
      <div className="flex flex-wrap gap-x-4 gap-y-8">
        {items.map(
          ({ id, name, gender, house, patronus, actor, image }, index) => (
            <ItemCard
              fullInfo={items[index]}
              gender={gender}
              house={house}
              image={image}
              key={id}
              name={name}
              patronus={patronus}
              realName={actor}
            />
          ),
        )}
      </div>
    </main>
  );
}
