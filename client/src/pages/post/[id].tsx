import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}</div>;
};

export default withApollo({ ssr: true })(Post);
