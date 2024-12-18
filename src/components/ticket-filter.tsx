"use client";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TicketFilter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleStatus = (status: string = "ALL") => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (status === "ALL") {
      newSearchParams.delete("status");
    } else {
      newSearchParams.set("status", status.toString());
    }
    newSearchParams.set("page", "1");
    newSearchParams.set("limit", "2");

    router.replace(`${pathName}/?${newSearchParams.toString()}`);
  };

  return (
    <Tabs value={status} onValueChange={handleStatus} className="mb-6">
      <TabsList>
        <TabsTrigger value="ALL">All</TabsTrigger>
        <TabsTrigger value="TODO">Todo</TabsTrigger>
        <TabsTrigger value="INPROGRESS">In Progress</TabsTrigger>
        <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
        <TabsTrigger value="DONE">Done</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}