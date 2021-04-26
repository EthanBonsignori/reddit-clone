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
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Layout wrapperSize='small'>
        <Spinner color={color} size='xl' />
      </Layout>
    );
  }

  if (!data?.post) {
    return <Layout wrapperSize='small'>Could not find that Post.</Layout>;
  }

  return (
    <Layout wrapperSize='small'>
      <Post post={data?.post} />
    </Layout>
  );
};

export default withApollo({ ssr: true })(PostById);
