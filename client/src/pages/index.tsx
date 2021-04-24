import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import NextLink from 'next/link';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import { usePostsQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

const Index: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');

  const { data, loading, variables, fetchMore } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
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
        <Heading>notReddit</Heading>
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
        <Box>
          {data?.posts.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Box>
      )}
      {data && data.posts.hasMore && (
        <Button
          isLoading={loading}
          m='auto'
          mt={5}
          onClick={() => {
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              },
              // updateQuery: (previousValue, { fetchMoreResult }): PostsQuery => {
              //   if (!fetchMoreResult) {
              //     return previousValue as PostsQuery;
              //   }
              //   return {
              //     __typename: 'Query',
              //     posts: {
              //       __typename: 'PaginatedPosts',
              //       hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
              //       posts: [
              //         ...(previousValue as PostsQuery).posts.posts,
              //         ...(fetchMoreResult as PostsQuery).posts.posts,
              //       ],
              //     },
              //   };
              // },
            });
          }}>
          Load More
        </Button>
      )}
    </Stack>
  );
};

export default withApollo({ ssr: true })(Index);
