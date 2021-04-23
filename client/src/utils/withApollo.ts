import { ApolloClient, InMemoryCache } from '@apollo/client';
import { withApollo as createApolloWrapper } from 'next-apollo';
import { PaginatedPosts } from '../generated/graphql';

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts,
            ): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});

const withApollo = createApolloWrapper(apolloClient);

export default withApollo;
