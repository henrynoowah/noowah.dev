# [0.32.0](https://github.com/henrynoowah/noowah.dev/compare/v0.23.0...v0.32.0) (2026-07-31)


### Bug Fixes

* a11y names + reliable theme toggle with smooth color change ([81b4ecd](https://github.com/henrynoowah/noowah.dev/commit/81b4ecd8141ea25ca4e7fc7a4fa4e7a0f17b6c86))
* **about:** intlayer array rendering, light-mode contrast, home spline ring ([#52](https://github.com/henrynoowah/noowah.dev/issues/52)) ([6dbc033](https://github.com/henrynoowah/noowah.dev/commit/6dbc033bb360200cc486d80781f4d3b17be03cf8))
* add visible h1 to home page to fix Lighthouse NO_LCP error ([c9b17db](https://github.com/henrynoowah/noowah.dev/commit/c9b17db62d6e08fccb8e93828c16f8a02ea230a3))
* **chat:** surface dropped streams instead of truncating answers silently ([e56008b](https://github.com/henrynoowah/noowah.dev/commit/e56008bed0d7ca2cfe5795e030981814cbaaebc9))
* drop bubble morph transition, keep bubble bot inert on chat toggle ([5edd8f3](https://github.com/henrynoowah/noowah.dev/commit/5edd8f31e0082b9666bc36b59a67e0ac8131701a))
* mobile chat fullscreen, dock overlap, and send button shape ([f53d226](https://github.com/henrynoowah/noowah.dev/commit/f53d22638d2c84e858150c99390276fa51a2c56f))
* persist dark mode across reloads and navigation ([435f3c5](https://github.com/henrynoowah/noowah.dev/commit/435f3c53f611dbfb08cc3bb2100a9ae6e2e43445))
* reload floating chat Spline scene after resize and fix hover-hide bug ([b14a4ad](https://github.com/henrynoowah/noowah.dev/commit/b14a4ad25ba19e4d91eddbbf072b8571ce46817d))
* switch chat to a working free model and surface mid-stream errors ([0f2505c](https://github.com/henrynoowah/noowah.dev/commit/0f2505c7a1927ad216ab7420474b34a2a953e358))
* use Locale type instead of LocalesValues in locale toggle ([9496642](https://github.com/henrynoowah/noowah.dev/commit/94966425ab0b5a0ec94ab43152ead8a0c4682364))


### Features

* **about:** editorial redesign with chat knowledge from one source ([#51](https://github.com/henrynoowah/noowah.dev/issues/51)) ([dfde15d](https://github.com/henrynoowah/noowah.dev/commit/dfde15d88c1af3baaba8b3d1391a7e35b13838da))
* add AI chat with Spline bubble and popover UI ([#50](https://github.com/henrynoowah/noowah.dev/issues/50)) ([5fa1275](https://github.com/henrynoowah/noowah.dev/commit/5fa1275b5d5f15df4ba9f04e917756293676f085))
* add llms.txt for AI crawler discovery ([75c788f](https://github.com/henrynoowah/noowah.dev/commit/75c788f03af9f1332bd6d7b806010db9c7808f9e))
* add projects section to about page ([c612754](https://github.com/henrynoowah/noowah.dev/commit/c6127549a7bc8507ace3f7b0c18ac68b89e52204))
* add robots.ts, fix chat pronunciation info and iOS input zoom ([694d50e](https://github.com/henrynoowah/noowah.dev/commit/694d50e71ec07c1e5e2120055dd63fd6f0152e14))
* nextjs 16 update ([025c910](https://github.com/henrynoowah/noowah.dev/commit/025c91084f15468202c1cdcc447d3f3ff446f61b))
* redesign about page hero with GSAP morph and consolidate works ([#48](https://github.com/henrynoowah/noowah.dev/issues/48)) ([b8d37d9](https://github.com/henrynoowah/noowah.dev/commit/b8d37d91d89c34d2fd2308cab69ea07414e1a18c))
* redesign pages with editorial aesthetic, shadcn/ui, and Korean i18n ([5e17532](https://github.com/henrynoowah/noowah.dev/commit/5e17532841ae5b7c55696dfac6bab562ece07c2e))
* self-reference canonical domain and add sitemap ([9bb3449](https://github.com/henrynoowah/noowah.dev/commit/9bb3449d92e80d910d5150ba9def384a549ccf91))
* shared-element view transitions for wordmark and header toggles ([9bb9643](https://github.com/henrynoowah/noowah.dev/commit/9bb9643e66c03c9b987af1ae9d8e6bacc46846ce))
* style markdown tables in chat responses ([80cd4fb](https://github.com/henrynoowah/noowah.dev/commit/80cd4fbc1c9764dbb8bfaa326d3785db86726fbf))
* view-transition-update ([5e0f744](https://github.com/henrynoowah/noowah.dev/commit/5e0f744bae42a3a36581e0f211ec01edcb54271d))


### Performance Improvements

* defer Spline 3D runtime to slash home page TBT ([6f69a0f](https://github.com/henrynoowah/noowah.dev/commit/6f69a0f9b2307fef35a3f747971bc248bc95cd3a))


### Reverts

* restore smooth home<->bubble morph transition for chat bot ([3dbb2d6](https://github.com/henrynoowah/noowah.dev/commit/3dbb2d6a7be5f5aa9161741f1f8e8069fddbb7da))



# [0.23.0](https://github.com/henrynoowah/noowah.dev/compare/v0.22.2...v0.23.0) (2024-10-22)


### Features

* next 15 version update ([209f3dc](https://github.com/henrynoowah/noowah.dev/commit/209f3dc921f0f621c69795048335d845666c30fa))



## [0.22.2](https://github.com/henrynoowah/noowah.dev/compare/v0.22.1...v0.22.2) (2024-06-13)


### Bug Fixes

* updated i18n handling ([464b4fd](https://github.com/henrynoowah/noowah.dev/commit/464b4fdf4cfc0ec12f910b2423c2c500d5387617))



## [0.22.1](https://github.com/henrynoowah/noowah.dev/compare/v0.22.0...v0.22.1) (2024-05-10)


### Bug Fixes

* updated middleware matcher to prevent matching public directory ([c4ba54e](https://github.com/henrynoowah/noowah.dev/commit/c4ba54ec1d891f50a81efca103bcecbd35d70b46))



# [0.22.0](https://github.com/henrynoowah/noowah.dev/compare/v0.21.0...v0.22.0) (2024-05-09)


### Features

* added vercel.json ([f3627e4](https://github.com/henrynoowah/noowah.dev/commit/f3627e4c37fe4c6af1a5c29a01a2520761704736))



