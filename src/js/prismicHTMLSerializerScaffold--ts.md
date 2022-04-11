---
name: "Prismic HTML Serializer Scaffold"
description: "Yields a ready-to-use HTML Serializer scaffold"
scopes: ["typescript"]
prefix: "prismicHTMLSerializerScaffold"
---

```typescript
import * as prismicH from "@prismicio/helpers";

const htmlSerializer: prismicH.HTMLMapSerializer = {
	// Those are just examples, update them and add your own~
	heading1: ({ children }) => `<h2>${children}</h2>`,
	paragraph: ({ children }) => `<p class="fooBar">${children}</p>`,
};
```
