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