"use client";

import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export const TicketPagination = ({ currentPage, totalPages, limit }: Props) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    handlePage(currentPage);
  }, []);

  const handlePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", limit.toString());
    router.replace(`${pathName}/?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => handlePage(currentPage - 1)}
      >
        <LucideChevronLeft />
      </Button>
      <span className="font-bold">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="ghost"
        disabled={currentPage === totalPages}
        onClick={() => handlePage(currentPage + 1)}
      >
        <LucideChevronRight />
      </Button>
    </div>
  );
};
