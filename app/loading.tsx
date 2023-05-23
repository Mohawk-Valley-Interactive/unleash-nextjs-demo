import Header from "./components/Header";

export default function Loading() {
  return (
    <div>
      <Header />
      <main className="bg-gray-400 py-3 px-36 mt-10 flex flex-wrap">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
          <div
            key={num}
            className="animate-pulse bg-slate-200 w-64 h72 rounded overflow-hidden border cursor-pointer"
          ></div>
        ))}
      </main>
    </div>
  );
}
