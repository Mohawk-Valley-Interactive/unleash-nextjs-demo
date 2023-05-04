import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

interface Props {
  reviews: Review[];
}
export default function Reviews({ reviews }: Props) {
  let reviewCount = reviews?.length ?? 0;
  return (
    <>
      {reviewCount > 0 ? (
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            What {reviewCount} {reviewCount === 1 ? "person is" : "people are"}{" "}
            saying.
          </h1>
          <div>
            {reviews.map((review) => (
              <ReviewCard review={review} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
