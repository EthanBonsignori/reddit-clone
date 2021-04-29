import { useColorModeValue } from '@chakra-ui/color-mode';
import { Stack } from '@chakra-ui/layout';
import Navbar from './navbar/Navbar';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const color = useColorModeValue('lightText', 'darkText');
  const bg = useColorModeValue('lightBg', 'darkBg');

  return (
    <Stack
      as='main'
      align='center'
      bg={bg}
      color={color}
      minH='calc(100vh)'
      pb={10}>
      <Navbar />
      {children}
    </Stack>
  );
};

export default Layout;
