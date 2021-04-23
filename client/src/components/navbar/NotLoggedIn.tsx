import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { Button, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import MainButton from '../MainButton';
import DropdownMenu from './DropdownMenu';

interface NotLoggedInProps {
  dropdownIsOpen: boolean;
  dropdownRef: React.MutableRefObject<HTMLDivElement>;
  dropdownButtonRef: React.MutableRefObject<HTMLButtonElement>;
  toggleDropdown: React.MouseEventHandler<HTMLButtonElement>;
}

const NotLoggedIn: React.FC<NotLoggedInProps> = ({
  dropdownIsOpen,
  dropdownRef,
  dropdownButtonRef,
  toggleDropdown,
}) => {
  const buttonBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const navBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  return (
    <Flex flexDirection='row' alignItems='center' flexGrow={0}>
      <NextLink href='/login' passHref>
        <Link
          _hover={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}>
          <MainButton
            text='Log In'
            bg='transparent'
            border={buttonBg}
            color={buttonBg}
          />
        </Link>
      </NextLink>
      <Box>
        <NextLink href='/register' passHref>
          <Link
            marginLeft='16px'
            _hover={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <MainButton
              text='Sign Up'
              bg={buttonBg}
              border='bg'
              color={navBg}
            />
          </Link>
        </NextLink>
      </Box>
      <Button
        ref={dropdownButtonRef}
        onClick={toggleDropdown}
        width='70px'
        minH='32px'
        ml='8px'
        outline='none'
        border='1px solid transparent'
        borderRadius='4px'
        _hover={{
          borderColor: '#343536',
        }}
        _focus={{
          outline: 'none',
        }}>
        <TriangleDownIcon color={iconColor} pointerEvents='none' />
      </Button>
      <DropdownMenu
        loggedIn={false}
        dropdownRef={dropdownRef}
        dropdownIsOpen={dropdownIsOpen}
      />
    </Flex>
  );
};

export default NotLoggedIn;
