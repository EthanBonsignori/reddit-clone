import NextLink from 'next/link';
import { Button } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { MoonIcon } from '@chakra-ui/icons';
import { Box, Heading, Link } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { useLogoutMutation } from '../../generated/graphql';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useApolloClient } from '@apollo/client';

interface DropdownMenuProps {
  loggedIn: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ loggedIn }) => {
  const [onlineStatus, setOnlineStatus] = useLocalStorage('onlineStatus', true);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const borderColor = useColorModeValue('#edeff1', '#343536');
  const headerColor = useColorModeValue('#878a8c', '#818384');
  const buttonColor = useColorModeValue('#1c1c1c', '#d7dadc');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const buttonHoverBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const buttonHoverColor = useColorModeValue('#ffffff', '#1c1c1c');

  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  const toggleColor = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    toggleColorMode();
  };

  return (
    <>
      <Box
        bg={bg}
        width='213px'
        maxH='80%'
        position='fixed'
        right='0px'
        top='39.5px'
        border='1px solid'
        borderColor={borderColor}
        borderRadius='0 0 4px 4px'
        overflow='hidden'
        pt='6px'
        zIndex='80'>
        {loggedIn ? (
          <>
            <Heading
              as='h3'
              color={headerColor}
              fontSize='10px'
              fontWeight='700'
              lineHeight='12px'
              letterSpacing='.5px'
              textTransform='uppercase'
              fontFamily='IBM Plex Sans'
              margin='8px 0 4px 12px'>
              Online Status
            </Heading>
            <Button
              className='nightModeButton'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
              bg='none'
              borderRadius='0'
              height='40px'
              margin='4px 0'
              padding='10px 16px 10px 12px'
              width='100%'
              fontSize='14px'
              fontWeight='500'
              lineHeight='18px'
              fontFamily='IBM Plex Sans'
              color={buttonColor}
              _hover={{
                bg: buttonHoverBg,
                color: buttonHoverColor,
              }}
              _focus={{
                boxShadow: 'none',
              }}
              onClickCapture={() => setOnlineStatus(!onlineStatus)}>
              {onlineStatus ? 'On' : 'Off'}
              <Switch
                sx={{
                  '.nightModeButton:hover & .css-1b2twv6': {
                    background: 'rgba(26, 26, 27, 0.1)',
                  },
                  '.css-166s8ot[data-checked]': {
                    background: 'mainBlue',
                  },
                }}
                aria-label='Dark Mode Toggle'
                pointerEvents='none'
                transition='none'
                isChecked={onlineStatus}
              />
            </Button>
            <Heading
              as='h3'
              color={headerColor}
              fontSize='10px'
              fontWeight='700'
              lineHeight='12px'
              letterSpacing='.5px'
              textTransform='uppercase'
              fontFamily='IBM Plex Sans'
              margin='8px 0 4px 12px'>
              My Stuff
            </Heading>
            <Button
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
              bg='none'
              borderRadius='0'
              height='40px'
              padding='10px 16px 10px 48px'
              width='100%'
              fontSize='14px'
              fontWeight='500'
              lineHeight='18px'
              fontFamily='IBM Plex Sans'
              color={buttonColor}
              _hover={{
                bg: buttonHoverBg,
                color: buttonHoverColor,
              }}
              _focus={{
                boxShadow: 'none',
              }}>
              Profile
            </Button>
            <Button
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
              bg='none'
              borderRadius='0'
              height='40px'
              padding='10px 16px 10px 48px'
              width='100%'
              fontSize='14px'
              fontWeight='500'
              lineHeight='18px'
              fontFamily='IBM Plex Sans'
              color={buttonColor}
              _hover={{
                bg: buttonHoverBg,
                color: buttonHoverColor,
              }}
              _focus={{
                boxShadow: 'none',
              }}>
              Create Avatar
            </Button>
            <Button
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              textAlign='left'
              bg='none'
              borderRadius='0'
              height='40px'
              padding='10px 16px 10px 48px'
              width='100%'
              fontSize='14px'
              fontWeight='500'
              lineHeight='18px'
              fontFamily='IBM Plex Sans'
              color={buttonColor}
              _hover={{
                bg: buttonHoverBg,
                color: buttonHoverColor,
              }}
              _focus={{
                boxShadow: 'none',
              }}>
              User Settings
            </Button>
          </>
        ) : null}
        <Heading
          as='h3'
          color={headerColor}
          fontSize='10px'
          fontWeight='700'
          lineHeight='12px'
          letterSpacing='.5px'
          textTransform='uppercase'
          fontFamily='IBM Plex Sans'
          margin='8px 0 4px 12px'>
          View Options
        </Heading>
        <Button
          className='nightModeButton'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          textAlign='left'
          bg='none'
          borderRadius='0'
          height='40px'
          margin='4px 0'
          padding='10px 16px 10px 48px'
          width='100%'
          fontSize='14px'
          fontWeight='500'
          lineHeight='18px'
          fontFamily='IBM Plex Sans'
          color={buttonColor}
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
          }}
          _focus={{
            boxShadow: 'none',
          }}
          onClickCapture={toggleColor}>
          <MoonIcon
            position='absolute'
            left='16px'
            top='10px'
            width='20px'
            height='20px'
            color={iconColor}
            transition='none'
            sx={{
              '.nightModeButton:hover &': {
                color: colorMode === 'light' ? '#fff' : '#000',
              },
            }}
          />
          Night Mode
          <Switch
            sx={{
              '.nightModeButton:hover & .css-1b2twv6': {
                background: 'rgba(26, 26, 27, 0.1)',
              },
              '.css-166s8ot[data-checked]': {
                background: 'mainBlue',
              },
            }}
            aria-label='Dark Mode Toggle'
            pointerEvents='none'
            transition='none'
            isChecked={colorMode === 'dark'}
          />
        </Button>
        <Heading
          as='h3'
          color={headerColor}
          fontSize='10px'
          fontWeight='700'
          lineHeight='12px'
          letterSpacing='.5px'
          textTransform='uppercase'
          fontFamily='IBM Plex Sans'
          margin='8px 0 4px 12px'>
          More Stuff
        </Heading>
        <Button
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          textAlign='left'
          bg='none'
          borderRadius='0'
          height='40px'
          padding='10px 16px 10px 48px'
          width='100%'
          fontSize='14px'
          fontWeight='500'
          lineHeight='18px'
          fontFamily='IBM Plex Sans'
          color={buttonColor}
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
          }}
          _focus={{
            boxShadow: 'none',
          }}>
          Reddit Coins
        </Button>
        <Button
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          textAlign='left'
          bg='none'
          borderRadius='0'
          height='40px'
          padding='10px 16px 10px 48px'
          width='100%'
          fontSize='14px'
          fontWeight='500'
          lineHeight='18px'
          fontFamily='IBM Plex Sans'
          color={buttonColor}
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
          }}
          _focus={{
            boxShadow: 'none',
          }}>
          Reddit Premium
        </Button>
        <Button
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          textAlign='left'
          bg='none'
          borderRadius='0'
          height='40px'
          padding='10px 16px 10px 48px'
          width='100%'
          fontSize='14px'
          fontWeight='500'
          lineHeight='18px'
          fontFamily='IBM Plex Sans'
          color={buttonColor}
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
          }}
          _focus={{
            boxShadow: 'none',
          }}>
          Help Center
        </Button>
        <Box borderTop='1px solid' borderColor={borderColor} margin='0 16px' />
        {loggedIn ? (
          <Button
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            textAlign='left'
            bg='none'
            borderRadius='0'
            height='40px'
            padding='10px 16px 10px 48px'
            width='100%'
            fontSize='14px'
            fontWeight='500'
            lineHeight='18px'
            fontFamily='IBM Plex Sans'
            color={buttonColor}
            _hover={{
              bg: buttonHoverBg,
              color: buttonHoverColor,
            }}
            _focus={{
              boxShadow: 'none',
            }}
            disabled={logoutLoading}
            isLoading={logoutLoading}
            onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <NextLink href='/login' passHref>
            <Link _hover={{ textDecoration: 'none' }}>
              <Button
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                textAlign='left'
                bg='none'
                borderRadius='0'
                height='40px'
                padding='10px 16px 10px 48px'
                width='100%'
                fontSize='14px'
                fontWeight='500'
                lineHeight='18px'
                fontFamily='IBM Plex Sans'
                color={buttonColor}
                _hover={{
                  bg: buttonHoverBg,
                  color: buttonHoverColor,
                }}
                _focus={{
                  boxShadow: 'none',
                }}>
                Log In / Sign Up
              </Button>
            </Link>
          </NextLink>
        )}
      </Box>
    </>
  );
};

export default DropdownMenu;
