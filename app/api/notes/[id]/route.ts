import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { Note } from '@prisma/client';

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const note = await prisma.note.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(note, { status: 200 });
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body = await request.json();
  const note = await prisma.note.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: body.title,
      body: body.body,
    },
  });
  return NextResponse.json(note, { status: 200 });
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const note = await prisma.note.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (note) {
    return NextResponse.json(note, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Note not found' }, { status: 404 });
  }
};
