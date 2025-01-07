"use client";

import DashboardDrawer from "@/components/dashboard/DashboardDrawer/DashboardDrawer";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const loggedIn = isLoggedIn();
        if (!loggedIn) {
          router.push("/login");
          return;
        }

        const userInfo = await getUserInfo();
        if (userInfo?.role !== "admin") {
          router.push("/login");
          return;
        }

        setHasAccess(true);
      } catch (error) {
        console.error("Error checking access:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return null;
  }

  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
