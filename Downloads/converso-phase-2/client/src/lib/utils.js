/** Join class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Format an amount stored in paise (integer) as rupees, e.g. 120000 -> "₹1,200". */
export function formatINR(paise) {
  return inr.format(paise / 100);
}
