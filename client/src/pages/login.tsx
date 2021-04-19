import { Box, Button } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';

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
    console.log(response);
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
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
