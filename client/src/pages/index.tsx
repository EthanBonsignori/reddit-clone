import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Heading, Link, Stack } from '@chakra-ui/layout';
import NextLink from 'next/link';
import Navbar from '../components/navbar/Navbar';
import PostList from '../components/post/PostList';
import withApollo from '../utils/withApollo';

const Index: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');

  return (
    <Stack
      as='main'
      align='center'
      bg={bg}
      color={color}
      minH='calc(100vh)'
      pb={10}>
      <Navbar />
      <Flex
        align='center'
        justifyContent='space-between'
        mb='1rem !important'
        width='55%'>
        <Heading>notReddit</Heading>
        <NextLink href='/create-post' passHref>
          <Link ml={10} as={Button}>
            Create Post
          </Link>
        </NextLink>
      </Flex>
      <PostList />
    </Stack>
  );
};

export default withApollo({ ssr: true })(Index);
