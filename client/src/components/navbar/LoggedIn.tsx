import { TriangleDownIcon } from '@chakra-ui/icons';
import { Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { useLogoutMutation } from '../../generated/graphql';
import DropdownMenu from './DropdownMenu';

interface LoggedInProps {
  user: Record<string, unknown>;
  dropdownRef: React.MutableRefObject<HTMLDivElement>;
  dropdownButtonRef: React.MutableRefObject<HTMLButtonElement>;
  dropdownIsOpen: boolean;
  toggleDropdown: React.MouseEventHandler<HTMLButtonElement>;
}

const LoggedIn: React.FC<LoggedInProps> = ({
  user,
  dropdownRef,
  dropdownButtonRef,
  dropdownIsOpen,
  toggleDropdown,
}) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  return (
    <Flex flexDirection='row' alignItems='center' flexGrow={0}>
      <Button
        ref={dropdownButtonRef}
        onClick={toggleDropdown}
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
        {user.username}
        <TriangleDownIcon color={iconColor} pointerEvents='none' />
      </Button>
      <Button
        onClick={() => logout()}
        disabled={logoutFetching}
        isLoading={logoutFetching}>
        Logout
      </Button>
      <DropdownMenu
        loggedIn={true}
        dropdownRef={dropdownRef}
        dropdownIsOpen={dropdownIsOpen}
      />
    </Flex>
  );
};

export default LoggedIn;
