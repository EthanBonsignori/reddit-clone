import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface FormValues {
  title: string;
  text: string;
}

const CreatePost: React.FC = () => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();

  const handleSubmit = async (
    values: FormValues,
    // { setErrors }: FormikHelpers<FormValues>,
  ) => {
    await createPost({ input: values });
    // if (response.data?.createPost.errors)
    router.push('/');
  };

  return (
    <Layout wrapperSize='small'>
      <Formik initialValues={{ title: '', text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='Title' label='Post Title' />
            <Box mt={4}>
              <InputField
                textarea
                name='text'
                placeholder='Write your post...'
                label='Body'
              />
            </Box>
            <Button
              type='submit'
              color='white'
              bgColor='teal'
              isLoading={isSubmitting}
              disabled={isSubmitting}
              mt={4}>
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
