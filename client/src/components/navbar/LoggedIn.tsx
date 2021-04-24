import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
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
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const buttonHoverBorder = useColorModeValue('#edeff1', '#343536');
  const { username } = user;

  return (
    <Flex flexDirection='row' alignItems='center' flexGrow={0}>
      <Button
        ref={dropdownButtonRef}
        onClick={toggleDropdown}
        bg={bg}
        display='flex'
        alignItems='center'
        flexDir='row'
        width='100%'
        border='1px solid'
        borderColor='transparent'
        borderRadius='4px'
        padding='2px 0'
        minH='32px'
        ml='8px'
        _hover={{
          borderColor: buttonHoverBorder,
        }}
        _focus={{
          outline: 'none',
        }}>
        <Box
          w='175px'
          ml='8px'
          textAlign='left'
          display='flex'
          alignItems='center'
          verticalAlign='baseline'
          fontSize='100%'>
          <Box mr='5px' pos='relative'>
            <Box
              float='left'
              borderRadius='4px'
              maxH='24px'
              maxW='24px'
              height='24px'
              width='24px'
              border='1px solid'
              borderColor={color}
            />
          </Box>
          <Text as='span' display='block'>
            <Text
              as='span'
              fontSize='12px'
              fontWeight='500'
              lineHeight='16px'
              display='block'
              whiteSpace='nowrap'
              color={color}>
              {username as string}
            </Text>
            <Text
              as='span'
              fontSize='12px'
              fontWeight='500'
              lineHeight='16px'
              color='textMuted'>
              0 notKarma
            </Text>
            <Text
              as='span'
              fontSize='12px'
              fontWeight='500'
              lineHeight='16px'
              color='textMuted'
              ml='8px'>
              $ 0
            </Text>
          </Text>
          <TriangleDownIcon
            color={iconColor}
            pointerEvents='none'
            height='10px'
            width='10px'
            maxHeight='10px'
            maxWidth='10px'
            ml='2px'
            verticalAlign='middle'
            position='absolute'
            right='10px'
          />
        </Box>
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
