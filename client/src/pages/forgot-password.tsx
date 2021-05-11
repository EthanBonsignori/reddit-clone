import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useState } from 'react';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import MainButton from '../components/MainButton';
import { useForgotPasswordMutation } from '../generated/graphql';
import withApollo from '../utils/withApollo';

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (values: FormValues) => {
    await forgotPassword({ variables: values });
    return setIsComplete(true);
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
          Tell us the username and email address associated with your notReddit
          account, and we’ll send you an email with a link to reset your
          password.
        </Text>
        <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form style={{ width: '280px' }}>
              <InputField type='text' name='username' label='Username' />
              <Box mt={4}>
                <InputField type='email' name='email' label='Email Address' />
              </Box>
              <MainButton
                type='submit'
                isLoading={isSubmitting}
                disabled={isComplete}
                text='Reset Password'
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
              {isComplete ? (
                <Box
                  color='#24a0ed'
                  marginTop='20px'
                  fontSize='12px'
                  fontWeight='500'
                  lineHeight='16px'>
                  Thanks! If your notReddit username and email address match,
                  you&apos;ll get an email with a link to reset your password
                  shortly.
                </Box>
              ) : null}
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

export default withApollo({ ssr: false })(ForgotPassword);
