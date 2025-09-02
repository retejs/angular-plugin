# [2.5.0](https://github.com/retejs/angular-plugin/compare/v2.4.1...v2.5.0) (2025-09-02)


### Features

* add impure pipe for ordeting inputs, outputs, etc ([f73a645](https://github.com/retejs/angular-plugin/commit/f73a645b6017fcb0db58a10523031fdadd805f23))

## [2.4.1](https://github.com/retejs/angular-plugin/compare/v2.4.0...v2.4.1) (2025-09-02)


### Bug Fixes

* change dection for connection component ([ff1a538](https://github.com/retejs/angular-plugin/commit/ff1a5380f082efefe66102cbc46155f1ef08316d))

# [2.4.0](https://github.com/retejs/angular-plugin/compare/v2.3.2...v2.4.0) (2025-06-30)


### Features

* angular 20 support ([c773cfc](https://github.com/retejs/angular-plugin/commit/c773cfc9a1bc9bc9619352430370067351f6ba0e))

## [2.3.2](https://github.com/retejs/angular-plugin/compare/v2.3.1...v2.3.2) (2025-02-09)


### Bug Fixes

* update injector for re-mounted components ([f8e5b62](https://github.com/retejs/angular-plugin/commit/f8e5b626b9116d45785c176ffd2f9506a1107155))

## [2.3.1](https://github.com/retejs/angular-plugin/compare/v2.3.0...v2.3.1) (2025-01-04)


### Bug Fixes

* context menu subitems for v19 ([1e0abed](https://github.com/retejs/angular-plugin/commit/1e0abedbd0e7d30e9e16ca133f6195b824708021))

# [2.3.0](https://github.com/retejs/angular-plugin/compare/v2.2.1...v2.3.0) (2024-12-30)


### Bug Fixes

* update in angular 19 ([e77caef](https://github.com/retejs/angular-plugin/commit/e77caef983586bf1fe808337421a43f2ff9a72b3))


### Features

* support angular 19 ([3b517a7](https://github.com/retejs/angular-plugin/commit/3b517a7a729334d2cfd264018cc9739619f50911))

## [2.2.1](https://github.com/retejs/angular-plugin/compare/v2.2.0...v2.2.1) (2024-09-14)


### Bug Fixes

* fix peer dependencies constraints ([5870f77](https://github.com/retejs/angular-plugin/commit/5870f773b4029d211f99af1490af12196e3b0ccb))

# [2.2.0](https://github.com/retejs/angular-plugin/compare/v2.1.2...v2.2.0) (2024-09-14)


### Features

* add support for angular 18 ([3189913](https://github.com/retejs/angular-plugin/commit/31899136770001f8ebde4fe51d7ac2437dfb630d))

## [2.1.2](https://github.com/retejs/angular-plugin/compare/v2.1.1...v2.1.2) (2024-08-23)


### Bug Fixes

* node sizing ([ce0d8f2](https://github.com/retejs/angular-plugin/commit/ce0d8f27a9c88662d501b3f9e1916dd2ae54da5e))

## [2.1.1](https://github.com/retejs/angular-plugin/compare/v2.1.0...v2.1.1) (2024-01-27)


### Bug Fixes

* **build:** source maps ([d9d21ec](https://github.com/retejs/angular-plugin/commit/d9d21ec6b6b53f1a4b25fc8f71a87511fb4cefc3))

# [2.1.0](https://github.com/retejs/angular-plugin/compare/v2.0.2...v2.1.0) (2023-12-15)


### Features

* support Angular 17 ([b8c3250](https://github.com/retejs/angular-plugin/commit/b8c32500b4df952fd22907d0f3e31dd1edaef2c9))

## [2.0.2](https://github.com/retejs/angular-plugin/compare/v2.0.1...v2.0.2) (2023-07-16)


### Bug Fixes

* install deps for v16 ([fd667a2](https://github.com/retejs/angular-plugin/commit/fd667a2c3e37fa45bc9df41febf66bd39a84552c))

## [2.0.1](https://github.com/retejs/angular-plugin/compare/v2.0.0...v2.0.1) (2023-07-16)


### Bug Fixes

* emit 'unmount' ([4d17a2e](https://github.com/retejs/angular-plugin/commit/4d17a2e6d05567ff83c48881ba3edcf5dfe87801))

## v2.0.0-beta.19

Breaking changes:

```ts
render.addPreset(Presets.reroute.setup({
  translate(id, dx, dy) {
    // const { k } = rea.area.transform
    // dividing by k isn't needed
    reroutePlugin.translate(id, dx, dy);
  }
}))
```

## 2.0.0-beta.18

Breaking changes: `area` property omitted from `Presets.classic.setup({ area })`

## 2.0.0-beta.17

Support Angular 16

## 2.0.0-beta.14

Implemented presets for Minimap and Reroute

## 2.0.0-beta.13

Implemented preset for Context menu
