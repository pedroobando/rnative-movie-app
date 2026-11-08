/** Formatea la puntuación de una película con 3 decimales: 7.683 */
export const formatRating = (rating: number): string => rating.toFixed(3);

/** Formatea un presupuesto en dólares: $200,000,000.00 */
export const formatBudget = (budget: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(budget);
