"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/app/db";
import { clinicsTable, usersToClinicsTable } from "@/app/db/schema";
import { auth } from "@/lib/auth";

export const CreateClinic = async (name: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Usuário não autenticado");
  }
  const [clinic] = await db.insert(clinicsTable).values({ name }).returning();
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  redirect("/dashboard");
};
