# Date filter for Vue based on [date-fns](https://date-fns.org/)

A `format` function from [date-fns](https://date-fns.org/) available as a filter for Vue apps. Why date-fns and not moment? There are few [articles](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e) [covering](https://hackernoon.com/why-you-should-choose-date-fns-over-moment-js-in-your-nodejs-applications-116d1a709c43) [that](https://github.com/you-dont-need/You-Dont-Need-Momentjs).

## Installation

```sh
npm install vue-date-fns --save
```
or
```sh
yarn add vue-date-fns
```

## Usage

### Filter in individual component

You can use filter directly in your component.
```js
import { dateFilter } from "vue-date-fns";

export default {
    filters: {
        date: dateFilter
    }
}
```
```html
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
