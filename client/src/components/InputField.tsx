/* eslint-disable @typescript-eslint/indent */
import { InputHTMLAttributes } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        zIndex='100'
        fontSize='10px'
        fontWeight='600'
        letterSpacing='.5px'
        textTransform='uppercase'
        lineHeight='14px'
        transform='translate3d(0, -8px, 0) scale(.8333333)'
        position='absolute'
        top='14px'
        left='12px'
        display='inline-block'
        verticalAlign='middle'
        color='#a5a4a4'
        transformOrigin='0 50%'
        transition='all .2s ease-in-out'
        pointerEvents='none'
        htmlFor={field.name}>
        {label}
      </FormLabel>
      {textarea ? (
        <Input as={Textarea} {...field} {...props} id={field.name} />
      ) : (
        <Input
          transform='translateZ(0)'
          outline='none'
          width='100%'
          height='48px'
          padding='22px 12px 10px'
          border='1px solid'
          borderColor='rgba(0, 0, 0, .1)'
          borderRadius='4px'
          bg='#fcfcfb'
          fontFamily='Noto sans, sans-serif'
          fontSize='14px'
          fontWeight='400'
          lineHeight='21px'
          overflow='visible'
          appearance='none'
          transition='all .2s ease-in-out'
          {...field}
          {...props}
          id={field.name}
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
