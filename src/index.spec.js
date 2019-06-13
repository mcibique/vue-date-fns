/* eslint-env node, mocha */

let Vue = require("vue");
let formatDate = require("date-fns/format");
let expect = require("chai").expect;
let { mount, createLocalVue } = require("@vue/test-utils");

let DateFnsPlugin = require(".");
let { dateFilter, createDateFilter } = DateFnsPlugin;

describe("using filter in component", function () {
  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = Vue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { locale }) }}</p>`,
        filters: {
          date: dateFilter,
        },
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("creating own filter with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("creating own filter with custom format and custom defaults", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = Vue.extend({
        template: "<p>{{ myDate | date }}</p>",
        filters: {
          date: createDateFilter(customFormat, { locale }),
        },
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper);
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });
});

describe("using global filter", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin);
  });

  it("should have registered filter with default name globally", function () {
    expect(localVue.filter("date")).to.be.a("function");
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${customFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });
});

describe("using global filter with custom format", function () {
  let localVue;
  let customFormat = "DD MMMM YYYY";

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, customFormat);
  });

  it("should have registered filter with default name globally", function () {
    expect(localVue.filter("date")).to.be.a("function");
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale }));
    });
  });
});

describe("using global filter with custom format and custom defaults", function () {
  let localVue;
  let customFormat = "DD MMMM YYYY";
  let locale = require("date-fns/locale/ar");

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, customFormat, { locale });
  });

  it("should have registered filter with default name globally", function () {
    expect(localVue.filter("date")).to.be.a("function");
  });

  describe("without any options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ myDate | date }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });

  describe("with custom format", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale }));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let differentCustomFormat = "DD MMMM YYYY HH:mm";
      let differentLocale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ myDate | date('${differentCustomFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: differentLocale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, differentCustomFormat, { locale: differentLocale }));
    });
  });
});

describe("using global filter with custom filter name", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, null, null, "myDateFilter");
  });

  it("should have registered filter with given name globally", function () {
    expect(localVue.filter("myDateFilter")).to.be.a("function");
  });

  it("should NOT have registered filter with default name globally", function () {
    expect(localVue.filter("date")).to.be.undefined;
  });

  it("should use the filter and produce the same output as date-fns", function () {
    let date = new Date();

    let Wrapper = localVue.extend({
      template: "<p>{{ myDate | myDateFilter }}</p>",
      data () {
        return {
          myDate: date,
        };
      },
    });

    let wrapper = mount(Wrapper, { localVue });
    let text = wrapper.find("p").text();
    expect(text).to.be.ok;
    expect(text).to.equal(formatDate(date));
  });
});

describe("using mixin", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin);
  });

  it("should have registered filter with default name globally", function () {
    // eslint-disable-next-line new-cap
    expect(new localVue().$date).to.be.a("function");
  });

  describe("without any options", function () {
    it("should use mixin and produce the same output as date-fns", function () {
      let date = new Date();

      let Wrapper = localVue.extend({
        template: "<p>{{ $date(myDate) }}</p>",
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date));
    });
  });

  describe("with custom format", function () {
    it("should use mixin and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY HH:mm";

      let Wrapper = localVue.extend({
        template: `<p>{{ $date(myDate, '${customFormat}') }}</p>`,
        data () {
          return {
            myDate: date,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat));
    });
  });

  describe("with custom format and options", function () {
    it("should use the filter and produce the same output as date-fns", function () {
      let date = new Date();
      let customFormat = "DD MMMM YYYY HH:mm";
      let locale = require("date-fns/locale/sk");

      let Wrapper = localVue.extend({
        template: `<p>{{ $date(myDate, '${customFormat}', { locale }) }}</p>`,
        data () {
          return {
            myDate: date,
            locale: locale,
          };
        },
      });

      let wrapper = mount(Wrapper, { localVue });
      let text = wrapper.find("p").text();
      expect(text).to.be.ok;
      expect(text).to.equal(formatDate(date, customFormat, { locale }));
    });
  });
});

describe("using mixing with custom filter name", function () {
  let localVue;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(DateFnsPlugin, null, null, "myDateFilter");
  });

  it("should have registered filter with given name globally", function () {
    // eslint-disable-next-line new-cap
    expect(new localVue().$myDateFilter).to.be.a("function");
  });

  it("should NOT have registered filter with default name globally", function () {
    // eslint-disable-next-line new-cap
    expect(new localVue().$date).to.be.undefined;
  });

  it("should use mixin and produce the same output as date-fns", function () {
    let date = new Date();

    let Wrapper = localVue.extend({
      template: "<p>{{ $myDateFilter(myDate) }}</p>",
      data () {
        return {
          myDate: date,
        };
      },
    });

    let wrapper = mount(Wrapper, { localVue });
    let text = wrapper.find("p").text();
    expect(text).to.be.ok;
    expect(text).to.equal(formatDate(date));
  });
});

describe("falsy values", function () {
  for (let testCase of [undefined, null, "", NaN]) {
    it(`should return empty string for '${testCase}'`, function () {
      expect(dateFilter(testCase)).to.equal("");
    });
  }
});
