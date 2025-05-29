import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import { db } from "../db";
import { usersToClinicsTable } from "../db/schema";
import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/authentication");
  }
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
