import { InfoIcon, LinkIcon } from '@chakra-ui/icons';
import { Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import FormLinks from '../components/FormLinks';
import { InputField } from '../components/InputField';
import Layout from '../components/Layout';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (values: FormValues) => {
    await forgotPassword(values);
    return setIsComplete(true);
  };

  return (
    <Layout wrapperSize='small'>
      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) =>
          isComplete ? (
            <Flex mt={3} flexDir='column'>
              <Flex border='1px solid grey' borderRadius='5px' p='10px'>
                <InfoIcon
                  mr={3}
                  color='orange'
                  alignSelf='center'
                  h={6}
                  w={6}
                />
                If an account with that email exists, you will receive an email
                with a link to reset your password.
              </Flex>
              <FormLinks>
                <NextLink href='/' passHref>
                  <Link mt={2}>
                    <LinkIcon /> Go back Home
                  </Link>
                </NextLink>
              </FormLinks>
            </Flex>
          ) : (
            <Form>
              <InputField
                type='email'
                name='email'
                placeholder='Email'
                label='Email'
              />
              <Button
                type='submit'
                color='white'
                bgColor='teal'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                mt={4}>
                Send Me a Link
              </Button>
              <FormLinks>
                <NextLink href='/login' passHref>
                  <Link>
                    <LinkIcon mr={1} />
                    Remembered your password? Log in
                  </Link>
                </NextLink>
                <NextLink href='/register' passHref>
                  <Link mt={2}>
                    <LinkIcon mr={1} />
                    Need an account? Sign up
                  </Link>
                </NextLink>
              </FormLinks>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
