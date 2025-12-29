export default function ReasoningCard({ title, items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="bg-gray-50 border rounded-lg p-3 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
