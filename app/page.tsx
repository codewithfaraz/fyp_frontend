"use client";
import { useRouter } from "next/navigation";
import MainHeader from "@/components/shared/Header/main-header";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("loginToken");

  if (!token) {
    router.push("/signin");
  }
  console.log(token);

  return (
    <>
      <MainHeader />
    </>
  );
}
