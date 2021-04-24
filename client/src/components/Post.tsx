import {
  Link,
  Box,
  Flex,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { PostSnippetFragment } from '../generated/graphql';
import VoteSection from './post/VoteSection';

interface PostProps {
  post: PostSnippetFragment;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');
  const hoverBorder = useColorModeValue('lightIcon', 'darkIcon');

  return (
    <Flex
      as={Link}
      pos='relative'
      flexDir='column'
      p={5}
      shadow='md'
      key={post.id}
      borderRadius='4px'
      borderWidth='1px'
      borderColor='transparent'
      bg={bg}
      minW='580px'
      mb='10px'
      pl='40px'
      color={color}
      _hover={{
        textDecor: 'none',
        borderColor: hoverBorder,
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
            <Text color={color}>{post.textSnippet}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
