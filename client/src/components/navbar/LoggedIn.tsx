import { TriangleDownIcon } from '@chakra-ui/icons';
import { Flex, Button, useColorModeValue } from '@chakra-ui/react';
import DropdownMenu from './DropdownMenu';
import { useLogoutMutation } from '../../generated/graphql';

interface LoggedInProps {
  user: Record<string, unknown>;
}

const LoggedIn: React.FC<LoggedInProps> = ({ user }) => {
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  return (
    <Flex flexDirection='row' alignItems='center' flexGrow={0}>
      <Button
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
        {user.username}
        <TriangleDownIcon color={iconColor} />
      </Button>
      <Button
        onClick={() => logout()}
        disabled={logoutFetching}
        isLoading={logoutFetching}>
        Logout
      </Button>
      <DropdownMenu loggedIn={true} />
    </Flex>
  );
};

export default LoggedIn;
