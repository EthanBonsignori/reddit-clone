import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Login: React.FC = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // Register successful
            router.push('/');
          }
        }}
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
};

export default Login;
