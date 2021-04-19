import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  const handleSubmit = async (values: any, { setErrors }: any) => {
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
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
