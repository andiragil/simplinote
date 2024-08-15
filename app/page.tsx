import { PrismaClient } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import AddNote from './notes/addNote';
import DeleteNote from './notes/deleteNote';
import UpdateNote from './notes/updateNote';
import { ChakraProvider, SimpleGrid, Box, Text, Heading } from '@chakra-ui/react';

export const dynamic = 'force-dynamic';

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
        <div className="mx-4">
          <h1 className="text-3xl font-bold text-gray-800 my-4 border-b-2 border-teal-500 pb-2">
            Simpli <span className="font-light">Note</span>
          </h1>
          <p className="text-xl text-gray-600 mb-6 italic">&quot;Stay Organized, Stay Simple&quot;</p>
          <div className="flex justify-between items-center mt-4 mb-2">
            <AddNote />
          </div>
        </div>

        {notes.length === 0 ? (
          <Box textAlign="center" mt={10} p={8} border="2px dashed" borderColor="gray.300" borderRadius="md" backgroundColor="gray.50" maxW="lg" mx="auto">
            <Box width="100px" height="100px" backgroundColor="gray.200" borderRadius="full" display="flex" alignItems="center" justifyContent="center" mx="auto" mb={4}>
              <Text fontSize="4xl" color="gray.500">
                📄
              </Text>
            </Box>
            <Heading fontSize="2xl" color="gray.600" fontWeight="bold">
              No notes available
            </Heading>
            <Text fontSize="md" color="gray.500" mt={2}>
              Add your first note by clicking the button above.
            </Text>
          </Box>
        ) : (
          <SimpleGrid spacing={4} className="mx-5" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}>
            {notes.map((note) => (
              <Box key={note.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Heading fontSize="xl">{note.title}</Heading>
                <Text mt={4}>{note.body}</Text>
                <Text mt={2} color="gray.500" fontSize="sm">
                  Dibuat pada: {new Date(note.created_at).toLocaleDateString()}
                </Text>
                <Box mt={4} className="flex justify-end space-x-2">
                  <UpdateNote note={note} />
                  <DeleteNote note={note} />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </div>
    </ChakraProvider>
  );
};

export default Notes;
