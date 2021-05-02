import { LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import MainButton from '../components/MainButton';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import withApollo from '../utils/withApollo';

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.login.user,
          },
        });
        cache.evict({ fieldName: 'posts' });
      },
    });
    if (response.data?.login.errors) {
      return setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      // login successful
      if (typeof router.query.next === 'string') {
        return router.push(router.query.next);
      }
      return router.push('/');
    }
    return;
  };

  return (
    <Layout>
      <Flex flexDirection='column' bg='white' padding='24px' borderRadius='8px'>
        <Heading
          fontSize='18px'
          fontWeight='500'
          lineHeight='22px'
          width='100%'
          textAlign='left'>
          Login
        </Heading>
        <Text width='100%' textAlign='left' marginBottom='28px' marginTop='8px'>
          By continuing, you agree to our non-existent User Agreement and
          Privacy Policy
        </Text>
        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ width: '280px' }}>
              <InputField name='usernameOrEmail' label='Username' />
              <Box mt={4}>
                <InputField type='password' name='password' label='Password' />
              </Box>
              <MainButton
                type='submit'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                text='Log In'
                color='white'
                bg='mainBlue'
                border='none'
                marginTop='2em'
                fontFamily='Noto Sans, sans-serif'
                fontSize='14px'
                fontWeight='700'
                letterSpacing='unset'
                lineHeight='18px'
                borderRadius='999px'
                width='100%'
                height='40px'
                padding='0 16px'
                transition='none'
              />
              <NextLink href='/forgot-password' passHref>
                <Link
                  fontSize='12px'
                  fontWeight='400'
                  lineHeight='18px'
                  marginTop='8px'
                  marginBottom='20px'>
                  Forgot your username or password?
                </Link>
              </NextLink>
              <FormLinks>
                New to notReddit?
                <NextLink href='/register' passHref>
                  <Link
                    fontSize='12px'
                    fontWeight='600'
                    letterSpacing='.5px'
                    lineHeight='24px'
                    textTransform='uppercase'
                    color='mainBlue'
                    marginLeft='3px'>
                    Sign up
                  </Link>
                </NextLink>
              </FormLinks>
            </Form>
          )}
        </Formik>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
