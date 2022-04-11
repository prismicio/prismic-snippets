---
name: "Prismic Group"
description: "Yields a ready-to-use Group field/Slice repeatable template"
scopes: ["javascript", "javascriptreact", "typescriptreact"]
prefix: "prismicGroup"
---

```jsx
{${1:slice.items}.map((${2:item}) => (
	<${3:div} key={${2:item}}>
		{{ ${2:item} }}${4}
	</${3:div}>
))}
```
