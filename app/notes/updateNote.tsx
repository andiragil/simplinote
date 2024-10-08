'use client';
import { Modal, ModalOverlay, IconButton, ModalContent, ModalHeader, ModalFooter, ModalBody, Spinner, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, useDisclosure, ChakraProvider } from '@chakra-ui/react';
import React, { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';

type Note = {
  id: number;
  title: string;
  body: string;
};

const UpdateNote = ({ note }: { note: Note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`/api/notes/${note.id}`, {
        title,
        body,
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Failed to update the note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <IconButton aria-label="Edit Note" icon={<FaEdit />} colorScheme="teal" variant="solid" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdate}>
            <ModalBody>
              {loading ? (
                <Spinner size="xl" />
              ) : (
                <>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" placeholder="Input title here" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Note content</FormLabel>
                    <Textarea placeholder="Input note here" value={body} onChange={(e) => setBody(e.target.value)} />
                  </FormControl>
                </>
              )}
            </ModalBody>
            <ModalFooter className="space-x-2">
              <Button type="button" colorScheme="gray" variant="solid" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default UpdateNote;
