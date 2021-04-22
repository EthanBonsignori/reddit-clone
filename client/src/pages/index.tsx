import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import NextLink from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import VoteSection from '../components/post/VoteSection';
import { usePostsQuery } from '../generated/graphql';

const Index: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');
  const postBg = useColorModeValue('lightNavBg', 'darkNavBg');

  const [queryVars, setQueryVars] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const { data, loading } = usePostsQuery({
    variables: queryVars,
  });

  if (!loading && !data) {
    // TODO: error banner
    // return <div>Could not get posts</div>;
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
      <Flex
        align='center'
        justifyContent='space-between'
        mb='1rem !important'
        width='55%'>
        <Heading>cReddit</Heading>
        <NextLink href='/create-post' passHref>
          <Link ml={10} as={Button}>
            Create Post
          </Link>
        </NextLink>
      </Flex>
      {!data && loading ? (
        <Box my='2em !important'>
          <Spinner color={color} size='xl' />
        </Box>
      ) : (
        <Stack spacing={4}>
          {data?.posts.posts.map((post) => (
            <Flex
              flexDir='column'
              p={5}
              shadow='md'
              key={post.id}
              borderWidth='1px'
              borderColor='transparent'
              bg={postBg}
              minW='580px'
              color={color}>
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
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Button
          isLoading={loading}
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

export default Index;
