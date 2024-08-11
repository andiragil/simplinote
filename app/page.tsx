import { PrismaClient } from '@prisma/client';
import React from 'react';
import AddNote from './notes/addNote';
import DeleteNote from './notes/deleteNote';
import UpdateNote from './notes/updateNote';
import SearchNote from './notes/searchNote';
import { ChakraProvider, SimpleGrid, Card, CardHeader, Heading, CardBody, Text, CardFooter, Button, Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';

const prisma = new PrismaClient();

const getNotes = async () => {
  const response = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      body: true,
    },
  });
  return response;
};

const Notes = async () => {
  const notes = await getNotes();

  return (
    <ChakraProvider>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 my-4 border-b-2 border-teal-500 pb-2">SimpliNote</h1>
        <p className="text-xl text-gray-600 mb-6 italic">"Stay Organized, Stay Simple"</p>
        <div className="flex justify-between items-center mt-4 mb-2">
          <SearchNote />
          <AddNote />
        </div>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <Heading size="md">{note.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{note.body}</Text>
              </CardBody>
              <CardFooter>
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
