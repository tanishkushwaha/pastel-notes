import bcrypt from "bcryptjs";

// Hash password
export async function hashPassword(password: string) {
  console.log("hashing password");

  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// Compare password
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  console.log("comparing password");

  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}
