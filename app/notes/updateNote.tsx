"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  ChakraProvider
} from '@chakra-ui/react';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Note = {
    id: number;
    title: string;
    body: string;
}

const UpdateNote = ({ note }: { note: Note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/notes/${note.id}`, {
        title,
        body,
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error('Failed to update the note:', error);
    }
  };

  return (
    <ChakraProvider>
      <Button colorScheme='teal' variant='solid' onClick={onOpen}>Edit Note</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdate}>
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  placeholder='Input title here'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note content</FormLabel>
                <Textarea
                  placeholder='Input note here'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme='teal' variant='solid'>Update</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default UpdateNote;
