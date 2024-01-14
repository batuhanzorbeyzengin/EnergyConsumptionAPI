import { PrismaClient, Prisma } from "@prisma/client";
import { EndeksCreateData } from "../types/endeksTypes";
import ApiError from "../utils/apiError";

const prisma = new PrismaClient();

export async function endeksCreate(data: EndeksCreateData) {
  const { date, value, userId } = data;

  try {
    const existingEndeks = await prisma.endeks.findFirst({
      where: {
        userId,
        date,
      },
    });
    if (existingEndeks) {
      throw new ApiError(
        400,
        "An index record already exists at the same time"
      );
    }

    const endeks = await prisma.endeks.create({
      data: {
        date,
        value,
        userId,
      },
    });

    return endeks;
  } catch (error) {
    throw error;
  }
}

export async function endeksDelete(id: number) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.consumption.deleteMany({
        where: {
          endeksId: id,
        },
      });
      await prisma.endeks.delete({
        where: {
          id,
        },
      });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new ApiError(404, "Endeks not found");
      }
    }
    throw new ApiError(500, "Internal Server Error");
  }
}
