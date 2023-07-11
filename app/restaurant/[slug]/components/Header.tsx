interface Props {
  name: string;
  location: string;
}

export default function Header({ name, location }: Props) {
  return (
    <header className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#470f0f] to-[#846b5f] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-center text-shadow">
          {name} ({location})
        </h1>
      </div>
    </header>
  );
}
