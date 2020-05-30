# Changelog

## [2.0.0] - 2020-05-30

### Breaking changes

- Upgraded `date-fns` to version 2. All breaking changes from `date-fns` applies. Before upgrading to `date-fns@2` and `vue-date-fns@2`, please check `date-fns` docs for [format function](https://date-fns.org/v2.14.0/docs/format#v2.0.0-breaking-changes), their [blog explaining changes in the format](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/) and their changelog for [common breaking changes](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes) in the `date-fns` library. It is very likely that your existing code will break.

### Other changes

- Added default date format because it was removed from `date-fns` in version 2. It is now set to `"yyyy-MM-dd'T'HH:mm:ss.SSSxxx"`, same it was in version 1 of `date-fns`.
- Resolved all security warnings
- Bumped up all dev dependencies
