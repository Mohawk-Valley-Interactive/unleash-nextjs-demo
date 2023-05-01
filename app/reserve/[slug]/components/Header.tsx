export default function Header() {
  return (
    <header>
      <div className="font-bold">You're almost done!</div>
      <div className="mt-5 flex">
        <img
          src="https://resizer.otstatic.com/v2/photos/xlarge/2/39989965.jpg"
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="font-bold text-3xl">Mike's Place</h1>
          <div className="flex mt-3">
            <p className="mr-6">Tues, 22nd 2023</p>
            <p className="mr-6">7:30 PM</p>
            <p className="mr-6">3 people</p>
          </div>
        </div>
      </div>
    </header>
  );
}
