import React from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';

const SearchNote = ({}) => {
  return (
    <InputGroup className="w-full me-3">
      <Input focusBorderColor="teal.400" type="text" placeholder="Search notes" className="shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
      <InputRightElement>
        <Button>Cari</Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchNote;
