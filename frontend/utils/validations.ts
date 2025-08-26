
/** Valida email básico */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Valida nome (mínimo de 2 caracteres) */
export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

/** Calcula força da senha (0 a 4) */
export function passwordStrength(password: string): number {
  const len = password.length >= 6;
  const upper = /[A-Z]/.test(password);
  const digit = /\d/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);

  return [len, upper, digit, special].filter(Boolean).length;
}

/** Considera senha válida se força >= 3 (ajuste se quiser 4/4) */
export function isValidPassword(password: string): boolean {
  return passwordStrength(password) >= 3;
}

/** Confere se senha e confirmação coincidem */
export function isConfirmedPassword(
  password: string,
  confirm: string
): boolean {
  return confirm.length > 0 && password === confirm;
}
