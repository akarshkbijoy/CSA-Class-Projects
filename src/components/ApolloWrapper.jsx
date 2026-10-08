'use client';

import { ApolloProvider } from '@apollo/client/react';
import client from '../lib/apollo-client';

/**
 * ApolloWrapper — wraps the app in ApolloProvider.
 * Must be a Client Component because ApolloProvider uses React Context.
 * Note: ApolloProvider is imported from '@apollo/client/react' (v4+ path).
 */
export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
