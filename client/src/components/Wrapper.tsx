import { Box } from '@chakra-ui/layout';

interface WrapperProps {
  size?: 'small' | 'regular';
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = 'regular',
}) => {
  return (
    <Box mx='auto' maxW={size === 'regular' ? '800px' : '400px'} w='100%'>
      {children}
    </Box>
  );
};
