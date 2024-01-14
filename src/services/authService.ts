import { PrismaClient, Prisma } from "@prisma/client";
import { UserRegistrationData, UserLoginData } from "../types/authTypes";
import ApiError from "../utils/apiError";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/token";

const prisma = new PrismaClient();

export async function registerUser(data: UserRegistrationData) {
  const { email, password, company } = data;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        company,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ApiError(
          409,
          "Email or company information is already available"
        );
      }
    }

    throw error;
  }
}

export async function loginUser(data: UserLoginData) {
  const { email, password } = data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);
    return token;
  } catch (error) {
    throw error;
  }
}
