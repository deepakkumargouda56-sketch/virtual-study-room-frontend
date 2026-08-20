import jwt from "jsonwebtoken";

export const generateToken = (
  userId: number,
  name: string,
  email: string
) => {
  return jwt.sign(
    {
      id: userId,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};