import { Flex } from '@chakra-ui/layout';

const FormLinks: React.FC = ({ children }) => {
  return (
    <Flex direction='column' mt={6}>
      {children}
    </Flex>
  );
};

export default FormLinks;
