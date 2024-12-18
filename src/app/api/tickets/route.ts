/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { ticketSchema } from "@/lib/schemas/ticket.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const url = await request.url;

    const { searchParams } = new URL(url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 2);

    const count = await prisma.ticket.count();

    const totalPages = Math.ceil(count / limit);

    const tickets = await prisma.ticket.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json({ tickets, totalPages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, assignedTo, status } = ticketSchema.parse(body);

    await prisma.ticket.create({
      data: {
        title,
        description,
        assignedTo,
        status,
      },
    });

    return NextResponse.json({ message: "Ticket created successfully" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
