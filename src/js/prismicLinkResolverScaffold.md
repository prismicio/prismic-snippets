---
name: "Prismic Link Resolver Scaffold"
description: "Yields a ready-to-use Link Resolver scaffold"
scopes: ["javascript"]
prefix: "prismicLinkResolverScaffold"
---

```javascript
/**
 * @type {import("@prismicio/helpers").LinkResolverFunction}
 */
const linkResolver = (doc) => {
	if (doc.isBroken) {
		return "/404";
	}

	if (doc.type === "${1:page}") {
		return `/${${2:doc.uid}}`;
	}
};
```
