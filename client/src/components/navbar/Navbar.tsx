import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import { MutableRefObject, useRef, useState } from 'react';
import { useMeQuery } from '../../generated/graphql';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { isServer } from '../../utils/isServer';
import UserMenu from './UserMenu';

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

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef() as MutableRefObject<HTMLDivElement>;

  const closeDropdown = () => setDropdownOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  useOnClickOutside(dropdownRef, closeDropdown);

  return (
    <>
      <Box w='100%' minH='48px' /> {/* Spacer element */}
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
            <NextLink href='/' passHref>
              <Link
                aria-label='home'
                title='Home'
                display='inline-flex'
                alignItems='center'
                flexDirection='row'
                _hover={{
                  textDecoration: 'none',
                }}
                _focus={{
                  outline: 'none',
                }}>
                notReddit
              </Link>
            </NextLink>
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
          <UserMenu
            user={data?.me || null}
            dropdownRef={dropdownRef}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
