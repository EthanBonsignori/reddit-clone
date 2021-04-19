import { LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await register({ options: values });
    console.log(response);
    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      // Register successful
      router.push('/');
    }
  };

  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          passwordRepeat: '',
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
            />
            <Box mt={4}>
              <InputField
                type='email'
                name='email'
                placeholder='Email'
                label='Email'
              />
            </Box>
            <Box mt={4}>
              <InputField
                type='password'
                name='password'
                placeholder='Password'
                label='Password'
              />
            </Box>
            <Box mt={4}>
              <InputField
                type='password'
                name='passwordRepeat'
                placeholder='Repeat Password'
                label='Repeat Password'
              />
            </Box>
            <Button
              type='submit'
              color='white'
              bgColor='teal'
              isLoading={isSubmitting}
              mt={4}>
              Register
            </Button>
            <FormLinks>
              <NextLink href='/login' passHref>
                <Link>
                  <LinkIcon mr={1} />
                  Already have an Account? Log In
                </Link>
              </NextLink>
            </FormLinks>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
