'use client';
import { Modal, Spinner, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, useDisclosure, ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddNote = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/notes', {
        title: title,
        body: body,
      });
      setTitle('');
      setBody('');
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Failed to add the note:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Button colorScheme="teal" variant="solid" onClick={onOpen}>
        Add Notes
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Your Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              {loading ? (
                <Spinner size="xl" />
              ) : (
                <>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input type="text" className="input input-bordered w-full" placeholder="Input title here" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Note content</FormLabel>
                    <Textarea className="input input-bordered w-full" placeholder="Input note here" value={body} onChange={(e) => setBody(e.target.value)} />
                  </FormControl>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" variant="solid" onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" variant="solid">
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default AddNote;
