---
name: "Prismic Group"
description: "Yields a ready-to-use Group field/Slice repeatable template"
scopes: ["vue-html", "html"]
prefix: "prismicGroup"
---

```html
<${3:div} v-for="${2:item} in ${1:slice.items}" :key="${2:item}">
	{{ ${2:item} }}${4}
</${3:div}>
```
