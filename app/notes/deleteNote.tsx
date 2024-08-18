'use client';
import React, { useState } from 'react';
import { Modal, ModalOverlay, Text, IconButton, Spinner, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

type Note = {
  id: number;
  title: string;
  body: string;
};

const DeleteNote = ({ note }: { note: Note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/notes/${note.id}`);
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Failed to delete the note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <IconButton aria-label="Delete Note" icon={<FaTrash />} colorScheme="red" variant="solid" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Notes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{loading ? <Spinner size="xl" /> : <Text>Are you sure you want to delete this note?</Text>}</ModalBody>
          <ModalFooter className="space-x-2">
            <Button type="button" colorScheme="gray" variant="solid" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" colorScheme="red" variant="solid" onClick={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};
export default DeleteNote;
