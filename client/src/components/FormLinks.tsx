import { Box } from '@chakra-ui/layout';

const FormLinks: React.FC = ({ children }) => {
  return (
    <Box
      color='black'
      direction='row'
      marginTop='24px'
      marginBottom='20px'
      fontFamily='Noto Sans, sans-serif'
      fontSize='12px'
      fontWeight='400'
      lineHeight='18px'>
      {children}
    </Box>
  );
};

export default FormLinks;
