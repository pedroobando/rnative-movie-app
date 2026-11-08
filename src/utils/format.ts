/** Formatea la puntuación de una película con 3 decimales: 7.683 */
export const formatRating = (rating: number): string => rating.toFixed(3);

/** Formatea un presupuesto en dólares: $200,000,000.00 */
export const formatBudget = (budget: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(budget);

/** Cantidad máxima de estrellas usadas para representar un rating de 0 a 10. */
export const MAX_STARS = 5;

/**
 * Convierte un rating de 0 a 10 en cantidad de estrellas (0 a 5) redondeada.
 * Ej: 8.4 -> 4 estrellas, 3.9 -> 2 estrellas, 10 -> 5 estrellas.
 */
export const ratingToStars = (rating: number, maxStars: number = MAX_STARS): number => {
  if (!Number.isFinite(rating) || rating <= 0) return 0;

  const stars = Math.round((rating / 10) * maxStars);

  return Math.min(Math.max(stars, 0), maxStars);
};
