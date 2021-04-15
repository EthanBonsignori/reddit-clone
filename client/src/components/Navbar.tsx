import { Box, Flex } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import ColorModeSwitch from './ColorModeSwitch';

interface NavbarProps {
  color: string
}

export const Navbar: React.FC<NavbarProps> = ({ color }) => {
  const bg = useColorModeValue('lightNavBg', 'darkNavBg');

  return (
    <Flex
      as='header'
      w='100%'
      minH='48px'
      bg={bg}
      pos='fixed'
      top='0'
      right='0'
      mt='0'
      zIndex='100'
      color={color}
    >
      <Box
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        direction='row'
        padding='0 20px'
      >
          
        <ColorModeSwitch />
      </Box>
    </Flex>
  );
};
