---
name: "Prismic Link Resolver Scaffold"
description: "Yields a ready-to-use Link Resolver scaffold"
scope: ["typescript"]
prefix: "prismicLinkResolverScaffold"
---

```typescript
import * as prismicH from "@prismicio/helpers";

const linkResolver: prismicH.LinkResolverFunction<string | undefined> = (doc) => {
	if (doc.isBroken) {
		return "/404";
	}

	if (doc.type === "${1:page}") {
		return `/${${2:doc.uid}}`;
	}
};
```
