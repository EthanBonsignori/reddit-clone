import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import NextLink from 'next/link';
import { LinkIcon } from '@chakra-ui/icons';

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await login(values);
    if (response.data?.login.errors) {
      return setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      // Register successful
      return router.push('/');
    }
    return;
  };

  return (
    <Wrapper size='small'>
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
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
