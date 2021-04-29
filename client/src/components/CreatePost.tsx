import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Link } from '@chakra-ui/layout';
import NextLink from 'next/link';
import {
  RedditLinkPostIcon,
  RedditPicturePostIcon,
  RedditSnooAvatarIcon,
} from '../assets/icons';
const CreatePost: React.FC = () => {
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const border = useColorModeValue('#ccc', '#343536');
  const linkBorder = useColorModeValue('#edeff1', '#343536');
  const iconBg = useColorModeValue('#d7dfe2', 'darkIcon');
  const iconHoverBg = useColorModeValue('#EDEDED', '#29292B');
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const hoverInputBg = useColorModeValue('white', 'black');
  const pictureIconBg = useColorModeValue('mainBlue', 'darkText');
  const linkIconBg = useColorModeValue('lightIcon', 'darkIcon');
  return (
    <Flex
      bg={bg}
      border='1px solid'
      borderColor={border}
      margin='0 !important'
      marginBottom='16px !important'
      padding='8px'>
      <NextLink href='/create-post' passHref>
        <Link
          flexBasis='38px'
          width='38px'
          height='38px'
          border='1px solid'
          borderColor={linkBorder}
          borderRadius='50%'
          marginRight='8px'>
          <RedditSnooAvatarIcon
            bg={iconBg}
            fill='#fff'
            width='38px'
            height='38px'
            borderRadius='50%'
          />
        </Link>
      </NextLink>
      <NextLink href='/create-post' passHref>
        <Link
          as='input'
          bg={inputBg}
          flex='1'
          border='1px solid'
          borderColor={linkBorder}
          borderRadius='4px'
          display='block'
          outline='none'
          marginRight='8px'
          padding='0 16px'
          placeholder='Create Post'
          cursor='text'
          boxShadow='none'
          transition='none'
          _hover={{
            textDecor: 'none',
            borderColor: '#d7dadc',
            bg: hoverInputBg,
          }}></Link>
      </NextLink>
      <NextLink href='/create-post' passHref>
        <Link
          color={pictureIconBg}
          fill={pictureIconBg}
          display='flex'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          borderRadius='4px'
          padding='0'
          position='relative'
          border='1px solid transparent'
          width='auto'
          minHeight='40px'
          minWidth='40px'
          boxSizing='border-box'
          transition='none'
          _hover={{
            bg: iconHoverBg,
          }}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
          }}>
          <RedditPicturePostIcon
            display='inline-block'
            height='20px'
            width='20px'
            fontSize='20px'
            lineHeight='20px'
          />
        </Link>
      </NextLink>
      <NextLink href='/create-post' passHref>
        <Link
          color={linkIconBg}
          fill={linkIconBg}
          display='flex'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          borderRadius='4px'
          padding='0'
          position='relative'
          border='1px solid transparent'
          width='auto'
          minHeight='40px'
          minWidth='40px'
          boxSizing='border-box'
          transition='none'
          _hover={{
            bg: iconHoverBg,
          }}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
          }}>
          <RedditLinkPostIcon
            display='inline-block'
            height='20px'
            width='20px'
            fontSize='20px'
            lineHeight='20px'
          />
        </Link>
      </NextLink>
    </Flex>
  );
};

export default CreatePost;
