import { CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import MainButton from '../components/MainButton';
import { useCreatePostMutation } from '../generated/graphql';
import useIsAuth from '../hooks/useIsAuth';
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
      <Flex flexDirection='column' bg='white' padding='24px' borderRadius='8px'>
        <Heading
          fontSize='18px'
          fontWeight='500'
          lineHeight='22px'
          marginBottom='24px'
          width='100%'
          textAlign='left'>
          Create a post
        </Heading>
        <Formik initialValues={{ title: '', text: '' }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ width: '580px' }}>
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
              <InputField name='title' label='Title' />
              <Box mt={4}>
                <InputField textarea name='text' label='Text' />
              </Box>
              <MainButton
                type='submit'
                color='white'
                bg='mainBlue'
                text='Post'
                border='none'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                mt={4}
              />
            </Form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
