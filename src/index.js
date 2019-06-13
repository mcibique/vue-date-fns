var formatDate = require("date-fns/format");

function createDateFilter (defaultFormat, defaultOptions) {
  return function dateFilter (date, format, opts) {
    if (!date) {
      return "";
    }
    return formatDate(date, format || defaultFormat, Object.assign(defaultOptions || {}, opts));
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
