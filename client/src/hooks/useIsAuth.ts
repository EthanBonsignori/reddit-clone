import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMeQuery } from '../generated/graphql';

function useIsAuth(): any {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  // check if user is logged in
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/login?next=${router.pathname}`);
    }
  }, [loading, data, router]);
}

export default useIsAuth;
