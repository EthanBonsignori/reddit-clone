import {
  Link,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { RegularPostFragment } from '../../generated/graphql';
import getRelativeTime from '../../utils/getRelativeTime';
import VoteSection from './VoteSection';

interface PostProps {
  post: RegularPostFragment;
  single: boolean;
}

const Post: React.FC<PostProps> = ({ post, single }) => {
  const color = useColorModeValue('lightIcon', 'rgb(129, 131, 132)');
  const titleColor = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const postBg = useColorModeValue('white', 'black');
  const borderColorHover = useColorModeValue('#898989', '#818384');
  const subredditTextColor = useColorModeValue('#1c1c1c', 'darkText');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');
  const borderColor = useColorModeValue('#ccc', '#343536');
  const bottomButtonHover = useColorModeValue(
    'rgba(26, 26, 27, 0.1)',
    'rgba(215, 218, 220, 0.1)',
  );

  return (
    <NextLink href='/post/[id]' as={`/post/${post.id}`} passHref>
      <Link _hover={{ textDecor: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Box
          bg={bg}
          color={color}
          fill={color}
          borderColor={borderColor}
          borderRadius='4px'
          borderWidth='1px'
          pos='relative'
          minWidth='580px'
          marginBottom='10px'
          paddingLeft='40px'
          boxShadow='none'
          transition='color .5s, fill .5s, box-shadow .5s'
          _hover={{
            textDecor: 'none',
            borderColor: single ? borderColor : borderColorHover,
          }}
          _focus={{
            boxShadow: 'none',
          }}>
          <VoteSection post={post} />
          <Box bg={postBg} position='relative' paddingTop='8px'>
            <Flex
              alignItems='start'
              flexFlow='row nowrap'
              fontSize='12px'
              fontWeight='400'
              lineHeight='16px'
              margin='0 8px 8px'
              position='relative'>
              <Image
                src='https://place-hold.it/100x100'
                width='20px'
                height='20px'
                marginRight='4px'
                borderRadius='100%'
                verticalAlign='middle'
              />
              <Flex
                alignItems='center'
                flexWrap='wrap'
                flex='1 1 auto'
                overflow='hidden'>
                <Box display='inline'>
                  <Box display='inline-block' flex='0 0 auto'>
                    <NextLink href='/' passHref>
                      <Link
                        color={subredditTextColor}
                        fontSize='12px'
                        fontWeight='700'
                        display='inline'
                        lineHeight='20px'
                        textDecoration='none'>
                        r/NotSubreddit
                      </Link>
                    </NextLink>
                  </Box>
                  <Text
                    color={separatorColor}
                    as='span'
                    verticalAlign='middle'
                    fontSize='6px'
                    lineHeight='20px'
                    margin='0 4px'>
                    •
                  </Text>
                  <Text as='span' marginRight='3px'>
                    Posted By
                  </Text>
                  {/* TODO: link to profile */}
                  <NextLink href='/' passHref>
                    <Link marginRight='3px'>u/{post.creator.username}</Link>
                  </NextLink>
                  {/* TODO: link to dates? */}
                  <NextLink href='/' passHref>
                    <Link>{getRelativeTime(parseInt(post.createdAt))}</Link>
                  </NextLink>
                </Box>
              </Flex>
            </Flex>
            {/* Post Title */}
            <Box margin='0 8px'>
              <Heading
                color={titleColor}
                fontSize='18px'
                fontWeight='500'
                lineHeight='22px'
                paddingRight='5px'
                wordBreak='break-word'>
                {post.title}
              </Heading>
            </Box>
            {/* Post Text */}
            <Box marginTop='8px'>
              <Box
                color={subredditTextColor}
                maxHeight='125px'
                padding='5px 8px 10px'
                fontFamily='Noto sans, Arial, sans-serif'
                fontSize='14px'
                fontWeight='400'
                lineHeight='21px'
                wordBreak='break-word'
                overflow='hidden'
                sx={{
                  maskImage: 'linear-gradient(180deg, #000 60%, transparent)',
                }}>
                {post.text}
              </Box>
            </Box>
            {/* Post Bottom Bar */}
            <Flex
              flexDirection='row'
              alignItems='center'
              paddingRight='10px'
              overflowY='visible'>
              <Flex
                flexDirection='row'
                alignItems='stretch'
                flexGrow={1}
                padding='0 8px 0 4px'
                fontSize='12px'
                fontWeight='700'
                lineHeight='16px'
                overflow='hidden'>
                <NextLink href='/post/[id]' as={`/post/${post.id}`} passHref>
                  <Link
                    display='flex'
                    alignItems='center'
                    borderRadius='2px'
                    padding='8px'
                    marginRight='4px'
                    _hover={{
                      textDecor: 'none',
                      outline: 'none',
                      bg: bottomButtonHover,
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}>
                    0 Comments
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Link>
    </NextLink>
  );
};

export default Post;
