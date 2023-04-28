import Header from "./components/Header";
import Form from "./components/Form";

export const metadata = {
  title: "Reserve at Mike's Place | OpenTable",
};

export default function Reserve() {
  return (
    <div className="border-t h-screen">
      <div className="w-3/5 py-9 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  );
}
