import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMeQuery } from '../../generated/graphql';
import { isServer } from '../../utils/isServer';
import LoggedIn from './LoggedIn';
import NotLoggedIn from './NotLoggedIn';

const Navbar: React.FC = () => {
  const { colorMode } = useColorMode();
  const color = useColorModeValue('lightText', 'darkText');
  const navBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const inputBorder = useColorModeValue('#edeff1', '#343536');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');

  const { data } = useMeQuery({
    skip: isServer(),
  });

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dropdownButtonRef = useRef() as MutableRefObject<HTMLButtonElement>;

  const toggleDropdown: any = (value: boolean) => {
    if (value !== null) {
      return setDropdownIsOpen(value);
    }
    return useCallback(() => setDropdownIsOpen, [
      dropdownIsOpen,
      setDropdownIsOpen,
    ]);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === dropdownButtonRef.current) {
      return null;
    }
    if (!dropdownRef.current.contains(event.target as Node)) {
      return toggleDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

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
              notReddit
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
          {!data?.me ? (
            <NotLoggedIn
              dropdownRef={dropdownRef}
              dropdownButtonRef={dropdownButtonRef}
              dropdownIsOpen={dropdownIsOpen}
              toggleDropdown={toggleDropdown}
            />
          ) : (
            <LoggedIn
              user={data.me}
              dropdownRef={dropdownRef}
              dropdownButtonRef={dropdownButtonRef}
              dropdownIsOpen={dropdownIsOpen}
              toggleDropdown={toggleDropdown}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
