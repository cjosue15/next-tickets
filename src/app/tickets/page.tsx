import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { TicketCard } from "@/components/ticket-card";
import { getTickets } from "./tickets.api";
import Link from "next/link";
import { TicketPagination } from "@/components/ticket-pagination";
import { TicketFilter } from "@/components/ticket-filter";

interface Params {
  searchParams?: Promise<{
    page: number;
    limit: number;
    status: string;
  }>;
}

export default async function TicketsPage({ searchParams }: Params) {
  const page = Number((await searchParams)?.page || 1);
  const limit = Number((await searchParams)?.limit || 2);
  const status = (await searchParams)?.status;

  const { tickets, totalPages } = await getTickets({ page, limit, status });

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

      <div>
        <TicketFilter status={status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.length > 0
          ? tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          : "No tickets found"}
      </div>

      <div className="mt-8">
        <TicketPagination
          currentPage={page}
          totalPages={totalPages}
          limit={limit}
        />
      </div>
    </div>
  );
}
