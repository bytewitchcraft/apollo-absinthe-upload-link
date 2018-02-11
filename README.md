[![Build Status](https://semaphoreci.com/api/v1/ihorkatkov/apollo-absinthe-upload-link/branches/master/badge.svg)](https://semaphoreci.com/ihorkatkov/apollo-absinthe-upload-link)

# Apollo-Absinthe-Upload-Link

A network interface for Apollo that enables file-uploading to Absinthe back
ends.

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

### Custom headers

Custom headers can be passed through options of the link. 

```js
import ApolloClient from "apollo-client";
import { createLink } from "apollo-absinthe-upload-link";

const headers = { authorization: 1234 } 
const client = new ApolloClient({
    link: createLink({
        uri: "/graphql"
    }),
    headers,
});
```


### Usage with React Native

Not tested. Contributing is welcome.

## License

MIT (see LICENSE)

## Acknowledgements

* @labtwentyfive's [`apollo-absinthe-upload-client`](https://github.com/labtwentyfive/apollo-absinthe-upload-client)
