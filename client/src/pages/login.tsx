import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
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
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='Username or Email'
              label='Username or Email'
            />
            <Box mt={4}>
              <InputField
                type='password'
                name='password'
                placeholder='Password'
                label='Password'
              />
            </Box>
            <Button
              type='submit'
              color='white'
              bgColor='teal'
              isLoading={isSubmitting}
              disabled={isSubmitting}
              mt={4}>
              Login
            </Button>
            <FormLinks>
              <NextLink href='/register' passHref>
                <Link>
                  <LinkIcon mr={1} />
                  Need an account? Sign up
                </Link>
              </NextLink>
              <NextLink href='/forgot-password' passHref>
                <Link mt={2}>
                  <LinkIcon mr={1} />
                  Forgot your Password?
                </Link>
              </NextLink>
            </FormLinks>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
