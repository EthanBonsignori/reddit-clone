import { Box, Flex } from '@chakra-ui/layout';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { SearchIcon } from '@chakra-ui/icons';
import DropdownMenu from './DropdownMenu';
import MainButton from './MainButton';

interface NavbarProps {
  color: string;
}

export const Navbar: React.FC<NavbarProps> = ({ color }) => {
  const { colorMode } = useColorMode();
  const navBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const buttonBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputBorder = useColorModeValue('#edeff1', '#343536');
  const navBorder = useColorModeValue('#edeff1', '#343536');

  return (
    <Flex
      as='header'
      w='100%'
      minH='48px'
      bg={navBg}
      pos='fixed'
      top='0'
      right='0'
      mt='0'
      zIndex='100'
      color={color}>
      <Flex
        display='inline-flex'
        alignItems='center'
        justifyContent='space-between'
        flexDirection='row'
        padding='0 20px'
        minW='100%'
        borderBottom={`1px solid ${navBorder}`}>
        {/* Home and Search Wrapper */}
        <Flex
          display='inline-flex'
          alignItems='center'
          flexDirection='row'
          flexGrow={1}
          verticalAlign='baseline'>
          {/* Home Button */}
          <Box
            as='a'
            href='/'
            aria-label='home'
            title='Home'
            display='inline-flex'
            alignItems='center'
            flexDirection='row'>
            reddit
          </Box>
          {/* Search Bar */}
          <Box maxW='690px' margin='0 auto' flexGrow={1}>
            <InputGroup width='100%' flexGrow={1}>
              <InputLeftElement>
                <SearchIcon color='iconGrey' />
              </InputLeftElement>
              <Input
                placeholder='Search'
                fontSize='14px'
                fontWeight='400'
                lineHeight='21px'
                width='100%'
                bg={inputBg}
                border='1px solid transparent'
                borderColor={inputBorder}
                _hover={{
                  borderColor: colorMode === 'light' ? 'mainBlue' : 'white',
                  bg: colorMode === 'light' ? 'white' : 'transparent',
                }}
              />
            </InputGroup>
          </Box>
        </Flex>
        <Flex flexDirection='row' alignItems='center' flexGrow={0}>
          <MainButton
            text='Log In'
            bg='transparent'
            border={buttonBg}
            color={buttonBg}
          />
          <MainButton
            text='Sign Up'
            bg={buttonBg}
            border='bg'
            color={navBg}
            marginLeft='16px'
          />
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
            }}></Button>
          <DropdownMenu />
        </Flex>
      </Flex>
    </Flex>
  );
};
