import { Box, Flex } from '@chakra-ui/layout';
import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';
import PostList from '../components/post/PostList';
import withApollo from '../utils/withApollo';

const Index: React.FC = () => {
  return (
    <Layout>
      <Flex
        flexDirection='row'
        justifyContent='center'
        margin='0 auto !important'
        maxWidth='100%'
        padding='20px 24px'>
        <Box width='640px'>
          <CreatePost />
          <PostList />
        </Box>
        {/* Placeholder Box for Right column - has communities and other things on reddit */}
        {/* <Box
          margin='0 !important'
          marginLeft='24px !important'
          display='block'
          width='312px'
          flex='0 0 312px'
          height='100px'></Box> */}
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
