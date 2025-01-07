"use client";

import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const result = isLoggedIn();
        if (!result) {
          router.push("/login");
        } else {
          setIsLogin(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
