"use client";

import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LucideTrash } from "lucide-react";
import { deleteTicket } from "@/app/tickets/tickets.api";
import { revalidate } from "@/lib/actions";
import Link from "next/link";
import { MouseEvent } from "react";

const TICKET_STATUS_VARIANTS = {
  TODO: "default",
  IN_PROGRESS: "secondary",
  REJECTED: "destructive",
  DONE: "success",
} as const;

const getStatusVariant = (
  status: TicketStatus
): "default" | "secondary" | "destructive" | "outline" | "success" => {
  return TICKET_STATUS_VARIANTS[status];
};

const getStatusName = (status: TicketStatus) => {
  const names = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    DONE: "Done",
    REJECTED: "Rejected",
  };

  return names[status] ?? "unknown";
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await deleteTicket(ticket.id);
      await revalidate("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link href={`/tickets/${ticket.id}/edit`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {ticket.title}
            <Button
              onClick={(event) => handleDelete(event)}
              size="sm"
              variant="ghost"
            >
              <LucideTrash />
            </Button>
          </CardTitle>
          <CardDescription>
            {ticket.description || "No description."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(ticket.status)}>
            {getStatusName(ticket.status)}
          </Badge>
        </CardContent>
        <CardFooter>
          <p className="font-bold">Assigned to: {ticket.assignedTo}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
