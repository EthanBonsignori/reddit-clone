import { CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { useIsAuth } from '../hooks/useIsAuth';
import withApollo from '../utils/withApollo';

interface FormValues {
  title: string;
  text: string;
}

const CreatePost: React.FC = () => {
  useIsAuth();
  const router = useRouter();
  const [apiError, setApiError] = useState('');
  const [createPost] = useCreatePostMutation();

  const handleSubmit = async (
    values: FormValues,
    // { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const { errors } = await createPost({
      variables: { input: values },
      update: (cache) => {
        cache.evict({ fieldName: 'posts' });
      },
    });
    if (errors) {
      return setApiError(errors[0].message);
    }
    router.push('/');
  };

  return (
    <Layout>
      <Formik initialValues={{ title: '', text: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {apiError && (
              <Box
                pos='relative'
                border='1px solid grey'
                borderRadius='5px'
                padding={3}
                mb={4}>
                <Flex alignItems='center' color='red' mb={3}>
                  <WarningIcon mr={1} />
                  {apiError}
                </Flex>
                <NextLink href='/login' passHref>
                  <Link
                    display='flex'
                    alignItems='center'
                    _hover={{ opacity: '0.7', textDecoration: 'underline' }}>
                    Log In
                  </Link>
                </NextLink>
                <Box
                  _hover={{ cursor: 'pointer', opacity: '0.5' }}
                  onClick={() => setApiError('')}>
                  <CloseIcon pos='absolute' top='12px' right='12px' h={3} />
                </Box>
              </Box>
            )}
            <InputField
              name='title'
              placeholder='Your Post Title'
              label='Title'
            />
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

export default withApollo({ ssr: false })(CreatePost);
