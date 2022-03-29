---
name: "Prismic Group Scaffold"
description: "Yields a ready-to-use Group field/Slice repeatable templating scaffold"
scope: ["javascriptreact", "typescriptreact"]
prefix: "prismicGroupScaffold"
---

```jsx
{${1:slice.items}.map((${2:item}) => (
	<${3:div} key={${2:item}}>
		{{ ${2:item} }}${4}
	</${3:div}>
))}
```
