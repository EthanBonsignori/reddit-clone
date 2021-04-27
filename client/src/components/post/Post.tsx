import {
  Link,
  Box,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { RegularPostFragment } from '../../generated/graphql';
import VoteSection from './VoteSection';

interface PostProps {
  post: RegularPostFragment;
  single: boolean;
}

const Post: React.FC<PostProps> = ({ post, single }) => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const borderColorHover = useColorModeValue('lightIcon', 'darkIcon');
  const borderColor = useColorModeValue('#ccc', '#343536');

  return (
    <NextLink href='/post/[id]' as={`/post/${post.id}`} passHref>
      <Flex
        as={Link}
        bg={bg}
        color={color}
        borderColor={borderColor}
        borderRadius='4px'
        borderWidth='1px'
        href=''
        pos='relative'
        flexDir='column'
        p={5}
        shadow='md'
        minW='580px'
        mb='10px'
        pl='40px'
        boxShadow='none'
        _hover={{
          textDecor: 'none',
          borderColor: single ? borderColor : borderColorHover,
        }}
        _focus={{
          boxShadow: 'none',
        }}>
        <Flex flexDir='row'>
          <VoteSection post={post} />
          <Flex flexDir='column' ml={6}>
            <Flex flexDir='row'>
              <Heading fontSize='xl' color={color}>
                {post.title}
              </Heading>
              <Text color={color} opacity='0.8' ml={4}>
                Posted by u/{post.creator.username}
              </Text>
            </Flex>
            <Box mt={4}>
              <Text color={color}>{post.text}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  );
};

export default Post;
