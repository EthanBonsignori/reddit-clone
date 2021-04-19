import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';

const ResetPassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          // temp
          console.log(token);
        }}>
        {({ isSubmitting }) => (
          <Form>
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
    </Wrapper>
  );
};

ResetPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ResetPassword;
