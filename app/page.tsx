import { PrismaClient } from '@prisma/client';
import React from 'react';
import AddNote from './notes/addNote';
import DeleteNote from './notes/deleteNote';
import UpdateNote from './notes/updateNote';
import { ChakraProvider, SimpleGrid, Card, CardHeader, Heading, CardBody, Text, CardFooter, Button, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';

const prisma = new PrismaClient();

const getNotes = async () => {
  const response = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      created_at: true,
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
        <div className="mx-2">
          <h1 className="text-3xl font-bold text-gray-800 my-4 border-b-2 border-teal-500 pb-2">
            Simpli <span className="font-light">Note</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 italic">"Stay Organized, Stay Simple"</p>
          <div className="flex justify-between items-center mt-4 mb-2">
            <AddNote />
          </div>
        </div>
        <SimpleGrid spacing={4} className="mx-3" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}>
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <Heading size="md" className="truncate">
                  {note.title}
                </Heading>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Created at {new Date(note.created_at).toLocaleDateString()}
                </Text>
              </CardHeader>
              <CardBody>
                <Text className="overflow-hidden overflow-ellipsis whitespace-nowrap max-h-20">{note.body}</Text>
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
