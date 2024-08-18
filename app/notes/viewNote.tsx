'use client';
import { Modal, Spinner, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Text, useDisclosure, ChakraProvider, IconButton } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Note = {
  id: number;
  title: string;
  body: string;
};

const ViewNote = ({ note }: { note: Note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noteDetails, setNoteDetails] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchNoteDetails = async () => {
        try {
          const response = await axios.get(`/api/notes/${note.id}`);
          setNoteDetails(response.data);
        } catch (error) {
          console.error('Failed to fetch note details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNoteDetails();
    }
  }, [isOpen, note.id]);

  return (
    <ChakraProvider>
      <IconButton aria-label="View Note" icon={<FaEye />} colorScheme="teal" variant="solid" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{noteDetails?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Spinner size="xl" />
            ) : (
              <Box>
                <Text fontSize="medium">{noteDetails?.body}</Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ViewNote;
