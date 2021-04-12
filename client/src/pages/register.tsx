import React from 'react'
import { Form, Formik } from 'formik'
import { FormControl } from '@chakra-ui/form-control';
import { FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
  return (
    <Wrapper size='small'>
      <Formik
        initialValues={{ username: '', password: '', }}
        onSubmit={(values) => console.log(values)}
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
            <Button type='submit' color='white' bgColor='teal' isLoading={isSubmitting} mt={4}>Register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Register;