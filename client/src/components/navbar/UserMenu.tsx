import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  RedditCoinIcon,
  RedditDownCaretIcon,
  RedditKarmaIcon,
  RedditOnlineIcon,
  RedditPersonIcon,
  RedditSnooAvatarIcon,
} from '../../assets/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import MainButton from '../MainButton';
import DropdownMenu from './DropdownMenu';

interface UserMenuProps {
  user?: Record<string, unknown> | null;
  isDropdownOpen: boolean;
  dropdownRef: React.MutableRefObject<HTMLDivElement>;
  dropdownButtonRef: React.MutableRefObject<HTMLButtonElement>;
  toggleDropdown: React.MouseEventHandler<HTMLButtonElement>;
}

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  isDropdownOpen,
  dropdownRef,
  dropdownButtonRef,
  toggleDropdown,
}) => {
  const [onlineStatus, setOnlineStatus] = useLocalStorage('onlineStatus', true);
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const buttonBg = useColorModeValue('lightButtonBg', 'darkButtonBg');
  const navBg = useColorModeValue('lightNavBg', 'darkNavBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const buttonHoverBorder = useColorModeValue('#edeff1', '#343536');
  const snooIconBg = useColorModeValue('#d7dfe2', 'darkIcon');
  const onlineCircleFill = useColorModeValue('white', 'black');

  const toggleOnlineStatus = () => {
    setOnlineStatus(!onlineStatus);
  };

  return (
    <Flex flexDirection='row' alignItems='center' flexGrow={0}>
      {!user ? (
        <>
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
            isDropdownOpen={isDropdownOpen}
          />
        </>
      ) : (
        <Button
          ref={dropdownButtonRef}
          onClick={toggleDropdown}
          bg={bg}
          display='flex'
          alignItems='center'
          flexDir='row'
          width='100%'
          maxW='215px'
          border='1px solid'
          borderColor={isDropdownOpen ? buttonHoverBorder : 'transparent'}
          borderRadius='4px'
          padding='2px 0'
          minH='32px'
          ml='8px'
          _hover={{
            borderColor: buttonHoverBorder,
          }}
          _active={{
            bg: bg,
          }}
          _focus={{
            outline: 'none',
          }}>
          <Box
            w='215px'
            ml='8px'
            textAlign='left'
            display='flex'
            alignItems='center'
            verticalAlign='baseline'
            fontSize='100%'
            pointerEvents='none'>
            <Box mr='5px' pos='relative' pointerEvents='none'>
              <RedditSnooAvatarIcon
                float='left'
                borderRadius='4px'
                maxHeight='24px'
                maxWidth='24px'
                height='24px'
                width='24px'
                background={snooIconBg}
                fill='#fff'
                pointerEvents='none'
              />
              {onlineStatus && (
                <RedditOnlineIcon
                  fill='#46d160'
                  height='50%'
                  position='absolute'
                  top='59%'
                  left='59%'
                  width='50%'
                  pointerEvents='none'
                  sx={{
                    '.onlineCircle': {
                      fill: onlineCircleFill,
                    },
                  }}
                />
              )}
            </Box>
            <Text as='span' display='block' pointerEvents='none'>
              <Text
                as='span'
                fontSize='12px'
                fontWeight='500'
                lineHeight='16px'
                display='block'
                whiteSpace='nowrap'
                color={color}
                pointerEvents='none'>
                {(user?.username as string) || null}
              </Text>
              <Text
                as='span'
                fontSize='12px'
                fontWeight='500'
                lineHeight='16px'
                color='textMuted'
                pointerEvents='none'>
                <RedditKarmaIcon
                  marginRight='2px'
                  marginBottom='2.5px'
                  width='10px'
                  height='10px'
                  color='mainOrange'
                />
                0 notKarma
              </Text>
              <Text
                as='span'
                fontSize='12px'
                fontWeight='500'
                lineHeight='16px'
                color='textMuted'
                ml='8px'
                pointerEvents='none'>
                <RedditCoinIcon
                  marginRight='2px'
                  marginBottom='2.5px'
                  width='10px'
                  height='10px'
                  color='#DDBD37'
                  pointerEvents='none'
                />
                0
              </Text>
            </Text>
            <TriangleDownIcon
              color={iconColor}
              height='10px'
              width='10px'
              maxHeight='10px'
              maxWidth='10px'
              ml='2px'
              verticalAlign='middle'
              position='absolute'
              right='10px'
              pointerEvents='none'
            />
          </Box>
        </Button>
      )}
      <DropdownMenu
        loggedIn={!!user}
        onlineStatus={onlineStatus}
        toggleOnlineStatus={toggleOnlineStatus}
        dropdownRef={dropdownRef}
        isDropdownOpen={isDropdownOpen}
      />
    </Flex>
  );
};

export default UserMenu;
