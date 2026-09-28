// Firebase's default error messages are written for developers, not for the person
// signing up. This maps the codes we're likely to see to something calmer.
const messages = {
  'auth/email-already-in-use': 'An account with this email already exists. Try logging in instead.',
  'auth/invalid-email': 'That email address looks invalid.',
  'auth/invalid-credential': 'That email or password is incorrect.',
  'auth/wrong-password': 'That email or password is incorrect.',
  'auth/user-not-found': 'That email or password is incorrect.',
  'auth/weak-password': 'Use at least 6 characters for your password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/popup-closed-by-user': 'The Google sign-in window was closed before finishing.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
};

export function getAuthErrorMessage(error) {
  return messages[error?.code] ?? error?.message ?? 'Something went wrong. Please try again.';
}
