/* eslint-disable @typescript-eslint/indent */
import { ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from '@chakra-ui/button';

type MainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    text: string;
    color: string;
    bg: string;
    border: string;
    isLoading?: boolean;
    disabled?: boolean;
  };

const MainButton: React.FC<MainButtonProps> = ({
  text,
  color,
  bg,
  border,
  isLoading,
  ...props
}) => {
  return (
    <Button
      isLoading={isLoading}
      cursor='pointer'
      fontFamily='Noto Sans, Arial, sans-serif'
      fontWeight='700'
      lineHeight='17px'
      padding='4px 16px'
      h='34px'
      minW='32px'
      width='auto'
      fontSize='14px'
      color={color}
      bg={bg}
      border={border === 'none' ? 'none' : '1px solid'}
      borderColor={border === 'none' ? '' : border}
      borderRadius='9999px'
      _hover={{
        opacity: '0.8',
      }}
      {...props}>
      {text}
    </Button>
  );
};

export default MainButton;
