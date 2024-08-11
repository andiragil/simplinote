import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Note } from "@prisma/client";


const prisma = new PrismaClient();

export const POST = async(request: Request) =>{
    const body: Note = await request.json();
    const note = await prisma.note.create({
        data:{
            title: body.title,
            body: body.body,
        }
    });
    return NextResponse.json(note,{status:201});
} 
