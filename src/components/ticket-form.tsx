"use client";

import { Ticket, TicketStatus } from "@/app/tickets/tickets.interface";
import { useToast } from "@/hooks/use-toast";

import { createTicket, updateTicket } from "@/app/tickets/tickets.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Inputs {
  title: string;
  assignedTo: string;
  status: TicketStatus;
  description: string;
}

export const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const router = useRouter();

  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      title: ticket?.title,
      assignedTo: ticket?.assignedTo,
      status: ticket?.status,
      description: ticket?.description,
    },
  });

  const handleChange = (status: string) => {
    setValue("status", status as TicketStatus);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any;

      if (ticket?.id) {
        response = await updateTicket(ticket.id, {
          assignedTo: data.assignedTo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      } else {
        response = await createTicket({
          assignedTo: data.assignedTo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      }

      toast({
        title: "Success",
        description: response.message,
      });

      router.push("/tickets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Label className="block mb-2" htmlFor="title">
          Title
        </Label>
        <Input {...register("title", { required: true })} id="title" />
      </div>

      <div>
        <Label className="block mb-2" htmlFor="assigned">
          Assigned To
        </Label>
        <Input {...register("assignedTo", { required: true })} id="assigned" />
      </div>

      <div>
        <Label className="block mb-2" htmlFor="assigned">
          Status
        </Label>
        <Select defaultValue={ticket?.status} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">To do</SelectItem>
            <SelectItem value="IN_PROGRESS">In progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block mb-2" htmlFor="description">
          Description
        </Label>
        <Textarea {...register("description")} id="description" />
      </div>

      <div className="flex justify-between gap-4">
        <Button type="submit">
          {ticket?.id ? "Edit ticket" : "Create ticket"}
        </Button>

        <Button asChild variant="secondary">
          <Link href={"/tickets"}>Back</Link>
        </Button>
      </div>
    </form>
  );
};
