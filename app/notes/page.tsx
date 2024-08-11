import { PrismaClient } from '@prisma/client';
import React from 'react';
import AddNote from './addNote';
import DeleteNote from './deleteNote';
import UpdateNote from './updateNote';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'



const prisma = new PrismaClient();

const getNotes = async() => {
    const response = await prisma.note.findMany({
        select:{
            id: true,
            title: true,
            body: true,
        }
    });
    return response;
}

const Notes = async () => {
    const notes = await getNotes();

    return (
    <div>
        <h1 className='text-lg'>Your Notes</h1>
        <div className="mt-4 mb-2">
            <AddNote/>
        </div>
        <table className='table w-full'>
            <thead className='text-left'>
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>body</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {notes.map((note, index)=>(
                <tr key={note.id}>
                    <td>{index + 1}</td>
                    <td>{note.title}</td>
                    <td>{note.body}</td>
                    <td>
                        <UpdateNote note={note} />
                        <DeleteNote note={note} />
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Notes;
