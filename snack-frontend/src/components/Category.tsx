interface CategoryProps {
  categories: string[];
}

export default function Category({ categories }: CategoryProps) {
  return (
    <nav className="bg-gray-100 p-2 flex justify-center gap-4 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 bg-white rounded shadow hover:bg-gray-200 whitespace-nowrap"
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
