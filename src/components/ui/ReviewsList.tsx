import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface Review {
  id: number;
  reviewerName: string;
  reviewerPicture: string | null;
  rating: number;
  commentDate: string;
  comment: string;
}

interface IReviews {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: IReviews) => {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 2;

  useEffect(() => {
    if (reviews?.length) {
      setVisibleReviews(reviews.slice(0, ITEMS_PER_PAGE));
    }
  }, [reviews]);

  const fetchMoreData = () => {
    if (visibleReviews.length >= reviews.length) {
      setHasMore(false);
      return;
    }

    const nextItems = reviews.slice(
      visibleReviews.length,
      visibleReviews.length + ITEMS_PER_PAGE
    );

    setTimeout(() => {
      setVisibleReviews((prev) => [...prev, ...nextItems]);
    }, 500); // optional delay for UX
  };
  const { t } = useTranslation();

  if (!reviews || !reviews.length) return <p>No reviews found.</p>;

  return (
    <InfiniteScroll
      dataLength={visibleReviews.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>{t("profile.reviews.shown")}</b>
        </p>
      }
    >
      <div className="space-y-6">
        {visibleReviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar
                size={"large"}
                src={review.reviewerPicture || "/placeholder.svg"}
                alt={review.reviewerName}
              >
                {review.reviewerPicture === null &&
                  review.reviewerName.charAt(0)}
              </Avatar>
              <div className="text-left">
                <div className="font-medium">{review.reviewerName}</div>

                <div className="flex items-center text-xs text-muted-foreground">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < review.rating
                            ? "fill-yellow-500"
                            : "fill-muted stroke-muted dark:fill-gray-700 dark:stroke-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="ml-2 text-gray-400">
                    {format(review.commentDate, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 text-left">{review.comment}</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
export default ReviewsList;
