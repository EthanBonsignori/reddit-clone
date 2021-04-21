import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Navbar } from '../components/Navbar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import { useState } from 'react';

const Index: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');

  const [queryVars, setQueryVars] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: queryVars,
  });

  if (!fetching && !data) {
    // TODO: error banner
    return <div>Could not get posts</div>;
  }

  return (
    <Stack
      as='main'
      align='center'
      bg={bg}
      color={color}
      minH='calc(100vh)'
      pb={10}>
      <Navbar />
      <Flex align='center' justifyContent='space-between'>
        <Heading>cReddit</Heading>
        <NextLink href='/create-post' passHref>
          <Link ml={10} as={Button}>
            Create Post
          </Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <Box my='2em !important'>
          <Spinner color={color} size='xl' />
        </Box>
      ) : (
        <Stack spacing={4}>
          {data!.posts.posts.map((post) => (
            <Box p={5} shadow='md' key={post.id} borderWidth='1px' bg='white'>
              <Heading fontSize='xl'>{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Button
          isLoading={fetching}
          m='auto'
          mt={5}
          onClick={() => {
            setQueryVars({
              limit: queryVars.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            });
          }}>
          Load More
        </Button>
      )}
    </Stack>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
