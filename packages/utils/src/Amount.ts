export const getFormattedStripeAmount = (amount: number) => {
  return (amount / 100).toFixed(2);
};

export const getFormattedAmount = (amount: number) => {
  return amount?.toFixed(2);
};

export const getAmountWithCurrency = (amount: number | string, currency = "$") => {
  return `${currency} ${amount}`;
};
