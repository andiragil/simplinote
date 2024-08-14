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
  ButtonGroup,
  useDisclosure,
  ChakraProvider
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Note = {
    id: number;
    title: string;
    body: string;
}


const DeleteNote = ({ note }: { note: Note }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    const handleDelete = async () => {
        try {
           await axios.delete(`/api/notes/${note.id}`);
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Failed to delete the note:', error);
        }
    };
    
    return (
        <ChakraProvider>
            <Button colorScheme='red' size='sm' variant='solid' onClick={onOpen}>Delete Notes</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Notes</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                          <p>Do you want to delete {note.title}?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" colorScheme='gray' variant='solid' onClick={onClose}>Cancel</Button>
                        <Button type="button" colorScheme='red' variant='solid' onClick={handleDelete}>Yes</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};
export default DeleteNote;
