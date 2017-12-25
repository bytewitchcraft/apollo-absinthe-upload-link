# Apollo-Absinthe-Upload-Link

A network interface for Apollo that enables file-uploading to Absinthe back
ends.

## Difference between `apollo-absinthe-upload-client` and `apollo-absinthe-upload-link`
[`apollo-absinthe-upload-client`](https://github.com/labtwentyfive/apollo-absinthe-upload-client)
was developed for first version of Apollo Client and it can't be used with second
version. This package was rewritten specifically for second version which supports
new middleware and link ibterface 

## Difference between `apollo-upload-client` and `apollo-absinthe-upload-client`

Both Apollo, through
[`apollo-upload-server`](https://github.com/jaydenseric/apollo-upload-server),
and Absinthe support file-uploads through GraphQL-mutations, unfortunately, they
differ in their protocol.

## Usage

Install via yarn or npm and then use `createLink` from the package
in the construction of your `ApolloClient`-instance.

```js
import ApolloClient from "apollo-client";
import { createLink } from "apollo-absinthe-upload-link";

const client = new ApolloClient({
    link: createLink({
        uri: "/graphql"
    })
});
```

### Usage with React Native

Not tested. Contributing is welcome.

### Optional dependencies

This library uses `fetch`, if you target older browsers you can polyfill both.

## License

MIT (see LICENSE)

## Acknowledgements

* @labtwentyfive's [`apollo-absinthe-upload-client`](https://github.com/labtwentyfive/apollo-absinthe-upload-client)
