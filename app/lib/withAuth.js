"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check");

      if (!response.ok) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You can only see this if you are logged in.</p>
    </div>
  );
}
