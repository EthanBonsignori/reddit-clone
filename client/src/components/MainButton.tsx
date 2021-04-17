import { Button } from '@chakra-ui/button';

interface MainButtonProps {
  text: string;
  color: string;
  bg: string;
  border: string;
  marginLeft?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  text,
  color,
  bg,
  border,
  marginLeft,
}) => {
  return (
    <Button
      as='a'
      cursor='pointer'
      fontFamily='Noto Sans, Arial, sans-serif'
      fontWeight='700'
      lineHeight='17px'
      padding='4px 16px'
      h='34px'
      minW='32px'
      width='auto'
      marginLeft={marginLeft || '0'}
      fontSize='14px'
      color={color}
      bg={bg}
      border='1px solid'
      borderColor={border}
      borderRadius='9999px'
      _hover={{
        opacity: '0.8',
      }}>
      {text}
    </Button>
  );
};

export default MainButton;
