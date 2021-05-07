import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import MainButton from '../components/MainButton';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import withApollo from '../utils/withApollo';

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await register({
      variables: { options: values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.register.user,
          },
        });
      },
    });
    if (response.data?.register.errors) {
      setErrors(toErrorMap(response.data.register.errors));
    } else if (response.data?.register.user) {
      // Register successful
      router.push('/');
    }
  };

  return (
    <Layout>
      <Flex flexDirection='column' bg='white' padding='24px' borderRadius='8px'>
        <Heading
          color='black'
          fontSize='18px'
          fontWeight='500'
          lineHeight='22px'
          width='100%'
          textAlign='left'>
          Sign up
        </Heading>
        <Text
          color='black'
          width='100%'
          textAlign='left'
          marginBottom='28px'
          marginTop='8px'>
          By continuing, you agree to our non-existent User Agreement and
          Privacy Policy
        </Text>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            passwordRepeat: '',
          }}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ width: '280px' }}>
              <InputField name='username' label='Username' />
              <Box mt={4}>
                <InputField type='email' name='email' label='Email' />
              </Box>
              <Box mt={4}>
                <InputField type='password' name='password' label='Password' />
              </Box>
              <Box mt={4}>
                <InputField
                  type='password'
                  name='passwordRepeat'
                  label='Repeat Password'
                />
              </Box>
              <MainButton
                type='submit'
                text='Continue'
                border='none'
                width='100%'
                color='white'
                bg='mainBlue'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                mt={4}
              />
              <FormLinks>
                Already a notRedditor?
                <NextLink href='/login' passHref>
                  <Link
                    fontSize='12px'
                    fontWeight='600'
                    letterSpacing='.5px'
                    lineHeight='24px'
                    textTransform='uppercase'
                    color='mainBlue'
                    marginLeft='3px'
                    _hover={{
                      textDecoration: 'none',
                      color: '#3394dc',
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}>
                    Log In
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

export default withApollo({ ssr: false })(Register);
