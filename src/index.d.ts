import { ApolloLink, HttpOptions } from "@apollo/client";
export const createLink: (linkOptions?: HttpOptions) => ApolloLink;
