import { env } from '../config/env.js';

/**
 * Splits a session price between the platform and the Practice Partner.
 *
 * All money is handled as integer paise (INR only). The commission rate defaults to
 * PLATFORM_COMMISSION_PERCENT, but callers should pass the rate stored on a booking
 * when recalculating an existing booking, so later config changes never rewrite history.
 *
 * @param {number} amountPaise  Session price in paise (integer, >= 0).
 * @param {number} [commissionPercent]  Percentage between 0 and 100.
 */
export function calculateSplit(amountPaise, commissionPercent = env.PLATFORM_COMMISSION_PERCENT) {
  if (!Number.isInteger(amountPaise) || amountPaise < 0) {
    throw new RangeError('amountPaise must be a non-negative integer');
  }
  if (!Number.isFinite(commissionPercent) || commissionPercent < 0 || commissionPercent > 100) {
    throw new RangeError('commissionPercent must be between 0 and 100');
  }

  const platformFee = Math.round((amountPaise * commissionPercent) / 100);

  return {
    amount: amountPaise,
    commissionPercent,
    platformFee,
    partnerEarning: amountPaise - platformFee,
  };
}
