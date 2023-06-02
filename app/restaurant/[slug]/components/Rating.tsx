import { Review } from "@prisma/client";
import { calculateReviewAverage } from "../../../../utils/calculateReviewAverage";
import Stars from "../../../components/Stars";

interface Props {
  reviews: Review[];
}

export default function Rating({ reviews }: Props) {
  let ratingAverage = calculateReviewAverage(reviews);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{ratingAverage.toFixed(1)}</p>
      </div>
      <div className="text-reg ml-4">
        {reviews.length} Review{reviews.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
