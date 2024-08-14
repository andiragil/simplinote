import { PrismaClient } from '@prisma/client';
import React from 'react';
import AddNote from './notes/addNote';
import DeleteNote from './notes/deleteNote';
import UpdateNote from './notes/updateNote';
import { ChakraProvider, SimpleGrid, Card, CardHeader, Heading, CardBody, Text, CardFooter } from '@chakra-ui/react';

const prisma = new PrismaClient();

const getNotes = async () => {
  const response = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
  return response;
};

const Notes = async () => {
  const notes = await getNotes();

  return (
    <ChakraProvider>
      <div className="container mx-auto">
        <div className="mx-4">
          <h1 className="text-3xl font-bold text-gray-800 my-4 border-b-2 border-teal-500 pb-2">
            Simpli <span className="font-light">Note</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 italic">&quot;Stay Organized, Stay Simple&quot;</p>
          <div className="flex justify-between items-center mt-4 mb-2">
            <AddNote />
          </div>
        </div>
        <SimpleGrid spacing={4} className="mx-5" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}>
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <Heading size="md">{note.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{note.body}</Text>
              </CardBody>
              <CardFooter className="flex justify-end space-x-2">
                <UpdateNote note={note} />
                <DeleteNote note={note} />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </ChakraProvider>
  );
};

export default Notes;
