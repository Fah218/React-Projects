export default function Error({ message }) {
  return (
    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded">
      <p className="font-semibold">Something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  );
}
