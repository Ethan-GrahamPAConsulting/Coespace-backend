import { type Desk } from "../generated/prisma/client";
import { prisma } from "../utils/prisma";

export type DeskOption = Pick<Desk, "id" | "name" | "floor">;

export class DeskRepository {
  findAll(): Promise<DeskOption[]> {
    return prisma.desk.findMany({
      select: { id: true, name: true, floor: true },
      orderBy: { id: "asc" },
    });
  }
}