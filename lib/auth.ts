import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Tek yönetici (site sahibi) için hafif oturum.
 * Ortam değişkenleri: ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET
 * Edge-uyumlu (sadece jose + Web Crypto) → middleware'de de kullanılabilir.
 */

export const SESSION_COOKIE = "bcd_admin";

function secretKey(): Uint8Array | null {
  const s = process.env.AUTH_SECRET;
  return s ? new TextEncoder().encode(s) : null;
}

export function adminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD &&
      process.env.AUTH_SECRET
  );
}

export function checkCredentials(email: string, password: string): boolean {
  return (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  );
}

export async function createToken(email: string): Promise<string> {
  const key = secretKey();
  if (!key) throw new Error("AUTH_SECRET tanımlı değil");
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(
  token: string | undefined | null
): Promise<JWTPayload | null> {
  const key = secretKey();
  if (!key || !token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}
