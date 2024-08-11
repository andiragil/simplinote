import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Note } from "@prisma/client";


const prisma = new PrismaClient();

export const DELETE = async(request: Request, {params}: {params: {id: string}}) =>{
    const note = await prisma.note.delete({
        where:{
            id:Number(params.id),
        }
    });
    return NextResponse.json(note, {status: 200});
} 


export const PATCH = async(request: Request, {params}: {params: {id: string}}) =>{
    const body = await request.json();
    const note = await prisma.note.update({
        where:{
            id:Number(params.id),
        },
        data:{
            title:body.title,
            body:body.body,
        }
    });
    return NextResponse.json(note, {status: 200});
} 

