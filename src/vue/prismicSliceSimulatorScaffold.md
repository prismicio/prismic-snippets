---
name: "Prismic Slice Simulator Scaffold"
description: "Yields a ready-to-use Slice Simulator scaffold"
scope: ["vue"]
prefix: "prismicSliceSimulatorScaffold"
---

```html
<template>
	<SliceSimulator :state="state" #default="{ slices }">
		<SliceZone :slices="slices" :components="components" />
	</SliceSimulator>
</template>

<script>
import { SliceSimulator } from "@prismicio/slice-simulator-vue";

import state from "~~/.slicemachine/libraries-state.json";
// A component map mapping Prismic slice types to Vue components
import components from "${1:~~/slices/components}";

export default {
	components: {
		SliceSimulator,
		SliceZone,
	},
	data() {
		return { state, components };
	},
};
</script>
```
