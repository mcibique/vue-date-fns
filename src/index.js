var formatDate = require("date-fns/format");

function createDateFilter (defaultFormat, defaultOptions) {
  return function dateFilter (date, format, opts) {
    if (!date) {
      return "";
    }
    return formatDate(date, format || defaultFormat, Object.assign(defaultOptions || {}, opts));
  };
}

function install (Vue, defaultFormat, defaultOptions) {
  var dateFilter = createDateFilter(defaultFormat, defaultOptions);

  Vue.filter("date", dateFilter);

  Vue.mixin({
    methods: {
      $date: dateFilter,
    },
  });
}

module.exports = install;

module.exports.createDateFilter = createDateFilter;

module.exports.dateFilter = createDateFilter();
