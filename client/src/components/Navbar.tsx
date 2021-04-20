import { Box, Flex } from '@chakra-ui/layout';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { SearchIcon } from '@chakra-ui/icons';
import { useMeQuery } from '../generated/graphql';
import NotLoggedIn from './navbar/NotLoggedIn';
import LoggedIn from './navbar/LoggedIn';
import { isServer } from '../utils/isServer';

export const Navbar: React.FC = () => {
  const { colorMode } = useColorMode();
  const color = useColorModeValue('lightText', 'darkText');
  const navBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputBorder = useColorModeValue('#edeff1', '#343536');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let menu = <NotLoggedIn />;
  // loading
  if (fetching) {
    // User not logged in
  } else if (!data?.me) {
    menu = <NotLoggedIn />;
    // User logged in
  } else {
    menu = <LoggedIn user={data.me} />;
  }

  return (
    <>
      <Box w='100%' minH='48px' marginBottom={8} /> {/* Spacer element */}
      <Flex
        as='header'
        w='100%'
        minH='48px'
        bg={navBg}
        pos='fixed'
        top='0'
        right='0'
        mt='0 !important'
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
                  <SearchIcon color={iconColor} />
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
          {menu}
        </Flex>
      </Flex>
    </>
  );
};
