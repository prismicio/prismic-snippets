<!--

TODO: Go through all "TODO" comments in the project

TODO: Replace all on all files (README.md, CONTRIBUTING.md, bug_report.md, package.json):
- @prismicio/snippets
- Prismic snippets for VS Code, Vim, Sublime, and IntelliJ
- prismicio/prismic-snippets
- prismic-snippets

-->

# @prismicio/snippets

[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Conventional Commits][conventional-commits-src]][conventional-commits-href]
[![License][license-src]][license-href]

⚠ This project is in an experimental state, things might change, a lot!

<!-- TODO: Replacing link to Prismic with [Prismic][prismic] is useful here -->

[Prismic][prismic] snippets for VS Code, Vim, Sublime, and IntelliJ.

<!--

TODO: Create a small list of package features:

- 🤔 &nbsp;A useful feature;
- 🥴 &nbsp;Another useful feature;
- 🙃 &nbsp;A final useful feature.

Non-breaking space: &nbsp; are here on purpose to fix emoji rendering on certain systems.

-->

## Install

**VS Code**

Install extension from [VS Code Marketplace][vs-code-marketplace-src].

**Vim**

Install extension using [coc.nvim][coc-nvim-src].

```vim
:CocInstall https://github.com/prismicio/prismic-snippets
```

**Sublime**

Install package from [Package Control][sublime-package-control-src].

**IntelliJ**

:construction:

## Documentation

Every snippets are prefixed with `prismic(...)`. There are two categories of snippets: **templating snippets** and **scaffolding snippets**.

### Templating snippets

**React & Vue**

- `prismicText`: Yields a ready-to-use `<PrismicText />` component
- `prismicRichText`: Yields a ready-to-use `<PrismicRichText />` component
- `prismicLink`: Yields a ready-to-use `<PrismicLink />` component
- `prismicSliceZone`: Yields a ready-to-use `<SliceZone />` component
- `prismicGroup`: Yields a ready-to-use Group field/Slice repeatable template

**React only**

- `prismicProvider`: Yields a ready-to-use `<PrismicProvider />` component
- `prismicToolbar`: Yields a ready-to-use `<PrismicToolbar />` component

**Vue only**

- `prismicImage`: Yields a ready-to-use `<PrismicImage />` component
- `prismicEmbed`: Yields a ready-to-use `<PrismicEmbed />` component

### Scaffolding snippets

**React & Vue**

- `prismicSliceScaffold`: Yields a ready-to-use Slice components scaffold
- `prismicSliceSimulatorScaffold`: Yields a ready-to-use Slice Simulator scaffold

**JavaScript & TypeScript**

- `prismicRouteResolverScaffold`: Yields a ready-to-use Route Resolver scaffold
- `prismicLinkResolverScaffold`: Yields a ready-to-use Link Resolver scaffold
- `prismicHTMLSerializerScaffold`: Yields a ready-to-use HTML Serializer scaffold

---

To discover what's new on this package check out [the changelog][changelog]. For full documentation, visit the [official Prismic documentation][prismic-docs].

## Contributing

Whether you're helping us fix bugs, improve the docs, or spread the word, we'd love to have you as part of the Prismic developer community!

**Asking a question**: [Open a new topic][forum-question] on our community forum explaining what you want to achieve / your question. Our support team will get back to you shortly.

**Reporting a bug**: [Open an issue][repo-bug-report] explaining your application's setup and the bug you're encountering.

**Suggesting an improvement**: [Open an issue][repo-feature-request] explaining your improvement or feature so we can discuss and learn more.

**Submitting code changes**: For small fixes, feel free to [open a pull request][repo-pull-requests] with a description of your changes. For large changes, please first [open an issue][repo-feature-request] so we can discuss if and how the changes should be implemented.

For more clarity on this project and its structure you can also check out the detailed [CONTRIBUTING.md][contributing] document.

## License

```
   Copyright 2013-2022 Prismic <contact@prismic.io> (https://prismic.io)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

<!-- Links -->

[prismic]: https://prismic.io

<!-- TODO: Replace link with a more useful one if available -->

[prismic-docs]: https://prismic.io/docs
[changelog]: ./CHANGELOG.md
[contributing]: ./CONTRIBUTING.md
[vs-code-marketplace-src]: https://marketplace.visualstudio.com/items?itemName=prismicio.prismicio-snippets
[coc-nvim-src]: https://github.com/neoclide/coc.nvim
[sublime-package-control-src]: https://packagecontrol.io/packages/Prismic.io%20snippets

<!-- TODO: Replace link with a more useful one if available -->

[forum-question]: https://community.prismic.io
[repo-bug-report]: https://github.com/prismicio/prismic-snippets/issues/new?assignees=&labels=bug&template=bug_report.md&title=
[repo-feature-request]: https://github.com/prismicio/prismic-snippets/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=
[repo-pull-requests]: https://github.com/prismicio/prismic-snippets/pulls

<!-- Badges -->

[github-actions-ci-src]: https://github.com/prismicio/prismic-snippets/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/prismicio/prismic-snippets/actions?query=workflow%3Aci
[conventional-commits-src]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[conventional-commits-href]: https://conventionalcommits.org
[license-src]: https://img.shields.io/npm/l/@prismicio/snippets.svg
[license-href]: https://npmjs.com/package/@prismicio/snippets
