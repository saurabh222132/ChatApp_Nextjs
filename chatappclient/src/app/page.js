"use client";

import { PageLoading } from "@/redux/commonfiles/PageLoading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  });
  return (
    <div className=" ">
      <PageLoading> </PageLoading>
    </div>
  );
};

export default Homepage;
