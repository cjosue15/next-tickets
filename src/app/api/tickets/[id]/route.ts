/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { ticketSchema } from "@/lib/schemas/ticket.schema";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(_: any, { params }: Params) {

    try {
        const { id } = await params;

        const ticket = await prisma.ticket.findFirst({
            where: {
                id
            }
        })

        return NextResponse.json({ ticket });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: Params) {

    try {
        const { id } = await params;

        const body = await request.json();

        const { title, description, assignedTo, status } = ticketSchema.parse(body)

        const ticket = await prisma.ticket.update({
            data: {
                title, description, assignedTo, status
            },
            where: {
                id
            }
        })

        return NextResponse.json({ ticket });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: Params) {

    try {
        const { id } = await params;


        await prisma.ticket.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: 'Ticket deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}