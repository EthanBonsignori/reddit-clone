import React from 'react'
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {

}

const Login: React.FC<registerProps> = ({ }) => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();

  const handleSubmit = async (values: any, { setErrors }: any) => {
    const response = await login(values);
    console.log(response);
    if (response.data?.login.errors) {
      setErrors(toErrorMap(response.data.login.errors));
    } else if (response.data?.login.user) {
      // Register successful
      router.push('/');
    }
  }

  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ username: '', password: '', }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
            />
            <Box mt={4}>
              <InputField
                type='password'
                name='password'
                placeholder='Password'
                label='Password'
              />
            </Box>
            <Button type='submit' color='white' bgColor='teal' isLoading={isSubmitting} mt={4}>Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Login;