import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";

interface Props {
  image: string;
  name: string;
  date: string;
  partySize: string;
}

export default function Header({ image, name, date, partySize }: Props) {
  partySize =
    parseInt(partySize) == 1 ? `${partySize} person` : `${partySize} people`;

  const [d, t] = date.split("T");
  const displayTime = convertToDisplayTime(t as Time);
  const displayDate = format(new Date(date), "ccc, LLL d");

  return (
    <header>
      <div className="font-bold">You're almost done!</div>
      <div className="mt-5 flex">
        <img
          src={image}
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="font-bold text-3xl">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{displayDate}</p>
            <p className="mr-6">{displayTime}</p>
            <p className="mr-6">{partySize}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
