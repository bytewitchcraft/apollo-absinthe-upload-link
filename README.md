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

### Custom fetch

You can use the fetch option when creating an apollo-absinthe-upload-link to do a lot of custom networking. This is useful if you want to modify the request based on the calculated headers or calculate the uri based on the operation.

```js
import ApolloClient from "apollo-client";
import { createLink } from "apollo-absinthe-upload-link";

const customFetch = (uri, options) => {
  const { header } = Hawk.client.header(
    "http://example.com:8000/resource/1?b=1&a=2",
    "POST",
    { credentials: credentials, ext: "some-app-data" }
  );
  options.headers.Authorization = header;
  return fetch(uri, options);
};

const headers = { authorization: 1234 } 
const client = new ApolloClient({
    link: createLink({
        uri: "/graphql"
    }),
    headers,
    fetch: customFetch
});
```

### Custom HttpLink

By default we are using [apollo-link-http](https://www.npmjs.com/package/apollo-link-http) as default HTTP link library. But there are other possible HTTP links available such as [apollo-link-batch-http](https://www.npmjs.com/package/apollo-link-batch-http). To pass custom `HttpLink` constructor you can do so with `opts.httpLink`


```js
import ApolloClient from "apollo-client";
import { createLink } from "apollo-absinthe-upload-link";
import { BatchHttpLink } from "apollo-link-batch-http";

const client = new ApolloClient({
    link: createLink({
        uri: "/graphql",
        httpLink: BatchHttpLink,
    })
});
```


### Usage with React Native

Substitute [`File`](https://developer.mozilla.org/en/docs/Web/API/File) with [`ReactNativeFile`](https://github.com/bytewitchcraft/apollo-absinthe-upload-link/blob/master/src/validators.js):

```js
import { ReactNativeFile } from 'apollo-absinthe-upload-link'

const file = new ReactNativeFile({
  uri: '…',
  type: 'image/jpeg',
  name: 'photo.jpg'
})

const files = ReactNativeFile.list([
  {
    uri: '…',
    type: 'image/jpeg',
    name: 'photo-1.jpg'
  },
  {
    uri: '…',
    type: 'image/jpeg',
    name: 'photo-2.jpg'
  }
])
```

## License

MIT (see LICENSE)

## Acknowledgements

* @labtwentyfive's [`apollo-absinthe-upload-client`](https://github.com/labtwentyfive/apollo-absinthe-upload-client)
* @jaydenseric [`apollo-upload-client`](https://github.com/jaydenseric/apollo-upload-client)
