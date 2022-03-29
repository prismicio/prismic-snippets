---
name: "Prismic HTML Serializer Scaffold"
description: "Yields a ready-to-use HTML Serializer scaffold"
scope: ["javascript"]
prefix: "prismicHTMLSerializerScaffold"
---

```javascript
/**
 * @type {import("@prismicio/helpers").HTMLMapSerializer}
 */
const htmlSerializer = {
	// Those are just examples, update them and add your own~
	heading1: ({ children }) => `<h2>${children}</h2>`,
	paragraph: ({ children }) => `<p class="fooBar">${children}</p>`,
};
```
