# Date filter for Vue based on [date-fns](https://date-fns.org/)

[![npm version](https://badgen.net/npm/v/vue-date-fns)](https://www.npmjs.com/package/vue-date-fns)
[![minzipped size](https://badgen.net/bundlephobia/minzip/vue-date-fns)](https://bundlephobia.com/result?p=vue-date-fns)

The `format` function from [date-fns](https://date-fns.org/) available as a filter for Vue apps. Why date-fns and not moment.js? There are already few [articles](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e), [covering](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43), [that](https://github.com/you-dont-need/You-Dont-Need-Momentjs).

## Disclaimer

This package is just a Vue wrapper around `date-fns`. All important (and excellent) stuff is happening inside the `date-fns` library. If you found a bug please report it in their [issue tracker](https://github.com/date-fns/date-fns/issues) or help them and [contribute the PR](https://github.com/date-fns/date-fns/blob/master/CONTRIBUTING.md). If you like their package, [support them](https://opencollective.com/date-fns), because they're doing an amazing job.

## Installation

```sh
npm install vue-date-fns --save
```

or

```sh
yarn add vue-date-fns
```

`vue-date-fns` depends on `date-fns` version 1.

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

The filter and mixin support the same arguments as the original `format` function (see [docs](https://date-fns.org/v1.29.0/docs/format)):

`format(date, [format], [options])`

So you can do this:

```html
<!-- my-component.vue -->
<template>
    <div>
        <div>Now: {{ new Date() | date('DD MMMM YYYY') }}</div>
        <div>Now: {{ $date(new Date(), 'DD MMMM YYYY') }}</div>
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
            return this.$date(new Date(), "DD MMMM YYYY", { locale });
        }
    }
}
```

## Overriding default options

The default date format and default locale options are the same as for the original `format` function (see the [docs](https://date-fns.org/v1.29.0/docs/format#arguments)). There is a way how to set your own:

### Filter in individual component

Instead of importing the `dateFilter`, import `createDateFilter` factory function and use it for creating the dateFilter with your own defaults:

```js
// my-component.js
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/sk";

export default {
    filters: {
        date: createDateFilter("DD MMMM YYYY", { locale })
    }
}
```

### Global filter

Instead of importing the `dateFilter`, import `createDateFilter` factory function and use it for creating the dateFilter with your own defaults:

```js
// main.js
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/sk";

Vue.filter("date", createDateFilter("DD MMMM YYYY", { locale }));
```

### Global filter and mixin

Pass the new defaults as other parameters to the `.use()` call. The defaults are applied for global filter and mixin.

```js
// main.js
import VueDateFns from "vue-date-fns";

Vue.use(VueDateFns, "DD MMMM YYYY", { locale });
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
        <div>Now: {{ new Date() | myDateFilter('DD MMMM YYYY') }}</div>
        <div>Now: {{ $myDateFilter(new Date(), 'DD MMMM YYYY') }}</div>
    </div>
</template>
```
