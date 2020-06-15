var formatDate = require("date-fns").format;

// https://date-fns.org/v2.14.0/docs/format#v2.0.0-breaking-changes
var DEFAULT_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

function createDateFilter (defaultFormat, defaultOptions) {
  return function dateFilter (date, format, opts) {
    if (!date) {
      return "";
    }
    return formatDate(date, format || defaultFormat || DEFAULT_DATE_FORMAT, Object.assign({}, defaultOptions || {}, opts));
  };
}

function install (Vue, defaultFormat, defaultOptions, globalFilterName) {
  var dateFilter = createDateFilter(defaultFormat, defaultOptions);
  globalFilterName = globalFilterName || "date";

  Vue.filter(globalFilterName, dateFilter);

  var methods = {};
  methods["$" + globalFilterName] = dateFilter;

  Vue.mixin({ methods: methods });
}

module.exports = install;

module.exports.createDateFilter = createDateFilter;

module.exports.dateFilter = createDateFilter();

module.exports.DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
