import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export default function useReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews.csv')
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true }).data;

        const validReviews = parsed
          .filter((r) => r.author && r.review && r.rating && r.size)
          .map((r) => ({
            ...r,
            rating: parseFloat(r.rating),
            size: r.size.trim().toLowerCase(),
          }));
        console.log('📌 Parsed Reviews:', validReviews);
        setReviews(validReviews);
      });
  }, []);

  const getRandomReviews = (count = 5) => {
    if (reviews.length <= count) return reviews;
    const shuffled = [...reviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getSizeStats = () => {
    const total = reviews.length;
    if (total === 0) return { small: 0, trueSize: 0, big: 0 };

    const normalize = (val) => val?.trim().toLowerCase();

    const small = reviews.filter(
      (r) => normalize(r.size) === 'runs small'
    ).length;
    const trueSize = reviews.filter(
      (r) => normalize(r.size) === 'true to size'
    ).length;
    const big = reviews.filter((r) => normalize(r.size) === 'runs big').length;

    return {
      small: Math.round((small / total) * 100),
      trueSize: Math.round((trueSize / total) * 100),
      big: Math.round((big / total) * 100),
    };
  };

  return { reviews, getRandomReviews, getAverageRating, getSizeStats };
}
