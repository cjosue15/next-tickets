import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { TicketCard } from "@/components/ticket-card";
import { getTickets } from "./tickets.api";
import Link from "next/link";
import { TicketPagination } from "@/components/ticket-pagination";

interface Params {
  searchParams?: Promise<{
    page: number;
    limit: number;
  }>;
}

export default async function TicketsPage({ searchParams }: Params) {
  const page = Number((await searchParams)?.page || 1);
  const limit = Number((await searchParams)?.limit || 2);

  const { tickets, totalPages } = await getTickets({ page, limit });

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tickets</h1>

        <Button asChild>
          <Link href="/tickets/new">
            Add new ticket <LucidePlusCircle />
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>

      <div>
        <TicketPagination
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
    </div>
  );
}
