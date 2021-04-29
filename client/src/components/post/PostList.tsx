import { Box, Spinner, Button, useColorModeValue } from '@chakra-ui/react';
import { usePostsQuery } from '../../generated/graphql';
import Post from './Post';

interface PostListProps {}

const PostList: React.FC<PostListProps> = () => {
  const color = useColorModeValue('lightText', 'darkText');

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
    <>
      {!data && loading ? (
        <Box my='2em !important'>
          <Spinner color={color} size='xl' />
        </Box>
      ) : (
        <Box minHeight='1000px' width='100%'>
          {data?.posts.posts.map((post) => (
            <Post key={post.id} post={post} single={false} />
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
            });
          }}>
          Load More
        </Button>
      )}
    </>
  );
};

export default PostList;
