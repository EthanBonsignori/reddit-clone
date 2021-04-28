import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import {
  RedditCoinIcon,
  RedditKarmaIcon,
  RedditOnlineIcon,
  RedditSnooAvatarIcon,
} from '../../assets/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
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
  const [onlineStatus, setOnlineStatus] = useLocalStorage('onlineStatus', true);
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const buttonHoverBorder = useColorModeValue('#edeff1', '#343536');
  const snooIconBg = useColorModeValue('#d7dfe2', 'darkIcon');
  const onlineCircleFill = useColorModeValue('white', 'black');

  const { username } = user;

  const toggleOnlineStatus = () => {
    setOnlineStatus(!onlineStatus);
  };

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
        maxW='215px'
        border='1px solid'
        borderColor={dropdownIsOpen ? buttonHoverBorder : 'transparent'}
        borderRadius='4px'
        padding='2px 0'
        minH='32px'
        ml='8px'
        _hover={{
          borderColor: buttonHoverBorder,
        }}
        _active={{
          background: bg,
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
          fontSize='100%'>
          <Box mr='5px' pos='relative'>
            <RedditSnooAvatarIcon
              float='left'
              borderRadius='4px'
              maxHeight='24px'
              maxWidth='24px'
              height='24px'
              width='24px'
              background={snooIconBg}
              fill='#fff'
            />
            {onlineStatus && (
              <RedditOnlineIcon
                fill='#46d160'
                height='50%'
                position='absolute'
                top='59%'
                left='59%'
                width='50%'
                sx={{
                  '.onlineCircle': {
                    fill: onlineCircleFill,
                  },
                }}
              />
            )}
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
              ml='8px'>
              <RedditCoinIcon
                marginRight='2px'
                marginBottom='2.5px'
                width='10px'
                height='10px'
                color='#DDBD37'
              />
              0
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
        onlineStatus={onlineStatus}
        toggleOnlineStatus={toggleOnlineStatus}
        dropdownRef={dropdownRef}
        dropdownIsOpen={dropdownIsOpen}
      />
    </Flex>
  );
};

export default LoggedIn;
