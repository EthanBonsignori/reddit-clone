import { Navbar } from './Navbar';
import { Wrapper } from './Wrapper';

interface LayoutProps {
  wrapperSize: 'small' | 'regular';
}

const Layout: React.FC<LayoutProps> = ({ children, wrapperSize }) => {
  return (
    <>
      <Navbar />
      <Wrapper size={wrapperSize}>{children}</Wrapper>
    </>
  );
};

export default Layout;
