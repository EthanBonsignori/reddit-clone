import { CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputField } from '../../components/InputField';
import Layout from '../../components/Layout';
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import withApollo from '../../utils/withApollo';

interface FormValues {
  password: string;
  passwordRepeat: string;
}

const ResetPassword: React.FC = () => {
  const [apiError, setApiError] = useState('');
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const token =
    typeof router.query?.token === 'string' ? router.query.token : '';

  const handleSubmit = async (
    values: FormValues,
    { setErrors }: FormikHelpers<FormValues>,
  ) => {
    const response = await changePassword({
      variables: {
        token,
        password: values.password,
        passwordRepeat: values.passwordRepeat,
      },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.changePassword.user,
          },
        });
      },
    });

    if (response.data?.changePassword.errors) {
      const errorMap = toErrorMap(response.data.changePassword.errors);
      console.log(errorMap);
      if (Object.keys('api')) {
        setApiError(errorMap.api);
      }
      setErrors(errorMap);
    } else if (response.data?.changePassword.user) {
      // Reset password worked
      router.push('/');
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ password: '', passwordRepeat: '' }}
        onSubmit={handleSubmit}>
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
                <NextLink href='/forgot-password' passHref>
                  <Link
                    display='flex'
                    alignItems='center'
                    _hover={{ opacity: '0.7', textDecoration: 'underline' }}>
                    Request a new link
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
              name='password'
              placeholder='Password'
              label='New Password'
              type='password'
            />
            <Box mt={4}>
              <InputField
                name='passwordRepeat'
                placeholder='Repeat Password'
                label='Repeat Password'
                type='password'
              />
            </Box>
            <Button
              type='submit'
              color='white'
              bgColor='teal'
              isLoading={isSubmitting}
              mt={4}>
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ResetPassword);
