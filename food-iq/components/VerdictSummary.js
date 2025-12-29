export default function VerdictSummary({ text }) {
  return (
    <div className="mt-8 p-4 bg-black text-white rounded-lg">
      <h4 className="font-semibold mb-1">Bottom line</h4>
      <p className="text-sm">{text}</p>
    </div>
  );
}
