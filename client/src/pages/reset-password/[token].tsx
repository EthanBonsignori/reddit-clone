import { CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FormLinks from '../../components/FormLinks';
import { InputField } from '../../components/InputField';
import Layout from '../../components/Layout';
import MainButton from '../../components/MainButton';
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
      <Flex
        flexDirection='column'
        bg='white'
        padding='24px'
        borderRadius='8px'
        maxWidth='440px'>
        <Box
          display='block'
          _before={{
            display: 'block',
            width: '40px',
            height: '40px',
            marginBottom: '8px',
            content:
              'url(https://www.redditstatic.com/accountmanager/18e257d5fdea817c0f12cccf8867d930.svg)',
          }}
        />
        <Heading
          color='black'
          fontSize='18px'
          fontWeight='500'
          lineHeight='22px'
          width='100%'
          textAlign='left'
          margin='0'>
          Reset your Password
        </Heading>
        <Text
          fontSize='14px'
          fontWeight='400'
          lineHeight='21px'
          color='black'
          width='100%'
          textAlign='left'
          marginBottom='10px'>
          Choose a new password here, then log into your account.
        </Text>
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
                label='New Password'
                type='password'
              />
              <Box mt={4}>
                <InputField
                  name='passwordRepeat'
                  label='Verify Password'
                  type='password'
                />
              </Box>
              <MainButton
                type='submit'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                text='Set Password'
                color='white'
                bg='mainBlue'
                border='none'
                marginTop='2em'
                fontFamily='IBMPlexSans, sans-serif'
                fontSize='14px'
                fontWeight='600'
                lineHeight='18px'
                borderRadius='4px'
                height='40px'
                padding='5px 10px'
                minWidth='155px'
                minHeight='35px'
                textTransform='uppercase'
                width='auto'
                maxWidth='392px'
                transition='none'
              />
              <FormLinks>
                <NextLink href='/login' passHref>
                  <Link
                    fontSize='12px'
                    fontWeight='600'
                    letterSpacing='.5px'
                    lineHeight='24px'
                    textTransform='uppercase'
                    color='mainBlue'
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
                <Text as='span' color='mainBlue' margin='0 4px'>
                  •
                </Text>
                <NextLink href='/login' passHref>
                  <Link
                    fontSize='12px'
                    fontWeight='600'
                    letterSpacing='.5px'
                    lineHeight='24px'
                    textTransform='uppercase'
                    color='mainBlue'
                    _hover={{
                      textDecoration: 'none',
                      color: '#3394dc',
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}>
                    SIGN UP
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

export default withApollo({ ssr: false })(ResetPassword);
