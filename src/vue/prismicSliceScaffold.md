---
name: "Prismic Slice Scaffold"
description: "Yields a ready-to-use scaffold for creating a Prismic slice component"
scope: ["vue"]
prefix: "prismicSliceScaffold"
---

```html
<template>
	${1}
</template>

<script>
import { getSliceComponentProps } from "@prismicio/vue/components";

export default {
  // The array passed to `getSliceComponentProps` is purely optional.
	// Consider it as a visual hint for you when templating your slice.
  props: getSliceComponentProps(["slice", "index", "slices", "context"])
}
</script>
```
