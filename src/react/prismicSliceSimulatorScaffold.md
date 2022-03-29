---
name: "Prismic Slice Simulator Scaffold"
description: "Yields a ready-to-use Slice Simulator scaffold"
scope: ["javascriptreact", "typescriptreact"]
prefix: "prismicSliceSimulatorScaffold"
---

```jsx
import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import state from "../.slicemachine/libraries-state.json";
// A component map mapping Prismic slice types to React components
import { components } from "${1:../slices/components}";

const SliceSimulatorPage = () => {
  return (
    <SliceSimulator
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} components={components} />
      )}
      state={state}
    />
  );
};

export default SliceSimulatorPage;
```
