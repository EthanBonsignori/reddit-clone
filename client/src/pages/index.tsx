import { Stack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Navbar } from '../components/Navbar';

const Index: React.FC = () => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');

  return (
    <Stack
      as='main'
      align='center'
      bg={bg}
      color={color}
      minH='calc(100vh - 48px)'
      mt='48px'>
      <Navbar color={color} />
      <div>Hello World</div>
    </Stack>
  );
};

export default Index;
