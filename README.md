# Date filter for Vue 2.X based on [date-fns](https://date-fns.org/)

[![npm version](https://badgen.net/npm/v/vue-date-fns)](https://www.npmjs.com/package/vue-date-fns)
[![minzipped size](https://badgen.net/bundlephobia/minzip/vue-date-fns)](https://bundlephobia.com/result?p=vue-date-fns)

The `format` function from [date-fns](https://date-fns.org/) available as a filter for Vue apps. Why date-fns and not moment.js? There are already few [articles](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e), [covering](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43), [that](https://github.com/you-dont-need/You-Dont-Need-Momentjs).

## Disclaimer

This package is just a Vue 2.X wrapper around `date-fns`. All important (and excellent) stuff is happening inside the `date-fns` library. If you found a bug please report it in their [issue tracker](https://github.com/date-fns/date-fns/issues) or help them and [contribute the PR](https://github.com/date-fns/date-fns/blob/master/CONTRIBUTING.md). If you like their package, [support them](https://opencollective.com/date-fns), because they're doing an amazing job.

## Installation

```sh
npm install vue-date-fns --save
```

or

```sh
yarn add vue-date-fns
```

`vue-date-fns` depends on `date-fns` version 2. If you are using the version 1 of `date-fns`, then install `vue-date-fns@1`, which is compatible.

### Breaking changes in version 2

`vue-date-fns@2` inherits all **breaking changes** from `date-fns@2`, because it's just a wrapper around their `format` function. There were major breaking changes in the format API, e.g. `DD MMMM YYYY` should be from now on `dd MMMM yyyy`.

Before upgrading to `date-fns@2` and `vue-date-fns@2`, please check `date-fns` docs for [format function](https://date-fns.org/v2.14.0/docs/format#v2.0.0-breaking-changes), their [blog explaining changes in the format](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/) and their changelog for [common breaking changes](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes) in the `date-fns` library. It is very likely that your existing code will break.

## Usage

### Filter in individual component

You can use filter directly in your component.

```js
// my-component.js
import { dateFilter } from "vue-date-fns";

export default {
    filters: {
        date: dateFilter
    }
}
```

```html
<!-- my-component.vue -->
<template>
    <div>Now: {{ new Date() | date }}</div>
</template>
```

### Global filter

You can register the filter globally in your app.

```js
// main.js
import { dateFilter } from "vue-date-fns";

Vue.filter("date", dateFilter);
```

```html
<!-- my-component.vue -->
<template>
    <div>Now: {{ new Date() | date }}</div>
</template>
```

### Global filter and mixin

You can also use the filter as a mixin if you install the entire plugin.

```js
// main.js
import VueDateFns from "vue-date-fns";

Vue.use(VueDateFns);
```

```js
// my-component.js
export default {
    computed: {
        now() {
            return this.$date(new Date());
        }
    }
}
```

```html
<!-- my-component.vue -->
<template>
    <div>
        <div>Now: {{ now }}</div>
        <div>Now: {{ new Date() | date }}</div>
        <div>Now: {{ $date(new Date()) }}</div>
    </div>
</template>
```

## Options

The filter and mixin support the same arguments as the original `format` function (see [docs](https://date-fns.org/v2.14.0/docs/format)):

`format(date, format, [options])`

So you can do this:

```html
<!-- my-component.vue -->
<template>
    <div>
        <div>Now: {{ new Date() | date('dd MMMM yyyy') }}</div>
        <div>Now: {{ $date(new Date(), 'dd MMMM yyyy') }}</div>
    </div>
</template>
```

or provide custom locale:

```js
// my-component.js
import locale from "date-fns/locale/sk";

export default {
    computed: {
        now() {
            return this.$date(new Date(), "dd MMMM yyyy", { locale });
        }
    }
}
```

## Overriding default options

The default date format and default locale options are the same as for the original `format` function (see the [docs](https://date-fns.org/v2.14.0/docs/format#arguments)). There is a way how to set your own:

### Filter in individual component

Instead of importing the `dateFilter`, import `createDateFilter` factory function and use it for creating the dateFilter with your own defaults:

```js
// my-component.js
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/sk";

export default {
    filters: {
        date: createDateFilter("dd MMMM yyyy", { locale })
    }
}
```

### Global filter

Instead of importing the `dateFilter`, import `createDateFilter` factory function and use it for creating the dateFilter with your own defaults:

```js
// main.js
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/sk";

Vue.filter("date", createDateFilter("dd MMMM yyyy", { locale }));
```

### Global filter and mixin

Pass the new defaults as other parameters to the `.use()` call. The defaults are applied for global filter and mixin.

```js
// main.js
import VueDateFns from "vue-date-fns";

Vue.use(VueDateFns, "dd MMMM yyyy", { locale });
```

## Customize the global filter name

If you want to change the global name of the filter and mixin, pass the fourth argument into the `.use()` call. If the value is falsy, it defaults to `"date"`.

```js
// main.js
import VueDateFns from "vue-date-fns";

Vue.use(VueDateFns, /* custom format */, /* custom options */, "myDateFilter");
```

```html
<!-- my-component.vue -->
<template>
    <div>
        <div>Now: {{ new Date() | myDateFilter }}</div>
        <div>Now: {{ new Date() | myDateFilter('dd MMMM yyyy') }}</div>
        <div>Now: {{ $myDateFilter(new Date(), 'dd MMMM yyyy') }}</div>
    </div>
</template>
```

## Default date format

If you don't set up any default format for your custom filters, `vue-date-fns` will automatically set it to `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`, following [the migration guide](https://date-fns.org/v2.14.0/docs/format#v2.0.0-breaking-changes) of `date-fns`.

If you would like to change the default format, follow the [Overriding default options](#overriding-default-options) section and create a custom filter with custom defaults.
