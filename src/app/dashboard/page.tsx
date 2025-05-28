import { headers } from "next/headers";

import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <div>
      <h1>{session?.user?.name}</h1>
    </div>
  );
};

export default DashboardPage;
