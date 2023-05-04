import { Review } from "@prisma/client";
import emptyStar from "../../public/images/reviewIcons/empty-star.png";
import halfStar from "../../public/images/reviewIcons/half-star.png";
import fullStar from "../../public/images/reviewIcons/full-star.png";
import Image, { StaticImageData } from "next/image";
import { calculateReviewAverage } from "../../utils/calculateReviewAverage";

function renderStars(ratingAverage: number) {
  const stars: StaticImageData[] = [];

  for (let i = 0; i < 5; i++) {
    const difference = parseFloat((ratingAverage - i).toFixed(1));
    if (difference >= 1) {
      stars.push(fullStar);
    } else if (difference > 0) {
      if (difference <= 0.2) {
        stars.push(emptyStar);
      } else if (difference <= 0.6) {
        stars.push(halfStar);
      } else {
        stars.push(fullStar);
      }
    } else {
      stars.push(emptyStar);
    }
  }

  return stars;
}

interface Props {
  reviews?: Review[];
  rating?: number;
}

export default function Stars({ reviews, rating }: Props) {
  const ratingAverage = rating || calculateReviewAverage(reviews);
  const stars = renderStars(ratingAverage);

  return (
    <span className="flex items-center">
      {stars.map((star, index) => (
        <Image
          key={index}
          src={star}
          alt=""
          className="w-4 h-4 mr-1"
        />
      ))}
    </span>
  );
}
