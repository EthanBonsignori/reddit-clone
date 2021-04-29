import { useColorModeValue } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Post from '../../components/post/Post';
import { usePostQuery } from '../../generated/graphql';
import withApollo from '../../utils/withApollo';

const PostById: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');

  const router = useRouter();
  const { id } = router.query;
  const intId = typeof id === 'string' ? parseInt(id) : -1;
  const { data, loading, error } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Layout>
        <Spinner color={color} size='xl' />
      </Layout>
    );
  }

  if (error) {
    return <Layout>{error.message}</Layout>;
  }

  if (!data?.post) {
    return <Layout>Could not find that Post.</Layout>;
  }

  return (
    <Layout>
      <Post post={data?.post} single={true} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(PostById);
