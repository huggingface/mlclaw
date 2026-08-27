#!/usr/bin/env node
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ajv-formats/dist/formats.js
var require_formats = __commonJS({
  "node_modules/ajv-formats/dist/formats.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
    function fmtDef(validate, compare) {
      return { validate, compare };
    }
    exports.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(getTime(true), compareTime),
      "date-time": fmtDef(getDateTime(true), compareDateTime),
      "iso-time": fmtDef(getTime(), compareIsoTime),
      "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: { type: "number", validate: validateInt32 },
      // signed 64 bit integer
      int64: { type: "number", validate: validateInt64 },
      // C-type float
      float: { type: "number", validate: validateNumber },
      // C-type double
      double: { type: "number", validate: validateNumber },
      // hint to the UI to hide input strings
      password: true,
      // unchecked string payload
      binary: true
    };
    exports.fastFormats = {
      ...exports.fullFormats,
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
      "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    };
    exports.formatNames = Object.keys(exports.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date(str) {
      const matches = DATE.exec(str);
      if (!matches)
        return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function compareDate(d1, d2) {
      if (!(d1 && d2))
        return void 0;
      if (d1 > d2)
        return 1;
      if (d1 < d2)
        return -1;
      return 0;
    }
    var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function getTime(strictTimeZone) {
      return function time(str) {
        const matches = TIME.exec(str);
        if (!matches)
          return false;
        const hr = +matches[1];
        const min = +matches[2];
        const sec = +matches[3];
        const tz = matches[4];
        const tzSign = matches[5] === "-" ? -1 : 1;
        const tzH = +(matches[6] || 0);
        const tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
          return false;
        if (hr <= 23 && min <= 59 && sec < 60)
          return true;
        const utcMin = min - tzM * tzSign;
        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
      };
    }
    function compareTime(s1, s2) {
      if (!(s1 && s2))
        return void 0;
      const t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf();
      const t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
      if (!(t1 && t2))
        return void 0;
      return t1 - t2;
    }
    function compareIsoTime(t1, t2) {
      if (!(t1 && t2))
        return void 0;
      const a1 = TIME.exec(t1);
      const a2 = TIME.exec(t2);
      if (!(a1 && a2))
        return void 0;
      t1 = a1[1] + a1[2] + a1[3];
      t2 = a2[1] + a2[2] + a2[3];
      if (t1 > t2)
        return 1;
      if (t1 < t2)
        return -1;
      return 0;
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function getDateTime(strictTimeZone) {
      const time = getTime(strictTimeZone);
      return function date_time(str) {
        const dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
      };
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const d1 = new Date(dt1).valueOf();
      const d2 = new Date(dt2).valueOf();
      if (!(d1 && d2))
        return void 0;
      return d1 - d2;
    }
    function compareIsoDateTime(dt1, dt2) {
      if (!(dt1 && dt2))
        return void 0;
      const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
      const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
      const res = compareDate(d1, d2);
      if (res === void 0)
        return void 0;
      return res || compareTime(t1, t2);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      BYTE.lastIndex = 0;
      return BYTE.test(str);
    }
    var MIN_INT32 = -(2 ** 31);
    var MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value) {
      return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
    }
    function validateInt64(value) {
      return Number.isInteger(value);
    }
    function validateNumber() {
      return true;
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str))
        return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal2(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal2(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal2(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/openclaw-unyolo/node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/openclaw-unyolo/node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal2 = require_fast_deep_equal();
    equal2.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal2;
  }
});

// node_modules/openclaw-unyolo/node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/openclaw-unyolo/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length2(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length2;
    ucs2length2.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// src/mlclaw-space-runtime/cli.ts
import { spawn as spawn3 } from "node:child_process";
import process2 from "node:process";

// src/mlclaw-space-runtime/config.ts
import { createHash, randomBytes } from "node:crypto";
import { readFileSync as readFileSync3 } from "node:fs";
import { isAbsolute as isAbsolute2 } from "node:path";

// src/hf-state-sync/paths.ts
var DEFAULT_BUCKET_PREFIX = "openclaw-state";
function normalizeBucketPrefix(prefix) {
  const normalized = (prefix?.trim() || DEFAULT_BUCKET_PREFIX).replace(/^\/+|\/+$/g, "");
  return normalized || DEFAULT_BUCKET_PREFIX;
}

// src/mlclaw-space-runtime/branding.ts
var DEFAULT_BRAND_NAME = "ML Claw";
var DEFAULT_THEME_COLOR = "#111827";
var DEFAULT_LOGO_ASSET = "mlclaw.svg";
var DEFAULT_HUGGING_FACE_ASSET = "hf-logo.svg";
var DEFAULT_HUGGING_FACE_PNG_ASSET = "hf-logo.png";
function resolveBranding(env, agentName) {
  const defaultName = defaultBrandName(agentName);
  const name = cleanText(env.MLCLAW_BRAND_NAME) ?? defaultName;
  return {
    name,
    shortName: cleanText(env.MLCLAW_BRAND_SHORT_NAME) ?? name,
    themeColor: normalizeThemeColor(env.MLCLAW_BRAND_THEME_COLOR) ?? DEFAULT_THEME_COLOR,
    logoAsset: normalizeAssetRef(env.MLCLAW_BRAND_LOGO, DEFAULT_LOGO_ASSET),
    faviconSvgAsset: normalizeAssetRef(
      env.MLCLAW_BRAND_FAVICON_SVG ?? env.MLCLAW_BRAND_FAVICON,
      DEFAULT_HUGGING_FACE_ASSET
    ),
    favicon32Asset: normalizeAssetRef(
      env.MLCLAW_BRAND_FAVICON_32 ?? env.MLCLAW_BRAND_FAVICON_PNG ?? env.MLCLAW_BRAND_FAVICON,
      DEFAULT_HUGGING_FACE_PNG_ASSET
    ),
    faviconIcoAsset: normalizeAssetRef(
      env.MLCLAW_BRAND_FAVICON_ICO ?? env.MLCLAW_BRAND_FAVICON,
      DEFAULT_HUGGING_FACE_ASSET
    ),
    appleTouchIconAsset: normalizeAssetRef(env.MLCLAW_BRAND_APPLE_TOUCH_ICON, DEFAULT_HUGGING_FACE_PNG_ASSET)
  };
}
function publicBranding(branding) {
  return {
    name: branding.name,
    shortName: branding.shortName,
    themeColor: branding.themeColor,
    logoUrl: "/assets/brand/logo"
  };
}
function brandingManifest(branding) {
  return `${JSON.stringify(
    {
      name: branding.name,
      short_name: branding.shortName,
      description: `${branding.name} browser gateway`,
      start_url: "./",
      display: "standalone",
      theme_color: branding.themeColor,
      background_color: branding.themeColor,
      icons: [
        {
          src: "./favicon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any"
        },
        {
          src: "./favicon-32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          src: "./apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png"
        }
      ]
    },
    null,
    2
  )}
`;
}
function defaultBrandName(agentName) {
  const cleaned = cleanText(agentName);
  if (!cleaned) {
    return DEFAULT_BRAND_NAME;
  }
  if (/^mlclaw$/i.test(cleaned)) {
    return DEFAULT_BRAND_NAME;
  }
  return cleaned.split(/[-_\s]+/).filter(Boolean).map((word) => /^mlclaw$/i.test(word) ? DEFAULT_BRAND_NAME : `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`).join(" ");
}
function cleanText(value) {
  const cleaned = value?.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  return cleaned ? cleaned.slice(0, 80) : void 0;
}
function normalizeThemeColor(value) {
  const cleaned = value?.trim();
  if (!cleaned) {
    return void 0;
  }
  if (/^#[0-9a-fA-F]{3}$/.test(cleaned)) {
    return `#${cleaned.slice(1).split("").map((char) => `${char}${char}`).join("")}`.toLowerCase();
  }
  if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
    return cleaned.toLowerCase();
  }
  throw new Error("MLCLAW_BRAND_THEME_COLOR must be a #rgb or #rrggbb color");
}
function normalizeAssetRef(value, fallback) {
  const raw2 = value?.trim() || fallback;
  const withoutAssetsPrefix = raw2.replace(/^\/?assets\/+/, "");
  const normalized = withoutAssetsPrefix.split("/").filter(Boolean).join("/");
  if (!normalized || normalized === "." || normalized.startsWith("../") || normalized.includes("/../") || normalized.startsWith("/")) {
    throw new Error(`brand asset path must stay inside the Space assets directory: ${raw2}`);
  }
  return normalized;
}

// src/mlclaw-space-runtime/model-default.ts
var DEFAULT_MODEL_ID = "zai-org/GLM-5.2";
var DEFAULT_MODEL_PROVIDER = "fireworks-ai";
var DEFAULT_MODEL = `huggingface/${DEFAULT_MODEL_ID}:${DEFAULT_MODEL_PROVIDER}`;

// src/mlclaw-space-runtime/model-choices.ts
var DEFAULT_ROUTER_PROVIDER = "deepinfra";
var PRESET_MODEL_CHOICES = [
  freezeChoice({
    modelId: "google/gemma-4-26B-A4B-it",
    provider: "deepinfra",
    label: "Gemma 4 26B A4B",
    note: "Low-cost Gemma preset on DeepInfra",
    contextLength: 262144,
    pricing: { input: 0.07, output: 0.34 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 414.2,
    throughput: 34.79003450519141,
    status: "live",
    inputModalities: ["text", "image"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "Qwen/Qwen3.6-35B-A3B",
    provider: "deepinfra",
    label: "Qwen 3.6 35B A3B",
    note: "Strong Qwen 3.6 preset on DeepInfra",
    contextLength: 262144,
    pricing: { input: 0.15, output: 0.95 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 401,
    throughput: 43.13170843671405,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "Qwen/Qwen3.6-27B",
    provider: "deepinfra",
    label: "Qwen 3.6 27B",
    note: "Live Qwen 3.6 preset on DeepInfra",
    contextLength: 262144,
    pricing: { input: 0.32, output: 3.2 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 347.8,
    throughput: 39.47002845464158,
    status: "live",
    inputModalities: ["text", "image"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "zai-org/GLM-5.2",
    provider: "deepinfra",
    label: "GLM 5.2",
    note: "Long-context GLM preset on DeepInfra",
    contextLength: 1048576,
    pricing: { input: 0.93, output: 3 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 467.5,
    throughput: 16.52283992136833,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "moonshotai/Kimi-K2.7-Code",
    provider: "deepinfra",
    label: "Kimi K2.7 Code",
    note: "Kimi K2.7 coding preset on DeepInfra",
    contextLength: 262144,
    pricing: { input: 0.74, output: 3.5 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 692,
    throughput: 29.26330731892916,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "openai/gpt-oss-120b",
    provider: "deepinfra",
    label: "GPT-OSS 120B",
    note: "Large GPT-OSS preset on DeepInfra",
    contextLength: 131072,
    pricing: { input: 0.037, output: 0.17 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 362.2,
    throughput: 32.98392643597656,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "openai/gpt-oss-20b",
    provider: "deepinfra",
    label: "GPT-OSS 20B",
    note: "Lower-cost GPT-OSS preset on DeepInfra",
    contextLength: 131072,
    pricing: { input: 0.03, output: 0.14 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 255,
    throughput: 115.64765388606148,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "deepseek-ai/DeepSeek-V4-Flash",
    provider: "deepinfra",
    label: "DeepSeek V4 Flash",
    note: "Lower-cost DeepSeek V4 preset on DeepInfra",
    contextLength: 1048576,
    pricing: { input: 0.09, output: 0.18 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 719.8,
    throughput: 24.5757632831937,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "deepseek-ai/DeepSeek-V4-Pro",
    provider: "deepinfra",
    label: "DeepSeek V4 Pro",
    note: "Higher-quality DeepSeek V4 preset on DeepInfra",
    contextLength: 1048576,
    pricing: { input: 1.3, output: 2.6 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 489.2,
    throughput: 37.30647476533069,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "MiniMaxAI/MiniMax-M3",
    provider: "together",
    label: "MiniMax M3",
    note: "Long-context MiniMax preset on Together",
    contextLength: 524288,
    pricing: { input: 0.3, output: 1.2 },
    supportsTools: true,
    supportsStructuredOutput: true,
    firstTokenLatencyMs: 505.6,
    throughput: 59.79726580207129,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "zai-org/GLM-5.2",
    provider: "fireworks-ai",
    label: "GLM 5.2",
    note: "Default long-context GLM preset on Fireworks",
    contextLength: 1048576,
    pricing: { input: 1.4, output: 4.4 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 931,
    throughput: 44.001300948170254,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "moonshotai/Kimi-K2.7-Code",
    provider: "fireworks-ai",
    label: "Kimi K2.7 Code",
    note: "Kimi K2.7 coding alternative on Fireworks",
    contextLength: 262144,
    pricing: { input: 0.95, output: 4 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 598.8,
    throughput: 139.36660684183386,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "openai/gpt-oss-120b",
    provider: "fireworks-ai",
    label: "GPT-OSS 120B",
    note: "Large GPT-OSS alternative on Fireworks",
    contextLength: 131072,
    pricing: { input: 0.15, output: 0.6 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 436.8,
    throughput: 150.7430218155076,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "openai/gpt-oss-20b",
    provider: "fireworks-ai",
    label: "GPT-OSS 20B",
    note: "Lower-cost GPT-OSS alternative on Fireworks",
    contextLength: 131072,
    pricing: { input: 0.07, output: 0.3 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 576.4,
    throughput: 48.80341799488286,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "deepseek-ai/DeepSeek-V4-Flash",
    provider: "fireworks-ai",
    label: "DeepSeek V4 Flash",
    note: "Lower-cost DeepSeek V4 alternative on Fireworks",
    contextLength: 1048576,
    pricing: { input: 0.14, output: 0.28 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 556.2,
    throughput: 112.3238326192391,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "deepseek-ai/DeepSeek-V4-Pro",
    provider: "fireworks-ai",
    label: "DeepSeek V4 Pro",
    note: "Higher-quality DeepSeek V4 alternative on Fireworks",
    contextLength: 1048576,
    pricing: { input: 1.74, output: 3.48 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 787.2,
    throughput: 59.92780906440809,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  }),
  freezeChoice({
    modelId: "MiniMaxAI/MiniMax-M3",
    provider: "fireworks-ai",
    label: "MiniMax M3",
    note: "Long-context MiniMax alternative on Fireworks",
    contextLength: 512e3,
    pricing: { input: 0.3, output: 1.2 },
    supportsTools: true,
    supportsStructuredOutput: false,
    firstTokenLatencyMs: 756,
    throughput: 131.4435735979844,
    status: "live",
    inputModalities: ["text"],
    outputModalities: ["text"],
    preset: true
  })
];
function parseModelChoicesEnv(value, activeModel) {
  const parsed = parseJsonArray(value);
  const choices = parsed ? parsed.flatMap((item) => {
    const choice = normalizeModelChoice(item);
    return choice ? [choice] : [];
  }) : PRESET_MODEL_CHOICES;
  return ensureActiveModelChoice(dedupeModelChoices(choices), activeModel);
}
function normalizeModelChoice(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return void 0;
  }
  const item = value;
  const parsed = parseOpenClawModelRef(stringValue(item.openclawModel));
  const modelId = normalizeModelId(stringValue(item.modelId) ?? parsed?.modelId);
  const provider = normalizeProvider(stringValue(item.provider) ?? parsed?.provider);
  if (!modelId || !provider) {
    return void 0;
  }
  return freezeChoice({
    modelId,
    provider,
    label: cleanLabel(stringValue(item.label)) ?? displayNameFromModelId(modelId),
    ...optional("note", cleanNote(stringValue(item.note))),
    ...optional("contextLength", positiveInteger(item.contextLength)),
    ...optional("pricing", normalizePricing(item.pricing)),
    ...optional("supportsTools", optionalBoolean(item.supportsTools)),
    ...optional("supportsStructuredOutput", optionalBoolean(item.supportsStructuredOutput)),
    ...optional("firstTokenLatencyMs", positiveNumber(item.firstTokenLatencyMs)),
    ...optional("throughput", positiveNumber(item.throughput)),
    ...optional("status", cleanStatus(stringValue(item.status))),
    ...optional("inputModalities", normalizeModalities(item.inputModalities)),
    ...optional("outputModalities", normalizeModalities(item.outputModalities)),
    ...optionalBoolean(item.preset) === true ? { preset: true } : {}
  });
}
function normalizeModelChoices(value, activeModel) {
  if (!Array.isArray(value)) {
    return void 0;
  }
  const choices = value.flatMap((item) => {
    const choice = normalizeModelChoice(item);
    return choice ? [choice] : [];
  });
  if (choices.length === 0 || choices.length > 80) {
    return void 0;
  }
  return ensureActiveModelChoice(dedupeModelChoices(choices), activeModel);
}
function ensureActiveModelChoice(choices, activeModel) {
  const parsed = parseOpenClawModelRef(activeModel);
  if (!parsed) {
    return [...choices];
  }
  const active = freezeChoice({
    ...PRESET_MODEL_CHOICES.find((choice) => choice.modelId === parsed.modelId && choice.provider === parsed.provider),
    modelId: parsed.modelId,
    provider: parsed.provider,
    label: displayNameFromModelId(parsed.modelId)
  });
  return dedupeModelChoices([active, ...choices]);
}
function dedupeModelChoices(choices) {
  const seen = /* @__PURE__ */ new Set();
  const deduped = [];
  for (const choice of choices) {
    if (seen.has(choice.key)) {
      continue;
    }
    seen.add(choice.key);
    deduped.push(choice);
  }
  return deduped;
}
function formatOpenClawModelRef(modelId, provider) {
  return `huggingface/${modelId}:${provider}`;
}
function parseOpenClawModelRef(value) {
  const normalized = normalizeModelRef(value);
  if (!normalized?.startsWith("huggingface/")) {
    return void 0;
  }
  const rest = normalized.slice("huggingface/".length);
  const split = rest.lastIndexOf(":");
  const modelId = normalizeModelId(split >= 0 ? rest.slice(0, split) : rest);
  const provider = normalizeProvider(split >= 0 ? rest.slice(split + 1) : DEFAULT_ROUTER_PROVIDER);
  return modelId && provider ? { modelId, provider } : void 0;
}
function normalizeModelRef(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 260 || /[\r\n\t]/.test(trimmed) || /\s/.test(trimmed)) {
    return void 0;
  }
  return trimmed;
}
function choiceKey(modelId, provider) {
  return `${provider}::${modelId}`;
}
function displayNameFromModelId(id) {
  const base = id.split("/").pop() || id;
  return base.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
function freezeChoice(params) {
  const modelId = normalizeModelId(params.modelId) ?? params.modelId;
  const provider = normalizeProvider(params.provider) ?? params.provider;
  return {
    ...params,
    modelId,
    provider,
    key: choiceKey(modelId, provider),
    openclawModel: formatOpenClawModelRef(modelId, provider)
  };
}
function normalizeModelId(value) {
  if (!value) {
    return void 0;
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 220 || /[\r\n\t:]/.test(trimmed) || /\s/.test(trimmed) || !trimmed.includes("/")) {
    return void 0;
  }
  return trimmed;
}
function normalizeProvider(value) {
  if (!value) {
    return void 0;
  }
  const trimmed = value.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9._-]{0,63}$/.test(trimmed)) {
    return void 0;
  }
  return trimmed;
}
function normalizePricing(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return void 0;
  }
  const raw2 = value;
  const input = positiveNumber(raw2.input);
  const output = positiveNumber(raw2.output);
  if (input === void 0 && output === void 0) {
    return void 0;
  }
  return {
    ...input !== void 0 ? { input } : {},
    ...output !== void 0 ? { output } : {}
  };
}
function normalizeModalities(value) {
  if (!Array.isArray(value)) {
    return void 0;
  }
  const modalities = [
    ...new Set(
      value.flatMap((item) => {
        const normalized = typeof item === "string" ? item.trim().toLowerCase() : "";
        return /^[a-z][a-z0-9_-]{0,31}$/.test(normalized) ? [normalized] : [];
      })
    )
  ];
  return modalities.length > 0 ? modalities : void 0;
}
function parseJsonArray(value) {
  if (!value?.trim()) {
    return void 0;
  }
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : void 0;
  } catch {
    return void 0;
  }
}
function stringValue(value) {
  return typeof value === "string" ? value : void 0;
}
function cleanLabel(value) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length <= 80 ? trimmed : void 0;
}
function cleanNote(value) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length <= 160 ? trimmed : void 0;
}
function cleanStatus(value) {
  const trimmed = value?.trim().toLowerCase();
  return trimmed && /^[a-z][a-z0-9_-]{0,31}$/.test(trimmed) ? trimmed : void 0;
}
function optionalBoolean(value) {
  return typeof value === "boolean" ? value : void 0;
}
function optional(key, value) {
  return value === void 0 ? {} : { [key]: value };
}
function positiveInteger(value) {
  const parsed = positiveNumber(value);
  return parsed === void 0 ? void 0 : Math.trunc(parsed);
}
function positiveNumber(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
}

// src/mlclaw-space-runtime/operator-brokers.ts
import { isAbsolute } from "node:path";
import { readFileSync } from "node:fs";

// node_modules/openclaw-unyolo/dist/src/generated/operator-validators.js
var import_formats = __toESM(require_formats(), 1);
var import_equal = __toESM(require_equal(), 1);
var import_ucs2length = __toESM(require_ucs2length(), 1);
var formats = import_formats.default.fullFormats;
var equal = import_equal.default.default ?? import_equal.default;
var ucs2length = import_ucs2length.default.default ?? import_ucs2length.default;
var validateDescriptor = validate20;
var pattern4 = new RegExp("^sha256:[0-9a-f]{64}$", "u");
var func1 = ucs2length;
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  if (errors === _errs0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.api_version === void 0 && (missing0 = "api_version") || data.contract_digest === void 0 && (missing0 = "contract_digest") || data.build_id === void 0 && (missing0 = "build_id")) {
        validate20.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs2 = errors;
        for (const key0 in data) {
          if (!(key0 === "api_version" || key0 === "contract_digest" || key0 === "build_id")) {
            validate20.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs2 === errors) {
          if (data.api_version !== void 0) {
            let data0 = data.api_version;
            const _errs3 = errors;
            if (typeof data0 !== "string") {
              validate20.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/api_version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if ("unyolo.io/operator/v1" !== data0) {
              validate20.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/api_version/const", keyword: "const", params: { allowedValue: "unyolo.io/operator/v1" }, message: "must be equal to constant" }];
              return false;
            }
            var valid1 = _errs3 === errors;
          } else {
            var valid1 = true;
          }
          if (valid1) {
            if (data.contract_digest !== void 0) {
              let data1 = data.contract_digest;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (!pattern4.test(data1)) {
                    validate20.errors = [{ instancePath: instancePath + "/contract_digest", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/contract_digest/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' }];
                    return false;
                  }
                } else {
                  validate20.errors = [{ instancePath: instancePath + "/contract_digest", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/contract_digest/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid1 = _errs5 === errors;
            } else {
              var valid1 = true;
            }
            if (valid1) {
              if (data.build_id !== void 0) {
                let data2 = data.build_id;
                const _errs7 = errors;
                if (errors === _errs7) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 128) {
                      validate20.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/build_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate20.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/build_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate20.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/properties/build_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid1 = _errs7 === errors;
              } else {
                var valid1 = true;
              }
            }
          }
        }
      }
    } else {
      validate20.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Descriptor/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate22(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate22.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  if (errors === _errs0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.status === void 0 && (missing0 = "status") || data.contract_digest === void 0 && (missing0 = "contract_digest") || data.build_id === void 0 && (missing0 = "build_id")) {
        validate22.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs2 = errors;
        for (const key0 in data) {
          if (!(key0 === "status" || key0 === "contract_digest" || key0 === "build_id")) {
            validate22.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs2 === errors) {
          if (data.status !== void 0) {
            let data0 = data.status;
            const _errs3 = errors;
            if (errors === _errs3) {
              if (typeof data0 === "string") {
                if (func1(data0) > 128) {
                  validate22.errors = [{ instancePath: instancePath + "/status", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/status/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate22.errors = [{ instancePath: instancePath + "/status", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/status/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate22.errors = [{ instancePath: instancePath + "/status", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/status/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid1 = _errs3 === errors;
          } else {
            var valid1 = true;
          }
          if (valid1) {
            if (data.contract_digest !== void 0) {
              let data1 = data.contract_digest;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (!pattern4.test(data1)) {
                    validate22.errors = [{ instancePath: instancePath + "/contract_digest", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/contract_digest/pattern", keyword: "pattern", params: { pattern: "^sha256:[0-9a-f]{64}$" }, message: 'must match pattern "^sha256:[0-9a-f]{64}$"' }];
                    return false;
                  }
                } else {
                  validate22.errors = [{ instancePath: instancePath + "/contract_digest", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/contract_digest/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid1 = _errs5 === errors;
            } else {
              var valid1 = true;
            }
            if (valid1) {
              if (data.build_id !== void 0) {
                let data2 = data.build_id;
                const _errs7 = errors;
                if (errors === _errs7) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 128) {
                      validate22.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/build_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate22.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/build_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate22.errors = [{ instancePath: instancePath + "/build_id", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/properties/build_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid1 = _errs7 === errors;
              } else {
                var valid1 = true;
              }
            }
          }
        }
      }
    } else {
      validate22.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/Health/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate22.errors = vErrors;
  return errors === 0;
}
validate22.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var validateBrokerRequest = validate23;
var schema37 = { "type": "object", "additionalProperties": false, "required": ["id", "revision", "requester", "operation", "mode", "status", "requested_at", "requested_duration_seconds", "requested_max_uses", "granted_max_uses", "used_count", "presentation", "allowed_actions"], "properties": { "id": { "type": "string", "minLength": 1, "maxLength": 128 }, "revision": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 }, "requester": { "type": "string", "minLength": 1, "maxLength": 80 }, "operation": { "type": "string", "minLength": 1, "maxLength": 500 }, "mode": { "$ref": "#/$defs/GrantMode" }, "status": { "$ref": "#/$defs/Status" }, "requested_at": { "type": "string", "format": "date-time" }, "pending_expires_at": { "type": "string", "format": "date-time" }, "active_expires_at": { "type": "string", "format": "date-time" }, "requested_duration_seconds": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 }, "requested_max_uses": { "type": ["integer", "null"], "minimum": 1, "maximum": 1e6 }, "granted_max_uses": { "type": ["integer", "null"], "minimum": 1, "maximum": 1e6 }, "used_count": { "type": "integer", "minimum": 0, "maximum": 9007199254740991 }, "request_reason": { "type": "string", "maxLength": 2e3 }, "decided_at": { "type": "string", "format": "date-time" }, "decided_by": { "type": "string", "maxLength": 200 }, "decided_on_behalf_of": { "type": "string", "maxLength": 200 }, "failure_code": { "type": "string", "enum": ["invalid_notification", "plan_unavailable", "plan_mismatch", "credential_changed", "credential_insufficient"] }, "failure_reference": { "type": "string", "minLength": 1, "maxLength": 128 }, "failed_at": { "type": "string", "format": "date-time" }, "presentation": { "$ref": "#/$defs/Presentation" }, "presentation_unavailable": { "type": "boolean" }, "allowed_actions": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/$defs/Action" } }, "approval_bounds": { "$ref": "#/$defs/ApprovalBounds" } } };
var schema38 = { "type": "string", "enum": ["window", "execution"] };
var schema39 = { "type": "string", "enum": ["pending", "active", "denied", "failed", "canceled", "expired", "consumed", "revoked"] };
var schema45 = { "type": "string", "enum": ["approve", "deny", "revoke"] };
var schema46 = { "type": "object", "additionalProperties": false, "required": ["max_duration_seconds", "max_uses"], "properties": { "max_duration_seconds": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 }, "max_uses": { "type": ["integer", "null"], "minimum": 1, "maximum": 1e6 } } };
var func7 = Object.prototype.hasOwnProperty;
var func0 = equal;
var formats0 = formats["date-time"];
var schema41 = { "type": "string", "enum": ["unknown", "low", "medium", "high", "critical"] };
function validate26(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate26.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.severity === void 0 && (missing0 = "severity") || data.text === void 0 && (missing0 = "text")) {
        validate26.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "severity" || key0 === "text")) {
            validate26.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.severity !== void 0) {
            let data0 = data.severity;
            const _errs2 = errors;
            if (typeof data0 !== "string") {
              validate26.errors = [{ instancePath: instancePath + "/severity", schemaPath: "#/$defs/PresentationRisk/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if (!(data0 === "unknown" || data0 === "low" || data0 === "medium" || data0 === "high" || data0 === "critical")) {
              validate26.errors = [{ instancePath: instancePath + "/severity", schemaPath: "#/$defs/PresentationRisk/enum", keyword: "enum", params: { allowedValues: schema41.enum }, message: "must be equal to one of the allowed values" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.text !== void 0) {
              let data1 = data.text;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 500) {
                    validate26.errors = [{ instancePath: instancePath + "/text", schemaPath: "#/properties/text/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate26.errors = [{ instancePath: instancePath + "/text", schemaPath: "#/properties/text/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate26.errors = [{ instancePath: instancePath + "/text", schemaPath: "#/properties/text/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs5 === errors;
            } else {
              var valid0 = true;
            }
          }
        }
      }
    } else {
      validate26.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate26.errors = vErrors;
  return errors === 0;
}
validate26.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate25(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate25.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.risk === void 0 && (missing0 = "risk") || data.title === void 0 && (missing0 = "title") || data.target === void 0 && (missing0 = "target")) {
        validate25.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "risk" || key0 === "title" || key0 === "summary" || key0 === "target" || key0 === "facts" || key0 === "warnings" || key0 === "plan_hash")) {
            validate25.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.risk !== void 0) {
            let data0 = data.risk;
            const _errs2 = errors;
            if (typeof data0 !== "string") {
              validate25.errors = [{ instancePath: instancePath + "/risk", schemaPath: "#/$defs/PresentationRisk/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if (!(data0 === "unknown" || data0 === "low" || data0 === "medium" || data0 === "high" || data0 === "critical")) {
              validate25.errors = [{ instancePath: instancePath + "/risk", schemaPath: "#/$defs/PresentationRisk/enum", keyword: "enum", params: { allowedValues: schema41.enum }, message: "must be equal to one of the allowed values" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.title !== void 0) {
              let data1 = data.title;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 200) {
                    validate25.errors = [{ instancePath: instancePath + "/title", schemaPath: "#/properties/title/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate25.errors = [{ instancePath: instancePath + "/title", schemaPath: "#/properties/title/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate25.errors = [{ instancePath: instancePath + "/title", schemaPath: "#/properties/title/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs5 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.summary !== void 0) {
                let data2 = data.summary;
                const _errs7 = errors;
                if (errors === _errs7) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 2e3) {
                      validate25.errors = [{ instancePath: instancePath + "/summary", schemaPath: "#/properties/summary/maxLength", keyword: "maxLength", params: { limit: 2e3 }, message: "must NOT have more than 2000 characters" }];
                      return false;
                    }
                  } else {
                    validate25.errors = [{ instancePath: instancePath + "/summary", schemaPath: "#/properties/summary/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs7 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.target !== void 0) {
                  let data3 = data.target;
                  const _errs9 = errors;
                  if (errors === _errs9) {
                    if (typeof data3 === "string") {
                      if (func1(data3) > 500) {
                        validate25.errors = [{ instancePath: instancePath + "/target", schemaPath: "#/properties/target/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                        return false;
                      } else {
                        if (func1(data3) < 1) {
                          validate25.errors = [{ instancePath: instancePath + "/target", schemaPath: "#/properties/target/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      }
                    } else {
                      validate25.errors = [{ instancePath: instancePath + "/target", schemaPath: "#/properties/target/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs9 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.facts !== void 0) {
                    let data4 = data.facts;
                    const _errs11 = errors;
                    if (errors === _errs11) {
                      if (Array.isArray(data4)) {
                        if (data4.length > 20) {
                          validate25.errors = [{ instancePath: instancePath + "/facts", schemaPath: "#/properties/facts/maxItems", keyword: "maxItems", params: { limit: 20 }, message: "must NOT have more than 20 items" }];
                          return false;
                        } else {
                          var valid2 = true;
                          const len0 = data4.length;
                          for (let i0 = 0; i0 < len0; i0++) {
                            let data5 = data4[i0];
                            const _errs13 = errors;
                            const _errs14 = errors;
                            if (errors === _errs14) {
                              if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                                let missing1;
                                if (data5.label === void 0 && (missing1 = "label") || data5.value === void 0 && (missing1 = "value")) {
                                  validate25.errors = [{ instancePath: instancePath + "/facts/" + i0, schemaPath: "#/$defs/Fact/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                  return false;
                                } else {
                                  const _errs16 = errors;
                                  for (const key1 in data5) {
                                    if (!(key1 === "label" || key1 === "value")) {
                                      validate25.errors = [{ instancePath: instancePath + "/facts/" + i0, schemaPath: "#/$defs/Fact/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                      return false;
                                      break;
                                    }
                                  }
                                  if (_errs16 === errors) {
                                    if (data5.label !== void 0) {
                                      let data6 = data5.label;
                                      const _errs17 = errors;
                                      if (errors === _errs17) {
                                        if (typeof data6 === "string") {
                                          if (func1(data6) > 80) {
                                            validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/label", schemaPath: "#/$defs/Fact/properties/label/maxLength", keyword: "maxLength", params: { limit: 80 }, message: "must NOT have more than 80 characters" }];
                                            return false;
                                          } else {
                                            if (func1(data6) < 1) {
                                              validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/label", schemaPath: "#/$defs/Fact/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                              return false;
                                            }
                                          }
                                        } else {
                                          validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/label", schemaPath: "#/$defs/Fact/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid4 = _errs17 === errors;
                                    } else {
                                      var valid4 = true;
                                    }
                                    if (valid4) {
                                      if (data5.value !== void 0) {
                                        let data7 = data5.value;
                                        const _errs19 = errors;
                                        if (errors === _errs19) {
                                          if (typeof data7 === "string") {
                                            if (func1(data7) > 500) {
                                              validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/value", schemaPath: "#/$defs/Fact/properties/value/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                                              return false;
                                            } else {
                                              if (func1(data7) < 1) {
                                                validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/value", schemaPath: "#/$defs/Fact/properties/value/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                return false;
                                              }
                                            }
                                          } else {
                                            validate25.errors = [{ instancePath: instancePath + "/facts/" + i0 + "/value", schemaPath: "#/$defs/Fact/properties/value/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                            return false;
                                          }
                                        }
                                        var valid4 = _errs19 === errors;
                                      } else {
                                        var valid4 = true;
                                      }
                                    }
                                  }
                                }
                              } else {
                                validate25.errors = [{ instancePath: instancePath + "/facts/" + i0, schemaPath: "#/$defs/Fact/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                return false;
                              }
                            }
                            var valid2 = _errs13 === errors;
                            if (!valid2) {
                              break;
                            }
                          }
                        }
                      } else {
                        validate25.errors = [{ instancePath: instancePath + "/facts", schemaPath: "#/properties/facts/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs11 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.warnings !== void 0) {
                      let data8 = data.warnings;
                      const _errs21 = errors;
                      if (errors === _errs21) {
                        if (Array.isArray(data8)) {
                          if (data8.length > 10) {
                            validate25.errors = [{ instancePath: instancePath + "/warnings", schemaPath: "#/properties/warnings/maxItems", keyword: "maxItems", params: { limit: 10 }, message: "must NOT have more than 10 items" }];
                            return false;
                          } else {
                            var valid5 = true;
                            const len1 = data8.length;
                            for (let i1 = 0; i1 < len1; i1++) {
                              const _errs23 = errors;
                              if (!validate26(data8[i1], { instancePath: instancePath + "/warnings/" + i1, parentData: data8, parentDataProperty: i1, rootData, dynamicAnchors })) {
                                vErrors = vErrors === null ? validate26.errors : vErrors.concat(validate26.errors);
                                errors = vErrors.length;
                              }
                              var valid5 = _errs23 === errors;
                              if (!valid5) {
                                break;
                              }
                            }
                          }
                        } else {
                          validate25.errors = [{ instancePath: instancePath + "/warnings", schemaPath: "#/properties/warnings/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                          return false;
                        }
                      }
                      var valid0 = _errs21 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.plan_hash !== void 0) {
                        let data10 = data.plan_hash;
                        const _errs24 = errors;
                        if (errors === _errs24) {
                          if (typeof data10 === "string") {
                            if (func1(data10) > 128) {
                              validate25.errors = [{ instancePath: instancePath + "/plan_hash", schemaPath: "#/properties/plan_hash/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                              return false;
                            }
                          } else {
                            validate25.errors = [{ instancePath: instancePath + "/plan_hash", schemaPath: "#/properties/plan_hash/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                        var valid0 = _errs24 === errors;
                      } else {
                        var valid0 = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate25.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate25.errors = vErrors;
  return errors === 0;
}
validate25.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate24.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.revision === void 0 && (missing0 = "revision") || data.requester === void 0 && (missing0 = "requester") || data.operation === void 0 && (missing0 = "operation") || data.mode === void 0 && (missing0 = "mode") || data.status === void 0 && (missing0 = "status") || data.requested_at === void 0 && (missing0 = "requested_at") || data.requested_duration_seconds === void 0 && (missing0 = "requested_duration_seconds") || data.requested_max_uses === void 0 && (missing0 = "requested_max_uses") || data.granted_max_uses === void 0 && (missing0 = "granted_max_uses") || data.used_count === void 0 && (missing0 = "used_count") || data.presentation === void 0 && (missing0 = "presentation") || data.allowed_actions === void 0 && (missing0 = "allowed_actions")) {
        validate24.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!func7.call(schema37.properties, key0)) {
            validate24.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.id !== void 0) {
            let data0 = data.id;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (func1(data0) > 128) {
                  validate24.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate24.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate24.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.revision !== void 0) {
              let data1 = data.revision;
              const _errs4 = errors;
              if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
                validate24.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs4) {
                if (typeof data1 == "number" && isFinite(data1)) {
                  if (data1 > 9007199254740991 || isNaN(data1)) {
                    validate24.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                    return false;
                  } else {
                    if (data1 < 1 || isNaN(data1)) {
                      validate24.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                      return false;
                    }
                  }
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.requester !== void 0) {
                let data2 = data.requester;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 80) {
                      validate24.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/maxLength", keyword: "maxLength", params: { limit: 80 }, message: "must NOT have more than 80 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate24.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate24.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.operation !== void 0) {
                  let data3 = data.operation;
                  const _errs8 = errors;
                  if (errors === _errs8) {
                    if (typeof data3 === "string") {
                      if (func1(data3) > 500) {
                        validate24.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                        return false;
                      } else {
                        if (func1(data3) < 1) {
                          validate24.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      }
                    } else {
                      validate24.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.mode !== void 0) {
                    let data4 = data.mode;
                    const _errs10 = errors;
                    if (typeof data4 !== "string") {
                      validate24.errors = [{ instancePath: instancePath + "/mode", schemaPath: "#/$defs/GrantMode/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                    if (!(data4 === "window" || data4 === "execution")) {
                      validate24.errors = [{ instancePath: instancePath + "/mode", schemaPath: "#/$defs/GrantMode/enum", keyword: "enum", params: { allowedValues: schema38.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid0 = _errs10 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.status !== void 0) {
                      let data5 = data.status;
                      const _errs13 = errors;
                      if (typeof data5 !== "string") {
                        validate24.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                      if (!(data5 === "pending" || data5 === "active" || data5 === "denied" || data5 === "failed" || data5 === "canceled" || data5 === "expired" || data5 === "consumed" || data5 === "revoked")) {
                        validate24.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/enum", keyword: "enum", params: { allowedValues: schema39.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                      }
                      var valid0 = _errs13 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.requested_at !== void 0) {
                        let data6 = data.requested_at;
                        const _errs16 = errors;
                        if (errors === _errs16) {
                          if (errors === _errs16) {
                            if (typeof data6 === "string") {
                              if (!formats0.validate(data6)) {
                                validate24.errors = [{ instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                return false;
                              }
                            } else {
                              validate24.errors = [{ instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                          }
                        }
                        var valid0 = _errs16 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.pending_expires_at !== void 0) {
                          let data7 = data.pending_expires_at;
                          const _errs18 = errors;
                          if (errors === _errs18) {
                            if (errors === _errs18) {
                              if (typeof data7 === "string") {
                                if (!formats0.validate(data7)) {
                                  validate24.errors = [{ instancePath: instancePath + "/pending_expires_at", schemaPath: "#/properties/pending_expires_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                  return false;
                                }
                              } else {
                                validate24.errors = [{ instancePath: instancePath + "/pending_expires_at", schemaPath: "#/properties/pending_expires_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                          }
                          var valid0 = _errs18 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.active_expires_at !== void 0) {
                            let data8 = data.active_expires_at;
                            const _errs20 = errors;
                            if (errors === _errs20) {
                              if (errors === _errs20) {
                                if (typeof data8 === "string") {
                                  if (!formats0.validate(data8)) {
                                    validate24.errors = [{ instancePath: instancePath + "/active_expires_at", schemaPath: "#/properties/active_expires_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                    return false;
                                  }
                                } else {
                                  validate24.errors = [{ instancePath: instancePath + "/active_expires_at", schemaPath: "#/properties/active_expires_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                            }
                            var valid0 = _errs20 === errors;
                          } else {
                            var valid0 = true;
                          }
                          if (valid0) {
                            if (data.requested_duration_seconds !== void 0) {
                              let data9 = data.requested_duration_seconds;
                              const _errs22 = errors;
                              if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                                validate24.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                return false;
                              }
                              if (errors === _errs22) {
                                if (typeof data9 == "number" && isFinite(data9)) {
                                  if (data9 > 9007199254740991 || isNaN(data9)) {
                                    validate24.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                    return false;
                                  } else {
                                    if (data9 < 1 || isNaN(data9)) {
                                      validate24.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                      return false;
                                    }
                                  }
                                }
                              }
                              var valid0 = _errs22 === errors;
                            } else {
                              var valid0 = true;
                            }
                            if (valid0) {
                              if (data.requested_max_uses !== void 0) {
                                let data10 = data.requested_max_uses;
                                const _errs24 = errors;
                                if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10)) && data10 !== null) {
                                  validate24.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/type", keyword: "type", params: { type: schema37.properties.requested_max_uses.type }, message: "must be integer,null" }];
                                  return false;
                                }
                                if (errors === _errs24) {
                                  if (typeof data10 == "number" && isFinite(data10)) {
                                    if (data10 > 1e6 || isNaN(data10)) {
                                      validate24.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                      return false;
                                    } else {
                                      if (data10 < 1 || isNaN(data10)) {
                                        validate24.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                        return false;
                                      }
                                    }
                                  }
                                }
                                var valid0 = _errs24 === errors;
                              } else {
                                var valid0 = true;
                              }
                              if (valid0) {
                                if (data.granted_max_uses !== void 0) {
                                  let data11 = data.granted_max_uses;
                                  const _errs26 = errors;
                                  if (!(typeof data11 == "number" && (!(data11 % 1) && !isNaN(data11)) && isFinite(data11)) && data11 !== null) {
                                    validate24.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/type", keyword: "type", params: { type: schema37.properties.granted_max_uses.type }, message: "must be integer,null" }];
                                    return false;
                                  }
                                  if (errors === _errs26) {
                                    if (typeof data11 == "number" && isFinite(data11)) {
                                      if (data11 > 1e6 || isNaN(data11)) {
                                        validate24.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                        return false;
                                      } else {
                                        if (data11 < 1 || isNaN(data11)) {
                                          validate24.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                          return false;
                                        }
                                      }
                                    }
                                  }
                                  var valid0 = _errs26 === errors;
                                } else {
                                  var valid0 = true;
                                }
                                if (valid0) {
                                  if (data.used_count !== void 0) {
                                    let data12 = data.used_count;
                                    const _errs28 = errors;
                                    if (!(typeof data12 == "number" && (!(data12 % 1) && !isNaN(data12)) && isFinite(data12))) {
                                      validate24.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                      return false;
                                    }
                                    if (errors === _errs28) {
                                      if (typeof data12 == "number" && isFinite(data12)) {
                                        if (data12 > 9007199254740991 || isNaN(data12)) {
                                          validate24.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                          return false;
                                        } else {
                                          if (data12 < 0 || isNaN(data12)) {
                                            validate24.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                            return false;
                                          }
                                        }
                                      }
                                    }
                                    var valid0 = _errs28 === errors;
                                  } else {
                                    var valid0 = true;
                                  }
                                  if (valid0) {
                                    if (data.request_reason !== void 0) {
                                      let data13 = data.request_reason;
                                      const _errs30 = errors;
                                      if (errors === _errs30) {
                                        if (typeof data13 === "string") {
                                          if (func1(data13) > 2e3) {
                                            validate24.errors = [{ instancePath: instancePath + "/request_reason", schemaPath: "#/properties/request_reason/maxLength", keyword: "maxLength", params: { limit: 2e3 }, message: "must NOT have more than 2000 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate24.errors = [{ instancePath: instancePath + "/request_reason", schemaPath: "#/properties/request_reason/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid0 = _errs30 === errors;
                                    } else {
                                      var valid0 = true;
                                    }
                                    if (valid0) {
                                      if (data.decided_at !== void 0) {
                                        let data14 = data.decided_at;
                                        const _errs32 = errors;
                                        if (errors === _errs32) {
                                          if (errors === _errs32) {
                                            if (typeof data14 === "string") {
                                              if (!formats0.validate(data14)) {
                                                validate24.errors = [{ instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                                return false;
                                              }
                                            } else {
                                              validate24.errors = [{ instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                        }
                                        var valid0 = _errs32 === errors;
                                      } else {
                                        var valid0 = true;
                                      }
                                      if (valid0) {
                                        if (data.decided_by !== void 0) {
                                          let data15 = data.decided_by;
                                          const _errs34 = errors;
                                          if (errors === _errs34) {
                                            if (typeof data15 === "string") {
                                              if (func1(data15) > 200) {
                                                validate24.errors = [{ instancePath: instancePath + "/decided_by", schemaPath: "#/properties/decided_by/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                                return false;
                                              }
                                            } else {
                                              validate24.errors = [{ instancePath: instancePath + "/decided_by", schemaPath: "#/properties/decided_by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                          var valid0 = _errs34 === errors;
                                        } else {
                                          var valid0 = true;
                                        }
                                        if (valid0) {
                                          if (data.decided_on_behalf_of !== void 0) {
                                            let data16 = data.decided_on_behalf_of;
                                            const _errs36 = errors;
                                            if (errors === _errs36) {
                                              if (typeof data16 === "string") {
                                                if (func1(data16) > 200) {
                                                  validate24.errors = [{ instancePath: instancePath + "/decided_on_behalf_of", schemaPath: "#/properties/decided_on_behalf_of/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate24.errors = [{ instancePath: instancePath + "/decided_on_behalf_of", schemaPath: "#/properties/decided_on_behalf_of/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid0 = _errs36 === errors;
                                          } else {
                                            var valid0 = true;
                                          }
                                          if (valid0) {
                                            if (data.failure_code !== void 0) {
                                              let data17 = data.failure_code;
                                              const _errs38 = errors;
                                              if (typeof data17 !== "string") {
                                                validate24.errors = [{ instancePath: instancePath + "/failure_code", schemaPath: "#/properties/failure_code/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                              if (!(data17 === "invalid_notification" || data17 === "plan_unavailable" || data17 === "plan_mismatch" || data17 === "credential_changed" || data17 === "credential_insufficient")) {
                                                validate24.errors = [{ instancePath: instancePath + "/failure_code", schemaPath: "#/properties/failure_code/enum", keyword: "enum", params: { allowedValues: schema37.properties.failure_code.enum }, message: "must be equal to one of the allowed values" }];
                                                return false;
                                              }
                                              var valid0 = _errs38 === errors;
                                            } else {
                                              var valid0 = true;
                                            }
                                            if (valid0) {
                                              if (data.failure_reference !== void 0) {
                                                let data18 = data.failure_reference;
                                                const _errs40 = errors;
                                                if (errors === _errs40) {
                                                  if (typeof data18 === "string") {
                                                    if (func1(data18) > 128) {
                                                      validate24.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                                      return false;
                                                    } else {
                                                      if (func1(data18) < 1) {
                                                        validate24.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                        return false;
                                                      }
                                                    }
                                                  } else {
                                                    validate24.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                }
                                                var valid0 = _errs40 === errors;
                                              } else {
                                                var valid0 = true;
                                              }
                                              if (valid0) {
                                                if (data.failed_at !== void 0) {
                                                  let data19 = data.failed_at;
                                                  const _errs42 = errors;
                                                  if (errors === _errs42) {
                                                    if (errors === _errs42) {
                                                      if (typeof data19 === "string") {
                                                        if (!formats0.validate(data19)) {
                                                          validate24.errors = [{ instancePath: instancePath + "/failed_at", schemaPath: "#/properties/failed_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                                          return false;
                                                        }
                                                      } else {
                                                        validate24.errors = [{ instancePath: instancePath + "/failed_at", schemaPath: "#/properties/failed_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                      }
                                                    }
                                                  }
                                                  var valid0 = _errs42 === errors;
                                                } else {
                                                  var valid0 = true;
                                                }
                                                if (valid0) {
                                                  if (data.presentation !== void 0) {
                                                    const _errs44 = errors;
                                                    if (!validate25(data.presentation, { instancePath: instancePath + "/presentation", parentData: data, parentDataProperty: "presentation", rootData, dynamicAnchors })) {
                                                      vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var valid0 = _errs44 === errors;
                                                  } else {
                                                    var valid0 = true;
                                                  }
                                                  if (valid0) {
                                                    if (data.presentation_unavailable !== void 0) {
                                                      const _errs45 = errors;
                                                      if (typeof data.presentation_unavailable !== "boolean") {
                                                        validate24.errors = [{ instancePath: instancePath + "/presentation_unavailable", schemaPath: "#/properties/presentation_unavailable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                        return false;
                                                      }
                                                      var valid0 = _errs45 === errors;
                                                    } else {
                                                      var valid0 = true;
                                                    }
                                                    if (valid0) {
                                                      if (data.allowed_actions !== void 0) {
                                                        let data22 = data.allowed_actions;
                                                        const _errs47 = errors;
                                                        if (errors === _errs47) {
                                                          if (Array.isArray(data22)) {
                                                            var valid3 = true;
                                                            const len0 = data22.length;
                                                            for (let i0 = 0; i0 < len0; i0++) {
                                                              let data23 = data22[i0];
                                                              const _errs49 = errors;
                                                              if (typeof data23 !== "string") {
                                                                validate24.errors = [{ instancePath: instancePath + "/allowed_actions/" + i0, schemaPath: "#/$defs/Action/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                              }
                                                              if (!(data23 === "approve" || data23 === "deny" || data23 === "revoke")) {
                                                                validate24.errors = [{ instancePath: instancePath + "/allowed_actions/" + i0, schemaPath: "#/$defs/Action/enum", keyword: "enum", params: { allowedValues: schema45.enum }, message: "must be equal to one of the allowed values" }];
                                                                return false;
                                                              }
                                                              var valid3 = _errs49 === errors;
                                                              if (!valid3) {
                                                                break;
                                                              }
                                                            }
                                                            if (valid3) {
                                                              let i1 = data22.length;
                                                              let j0;
                                                              if (i1 > 1) {
                                                                outer0: for (; i1--; ) {
                                                                  for (j0 = i1; j0--; ) {
                                                                    if (func0(data22[i1], data22[j0])) {
                                                                      validate24.errors = [{ instancePath: instancePath + "/allowed_actions", schemaPath: "#/properties/allowed_actions/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                                                      return false;
                                                                      break outer0;
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          } else {
                                                            validate24.errors = [{ instancePath: instancePath + "/allowed_actions", schemaPath: "#/properties/allowed_actions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                            return false;
                                                          }
                                                        }
                                                        var valid0 = _errs47 === errors;
                                                      } else {
                                                        var valid0 = true;
                                                      }
                                                      if (valid0) {
                                                        if (data.approval_bounds !== void 0) {
                                                          let data24 = data.approval_bounds;
                                                          const _errs52 = errors;
                                                          const _errs53 = errors;
                                                          if (errors === _errs53) {
                                                            if (data24 && typeof data24 == "object" && !Array.isArray(data24)) {
                                                              let missing1;
                                                              if (data24.max_duration_seconds === void 0 && (missing1 = "max_duration_seconds") || data24.max_uses === void 0 && (missing1 = "max_uses")) {
                                                                validate24.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                                                return false;
                                                              } else {
                                                                const _errs55 = errors;
                                                                for (const key1 in data24) {
                                                                  if (!(key1 === "max_duration_seconds" || key1 === "max_uses")) {
                                                                    validate24.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                                                    return false;
                                                                    break;
                                                                  }
                                                                }
                                                                if (_errs55 === errors) {
                                                                  if (data24.max_duration_seconds !== void 0) {
                                                                    let data25 = data24.max_duration_seconds;
                                                                    const _errs56 = errors;
                                                                    if (!(typeof data25 == "number" && (!(data25 % 1) && !isNaN(data25)) && isFinite(data25))) {
                                                                      validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                      return false;
                                                                    }
                                                                    if (errors === _errs56) {
                                                                      if (typeof data25 == "number" && isFinite(data25)) {
                                                                        if (data25 > 9007199254740991 || isNaN(data25)) {
                                                                          validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                                                          return false;
                                                                        } else {
                                                                          if (data25 < 1 || isNaN(data25)) {
                                                                            validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                                                            return false;
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                    var valid7 = _errs56 === errors;
                                                                  } else {
                                                                    var valid7 = true;
                                                                  }
                                                                  if (valid7) {
                                                                    if (data24.max_uses !== void 0) {
                                                                      let data26 = data24.max_uses;
                                                                      const _errs58 = errors;
                                                                      if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)) && isFinite(data26)) && data26 !== null) {
                                                                        validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/type", keyword: "type", params: { type: schema46.properties.max_uses.type }, message: "must be integer,null" }];
                                                                        return false;
                                                                      }
                                                                      if (errors === _errs58) {
                                                                        if (typeof data26 == "number" && isFinite(data26)) {
                                                                          if (data26 > 1e6 || isNaN(data26)) {
                                                                            validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                                                            return false;
                                                                          } else {
                                                                            if (data26 < 1 || isNaN(data26)) {
                                                                              validate24.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                                                              return false;
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                      var valid7 = _errs58 === errors;
                                                                    } else {
                                                                      var valid7 = true;
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            } else {
                                                              validate24.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                              return false;
                                                            }
                                                          }
                                                          var valid0 = _errs52 === errors;
                                                        } else {
                                                          var valid0 = true;
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate24.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate24.errors = vErrors;
  return errors === 0;
}
validate24.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate23.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate24(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
    errors = vErrors.length;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var validateRequestPage = validate30;
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate32.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.id === void 0 && (missing0 = "id") || data.revision === void 0 && (missing0 = "revision") || data.requester === void 0 && (missing0 = "requester") || data.operation === void 0 && (missing0 = "operation") || data.mode === void 0 && (missing0 = "mode") || data.status === void 0 && (missing0 = "status") || data.requested_at === void 0 && (missing0 = "requested_at") || data.requested_duration_seconds === void 0 && (missing0 = "requested_duration_seconds") || data.requested_max_uses === void 0 && (missing0 = "requested_max_uses") || data.granted_max_uses === void 0 && (missing0 = "granted_max_uses") || data.used_count === void 0 && (missing0 = "used_count") || data.presentation === void 0 && (missing0 = "presentation") || data.allowed_actions === void 0 && (missing0 = "allowed_actions")) {
        validate32.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!func7.call(schema37.properties, key0)) {
            validate32.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.id !== void 0) {
            let data0 = data.id;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (func1(data0) > 128) {
                  validate32.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate32.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate32.errors = [{ instancePath: instancePath + "/id", schemaPath: "#/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.revision !== void 0) {
              let data1 = data.revision;
              const _errs4 = errors;
              if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
                validate32.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                return false;
              }
              if (errors === _errs4) {
                if (typeof data1 == "number" && isFinite(data1)) {
                  if (data1 > 9007199254740991 || isNaN(data1)) {
                    validate32.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                    return false;
                  } else {
                    if (data1 < 1 || isNaN(data1)) {
                      validate32.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                      return false;
                    }
                  }
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.requester !== void 0) {
                let data2 = data.requester;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 80) {
                      validate32.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/maxLength", keyword: "maxLength", params: { limit: 80 }, message: "must NOT have more than 80 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate32.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate32.errors = [{ instancePath: instancePath + "/requester", schemaPath: "#/properties/requester/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.operation !== void 0) {
                  let data3 = data.operation;
                  const _errs8 = errors;
                  if (errors === _errs8) {
                    if (typeof data3 === "string") {
                      if (func1(data3) > 500) {
                        validate32.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                        return false;
                      } else {
                        if (func1(data3) < 1) {
                          validate32.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                          return false;
                        }
                      }
                    } else {
                      validate32.errors = [{ instancePath: instancePath + "/operation", schemaPath: "#/properties/operation/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.mode !== void 0) {
                    let data4 = data.mode;
                    const _errs10 = errors;
                    if (typeof data4 !== "string") {
                      validate32.errors = [{ instancePath: instancePath + "/mode", schemaPath: "#/$defs/GrantMode/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                    if (!(data4 === "window" || data4 === "execution")) {
                      validate32.errors = [{ instancePath: instancePath + "/mode", schemaPath: "#/$defs/GrantMode/enum", keyword: "enum", params: { allowedValues: schema38.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid0 = _errs10 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.status !== void 0) {
                      let data5 = data.status;
                      const _errs13 = errors;
                      if (typeof data5 !== "string") {
                        validate32.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                      if (!(data5 === "pending" || data5 === "active" || data5 === "denied" || data5 === "failed" || data5 === "canceled" || data5 === "expired" || data5 === "consumed" || data5 === "revoked")) {
                        validate32.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/enum", keyword: "enum", params: { allowedValues: schema39.enum }, message: "must be equal to one of the allowed values" }];
                        return false;
                      }
                      var valid0 = _errs13 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.requested_at !== void 0) {
                        let data6 = data.requested_at;
                        const _errs16 = errors;
                        if (errors === _errs16) {
                          if (errors === _errs16) {
                            if (typeof data6 === "string") {
                              if (!formats0.validate(data6)) {
                                validate32.errors = [{ instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                return false;
                              }
                            } else {
                              validate32.errors = [{ instancePath: instancePath + "/requested_at", schemaPath: "#/properties/requested_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                              return false;
                            }
                          }
                        }
                        var valid0 = _errs16 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.pending_expires_at !== void 0) {
                          let data7 = data.pending_expires_at;
                          const _errs18 = errors;
                          if (errors === _errs18) {
                            if (errors === _errs18) {
                              if (typeof data7 === "string") {
                                if (!formats0.validate(data7)) {
                                  validate32.errors = [{ instancePath: instancePath + "/pending_expires_at", schemaPath: "#/properties/pending_expires_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                  return false;
                                }
                              } else {
                                validate32.errors = [{ instancePath: instancePath + "/pending_expires_at", schemaPath: "#/properties/pending_expires_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                return false;
                              }
                            }
                          }
                          var valid0 = _errs18 === errors;
                        } else {
                          var valid0 = true;
                        }
                        if (valid0) {
                          if (data.active_expires_at !== void 0) {
                            let data8 = data.active_expires_at;
                            const _errs20 = errors;
                            if (errors === _errs20) {
                              if (errors === _errs20) {
                                if (typeof data8 === "string") {
                                  if (!formats0.validate(data8)) {
                                    validate32.errors = [{ instancePath: instancePath + "/active_expires_at", schemaPath: "#/properties/active_expires_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                    return false;
                                  }
                                } else {
                                  validate32.errors = [{ instancePath: instancePath + "/active_expires_at", schemaPath: "#/properties/active_expires_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                  return false;
                                }
                              }
                            }
                            var valid0 = _errs20 === errors;
                          } else {
                            var valid0 = true;
                          }
                          if (valid0) {
                            if (data.requested_duration_seconds !== void 0) {
                              let data9 = data.requested_duration_seconds;
                              const _errs22 = errors;
                              if (!(typeof data9 == "number" && (!(data9 % 1) && !isNaN(data9)) && isFinite(data9))) {
                                validate32.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                return false;
                              }
                              if (errors === _errs22) {
                                if (typeof data9 == "number" && isFinite(data9)) {
                                  if (data9 > 9007199254740991 || isNaN(data9)) {
                                    validate32.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                    return false;
                                  } else {
                                    if (data9 < 1 || isNaN(data9)) {
                                      validate32.errors = [{ instancePath: instancePath + "/requested_duration_seconds", schemaPath: "#/properties/requested_duration_seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                      return false;
                                    }
                                  }
                                }
                              }
                              var valid0 = _errs22 === errors;
                            } else {
                              var valid0 = true;
                            }
                            if (valid0) {
                              if (data.requested_max_uses !== void 0) {
                                let data10 = data.requested_max_uses;
                                const _errs24 = errors;
                                if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10)) && data10 !== null) {
                                  validate32.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/type", keyword: "type", params: { type: schema37.properties.requested_max_uses.type }, message: "must be integer,null" }];
                                  return false;
                                }
                                if (errors === _errs24) {
                                  if (typeof data10 == "number" && isFinite(data10)) {
                                    if (data10 > 1e6 || isNaN(data10)) {
                                      validate32.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                      return false;
                                    } else {
                                      if (data10 < 1 || isNaN(data10)) {
                                        validate32.errors = [{ instancePath: instancePath + "/requested_max_uses", schemaPath: "#/properties/requested_max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                        return false;
                                      }
                                    }
                                  }
                                }
                                var valid0 = _errs24 === errors;
                              } else {
                                var valid0 = true;
                              }
                              if (valid0) {
                                if (data.granted_max_uses !== void 0) {
                                  let data11 = data.granted_max_uses;
                                  const _errs26 = errors;
                                  if (!(typeof data11 == "number" && (!(data11 % 1) && !isNaN(data11)) && isFinite(data11)) && data11 !== null) {
                                    validate32.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/type", keyword: "type", params: { type: schema37.properties.granted_max_uses.type }, message: "must be integer,null" }];
                                    return false;
                                  }
                                  if (errors === _errs26) {
                                    if (typeof data11 == "number" && isFinite(data11)) {
                                      if (data11 > 1e6 || isNaN(data11)) {
                                        validate32.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                        return false;
                                      } else {
                                        if (data11 < 1 || isNaN(data11)) {
                                          validate32.errors = [{ instancePath: instancePath + "/granted_max_uses", schemaPath: "#/properties/granted_max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                          return false;
                                        }
                                      }
                                    }
                                  }
                                  var valid0 = _errs26 === errors;
                                } else {
                                  var valid0 = true;
                                }
                                if (valid0) {
                                  if (data.used_count !== void 0) {
                                    let data12 = data.used_count;
                                    const _errs28 = errors;
                                    if (!(typeof data12 == "number" && (!(data12 % 1) && !isNaN(data12)) && isFinite(data12))) {
                                      validate32.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                      return false;
                                    }
                                    if (errors === _errs28) {
                                      if (typeof data12 == "number" && isFinite(data12)) {
                                        if (data12 > 9007199254740991 || isNaN(data12)) {
                                          validate32.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                          return false;
                                        } else {
                                          if (data12 < 0 || isNaN(data12)) {
                                            validate32.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                            return false;
                                          }
                                        }
                                      }
                                    }
                                    var valid0 = _errs28 === errors;
                                  } else {
                                    var valid0 = true;
                                  }
                                  if (valid0) {
                                    if (data.request_reason !== void 0) {
                                      let data13 = data.request_reason;
                                      const _errs30 = errors;
                                      if (errors === _errs30) {
                                        if (typeof data13 === "string") {
                                          if (func1(data13) > 2e3) {
                                            validate32.errors = [{ instancePath: instancePath + "/request_reason", schemaPath: "#/properties/request_reason/maxLength", keyword: "maxLength", params: { limit: 2e3 }, message: "must NOT have more than 2000 characters" }];
                                            return false;
                                          }
                                        } else {
                                          validate32.errors = [{ instancePath: instancePath + "/request_reason", schemaPath: "#/properties/request_reason/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid0 = _errs30 === errors;
                                    } else {
                                      var valid0 = true;
                                    }
                                    if (valid0) {
                                      if (data.decided_at !== void 0) {
                                        let data14 = data.decided_at;
                                        const _errs32 = errors;
                                        if (errors === _errs32) {
                                          if (errors === _errs32) {
                                            if (typeof data14 === "string") {
                                              if (!formats0.validate(data14)) {
                                                validate32.errors = [{ instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                                return false;
                                              }
                                            } else {
                                              validate32.errors = [{ instancePath: instancePath + "/decided_at", schemaPath: "#/properties/decided_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                        }
                                        var valid0 = _errs32 === errors;
                                      } else {
                                        var valid0 = true;
                                      }
                                      if (valid0) {
                                        if (data.decided_by !== void 0) {
                                          let data15 = data.decided_by;
                                          const _errs34 = errors;
                                          if (errors === _errs34) {
                                            if (typeof data15 === "string") {
                                              if (func1(data15) > 200) {
                                                validate32.errors = [{ instancePath: instancePath + "/decided_by", schemaPath: "#/properties/decided_by/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                                return false;
                                              }
                                            } else {
                                              validate32.errors = [{ instancePath: instancePath + "/decided_by", schemaPath: "#/properties/decided_by/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                              return false;
                                            }
                                          }
                                          var valid0 = _errs34 === errors;
                                        } else {
                                          var valid0 = true;
                                        }
                                        if (valid0) {
                                          if (data.decided_on_behalf_of !== void 0) {
                                            let data16 = data.decided_on_behalf_of;
                                            const _errs36 = errors;
                                            if (errors === _errs36) {
                                              if (typeof data16 === "string") {
                                                if (func1(data16) > 200) {
                                                  validate32.errors = [{ instancePath: instancePath + "/decided_on_behalf_of", schemaPath: "#/properties/decided_on_behalf_of/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate32.errors = [{ instancePath: instancePath + "/decided_on_behalf_of", schemaPath: "#/properties/decided_on_behalf_of/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid0 = _errs36 === errors;
                                          } else {
                                            var valid0 = true;
                                          }
                                          if (valid0) {
                                            if (data.failure_code !== void 0) {
                                              let data17 = data.failure_code;
                                              const _errs38 = errors;
                                              if (typeof data17 !== "string") {
                                                validate32.errors = [{ instancePath: instancePath + "/failure_code", schemaPath: "#/properties/failure_code/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                              if (!(data17 === "invalid_notification" || data17 === "plan_unavailable" || data17 === "plan_mismatch" || data17 === "credential_changed" || data17 === "credential_insufficient")) {
                                                validate32.errors = [{ instancePath: instancePath + "/failure_code", schemaPath: "#/properties/failure_code/enum", keyword: "enum", params: { allowedValues: schema37.properties.failure_code.enum }, message: "must be equal to one of the allowed values" }];
                                                return false;
                                              }
                                              var valid0 = _errs38 === errors;
                                            } else {
                                              var valid0 = true;
                                            }
                                            if (valid0) {
                                              if (data.failure_reference !== void 0) {
                                                let data18 = data.failure_reference;
                                                const _errs40 = errors;
                                                if (errors === _errs40) {
                                                  if (typeof data18 === "string") {
                                                    if (func1(data18) > 128) {
                                                      validate32.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                                      return false;
                                                    } else {
                                                      if (func1(data18) < 1) {
                                                        validate32.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                                        return false;
                                                      }
                                                    }
                                                  } else {
                                                    validate32.errors = [{ instancePath: instancePath + "/failure_reference", schemaPath: "#/properties/failure_reference/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                }
                                                var valid0 = _errs40 === errors;
                                              } else {
                                                var valid0 = true;
                                              }
                                              if (valid0) {
                                                if (data.failed_at !== void 0) {
                                                  let data19 = data.failed_at;
                                                  const _errs42 = errors;
                                                  if (errors === _errs42) {
                                                    if (errors === _errs42) {
                                                      if (typeof data19 === "string") {
                                                        if (!formats0.validate(data19)) {
                                                          validate32.errors = [{ instancePath: instancePath + "/failed_at", schemaPath: "#/properties/failed_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                                          return false;
                                                        }
                                                      } else {
                                                        validate32.errors = [{ instancePath: instancePath + "/failed_at", schemaPath: "#/properties/failed_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                        return false;
                                                      }
                                                    }
                                                  }
                                                  var valid0 = _errs42 === errors;
                                                } else {
                                                  var valid0 = true;
                                                }
                                                if (valid0) {
                                                  if (data.presentation !== void 0) {
                                                    const _errs44 = errors;
                                                    if (!validate25(data.presentation, { instancePath: instancePath + "/presentation", parentData: data, parentDataProperty: "presentation", rootData, dynamicAnchors })) {
                                                      vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
                                                      errors = vErrors.length;
                                                    }
                                                    var valid0 = _errs44 === errors;
                                                  } else {
                                                    var valid0 = true;
                                                  }
                                                  if (valid0) {
                                                    if (data.presentation_unavailable !== void 0) {
                                                      const _errs45 = errors;
                                                      if (typeof data.presentation_unavailable !== "boolean") {
                                                        validate32.errors = [{ instancePath: instancePath + "/presentation_unavailable", schemaPath: "#/properties/presentation_unavailable/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                                        return false;
                                                      }
                                                      var valid0 = _errs45 === errors;
                                                    } else {
                                                      var valid0 = true;
                                                    }
                                                    if (valid0) {
                                                      if (data.allowed_actions !== void 0) {
                                                        let data22 = data.allowed_actions;
                                                        const _errs47 = errors;
                                                        if (errors === _errs47) {
                                                          if (Array.isArray(data22)) {
                                                            var valid3 = true;
                                                            const len0 = data22.length;
                                                            for (let i0 = 0; i0 < len0; i0++) {
                                                              let data23 = data22[i0];
                                                              const _errs49 = errors;
                                                              if (typeof data23 !== "string") {
                                                                validate32.errors = [{ instancePath: instancePath + "/allowed_actions/" + i0, schemaPath: "#/$defs/Action/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                                return false;
                                                              }
                                                              if (!(data23 === "approve" || data23 === "deny" || data23 === "revoke")) {
                                                                validate32.errors = [{ instancePath: instancePath + "/allowed_actions/" + i0, schemaPath: "#/$defs/Action/enum", keyword: "enum", params: { allowedValues: schema45.enum }, message: "must be equal to one of the allowed values" }];
                                                                return false;
                                                              }
                                                              var valid3 = _errs49 === errors;
                                                              if (!valid3) {
                                                                break;
                                                              }
                                                            }
                                                            if (valid3) {
                                                              let i1 = data22.length;
                                                              let j0;
                                                              if (i1 > 1) {
                                                                outer0: for (; i1--; ) {
                                                                  for (j0 = i1; j0--; ) {
                                                                    if (func0(data22[i1], data22[j0])) {
                                                                      validate32.errors = [{ instancePath: instancePath + "/allowed_actions", schemaPath: "#/properties/allowed_actions/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                                                      return false;
                                                                      break outer0;
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          } else {
                                                            validate32.errors = [{ instancePath: instancePath + "/allowed_actions", schemaPath: "#/properties/allowed_actions/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                                            return false;
                                                          }
                                                        }
                                                        var valid0 = _errs47 === errors;
                                                      } else {
                                                        var valid0 = true;
                                                      }
                                                      if (valid0) {
                                                        if (data.approval_bounds !== void 0) {
                                                          let data24 = data.approval_bounds;
                                                          const _errs52 = errors;
                                                          const _errs53 = errors;
                                                          if (errors === _errs53) {
                                                            if (data24 && typeof data24 == "object" && !Array.isArray(data24)) {
                                                              let missing1;
                                                              if (data24.max_duration_seconds === void 0 && (missing1 = "max_duration_seconds") || data24.max_uses === void 0 && (missing1 = "max_uses")) {
                                                                validate32.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                                                return false;
                                                              } else {
                                                                const _errs55 = errors;
                                                                for (const key1 in data24) {
                                                                  if (!(key1 === "max_duration_seconds" || key1 === "max_uses")) {
                                                                    validate32.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                                                    return false;
                                                                    break;
                                                                  }
                                                                }
                                                                if (_errs55 === errors) {
                                                                  if (data24.max_duration_seconds !== void 0) {
                                                                    let data25 = data24.max_duration_seconds;
                                                                    const _errs56 = errors;
                                                                    if (!(typeof data25 == "number" && (!(data25 % 1) && !isNaN(data25)) && isFinite(data25))) {
                                                                      validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                                                                      return false;
                                                                    }
                                                                    if (errors === _errs56) {
                                                                      if (typeof data25 == "number" && isFinite(data25)) {
                                                                        if (data25 > 9007199254740991 || isNaN(data25)) {
                                                                          validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                                                                          return false;
                                                                        } else {
                                                                          if (data25 < 1 || isNaN(data25)) {
                                                                            validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_duration_seconds", schemaPath: "#/$defs/ApprovalBounds/properties/max_duration_seconds/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                                                            return false;
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                    var valid7 = _errs56 === errors;
                                                                  } else {
                                                                    var valid7 = true;
                                                                  }
                                                                  if (valid7) {
                                                                    if (data24.max_uses !== void 0) {
                                                                      let data26 = data24.max_uses;
                                                                      const _errs58 = errors;
                                                                      if (!(typeof data26 == "number" && (!(data26 % 1) && !isNaN(data26)) && isFinite(data26)) && data26 !== null) {
                                                                        validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/type", keyword: "type", params: { type: schema46.properties.max_uses.type }, message: "must be integer,null" }];
                                                                        return false;
                                                                      }
                                                                      if (errors === _errs58) {
                                                                        if (typeof data26 == "number" && isFinite(data26)) {
                                                                          if (data26 > 1e6 || isNaN(data26)) {
                                                                            validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/maximum", keyword: "maximum", params: { comparison: "<=", limit: 1e6 }, message: "must be <= 1000000" }];
                                                                            return false;
                                                                          } else {
                                                                            if (data26 < 1 || isNaN(data26)) {
                                                                              validate32.errors = [{ instancePath: instancePath + "/approval_bounds/max_uses", schemaPath: "#/$defs/ApprovalBounds/properties/max_uses/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                                                                              return false;
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                      var valid7 = _errs58 === errors;
                                                                    } else {
                                                                      var valid7 = true;
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            } else {
                                                              validate32.errors = [{ instancePath: instancePath + "/approval_bounds", schemaPath: "#/$defs/ApprovalBounds/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                                              return false;
                                                            }
                                                          }
                                                          var valid0 = _errs52 === errors;
                                                        } else {
                                                          var valid0 = true;
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate32.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate32.errors = vErrors;
  return errors === 0;
}
validate32.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate31(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate31.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.requests === void 0 && (missing0 = "requests")) {
        validate31.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "requests" || key0 === "next_cursor" || key0 === "event_cursor")) {
            validate31.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.requests !== void 0) {
            let data0 = data.requests;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (Array.isArray(data0)) {
                if (data0.length > 100) {
                  validate31.errors = [{ instancePath: instancePath + "/requests", schemaPath: "#/properties/requests/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" }];
                  return false;
                } else {
                  var valid1 = true;
                  const len0 = data0.length;
                  for (let i0 = 0; i0 < len0; i0++) {
                    const _errs4 = errors;
                    if (!validate32(data0[i0], { instancePath: instancePath + "/requests/" + i0, parentData: data0, parentDataProperty: i0, rootData, dynamicAnchors })) {
                      vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                      errors = vErrors.length;
                    }
                    var valid1 = _errs4 === errors;
                    if (!valid1) {
                      break;
                    }
                  }
                }
              } else {
                validate31.errors = [{ instancePath: instancePath + "/requests", schemaPath: "#/properties/requests/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.next_cursor !== void 0) {
              let data2 = data.next_cursor;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data2 === "string") {
                  if (func1(data2) > 1024) {
                    validate31.errors = [{ instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                    return false;
                  }
                } else {
                  validate31.errors = [{ instancePath: instancePath + "/next_cursor", schemaPath: "#/properties/next_cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs5 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.event_cursor !== void 0) {
                let data3 = data.event_cursor;
                const _errs7 = errors;
                if (errors === _errs7) {
                  if (typeof data3 === "string") {
                    if (func1(data3) > 1024) {
                      validate31.errors = [{ instancePath: instancePath + "/event_cursor", schemaPath: "#/properties/event_cursor/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                      return false;
                    }
                  } else {
                    validate31.errors = [{ instancePath: instancePath + "/event_cursor", schemaPath: "#/properties/event_cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs7 === errors;
              } else {
                var valid0 = true;
              }
            }
          }
        }
      }
    } else {
      validate31.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate31.errors = vErrors;
  return errors === 0;
}
validate31.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate30(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate30.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate31(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
    errors = vErrors.length;
  }
  validate30.errors = vErrors;
  return errors === 0;
}
validate30.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var schema55 = { "type": "object", "additionalProperties": false, "required": ["cursor", "kind", "request_id", "revision", "status", "occurred_at", "used_count"], "properties": { "cursor": { "type": "string", "minLength": 1, "maxLength": 1024 }, "kind": { "type": "string", "enum": ["request.created", "request.approved", "request.denied", "request.failed", "request.canceled", "request.expired", "grant.revoked", "grant.reserved", "grant.consumed", "grant.released", "execution.succeeded", "execution.failed", "execution.ambiguous"] }, "request_id": { "type": "string", "minLength": 1, "maxLength": 128 }, "revision": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 }, "status": { "$ref": "#/$defs/Status" }, "occurred_at": { "type": "string", "format": "date-time" }, "used_count": { "type": "integer", "minimum": 0, "maximum": 9007199254740991 } } };
function validate37(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate37.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.cursor === void 0 && (missing0 = "cursor") || data.kind === void 0 && (missing0 = "kind") || data.request_id === void 0 && (missing0 = "request_id") || data.revision === void 0 && (missing0 = "revision") || data.status === void 0 && (missing0 = "status") || data.occurred_at === void 0 && (missing0 = "occurred_at") || data.used_count === void 0 && (missing0 = "used_count")) {
        validate37.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "cursor" || key0 === "kind" || key0 === "request_id" || key0 === "revision" || key0 === "status" || key0 === "occurred_at" || key0 === "used_count")) {
            validate37.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.cursor !== void 0) {
            let data0 = data.cursor;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (func1(data0) > 1024) {
                  validate37.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/maxLength", keyword: "maxLength", params: { limit: 1024 }, message: "must NOT have more than 1024 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate37.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate37.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.kind !== void 0) {
              let data1 = data.kind;
              const _errs4 = errors;
              if (typeof data1 !== "string") {
                validate37.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
              if (!(data1 === "request.created" || data1 === "request.approved" || data1 === "request.denied" || data1 === "request.failed" || data1 === "request.canceled" || data1 === "request.expired" || data1 === "grant.revoked" || data1 === "grant.reserved" || data1 === "grant.consumed" || data1 === "grant.released" || data1 === "execution.succeeded" || data1 === "execution.failed" || data1 === "execution.ambiguous")) {
                validate37.errors = [{ instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema55.properties.kind.enum }, message: "must be equal to one of the allowed values" }];
                return false;
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.request_id !== void 0) {
                let data2 = data.request_id;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 128) {
                      validate37.errors = [{ instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate37.errors = [{ instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate37.errors = [{ instancePath: instancePath + "/request_id", schemaPath: "#/properties/request_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.revision !== void 0) {
                  let data3 = data.revision;
                  const _errs8 = errors;
                  if (!(typeof data3 == "number" && (!(data3 % 1) && !isNaN(data3)) && isFinite(data3))) {
                    validate37.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                    return false;
                  }
                  if (errors === _errs8) {
                    if (typeof data3 == "number" && isFinite(data3)) {
                      if (data3 > 9007199254740991 || isNaN(data3)) {
                        validate37.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                        return false;
                      } else {
                        if (data3 < 1 || isNaN(data3)) {
                          validate37.errors = [{ instancePath: instancePath + "/revision", schemaPath: "#/properties/revision/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" }];
                          return false;
                        }
                      }
                    }
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.status !== void 0) {
                    let data4 = data.status;
                    const _errs10 = errors;
                    if (typeof data4 !== "string") {
                      validate37.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                    if (!(data4 === "pending" || data4 === "active" || data4 === "denied" || data4 === "failed" || data4 === "canceled" || data4 === "expired" || data4 === "consumed" || data4 === "revoked")) {
                      validate37.errors = [{ instancePath: instancePath + "/status", schemaPath: "#/$defs/Status/enum", keyword: "enum", params: { allowedValues: schema39.enum }, message: "must be equal to one of the allowed values" }];
                      return false;
                    }
                    var valid0 = _errs10 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.occurred_at !== void 0) {
                      let data5 = data.occurred_at;
                      const _errs13 = errors;
                      if (errors === _errs13) {
                        if (errors === _errs13) {
                          if (typeof data5 === "string") {
                            if (!formats0.validate(data5)) {
                              validate37.errors = [{ instancePath: instancePath + "/occurred_at", schemaPath: "#/properties/occurred_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                              return false;
                            }
                          } else {
                            validate37.errors = [{ instancePath: instancePath + "/occurred_at", schemaPath: "#/properties/occurred_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                            return false;
                          }
                        }
                      }
                      var valid0 = _errs13 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.used_count !== void 0) {
                        let data6 = data.used_count;
                        const _errs15 = errors;
                        if (!(typeof data6 == "number" && (!(data6 % 1) && !isNaN(data6)) && isFinite(data6))) {
                          validate37.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                          return false;
                        }
                        if (errors === _errs15) {
                          if (typeof data6 == "number" && isFinite(data6)) {
                            if (data6 > 9007199254740991 || isNaN(data6)) {
                              validate37.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                              return false;
                            } else {
                              if (data6 < 0 || isNaN(data6)) {
                                validate37.errors = [{ instancePath: instancePath + "/used_count", schemaPath: "#/properties/used_count/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                                return false;
                              }
                            }
                          }
                        }
                        var valid0 = _errs15 === errors;
                      } else {
                        var valid0 = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate37.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate37.errors = vErrors;
  return errors === 0;
}
validate37.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate36(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate36.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate37(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate37.errors : vErrors.concat(validate37.errors);
    errors = vErrors.length;
  }
  validate36.errors = vErrors;
  return errors === 0;
}
validate36.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var validateErrorEnvelope = validate39;
var schema59 = { "type": "object", "additionalProperties": false, "required": ["code", "message", "correlation_id"], "properties": { "code": { "type": "string", "enum": ["invalid_request", "unauthorized", "forbidden", "not_found", "method_not_allowed", "revision_conflict", "idempotency_conflict", "constraint_exceeded", "invalid_transition", "invalid_decision_token", "invalid_notification", "plan_unavailable", "plan_mismatch", "credential_changed", "credential_insufficient", "storage_unavailable", "cursor_expired", "temporarily_unavailable", "internal_error"] }, "message": { "type": "string", "minLength": 1, "maxLength": 500 }, "correlation_id": { "type": "string", "minLength": 1, "maxLength": 128 }, "current": { "$ref": "#/$defs/BrokerRequest" } } };
function validate41(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate41.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.code === void 0 && (missing0 = "code") || data.message === void 0 && (missing0 = "message") || data.correlation_id === void 0 && (missing0 = "correlation_id")) {
        validate41.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "code" || key0 === "message" || key0 === "correlation_id" || key0 === "current")) {
            validate41.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.code !== void 0) {
            let data0 = data.code;
            const _errs2 = errors;
            if (typeof data0 !== "string") {
              validate41.errors = [{ instancePath: instancePath + "/code", schemaPath: "#/properties/code/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if (!(data0 === "invalid_request" || data0 === "unauthorized" || data0 === "forbidden" || data0 === "not_found" || data0 === "method_not_allowed" || data0 === "revision_conflict" || data0 === "idempotency_conflict" || data0 === "constraint_exceeded" || data0 === "invalid_transition" || data0 === "invalid_decision_token" || data0 === "invalid_notification" || data0 === "plan_unavailable" || data0 === "plan_mismatch" || data0 === "credential_changed" || data0 === "credential_insufficient" || data0 === "storage_unavailable" || data0 === "cursor_expired" || data0 === "temporarily_unavailable" || data0 === "internal_error")) {
              validate41.errors = [{ instancePath: instancePath + "/code", schemaPath: "#/properties/code/enum", keyword: "enum", params: { allowedValues: schema59.properties.code.enum }, message: "must be equal to one of the allowed values" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.message !== void 0) {
              let data1 = data.message;
              const _errs4 = errors;
              if (errors === _errs4) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 500) {
                    validate41.errors = [{ instancePath: instancePath + "/message", schemaPath: "#/properties/message/maxLength", keyword: "maxLength", params: { limit: 500 }, message: "must NOT have more than 500 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate41.errors = [{ instancePath: instancePath + "/message", schemaPath: "#/properties/message/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate41.errors = [{ instancePath: instancePath + "/message", schemaPath: "#/properties/message/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.correlation_id !== void 0) {
                let data2 = data.correlation_id;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 128) {
                      validate41.errors = [{ instancePath: instancePath + "/correlation_id", schemaPath: "#/properties/correlation_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 1) {
                        validate41.errors = [{ instancePath: instancePath + "/correlation_id", schemaPath: "#/properties/correlation_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                        return false;
                      }
                    }
                  } else {
                    validate41.errors = [{ instancePath: instancePath + "/correlation_id", schemaPath: "#/properties/correlation_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.current !== void 0) {
                  const _errs8 = errors;
                  if (!validate32(data.current, { instancePath: instancePath + "/current", parentData: data, parentDataProperty: "current", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                    errors = vErrors.length;
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate41.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate41.errors = vErrors;
  return errors === 0;
}
validate41.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate40(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate40.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.error === void 0 && (missing0 = "error")) {
        validate40.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "error")) {
            validate40.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.error !== void 0) {
            if (!validate41(data.error, { instancePath: instancePath + "/error", parentData: data, parentDataProperty: "error", rootData, dynamicAnchors })) {
              vErrors = vErrors === null ? validate41.errors : vErrors.concat(validate41.errors);
              errors = vErrors.length;
            }
          }
        }
      }
    } else {
      validate40.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate40.errors = vErrors;
  return errors === 0;
}
validate40.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate39(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate39.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate40(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate40.errors : vErrors.concat(validate40.errors);
    errors = vErrors.length;
  }
  validate39.errors = vErrors;
  return errors === 0;
}
validate39.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
var pattern6 = new RegExp("^[A-Za-z0-9_-]+$", "u");
function validate47(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate47.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.source_id === void 0 && (missing0 = "source_id") || data.source_label === void 0 && (missing0 = "source_label") || data.handle === void 0 && (missing0 = "handle") || data.request === void 0 && (missing0 = "request")) {
        validate47.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "source_id" || key0 === "source_label" || key0 === "handle" || key0 === "request")) {
            validate47.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.source_id !== void 0) {
            let data0 = data.source_id;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (func1(data0) > 128) {
                  validate47.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate47.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate47.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.source_label !== void 0) {
              let data1 = data.source_label;
              const _errs4 = errors;
              if (errors === _errs4) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 200) {
                    validate47.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate47.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate47.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.handle !== void 0) {
                let data2 = data.handle;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 256) {
                      validate47.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/maxLength", keyword: "maxLength", params: { limit: 256 }, message: "must NOT have more than 256 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 22) {
                        validate47.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/minLength", keyword: "minLength", params: { limit: 22 }, message: "must NOT have fewer than 22 characters" }];
                        return false;
                      } else {
                        if (!pattern6.test(data2)) {
                          validate47.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]+$" }, message: 'must match pattern "^[A-Za-z0-9_-]+$"' }];
                          return false;
                        }
                      }
                    }
                  } else {
                    validate47.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.request !== void 0) {
                  const _errs8 = errors;
                  if (!validate32(data.request, { instancePath: instancePath + "/request", parentData: data, parentDataProperty: "request", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                    errors = vErrors.length;
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate47.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate47.errors = vErrors;
  return errors === 0;
}
validate47.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate46(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate46.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.api_version === void 0 && (missing0 = "api_version") || data.cursor === void 0 && (missing0 = "cursor") || data.synchronized_at === void 0 && (missing0 = "synchronized_at") || data.sources === void 0 && (missing0 = "sources") || data.requests === void 0 && (missing0 = "requests")) {
        validate46.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "api_version" || key0 === "cursor" || key0 === "synchronized_at" || key0 === "sources" || key0 === "requests" || key0 === "delivery_failures")) {
            validate46.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.api_version !== void 0) {
            let data0 = data.api_version;
            const _errs2 = errors;
            if (typeof data0 !== "string") {
              validate46.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "#/properties/api_version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if ("unyolo.io/operator-ui/v1" !== data0) {
              validate46.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "#/properties/api_version/const", keyword: "const", params: { allowedValue: "unyolo.io/operator-ui/v1" }, message: "must be equal to constant" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.cursor !== void 0) {
              let data1 = data.cursor;
              const _errs4 = errors;
              if (errors === _errs4) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 128) {
                    validate46.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate46.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate46.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "#/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.synchronized_at !== void 0) {
                let data2 = data.synchronized_at;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (errors === _errs6) {
                    if (typeof data2 === "string") {
                      if (!formats0.validate(data2)) {
                        validate46.errors = [{ instancePath: instancePath + "/synchronized_at", schemaPath: "#/properties/synchronized_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                        return false;
                      }
                    } else {
                      validate46.errors = [{ instancePath: instancePath + "/synchronized_at", schemaPath: "#/properties/synchronized_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.sources !== void 0) {
                  let data3 = data.sources;
                  const _errs8 = errors;
                  if (errors === _errs8) {
                    if (Array.isArray(data3)) {
                      if (data3.length > 100) {
                        validate46.errors = [{ instancePath: instancePath + "/sources", schemaPath: "#/properties/sources/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" }];
                        return false;
                      } else {
                        var valid1 = true;
                        const len0 = data3.length;
                        for (let i0 = 0; i0 < len0; i0++) {
                          let data4 = data3[i0];
                          const _errs10 = errors;
                          const _errs11 = errors;
                          if (errors === _errs11) {
                            if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
                              let missing1;
                              if (data4.id === void 0 && (missing1 = "id") || data4.label === void 0 && (missing1 = "label") || data4.healthy === void 0 && (missing1 = "healthy")) {
                                validate46.errors = [{ instancePath: instancePath + "/sources/" + i0, schemaPath: "#/$defs/UISourceHealth/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                                return false;
                              } else {
                                const _errs13 = errors;
                                for (const key1 in data4) {
                                  if (!(key1 === "id" || key1 === "label" || key1 === "healthy" || key1 === "last_sync_at" || key1 === "error")) {
                                    validate46.errors = [{ instancePath: instancePath + "/sources/" + i0, schemaPath: "#/$defs/UISourceHealth/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                    return false;
                                    break;
                                  }
                                }
                                if (_errs13 === errors) {
                                  if (data4.id !== void 0) {
                                    let data5 = data4.id;
                                    const _errs14 = errors;
                                    if (errors === _errs14) {
                                      if (typeof data5 === "string") {
                                        if (func1(data5) > 128) {
                                          validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/id", schemaPath: "#/$defs/UISourceHealth/properties/id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                                          return false;
                                        } else {
                                          if (func1(data5) < 1) {
                                            validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/id", schemaPath: "#/$defs/UISourceHealth/properties/id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                            return false;
                                          }
                                        }
                                      } else {
                                        validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/id", schemaPath: "#/$defs/UISourceHealth/properties/id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                        return false;
                                      }
                                    }
                                    var valid3 = _errs14 === errors;
                                  } else {
                                    var valid3 = true;
                                  }
                                  if (valid3) {
                                    if (data4.label !== void 0) {
                                      let data6 = data4.label;
                                      const _errs16 = errors;
                                      if (errors === _errs16) {
                                        if (typeof data6 === "string") {
                                          if (func1(data6) > 200) {
                                            validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/label", schemaPath: "#/$defs/UISourceHealth/properties/label/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                            return false;
                                          } else {
                                            if (func1(data6) < 1) {
                                              validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/label", schemaPath: "#/$defs/UISourceHealth/properties/label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                              return false;
                                            }
                                          }
                                        } else {
                                          validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/label", schemaPath: "#/$defs/UISourceHealth/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                          return false;
                                        }
                                      }
                                      var valid3 = _errs16 === errors;
                                    } else {
                                      var valid3 = true;
                                    }
                                    if (valid3) {
                                      if (data4.healthy !== void 0) {
                                        const _errs18 = errors;
                                        if (typeof data4.healthy !== "boolean") {
                                          validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/healthy", schemaPath: "#/$defs/UISourceHealth/properties/healthy/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                                          return false;
                                        }
                                        var valid3 = _errs18 === errors;
                                      } else {
                                        var valid3 = true;
                                      }
                                      if (valid3) {
                                        if (data4.last_sync_at !== void 0) {
                                          let data8 = data4.last_sync_at;
                                          const _errs20 = errors;
                                          if (errors === _errs20) {
                                            if (errors === _errs20) {
                                              if (typeof data8 === "string") {
                                                if (!formats0.validate(data8)) {
                                                  validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/last_sync_at", schemaPath: "#/$defs/UISourceHealth/properties/last_sync_at/format", keyword: "format", params: { format: "date-time" }, message: 'must match format "date-time"' }];
                                                  return false;
                                                }
                                              } else {
                                                validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/last_sync_at", schemaPath: "#/$defs/UISourceHealth/properties/last_sync_at/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                          }
                                          var valid3 = _errs20 === errors;
                                        } else {
                                          var valid3 = true;
                                        }
                                        if (valid3) {
                                          if (data4.error !== void 0) {
                                            let data9 = data4.error;
                                            const _errs22 = errors;
                                            if (errors === _errs22) {
                                              if (typeof data9 === "string") {
                                                if (func1(data9) > 200) {
                                                  validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/error", schemaPath: "#/$defs/UISourceHealth/properties/error/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                                                  return false;
                                                }
                                              } else {
                                                validate46.errors = [{ instancePath: instancePath + "/sources/" + i0 + "/error", schemaPath: "#/$defs/UISourceHealth/properties/error/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                return false;
                                              }
                                            }
                                            var valid3 = _errs22 === errors;
                                          } else {
                                            var valid3 = true;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            } else {
                              validate46.errors = [{ instancePath: instancePath + "/sources/" + i0, schemaPath: "#/$defs/UISourceHealth/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                              return false;
                            }
                          }
                          var valid1 = _errs10 === errors;
                          if (!valid1) {
                            break;
                          }
                        }
                      }
                    } else {
                      validate46.errors = [{ instancePath: instancePath + "/sources", schemaPath: "#/properties/sources/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                      return false;
                    }
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.requests !== void 0) {
                    let data10 = data.requests;
                    const _errs24 = errors;
                    if (errors === _errs24) {
                      if (Array.isArray(data10)) {
                        if (data10.length > 1e3) {
                          validate46.errors = [{ instancePath: instancePath + "/requests", schemaPath: "#/properties/requests/maxItems", keyword: "maxItems", params: { limit: 1e3 }, message: "must NOT have more than 1000 items" }];
                          return false;
                        } else {
                          var valid4 = true;
                          const len1 = data10.length;
                          for (let i1 = 0; i1 < len1; i1++) {
                            const _errs26 = errors;
                            if (!validate47(data10[i1], { instancePath: instancePath + "/requests/" + i1, parentData: data10, parentDataProperty: i1, rootData, dynamicAnchors })) {
                              vErrors = vErrors === null ? validate47.errors : vErrors.concat(validate47.errors);
                              errors = vErrors.length;
                            }
                            var valid4 = _errs26 === errors;
                            if (!valid4) {
                              break;
                            }
                          }
                        }
                      } else {
                        validate46.errors = [{ instancePath: instancePath + "/requests", schemaPath: "#/properties/requests/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                        return false;
                      }
                    }
                    var valid0 = _errs24 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.delivery_failures !== void 0) {
                      let data12 = data.delivery_failures;
                      const _errs27 = errors;
                      if (!(typeof data12 == "number" && (!(data12 % 1) && !isNaN(data12)) && isFinite(data12))) {
                        validate46.errors = [{ instancePath: instancePath + "/delivery_failures", schemaPath: "#/properties/delivery_failures/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                        return false;
                      }
                      if (errors === _errs27) {
                        if (typeof data12 == "number" && isFinite(data12)) {
                          if (data12 > 9007199254740991 || isNaN(data12)) {
                            validate46.errors = [{ instancePath: instancePath + "/delivery_failures", schemaPath: "#/properties/delivery_failures/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                            return false;
                          } else {
                            if (data12 < 0 || isNaN(data12)) {
                              validate46.errors = [{ instancePath: instancePath + "/delivery_failures", schemaPath: "#/properties/delivery_failures/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                              return false;
                            }
                          }
                        }
                      }
                      var valid0 = _errs27 === errors;
                    } else {
                      var valid0 = true;
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate46.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate46.errors = vErrors;
  return errors === 0;
}
validate46.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate45(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate45.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate46(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate46.errors : vErrors.concat(validate46.errors);
    errors = vErrors.length;
  }
  validate45.errors = vErrors;
  return errors === 0;
}
validate45.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate51(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate51.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  if (errors === _errs0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.api_version === void 0 && (missing0 = "api_version") || data.cursor === void 0 && (missing0 = "cursor") || data.changed === void 0 && (missing0 = "changed")) {
        validate51.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs2 = errors;
        for (const key0 in data) {
          if (!(key0 === "api_version" || key0 === "cursor" || key0 === "changed")) {
            validate51.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs2 === errors) {
          if (data.api_version !== void 0) {
            let data0 = data.api_version;
            const _errs3 = errors;
            if (typeof data0 !== "string") {
              validate51.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/api_version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if ("unyolo.io/operator-ui/v1" !== data0) {
              validate51.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/api_version/const", keyword: "const", params: { allowedValue: "unyolo.io/operator-ui/v1" }, message: "must be equal to constant" }];
              return false;
            }
            var valid1 = _errs3 === errors;
          } else {
            var valid1 = true;
          }
          if (valid1) {
            if (data.cursor !== void 0) {
              let data1 = data.cursor;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 128) {
                    validate51.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/cursor/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate51.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate51.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid1 = _errs5 === errors;
            } else {
              var valid1 = true;
            }
            if (valid1) {
              if (data.changed !== void 0) {
                const _errs7 = errors;
                if (typeof data.changed !== "boolean") {
                  validate51.errors = [{ instancePath: instancePath + "/changed", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/properties/changed/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                  return false;
                }
                var valid1 = _errs7 === errors;
              } else {
                var valid1 = true;
              }
            }
          }
        }
      }
    } else {
      validate51.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISnapshotEvent/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate51.errors = vErrors;
  return errors === 0;
}
validate51.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate52(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate52.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  const _errs0 = errors;
  if (errors === _errs0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.api_version === void 0 && (missing0 = "api_version") || data.cursor === void 0 && (missing0 = "cursor") || data.pending === void 0 && (missing0 = "pending") || data.healthy === void 0 && (missing0 = "healthy")) {
        validate52.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs2 = errors;
        for (const key0 in data) {
          if (!(key0 === "api_version" || key0 === "cursor" || key0 === "pending" || key0 === "healthy")) {
            validate52.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs2 === errors) {
          if (data.api_version !== void 0) {
            let data0 = data.api_version;
            const _errs3 = errors;
            if (typeof data0 !== "string") {
              validate52.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/api_version/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
              return false;
            }
            if ("unyolo.io/operator-ui/v1" !== data0) {
              validate52.errors = [{ instancePath: instancePath + "/api_version", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/api_version/const", keyword: "const", params: { allowedValue: "unyolo.io/operator-ui/v1" }, message: "must be equal to constant" }];
              return false;
            }
            var valid1 = _errs3 === errors;
          } else {
            var valid1 = true;
          }
          if (valid1) {
            if (data.cursor !== void 0) {
              let data1 = data.cursor;
              const _errs5 = errors;
              if (errors === _errs5) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 128) {
                    validate52.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/cursor/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate52.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/cursor/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate52.errors = [{ instancePath: instancePath + "/cursor", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/cursor/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid1 = _errs5 === errors;
            } else {
              var valid1 = true;
            }
            if (valid1) {
              if (data.pending !== void 0) {
                let data2 = data.pending;
                const _errs7 = errors;
                if (!(typeof data2 == "number" && (!(data2 % 1) && !isNaN(data2)) && isFinite(data2))) {
                  validate52.errors = [{ instancePath: instancePath + "/pending", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/pending/type", keyword: "type", params: { type: "integer" }, message: "must be integer" }];
                  return false;
                }
                if (errors === _errs7) {
                  if (typeof data2 == "number" && isFinite(data2)) {
                    if (data2 > 9007199254740991 || isNaN(data2)) {
                      validate52.errors = [{ instancePath: instancePath + "/pending", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/pending/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" }];
                      return false;
                    } else {
                      if (data2 < 0 || isNaN(data2)) {
                        validate52.errors = [{ instancePath: instancePath + "/pending", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/pending/minimum", keyword: "minimum", params: { comparison: ">=", limit: 0 }, message: "must be >= 0" }];
                        return false;
                      }
                    }
                  }
                }
                var valid1 = _errs7 === errors;
              } else {
                var valid1 = true;
              }
              if (valid1) {
                if (data.healthy !== void 0) {
                  const _errs9 = errors;
                  if (typeof data.healthy !== "boolean") {
                    validate52.errors = [{ instancePath: instancePath + "/healthy", schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/properties/healthy/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" }];
                    return false;
                  }
                  var valid1 = _errs9 === errors;
                } else {
                  var valid1 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate52.errors = [{ instancePath, schemaPath: "https://unyolo.io/schema/operator/v1/runtime/components#/$defs/UISummary/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate52.errors = vErrors;
  return errors === 0;
}
validate52.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate54(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate54.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.source_id === void 0 && (missing0 = "source_id") || data.source_label === void 0 && (missing0 = "source_label") || data.handle === void 0 && (missing0 = "handle") || data.request === void 0 && (missing0 = "request")) {
        validate54.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "source_id" || key0 === "source_label" || key0 === "handle" || key0 === "request")) {
            validate54.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.source_id !== void 0) {
            let data0 = data.source_id;
            const _errs2 = errors;
            if (errors === _errs2) {
              if (typeof data0 === "string") {
                if (func1(data0) > 128) {
                  validate54.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/maxLength", keyword: "maxLength", params: { limit: 128 }, message: "must NOT have more than 128 characters" }];
                  return false;
                } else {
                  if (func1(data0) < 1) {
                    validate54.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                    return false;
                  }
                }
              } else {
                validate54.errors = [{ instancePath: instancePath + "/source_id", schemaPath: "#/properties/source_id/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                return false;
              }
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.source_label !== void 0) {
              let data1 = data.source_label;
              const _errs4 = errors;
              if (errors === _errs4) {
                if (typeof data1 === "string") {
                  if (func1(data1) > 200) {
                    validate54.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/maxLength", keyword: "maxLength", params: { limit: 200 }, message: "must NOT have more than 200 characters" }];
                    return false;
                  } else {
                    if (func1(data1) < 1) {
                      validate54.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                      return false;
                    }
                  }
                } else {
                  validate54.errors = [{ instancePath: instancePath + "/source_label", schemaPath: "#/properties/source_label/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                  return false;
                }
              }
              var valid0 = _errs4 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.handle !== void 0) {
                let data2 = data.handle;
                const _errs6 = errors;
                if (errors === _errs6) {
                  if (typeof data2 === "string") {
                    if (func1(data2) > 256) {
                      validate54.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/maxLength", keyword: "maxLength", params: { limit: 256 }, message: "must NOT have more than 256 characters" }];
                      return false;
                    } else {
                      if (func1(data2) < 22) {
                        validate54.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/minLength", keyword: "minLength", params: { limit: 22 }, message: "must NOT have fewer than 22 characters" }];
                        return false;
                      } else {
                        if (!pattern6.test(data2)) {
                          validate54.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9_-]+$" }, message: 'must match pattern "^[A-Za-z0-9_-]+$"' }];
                          return false;
                        }
                      }
                    }
                  } else {
                    validate54.errors = [{ instancePath: instancePath + "/handle", schemaPath: "#/properties/handle/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs6 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.request !== void 0) {
                  const _errs8 = errors;
                  if (!validate32(data.request, { instancePath: instancePath + "/request", parentData: data, parentDataProperty: "request", rootData, dynamicAnchors })) {
                    vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
                    errors = vErrors.length;
                  }
                  var valid0 = _errs8 === errors;
                } else {
                  var valid0 = true;
                }
              }
            }
          }
        }
      }
    } else {
      validate54.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate54.errors = vErrors;
  return errors === 0;
}
validate54.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate53.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (!validate54(data, { instancePath, parentData, parentDataProperty, rootData, dynamicAnchors })) {
    vErrors = vErrors === null ? validate54.errors : vErrors.concat(validate54.errors);
    errors = vErrors.length;
  }
  validate53.errors = vErrors;
  return errors === 0;
}
validate53.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };

// node_modules/openclaw-unyolo/dist/src/operator-v1.js
function parseDescriptor(value) {
  return validated(validateDescriptor, value);
}
function parseRequest(value) {
  return validated(validateBrokerRequest, value);
}
function parseRequestPage(value) {
  return validated(validateRequestPage, value);
}
function parseErrorEnvelope(value) {
  return validateErrorEnvelope(value) ? value : void 0;
}
function validated(validate, value) {
  if (!validate(value))
    throw new Error("Operator V1 response is invalid");
  return value;
}

// src/mlclaw-space-runtime/operator-brokers.ts
var MAX_CONFIG_BYTES = 64 * 1024;
var MAX_TOKEN_BYTES = 4096;
var MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
var DEFAULT_REQUEST_TIMEOUT_MS = 1e4;
var BROKER_ID = /^[a-z](?:[a-z0-9-]{0,38}[a-z0-9])?$/;
var BrokerOperatorError = class extends Error {
  constructor(broker, status, code, message) {
    super(message);
    this.broker = broker;
    this.status = status;
    this.code = code;
  }
};
function requestDeadline(timeoutMs, signal) {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), timeoutMs);
  timer.unref?.();
  return {
    signal: signal ? AbortSignal.any([signal, timeout.signal]) : timeout.signal,
    timedOut: () => timeout.signal.aborted,
    clear: () => clearTimeout(timer)
  };
}
var BrokerOperatorClient = class {
  constructor(options) {
    this.options = options;
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.fetchImpl = options.fetch ?? fetch;
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
    if (!Number.isSafeInteger(this.requestTimeoutMs) || this.requestTimeoutMs < 1) {
      throw new Error("operator broker request timeout must be a positive integer");
    }
  }
  fetchImpl;
  baseUrl;
  requestTimeoutMs;
  summary() {
    return { id: this.options.id, label: this.options.label };
  }
  discover(signal) {
    return this.request("/.well-known/unyolo-operator", signal ? { signal } : void 0, parseDescriptor, "discovery");
  }
  list(params = {}, signal) {
    const query = new URLSearchParams();
    if (params.status) {
      query.set("status", params.status);
    }
    if (params.cursor) {
      query.set("cursor", params.cursor);
    }
    if (params.limit) {
      query.set("limit", String(params.limit));
    }
    const suffix = query.size > 0 ? `?${query}` : "";
    return this.request(
      `/api/operator/v1/requests${suffix}`,
      signal ? { signal } : void 0,
      parseRequestPage,
      "request list"
    );
  }
  get(id) {
    return this.request(
      `/api/operator/v1/requests/${approvalId(id)}`,
      void 0,
      parseRequest,
      "request"
    );
  }
  decide(id, action, decision) {
    return this.request(
      `/api/operator/v1/requests/${approvalId(id)}/${action}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          expected_revision: decision.expectedRevision,
          idempotency_key: decision.idempotencyKey,
          on_behalf_of: decision.onBehalfOf,
          ...decision.durationSeconds !== void 0 || decision.maxUses !== void 0 ? {
            constraints: {
              ...decision.durationSeconds !== void 0 ? { duration_seconds: decision.durationSeconds } : {},
              ...decision.maxUses !== void 0 ? { max_uses: decision.maxUses } : {}
            }
          } : {}
        })
      },
      parseRequest,
      "request"
    );
  }
  async events(lastEventId, signal) {
    const headers = {
      accept: "text/event-stream",
      authorization: `Bearer ${this.options.token}`
    };
    const cursor = lastEventId ? `?cursor=${encodeURIComponent(lastEventId)}` : "";
    const response = await this.fetchImpl(`${this.baseUrl}/api/operator/v1/events${cursor}`, {
      headers,
      redirect: "error",
      ...signal ? { signal } : {}
    });
    if (!response.ok) {
      throw await this.operatorError(response);
    }
    if (!response.headers.get("content-type")?.toLowerCase().startsWith("text/event-stream")) {
      await response.body?.cancel();
      throw new BrokerOperatorError(
        this.summary(),
        502,
        "invalid_event_stream",
        "Broker returned an invalid event stream"
      );
    }
    return response;
  }
  async request(pathname, init, parser, label) {
    const headers = new Headers(init?.headers);
    headers.set("accept", "application/json");
    headers.set("authorization", `Bearer ${this.options.token}`);
    const deadline = requestDeadline(this.requestTimeoutMs, init?.signal ?? void 0);
    try {
      const response = await this.fetchImpl(`${this.baseUrl}${pathname}`, {
        ...init ?? {},
        headers,
        redirect: "error",
        signal: deadline.signal
      });
      if (!response.ok) {
        throw await this.operatorError(response);
      }
      return validatedBrokerPayload(await boundedJson(response), parser, label);
    } catch (err) {
      if (deadline.timedOut()) {
        throw new BrokerOperatorError(
          this.summary(),
          504,
          "broker_timeout",
          `${this.options.label} operator request timed out`
        );
      }
      throw err;
    } finally {
      deadline.clear();
    }
  }
  async operatorError(response) {
    const fallback = `${this.options.label} operator request failed`;
    try {
      const value = validatedBrokerPayload(await boundedJson(response), parseErrorEnvelope, "error");
      const message = value?.error.message.trim() || fallback;
      const code = value?.error.code.trim();
      return new BrokerOperatorError(this.summary(), response.status, code, message);
    } catch {
      return new BrokerOperatorError(this.summary(), response.status, void 0, fallback);
    }
  }
};
var OperatorBrokerRegistry = class {
  clients;
  constructor(configs, fetchImpl) {
    this.clients = new Map(
      configs.map((config2) => [
        config2.id,
        new BrokerOperatorClient({ ...config2, ...fetchImpl ? { fetch: fetchImpl } : {} })
      ])
    );
  }
  list() {
    return [...this.clients.values()].map((client) => client.summary());
  }
  get(id) {
    return this.clients.get(id);
  }
  entries() {
    return [...this.clients.values()].map((client) => [client.summary(), client]);
  }
};
function loadOperatorBrokers(file) {
  if (!file) {
    return [];
  }
  if (!isAbsolute(file)) {
    throw new Error("MLCLAW_OPERATOR_BROKERS_FILE must be absolute");
  }
  const raw2 = readBoundedFile(file, MAX_CONFIG_BYTES, "operator broker configuration");
  let parsed;
  try {
    parsed = JSON.parse(raw2);
  } catch {
    throw new Error("operator broker configuration must be valid JSON");
  }
  const root = strictRecord(parsed, ["version", "brokers"], "operator broker configuration");
  if (root.version !== 1) {
    throw new Error("operator broker configuration version must be 1");
  }
  if (!Array.isArray(root.brokers) || root.brokers.length > 16) {
    throw new Error("operator broker configuration must contain at most 16 brokers");
  }
  const ids = /* @__PURE__ */ new Set();
  const urls = /* @__PURE__ */ new Set();
  return root.brokers.map((value, index) => {
    const entry = strictRecord(value, ["id", "label", "url", "token_file"], `broker ${index}`);
    const id = requiredString(entry.id, `broker ${index} id`);
    if (!BROKER_ID.test(id) || ids.has(id)) {
      throw new Error(`broker ${index} id is invalid or duplicated`);
    }
    ids.add(id);
    const label = requiredString(entry.label, `broker ${index} label`);
    if ([...label].length > 80 || new RegExp("\\p{Cc}", "u").test(label)) {
      throw new Error(`broker ${index} label is invalid`);
    }
    const baseUrl = operatorOrigin(requiredString(entry.url, `broker ${index} url`));
    if (urls.has(baseUrl)) {
      throw new Error(`broker ${index} URL is duplicated`);
    }
    urls.add(baseUrl);
    const tokenFile = requiredString(entry.token_file, `broker ${index} token_file`);
    if (!isAbsolute(tokenFile)) {
      throw new Error(`broker ${index} token_file must be absolute`);
    }
    const token = readBoundedFile(tokenFile, MAX_TOKEN_BYTES, `broker ${id} token`).trim();
    if (!/^[\x21-\x7e]{24,4096}$/u.test(token)) {
      throw new Error(`broker ${id} token is invalid`);
    }
    return { id, label, baseUrl, token };
  });
}
function operatorOrigin(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("broker URL must be an absolute HTTP URL");
  }
  const supportedProtocol = (/* @__PURE__ */ new Set(["http:", "https:"])).has(url.protocol);
  const hasAuthorityOrSuffix = [url.username, url.password, url.search, url.hash].some(Boolean);
  const hasPath = !["", "/"].includes(url.pathname);
  if (!supportedProtocol || hasAuthorityOrSuffix || hasPath) {
    throw new Error("broker URL must be one HTTP origin without credentials, path, query, or fragment");
  }
  return url.origin;
}
function strictRecord(value, keys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }
  const record = value;
  if (Object.keys(record).some((key) => !keys.includes(key)) || keys.some((key) => !(key in record))) {
    throw new Error(`${label} has missing or unknown fields`);
  }
  return record;
}
function requiredString(value, label) {
  if (typeof value !== "string" || !value || value !== value.trim()) {
    throw new Error(`${label} must be a non-empty trimmed string`);
  }
  return value;
}
function readBoundedFile(file, maximum, label) {
  let value;
  try {
    value = readFileSync(file, "utf8");
  } catch {
    throw new Error(`${label} could not be read`);
  }
  if (Buffer.byteLength(value) > maximum) {
    throw new Error(`${label} is too large`);
  }
  return value;
}
function approvalId(id) {
  return encodeURIComponent(id);
}
async function boundedJson(response) {
  if (!response.body) {
    throw new Error("broker response body is empty");
  }
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    size += value.byteLength;
    if (size > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error("broker response is too large");
    }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
function validatedBrokerPayload(value, parser, label) {
  try {
    return parser(value);
  } catch {
    throw new Error(`broker ${label} response is invalid`);
  }
}

// src/mlclaw-space-runtime/local-access.ts
import { createHmac, timingSafeEqual } from "node:crypto";
var LOCAL_ACCESS_CONTEXT = "mlclaw-local-access-v1";
function deriveLocalAccessToken(sessionSecret) {
  return createHmac("sha256", sessionSecret).update(LOCAL_ACCESS_CONTEXT).digest("base64url");
}
function localAccessTokenMatches(candidate, expected) {
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

// src/mlclaw-space-runtime/runtime-settings-file.ts
import { randomUUID } from "node:crypto";
import { readFileSync as readFileSync2 } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
var RUNTIME_SETTINGS_VERSION = 1;
var MAX_RUNTIME_SETTINGS_BYTES = 256 * 1024;
var RUNTIME_SETTINGS_KEYS = /* @__PURE__ */ new Set(["version", "generation", "model", "modelChoices", "updatedAt"]);
var PROCESS_LOCK_ID = randomUUID();
var INCOMPLETE_LOCK_STALE_MS = 5e3;
var RuntimeSettingsConflictError = class extends Error {
  constructor() {
    super("runtime settings changed; refresh before saving");
    this.name = "RuntimeSettingsConflictError";
  }
};
function readRuntimeSettingsFile(file) {
  let raw2;
  try {
    raw2 = readFileSync2(file, "utf8");
  } catch (error) {
    if (isNodeError(error, "ENOENT")) return void 0;
    throw new Error("runtime settings are unavailable", { cause: error });
  }
  if (Buffer.byteLength(raw2) > MAX_RUNTIME_SETTINGS_BYTES) {
    throw new Error("runtime settings exceed the size limit");
  }
  return parseRuntimeSettings(raw2);
}
async function initializeRuntimeSettingsFile(params) {
  const current = readRuntimeSettingsFile(params.file);
  if (current && !bootstrapSupersedes(current, params.model, params.bootstrapUpdatedAt)) return current;
  return writeInitialRuntimeSettings(params, current?.generation ?? 0);
}
async function writeInitialRuntimeSettings(params, expectedGeneration) {
  try {
    return await writeRuntimeSettingsFile({
      file: params.file,
      model: params.model,
      modelChoices: params.modelChoices,
      expectedGeneration,
      ...params.now ? { now: params.now } : {}
    });
  } catch (error) {
    if (error instanceof RuntimeSettingsConflictError) {
      const winner = readRuntimeSettingsFile(params.file);
      if (winner) return winner;
    }
    throw error;
  }
}
function bootstrapSupersedes(current, bootstrapModel, bootstrapUpdatedAt) {
  return current.model !== bootstrapModel && typeof bootstrapUpdatedAt === "string" && validTimestamp(bootstrapUpdatedAt) && Date.parse(bootstrapUpdatedAt) > Date.parse(current.updatedAt);
}
async function writeRuntimeSettingsFile(params) {
  await fs.mkdir(path.dirname(params.file), { recursive: true, mode: 448 });
  const lockFile = `${params.file}.lock`;
  const lock = await acquireRuntimeSettingsLock(lockFile);
  try {
    const current = readRuntimeSettingsFile(params.file);
    if ((current?.generation ?? 0) !== params.expectedGeneration) throw new RuntimeSettingsConflictError();
    const document = buildRuntimeSettings({
      model: params.model,
      modelChoices: params.modelChoices,
      generation: params.expectedGeneration + 1,
      now: params.now ?? (() => /* @__PURE__ */ new Date())
    });
    const temporary = `${params.file}.${randomUUID()}.tmp`;
    try {
      await fs.writeFile(temporary, `${JSON.stringify(document, null, 2)}
`, { mode: 384, flag: "wx" });
      await fs.rename(temporary, params.file);
      await fs.chmod(params.file, 384);
    } finally {
      await fs.rm(temporary, { force: true });
    }
    return document;
  } finally {
    await lock.close();
    await fs.rm(lockFile, { force: true });
  }
}
async function acquireRuntimeSettingsLock(lockFile, recoverStale = true) {
  let lock;
  try {
    lock = await fs.open(lockFile, "wx", 384);
  } catch (error) {
    if (!isNodeError(error, "EEXIST")) throw error;
    if (!recoverStale || !await runtimeSettingsLockIsStale(lockFile)) {
      throw new RuntimeSettingsConflictError();
    }
    await fs.rm(lockFile, { force: true });
    return acquireRuntimeSettingsLock(lockFile, false);
  }
  try {
    await lock.writeFile(`${JSON.stringify({ pid: process.pid, processLockId: PROCESS_LOCK_ID })}
`);
    return lock;
  } catch (error) {
    await lock.close();
    await fs.rm(lockFile, { force: true });
    throw error;
  }
}
async function runtimeSettingsLockIsStale(lockFile) {
  let owner;
  try {
    owner = JSON.parse(await fs.readFile(lockFile, "utf8"));
  } catch {
    return incompleteRuntimeSettingsLockIsStale(lockFile);
  }
  if (!isRecord(owner) || !Number.isSafeInteger(owner.pid) || typeof owner.processLockId !== "string") {
    return incompleteRuntimeSettingsLockIsStale(lockFile);
  }
  const ownerPid = Number(owner.pid);
  if (ownerPid === process.pid) return owner.processLockId !== PROCESS_LOCK_ID;
  try {
    process.kill(ownerPid, 0);
    return false;
  } catch (error) {
    return isNodeError(error, "ESRCH");
  }
}
async function incompleteRuntimeSettingsLockIsStale(lockFile) {
  try {
    const stat = await fs.stat(lockFile);
    return Date.now() - stat.mtimeMs >= INCOMPLETE_LOCK_STALE_MS;
  } catch {
    return false;
  }
}
function buildRuntimeSettings(params) {
  const model = normalizeModelRef(params.model);
  const modelChoices = normalizeModelChoices(params.modelChoices, model ?? "");
  if (!model || !modelChoices || !Number.isSafeInteger(params.generation) || params.generation < 1) {
    throw new Error("runtime settings are invalid");
  }
  return {
    version: RUNTIME_SETTINGS_VERSION,
    generation: params.generation,
    model,
    modelChoices,
    updatedAt: params.now().toISOString()
  };
}
function parseRuntimeSettings(raw2) {
  let parsed;
  try {
    parsed = JSON.parse(raw2);
  } catch (error) {
    throw new Error("runtime settings are invalid", { cause: error });
  }
  const fields = validatedRuntimeSettingsFields(parsed);
  return buildRuntimeSettings({
    model: fields.model,
    modelChoices: fields.modelChoices,
    generation: fields.generation,
    now: () => new Date(fields.updatedAt)
  });
}
function validatedRuntimeSettingsFields(value) {
  if (!isRecord(value) || Object.keys(value).some((key) => !RUNTIME_SETTINGS_KEYS.has(key))) {
    throw new Error("runtime settings are invalid");
  }
  if (value.version !== RUNTIME_SETTINGS_VERSION) throw new Error("runtime settings are invalid");
  return {
    model: requiredRuntimeSettingsModel(value.model),
    modelChoices: requiredRuntimeSettingsChoices(value.modelChoices),
    generation: requiredRuntimeSettingsGeneration(value.generation),
    updatedAt: requiredRuntimeSettingsTimestamp(value.updatedAt)
  };
}
function requiredRuntimeSettingsModel(value) {
  if (typeof value !== "string") throw new Error("runtime settings are invalid");
  return value;
}
function requiredRuntimeSettingsChoices(value) {
  if (!Array.isArray(value)) throw new Error("runtime settings are invalid");
  return value;
}
function requiredRuntimeSettingsGeneration(value) {
  if (!Number.isSafeInteger(value) || Number(value) < 1) throw new Error("runtime settings are invalid");
  return Number(value);
}
function requiredRuntimeSettingsTimestamp(value) {
  if (typeof value !== "string" || !validTimestamp(value)) throw new Error("runtime settings are invalid");
  return value;
}
function validTimestamp(value) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === value;
}
function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isNodeError(error, code) {
  return error instanceof Error && "code" in error && error.code === code;
}

// src/mlclaw-space-runtime/config.ts
function loadConfig(env = process.env) {
  const port = integer(env.PORT ?? env.MLCLAW_SPACE_PORT, 7860);
  const openclawPort = integer(env.MLCLAW_OPENCLAW_PORT ?? env.OPENCLAW_GATEWAY_PORT, 7861);
  const mcpPort = integer(env.MLCLAW_MCP_PORT, 7862);
  const spaceId = trim(env.SPACE_ID);
  const canonicalSpaceId = trim(env.MLCLAW_CANONICAL_SPACE_ID) ?? "osolmaz/mlclaw";
  const canonicalCreatorUserId = trim(env.MLCLAW_CANONICAL_CREATOR_USER_ID);
  const spaceCreatorUserId = trim(env.SPACE_CREATOR_USER_ID);
  const mode = resolveMode({
    env,
    spaceId,
    canonicalSpaceId,
    canonicalCreatorUserId,
    spaceCreatorUserId
  });
  const owner = ownerFromSpaceId(spaceId);
  const stateBucket = trim(env.OPENCLAW_HF_STATE_BUCKET);
  const gatewayLocation = trim(env.MLCLAW_GATEWAY_LOCATION);
  const localAccessUser = gatewayLocation === "local" ? trim(env.MLCLAW_LOCAL_ACCESS_USER) ?? ownerFromRepoId(stateBucket) : void 0;
  const configuredAllowedUsers = splitUsers(env.MLCLAW_ALLOWED_USERS ?? env.ALLOWED_USERS);
  const configuredAdmins = splitUsers(env.MLCLAW_ADMINS);
  const resolvedAdmins = uniqueUsers([
    ...configuredAdmins.length > 0 ? configuredAdmins : owner ? [owner] : configuredAllowedUsers.slice(0, 1),
    ...localAccessUser ? [localAccessUser] : []
  ]);
  const allowedUsers = uniqueUsers([...configuredAllowedUsers, ...resolvedAdmins, ...owner ? [owner] : []]);
  const publicUrl = publicUrlFromEnv(env, port);
  const accessOrigins = accessOriginsFromEnv(env, publicUrl);
  const sessionSecret = trim(env.MLCLAW_SESSION_SECRET ?? env.SESSION_SECRET) ?? randomBytes(48).toString("base64url");
  const configuredCredentialKey = trim(env.MLCLAW_CREDENTIAL_KEY);
  if (mode === "app" && !configuredCredentialKey) {
    throw new Error("MLCLAW_CREDENTIAL_KEY is required in app mode; run mlclaw doctor --fix");
  }
  const credentialKey = configuredCredentialKey ?? randomBytes(32).toString("base64url");
  const openclawCommand = trim(env.MLCLAW_OPENCLAW_COMMAND) ?? "openclaw";
  const openclawArgs = splitArgs(env.MLCLAW_OPENCLAW_ARGS) ?? ["gateway"];
  const stateMountDir = trim(env.MLCLAW_STATE_MOUNT_DIR);
  const statePrefix = trim(env.OPENCLAW_HF_STATE_PREFIX);
  const runtimeSettingsFile = trim(env.MLCLAW_RUNTIME_SETTINGS_FILE) ?? (stateMountDir ? `${stateMountDir.replace(/\/+$/, "")}/${normalizeBucketPrefix(statePrefix)}/.mlclaw/runtime-settings.json` : "/home/node/.local/share/mlclaw/live/.mlclaw-protected/control/runtime-settings.json");
  const mcpCredentialFile = trim(env.MLCLAW_MCP_CREDENTIAL_FILE) ?? (stateMountDir ? `${stateMountDir.replace(/\/+$/, "")}/${normalizeBucketPrefix(statePrefix)}/.mlclaw/mcp-oauth.enc` : `${pathDirname(runtimeSettingsFile)}/mcp-oauth.enc`);
  const protectedControlDir = `${pathDirname(pathDirname(runtimeSettingsFile))}/.mlclaw-protected/control`;
  const mountedControlDir = stateMountDir ? `${stateMountDir.replace(/\/+$/, "")}/${normalizeBucketPrefix(statePrefix)}/.mlclaw` : void 0;
  const openaiCredentialStoreFile = trim(env.MLCLAW_OPENAI_CREDENTIAL_STORE_FILE) ?? (mountedControlDir ? `${mountedControlDir}/openai-api-key.enc` : `${protectedControlDir}/openai-api-key.enc`);
  const codexAuthStoreFile = trim(env.MLCLAW_CODEX_AUTH_STORE_FILE) ?? (mountedControlDir ? `${mountedControlDir}/codex-auth.enc` : `${protectedControlDir}/codex-auth.enc`);
  const runtimeSettings2 = readRuntimeSettingsFile(runtimeSettingsFile);
  const bootstrapModel = trim(env.OPENCLAW_MODEL) ?? DEFAULT_MODEL;
  const model = runtimeSettings2?.model ?? bootstrapModel;
  const agentName = trim(env.OPENCLAW_AGENT_NAME);
  const telegramBotMuxConfigPath = optionalAbsolutePath(
    env.MLCLAW_TELEGRAM_BOT_MUX_CONFIG_PATH,
    "MLCLAW_TELEGRAM_BOT_MUX_CONFIG_PATH"
  );
  return {
    port,
    openclawPort,
    mcpPort,
    openclawHost: trim(env.MLCLAW_OPENCLAW_HOST) ?? "127.0.0.1",
    openclawUid: integer(env.MLCLAW_OPENCLAW_UID, 1e3),
    openclawGid: integer(env.MLCLAW_OPENCLAW_GID, 1e3),
    publicUrl,
    accessOrigins,
    providerUrl: trim(env.OPENID_PROVIDER_URL) ?? "https://huggingface.co",
    oauthClientId: trim(env.OAUTH_CLIENT_ID),
    oauthClientSecret: trim(env.OAUTH_CLIENT_SECRET),
    sessionSecret,
    sessionSecretGenerated: !trim(env.MLCLAW_SESSION_SECRET ?? env.SESSION_SECRET),
    credentialKey,
    credentialKeyGenerated: !configuredCredentialKey,
    cookieSecure: env.MLCLAW_COOKIE_SECURE === "0" ? false : !publicUrl.startsWith("http://"),
    sessionCookieName: gatewayLocation === "local" ? localSessionCookieName(trim(env.MLCLAW_RUNTIME_ID) ?? publicUrl) : SESSION_COOKIE_PREFIX,
    spaceId,
    canonicalSpaceId,
    canonicalCreatorUserId,
    spaceCreatorUserId,
    allowedUsers,
    adminUsers: resolvedAdmins,
    allowAnySignedIn: env.MLCLAW_ALLOW_ANY_SIGNED_IN === "1" || env.MLCLAW_ALLOW_ANY_SIGNED_IN === "true",
    localAccessUser,
    localAccessToken: gatewayLocation === "local" && localAccessUser ? deriveLocalAccessToken(sessionSecret) : void 0,
    mode,
    hfToken: readOptionalSecret(trim(env.MLCLAW_TRUSTED_HF_TOKEN_FILE)) ?? trim(env.HF_TOKEN ?? env.HUGGINGFACE_HUB_TOKEN),
    routerToken: trim(env.MLCLAW_ROUTER_TOKEN ?? env.HF_ROUTER_TOKEN),
    brokerAgentUrl: trim(env.MLCLAW_HF_BROKER_URL),
    brokerAgentSecret: readOptionalSecret(trim(env.MLCLAW_HF_BROKER_AGENT_SECRET_FILE)),
    brokerAgentSecretFile: trim(env.MLCLAW_HF_BROKER_AGENT_SECRET_FILE),
    operatorBrokers: loadOperatorBrokers(trim(env.MLCLAW_OPERATOR_BROKERS_FILE)),
    unyoloPopoverDecisions: env.MLCLAW_UNYOLO_POPOVER_DECISIONS !== "0" && env.MLCLAW_UNYOLO_POPOVER_DECISIONS !== "false",
    hubUrl: trim(env.HF_ENDPOINT) ?? "https://huggingface.co",
    openaiCredentialFile: trim(env.MLCLAW_OPENAI_CREDENTIAL_FILE) ?? "/tmp/mlclaw-secrets/openai.env",
    openaiCredentialStoreFile,
    mcpCredentialFile,
    hfMcpUrl: trim(env.MLCLAW_HF_MCP_URL) ?? "https://huggingface.co/mcp?bouquet=hf",
    researchMcpUrl: trim(env.MLCLAW_RESEARCH_MCP_URL) ?? "https://evalstate-research-agent-two.hf.space/mcp",
    researchTimeoutMs: integer(env.MLCLAW_RESEARCH_TIMEOUT_MS, 30 * 60 * 1e3),
    researchPollMs: integer(env.MLCLAW_RESEARCH_POLL_MS, 1500),
    runtimeSettingsFile,
    runtimeSettingsGeneration: runtimeSettings2?.generation ?? 0,
    bootstrapModel,
    bootstrapUpdatedAt: trim(env.MLCLAW_DEPLOYMENT_UPDATED_AT),
    openclawConfigPath: trim(env.OPENCLAW_CONFIG_PATH) ?? "/home/node/.local/share/mlclaw/live/.openclaw/openclaw.json",
    openclawCommand,
    openclawArgs,
    unyoloPluginPath: trim(env.MLCLAW_UNYOLO_PLUGIN_PATH) ?? "/opt/openclaw-plugins/node_modules/openclaw-unyolo",
    telegramBotMuxConfigPath,
    telegramBotMuxReadyUrl: telegramBotMuxConfigPath ? "http://127.0.0.1:7865/readyz" : void 0,
    unyoloTelegramConfigPath: optionalAbsolutePath(
      env.MLCLAW_UNYOLO_TELEGRAM_CONFIG_PATH,
      "MLCLAW_UNYOLO_TELEGRAM_CONFIG_PATH"
    ),
    agentName,
    model,
    modelChoices: runtimeSettings2?.modelChoices ?? parseModelChoicesEnv(env.MLCLAW_MODEL_CHOICES, model),
    routerModelsUrl: trim(env.MLCLAW_ROUTER_MODELS_URL) ?? "https://router.huggingface.co/v1/models",
    stateBucket,
    stateMountDir,
    statePrefix,
    gatewayLocation,
    runtimeImage: trim(env.MLCLAW_RUNTIME_IMAGE),
    runtimeId: trim(env.MLCLAW_RUNTIME_ID),
    deploymentId: trim(env.MLCLAW_DEPLOYMENT_ID),
    templateRev: trim(env.MLCLAW_TEMPLATE_REV),
    codexAuthStoreFile,
    assetsDir: trim(env.MLCLAW_ASSETS_DIR) ?? "/app/assets",
    branding: resolveBranding(env, agentName)
  };
}
var SESSION_COOKIE_PREFIX = "mlclaw_session";
function localSessionCookieName(identity) {
  return `${SESSION_COOKIE_PREFIX}_${createHash("sha256").update(identity).digest("hex").slice(0, 12)}`;
}
function accessOriginsFromEnv(env, publicUrl) {
  const configured = (env.MLCLAW_ACCESS_ORIGINS ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  if (configured.length > 8) {
    throw new Error("MLCLAW_ACCESS_ORIGINS supports at most 8 origins");
  }
  const origins = [.../* @__PURE__ */ new Set([publicUrl, ...configured.map(parseAccessOrigin)])];
  if (origins.length > 8) {
    throw new Error("MLCLAW_ACCESS_ORIGINS supports at most 8 origins including MLCLAW_PUBLIC_URL");
  }
  return origins;
}
function parseAccessOrigin(value) {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:" || url.username || url.password || url.hostname.includes("*") || url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      "MLCLAW_ACCESS_ORIGINS entries must be HTTP origins without credentials, wildcard hosts, paths, queries, or fragments"
    );
  }
  return url.origin;
}
function readOptionalSecret(file) {
  if (!file) {
    return void 0;
  }
  try {
    return trim(readFileSync3(file, "utf8"));
  } catch {
    return void 0;
  }
}
function integrationCredentialSlot(config2) {
  return config2.adminUsers[0];
}
function pathDirname(file) {
  const slash = file.lastIndexOf("/");
  return slash > 0 ? file.slice(0, slash) : ".";
}
function resolveMode(params) {
  if (params.env.MLCLAW_FORCE_TEMPLATE === "1") {
    return "template";
  }
  if (params.env.MLCLAW_FORCE_APP === "1") {
    return "app";
  }
  const isCanonicalSpace = Boolean(params.spaceId && params.spaceId === params.canonicalSpaceId);
  if (!isCanonicalSpace) {
    return "app";
  }
  if (!params.canonicalCreatorUserId || !params.spaceCreatorUserId) {
    return "template";
  }
  return params.canonicalCreatorUserId === params.spaceCreatorUserId ? "template" : "app";
}
function publicUrlFromEnv(env, port) {
  const explicit = trim(env.MLCLAW_PUBLIC_URL);
  if (explicit) {
    const url = new URL(explicit);
    if (url.protocol !== "http:" && url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
      throw new Error("MLCLAW_PUBLIC_URL must be one HTTP origin without credentials, path, query, or fragment");
    }
    return url.origin;
  }
  const host = trim(env.SPACE_HOST);
  if (host) {
    return host.startsWith("http") ? host.replace(/\/+$/, "") : `https://${host.replace(/\/+$/, "")}`;
  }
  return `http://127.0.0.1:${port}`;
}
function ownerFromSpaceId(spaceId) {
  return ownerFromRepoId(spaceId);
}
function ownerFromRepoId(repoId) {
  const owner = repoId?.split("/")[0]?.trim();
  return owner || void 0;
}
function integer(value, fallback) {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function splitUsers(value) {
  return (value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
}
function uniqueUsers(users) {
  return [...new Set(users)];
}
function splitArgs(value) {
  const trimmed = trim(value);
  return trimmed ? trimmed.split(/\s+/).filter(Boolean) : void 0;
}
function trim(value) {
  const trimmed = value?.trim();
  return trimmed || void 0;
}
function optionalAbsolutePath(value, name) {
  const path10 = trim(value);
  if (path10 && !isAbsolute2(path10)) throw new Error(`${name} must be absolute`);
  return path10;
}

// src/mlclaw-space-runtime/openclaw-config.ts
import fs3 from "node:fs/promises";
import path3 from "node:path";

// src/mlclaw-space-runtime/openai-models.ts
var LEGACY_CODEX_MODEL_REF = "mlclaw-codex/gpt-5.4";
var DEFAULT_OPENAI_MODEL_REF = "openai/gpt-5.4";

// src/mlclaw-space-runtime/openclaw-oauth-profile.ts
import { constants as fsConstants } from "node:fs";
import fs2 from "node:fs/promises";
import path2 from "node:path";
import { spawn } from "node:child_process";
var OPENAI_OAUTH_PROFILE_ID = "openai:mlclaw";
var MAX_HELPER_OUTPUT_BYTES = 64 * 1024;
var PROFILE_HELPER_SCRIPT = String.raw`
import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const input = fs.readFileSync(0, "utf8");
const payload = JSON.parse(input);
const require = createRequire(pathToFileURL(payload.openclawEntry));
const sdkPath = require.resolve("openclaw/plugin-sdk/provider-auth");
const { updateAuthProfileStoreWithLock } = await import(pathToFileURL(sdkPath).href);

const result = await updateAuthProfileStoreWithLock({
  agentDir: payload.agentDir,
  saveOptions: { filterExternalAuthProfiles: false, syncExternalCli: false },
  updater(store) {
    const profileId = payload.profileId;
    const existing = store.profiles[profileId];
    if (payload.operation === "remove") {
      let changed = false;
      if (existing) {
        delete store.profiles[profileId];
        changed = true;
      }
      if (store.usageStats?.[profileId]) {
        delete store.usageStats[profileId];
        changed = true;
      }
      if (store.lastGood) {
        for (const [provider, value] of Object.entries(store.lastGood)) {
          if (value === profileId) {
            delete store.lastGood[provider];
            changed = true;
          }
        }
      }
      if (store.order) {
        for (const [provider, order] of Object.entries(store.order)) {
          const next = Array.isArray(order) ? order.filter((value) => value !== profileId) : order;
          if (Array.isArray(order) && next.length !== order.length) {
            changed = true;
            if (next.length > 0) store.order[provider] = next;
            else delete store.order[provider];
          }
        }
      }
      return changed;
    }

    const incoming = payload.credential;
    if (
      existing?.type === "oauth" &&
      existing.provider === "openai" &&
      existing.accountId === incoming.accountId &&
      Number(existing.expires) >= Number(incoming.expires)
    ) {
      return false;
    }
    store.profiles[profileId] = incoming;
    const currentOrder = Array.isArray(store.order?.openai) ? store.order.openai : [];
    store.order = {
      ...store.order,
      openai: [profileId, ...currentOrder.filter((value) => value !== profileId)],
    };
    return true;
  },
});

if (!result) throw new Error("OpenClaw auth profile store was unavailable");
process.stdout.write(JSON.stringify({ ok: true }) + "\n");
`;
async function syncOpenAiOAuthProfile(params) {
  const openclawEntry = await resolveOpenClawEntry(params.config.openclawCommand, params.env.PATH);
  if (!openclawEntry) return false;
  const agentDir = path2.join(path2.dirname(params.config.openclawConfigPath), "agents", "main", "agent");
  const credential = params.credential ? {
    type: "oauth",
    provider: "openai",
    access: params.credential.access,
    refresh: params.credential.refresh,
    expires: params.credential.expires,
    accountId: params.credential.accountId,
    ...params.credential.idToken ? { idToken: params.credential.idToken } : {},
    displayName: "MLClaw ChatGPT"
  } : void 0;
  await runProfileHelper({
    openclawEntry,
    agentDir,
    env: params.env,
    payload: {
      operation: credential ? "upsert" : "remove",
      profileId: OPENAI_OAUTH_PROFILE_ID,
      ...credential ? { credential } : {}
    },
    ...process.getuid?.() === 0 ? { uid: params.config.openclawUid, gid: params.config.openclawGid } : {}
  });
  return true;
}
async function resolveOpenClawEntry(command, pathValue) {
  const candidate = command.includes(path2.sep) ? path2.resolve(command) : await findOnPath(command, pathValue);
  if (!candidate) return void 0;
  try {
    const real = await fs2.realpath(candidate);
    if (path2.basename(real) !== "openclaw.mjs") return void 0;
    return real;
  } catch {
    return void 0;
  }
}
async function findOnPath(command, pathValue) {
  for (const directory of (pathValue ?? "").split(path2.delimiter)) {
    if (!directory) continue;
    const candidate = path2.join(directory, command);
    try {
      await fs2.access(candidate, fsConstants.X_OK);
      return candidate;
    } catch {
    }
  }
  return void 0;
}
async function runProfileHelper(params) {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["--input-type=module", "--eval", PROFILE_HELPER_SCRIPT], {
      stdio: ["pipe", "pipe", "pipe"],
      env: params.env,
      ...params.uid !== void 0 ? { uid: params.uid } : {},
      ...params.gid !== void 0 ? { gid: params.gid } : {}
    });
    let stdout = "";
    let stderr = "";
    const append = (current, chunk) => `${current}${chunk.toString("utf8")}`.slice(-MAX_HELPER_OUTPUT_BYTES);
    child.stdout.on("data", (chunk) => {
      stdout = append(stdout, chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr = append(stderr, chunk);
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0 && stdout.includes('"ok":true')) {
        resolve();
        return;
      }
      reject(
        new Error(
          `OpenClaw OAuth profile update failed (code=${code ?? "null"}, signal=${signal ?? "null"}): ${sanitizeHelperError(stderr)}`
        )
      );
    });
    child.stdin.end(
      JSON.stringify({
        ...params.payload,
        openclawEntry: params.openclawEntry,
        agentDir: params.agentDir
      })
    );
  });
}
function sanitizeHelperError(value) {
  return value.replace(/[\r\n\t]+/gu, " ").trim().slice(0, 512) || "unknown error";
}

// src/mlclaw-space-runtime/mcp-integrations.ts
import { createHmac as createHmac2, timingSafeEqual as timingSafeEqual2 } from "node:crypto";
import http from "node:http";
import { Readable } from "node:stream";
var MAX_REQUEST_BYTES = 16 * 1024 * 1024;
var UPSTREAM_TIMEOUT_MS = 12e4;
var INTERNAL_HEADER = "x-mlclaw-mcp-key";
var McpIntegrationServer = class {
  constructor(config2, credentials, fetchFn = fetch) {
    this.config = config2;
    this.credentials = credentials;
    this.fetchFn = fetchFn;
    this.internalToken = deriveInternalToken(config2.sessionSecret);
  }
  server;
  internalToken;
  activeRequests = /* @__PURE__ */ new Set();
  managedServerConfig() {
    return managedMcpServerConfig(this.config);
  }
  async start() {
    if (this.server) {
      return;
    }
    const server2 = http.createServer((req, res) => {
      const controller = new AbortController();
      const abort = () => controller.abort();
      this.activeRequests.add(controller);
      req.once("aborted", abort);
      res.once("close", abort);
      this.handle(req, res, controller.signal).catch((err) => {
        if (controller.signal.aborted) {
          res.destroy();
          return;
        }
        process.stderr.write(`[mlclaw] MCP integration request failed: ${safeError(err)}
`);
        if (!res.headersSent) {
          writeJson(res, 502, mcpError(null, -32603, "MCP integration request failed"));
        } else {
          res.end();
        }
      }).finally(() => {
        req.off("aborted", abort);
        res.off("close", abort);
        this.activeRequests.delete(controller);
      });
    });
    await new Promise((resolve, reject) => {
      server2.once("error", reject);
      server2.listen(this.config.mcpPort, "127.0.0.1", () => {
        server2.off("error", reject);
        resolve();
      });
    });
    this.server = server2;
    process.stdout.write(`[mlclaw] MCP integrations listening on 127.0.0.1:${this.config.mcpPort}
`);
  }
  async stop() {
    const server2 = this.server;
    this.server = void 0;
    if (!server2) {
      return;
    }
    const closed = new Promise((resolve) => server2.close(() => resolve()));
    for (const controller of this.activeRequests) {
      controller.abort();
    }
    server2.closeAllConnections();
    await closed;
  }
  async handle(req, res, signal) {
    const pathname = new URL(req.url ?? "/", "http://127.0.0.1").pathname;
    if (!validInternalToken(req.headers[INTERNAL_HEADER], this.internalToken)) {
      writeJson(res, 401, mcpError(null, -32001, "Unauthorized"));
      return;
    }
    const body = await readBody(req, MAX_REQUEST_BYTES);
    if (pathname !== "/mcp/huggingface" && pathname !== "/mcp/research") {
      writeJson(res, 404, mcpError(null, -32601, "Not found"));
      return;
    }
    let accessToken;
    try {
      accessToken = await this.integrationAccessToken();
    } catch (err) {
      writeJson(res, 503, mcpError(null, -32002, safeError(err)));
      return;
    }
    if (pathname === "/mcp/research" && req.method === "POST") {
      const parsed = parseJsonRpc(body);
      if (parsed?.method === "tools/call" && toolName(parsed) === "research") {
        await this.handleResearchCall(req, res, body, parsed, accessToken, signal);
        return;
      }
    }
    await forwardStreaming({
      req,
      res,
      body,
      url: pathname === "/mcp/huggingface" ? this.config.hfMcpUrl : this.config.researchMcpUrl,
      accessToken,
      signal
    });
  }
  async handleResearchCall(req, res, body, request, accessToken, signal) {
    const deadline = Date.now() + this.config.researchTimeoutMs;
    const initial = await forwardBuffered({
      method: req.method ?? "POST",
      requestHeaders: req.headers,
      body,
      url: this.config.researchMcpUrl,
      accessToken,
      timeoutMs: remainingUpstreamTimeout(deadline),
      signal
    });
    const message = parseMcpResponse(initial.body);
    const prefab = prefabJob(message);
    if (!prefab) {
      writeBuffered(res, initial);
      return;
    }
    const sessionId = requestHeader(req.headers, "mcp-session-id");
    const protocolVersion = requestHeader(req.headers, "mcp-protocol-version");
    if (!sessionId) {
      writeJson(res, 502, mcpError(request.id ?? null, -32603, "Research Agent did not establish an MCP session"));
      return;
    }
    try {
      const startToken = await this.integrationAccessToken();
      await this.callResearchBackend({
        sessionId,
        tool: prefab.startTool,
        arguments: { job_id: prefab.jobId },
        accessToken: startToken,
        id: `${String(request.id ?? "research")}:start`,
        protocolVersion,
        timeoutMs: remainingUpstreamTimeout(deadline),
        signal
      });
      let status;
      while (Date.now() < deadline) {
        if (res.destroyed) {
          return;
        }
        const pollToken = await this.integrationAccessToken();
        const remainingMs = deadline - Date.now();
        if (remainingMs <= 0) {
          break;
        }
        const deadlineBound = remainingMs <= UPSTREAM_TIMEOUT_MS;
        let result;
        try {
          result = await this.callResearchBackend({
            sessionId,
            tool: prefab.statusTool,
            arguments: { job_id: prefab.jobId },
            accessToken: pollToken,
            id: `${String(request.id ?? "research")}:status`,
            protocolVersion,
            timeoutMs: Math.min(UPSTREAM_TIMEOUT_MS, remainingMs),
            signal
          });
        } catch (err) {
          if (deadlineBound && isTimeoutError(err) && !signal.aborted) {
            break;
          }
          throw err;
        }
        status = toolResultObject(result);
        if (status?.done === true) {
          const error = stringValue2(status.error);
          const resultText = stringValue2(status.result);
          writeJson(res, 200, {
            jsonrpc: "2.0",
            id: request.id ?? null,
            result: {
              content: [
                {
                  type: "text",
                  text: error ? `Research failed: ${error}` : resultText ?? `Research completed. Job: ${prefab.jobId}`
                }
              ],
              structuredContent: redactResearchStatus(status),
              isError: Boolean(error)
            }
          });
          return;
        }
        await delay(Math.min(this.config.researchPollMs, Math.max(0, deadline - Date.now())), signal);
      }
      writeJson(res, 200, {
        jsonrpc: "2.0",
        id: request.id ?? null,
        result: {
          content: [{ type: "text", text: `Research is still running. Job: ${prefab.jobId}` }],
          structuredContent: redactResearchStatus(status ?? { job_id: prefab.jobId, status: "running", done: false }),
          isError: false
        }
      });
    } catch (err) {
      if (err instanceof ResearchRpcError) {
        writeJson(res, 200, mcpError(request.id ?? null, err.code, err.message));
        return;
      }
      throw err;
    }
  }
  async callResearchBackend(params) {
    const response = await forwardBuffered({
      method: "POST",
      requestHeaders: {
        accept: "application/json, text/event-stream",
        "content-type": "application/json",
        "mcp-session-id": params.sessionId,
        ...params.protocolVersion ? { "mcp-protocol-version": params.protocolVersion } : {}
      },
      body: Buffer.from(
        JSON.stringify({
          jsonrpc: "2.0",
          id: params.id,
          method: "tools/call",
          params: { name: params.tool, arguments: params.arguments }
        })
      ),
      url: this.config.researchMcpUrl,
      accessToken: params.accessToken,
      ...params.timeoutMs !== void 0 ? { timeoutMs: params.timeoutMs } : {},
      signal: params.signal
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Research Agent returned HTTP ${response.status}`);
    }
    const parsed = parseMcpResponse(response.body);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Research Agent returned an invalid MCP response");
    }
    const rpcError = objectValue(parsed.error);
    if (rpcError) {
      throw new ResearchRpcError(
        numberValue(rpcError.code) ?? -32603,
        stringValue2(rpcError.message) ?? "Research Agent request failed"
      );
    }
    const toolError = mcpToolError(parsed);
    if (toolError) {
      throw new ResearchRpcError(-32003, toolError);
    }
    return parsed;
  }
  async integrationAccessToken() {
    if (this.config.gatewayLocation === "local" && this.config.hfToken) {
      return this.config.hfToken;
    }
    const credentialSlot = integrationCredentialSlot(this.config);
    if (!credentialSlot) {
      throw new Error("ML Claw has no primary admin");
    }
    return this.credentials.accessToken(credentialSlot);
  }
};
var ResearchRpcError = class extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = "ResearchRpcError";
  }
};
function deriveInternalToken(secret) {
  return createHmac2("sha256", secret).update("mlclaw:mcp-integrations:v1").digest("base64url");
}
function managedMcpServerConfig(config2) {
  const headers = { [INTERNAL_HEADER]: deriveInternalToken(config2.sessionSecret) };
  return {
    huggingface: {
      url: `http://127.0.0.1:${config2.mcpPort}/mcp/huggingface`,
      transport: "streamable-http",
      headers,
      supportsParallelToolCalls: true
    },
    "research-agent": {
      url: `http://127.0.0.1:${config2.mcpPort}/mcp/research`,
      transport: "streamable-http",
      headers,
      supportsParallelToolCalls: false
    }
  };
}
async function forwardStreaming(params) {
  const timed = timedAbortSignal(params.signal, UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch(params.url, {
      method: params.req.method ?? "POST",
      headers: upstreamHeaders(params.req.headers, params.accessToken),
      ...params.body.byteLength > 0 ? { body: Buffer.from(params.body) } : {},
      redirect: "error",
      signal: timed.signal
    });
    params.res.writeHead(response.status, responseHeaders(response.headers));
    if (!response.body) {
      params.res.end();
      return;
    }
    await pipeResponseBody(response.body, params.res);
  } finally {
    timed.dispose();
  }
}
async function forwardBuffered(params) {
  const timed = timedAbortSignal(params.signal, params.timeoutMs ?? UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch(params.url, {
      method: params.method,
      headers: upstreamHeaders(params.requestHeaders, params.accessToken),
      ...params.body.byteLength > 0 ? { body: Buffer.from(params.body) } : {},
      redirect: "error",
      signal: timed.signal
    });
    return {
      status: response.status,
      headers: response.headers,
      body: new Uint8Array(await response.arrayBuffer())
    };
  } finally {
    timed.dispose();
  }
}
function upstreamHeaders(headers, accessToken) {
  const out = new Headers({ authorization: `Bearer ${accessToken}` });
  for (const name of ["accept", "content-type", "mcp-session-id", "mcp-protocol-version", "last-event-id"]) {
    const value = requestHeader(headers, name);
    if (value) {
      out.set(name, value);
    }
  }
  return out;
}
function responseHeaders(headers) {
  const out = {};
  for (const name of [
    "content-type",
    "cache-control",
    "mcp-session-id",
    "mcp-protocol-version",
    "www-authenticate",
    "retry-after"
  ]) {
    const value = headers.get(name);
    if (value) {
      out[name] = value;
    }
  }
  return out;
}
function writeBuffered(res, response) {
  const headers = responseHeaders(response.headers);
  headers["content-length"] = response.body.byteLength;
  res.writeHead(response.status, headers);
  res.end(response.body);
}
async function readBody(req, limit) {
  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    length += buffer.length;
    if (length > limit) {
      throw new Error("MCP request body is too large");
    }
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}
function parseJsonRpc(body) {
  try {
    const value = JSON.parse(Buffer.from(body).toString("utf8"));
    return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
  } catch {
    return void 0;
  }
}
function parseMcpResponse(body) {
  const text = Buffer.from(body).toString("utf8").trim();
  if (!text) {
    return void 0;
  }
  const candidates = text.startsWith("{") ? [text] : text.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim());
  for (const candidate of candidates.reverse()) {
    try {
      const value = JSON.parse(candidate);
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
    } catch {
    }
  }
  return void 0;
}
function prefabJob(message) {
  const result = objectValue(message?.result);
  const structured = objectValue(result?.structuredContent);
  const prefab = objectValue(structured?.$prefab);
  const state = objectValue(prefab?.state);
  const view = objectValue(prefab?.view);
  const jobId = stringValue2(state?.job_id);
  const startTool = findActionTool(view, "_start_research");
  const statusTool = findActionTool(view, "_research_status");
  return jobId && startTool && statusTool ? { jobId, startTool, statusTool } : void 0;
}
function findActionTool(value, suffix) {
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findActionTool(item, suffix);
      if (found) {
        return found;
      }
    }
    return void 0;
  }
  if (!value || typeof value !== "object") {
    return void 0;
  }
  const record = value;
  const tool = stringValue2(record.tool);
  if (record.action === "toolCall" && tool?.endsWith(suffix)) {
    return tool;
  }
  for (const item of Object.values(record)) {
    const found = findActionTool(item, suffix);
    if (found) {
      return found;
    }
  }
  return void 0;
}
function toolName(request) {
  return stringValue2(objectValue(request.params)?.name);
}
function toolResultObject(message) {
  const result = objectValue(message.result);
  const structured = objectValue(result?.structuredContent);
  if (structured) {
    return structured;
  }
  const content = Array.isArray(result?.content) ? result.content : [];
  for (const item of content) {
    const text = stringValue2(objectValue(item)?.text);
    if (!text) {
      continue;
    }
    try {
      const value = JSON.parse(text);
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
    } catch {
    }
  }
  return void 0;
}
function mcpToolError(message) {
  const result = objectValue(message.result);
  if (result?.isError !== true) {
    return void 0;
  }
  const content = Array.isArray(result.content) ? result.content : [];
  const detail = content.map((item) => stringValue2(objectValue(item)?.text)).filter((text) => Boolean(text)).join("\n").trim();
  return detail || "Research Agent tool failed";
}
function redactResearchStatus(status) {
  return Object.fromEntries(
    Object.entries(status).filter(
      ([key]) => !["auth", "token", "access_token", "refresh_token"].includes(key.toLowerCase())
    )
  );
}
function mcpError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
function writeJson(res, status, value) {
  const body = `${JSON.stringify(value)}
`;
  res.writeHead(status, {
    "cache-control": "no-store",
    "content-length": Buffer.byteLength(body),
    "content-type": "application/json; charset=utf-8"
  });
  res.end(body);
}
async function pipeResponseBody(body, response) {
  await new Promise((resolve, reject) => {
    const stream = Readable.fromWeb(body);
    stream.once("error", reject);
    response.once("error", reject);
    response.once("finish", resolve);
    stream.pipe(response);
  });
}
function validInternalToken(value, expected) {
  if (typeof value !== "string") {
    return false;
  }
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual2(actualBuffer, expectedBuffer);
}
function requestHeader(headers, name) {
  const value = headers[name];
  return Array.isArray(value) ? value[0] : value;
}
function objectValue(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function stringValue2(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function numberValue(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function safeError(err) {
  return err instanceof Error ? err.message : "unknown error";
}
function delay(ms, signal) {
  if (signal.aborted) {
    return Promise.reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
  }
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, ms);
    const abort = () => {
      clearTimeout(timer);
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", abort, { once: true });
  });
}
function timedAbortSignal(parent, timeoutMs) {
  const controller = new AbortController();
  const abort = () => controller.abort(parent.reason);
  if (parent.aborted) {
    abort();
  } else {
    parent.addEventListener("abort", abort, { once: true });
  }
  const timeout = setTimeout(() => controller.abort(new DOMException("Timed out", "TimeoutError")), timeoutMs);
  return {
    signal: controller.signal,
    dispose: () => {
      clearTimeout(timeout);
      parent.removeEventListener("abort", abort);
    }
  };
}
function isTimeoutError(err) {
  return err instanceof Error && err.name === "TimeoutError";
}
function remainingUpstreamTimeout(deadline) {
  return Math.max(1, Math.min(UPSTREAM_TIMEOUT_MS, deadline - Date.now()));
}

// src/mlclaw-space-runtime/openclaw-config.ts
var BROKER_MCP_CONNECTION_TIMEOUT_MS = 1e4;
var BROKER_MCP_REQUEST_TIMEOUT_MS = 45e3;
var BROKER_SECRET_PROVIDER = "mlclaw_hf_broker";
var AUTOMATIC_SESSION_RESET_DISABLED_MINUTES = 2147483647;
async function prepareUnyoloConfig(configPath) {
  const parsed = objectValue2(JSON.parse(await fs3.readFile(configPath, "utf8")));
  if (!parsed) throw new Error("OpenClaw configuration must be an object");
  removeSupersededPluginConfig(parsed);
  await fs3.writeFile(configPath, `${JSON.stringify(parsed, null, 2)}
`, { mode: 384 });
  await fs3.chmod(configPath, 384);
}
async function configureOpenClawGateway(config2, options = {}) {
  const raw2 = await fs3.readFile(config2.openclawConfigPath, "utf8");
  const openclawConfig = migrateLegacyCodexModelRefs(JSON.parse(raw2));
  const gateway = object(openclawConfig, "gateway");
  gateway.mode = "local";
  gateway.bind = "loopback";
  gateway.port = config2.openclawPort;
  gateway.auth = {
    mode: "trusted-proxy",
    identityScopes: Object.fromEntries(config2.adminUsers.map((user) => [user, ["operator.admin"]])),
    trustedProxy: {
      userHeader: "x-forwarded-user",
      requiredHeaders: ["x-forwarded-proto", "x-forwarded-host"],
      allowUsers: config2.allowedUsers,
      allowLoopback: true,
      deviceAutoApprove: {
        enabled: true,
        scopes: ["operator.read", "operator.write", "operator.approvals"]
      }
    }
  };
  gateway.trustedProxies = ["127.0.0.1", "::1"];
  const supportedControlUi = typeof gateway.controlUi === "object" && gateway.controlUi ? { ...gateway.controlUi } : {};
  delete supportedControlUi.dangerouslyDisableDeviceAuth;
  gateway.controlUi = {
    ...supportedControlUi,
    allowedOrigins: config2.accessOrigins,
    embedSandbox: "scripts"
  };
  const codexConfigured = Boolean(options.codexConfigured);
  const openAiConfigured2 = Boolean(options.openAiConfigured);
  configureOpenClawModels(openclawConfig, config2, codexConfigured, openAiConfigured2);
  configureOpenAiAuthMetadata(openclawConfig, codexConfigured);
  configureCodexRuntimePlugin(openclawConfig, codexConfigured || openAiConfigured2);
  disableAutomaticSessionResets(openclawConfig);
  configureManagedMcpServers(openclawConfig, config2);
  configureBrokerMcpServer(openclawConfig, config2);
  configureUnyoloPlugin(openclawConfig, config2);
  await fs3.mkdir(path3.dirname(config2.openclawConfigPath), { recursive: true });
  await fs3.writeFile(config2.openclawConfigPath, `${JSON.stringify(openclawConfig, null, 2)}
`, { mode: 384 });
  await fs3.chmod(config2.openclawConfigPath, 384);
  if (process.getuid?.() === 0) {
    await fs3.chown(config2.openclawConfigPath, config2.openclawUid, config2.openclawGid);
  }
}
function disableAutomaticSessionResets(openclawConfig) {
  const session = object(openclawConfig, "session");
  session.reset = {
    mode: "idle",
    idleMinutes: AUTOMATIC_SESSION_RESET_DISABLED_MINUTES
  };
  delete session.idleMinutes;
  delete session.resetByType;
  delete session.resetByChannel;
  const maintenance = object(session, "maintenance");
  maintenance.resetArchiveRetention = false;
}
function configureBrokerMcpServer(openclawConfig, config2) {
  const servers = object(object(openclawConfig, "mcp"), "servers");
  if (!config2.brokerAgentUrl || !config2.brokerAgentSecretFile) {
    delete servers["huggingface-broker"];
    return;
  }
  const existing = objectValue2(servers["huggingface-broker"]);
  servers["huggingface-broker"] = {
    ...preservedBrokerMcpFields(existing),
    command: "/usr/local/bin/hf-broker",
    args: ["mcp"],
    connectionTimeoutMs: BROKER_MCP_CONNECTION_TIMEOUT_MS,
    requestTimeoutMs: BROKER_MCP_REQUEST_TIMEOUT_MS,
    env: {
      HF_BROKER_AGENT_ENDPOINT: brokerAgentEndpoint(config2.brokerAgentUrl),
      HF_BROKER_SHARED_SECRET_FILE: config2.brokerAgentSecretFile
    },
    ...existing?.enabled === false ? { enabled: false } : { enabled: true }
  };
}
function brokerAgentEndpoint(agentUrl) {
  const parsed = new URL(agentUrl);
  if (parsed.protocol !== "http:" || !parsed.port || parsed.username || parsed.password) {
    throw new Error("HF Broker agent URL must be an unauthenticated HTTP URL with an explicit port");
  }
  return `tcp://${parsed.host}`;
}
function preservedBrokerMcpFields(existing) {
  const codex = preservedBrokerCodexConfig(objectValue2(existing?.codex));
  return {
    ...existing?.toolFilter && typeof existing.toolFilter === "object" ? { toolFilter: existing.toolFilter } : {},
    ...typeof existing?.supportsParallelToolCalls === "boolean" ? { supportsParallelToolCalls: existing.supportsParallelToolCalls } : {},
    ...codex ? { codex } : {}
  };
}
function preservedBrokerCodexConfig(existing) {
  const agents = brokerAgentScope(existing?.agents);
  const defaultToolsApprovalMode = brokerApprovalMode(existing?.defaultToolsApprovalMode);
  const nativeApprovalMode = brokerApprovalMode(existing?.default_tools_approval_mode);
  const preserved = {
    ...agents ? { agents } : {},
    ...defaultToolsApprovalMode ? { defaultToolsApprovalMode } : {},
    ...nativeApprovalMode ? { default_tools_approval_mode: nativeApprovalMode } : {}
  };
  return Object.keys(preserved).length > 0 ? preserved : void 0;
}
function brokerAgentScope(value) {
  if (!Array.isArray(value)) return void 0;
  const agents = value.filter((agent) => typeof agent === "string" && /^[a-z0-9][a-z0-9_-]{0,63}$/iu.test(agent.trim())).map((agent) => agent.trim());
  return agents.length > 0 ? agents : void 0;
}
function brokerApprovalMode(value) {
  return value === "auto" || value === "prompt" || value === "approve" ? value : void 0;
}
function configureCodexRuntimePlugin(openclawConfig, enabled) {
  const plugins = object(openclawConfig, "plugins");
  const entries = object(plugins, "entries");
  const existing = objectValue2(entries.codex);
  if (!enabled) {
    if (existing) entries.codex = { ...existing, enabled: false };
    return;
  }
  if (plugins.allow !== void 0) {
    plugins.allow = uniqueStrings(uniqueStrings(plugins.allow, "openai"), "codex");
  }
  const existingConfig = objectValue2(existing?.config);
  const existingAppServer = objectValue2(existingConfig?.appServer);
  entries.codex = {
    ...existing,
    enabled: true,
    config: {
      ...existingConfig,
      appServer: {
        ...existingAppServer,
        clearEnv: uniqueStrings(existingAppServer?.clearEnv, "OPENCLAW_GATEWAY_PASSWORD")
      }
    }
  };
}
function configureUnyoloPlugin(openclawConfig, config2) {
  removeSupersededPluginConfig(openclawConfig);
  const plugins = object(openclawConfig, "plugins");
  const load = object(plugins, "load");
  load.paths = uniqueStrings(load.paths, config2.unyoloPluginPath);
  if (plugins.allow !== void 0) plugins.allow = uniqueStrings(plugins.allow, "unyolo");
  const entries = object(plugins, "entries");
  entries.unyolo = {
    enabled: true,
    config: {
      mode: "delegated-web",
      delegatedWeb: { basePath: "/trusted-host/api/unyolo" }
    }
  };
}
async function managedMcpServerStatus(config2) {
  const raw2 = JSON.parse(await fs3.readFile(config2.openclawConfigPath, "utf8"));
  const servers = object(object(raw2, "mcp"), "servers");
  return [
    { id: "huggingface", name: "Hugging Face MCP" },
    { id: "research-agent", name: "Research Agent" }
  ].map((server2) => ({
    ...server2,
    enabled: objectValue2(servers[server2.id])?.enabled !== false
  }));
}
function configureManagedMcpServers(openclawConfig, config2) {
  const mcp = object(openclawConfig, "mcp");
  const servers = object(mcp, "servers");
  delete servers.codex;
  for (const [name, managed] of Object.entries(managedMcpServerConfig(config2))) {
    const existing = servers[name];
    const userFields = existing && typeof existing === "object" && !Array.isArray(existing) ? existing : {};
    servers[name] = {
      ...userFields,
      ...managed,
      ...userFields.enabled === false ? { enabled: false } : { enabled: true },
      ...userFields.toolFilter && typeof userFields.toolFilter === "object" ? { toolFilter: userFields.toolFilter } : {}
    };
  }
}
function configureOpenClawModels(openclawConfig, config2, codexConfigured, openAiConfigured2) {
  const routerChoices = config2.modelChoices;
  configureAgentModelChoices(
    object(object(openclawConfig, "agents"), "defaults"),
    config2,
    routerChoices,
    codexConfigured,
    openAiConfigured2
  );
  const models = object(openclawConfig, "models");
  models.mode = "merge";
  const providers = object(models, "providers");
  configureHuggingFaceProvider(openclawConfig, object(providers, "huggingface"), config2, routerChoices);
  configureNativeOpenAiProvider(providers);
}
function configureAgentModelChoices(defaults, config2, routerChoices, codexConfigured, openAiConfigured2) {
  const existingModel = objectValue2(defaults.model) ?? {};
  const openAiAvailable = codexConfigured || openAiConfigured2;
  const primary = resolvePrimaryModel({
    existing: existingModel.primary,
    requested: replaceLegacyCodexModelRef(config2.model),
    openAiAvailable,
    ...routerChoices[0]?.openclawModel ? { fallback: routerChoices[0].openclawModel } : {}
  });
  defaults.model = {
    ...existingModel,
    ...primary ? { primary } : {}
  };
  defaults.models = {
    ...Object.fromEntries(routerChoices.map((choice) => [choice.openclawModel, { alias: aliasForChoice(choice) }])),
    ...openAiAvailable ? { "openai/*": { agentRuntime: { id: "codex" } } } : {}
  };
}
function resolvePrimaryModel(params) {
  const existing = typeof params.existing === "string" ? params.existing.trim() : void 0;
  if (params.openAiAvailable && existing?.startsWith("openai/")) return existing;
  if (!params.openAiAvailable && params.requested.startsWith("openai/")) return params.fallback;
  return params.requested;
}
function configureHuggingFaceProvider(openclawConfig, huggingface, config2, routerChoices) {
  huggingface.baseUrl = config2.brokerAgentUrl ? `${config2.brokerAgentUrl.replace(/\/+$/, "")}/v1` : "https://router.huggingface.co/v1";
  configureBrokerSecretReference(openclawConfig, huggingface, config2);
  huggingface.api = "openai-completions";
  huggingface.models = routerChoices.map(modelDefinitionFromChoice);
}
function configureBrokerSecretReference(openclawConfig, huggingface, config2) {
  const secrets = object(openclawConfig, "secrets");
  const providers = object(secrets, "providers");
  if (config2.brokerAgentUrl && config2.brokerAgentSecretFile) {
    providers[BROKER_SECRET_PROVIDER] = {
      source: "file",
      path: config2.brokerAgentSecretFile,
      mode: "singleValue"
    };
    huggingface.apiKey = { source: "file", provider: BROKER_SECRET_PROVIDER, id: "value" };
    return;
  }
  delete providers[BROKER_SECRET_PROVIDER];
  delete huggingface.apiKey;
  if (Object.keys(providers).length === 0) delete secrets.providers;
  if (Object.keys(secrets).length === 0) delete openclawConfig.secrets;
}
function configureNativeOpenAiProvider(providers) {
  delete providers["mlclaw-codex"];
  const existing = objectValue2(providers.openai);
  const params = objectValue2(existing?.params);
  if (!params || !("codexProxyBaseUrl" in params)) return;
  const nextParams = { ...params };
  delete nextParams.codexProxyBaseUrl;
  if (existing) {
    if (Object.keys(nextParams).length > 0) existing.params = nextParams;
    else delete existing.params;
  }
}
function configureOpenAiAuthMetadata(openclawConfig, configured) {
  const auth = object(openclawConfig, "auth");
  const profiles = object(auth, "profiles");
  const order = object(auth, "order");
  const existingOrder = Array.isArray(order.openai) ? order.openai.filter((value) => typeof value === "string" && value !== OPENAI_OAUTH_PROFILE_ID) : [];
  if (configured) {
    profiles[OPENAI_OAUTH_PROFILE_ID] = {
      provider: "openai",
      mode: "oauth",
      displayName: "MLClaw ChatGPT"
    };
    order.openai = [OPENAI_OAUTH_PROFILE_ID, ...existingOrder];
  } else {
    delete profiles[OPENAI_OAUTH_PROFILE_ID];
    if (existingOrder.length > 0) order.openai = existingOrder;
    else delete order.openai;
  }
  if (Object.keys(profiles).length === 0) delete auth.profiles;
  if (Object.keys(order).length === 0) delete auth.order;
}
function replaceLegacyCodexModelRef(value) {
  return value === LEGACY_CODEX_MODEL_REF ? DEFAULT_OPENAI_MODEL_REF : value;
}
function migrateLegacyCodexModelRefs(value) {
  if (typeof value === "string") return replaceLegacyCodexModelRef(value);
  if (Array.isArray(value)) return value.map(migrateLegacyCodexModelRefs);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [replaceLegacyCodexModelRef(key), migrateLegacyCodexModelRefs(entry)])
  );
}
function modelDefinitionFromChoice(choice) {
  const providerModelId = providerModelIdFromChoice(choice);
  const reasoning = isReasoningModel(choice.modelId);
  return {
    id: providerModelId,
    name: `${choice.label} (${choice.provider})`,
    input: inputModalitiesForChoice(choice),
    contextWindow: choice.contextLength ?? contextWindowForModel(choice.modelId),
    // Reasoning models need budget for both the thinking phase and the answer;
    // a short cap truncates the turn before any reply content exists.
    maxTokens: reasoning ? 32768 : 8192,
    reasoning,
    cost: modelCostFromChoice(choice),
    api: "openai-completions",
    compat: modelCompatibilityFromChoice(choice)
  };
}
function modelCostFromChoice(choice) {
  return {
    input: choice.pricing?.input ?? 0,
    output: choice.pricing?.output ?? 0,
    cacheRead: 0,
    cacheWrite: 0
  };
}
function modelCompatibilityFromChoice(choice) {
  return {
    supportsTools: choice.supportsTools ?? true,
    supportsStrictMode: choice.supportsStructuredOutput ?? false
  };
}
function providerModelIdFromChoice(choice) {
  const parsed = parseOpenClawModelRef(choice.openclawModel);
  return parsed ? `${parsed.modelId}:${parsed.provider}` : `${choice.modelId}:${choice.provider}`;
}
function inputModalitiesForChoice(choice) {
  if (choice.inputModalities?.length) {
    return choice.inputModalities.filter((item) => item === "text" || item === "image");
  }
  return isLikelyImageModel(choice.modelId) ? ["text", "image"] : ["text"];
}
function aliasForChoice(choice) {
  const base = displayNameFromModelId(choice.modelId).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "model";
  return `${base}-${choice.provider}`.slice(0, 64);
}
function isLikelyImageModel(id) {
  const lower = id.toLowerCase();
  return lower.includes("-vl") || lower.includes("vision") || lower.includes("multimodal") || lower.includes("gemma-3") || lower.includes("gemma-4") || lower.includes("llama-4") || lower.includes("qwen3.6");
}
function contextWindowForModel(id) {
  const lower = id.toLowerCase();
  if (lower.includes("gemma-4") || lower.includes("qwen3.6")) {
    return 262144;
  }
  if (lower.includes("qwen3-8b") || lower.includes("qwen3-14b")) {
    return 40960;
  }
  return 131072;
}
function isReasoningModel(id) {
  return /r1|reason|thinking|reasoner|qwq|qwen|kimi-k3|kimi-k2\.6|kimi-k2\.7/i.test(id);
}
function object(parent, key) {
  const value = parent[key];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  const created = {};
  parent[key] = created;
  return created;
}
function objectValue2(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
function uniqueStrings(value, required) {
  const current = Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  return [.../* @__PURE__ */ new Set([...current, required])];
}
function removeSupersededPluginConfig(openclawConfig) {
  const plugins = objectValue2(openclawConfig.plugins);
  if (!plugins) return;
  const load = objectValue2(plugins.load);
  if (load?.paths !== void 0) {
    load.paths = withoutString(load.paths, "/opt/openclaw-plugins/node_modules/openclaw-brokerkit");
  }
  if (plugins.allow !== void 0) plugins.allow = withoutString(plugins.allow, "brokerkit");
  const entries = objectValue2(plugins.entries);
  if (entries) delete entries.brokerkit;
}
function withoutString(value, removed) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item !== removed) : [];
}

// src/mlclaw-space-runtime/server.ts
import { spawn as spawn2 } from "node:child_process";
import { randomBytes as randomBytes9 } from "node:crypto";
import http3 from "node:http";
import { Readable as Readable2 } from "node:stream";

// src/mlclaw-space-runtime/app.ts
import fs5 from "node:fs/promises";
import path5 from "node:path";

// node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType2) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType2.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
};

// node_modules/hono/dist/utils/body.js
var isRawRequest = (request) => "headers" in request;
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType2 = headers.get("Content-Type");
  const mediaType = contentType2?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/hono/dist/utils/url.js
var splitPath = (path10) => {
  const paths = path10.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path: path10 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path10);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path10) => {
  const groups = [];
  path10 = path10.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path10 };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path10 = url.slice(start, end);
      return tryDecodeURI(path10.includes("%25") ? path10.replace(/%25/g, "%2525") : path10);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path10) => {
  if (path10.charCodeAt(path10.length - 1) !== 63 || !path10.includes(":")) {
    return null;
  }
  const segments = path10.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path10 = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path10;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType2, headers) => {
  return {
    "Content-Type": contentType2,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders2 = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders2.append(key, value);
        } else {
          responseHeaders2.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders2.set(k, v);
        } else {
          responseHeaders2.delete(k);
          for (const v2 of v) {
            responseHeaders2.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders2 });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object2, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object2),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path10, ...handlers) => {
      for (const p of [path10].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path10, app) {
    const subApp = this.basePath(path10);
    app.routes.map((r) => {
      let handler;
      if (app.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path10) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path10);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path10, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path10);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path10, "*"), handler);
    return this;
  }
  #addRoute(method, path10, handler, baseRoutePath) {
    method = method.toUpperCase();
    path10 = mergePath(this._basePath, path10);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path: path10,
      method,
      handler
    };
    this.router.add(method, path10, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env, "GET")))();
    }
    const path10 = this.getPath(request, { env });
    const matchResult = this.router.match(method, path10);
    const c = new Context(request, {
      path: path10,
      matchResult,
      env,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path10) {
  const matchers = this.buildAllMatchers();
  const match2 = ((method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  });
  this.match = match2;
  return match2(method, path10);
}

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path10, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path10 = path10.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path10.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path10) {
  return wildcardRegExpCache[path10] ??= new RegExp(
    path10 === "*" ? "" : `^${path10.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path10, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path10] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path10, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path10) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path10) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path10)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path10, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path10 === "/*") {
      path10 = "*";
    }
    const paramCount = (path10.match(/\/:/g) || []).length;
    if (/\*$/.test(path10)) {
      const re = buildWildcardRegExp(path10);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path10] ||= findMiddleware(middleware[m], path10) || findMiddleware(middleware[METHOD_NAME_ALL], path10) || [];
        });
      } else {
        middleware[method][path10] ||= findMiddleware(middleware[method], path10) || findMiddleware(middleware[METHOD_NAME_ALL], path10) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path10) || [path10];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path22 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path22] ||= [
            ...findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || []
          ];
          routes[m][path22].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path10) => [path10, r[method][path10]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path10) => [path10, r[METHOD_NAME_ALL][path10]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path10, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path10, handler]);
  }
  match(method, path10) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path10);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node2 = class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path10, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path10);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path10) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path10);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path10[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path10.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path10, handler) {
    const results = checkOptionalParameter(path10);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path10, handler);
  }
  match(method, path10) {
    return this.#node.search(method, path10);
  }
};

// node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// src/mlclaw-space-runtime/csrf.ts
import { createHmac as createHmac3, randomBytes as randomBytes2, timingSafeEqual as timingSafeEqual3 } from "node:crypto";
var CSRF_TTL_SECONDS = 60 * 60;
function createCsrfToken(params) {
  const now = params.now ?? Date.now();
  const body = Buffer.from(JSON.stringify({
    username: params.username,
    nonce: randomBytes2(24).toString("base64url"),
    exp: Math.floor(now / 1e3) + CSRF_TTL_SECONDS
  })).toString("base64url");
  return `${body}.${sign(body, params.sessionSecret)}`;
}
function verifyCsrfToken(params) {
  if (!params.token) {
    return false;
  }
  const [body, signature] = params.token.split(".");
  if (!body || !signature || !signatureMatches(signature, sign(body, params.sessionSecret))) {
    return false;
  }
  let parsed;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return false;
  }
  if (!parsed || typeof parsed !== "object") {
    return false;
  }
  const payload = parsed;
  const now = Math.floor((params.now ?? Date.now()) / 1e3);
  return payload.username === params.username && typeof payload.exp === "number" && payload.exp > now && typeof payload.nonce === "string" && payload.nonce.length > 0;
}
function sign(value, secret) {
  return createHmac3("sha256", secret).update(value).digest("base64url");
}
function signatureMatches(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual3(left, right);
}

// src/mlclaw-space-runtime/delegated-unyolo.ts
import { createHash as createHash2, createHmac as createHmac4, randomBytes as randomBytes4, timingSafeEqual as timingSafeEqual4 } from "node:crypto";

// src/mlclaw-space-runtime/delegated-revisions.ts
import { randomBytes as randomBytes3 } from "node:crypto";
var DelegatedRevisions = class {
  epoch = randomBytes3(16).toString("base64url");
  revision = 0;
  material = "";
  current;
  waiters = /* @__PURE__ */ new Set();
  publish(material, value) {
    if (this.current && material === this.material) return this.current;
    this.material = material;
    this.revision += 1;
    this.current = value(this.cursor());
    for (const waiter of [...this.waiters])
      this.finish(waiter, { api_version: "unyolo.io/operator-ui/v1", cursor: this.cursor(), changed: true });
    return this.current;
  }
  wait(cursor, waitSeconds, signal) {
    const observed = this.parse(cursor);
    if (observed === void 0) return Promise.reject(revisionError("cursor_expired"));
    if (observed !== this.revision) {
      return Promise.resolve({ api_version: "unyolo.io/operator-ui/v1", cursor: this.cursor(), changed: true });
    }
    if (this.waiters.size >= 256) return Promise.reject(revisionError("source_unavailable"));
    if (signal?.aborted) return Promise.reject(abortError());
    return new Promise((resolve, reject) => {
      const waiter = {
        resolve,
        reject,
        timer: setTimeout(() => {
          this.finish(waiter, { api_version: "unyolo.io/operator-ui/v1", cursor: this.cursor(), changed: false });
        }, waitSeconds * 1e3),
        ...signal ? { signal } : {}
      };
      waiter.timer.unref();
      if (signal) {
        waiter.abort = () => this.fail(waiter, abortError());
        signal.addEventListener("abort", waiter.abort, { once: true });
      }
      this.waiters.add(waiter);
    });
  }
  cursor() {
    return `${this.epoch}.${this.revision.toString(36)}`;
  }
  parse(value) {
    const match2 = /^([A-Za-z0-9_-]{22})\.([0-9a-z]{1,13})$/u.exec(value);
    if (!match2 || match2[1] !== this.epoch) return void 0;
    const revision = Number.parseInt(match2[2] ?? "", 36);
    return Number.isSafeInteger(revision) && revision <= this.revision ? revision : void 0;
  }
  finish(waiter, value) {
    this.cleanup(waiter);
    waiter.resolve(value);
  }
  fail(waiter, error) {
    this.cleanup(waiter);
    waiter.reject(error);
  }
  cleanup(waiter) {
    if (!this.waiters.delete(waiter)) return;
    clearTimeout(waiter.timer);
    if (waiter.signal && waiter.abort) waiter.signal.removeEventListener("abort", waiter.abort);
  }
};
function revisionError(code) {
  return Object.assign(new Error(code), { code });
}
function abortError() {
  return new DOMException("The operation was aborted", "AbortError");
}

// src/mlclaw-space-runtime/delegated-unyolo.ts
var API_VERSION = "unyolo.io/delegated-web/v1";
var TOKEN_LIFETIME_SECONDS = 4 * 60;
var MAX_PAGES_PER_SOURCE = 32;
var MAX_HANDLES = 4096;
var SOURCE_DEADLINE_MS = 15e3;
var DelegatedUnyolo = class {
  constructor(registry, sessionSecret, now = () => /* @__PURE__ */ new Date(), sourceDeadlineMs = SOURCE_DEADLINE_MS) {
    this.registry = registry;
    this.now = now;
    this.sourceDeadlineMs = sourceDeadlineMs;
    this.key = createHmac4("sha256", sessionSecret).update("mlclaw/unyolo-delegated-web/v1", "utf8").digest();
  }
  key;
  handles = /* @__PURE__ */ new Map();
  handlesByIdentity = /* @__PURE__ */ new Map();
  snapshotInFlight;
  revisions = new DelegatedRevisions();
  issueSession(actor, access) {
    const issuedAt = Math.floor(this.now().getTime() / 1e3);
    const expiresAt = issuedAt + TOKEN_LIFETIME_SECONDS;
    const payload = {
      version: 1,
      audience: "unyolo-delegated-web",
      subject: actor,
      issuedAt,
      expiresAt,
      nonce: randomBytes4(16).toString("base64url"),
      access
    };
    const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
    const signature = this.sign(encoded);
    return {
      api_version: API_VERSION,
      token: `${encoded}.${signature}`,
      expires_at: new Date(expiresAt * 1e3).toISOString(),
      access,
      renewal_transport: "direct"
    };
  }
  authorize(token) {
    return this.authorizeSession(token)?.actor;
  }
  authorizeSession(token) {
    const encoded = authenticatedTokenPayload(token, (value) => this.sign(value));
    if (!encoded) return void 0;
    const payload = parseTokenPayload(encoded);
    return payload && tokenIsCurrent(payload, this.now()) ? { actor: payload.subject, sessionId: payload.nonce, access: payload.access } : void 0;
  }
  async snapshot() {
    if (this.snapshotInFlight) return this.snapshotInFlight;
    const pending = this.buildSnapshot();
    this.snapshotInFlight = pending;
    try {
      return await pending;
    } finally {
      if (this.snapshotInFlight === pending) this.snapshotInFlight = void 0;
    }
  }
  async buildSnapshot() {
    this.pruneHandles();
    const synchronizedAt = this.now().toISOString();
    const results = await Promise.all(
      this.registry.entries().map(async ([summary, client]) => this.sourceSnapshot(summary, client, synchronizedAt))
    );
    const selected = selectSnapshotRequests(results, MAX_HANDLES);
    const reservedHandles = this.selectedExistingHandles(selected);
    const sources = results.map((result) => result.source);
    const requests = selected.map(
      ({ source, request }) => project(source, request, this.handle(source.id, request, reservedHandles))
    );
    const material = JSON.stringify({
      sources: sources.map((source) => ({
        id: source.id,
        label: source.label,
        healthy: source.healthy,
        ...source.error ? { error: source.error } : {}
      })),
      requests
    });
    return this.revisions.publish(material, (cursor) => ({
      api_version: "unyolo.io/operator-ui/v1",
      cursor,
      sources,
      requests,
      synchronized_at: synchronizedAt
    }));
  }
  async events(cursor, waitSeconds, signal) {
    await this.snapshot();
    const waiting = this.revisions.wait(cursor, waitSeconds, signal);
    const refresh = setInterval(() => void this.snapshot().catch(() => void 0), 1e3);
    refresh.unref();
    try {
      return await waiting;
    } catch (error) {
      if (error instanceof Error && "code" in error && (error.code === "cursor_expired" || error.code === "source_unavailable")) {
        throw delegatedError(error.code);
      }
      throw error;
    } finally {
      clearInterval(refresh);
    }
  }
  async summary() {
    const snapshot = await this.snapshot();
    return {
      api_version: snapshot.api_version,
      cursor: snapshot.cursor,
      pending: snapshot.requests.filter((value) => value.request.status === "pending").length,
      healthy: snapshot.sources.every((source) => source.healthy)
    };
  }
  async detail(handle) {
    const record = this.resolveHandle(handle);
    const source = this.registry.get(record.sourceId);
    if (!source) throw delegatedError("source_unavailable");
    const request = await source.get(record.requestId);
    if (request.revision !== record.revision) throw delegatedError("revision_stale");
    return project(source.summary(), request, handle);
  }
  async decide(handle, action, expectedRevision, actor, options = {}) {
    const record = this.resolveHandle(handle);
    const source = this.registry.get(record.sourceId);
    if (!source) throw delegatedError("source_unavailable");
    const current = await source.get(record.requestId);
    assertDecisionAllowed(current, record, action, expectedRevision, options);
    const decision = decisionOptions(record, action, expectedRevision, actor, options);
    const updated = await decideWithRecovery(source, record.requestId, action, decision);
    if (updated.status === "pending" || updated.status === "active") {
      this.removeHandle(handle, record);
      return project(source.summary(), updated, this.handle(record.sourceId, updated));
    }
    this.removeHandle(handle, record);
    return project(source.summary(), updated, handle);
  }
  async sourceSnapshot(summary, client, synchronizedAt) {
    const deadline = new AbortController();
    const timer = setTimeout(() => deadline.abort(), this.sourceDeadlineMs);
    timer.unref?.();
    try {
      await client.discover(deadline.signal);
      const pages = await Promise.all([
        this.sourceRequests(client, "pending", deadline.signal),
        this.sourceRequests(client, "active", deadline.signal)
      ]);
      const requests = reconcileRequests(pages.map((page2) => page2.requests));
      return {
        source: deadline.signal.aborted ? { ...summary, healthy: false, error: "broker_timeout" } : pages.some((page2) => page2.truncated) ? { ...summary, healthy: false, error: "source_truncated" } : { ...summary, healthy: true, last_sync_at: synchronizedAt },
        requests
      };
    } catch (error) {
      return {
        source: { ...summary, healthy: false, error: safeSourceError(error) },
        requests: []
      };
    } finally {
      clearTimeout(timer);
    }
  }
  async sourceRequests(client, status, signal) {
    const requests = [];
    let cursor;
    try {
      for (let pageNumber = 0; pageNumber < MAX_PAGES_PER_SOURCE; pageNumber += 1) {
        const page2 = await client.list({ status, ...cursor ? { cursor } : {}, limit: 100 }, signal);
        requests.push(...page2.requests);
        cursor = page2.next_cursor;
        if (!cursor) return { requests, truncated: false };
      }
    } catch (error) {
      if (!signal.aborted) throw error;
    }
    return { requests, truncated: Boolean(cursor) };
  }
  selectedExistingHandles(selected) {
    const handles = /* @__PURE__ */ new Set();
    for (const { source, request } of selected) {
      const handle = this.handlesByIdentity.get(requestIdentity(source.id, request.id, request.revision));
      if (handle && this.handles.has(handle)) handles.add(handle);
    }
    return handles;
  }
  handle(sourceId, request, reservedHandles = /* @__PURE__ */ new Set()) {
    const identity = requestIdentity(sourceId, request.id, request.revision);
    const existing = this.handlesByIdentity.get(identity);
    if (existing && this.handles.has(existing)) {
      reservedHandles.add(existing);
      return existing;
    }
    if (this.handles.size >= MAX_HANDLES && !this.pruneOldestHandle(reservedHandles)) {
      throw delegatedError("source_unavailable");
    }
    const handle = randomBytes4(18).toString("base64url");
    const requestExpiry = Date.parse(handleExpiry(request));
    const expiresAtMs = Number.isFinite(requestExpiry) ? Math.min(requestExpiry, this.now().getTime() + 24 * 60 * 6e4) : this.now().getTime() + 5 * 6e4;
    this.handles.set(handle, { sourceId, requestId: request.id, revision: request.revision, expiresAtMs });
    this.handlesByIdentity.set(identity, handle);
    reservedHandles.add(handle);
    return handle;
  }
  resolveHandle(handle) {
    if (!/^[A-Za-z0-9_-]{24}$/u.test(handle)) throw delegatedError("request_not_found");
    const record = this.handles.get(handle);
    if (!record || record.expiresAtMs <= this.now().getTime()) {
      if (record) this.removeHandle(handle, record);
      throw delegatedError("request_not_found");
    }
    return record;
  }
  pruneHandles() {
    for (const [handle, record] of this.handles) {
      if (record.expiresAtMs <= this.now().getTime()) this.removeHandle(handle, record);
    }
  }
  pruneOldestHandle(reservedHandles) {
    for (const [handle, record] of this.handles) {
      if (reservedHandles.has(handle)) continue;
      this.removeHandle(handle, record);
      return true;
    }
    return false;
  }
  removeHandle(handle, record) {
    this.handles.delete(handle);
    this.handlesByIdentity.delete(requestIdentity(record.sourceId, record.requestId, record.revision));
  }
  sign(encoded) {
    return createHmac4("sha256", this.key).update(encoded, "utf8").digest("base64url");
  }
};
async function decideWithRecovery(source, requestId, action, decision) {
  try {
    return await source.decide(requestId, action, decision);
  } catch (error) {
    if (error instanceof BrokerOperatorError) throw error;
    try {
      await source.get(requestId);
    } catch {
      throw delegatedError("source_unavailable");
    }
    try {
      return await source.decide(requestId, action, decision);
    } catch (retryError) {
      if (retryError instanceof BrokerOperatorError) throw retryError;
      throw delegatedError("source_unavailable");
    }
  }
}
function selectSnapshotRequests(results, limit) {
  const buckets = results.flatMap(
    (result) => ["pending", "active"].map((status) => ({
      source: result.source,
      requests: result.requests.filter((request) => request.status === status),
      index: 0
    }))
  );
  const selected = [];
  while (selected.length < limit) {
    let added = false;
    for (const bucket of buckets) {
      const request = bucket.requests[bucket.index];
      if (!request) continue;
      selected.push({ source: bucket.source, request });
      bucket.index += 1;
      added = true;
      if (selected.length === limit) break;
    }
    if (!added) break;
  }
  return selected;
}
function reconcileRequests(pages) {
  const requests = /* @__PURE__ */ new Map();
  for (const request of pages.flat()) {
    const current = requests.get(request.id);
    if (!current || request.revision > current.revision || request.revision === current.revision && request.status === "active" && current.status !== "active") {
      requests.set(request.id, request);
    }
  }
  return [...requests.values()];
}
var DelegatedUnyoloError = class extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
};
function delegatedError(code) {
  return new DelegatedUnyoloError(code);
}
function project(source, request, handle) {
  return { source_id: source.id, source_label: source.label, handle, request };
}
function requestIdentity(sourceId, requestId, revision) {
  return `${sourceId}\0${requestId}\0${revision}`;
}
function handleExpiry(request) {
  if (request.status === "active") return request.active_expires_at ?? "";
  return request.pending_expires_at ?? request.active_expires_at ?? "";
}
function decisionKey(record, action, actor) {
  return createHash2("sha256").update(
    ["mlclaw-unyolo-decision-v1", record.sourceId, record.requestId, String(record.revision), action, actor].join(
      "\0"
    ),
    "utf8"
  ).digest("base64url");
}
function decisionOptions(record, action, expectedRevision, actor, options) {
  return {
    expectedRevision,
    idempotencyKey: decisionKey(record, action, actor),
    onBehalfOf: `mlclaw:${actor}`,
    ...options.durationSeconds ? { durationSeconds: options.durationSeconds } : {},
    ...options.maxUses !== void 0 ? { maxUses: options.maxUses } : {}
  };
}
function decisionWithinBounds(action, request, options) {
  if (options.durationSeconds === void 0 && options.maxUses === void 0) return true;
  const bounds = request.approval_bounds;
  return Boolean(
    action === "approve" && bounds && options.durationSeconds !== void 0 && options.durationSeconds <= bounds.max_duration_seconds && useLimitWithinBounds(options.maxUses, bounds.max_uses)
  );
}
function useLimitWithinBounds(requested, maximum) {
  if (requested === void 0) return false;
  if (requested === null) return maximum === null;
  return maximum === null || requested <= maximum;
}
function assertDecisionAllowed(request, record, action, expectedRevision, options) {
  if (request.revision !== record.revision || request.revision !== expectedRevision) {
    throw delegatedError("revision_stale");
  }
  if (!request.allowed_actions.includes(action) || !decisionWithinBounds(action, request, options)) {
    throw delegatedError("action_not_allowed");
  }
}
function authenticatedTokenPayload(token, sign3) {
  if (!token || token.length > 4096 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/u.test(token)) return void 0;
  const [encoded, signature, extra] = token.split(".");
  return encoded && signature && extra === void 0 && safeEqual(signature, sign3(encoded)) ? encoded : void 0;
}
function parseTokenPayload(encoded) {
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    return validTokenPayload(payload) ? payload : void 0;
  } catch {
    return void 0;
  }
}
function tokenIsCurrent(payload, now) {
  const current = Math.floor(now.getTime() / 1e3);
  return payload.issuedAt <= current + 5 && payload.expiresAt > current && payload.expiresAt - payload.issuedAt <= TOKEN_LIFETIME_SECONDS;
}
function validTokenPayload(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value;
  return hasExactTokenFields(record) && validTokenIdentity(record) && validTokenTimes(record) && validTokenNonce(record);
}
function hasExactTokenFields(record) {
  return Object.keys(record).sort().join(",") === "access,audience,expiresAt,issuedAt,nonce,subject,version";
}
function validTokenIdentity(record) {
  return record.version === 1 && record.audience === "unyolo-delegated-web" && (record.access === "read" || record.access === "decide") && typeof record.subject === "string" && record.subject.length >= 1 && record.subject.length <= 200;
}
function validTokenTimes(record) {
  return typeof record.issuedAt === "number" && Number.isSafeInteger(record.issuedAt) && typeof record.expiresAt === "number" && Number.isSafeInteger(record.expiresAt);
}
function validTokenNonce(record) {
  return typeof record.nonce === "string" && /^[A-Za-z0-9_-]{22}$/u.test(record.nonce);
}
function safeEqual(left, right) {
  const a = Buffer.from(left, "utf8");
  const b = Buffer.from(right, "utf8");
  return a.length === b.length && timingSafeEqual4(a, b);
}
function safeSourceError(error) {
  const code = error instanceof BrokerOperatorError ? error.code : error instanceof DelegatedUnyoloError ? error.code : void 0;
  if (code === "broker_timeout" || code === "unavailable" || code === "source_unavailable") return code;
  return "source_unavailable";
}

// src/mlclaw-space-runtime/hub-settings.ts
function runtimeSettings(config2) {
  return {
    agentName: config2.agentName ?? null,
    model: config2.model,
    generation: config2.runtimeSettingsGeneration,
    stateBucket: config2.stateBucket ?? null,
    stateMountDir: config2.stateMountDir ?? null,
    statePrefix: config2.statePrefix ?? null,
    gatewayLocation: config2.gatewayLocation ?? null,
    runtimeImage: config2.runtimeImage ?? null,
    runtimeId: config2.runtimeId ?? null,
    templateRev: config2.templateRev ?? null,
    allowedUsers: config2.allowedUsers,
    adminUsers: config2.adminUsers,
    modelChoices: config2.modelChoices,
    presetModels: PRESET_MODEL_CHOICES,
    branding: publicBranding(config2.branding)
  };
}
function normalizeModel(value) {
  return normalizeModelRef(value);
}
async function setCurrentSpaceSecret(config2, key, value) {
  if (!config2.spaceId || !config2.hfToken) {
    throw new Error("Space mutation requires SPACE_ID and HF_TOKEN");
  }
  await hubRequest(config2, `/api/spaces/${config2.spaceId}/secrets`, {
    method: "POST",
    body: JSON.stringify({ key, value }),
    headers: { "content-type": "application/json" }
  });
}
async function restartCurrentSpace(config2) {
  if (!config2.spaceId || !config2.hfToken) {
    return false;
  }
  await hubRequest(config2, `/api/spaces/${config2.spaceId}/restart`, {
    method: "POST",
    body: JSON.stringify({ factoryReboot: false }),
    headers: { "content-type": "application/json" }
  });
  return true;
}
async function hubRequest(config2, path10, init) {
  const response = await fetch(`${config2.hubUrl.replace(/\/+$/, "")}${path10}`, {
    ...init,
    headers: {
      authorization: `Bearer ${config2.hfToken}`,
      ...init.headers
    }
  });
  if (!response.ok) {
    throw new Error(`Hub request failed: ${response.status} ${await response.text()}`);
  }
  return response;
}

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object2) => {
    const keys = [];
    for (const key in object2) {
      if (Object.prototype.hasOwnProperty.call(object2, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path10, errorMaps, issueData } = params;
  const fullPath = [...path10, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path10, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path10;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
var NEVER = INVALID;

// src/mlclaw-space-runtime/oauth.ts
var HF_MCP_OAUTH_SCOPES = [
  "openid",
  "profile",
  "read-mcp",
  "read-repos",
  "contribute-repos",
  "write-repos",
  "manage-repos",
  "inference-api",
  "jobs"
];
var HF_LOGIN_OAUTH_SCOPES = ["openid", "profile"];
var tokenResponseSchema = external_exports.object({
  access_token: external_exports.string().min(1),
  refresh_token: external_exports.string().min(1).optional(),
  token_type: external_exports.string().min(1).optional().default("Bearer"),
  scope: external_exports.union([external_exports.string(), external_exports.array(external_exports.string())]).optional(),
  expires_in: external_exports.number().positive().optional()
}).passthrough();
var userInfoSchema = external_exports.object({
  preferred_username: external_exports.string().min(1)
}).passthrough();
function authorizeUrl(settings, state, scopes = HF_LOGIN_OAUTH_SCOPES) {
  const url = new URL(`${settings.providerUrl.replace(/\/+$/, "")}/oauth/authorize`);
  url.searchParams.set("client_id", settings.clientId);
  url.searchParams.set("redirect_uri", settings.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("state", state);
  return url.toString();
}
async function exchangeCodeForIdentity(settings, code) {
  const fetchImpl = settings.fetchImpl ?? fetch;
  const providerUrl = settings.providerUrl.replace(/\/+$/, "");
  const basic = Buffer.from(`${settings.clientId}:${settings.clientSecret}`).toString("base64");
  const tokenResponse = await fetchImpl(`${providerUrl}/oauth/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${basic}`
    },
    body: new URLSearchParams({
      client_id: settings.clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: settings.redirectUri
    })
  });
  if (!tokenResponse.ok) {
    return void 0;
  }
  const tokenBody = tokenResponseSchema.safeParse(await tokenResponse.json());
  if (!tokenBody.success) {
    return void 0;
  }
  const userResponse = await fetchImpl(`${providerUrl}/oauth/userinfo`, {
    headers: { authorization: `Bearer ${tokenBody.data.access_token}` }
  });
  if (!userResponse.ok) {
    return void 0;
  }
  const userBody = userInfoSchema.safeParse(await userResponse.json());
  if (!userBody.success) {
    return void 0;
  }
  return {
    username: userBody.data.preferred_username,
    accessToken: tokenBody.data.access_token,
    ...tokenBody.data.refresh_token ? { refreshToken: tokenBody.data.refresh_token } : {},
    tokenType: tokenBody.data.token_type,
    scope: normalizeScope(tokenBody.data.scope),
    ...tokenBody.data.expires_in ? { expiresAt: Date.now() + tokenBody.data.expires_in * 1e3 } : {}
  };
}
function normalizeScope(value) {
  const scopes = Array.isArray(value) ? value : (value ?? "").split(/\s+/);
  return [...new Set(scopes.map((scope) => scope.trim()).filter(Boolean))];
}

// src/mlclaw-space-runtime/openai-credentials.ts
import { createCipheriv, createDecipheriv, hkdfSync, randomBytes as randomBytes5 } from "node:crypto";
import fs4 from "node:fs/promises";
import path4 from "node:path";
function openAiConfigured(env = process.env) {
  return Boolean(env.OPENAI_API_KEY?.trim());
}
async function loadOpenAiCredentialFile(file) {
  try {
    const raw2 = await fs4.readFile(file, "utf8");
    const match2 = raw2.match(/(?:^|\n)OPENAI_API_KEY=([^\n]+)/);
    return match2?.[1]?.trim() || void 0;
  } catch {
    return void 0;
  }
}
async function writeEphemeralOpenAiCredential(file, apiKey) {
  await fs4.mkdir(path4.dirname(file), { recursive: true, mode: 448 });
  await fs4.writeFile(file, `OPENAI_API_KEY=${apiKey.trim()}
`, { encoding: "utf8", mode: 384 });
  await fs4.chmod(file, 384);
}
var OpenAiCredentialStore = class {
  constructor(file, secret) {
    this.file = file;
    this.key = Buffer.from(
      hkdfSync(
        "sha256",
        Buffer.from(secret, "utf8"),
        Buffer.alloc(0),
        Buffer.from("mlclaw:openai-api-key:v1", "utf8"),
        32
      )
    );
  }
  key;
  async load() {
    let raw2;
    try {
      raw2 = await fs4.readFile(this.file, "utf8");
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        return void 0;
      }
      throw new Error("Could not read encrypted OpenAI credential");
    }
    try {
      const envelope = JSON.parse(raw2);
      if (envelope.version !== 1 || envelope.algorithm !== "aes-256-gcm") {
        throw new Error("unsupported envelope");
      }
      const decipher = createDecipheriv("aes-256-gcm", this.key, Buffer.from(envelope.iv, "base64url"));
      decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
      const apiKey = Buffer.concat([
        decipher.update(Buffer.from(envelope.ciphertext, "base64url")),
        decipher.final()
      ]).toString("utf8");
      if (!validateOpenAiApiKey(apiKey)) {
        throw new Error("invalid key");
      }
      return apiKey;
    } catch {
      throw new Error("Encrypted OpenAI credential is invalid or cannot be decrypted");
    }
  }
  async save(apiKey) {
    const normalized = validateOpenAiApiKey(apiKey);
    if (!normalized) {
      throw new Error("valid OpenAI API key is required");
    }
    const iv = randomBytes5(12);
    const cipher = createCipheriv("aes-256-gcm", this.key, iv);
    const ciphertext = Buffer.concat([cipher.update(normalized, "utf8"), cipher.final()]);
    const envelope = {
      version: 1,
      algorithm: "aes-256-gcm",
      iv: iv.toString("base64url"),
      tag: cipher.getAuthTag().toString("base64url"),
      ciphertext: ciphertext.toString("base64url")
    };
    const directory = path4.dirname(this.file);
    const temporary = `${this.file}.${process.pid}.${randomBytes5(6).toString("hex")}.tmp`;
    await fs4.mkdir(directory, { recursive: true, mode: 448 });
    try {
      await fs4.writeFile(temporary, `${JSON.stringify(envelope)}
`, { encoding: "utf8", mode: 384 });
      await fs4.chmod(temporary, 384);
      await fs4.rename(temporary, this.file);
      await fs4.chmod(this.file, 384);
    } finally {
      await fs4.rm(temporary, { force: true });
    }
  }
};
function validateOpenAiApiKey(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const trimmed = value.trim();
  if (!/^sk-[A-Za-z0-9_\-]{20,}$/.test(trimmed)) {
    return void 0;
  }
  return trimmed;
}

// src/mlclaw-space-runtime/pages.ts
function templatePage(config2) {
  return page(
    "ML Claw",
    `
    <main>
      <img src="/assets/mlclaw.svg" alt="ML Claw" class="logo">
      <h1>ML Claw</h1>
      <p>Run the local bootstrapper to create a Hugging Face hosted OpenClaw agent for ML workflows.</p>
      <p class="notice">Do not set this up by only clicking Duplicate. The bootstrapper creates the protected Space, private Storage Bucket, OAuth settings, secrets, model configuration, and local manifest.</p>
      <h2>With Node.js</h2>
      <pre><code>npx mlclaw@latest bootstrap --name mlclaw</code></pre>
      <h2>macOS or Linux without Node.js</h2>
      <pre><code>bash &lt;(curl -fsSL https://raw.githubusercontent.com/osolmaz/mlclaw/main/mlclaw.sh) --name mlclaw</code></pre>
      <h2>Windows PowerShell</h2>
      <pre><code>irm https://raw.githubusercontent.com/osolmaz/mlclaw/main/mlclaw.ps1 | iex</code></pre>
      <ol>
        <li>Run one of the commands above on your own machine.</li>
        <li>Follow the prompts and choose an agent name.</li>
        <li>Open the Space that ML Claw creates and sign in with Hugging Face.</li>
      </ol>
      <p class="muted">Manual duplication is for development or advanced setup only.</p>
      <p class="muted">Source Space: ${escapeHtml(config2.spaceId ?? config2.canonicalSpaceId)}</p>
    </main>
  `
  );
}
function loginPage(config2, message, next = "/") {
  const oauthReady = Boolean(config2.oauthClientId && config2.oauthClientSecret);
  const loginPath = next === "/" ? "/oauth/login" : `/oauth/login?next=${encodeURIComponent(next)}`;
  const loginHref = new URL(loginPath, config2.publicUrl).toString();
  return page(
    `${config2.branding.name} Login`,
    `
    <main>
      <img src="/assets/hf-logo.svg" alt="Hugging Face" class="logo">
      <h1>${escapeHtml(config2.branding.name)}</h1>
      ${message ? `<p class="notice">${escapeHtml(message)}</p>` : ""}
      ${oauthReady ? `<a class="button" href="${escapeHtml(loginHref)}" target="_blank" rel="noopener">Sign in with Hugging Face</a>` : `<p class="notice">Hugging Face OAuth is not configured for this Space. Update the Space README metadata to include <code>hf_oauth: true</code>, then rebuild.</p>`}
    </main>
  `
  );
}
function localLoginPage(config2) {
  return page(
    `${config2.branding.name} Local Access`,
    `
    <main>
      <img src="/assets/mlclaw.svg" alt="ML Claw" class="logo">
      <h1>${escapeHtml(config2.branding.name)}</h1>
      <p class="muted">Use the private access link printed by the ML Claw CLI.</p>
      <form id="local-login-form">
        <label for="local-access-token">Local access code</label>
        <input id="local-access-token" name="token" type="password" autocomplete="off" required>
        <button class="button" type="submit">Open gateway</button>
      </form>
      <p id="local-login-status" class="notice" role="status"></p>
    </main>
    <script>
      const form = document.getElementById("local-login-form");
      const input = document.getElementById("local-access-token");
      const status = document.getElementById("local-login-status");
      const submit = async () => {
        status.textContent = "Signing in...";
        const response = await fetch("/mlclaw/api/local-session", {
          method: "POST",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token: input.value }),
        });
        input.value = "";
        if (response.ok) {
          location.replace("/");
          return;
        }
        status.textContent = "The local access link is invalid. Run mlclaw gateway status again.";
      };
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        submit().catch(() => { status.textContent = "The local gateway could not be reached."; });
      });
      const token = location.hash.slice(1);
      if (token) {
        history.replaceState(null, "", location.pathname);
        input.value = token;
        submit().catch(() => { status.textContent = "The local gateway could not be reached."; });
      }
    </script>
  `
  );
}
function unauthorizedPage(username) {
  return page(
    "ML Claw Access",
    `
    <main>
      <h1>Access not allowed</h1>
      <p>The signed-in Hugging Face account <strong>${escapeHtml(username)}</strong> is not allowed to operate this Space.</p>
      <p class="muted">Set <code>MLCLAW_ALLOWED_USERS</code> to a comma-separated list of usernames, then restart the Space.</p>
      <a class="button secondary" href="/mlclaw/logout">Sign out</a>
    </main>
  `
  );
}
function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="manifest" href="/manifest.webmanifest">
  <style>
    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f5f7fb; color: #111827; }
    main { width: min(680px, calc(100vw - 40px)); padding: 32px 0; }
    .logo { width: 72px; height: 72px; display: block; margin-bottom: 20px; }
    h1 { font-size: 42px; line-height: 1.05; margin: 0 0 16px; letter-spacing: 0; }
    h2 { font-size: 16px; line-height: 1.35; margin: 22px 0 8px; letter-spacing: 0; }
    p, li { font-size: 17px; line-height: 1.55; }
    ol { padding-left: 22px; }
    pre { overflow-x: auto; margin: 0 0 10px; padding: 14px 16px; border-radius: 8px; background: #111827; color: #f9fafb; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.95em; }
    label { display: block; font-weight: 650; margin-bottom: 8px; }
    input { box-sizing: border-box; width: 100%; padding: 12px 14px; border: 1px solid #c7d2fe; border-radius: 8px; font-size: 16px; margin-bottom: 14px; background: white; color: #111827; }
    .button { display: inline-flex; align-items: center; justify-content: center; min-height: 42px; padding: 0 16px; border-radius: 8px; background: #111827; color: white; text-decoration: none; border: 0; font-size: 16px; cursor: pointer; }
    .secondary { background: #374151; }
    .muted { color: #4b5563; }
    .notice { color: #92400e; }
    .ok { color: #047857; }
    @media (prefers-color-scheme: dark) {
      body { background: #0b1020; color: #f9fafb; }
      pre { background: #020617; }
      input { background: #111827; color: #f9fafb; border-color: #374151; }
      .button { background: #f9fafb; color: #111827; }
      .secondary { background: #9ca3af; color: #111827; }
      .muted { color: #cbd5e1; }
      .notice { color: #fbbf24; }
      .ok { color: #34d399; }
    }
  </style>
</head>
<body>${body}</body>
</html>`;
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// src/mlclaw-space-runtime/router-models.ts
var DEFAULT_ROUTER_MODELS_URL = "https://router.huggingface.co/v1/models";
var CACHE_TTL_MS = 10 * 60 * 1e3;
var cache;
async function loadRouterModelChoices(params = {}) {
  const now = params.now ?? Date.now();
  if (!params.force && cache && cache.expiresAt > now) {
    return { ok: true, models: cache.models, fetchedAt: new Date(now).toISOString() };
  }
  try {
    const response = await (params.fetchImpl ?? fetch)(params.url ?? DEFAULT_ROUTER_MODELS_URL, {
      headers: { accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Router model catalog failed with HTTP ${response.status}`);
    }
    const payload = await response.json();
    const models = mergePresets(normalizeRouterModelsPayload(payload));
    cache = {
      models,
      expiresAt: now + CACHE_TTL_MS
    };
    return { ok: true, models, fetchedAt: new Date(now).toISOString() };
  } catch (err) {
    return {
      ok: false,
      models: PRESET_MODEL_CHOICES,
      fetchedAt: null,
      error: err instanceof Error ? err.message : String(err)
    };
  }
}
function normalizeRouterModelsPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return [];
  }
  const data = payload.data;
  if (!Array.isArray(data)) {
    return [];
  }
  const choices = [];
  for (const model of data) {
    if (!model || typeof model !== "object" || Array.isArray(model)) {
      continue;
    }
    const record = model;
    const modelId = stringValue3(record.id);
    if (!modelId || !modelId.includes("/")) {
      continue;
    }
    const architecture = record.architecture && typeof record.architecture === "object" ? record.architecture : {};
    const inputModalities = normalizeModalities2(architecture.input_modalities);
    const outputModalities = normalizeModalities2(architecture.output_modalities);
    if (outputModalities && !outputModalities.includes("text")) {
      continue;
    }
    const providers = Array.isArray(record.providers) ? record.providers : [];
    for (const provider of providers) {
      const normalized = normalizeProviderChoice({
        modelId,
        provider,
        ...inputModalities ? { inputModalities } : {},
        ...outputModalities ? { outputModalities } : {}
      });
      if (normalized) {
        choices.push(normalized);
      }
    }
  }
  return choices.sort(compareChoices);
}
function normalizeProviderChoice(params) {
  if (!params.provider || typeof params.provider !== "object" || Array.isArray(params.provider)) {
    return void 0;
  }
  const provider = params.provider;
  const providerId = stringValue3(provider.provider);
  if (!providerId || !/^[a-z0-9][a-z0-9._-]{0,63}$/i.test(providerId)) {
    return void 0;
  }
  const status = stringValue3(provider.status) ?? "live";
  if (status !== "live") {
    return void 0;
  }
  const pricing = provider.pricing && typeof provider.pricing === "object" && !Array.isArray(provider.pricing) ? provider.pricing : void 0;
  const normalizedProvider = providerId.toLowerCase();
  const modelId = params.modelId.trim();
  const pricingValue = pricingForProvider(pricing);
  return {
    key: choiceKey(modelId, normalizedProvider),
    modelId,
    provider: normalizedProvider,
    openclawModel: formatOpenClawModelRef(modelId, normalizedProvider),
    label: displayNameFromModelId(modelId),
    ...optional2("contextLength", positiveInteger2(provider.context_length)),
    ...optional2("pricing", pricingValue),
    ...optional2("supportsTools", optionalBoolean2(provider.supports_tools)),
    ...optional2("supportsStructuredOutput", optionalBoolean2(provider.supports_structured_output)),
    ...optional2("firstTokenLatencyMs", positiveNumber2(provider.first_token_latency_ms)),
    ...optional2("throughput", positiveNumber2(provider.throughput)),
    status,
    ...params.inputModalities ? { inputModalities: params.inputModalities } : {},
    ...params.outputModalities ? { outputModalities: params.outputModalities } : {}
  };
}
function mergePresets(dynamicChoices) {
  const dynamicByKey = new Map(dynamicChoices.map((choice) => [choice.key, choice]));
  const presets = PRESET_MODEL_CHOICES.map((preset) => ({
    ...preset,
    ...dynamicByKey.get(preset.key) ?? {},
    preset: true,
    label: preset.label,
    ...preset.note ? { note: preset.note } : {}
  }));
  return dedupeModelChoices([...presets, ...dynamicChoices]).sort(compareChoices);
}
function compareChoices(left, right) {
  if (left.preset !== right.preset) {
    return left.preset ? -1 : 1;
  }
  const leftPrice = left.pricing?.input ?? Number.POSITIVE_INFINITY;
  const rightPrice = right.pricing?.input ?? Number.POSITIVE_INFINITY;
  if (leftPrice !== rightPrice) {
    return leftPrice - rightPrice;
  }
  return left.openclawModel.localeCompare(right.openclawModel);
}
function stringValue3(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function normalizeModalities2(value) {
  if (!Array.isArray(value)) {
    return void 0;
  }
  const modalities = [...new Set(value.flatMap((item) => {
    const normalized = typeof item === "string" ? item.trim().toLowerCase() : "";
    return normalized ? [normalized] : [];
  }))];
  return modalities.length > 0 ? modalities : void 0;
}
function optionalBoolean2(value) {
  return typeof value === "boolean" ? value : void 0;
}
function pricingForProvider(pricing) {
  if (!pricing) {
    return void 0;
  }
  const input = positiveNumber2(pricing.input);
  const output = positiveNumber2(pricing.output);
  if (input === void 0 && output === void 0) {
    return void 0;
  }
  return {
    ...input !== void 0 ? { input } : {},
    ...output !== void 0 ? { output } : {}
  };
}
function optional2(key, value) {
  return value === void 0 ? {} : { [key]: value };
}
function positiveInteger2(value) {
  const parsed = positiveNumber2(value);
  return parsed === void 0 ? void 0 : Math.trunc(parsed);
}
function positiveNumber2(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
}

// src/mlclaw-space-runtime/cookies.ts
import { createHmac as createHmac5, randomBytes as randomBytes6, timingSafeEqual as timingSafeEqual5 } from "node:crypto";
function createSignedCookie(options, payload) {
  const body = Buffer.from(JSON.stringify({
    ...payload,
    exp: Math.floor(Date.now() / 1e3) + options.maxAgeSeconds
  })).toString("base64url");
  const signature = sign2(body, options.secret);
  return serializeCookie(options.name, `${body}.${signature}`, {
    httpOnly: true,
    secure: options.secure,
    sameSite: "Lax",
    path: "/",
    maxAge: options.maxAgeSeconds
  });
}
function verifySignedCookie(cookieHeader, name, secret) {
  const value = parseCookies(cookieHeader).get(name);
  if (!value) {
    return void 0;
  }
  const [body, signature] = value.split(".");
  if (!body || !signature || !signatureMatches2(signature, sign2(body, secret))) {
    return void 0;
  }
  let parsed;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return void 0;
  }
  if (!parsed || typeof parsed !== "object") {
    return void 0;
  }
  const exp = parsed.exp;
  if (typeof exp !== "number" || exp <= Math.floor(Date.now() / 1e3)) {
    return void 0;
  }
  return parsed;
}
function clearCookie(name, secure) {
  return serializeCookie(name, "", {
    httpOnly: true,
    secure,
    sameSite: "Lax",
    path: "/",
    maxAge: 0
  });
}
function randomState() {
  return randomBytes6(24).toString("base64url");
}
function sign2(value, secret) {
  return createHmac5("sha256", secret).update(value).digest("base64url");
}
function signatureMatches2(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual5(left, right);
}
function parseCookies(header) {
  const cookies = /* @__PURE__ */ new Map();
  for (const part of (header ?? "").split(";")) {
    const equals = part.indexOf("=");
    if (equals <= 0) {
      continue;
    }
    const name = part.slice(0, equals).trim();
    if (!name) {
      continue;
    }
    try {
      cookies.set(name, decodeURIComponent(part.slice(equals + 1).trim()));
    } catch {
      continue;
    }
  }
  return cookies;
}
function serializeCookie(name, value, options) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${options.maxAge}`,
    `Path=${options.path}`,
    `SameSite=${options.sameSite}`
  ];
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.secure) {
    parts.push("Secure");
  }
  return parts.join("; ");
}

// src/mlclaw-space-runtime/session.ts
var SESSION_COOKIE = "mlclaw_session";
var STATE_COOKIE = "mlclaw_oauth";
var SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
var STATE_TTL_SECONDS = 60 * 10;
function createSessionCookie(params) {
  return createSignedCookie(
    {
      name: params.cookieName ?? SESSION_COOKIE,
      secret: params.sessionSecret,
      maxAgeSeconds: SESSION_TTL_SECONDS,
      secure: params.secure
    },
    { username: params.username }
  );
}
function createOauthStateCookie(params) {
  const state = params.state ?? randomState();
  return {
    state,
    cookie: createSignedCookie(
      {
        name: STATE_COOKIE,
        secret: params.sessionSecret,
        maxAgeSeconds: STATE_TTL_SECONDS,
        secure: params.secure
      },
      { state, next: normalizeNext(params.next), intent: params.intent ?? "login" }
    )
  };
}
function clearSessionCookie(secure, cookieName = SESSION_COOKIE) {
  return clearCookie(cookieName, secure);
}
function clearOauthStateCookie(secure) {
  return clearCookie(STATE_COOKIE, secure);
}
function readSession(cookieHeader, sessionSecret, cookieName = SESSION_COOKIE) {
  return verifySignedCookie(cookieHeader, cookieName, sessionSecret);
}
function readOauthState(cookieHeader, sessionSecret) {
  return verifySignedCookie(cookieHeader, STATE_COOKIE, sessionSecret);
}
function normalizeNext(value) {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\r") || value.includes("\n")) {
    return "/";
  }
  return value;
}

// src/mlclaw-space-runtime/shell.ts
var SHELL_MARKER = "data-mlclaw-shell";
var BRANDING_MARKER = "data-mlclaw-branding";
var CONTROL_BRANDING_MARKER = "data-mlclaw-control-branding";
var UNYOLO_DELEGATED_UI_BOOTSTRAP = Buffer.from(
  JSON.stringify({ version: 1, mode: "delegated-web", basePath: "/trusted-host/api/unyolo" }),
  "utf8"
).toString("base64url");
var CONTROL_BRANDING_SCRIPT_PATH = "/assets/mlclaw-control-branding.js";
var CONTROL_BRANDING_SCRIPT = `(function () {
  var productName = "ML Claw";
  var marker = "data-mlclaw-control-branded";
  var observedRoots = new WeakSet();
  function inTopLeftBrandArea(node) {
    try {
      var range = document.createRange();
      range.selectNodeContents(node);
      var rect = range.getBoundingClientRect();
      range.detach();
      return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.top <= 140 && rect.left >= 0 && rect.left <= 280;
    } catch (_) {
      return false;
    }
  }
  function updateTextNode(node) {
    var value = node.nodeValue || "";
    var trimmed = value.trim();
    if ((trimmed !== "Control" && trimmed !== "OpenClaw") || !inTopLeftBrandArea(node)) {
      return;
    }
    if (trimmed === "Control") {
      node.nodeValue = "";
    } else {
      node.nodeValue = value.replace("OpenClaw", productName);
    }
  }
  function scan(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      updateTextNode(node);
    }
  }
  function observe(root) {
    if (!root || observedRoots.has(root)) return;
    observedRoots.add(root);
    var pending = false;
    function scheduleScan() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        scan(root);
      });
    }
    scan(root);
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].type === "characterData") {
          updateTextNode(mutations[i].target);
        } else {
          scheduleScan();
        }
      }
    }).observe(root, { childList: true, characterData: true, subtree: true });
  }
  function observeExistingShadowRoots(root) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll("*").forEach(function (element) {
      if (element.shadowRoot) {
        observe(element.shadowRoot);
        observeExistingShadowRoots(element.shadowRoot);
      }
    });
  }
  function installApprovals() {
    var shell = document.querySelector("[data-mlclaw-shell]");
    var button = document.querySelector("[data-mlclaw-approvals-button]");
    var popover = document.querySelector("[data-mlclaw-approvals-popover]");
    var frame = document.querySelector("[data-mlclaw-approvals-frame]");
    var badge = document.querySelector("[data-mlclaw-approvals-badge]");
    var close = document.querySelector("[data-mlclaw-approvals-close]");
    if (!shell || !button || !popover || !frame || button.getAttribute("data-ready") === "1") return;
    button.setAttribute("data-ready", "1");
    function invalidateFrame() {
      if (frame.contentWindow) {
        frame.contentWindow.postMessage({ type: "unyolo.operator-ui.invalidate", version: 1 }, "*");
      }
    }
    var lastRebootstrapAt = 0;
    function rebootstrapFrame() {
      var now = Date.now();
      if (now - lastRebootstrapAt < 30000) return;
      lastRebootstrapAt = now;
      frame.removeAttribute("src");
      if (!popover.hidden) {
        window.setTimeout(function () { frame.setAttribute("src", frame.getAttribute("data-src")); }, 0);
      }
    }
    function setOpen(open) {
      popover.hidden = !open;
      button.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) return;
      if (!frame.getAttribute("src")) frame.setAttribute("src", frame.getAttribute("data-src"));
      else invalidateFrame();
    }
    frame.addEventListener("load", function () { if (!popover.hidden) invalidateFrame(); });
    button.addEventListener("click", function () { setOpen(popover.hidden); });
    if (close) close.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("click", function (event) {
      if (!popover.hidden && !shell.contains(event.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
    window.addEventListener("message", function (event) {
      var data = event.data;
      if (
        event.source === frame.contentWindow &&
        data &&
        typeof data === "object" &&
        Object.keys(data).sort().join(",") === "type,version" &&
        data.type === "unyolo.delegated-web.rebootstrap" &&
        data.version === 1
      ) {
        rebootstrapFrame();
        return;
      }
      if (
        event.source !== frame.contentWindow ||
        !data ||
        typeof data !== "object" ||
        Object.keys(data).sort().join(",") !== "nonce,type,version" ||
        data.type !== "unyolo.delegated-web.open" ||
        data.version !== 1 ||
        typeof data.nonce !== "string" ||
        !/^[a-f0-9]{32}$/.test(data.nonce)
      ) return;
      window.location.assign("/plugins/unyolo/ui/#${UNYOLO_DELEGATED_UI_BOOTSTRAP}");
    });
    var summaryCursor = "";
    var stopped = false;
    function acceptSummary(summary) {
      if (
        !summary ||
        typeof summary !== "object" ||
        Object.keys(summary).sort().join(",") !== "api_version,cursor,healthy,pending" ||
        summary.api_version !== "unyolo.io/operator-ui/v1" ||
        typeof summary.cursor !== "string" ||
        summary.cursor.length < 1 ||
        summary.cursor.length > 128 ||
        typeof summary.pending !== "number" ||
        !Number.isSafeInteger(summary.pending) ||
        summary.pending < 0 ||
        typeof summary.healthy !== "boolean"
      ) return false;
      var changed = summaryCursor && summaryCursor !== summary.cursor;
      summaryCursor = summary.cursor;
      if (badge) {
        badge.textContent = summary.pending > 99 ? "99+" : String(summary.pending);
        badge.hidden = summary.pending < 1;
      }
      button.setAttribute("aria-label", summary.pending > 0 ? "Open approval requests (" + summary.pending + " pending)" : "Open approval requests");
      if (changed) invalidateFrame();
      return true;
    }
    function refresh() {
      return fetch("/trusted-host/api/unyolo/summary", { credentials: "same-origin", cache: "no-store" })
        .then(function (response) { return response.ok ? response.json() : null; })
        .then(acceptSummary)
        .catch(function () { return false; });
    }
    function watch(delay) {
      if (stopped) return;
      if (!summaryCursor) {
        refresh().then(function () { window.setTimeout(function () { watch(250); }, delay); });
        return;
      }
      fetch("/trusted-host/api/unyolo/summary/events?cursor=" + encodeURIComponent(summaryCursor) + "&wait_seconds=25", {
        credentials: "same-origin",
        cache: "no-store"
      }).then(function (response) {
        if (response.status === 410) {
          summaryCursor = "";
          return null;
        }
        if (!response.ok) throw new Error("summary unavailable");
        return response.json();
      }).then(function (event) {
        if (
          event &&
          typeof event === "object" &&
          Object.keys(event).sort().join(",") === "api_version,changed,cursor" &&
          event.api_version === "unyolo.io/operator-ui/v1" &&
          typeof event.cursor === "string" &&
          event.cursor.length >= 1 &&
          event.cursor.length <= 128 &&
          typeof event.changed === "boolean"
        ) {
          summaryCursor = event.cursor;
          if (event.changed) invalidateFrame();
          return event.changed ? refresh() : true;
        }
        return false;
      }).then(function (ok) {
        window.setTimeout(function () { watch(ok ? 250 : Math.min(delay * 2, 30000)); }, ok ? 0 : delay);
      }).catch(function () {
        window.setTimeout(function () { watch(Math.min(delay * 2, 30000)); }, delay);
      });
    }
    refresh().then(function () { watch(250); });
    window.setInterval(refresh, 300000);
    window.addEventListener("focus", function () { refresh(); });
    window.addEventListener("beforeunload", function () { stopped = true; });
  }
  if (!document.documentElement.hasAttribute(marker)) {
    document.documentElement.setAttribute(marker, "1");
    var attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function () {
      var shadow = attachShadow.apply(this, arguments);
      observe(shadow);
      return shadow;
    };
    observe(document);
    observeExistingShadowRoots(document);
    requestAnimationFrame(function () {
      observeExistingShadowRoots(document);
      scan(document);
      installApprovals();
    });
  }
})();
`;
var SERVICE_WORKER_RESET_SCRIPT = `self.addEventListener("install", function () {
  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    if (self.caches && caches.keys) {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (key) { return caches.delete(key); }));
    }
    if (self.clients && clients.claim) {
      await clients.claim();
    }
    if (self.registration && self.registration.unregister) {
      await self.registration.unregister();
    }
  })());
});
`;
function shouldInjectShell(params) {
  const method = params.method ?? "GET";
  return (method === "GET" || method === "HEAD") && (params.requestAccept ?? "").includes("text/html") && (params.responseContentType ?? "").toLowerCase().includes("text/html") && !params.responseContentEncoding;
}
function rewriteOpenClawHtml(html, branding) {
  return injectMlClawShell(injectBranding(html, branding), branding);
}
function injectMlClawShell(html, branding) {
  const shell = `
<div ${SHELL_MARKER} style="position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));z-index:2147483647;">
  <section data-mlclaw-approvals-popover hidden aria-label="Approval requests" style="position:absolute;left:0;bottom:44px;box-sizing:border-box;width:min(420px,calc(100vw - 24px));height:min(620px,calc(100dvh - 72px));overflow:hidden;border:1px solid rgba(15,23,42,.16);border-radius:14px;background:white;box-shadow:0 18px 48px rgba(15,23,42,.24);">
    <header style="box-sizing:border-box;display:flex;height:42px;align-items:center;justify-content:space-between;padding:0 10px 0 14px;border-bottom:1px solid rgba(15,23,42,.1);color:#111827;font:600 14px system-ui;">
      <span>Approvals</span>
      <button data-mlclaw-approvals-close type="button" aria-label="Close approval requests" style="display:grid;width:30px;height:30px;place-items:center;border:0;border-radius:7px;background:transparent;color:#475569;cursor:pointer;font:20px/1 system-ui;">&times;</button>
    </header>
    <iframe data-mlclaw-approvals-frame data-src="/plugins/unyolo/ui/?embed=popover#${UNYOLO_DELEGATED_UI_BOOTSTRAP}" title="Approval requests" sandbox="allow-scripts" style="display:block;width:100%;height:calc(100% - 42px);border:0;background:white;"></iframe>
  </section>
  <div style="display:flex;gap:8px;align-items:center;">
  <a href="/mlclaw" aria-label="Open ${escapeHtml2(branding.name)} settings" title="${escapeHtml2(branding.name)}" style="box-sizing:border-box;display:flex;width:34px;height:34px;aspect-ratio:1/1;align-items:center;justify-content:center;border:1px solid rgba(15,23,42,.16);border-radius:8px;background:rgba(255,255,255,.94);box-shadow:0 8px 18px rgba(15,23,42,.14);color:#111827;text-decoration:none;">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;width:18px;height:18px;">
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  </a>
  <button data-mlclaw-approvals-button type="button" aria-label="Open approval requests" aria-expanded="false" style="position:relative;box-sizing:border-box;display:grid;width:34px;height:34px;place-items:center;border:1px solid rgba(15,23,42,.16);border-radius:8px;background:rgba(255,255,255,.94);box-shadow:0 8px 18px rgba(15,23,42,.14);color:#111827;cursor:pointer;">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
    <span data-mlclaw-approvals-badge hidden style="position:absolute;place-items:center;min-width:17px;height:17px;right:-6px;top:-7px;padding:0 4px;border:2px solid white;border-radius:999px;background:#dc2626;color:white;font:700 9px system-ui;"></span>
  </button>
  </div>
</div>
`;
  const brandingScript = `<script ${CONTROL_BRANDING_MARKER} src="${CONTROL_BRANDING_SCRIPT_PATH}"></script>
`;
  if (html.includes(SHELL_MARKER)) {
    return html;
  }
  if (html.includes("</body>")) {
    return html.replace("</body>", `${shell}${brandingScript}</body>`);
  }
  return `${html}${shell}${brandingScript}`;
}
function injectBranding(html, branding) {
  const title = `${escapeHtml2(branding.name)} Control`;
  let out = html;
  if (/<title>[\s\S]*?<\/title>/i.test(out)) {
    out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  } else if (/<head[^>]*>/i.test(out)) {
    out = out.replace(/<head([^>]*)>/i, `<head$1>
<title>${title}</title>`);
  }
  const meta = `
<meta ${BRANDING_MARKER} name="application-name" content="${escapeHtml2(branding.name)}">
<meta ${BRANDING_MARKER} name="apple-mobile-web-app-title" content="${escapeHtml2(branding.shortName)}">
<meta ${BRANDING_MARKER} name="theme-color" content="${escapeHtml2(branding.themeColor)}">
`;
  if (!out.includes(BRANDING_MARKER) && out.includes("</head>")) {
    out = out.replace("</head>", `${meta}</head>`);
  }
  return out;
}
function escapeHtml2(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// src/mlclaw-space-runtime/app.ts
var UNYOLO_SESSION_HEADER = "unyolo-session";
function createSpaceRuntimeApp(config2, controls) {
  const app = new Hono2();
  const operatorBrokers = new OperatorBrokerRegistry(config2.operatorBrokers);
  const delegatedUnyolo = new DelegatedUnyolo(operatorBrokers, config2.sessionSecret);
  const allowDelegatedSessionSnapshot = fixedWindowRateLimit(12, 6e4);
  const allowDelegatedActorSnapshot = fixedWindowRateLimit(60, 6e4);
  const allowUnyoloSummary = fixedWindowRateLimit(12, 6e4);
  const allowDelegatedEvents = fixedWindowRateLimit(60, 6e4);
  const allowSummaryEvents = fixedWindowRateLimit(60, 6e4);
  const allowLocalLogin = fixedWindowRateLimit(10, 6e4);
  const openAiCredentials = new OpenAiCredentialStore(config2.openaiCredentialStoreFile, config2.credentialKey);
  app.get("/health", (c) => health(c, config2, controls));
  app.get("/healthz", (c) => health(c, config2, controls));
  app.get(
    "/assets/mlclaw.svg",
    async () => serveFile(path5.join(config2.assetsDir, "mlclaw.svg"), "image/svg+xml; charset=utf-8")
  );
  app.get(
    "/assets/hf-logo.svg",
    async () => serveFile(path5.join(config2.assetsDir, "hf-logo.svg"), "image/svg+xml; charset=utf-8")
  );
  app.get(
    "/assets/assistant-avatar.svg",
    async () => serveFile(path5.join(config2.assetsDir, "assistant-avatar.svg"), "image/svg+xml; charset=utf-8")
  );
  app.get("/assets/mlclaw-control-branding.js", () => staticScript(CONTROL_BRANDING_SCRIPT));
  app.get("/plugins/unyolo/ui", (c) => c.redirect("/plugins/unyolo/ui/", 308));
  app.get("/plugins/unyolo/ui/*", (c) => trustedUnyoloUi(c, config2, delegatedUnyolo));
  app.get("/assets/brand/logo", async () => serveBrandAsset(config2, config2.branding.logoAsset));
  app.get("/favicon.svg", async () => serveBrandAsset(config2, config2.branding.faviconSvgAsset));
  app.get("/favicon-32.png", async () => serveBrandAsset(config2, config2.branding.favicon32Asset));
  app.get("/favicon.ico", async () => serveBrandAsset(config2, config2.branding.faviconIcoAsset));
  app.get("/apple-touch-icon.png", async () => serveBrandAsset(config2, config2.branding.appleTouchIconAsset));
  app.get("/sw.js", () => staticScript(SERVICE_WORKER_RESET_SCRIPT));
  app.get(
    "/manifest.webmanifest",
    () => new Response(brandingManifest(config2.branding), {
      headers: {
        "cache-control": "no-cache",
        "content-type": "application/manifest+json; charset=utf-8"
      }
    })
  );
  app.get("/oauth/login", (c) => handleOauthLogin(c, config2));
  app.get("/oauth/callback", (c) => handleOauthCallback(c, config2, controls));
  app.get("/mlclaw/local-login", (c) => {
    if (!config2.localAccessUser || !config2.localAccessToken || config2.gatewayLocation !== "local") {
      return c.text("not found\n", 404);
    }
    c.header(
      "content-security-policy",
      "default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
    );
    c.header("cache-control", "no-store");
    c.header("referrer-policy", "no-referrer");
    return c.html(localLoginPage(config2));
  });
  app.post("/mlclaw/api/local-session", async (c) => {
    if (!config2.localAccessUser || !config2.localAccessToken || config2.gatewayLocation !== "local") {
      return c.json({ ok: false, error: "not found" }, 404);
    }
    const origin = c.req.header("origin");
    if (!origin || !config2.accessOrigins.includes(origin) || !allowLocalLogin(origin)) {
      return c.json({ ok: false, error: "access denied" }, 403);
    }
    const contentLength = Number.parseInt(c.req.header("content-length") ?? "0", 10);
    if (contentLength > 512 || !(c.req.header("content-type") ?? "").startsWith("application/json")) {
      return c.json({ ok: false, error: "invalid request" }, 400);
    }
    const text = await c.req.text();
    if (text.length > 512) {
      return c.json({ ok: false, error: "invalid request" }, 400);
    }
    let token;
    try {
      token = JSON.parse(text).token;
    } catch {
      return c.json({ ok: false, error: "invalid request" }, 400);
    }
    if (typeof token !== "string" || !localAccessTokenMatches(token, config2.localAccessToken)) {
      return c.json({ ok: false, error: "access denied" }, 403);
    }
    c.header(
      "set-cookie",
      createSessionCookie({
        username: config2.localAccessUser,
        sessionSecret: config2.sessionSecret,
        secure: origin.startsWith("https://"),
        cookieName: config2.sessionCookieName
      })
    );
    return c.json({ ok: true });
  });
  app.get("/login", (c) => c.html(loginPage(config2, void 0, normalizeNext(c.req.query("next") ?? "/"))));
  app.get("/logout", (c) => logoutResponse(c, config2, false));
  app.get("/mlclaw/logout", (c) => logoutResponse(c, config2, false));
  app.post("/mlclaw/api/logout", (c) => logoutResponse(c, config2, true));
  app.get("/mlclaw/assets/*", async (c) => {
    const relative = c.req.path.slice("/mlclaw/assets/".length);
    const safe = safeRelativePath(relative);
    if (!safe) {
      return c.text("not found\n", 404);
    }
    const file = path5.join(config2.assetsDir, "mlclaw-control-ui", safe);
    return serveFile(file, contentType(file), true);
  });
  app.get("/mlclaw/openai", (c) => c.redirect("/mlclaw/credentials", 302));
  app.post("/mlclaw/openai", (c) => c.redirect("/mlclaw/credentials", 303));
  app.get("/mlclaw/api/session", (c) => {
    const auth = requireAllowed(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    return c.json({
      user: auth.username,
      admin: isAdmin(config2, auth.username),
      csrfToken: createCsrfToken({ username: auth.username, sessionSecret: config2.sessionSecret }),
      branding: publicBranding(config2.branding)
    });
  });
  app.get("/mlclaw/api/status", async (c) => {
    const auth = requireAllowed(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    return c.json(await statusPayload(config2, controls));
  });
  app.get("/trusted-host/api/unyolo/summary", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) return auth;
    if (!allowUnyoloSummary(auth.username)) return c.json({ ok: false, error: "rate limited" }, 429);
    try {
      return c.json(await delegatedUnyolo.summary());
    } catch {
      return c.json({ ok: false, error: "operator inbox unavailable" }, 503);
    }
  });
  app.get("/trusted-host/api/unyolo/summary/events", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) return auth;
    if (!allowSummaryEvents(auth.username)) return c.json({ ok: false, error: "rate limited" }, 429);
    const input = delegatedEventQuery(c.req.url);
    if (!input) return c.json({ ok: false, error: "invalid request" }, 400);
    try {
      return c.json(await delegatedUnyolo.events(input.cursor, input.waitSeconds, c.req.raw.signal));
    } catch (error) {
      return delegatedFailure(c, error);
    }
  });
  app.options("/trusted-host/api/unyolo/*", (c) => delegatedPreflight(c));
  app.post("/trusted-host/api/unyolo/session", (c) => {
    const identity = delegatedIdentity(c, delegatedUnyolo);
    if (!identity) return delegatedErrorResponse(c, "not_authorized", 401);
    return delegatedJson(c, delegatedUnyolo.issueSession(identity.actor, identity.access));
  });
  app.get("/trusted-host/api/unyolo/snapshot", async (c) => {
    const identity = delegatedIdentity(c, delegatedUnyolo);
    if (!identity) return delegatedErrorResponse(c, "not_authorized", 401);
    if (!allowDelegatedSessionSnapshot(identity.sessionId) || !allowDelegatedActorSnapshot(identity.actor)) {
      return delegatedErrorResponse(c, "rate_limited", 429);
    }
    try {
      return delegatedJson(c, await delegatedUnyolo.snapshot());
    } catch (error) {
      return delegatedFailure(c, error);
    }
  });
  app.get("/trusted-host/api/unyolo/events", async (c) => {
    const identity = delegatedIdentity(c, delegatedUnyolo);
    if (!identity) return delegatedErrorResponse(c, "not_authorized", 401);
    if (!allowDelegatedEvents(identity.sessionId)) return delegatedErrorResponse(c, "rate_limited", 429);
    const input = delegatedEventQuery(c.req.url);
    if (!input) return delegatedErrorResponse(c, "invalid_input", 400);
    try {
      return delegatedJson(c, await delegatedUnyolo.events(input.cursor, input.waitSeconds, c.req.raw.signal));
    } catch (error) {
      return delegatedFailure(c, error);
    }
  });
  app.get("/trusted-host/api/unyolo/requests/:handle", async (c) => {
    const identity = delegatedIdentity(c, delegatedUnyolo);
    if (!identity) return delegatedErrorResponse(c, "not_authorized", 401);
    try {
      return delegatedJson(c, await delegatedUnyolo.detail(c.req.param("handle")));
    } catch (error) {
      return delegatedFailure(c, error);
    }
  });
  for (const action of ["approve", "deny", "revoke"]) {
    app.post(`/trusted-host/api/unyolo/requests/:handle/${action}`, async (c) => {
      const identity = delegatedIdentity(c, delegatedUnyolo);
      if (!identity || identity.access !== "decide") return delegatedErrorResponse(c, "not_authorized", 401);
      const body = await readBoundedJson(c, 16384);
      if (!body || Object.keys(body).some((key) => !["expectedRevision", "constraints"].includes(key))) {
        return delegatedErrorResponse(c, "invalid_input", 400);
      }
      const constraints = recordValue(body.constraints);
      const expectedRevision = positiveJsonInteger(body.expectedRevision);
      const durationSeconds = optionalPositiveJsonInteger(constraints?.durationSeconds);
      const maxUses = optionalUseLimitJsonInteger(constraints?.maxUses);
      if (!expectedRevision || body.constraints !== void 0 && (!constraints || Object.keys(constraints).some((key) => !["durationSeconds", "maxUses"].includes(key)) || durationSeconds === void 0 || maxUses === void 0) || durationSeconds === "invalid" || maxUses === "invalid" || action !== "approve" && (durationSeconds !== void 0 || maxUses !== void 0)) {
        return delegatedErrorResponse(c, "invalid_input", 400);
      }
      try {
        return delegatedJson(
          c,
          await delegatedUnyolo.decide(c.req.param("handle"), action, expectedRevision, identity.actor, {
            ...typeof durationSeconds === "number" ? { durationSeconds } : {},
            ...typeof maxUses === "number" || maxUses === null ? { maxUses } : {}
          })
        );
      } catch (error) {
        return delegatedFailure(c, error);
      }
    });
  }
  app.all("/trusted-host/api/unyolo/*", (c) => delegatedErrorResponse(c, "not_found", 404));
  app.post("/mlclaw/api/integrations/huggingface/disconnect", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    const csrf = requireCsrf(c, config2, auth.username);
    if (csrf) {
      return csrf;
    }
    if (config2.gatewayLocation === "local") {
      return c.json(
        {
          ok: false,
          error: "Local integrations use the local Hugging Face token; manage that credential with the ML Claw CLI"
        },
        409
      );
    }
    const credentialSlot = integrationCredentialSlot(config2) ?? auth.username;
    await controls.clearMcpCredentials(credentialSlot);
    return c.json({ ok: true, configured: false });
  });
  app.get("/mlclaw/api/settings", (c) => {
    const auth = requireAllowed(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    return c.json(runtimeSettings(config2));
  });
  app.get("/mlclaw/api/router-models", async (c) => {
    const auth = requireAllowed(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    return c.json(await loadRouterModelChoices({ url: config2.routerModelsUrl }));
  });
  app.post("/mlclaw/api/settings/model", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    const csrf = requireCsrf(c, config2, auth.username);
    if (csrf) {
      return csrf;
    }
    if (config2.mode !== "app") {
      return c.json({ ok: false, error: "template mode cannot mutate settings" }, 403);
    }
    const body = await readJson(c);
    const model = normalizeModel(body?.model);
    if (!model) {
      return c.json({ ok: false, error: "model is required" }, 400);
    }
    const choices = normalizeModelChoices(body?.modelChoices, model);
    if (!choices) {
      return c.json({ ok: false, error: "at least one valid model choice is required" }, 400);
    }
    const selected = choices.find((choice) => choice.openclawModel === model);
    if (!selected) {
      return c.json({ ok: false, error: "active model must be included in model choices" }, 400);
    }
    if (parseOpenClawModelRef(model) && !config2.brokerAgentSecret && !config2.routerToken && !config2.hfToken) {
      return c.json(
        { ok: false, error: "Hugging Face broker credential is required before selecting a Hugging Face Router model" },
        400
      );
    }
    const expectedGeneration = body?.generation;
    if (typeof expectedGeneration !== "number" || !Number.isSafeInteger(expectedGeneration) || expectedGeneration !== config2.runtimeSettingsGeneration) {
      return c.json({ ok: false, error: "runtime settings changed; refresh before saving" }, 409);
    }
    const persistent = Boolean(config2.stateMountDir || config2.gatewayLocation === "local");
    let settings;
    try {
      settings = await writeRuntimeSettingsFile({
        file: config2.runtimeSettingsFile,
        model,
        modelChoices: choices,
        expectedGeneration
      });
    } catch (error) {
      if (error instanceof RuntimeSettingsConflictError) {
        return c.json({ ok: false, error: error.message }, 409);
      }
      throw error;
    }
    config2.runtimeSettingsGeneration = settings.generation;
    controls.setModelSettings(model, choices);
    await configureOpenClawGateway(config2);
    await controls.restartOpenClaw();
    return c.json({
      ok: true,
      model,
      modelChoices: choices,
      generation: settings.generation,
      persistent,
      restartPending: false
    });
  });
  app.post("/mlclaw/api/credentials/openai", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    const csrf = requireCsrf(c, config2, auth.username);
    if (csrf) {
      return csrf;
    }
    if (config2.mode !== "app") {
      return c.json({ ok: false, error: "template mode cannot mutate credentials" }, 403);
    }
    const body = await readJson(c);
    const apiKey = validateOpenAiApiKey(body?.apiKey);
    if (!apiKey) {
      return c.json({ ok: false, error: "valid OpenAI API key is required" }, 400);
    }
    let persistent = false;
    if (config2.spaceId && config2.hfToken) {
      try {
        await setCurrentSpaceSecret(config2, "OPENAI_API_KEY", apiKey);
        persistent = true;
      } catch {
        process.stderr.write("[mlclaw] failed to persist OpenAI key as Space Secret\n");
      }
    }
    try {
      await openAiCredentials.save(apiKey);
      persistent = true;
    } catch (err) {
      if (!persistent) {
        throw err;
      }
      process.stderr.write("[mlclaw] failed to persist encrypted OpenAI credential\n");
    }
    await writeEphemeralOpenAiCredential(config2.openaiCredentialFile, apiKey);
    await controls.restartOpenClawWithOpenAi(apiKey);
    return c.json({ ok: true, configured: true, persistent });
  });
  app.post("/mlclaw/api/runtime/restart", async (c) => {
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) {
      return auth;
    }
    const csrf = requireCsrf(c, config2, auth.username);
    if (csrf) {
      return csrf;
    }
    if (config2.mode !== "app") {
      return c.json({ ok: false, error: "template mode cannot restart runtime" }, 403);
    }
    const restartPending = await restartCurrentSpace(config2);
    if (!restartPending) {
      await controls.restartOpenClaw();
    }
    return c.json({ ok: true, restartPending });
  });
  app.get("/mlclaw", (c) => controlUi(c, config2));
  app.get("/mlclaw/*", (c) => controlUi(c, config2));
  app.notFound((c) => {
    if (config2.mode === "template") {
      return c.html(templatePage(config2));
    }
    return new Response("", { status: 404, headers: { "x-mlclaw-fallback": "openclaw" } });
  });
  return app;
}
async function health(c, config2, controls) {
  if (config2.mode !== "app") {
    return c.text("ok\n");
  }
  if (!controls.openclawRunning()) {
    return c.text("openclaw is not running\n", 503);
  }
  const broker = await brokerStatus(config2);
  if (parseOpenClawModelRef(config2.model) && !broker.configured) {
    return c.text("HF Broker is required for the configured model\n", 503);
  }
  if (broker.configured && !broker.agentHealthy) {
    return c.text("HF Broker agent listener is not healthy\n", 503);
  }
  if (broker.configured && parseOpenClawModelRef(config2.model) && !broker.inferenceReady) {
    return c.text("HF Broker inference routes are not ready\n", 503);
  }
  return c.text("ok\n");
}
function handleOauthLogin(c, config2) {
  const next = normalizeNext(c.req.query("next") ?? "/");
  if (!config2.oauthClientId || !config2.oauthClientSecret) {
    return c.html(loginPage(config2, "Hugging Face OAuth is not configured.", next));
  }
  const session = readSession(c.req.header("cookie"), config2.sessionSecret, config2.sessionCookieName);
  const integrationsRequested = c.req.query("intent") === "integrations";
  const intent = integrationsRequested && session && isAdmin(config2, session.username) ? "integrations" : "login";
  const { state, cookie } = createOauthStateCookie({
    next,
    intent,
    sessionSecret: config2.sessionSecret,
    secure: config2.cookieSecure
  });
  const redirectUri = `${config2.publicUrl}/oauth/callback`;
  const headers = new Headers({
    location: authorizeUrl(
      {
        clientId: config2.oauthClientId,
        clientSecret: config2.oauthClientSecret,
        providerUrl: config2.providerUrl,
        redirectUri
      },
      state,
      intent === "integrations" ? HF_MCP_OAUTH_SCOPES : void 0
    )
  });
  headers.append("set-cookie", cookie);
  return new Response(null, { status: 302, headers });
}
async function handleOauthCallback(c, config2, controls) {
  const stateCookie = readOauthState(c.req.header("cookie"), config2.sessionSecret);
  const state = c.req.query("state");
  const code = c.req.query("code");
  if (!stateCookie || !state || stateCookie.state !== state || !code || !config2.oauthClientId || !config2.oauthClientSecret) {
    return c.html(loginPage(config2, "The Hugging Face sign-in attempt expired. Try again."), 401);
  }
  const identity = await exchangeCodeForIdentity(
    {
      clientId: config2.oauthClientId,
      clientSecret: config2.oauthClientSecret,
      providerUrl: config2.providerUrl,
      redirectUri: `${config2.publicUrl}/oauth/callback`
    },
    code
  );
  if (!identity) {
    return c.html(loginPage(config2, "Hugging Face sign-in failed. Try again."), 401);
  }
  if (stateCookie.intent === "integrations") {
    const session = readSession(c.req.header("cookie"), config2.sessionSecret, config2.sessionCookieName);
    if (!session || !isAdmin(config2, session.username) || session.username !== identity.username) {
      return c.html(loginPage(config2, "Integration authorization requires the signed-in ML Claw administrator."), 403);
    }
    try {
      await controls.saveMcpCredentials(identity);
    } catch (err) {
      process.stderr.write(`[mlclaw] failed to store MCP authorization: ${formatError(err)}
`);
      return c.html(
        loginPage(config2, "Hugging Face sign-in succeeded, but MCP authorization could not be stored."),
        500
      );
    }
  }
  const headers = new Headers({
    location: normalizeNext(typeof stateCookie.next === "string" ? stateCookie.next : "/")
  });
  headers.append(
    "set-cookie",
    createSessionCookie({
      username: identity.username,
      sessionSecret: config2.sessionSecret,
      secure: config2.cookieSecure,
      cookieName: config2.sessionCookieName
    })
  );
  headers.append("set-cookie", clearOauthStateCookie(config2.cookieSecure));
  return new Response(null, { status: 302, headers });
}
async function controlUi(c, config2) {
  const auth = requireAllowed(c, config2);
  if (auth instanceof Response) {
    return auth;
  }
  return serveFile(path5.join(config2.assetsDir, "mlclaw-control-ui", "index.html"), "text/html; charset=utf-8");
}
async function trustedUnyoloUi(c, config2, delegatedUnyolo) {
  const prefix = "/plugins/unyolo/ui/";
  const requested = c.req.path.slice(prefix.length);
  const relative = requested ? safeRelativePath(requested) : "index.html";
  if (!relative) return c.text("not found\n", 404);
  const uiDir = path5.join(config2.unyoloPluginPath, "dist", "ui");
  const file = path5.join(uiDir, relative);
  if (relative === "index.html") {
    const destination = c.req.header("sec-fetch-dest");
    if (destination !== "iframe" && destination !== "document") return c.text("not found\n", 404);
    const query = new URL(c.req.url).search;
    const embeddedPopover = destination === "iframe" && query === "?embed=popover";
    if (query && !embeddedPopover) return c.text("not found\n", 404);
    const auth = requireAdmin(c, config2);
    if (auth instanceof Response) return auth;
    try {
      const template = await fs5.readFile(file, "utf8");
      const delegatedSession = destination === "document" || embeddedPopover;
      const marker = !delegatedSession ? '<meta name="unyolo-delegated-top-level">' : `<meta name="unyolo-delegated-session" content="${Buffer.from(
        JSON.stringify(
          delegatedUnyolo.issueSession(
            auth.username,
            embeddedPopover && !config2.unyoloPopoverDecisions ? "read" : "decide"
          )
        ),
        "utf8"
      ).toString("base64url")}">`;
      if (!template.includes("</head>")) return c.text("not found\n", 404);
      const headers2 = trustedUnyoloHeaders(
        embeddedPopover ? "popover" : destination === "iframe" ? "launcher" : "top-level",
        new URL(c.req.url).origin
      );
      headers2.set("content-type", "text/html; charset=utf-8");
      return new Response(template.replace("</head>", `${marker}</head>`), { status: 200, headers: headers2 });
    } catch {
      return c.text("not found\n", 404);
    }
  }
  const response = await serveFile(file, contentType(file), true);
  if (response.status !== 200) return response;
  const headers = trustedUnyoloHeaders("asset", new URL(c.req.url).origin);
  headers.set("content-type", response.headers.get("content-type") ?? "application/octet-stream");
  return new Response(response.body, { status: response.status, headers });
}
function trustedUnyoloHeaders(mode, origin) {
  const asset = mode === "asset";
  const sandbox = mode === "top-level" || mode === "popover" ? "sandbox allow-scripts; " : "";
  const headers = new Headers({
    "cache-control": asset ? "public, max-age=31536000, immutable" : "no-store",
    "content-security-policy": `${sandbox}default-src 'self'; script-src 'self' ${origin}; style-src 'self' 'unsafe-inline' ${origin}; connect-src 'self' ${origin}; img-src 'self' data:; frame-ancestors ${mode === "top-level" ? "'none'" : "'self'"}`,
    "cross-origin-resource-policy": asset ? "cross-origin" : "same-origin",
    "referrer-policy": "no-referrer",
    "x-content-type-options": "nosniff",
    "x-frame-options": mode === "top-level" ? "DENY" : "SAMEORIGIN"
  });
  if (asset) headers.set("access-control-allow-origin", "null");
  return headers;
}
function logoutResponse(c, config2, json) {
  const headers = new Headers();
  const origin = c.req.header("origin");
  const secure = origin && config2.accessOrigins.includes(origin) ? origin.startsWith("https://") : config2.cookieSecure;
  headers.append("set-cookie", clearSessionCookie(secure, config2.sessionCookieName));
  if (json) {
    headers.set("content-type", "application/json; charset=utf-8");
    return new Response(`${JSON.stringify({ ok: true })}
`, { status: 200, headers });
  }
  headers.set("location", "/");
  return new Response(null, { status: 302, headers });
}
function requireAllowed(c, config2) {
  const session = readSession(c.req.header("cookie"), config2.sessionSecret, config2.sessionCookieName);
  if (!session) {
    return unauthenticated(c, config2);
  }
  if (!isAllowed(config2, session.username)) {
    return c.html(unauthorizedPage(session.username), 403);
  }
  return session;
}
function requireAdmin(c, config2) {
  const allowed = requireAllowed(c, config2);
  if (allowed instanceof Response) {
    return allowed;
  }
  if (!isAdmin(config2, allowed.username)) {
    return c.json({ ok: false, error: "admin required" }, 403);
  }
  return allowed;
}
function requireCsrf(c, config2, username) {
  if (verifyCsrfToken({
    token: c.req.header("x-mlclaw-csrf"),
    username,
    sessionSecret: config2.sessionSecret
  })) {
    return void 0;
  }
  return c.json({ ok: false, error: "csrf token is invalid or missing" }, 403);
}
function delegatedOriginAllowed(c) {
  return c.req.header("origin") === "null";
}
function delegatedEventQuery(urlValue) {
  const url = new URL(urlValue);
  if ([...url.searchParams.keys()].some((key) => key !== "cursor" && key !== "wait_seconds")) return void 0;
  const cursor = url.searchParams.get("cursor") ?? "";
  const wait = url.searchParams.get("wait_seconds") ?? "25";
  if (cursor.length < 1 || cursor.length > 128 || !/^[A-Za-z0-9_.-]+$/u.test(cursor) || !/^(?:[1-9]|1[0-9]|2[0-5])$/u.test(wait)) {
    return void 0;
  }
  return { cursor, waitSeconds: Number(wait) };
}
function delegatedIdentity(c, delegated) {
  if (!delegatedOriginAllowed(c)) return void 0;
  return delegated.authorizeSession(c.req.header(UNYOLO_SESSION_HEADER));
}
function delegatedPreflight(c) {
  if (!delegatedOriginAllowed(c)) return delegatedErrorResponse(c, "not_authorized", 403);
  delegatedHeaders(c);
  c.header("access-control-allow-headers", `${UNYOLO_SESSION_HEADER}, content-type`);
  c.header("access-control-allow-methods", "GET, POST, OPTIONS");
  c.header("access-control-max-age", "300");
  return c.body(null, 204);
}
function delegatedJson(c, value, status = 200) {
  delegatedHeaders(c);
  return c.json(value, status);
}
function delegatedErrorResponse(c, code, status) {
  delegatedHeaders(c);
  return c.json({ error: { code } }, status);
}
function delegatedFailure(c, error) {
  if (error instanceof DelegatedUnyoloError) {
    const status = error.code === "request_not_found" ? 404 : error.code === "cursor_expired" ? 410 : error.code === "revision_stale" || error.code === "action_not_allowed" ? 409 : 502;
    return delegatedErrorResponse(c, error.code, status);
  }
  if (error instanceof BrokerOperatorError) {
    const code = delegatedBrokerCode(error.code);
    const status = error.status === 404 ? 404 : error.status === 409 ? 409 : 502;
    return delegatedErrorResponse(c, code, status);
  }
  process.stderr.write(
    `[mlclaw] delegated unYOLO request failed: route=${delegatedRouteLabel(c)} status=502 class=${safeErrorClass(error)}
`
  );
  return delegatedErrorResponse(c, "source_unavailable", 502);
}
function delegatedRouteLabel(c) {
  const pathLabel = c.req.path.replace(/\/requests\/[^/]+/u, "/requests/:handle");
  return `${c.req.method}:${pathLabel}`;
}
function safeErrorClass(error) {
  const name = error instanceof Error ? error.name : typeof error;
  return /^[A-Za-z][A-Za-z0-9]{0,79}$/u.test(name) ? name : "unknown";
}
function delegatedHeaders(c) {
  c.header("access-control-allow-origin", "null");
  c.header("cache-control", "no-store");
  c.header("vary", "origin");
  c.header("x-content-type-options", "nosniff");
}
function delegatedBrokerCode(value) {
  if (value === "not_found" || value === "request_not_found") return "request_not_found";
  if (value === "revision_conflict" || value === "revision_stale") return "revision_stale";
  if (value === "invalid_transition" || value === "constraint_exceeded" || value === "idempotency_conflict" || value === "request_terminal" || value === "action_not_allowed") {
    return "action_not_allowed";
  }
  return "source_unavailable";
}
function unauthenticated(c, config2) {
  const next = normalizeNext(c.req.path + new URL(c.req.url).search);
  if (c.req.path.startsWith("/mlclaw/api/")) {
    return c.json({ ok: false, error: "authentication required" }, 401);
  }
  if (isBrowserNavigation(c)) {
    return c.redirect(
      config2.gatewayLocation === "local" ? "/mlclaw/local-login" : `/login?next=${encodeURIComponent(next)}`,
      302
    );
  }
  return c.html(loginPage(config2, void 0, next), 401);
}
function isBrowserNavigation(c) {
  const method = c.req.method;
  return (method === "GET" || method === "HEAD") && (c.req.header("accept") ?? "").includes("text/html");
}
function isAllowed(config2, username) {
  return config2.allowAnySignedIn || config2.allowedUsers.includes(username);
}
function isAdmin(config2, username) {
  return config2.adminUsers.includes(username);
}
async function statusPayload(config2, controls) {
  const credentialSlot = integrationCredentialSlot(config2) ?? "";
  const localTokenConfigured = config2.gatewayLocation === "local" && Boolean(config2.hfToken);
  let mcpCredentials;
  let mcpCredentialError;
  if (!localTokenConfigured && credentialSlot) {
    try {
      mcpCredentials = await controls.mcpCredentialStatus(credentialSlot);
    } catch {
      mcpCredentialError = "Encrypted MCP credentials could not be loaded";
    }
  }
  return {
    ok: true,
    mode: config2.mode,
    agent: config2.agentName ?? null,
    model: config2.model,
    space: config2.spaceId ?? null,
    stateBucket: config2.stateBucket ?? null,
    stateMountDir: config2.stateMountDir ?? null,
    statePrefix: config2.statePrefix ?? null,
    gatewayLocation: config2.gatewayLocation ?? null,
    broker: await brokerStatus(config2),
    runtimeImage: config2.runtimeImage ?? null,
    runtimeId: config2.runtimeId ?? null,
    templateRev: config2.templateRev ?? null,
    openclaw: {
      running: controls.openclawRunning(),
      host: config2.openclawHost,
      port: config2.openclawPort
    },
    auth: {
      hfOAuthConfigured: Boolean(config2.oauthClientId && config2.oauthClientSecret),
      allowedUsers: config2.allowedUsers,
      adminUsers: config2.adminUsers,
      allowAnySignedIn: config2.allowAnySignedIn
    },
    openai: {
      configured: await controls.openAiConfigured(),
      environmentConfigured: openAiConfigured(),
      runtimeFileConfigured: Boolean(await loadOpenAiCredentialFile(config2.openaiCredentialFile))
    },
    integrations: {
      automatic: true,
      source: localTokenConfigured ? "local" : mcpCredentials?.configured ? "oauth" : null,
      identity: mcpCredentials?.configured ? mcpCredentials.username : null,
      configured: localTokenConfigured || (mcpCredentials?.configured ?? false),
      scope: mcpCredentials?.scope ?? [],
      expiresAt: mcpCredentials?.expiresAt ?? null,
      refreshable: mcpCredentials?.refreshable ?? false,
      error: mcpCredentialError ?? null,
      servers: await controls.mcpServerStatus()
    },
    branding: publicBranding(config2.branding)
  };
}
async function brokerStatus(config2) {
  const configured = Boolean(config2.brokerAgentUrl && config2.brokerAgentSecret);
  if (!configured) {
    return {
      configured: false,
      agentHealthy: false,
      inferenceReady: false,
      operatorConfigured: config2.operatorBrokers.some((broker) => broker.id === "hf-broker"),
      operatorBrokers: config2.operatorBrokers.length
    };
  }
  const baseUrl = config2.brokerAgentUrl.replace(/\/+$/, "");
  const token = config2.brokerAgentSecret;
  const [agentHealthy, inferenceReady] = await Promise.all([
    brokerProbe(`${baseUrl}/healthz`),
    brokerProbe(`${baseUrl}/v1/models`, token)
  ]);
  return {
    configured: true,
    agentHealthy,
    inferenceReady,
    operatorConfigured: config2.operatorBrokers.some((broker) => broker.id === "hf-broker"),
    operatorBrokers: config2.operatorBrokers.length
  };
}
async function brokerProbe(url, token) {
  try {
    const response = await fetch(url, {
      ...token ? { headers: { authorization: `Bearer ${token}` } } : {},
      redirect: "error",
      signal: AbortSignal.timeout(2e3)
    });
    await response.body?.cancel();
    return response.ok;
  } catch {
    return false;
  }
}
function staticScript(body) {
  return new Response(body, {
    status: 200,
    headers: {
      "cache-control": "no-store",
      "content-type": "text/javascript; charset=utf-8"
    }
  });
}
async function readJson(c) {
  try {
    const value = await c.req.json();
    return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
  } catch {
    return void 0;
  }
}
async function readBoundedJson(c, maximum) {
  if (c.req.header("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") return void 0;
  const declaredLength = Number(c.req.header("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximum) return void 0;
  const body = c.req.raw.body;
  if (!body) return void 0;
  const reader = body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximum) {
        await reader.cancel();
        return void 0;
      }
      chunks.push(Buffer.from(value));
    }
    const text = new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks));
    return recordValue(JSON.parse(text));
  } catch {
    return void 0;
  }
}
function positiveJsonInteger(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : 0;
}
function optionalPositiveJsonInteger(value) {
  if (value === void 0) return void 0;
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? value : "invalid";
}
function optionalUseLimitJsonInteger(value) {
  if (value === null) return null;
  return optionalPositiveJsonInteger(value);
}
function fixedWindowRateLimit(limit, windowMs) {
  const windows = /* @__PURE__ */ new Map();
  return (key) => {
    const now = Date.now();
    const current = windows.get(key);
    if (!current || now - current.startedAt >= windowMs) {
      if (!current && windows.size >= 1024) {
        for (const [candidate, entry] of windows) {
          if (now - entry.startedAt >= windowMs) windows.delete(candidate);
        }
        if (windows.size >= 1024) return false;
      }
      windows.set(key, { startedAt: now, count: 1 });
      return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  };
}
function recordValue(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : void 0;
}
async function serveFile(file, contentTypeHeader, immutable = false) {
  try {
    const body = await fs5.readFile(file);
    const headers = new Headers({ "content-type": contentTypeHeader });
    if (immutable) {
      headers.set("cache-control", "public, max-age=31536000, immutable");
    }
    return new Response(new Uint8Array(body), { status: 200, headers });
  } catch {
    return new Response("not found\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
}
async function serveBrandAsset(config2, asset) {
  const response = await serveFile(path5.join(config2.assetsDir, asset), contentType(asset));
  if (response.status !== 404 || asset === "mlclaw.svg") {
    return response;
  }
  return serveFile(path5.join(config2.assetsDir, "mlclaw.svg"), "image/svg+xml; charset=utf-8");
}
function safeRelativePath(value) {
  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return void 0;
  }
  const normalized = path5.posix.normalize(decoded).replace(/^\/+/, "");
  if (!normalized || normalized === "." || normalized.startsWith("../") || normalized.includes("/../")) {
    return void 0;
  }
  return normalized;
}
function formatError(err) {
  return err instanceof Error ? err.stack ?? err.message : String(err);
}
function contentType(file) {
  if (file.endsWith(".js")) {
    return "text/javascript; charset=utf-8";
  }
  if (file.endsWith(".css")) {
    return "text/css; charset=utf-8";
  }
  if (file.endsWith(".svg")) {
    return "image/svg+xml; charset=utf-8";
  }
  if (file.endsWith(".png")) {
    return "image/png";
  }
  if (file.endsWith(".ico")) {
    return "image/x-icon";
  }
  if (file.endsWith(".html")) {
    return "text/html; charset=utf-8";
  }
  return "application/octet-stream";
}

// src/mlclaw-space-runtime/codex-credentials.ts
import fs7 from "node:fs/promises";
import path7 from "node:path";

// src/vendor/hfjs-xet/error.ts
async function createApiError(response, opts) {
  const error = new HubApiError(response.url, response.status, response.headers.get("X-Request-Id") ?? opts?.requestId);
  error.message = `Api error with status ${error.statusCode}${opts?.message ? `. ${opts.message}` : ""}`;
  const trailer = [`URL: ${error.url}`, error.requestId ? `Request ID: ${error.requestId}` : void 0].filter(Boolean).join(". ");
  if (response.headers.get("Content-Type")?.startsWith("application/json")) {
    const json = await response.json();
    error.message = json.error || json.message || error.message;
    if (json.error_description) {
      error.message = error.message ? error.message + `: ${json.error_description}` : json.error_description;
    }
    error.data = json;
  } else {
    error.data = { message: await response.text() };
  }
  error.message += `. ${trailer}`;
  throw error;
}
var HubApiError = class extends Error {
  statusCode;
  url;
  requestId;
  data;
  constructor(url, statusCode, requestId, message) {
    super(message);
    this.statusCode = statusCode;
    this.requestId = requestId;
    this.url = url;
  }
};

// src/vendor/hfjs-xet/vendor/lz4js/util.ts
function hashU32(a) {
  a = a | 0;
  a = a + 2127912214 + (a << 12) | 0;
  a = a ^ -949894596 ^ a >>> 19;
  a = a + 374761393 + (a << 5) | 0;
  a = a + -744332180 ^ a << 9;
  a = a + -42973499 + (a << 3) | 0;
  return a ^ -1252372727 ^ a >>> 16 | 0;
}
function readU32(b, n) {
  let x = 0;
  x |= b[n++] << 0;
  x |= b[n++] << 8;
  x |= b[n++] << 16;
  x |= b[n++] << 24;
  return x;
}
function writeU32(b, n, x) {
  b[n++] = x >> 0 & 255;
  b[n++] = x >> 8 & 255;
  b[n++] = x >> 16 & 255;
  b[n++] = x >> 24 & 255;
}
function imul(a, b) {
  const ah = a >>> 16;
  const al = a & 65535;
  const bh = b >>> 16;
  const bl = b & 65535;
  return al * bl + (ah * bl + al * bh << 16) | 0;
}

// src/vendor/hfjs-xet/vendor/lz4js/xxh32.ts
var prime1 = 2654435761;
var prime2 = 2246822519;
var prime3 = 3266489917;
var prime4 = 668265263;
var prime5 = 374761393;
function rotl32(x, r) {
  x = x | 0;
  r = r | 0;
  return x >>> (32 - r | 0) | x << r | 0;
}
function rotmul32(h, r, m) {
  h = h | 0;
  r = r | 0;
  m = m | 0;
  return imul(h >>> (32 - r | 0) | h << r, m) | 0;
}
function shiftxor32(h, s) {
  h = h | 0;
  s = s | 0;
  return h >>> s ^ h | 0;
}
function xxhapply(h, src, m0, s, m1) {
  return rotmul32(imul(src, m0) + h, s, m1);
}
function xxh1(h, src, index) {
  return rotmul32(h + imul(src[index], prime5), 11, prime1);
}
function xxh4(h, src, index) {
  return xxhapply(h, readU32(src, index), prime3, 17, prime4);
}
function xxh16(h, src, index) {
  return [
    xxhapply(h[0], readU32(src, index + 0), prime2, 13, prime1),
    xxhapply(h[1], readU32(src, index + 4), prime2, 13, prime1),
    xxhapply(h[2], readU32(src, index + 8), prime2, 13, prime1),
    xxhapply(h[3], readU32(src, index + 12), prime2, 13, prime1)
  ];
}
function xxh32(seed, src, index, len) {
  let h;
  const l = len;
  if (len >= 16) {
    h = [seed + prime1 + prime2, seed + prime2, seed, seed - prime1];
    while (len >= 16) {
      h = xxh16(h, src, index);
      index += 16;
      len -= 16;
    }
    h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
  } else {
    h = seed + prime5 + len >>> 0;
  }
  while (len >= 4) {
    h = xxh4(h, src, index);
    index += 4;
    len -= 4;
  }
  while (len > 0) {
    h = xxh1(h, src, index);
    index++;
    len--;
  }
  h = shiftxor32(imul(shiftxor32(imul(shiftxor32(h, 15), prime2), 13), prime3), 16);
  return h >>> 0;
}
var hash = xxh32;

// src/vendor/hfjs-xet/vendor/lz4js/index.ts
var minMatch = 4;
var matchSearchLimit = 12;
var minTrailingLitterals = 5;
var skipTrigger = 6;
var hashSize = 1 << 16;
var mlBits = 4;
var mlMask = (1 << mlBits) - 1;
var runBits = 4;
var runMask = (1 << runBits) - 1;
var blockBuf = makeBuffer(5 << 20);
var hashTable = makeHashTable();
var magicNum = 407708164;
var fdVersion = 64;
var bsDefault = 7;
var bsShift = 4;
var bsMap = {
  4: 65536,
  5: 262144,
  6: 1048576,
  7: 4194304
};
function makeHashTable() {
  try {
    return new Uint32Array(hashSize);
  } catch (error) {
    const hashTable2 = new Array(hashSize);
    for (let i = 0; i < hashSize; i++) {
      hashTable2[i] = 0;
    }
    return hashTable2;
  }
}
function clearHashTable(table) {
  for (let i = 0; i < hashSize; i++) {
    table[i] = 0;
  }
}
function makeBuffer(size) {
  return new Uint8Array(size);
}
function sliceArray(array, start, end) {
  return array.slice(start, end);
}
function compressBound(n) {
  return n + n / 255 + 16 | 0;
}
function compressBlock(src, dst, sIndex, sLength, hashTable2) {
  let mIndex, mAnchor, mLength, mOffset, mStep;
  let literalCount, dIndex, sEnd, n;
  dIndex = 0;
  sEnd = sLength + sIndex;
  mAnchor = sIndex;
  let searchMatchCount = (1 << skipTrigger) + 3;
  while (sIndex <= sEnd - matchSearchLimit) {
    const seq = readU32(src, sIndex);
    let hash3 = hashU32(seq) >>> 0;
    hash3 = (hash3 >> 16 ^ hash3) >>> 0 & 65535;
    mIndex = hashTable2[hash3] - 1;
    hashTable2[hash3] = sIndex + 1;
    if (mIndex < 0 || sIndex - mIndex >>> 16 > 0 || readU32(src, mIndex) !== seq) {
      mStep = searchMatchCount++ >> skipTrigger;
      sIndex += mStep;
      continue;
    }
    searchMatchCount = (1 << skipTrigger) + 3;
    literalCount = sIndex - mAnchor;
    mOffset = sIndex - mIndex;
    sIndex += minMatch;
    mIndex += minMatch;
    mLength = sIndex;
    while (sIndex < sEnd - minTrailingLitterals && src[sIndex] === src[mIndex]) {
      sIndex++;
      mIndex++;
    }
    mLength = sIndex - mLength;
    const token = mLength < mlMask ? mLength : mlMask;
    if (literalCount >= runMask) {
      dst[dIndex++] = (runMask << mlBits) + token;
      for (n = literalCount - runMask; n >= 255; n -= 255) {
        dst[dIndex++] = 255;
      }
      dst[dIndex++] = n;
    } else {
      dst[dIndex++] = (literalCount << mlBits) + token;
    }
    for (let i = 0; i < literalCount; i++) {
      dst[dIndex++] = src[mAnchor + i];
    }
    dst[dIndex++] = mOffset;
    dst[dIndex++] = mOffset >> 8;
    if (mLength >= mlMask) {
      for (n = mLength - mlMask; n >= 255; n -= 255) {
        dst[dIndex++] = 255;
      }
      dst[dIndex++] = n;
    }
    mAnchor = sIndex;
  }
  if (mAnchor === 0) {
    return 0;
  }
  literalCount = sEnd - mAnchor;
  if (literalCount >= runMask) {
    dst[dIndex++] = runMask << mlBits;
    for (n = literalCount - runMask; n >= 255; n -= 255) {
      dst[dIndex++] = 255;
    }
    dst[dIndex++] = n;
  } else {
    dst[dIndex++] = literalCount << mlBits;
  }
  sIndex = mAnchor;
  while (sIndex < sEnd) {
    dst[dIndex++] = src[sIndex++];
  }
  return dIndex;
}
function compressFrame(src, dst) {
  let dIndex = 0;
  writeU32(dst, dIndex, magicNum);
  dIndex += 4;
  dst[dIndex++] = fdVersion;
  dst[dIndex++] = bsDefault << bsShift;
  dst[dIndex] = hash(0, dst, 4, dIndex - 4) >> 8;
  dIndex++;
  const maxBlockSize = bsMap[bsDefault];
  let remaining = src.length;
  let sIndex = 0;
  clearHashTable(hashTable);
  while (remaining > 0) {
    let compSize = 0;
    const blockSize = remaining > maxBlockSize ? maxBlockSize : remaining;
    compSize = compressBlock(src, blockBuf, sIndex, blockSize, hashTable);
    if (compSize > blockSize || compSize === 0) {
      writeU32(dst, dIndex, 2147483648 | blockSize);
      dIndex += 4;
      for (let z = sIndex + blockSize; sIndex < z; ) {
        dst[dIndex++] = src[sIndex++];
      }
      remaining -= blockSize;
    } else {
      writeU32(dst, dIndex, compSize);
      dIndex += 4;
      for (let j = 0; j < compSize; ) {
        dst[dIndex++] = blockBuf[j++];
      }
      sIndex += blockSize;
      remaining -= blockSize;
    }
  }
  writeU32(dst, dIndex, 0);
  dIndex += 4;
  return dIndex;
}
function compress(src, maxSize) {
  let dst, size;
  if (maxSize === void 0) {
    maxSize = compressBound(src.length);
  }
  dst = makeBuffer(maxSize);
  size = compressFrame(src, dst);
  if (size !== maxSize) {
    dst = sliceArray(dst, 0, size);
  }
  return dst;
}

// src/vendor/hfjs-xet/utils/XetBlob.ts
var XET_CHUNK_HEADER_BYTES = 8;
function bg4_split_bytes(bytes) {
  const ret = new Uint8Array(bytes.byteLength);
  const split = Math.floor(bytes.byteLength / 4);
  const rem = bytes.byteLength % 4;
  const g1_pos = split + (rem >= 1 ? 1 : 0);
  const g2_pos = g1_pos + split + (rem >= 2 ? 1 : 0);
  const g3_pos = g2_pos + split + (rem == 3 ? 1 : 0);
  for (let i = 0, j = 0; i < bytes.byteLength; i += 4, j++) {
    ret[j] = bytes[i];
  }
  for (let i = 1, j = g1_pos; i < bytes.byteLength; i += 4, j++) {
    ret[j] = bytes[i];
  }
  for (let i = 2, j = g2_pos; i < bytes.byteLength; i += 4, j++) {
    ret[j] = bytes[i];
  }
  for (let i = 3, j = g3_pos; i < bytes.byteLength; i += 4, j++) {
    ret[j] = bytes[i];
  }
  return ret;
}

// src/vendor/hfjs-xet/utils/ChunkCache.ts
var CHUNK_CACHE_INITIAL_SIZE = 1e4;
var CHUNK_CACHE_GROW_FACTOR = 1.5;
var CHUNK_CACHE_MAX_SIZE = 1e6;
var ChunkCache = class {
  index = 0;
  // Index >= 0 means local xorb, < 0 means remote xorb
  xorbIndices;
  // Max 8K chunks per xorb, less than 64K uint16_t
  chunkIndices;
  map = /* @__PURE__ */ new Map();
  // hash -> chunkCacheIndex. Less overhead that way, empty object is 60+B and empty array is 40+B
  hmacs = /* @__PURE__ */ new Set();
  // todo : remove old hmacs
  maxSize;
  constructor(maxSize = CHUNK_CACHE_MAX_SIZE) {
    if (maxSize < 1) {
      throw new Error("maxSize must be at least 1");
    }
    this.maxSize = maxSize;
    this.xorbIndices = new Int32Array(Math.min(CHUNK_CACHE_INITIAL_SIZE, maxSize));
    this.chunkIndices = new Uint16Array(Math.min(CHUNK_CACHE_INITIAL_SIZE, maxSize));
  }
  addChunkToCache(hash3, xorbIndex, chunkIndex, hmac2) {
    if (this.map.has(hash3)) {
      return;
    }
    if (this.map.values().next().value === this.index) {
      this.map.delete(this.map.keys().next().value);
    }
    this.map.set(hash3, this.index);
    if (hmac2 !== null) {
      this.hmacs.add(hmac2);
    }
    if (this.index >= this.xorbIndices.length) {
      const oldXorbIndices = this.xorbIndices;
      const oldChunkIndices = this.chunkIndices;
      this.xorbIndices = new Int32Array(Math.min(this.xorbIndices.length * CHUNK_CACHE_GROW_FACTOR, this.maxSize));
      this.chunkIndices = new Uint16Array(Math.min(this.chunkIndices.length * CHUNK_CACHE_GROW_FACTOR, this.maxSize));
      this.xorbIndices.set(oldXorbIndices);
      this.chunkIndices.set(oldChunkIndices);
    }
    this.xorbIndices[this.index] = xorbIndex;
    this.chunkIndices[this.index] = chunkIndex;
    this.index = (this.index + 1) % this.maxSize;
  }
  getChunk(hash3, hmacFunction) {
    let index = this.map.get(hash3);
    if (index === void 0 && hmacFunction !== null) {
      for (const hmac2 of this.hmacs) {
        index = this.map.get(hmacFunction(hash3, hmac2));
        if (index !== void 0) {
          break;
        }
      }
    }
    if (index === void 0) {
      return void 0;
    }
    return {
      xorbIndex: this.xorbIndices[index],
      chunkIndex: this.chunkIndices[index]
    };
  }
  updateChunkIndex(hash3, chunkIndex) {
    const index = this.map.get(hash3);
    if (index === void 0) {
      throw new Error(`Chunk not found in cache: ${hash3}`);
    }
    this.chunkIndices[index] = chunkIndex;
  }
  removeChunkFromCache(hash3) {
    this.map.delete(hash3);
  }
};

// src/vendor/hfjs-xet/utils/xetWriteToken.ts
var JWT_SAFETY_PERIOD = 6e4;
var JWT_CACHE_SIZE = 1e3;
var jwtPromises = /* @__PURE__ */ new Map();
var jwts = /* @__PURE__ */ new Map();
async function xetWriteToken(params) {
  if (params.xetParams.expiresAt && params.xetParams.casUrl && params.xetParams.accessToken && params.xetParams.expiresAt > new Date(Date.now() + JWT_SAFETY_PERIOD)) {
    return { accessToken: params.xetParams.accessToken, casUrl: params.xetParams.casUrl };
  }
  const key = params.xetParams.refreshWriteTokenUrl;
  const jwt = jwts.get(key);
  if (jwt && jwt.expiresAt > new Date(Date.now() + JWT_SAFETY_PERIOD)) {
    return { accessToken: jwt.accessToken, casUrl: jwt.casUrl };
  }
  const existingPromise = jwtPromises.get(key);
  if (existingPromise) {
    return existingPromise;
  }
  const promise = (async () => {
    const resp = await (params.fetch ?? fetch)(params.xetParams.refreshWriteTokenUrl, {
      headers: {
        ...params.accessToken ? {
          Authorization: `Bearer ${params.accessToken}`
        } : {},
        ...params.xetParams.sessionId ? { "X-Xet-Session-Id": params.xetParams.sessionId } : {}
      }
    });
    if (!resp.ok) {
      throw await createApiError(resp);
    }
    const json = await resp.json();
    const jwt2 = {
      accessToken: json.accessToken,
      expiresAt: new Date(json.exp * 1e3),
      casUrl: json.casUrl
    };
    jwtPromises.delete(key);
    for (const [key2, value] of jwts.entries()) {
      if (value.expiresAt < new Date(Date.now() + JWT_SAFETY_PERIOD)) {
        jwts.delete(key2);
      } else {
        break;
      }
    }
    if (jwts.size >= JWT_CACHE_SIZE) {
      const keyToDelete = jwts.keys().next().value;
      if (keyToDelete) {
        jwts.delete(keyToDelete);
      }
    }
    jwts.set(key, jwt2);
    return {
      accessToken: json.accessToken,
      casUrl: json.casUrl
    };
  })();
  jwtPromises.set(key, promise);
  return promise;
}

// src/vendor/hfjs-xet/utils/shardParser.ts
var HASH_LENGTH = 32;
var XORB_HASH_BOOKEND = "ff".repeat(HASH_LENGTH);
function readHashFromArray(array, offset) {
  let hash3 = "";
  for (let i = 0; i < HASH_LENGTH; i += 8) {
    hash3 += `${array[offset + i + 7].toString(16).padStart(2, "0")}${array[offset + i + 6].toString(16).padStart(2, "0")}${array[offset + i + 5].toString(16).padStart(2, "0")}${array[offset + i + 4].toString(16).padStart(2, "0")}${array[offset + i + 3].toString(16).padStart(2, "0")}${array[offset + i + 2].toString(16).padStart(2, "0")}${array[offset + i + 1].toString(16).padStart(2, "0")}${array[offset + i].toString(16).padStart(2, "0")}`;
  }
  return hash3;
}
async function parseShardData(shardBlob) {
  const shard = new Uint8Array(await shardBlob.arrayBuffer());
  const shardView = new DataView(shard.buffer);
  const magicTag = shard.slice(0, SHARD_MAGIC_TAG.length);
  if (!magicTag.every((byte, i) => byte === SHARD_MAGIC_TAG[i])) {
    throw new Error("Invalid shard magic tag");
  }
  const version = shardView.getBigUint64(SHARD_MAGIC_TAG.length, true);
  if (version !== SHARD_HEADER_VERSION) {
    throw new Error(`Invalid shard version: ${version}`);
  }
  const footerSize = Number(shardView.getBigUint64(SHARD_MAGIC_TAG.length + 8, true));
  const footerStart = shard.length - footerSize;
  const footerVersion = shardView.getBigUint64(footerStart, true);
  if (footerVersion !== SHARD_FOOTER_VERSION) {
    throw new Error(`Invalid shard footer version: ${footerVersion}`);
  }
  const xorbInfoStart = Number(shardView.getBigUint64(footerStart + 16, true));
  const fileLookupStart = Number(shardView.getBigUint64(footerStart + 24, true));
  const hmacKey = readHashFromArray(shard, footerStart + 72);
  const xorbs = [];
  let offset = xorbInfoStart;
  while (offset < fileLookupStart) {
    const xorbHash2 = readHashFromArray(shard, offset);
    offset += HASH_LENGTH;
    if (xorbHash2 === XORB_HASH_BOOKEND) {
      break;
    }
    offset += 4;
    const chunkCount = shardView.getUint32(offset, true);
    offset += 4;
    offset += 4;
    offset += 4;
    const chunks = [];
    for (let i = 0; i < chunkCount; i++) {
      const chunkHash = readHashFromArray(shard, offset);
      offset += HASH_LENGTH;
      const startOffset = shardView.getUint32(offset, true);
      offset += 4;
      const length = shardView.getUint32(offset, true);
      offset += 4;
      offset += 8;
      chunks.push({
        hash: chunkHash,
        startOffset,
        unpackedLength: length
      });
    }
    xorbs.push({
      hash: xorbHash2,
      chunks
    });
  }
  return {
    hmacKey,
    xorbs
  };
}

// src/vendor/hfjs-xet/utils/sum.ts
function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// src/vendor/hfjs-xet/utils/SplicedBlob.ts
var SplicedBlob = class _SplicedBlob extends Blob {
  originalBlob;
  spliceOperations;
  constructor(originalBlob, spliceOperations) {
    super();
    this.originalBlob = originalBlob;
    this.spliceOperations = spliceOperations;
  }
  static create(originalBlob, operations) {
    for (const op of operations) {
      if (op.start < 0 || op.end < 0) {
        throw new Error("Invalid start/end positions for SplicedBlob");
      }
      if (op.start > originalBlob.size || op.end > originalBlob.size) {
        throw new Error("Invalid start/end positions for SplicedBlob");
      }
      if (op.start > op.end) {
        throw new Error("Invalid start/end positions for SplicedBlob");
      }
    }
    const sortedOps = [...operations].sort((a, b) => a.start - b.start);
    for (let i = 0; i < sortedOps.length - 1; i++) {
      if (sortedOps[i].end > sortedOps[i + 1].start) {
        throw new Error("Overlapping splice operations are not supported");
      }
    }
    return new _SplicedBlob(originalBlob, sortedOps);
  }
  /**
   * Returns the size of the spliced blob.
   * Size = original size - total replaced size + total insert size
   */
  get size() {
    let totalReplacedSize = 0;
    let totalInsertSize = 0;
    for (const op of this.spliceOperations) {
      totalReplacedSize += op.end - op.start;
      totalInsertSize += op.insert.size;
    }
    return this.originalBlob.size - totalReplacedSize + totalInsertSize;
  }
  /**
   * Returns the MIME type of the original blob.
   */
  get type() {
    return this.originalBlob.type;
  }
  /**
   * Returns a new instance of SplicedBlob that is a slice of the current one.
   *
   * The slice is inclusive of the start and exclusive of the end.
   * The slice method does not support negative start/end.
   *
   * @param start beginning of the slice
   * @param end end of the slice
   */
  slice(start = 0, end = this.size) {
    if (start < 0 || end < 0) {
      throw new TypeError("Unsupported negative start/end on SplicedBlob.slice");
    }
    start = Math.min(start, this.size);
    end = Math.min(end, this.size);
    if (start >= end) {
      return new Blob([]);
    }
    const segments = this.segments;
    const segmentBoundaries = [0];
    let cumulativeSize = 0;
    for (const segment of segments) {
      cumulativeSize += segment.size;
      segmentBoundaries.push(cumulativeSize);
    }
    const resultSegments = [];
    for (let i = 0; i < segments.length; i++) {
      const segmentStart = segmentBoundaries[i];
      const segmentEnd = segmentBoundaries[i + 1];
      if (segmentEnd <= start) {
        continue;
      }
      if (segmentStart >= end) {
        break;
      }
      const sliceStart = Math.max(0, start - segmentStart);
      const sliceEnd = Math.min(segments[i].size, end - segmentStart);
      if (sliceStart < sliceEnd) {
        resultSegments.push(segments[i].slice(sliceStart, sliceEnd));
      }
    }
    return new Blob(resultSegments);
  }
  get firstSpliceIndex() {
    return this.spliceOperations[0]?.start ?? Infinity;
  }
  /**
   * Read the spliced blob content and returns it as an ArrayBuffer.
   */
  async arrayBuffer() {
    const segments = this.segments;
    const buffers = await Promise.all(segments.map((segment) => segment.arrayBuffer()));
    const totalSize = sum(buffers.map((buffer) => buffer.byteLength));
    const result = new Uint8Array(totalSize);
    let offset = 0;
    for (const buffer of buffers) {
      result.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }
    return result.buffer;
  }
  /**
   * Read the spliced blob content and returns it as a string.
   */
  async text() {
    const buffer = await this.arrayBuffer();
    return new TextDecoder().decode(buffer);
  }
  /**
   * Returns a stream around the spliced blob content.
   */
  stream() {
    const readable = new ReadableStream({
      start: async (controller) => {
        try {
          const segments = this.segments;
          for (const segment of segments) {
            const reader = segment.stream().getReader();
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                controller.enqueue(value);
              }
            } finally {
              reader.releaseLock();
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });
    return readable;
  }
  /**
   * Get all segments that make up the spliced blob.
   * This includes original blob segments between splice operations and insert blobs.
   */
  get segments() {
    const segments = [];
    let currentPosition = 0;
    const sortedOps = [...this.spliceOperations].sort((a, b) => a.start - b.start);
    for (const op of sortedOps) {
      if (currentPosition < op.start) {
        segments.push(this.originalBlob.slice(currentPosition, op.start));
      }
      if (op.insert.size > 0) {
        segments.push(op.insert);
      }
      currentPosition = op.end;
    }
    if (currentPosition < this.originalBlob.size) {
      segments.push(this.originalBlob.slice(currentPosition));
    }
    return segments;
  }
};

// node_modules/gearhash-jit/dist/esm/table.js
var GEAR_TABLE = [
  0xb088d3a9e840f559n,
  0x5652c7f739ed20d6n,
  0x45b28969898972abn,
  0x6b0a89d5b68ec777n,
  0x368f573e8b7a31b7n,
  0x1dc636dce936d94bn,
  0x207a4c4e5554d5b6n,
  0xa474b34628239acbn,
  0x3b06a83e1ca3b912n,
  0x90e78d6c2f02baf7n,
  0xe1c92df7150d9a8an,
  0x8e95053a1086d3adn,
  0x5a2ef4f1b83a0722n,
  0xa50fac949f807faen,
  0x0e7303eb80d8d681n,
  0x99b07edc1570ad0fn,
  0x689d2fb555fd3076n,
  0x00005082119ea468n,
  0xc4b08306a88fcc28n,
  0x3eb0678af6374afdn,
  0xf19f87ab86ad7436n,
  0xf2129fbfbe6bc736n,
  0x481149575c98a4edn,
  0x0000010695477bc5n,
  0x1fba37801a9ceaccn,
  0x3bf06fd663a49b6dn,
  0x99687e9782e3874bn,
  0x79a10673aa50d8e3n,
  0xe4accf9e6211f420n,
  0x2520e71f87579071n,
  0x2bd5d3fd781a8a9bn,
  0x00de4dcddd11c873n,
  0xeaa9311c5a87392fn,
  0xdb748eb617bc40ffn,
  0xaf579a8df620bf6fn,
  0x86a6e5da1b09c2b1n,
  0xcc2fc30ac322a12en,
  0x355e2afec1f74267n,
  0x2d99c8f4c021a47bn,
  0xbade4b4a9404cfc3n,
  0xf7b518721d707d69n,
  0x3286b6587bf32c20n,
  0x0000b68886af270cn,
  0xa115d6e4db8a9079n,
  0x484f7e9c97b2e199n,
  0xccca7bb75713e301n,
  0xbf2584a62bb0f160n,
  0xade7e813625dbcc8n,
  0x000070940d87955an,
  0x8ae69108139e626fn,
  0xbd776ad72fde38a2n,
  0xfb6b001fc2fcc0cfn,
  0xc7a474b8e67bc427n,
  0xbaf6f11610eb5d58n,
  0x09cb1f5b6de770d1n,
  0xb0b219e6977d4c47n,
  0x00ccbc386ea7ad4an,
  0xcc849d0adf973f01n,
  0x73a3ef7d016af770n,
  0xc807d2d386bdbdfen,
  0x7f2ac9966c791730n,
  0xd037a86bc6c504dan,
  0xf3f17c661eaa609dn,
  0xaca626b04daae687n,
  0x755a99374f4a5b07n,
  0x90837ee65b2caeden,
  0x6ee8ad93fd560785n,
  0x0000d9e11053edd8n,
  0x9e063bb2d21cdbd7n,
  0x07ab77f12a01d2b2n,
  0xec550255e6641b44n,
  0x78fb94a8449c14c6n,
  0xc7510e1bc6c0f5f5n,
  0x0000320b36e4cae3n,
  0x827c33262c8b1a2dn,
  0x14675f0b48ea4144n,
  0x267bd3a6498decebn,
  0xf1916ff982f5035en,
  0x86221b7ff434fb88n,
  0x9dbecee7386f49d8n,
  0xea58f8cac80f8f4an,
  0x008d198692fc64d8n,
  0x6d38704fbabf9a36n,
  0xe032cb07d1e7be4cn,
  0x228d21f6ad450890n,
  0x635cb1bfc02589a5n,
  0x4620a1739ca2ce71n,
  0xa7e7dfe3aae5fb58n,
  0x0c10ca932b3c0debn,
  0x2727fee884afed7bn,
  0xa2df1c6df9e2ab1fn,
  0x4dcdd1ac0774f523n,
  0x000070ffad33e24en,
  0xa2ace87bc5977816n,
  0x9892275ab4286049n,
  0xc2861181ddf18959n,
  0xbb9972a042483e19n,
  0xef70cd3766513078n,
  0x00000513abfc9864n,
  0xc058b61858c94083n,
  0x09e850859725e0den,
  0x9197fb3bf83e7d94n,
  0x7e1e626d12b64bcen,
  0x520c54507f7b57d1n,
  0xbee1797174e22416n,
  0x6fd9ac3222e95587n,
  0x0023957c9adfbf3en,
  0xa01c7d7e234bbe15n,
  0xaba2c758b8a38cbbn,
  0x0d1fa0ceec3e2b30n,
  0x0bb6a58b7e60b991n,
  0x4333dd5b9fa26635n,
  0xc2fd3b7d4001c1a3n,
  0xfb41802454731127n,
  0x65a56185a50d18cbn,
  0xf67a02bd8784b54fn,
  0x696f11dd67e65063n,
  0x00002022fca814abn,
  0x8cd6be912db9d852n,
  0x695189b6e9ae8a57n,
  0xee9453b50ada0c28n,
  0xd8fc5ea91a78845en,
  0xab86bf191a4aa767n,
  0x0000c6b5c86415e5n,
  0x267310178e08a22en,
  0xed2d101b078bca25n,
  0x3b41ed84b226a8fbn,
  0x13e622120f28dc06n,
  0xa315f5ebfb706d26n,
  0x8816c34e3301bacen,
  0xe9395b9cbb71fdaen,
  0x002ce9202e721648n,
  0x4283db1d2bb3c91cn,
  0xd77d461ad2b1a6a5n,
  0xe2ec17e46eeb866bn,
  0xb8e0be4039fbc47cn,
  0xdea160c4d5299d04n,
  0x7eec86c8d28c3634n,
  0x2119ad129f98a399n,
  0xa6ccf46b61a283efn,
  0x2c52cedef658c617n,
  0x2db4871169acdd83n,
  0x0000f0d6f39ecbe9n,
  0x3dd5d8c98d2f9489n,
  0x8a1872a22b01f584n,
  0xf282a4c40e7b3cf2n,
  0x8020ec2ccb1ba196n,
  0x6693b6e09e59e313n,
  0x0000ce19cc7c83ebn,
  0x20cb5735f6479c3bn,
  0x762ebf3759d75a5bn,
  0x207bfe823d693975n,
  0xd77dc112339cd9d5n,
  0x9ba7834284627d03n,
  0x217dc513e95f51e9n,
  0xb27b1a29fc5e7816n,
  0x00d5cd9831bb662dn,
  0x71e39b806d75734cn,
  0x7e572af006fb1a23n,
  0xa2734f2f6ae91f85n,
  0xbf82c6b5022cddf2n,
  0x5c3beac60761a0den,
  0xcdc893bb47416998n,
  0x6d1085615c187e01n,
  0x77f8ae30ac277c5dn,
  0x917c6b81122a2c91n,
  0x5b75b699add16967n,
  0x0000cf6ae79a069bn,
  0xf3c40afa60de1104n,
  0x2063127aa59167c3n,
  0x621de62269d1894dn,
  0xd188ac1de62b4726n,
  0x107036e2154b673cn,
  0x0000b85f28553a1dn,
  0xf2ef4e4c18236f3dn,
  0xd9d6de6611b9f602n,
  0xa1fc7955fb47911cn,
  0xeb85fd032f298dbdn,
  0xbe27502fb3befae1n,
  0xe3034251c4cd661en,
  0x441364d354071836n,
  0x0082b36c75f2983en,
  0xb145910316fa66f0n,
  0x021c069c9847caf7n,
  0x2910dfc75a4b5221n,
  0x735b353e1c57a8b5n,
  0xce44312ce98ed96cn,
  0xbc942e4506bdfa65n,
  0xf05086a71257941bn,
  0xfec3b215d351ceadn,
  0x00ae1055e0144202n,
  0xf54b40846f42e454n,
  0x00007fd9c8bcbcc8n,
  0xbfbd9ef317de9bfen,
  0xa804302ff2854e12n,
  0x39ce4957a5e5d8d4n,
  0xffb9e2a45637ba84n,
  0x55b9ad1d9ea0818bn,
  0x00008acbf319178an,
  0x48e2bfc8d0fbfb38n,
  0x8be39841e848b5e8n,
  0x0e2712160696a08bn,
  0xd51096e84b44242an,
  0x1101ba176792e13an,
  0xc22e770f4531689dn,
  0x1689eff272bbc56cn,
  0x00a92a197f5650ecn,
  0xbc765990bda1784en,
  0xc61441e392fcb8aen,
  0x07e13a2ced31e4a0n,
  0x92cbe984234e9d4dn,
  0x8f4ff572bb7d8ac5n,
  0x0b9670c00b963bd0n,
  0x62955a581a03eb01n,
  0x645f83e5ea000254n,
  0x41fce516cd88f299n,
  0xbbda9748da7a98cfn,
  0x0000aab2fe4845fan,
  0x19761b069bf56555n,
  0x8b8f5e8343b6ad56n,
  0x3e5d1cfd144821d9n,
  0xec5c1e2ca2b0cd8fn,
  0xfaf7e0fea7fbb57fn,
  0x000000d3ba12961bn,
  0xda3f90178401b18en,
  0x70ff906de33a5febn,
  0x0527d5a7c06970e7n,
  0x22d8e773607c13e9n,
  0xc9ab70df643c3bacn,
  0xeda4c6dc8abe12e3n,
  0xecef1f410033e78an,
  0x0024c2b274ac72cbn,
  0x06740d954fa900b4n,
  0x1d7a299b323d6304n,
  0xb3c37cb298cbead5n,
  0xc986e3c76178739bn,
  0x9fabea364b46f58an,
  0x6da214c5af85cc56n,
  0x17a43ed8b7a38f84n,
  0x6eccec511d9adbebn,
  0xf9cab30913335afbn,
  0x4a5e60c5f415eed2n,
  0x00006967503672b4n,
  0x9da51d121454bb87n,
  0x84321e13b9bbc816n,
  0xfb3d6fb6ab2fdd8dn,
  0x60305eed8e160a8dn,
  0xcbbf4b14e9946ce8n,
  0x00004f63381b10c3n,
  0x07d5b7816fcc4e10n,
  0xe5a536726a6a8155n,
  0x57afb23447a07fddn,
  0x18f346f7abc9d394n,
  0x636dc655d61ad33dn,
  0xcc8bab4939f7f3f6n,
  0x63c7a906c1dd187bn
];

// node_modules/gearhash-jit/dist/esm/wasm.js
var TABLE_OFFSET = 0;
var HASH_OFFSET = 2048;
var MASK_OFFSET = 2056;
var INPUT_OFFSET = 4096;
var PAGES = 8;
var MAX_INPUT_SIZE = PAGES * 65536 - INPUT_OFFSET;
var wasmMemory = null;
var wasmView = null;
var wasmFn = null;
function toSignedLeb128(n) {
  const bytes = [];
  let value = n | 0;
  for (; ; ) {
    const byte = value & 127;
    value >>= 7;
    if (value === 0 && (byte & 64) === 0 || value === -1 && (byte & 64) !== 0) {
      bytes.push(byte);
      return bytes;
    }
    bytes.push(byte | 128);
  }
}
function toLebU32Padded5(n) {
  return [
    n & 127 | 128,
    n >>> 7 & 127 | 128,
    n >>> 14 & 127 | 128,
    n >>> 21 & 127 | 128,
    n >>> 28 & 15
  ];
}
function generateWasmBytes() {
  const code = [];
  function emit(...bytes) {
    code.push(...bytes);
  }
  emit(0, 97, 115, 109);
  emit(1, 0, 0, 0);
  emit(1, 7, 1, 96, 2, 127, 127, 1, 127);
  emit(2, 11, 1, 2, 106, 115, 3, 109, 101, 109, 2, 0, PAGES);
  emit(3, 2, 1, 0);
  emit(7, 13, 1, 9, 110, 101, 120, 116, 77, 97, 116, 99, 104, 0, 0);
  emit(10);
  const sectionSizeOff = code.length;
  emit(0, 0, 0, 0, 0);
  emit(1);
  const funcSizeOff = code.length;
  emit(0, 0, 0, 0, 0);
  const bodyStart = code.length;
  emit(2, 2, 126, 2, 127);
  emit(65, ...toSignedLeb128(HASH_OFFSET));
  emit(41, 3, 0);
  emit(33, 2);
  emit(65, ...toSignedLeb128(MASK_OFFSET));
  emit(41, 3, 0);
  emit(33, 3);
  emit(32, 0);
  emit(33, 4);
  emit(32, 0);
  emit(32, 1);
  emit(106);
  emit(33, 5);
  emit(2, 64);
  emit(3, 64);
  emit(32, 4);
  emit(32, 5);
  emit(78);
  emit(13, 1);
  emit(32, 2);
  emit(66, 1);
  emit(134);
  emit(32, 4);
  emit(45, 0, 0);
  emit(65, 3);
  emit(116);
  emit(41, 3, 0);
  emit(124);
  emit(34, 2);
  emit(32, 3);
  emit(131);
  emit(80);
  emit(4, 64);
  emit(65, ...toSignedLeb128(HASH_OFFSET));
  emit(32, 2);
  emit(55, 3, 0);
  emit(32, 4);
  emit(32, 0);
  emit(107);
  emit(65, 1);
  emit(106);
  emit(15);
  emit(11);
  emit(32, 4);
  emit(65, 1);
  emit(106);
  emit(33, 4);
  emit(12, 0);
  emit(11);
  emit(11);
  emit(65, ...toSignedLeb128(HASH_OFFSET));
  emit(32, 2);
  emit(55, 3, 0);
  emit(65, 127);
  emit(11);
  const bodySize = code.length - bodyStart;
  const bsPatch = toLebU32Padded5(bodySize);
  for (let i = 0; i < 5; i++)
    code[funcSizeOff + i] = bsPatch[i];
  const secSize = code.length - sectionSizeOff - 5;
  const ssPatch = toLebU32Padded5(secSize);
  for (let i = 0; i < 5; i++)
    code[sectionSizeOff + i] = ssPatch[i];
  return new Uint8Array(code);
}
function initWasm() {
  if (wasmFn)
    return;
  const bytes = generateWasmBytes();
  wasmMemory = new WebAssembly.Memory({ initial: PAGES });
  const module = new WebAssembly.Module(bytes);
  const instance = new WebAssembly.Instance(module, { js: { mem: wasmMemory } });
  wasmFn = instance.exports.nextMatch;
  wasmView = new Uint8Array(wasmMemory.buffer);
  const dv = new DataView(wasmMemory.buffer);
  for (let i = 0; i < 256; i++) {
    dv.setBigUint64(TABLE_OFFSET + i * 8, GEAR_TABLE[i], true);
  }
}
function wasmNextMatch(inputStart, inputLen) {
  return wasmFn(inputStart, inputLen);
}
function getView() {
  return wasmView;
}

// node_modules/gearhash-jit/dist/esm/index.js
var Hasher = class {
  maskBytes;
  /**
   * The current 64-bit rolling hash state as 8 little-endian bytes.
   * Updated after every `nextMatch` call. Zeroed by `resetHash()`.
   */
  hash;
  constructor(mask) {
    initWasm();
    this.maskBytes = new Uint8Array(8);
    this.hash = new Uint8Array(8);
    new DataView(this.maskBytes.buffer).setBigUint64(0, mask, true);
  }
  /**
   * Scan `buf` for the next gear-hash match. The internal hash state
   * carries over between calls (for split-buffer scanning).
   *
   * @returns 1-based byte position of the match, or -1 if none found.
   */
  nextMatch(buf) {
    const len = buf.length;
    if (len === 0)
      return -1;
    if (len > MAX_INPUT_SIZE) {
      throw new RangeError(`Input too large: ${len} > ${MAX_INPUT_SIZE}`);
    }
    const view = getView();
    view.set(this.hash, HASH_OFFSET);
    view.set(this.maskBytes, MASK_OFFSET);
    view.set(buf, INPUT_OFFSET);
    const pos = wasmNextMatch(INPUT_OFFSET, len);
    this.hash.set(view.subarray(HASH_OFFSET, HASH_OFFSET + 8));
    return pos;
  }
  /** Reset rolling hash to zero (call when starting a new chunk). */
  resetHash() {
    this.hash.fill(0);
  }
};

// node_modules/@huggingface/blake3-jit/dist/esm/compress.js
function compress2(cv, cvOff, block, blockOff, out, outOff, full, counter, blockLen, flags) {
  let m0 = block[blockOff] | 0;
  let m1 = block[blockOff + 1] | 0;
  let m2 = block[blockOff + 2] | 0;
  let m3 = block[blockOff + 3] | 0;
  let m4 = block[blockOff + 4] | 0;
  let m5 = block[blockOff + 5] | 0;
  let m6 = block[blockOff + 6] | 0;
  let m7 = block[blockOff + 7] | 0;
  let m8 = block[blockOff + 8] | 0;
  let m9 = block[blockOff + 9] | 0;
  let m10 = block[blockOff + 10] | 0;
  let m11 = block[blockOff + 11] | 0;
  let m12 = block[blockOff + 12] | 0;
  let m13 = block[blockOff + 13] | 0;
  let m14 = block[blockOff + 14] | 0;
  let m15 = block[blockOff + 15] | 0;
  let s0 = cv[cvOff] | 0;
  let s1 = cv[cvOff + 1] | 0;
  let s2 = cv[cvOff + 2] | 0;
  let s3 = cv[cvOff + 3] | 0;
  let s4 = cv[cvOff + 4] | 0;
  let s5 = cv[cvOff + 5] | 0;
  let s6 = cv[cvOff + 6] | 0;
  let s7 = cv[cvOff + 7] | 0;
  let s8 = 1779033703;
  let s9 = 3144134277;
  let s10 = 1013904242;
  let s11 = 2773480762;
  let s12 = counter | 0;
  let s13 = counter / 4294967296 | 0;
  let s14 = blockLen | 0;
  let s15 = flags | 0;
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  {
    const t0 = m0, t1 = m1;
    m0 = m2;
    m2 = m3;
    m3 = m10;
    m10 = m12;
    m12 = m9;
    m9 = m11;
    m11 = m5;
    m5 = t0;
    m1 = m6;
    m6 = m4;
    m4 = m7;
    m7 = m13;
    m13 = m14;
    m14 = m15;
    m15 = m8;
    m8 = t1;
  }
  s0 = (s0 + s4 | 0) + m0 | 0;
  s12 ^= s0;
  s12 = s12 >>> 16 | s12 << 16;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 12 | s4 << 20;
  s0 = (s0 + s4 | 0) + m1 | 0;
  s12 ^= s0;
  s12 = s12 >>> 8 | s12 << 24;
  s8 = s8 + s12 | 0;
  s4 ^= s8;
  s4 = s4 >>> 7 | s4 << 25;
  s1 = (s1 + s5 | 0) + m2 | 0;
  s13 ^= s1;
  s13 = s13 >>> 16 | s13 << 16;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 12 | s5 << 20;
  s1 = (s1 + s5 | 0) + m3 | 0;
  s13 ^= s1;
  s13 = s13 >>> 8 | s13 << 24;
  s9 = s9 + s13 | 0;
  s5 ^= s9;
  s5 = s5 >>> 7 | s5 << 25;
  s2 = (s2 + s6 | 0) + m4 | 0;
  s14 ^= s2;
  s14 = s14 >>> 16 | s14 << 16;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 12 | s6 << 20;
  s2 = (s2 + s6 | 0) + m5 | 0;
  s14 ^= s2;
  s14 = s14 >>> 8 | s14 << 24;
  s10 = s10 + s14 | 0;
  s6 ^= s10;
  s6 = s6 >>> 7 | s6 << 25;
  s3 = (s3 + s7 | 0) + m6 | 0;
  s15 ^= s3;
  s15 = s15 >>> 16 | s15 << 16;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 12 | s7 << 20;
  s3 = (s3 + s7 | 0) + m7 | 0;
  s15 ^= s3;
  s15 = s15 >>> 8 | s15 << 24;
  s11 = s11 + s15 | 0;
  s7 ^= s11;
  s7 = s7 >>> 7 | s7 << 25;
  s0 = (s0 + s5 | 0) + m8 | 0;
  s15 ^= s0;
  s15 = s15 >>> 16 | s15 << 16;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 12 | s5 << 20;
  s0 = (s0 + s5 | 0) + m9 | 0;
  s15 ^= s0;
  s15 = s15 >>> 8 | s15 << 24;
  s10 = s10 + s15 | 0;
  s5 ^= s10;
  s5 = s5 >>> 7 | s5 << 25;
  s1 = (s1 + s6 | 0) + m10 | 0;
  s12 ^= s1;
  s12 = s12 >>> 16 | s12 << 16;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 12 | s6 << 20;
  s1 = (s1 + s6 | 0) + m11 | 0;
  s12 ^= s1;
  s12 = s12 >>> 8 | s12 << 24;
  s11 = s11 + s12 | 0;
  s6 ^= s11;
  s6 = s6 >>> 7 | s6 << 25;
  s2 = (s2 + s7 | 0) + m12 | 0;
  s13 ^= s2;
  s13 = s13 >>> 16 | s13 << 16;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 12 | s7 << 20;
  s2 = (s2 + s7 | 0) + m13 | 0;
  s13 ^= s2;
  s13 = s13 >>> 8 | s13 << 24;
  s8 = s8 + s13 | 0;
  s7 ^= s8;
  s7 = s7 >>> 7 | s7 << 25;
  s3 = (s3 + s4 | 0) + m14 | 0;
  s14 ^= s3;
  s14 = s14 >>> 16 | s14 << 16;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 12 | s4 << 20;
  s3 = (s3 + s4 | 0) + m15 | 0;
  s14 ^= s3;
  s14 = s14 >>> 8 | s14 << 24;
  s9 = s9 + s14 | 0;
  s4 ^= s9;
  s4 = s4 >>> 7 | s4 << 25;
  if (full) {
    out[outOff + 8] = s8 ^ cv[cvOff];
    out[outOff + 9] = s9 ^ cv[cvOff + 1];
    out[outOff + 10] = s10 ^ cv[cvOff + 2];
    out[outOff + 11] = s11 ^ cv[cvOff + 3];
    out[outOff + 12] = s12 ^ cv[cvOff + 4];
    out[outOff + 13] = s13 ^ cv[cvOff + 5];
    out[outOff + 14] = s14 ^ cv[cvOff + 6];
    out[outOff + 15] = s15 ^ cv[cvOff + 7];
  }
  out[outOff] = s0 ^ s8;
  out[outOff + 1] = s1 ^ s9;
  out[outOff + 2] = s2 ^ s10;
  out[outOff + 3] = s3 ^ s11;
  out[outOff + 4] = s4 ^ s12;
  out[outOff + 5] = s5 ^ s13;
  out[outOff + 6] = s6 ^ s14;
  out[outOff + 7] = s7 ^ s15;
}

// node_modules/@huggingface/blake3-jit/dist/esm/constants.js
var IV = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var CHUNK_START = 1;
var CHUNK_END = 1 << 1;
var PARENT = 1 << 2;
var ROOT = 1 << 3;
var KEYED_HASH = 1 << 4;
var DERIVE_KEY_CONTEXT = 1 << 5;
var DERIVE_KEY_MATERIAL = 1 << 6;
var OUT_LEN = 32;
var KEY_LEN = 32;
var BLOCK_LEN = 64;
var CHUNK_LEN = 1024;
var MAX_DEPTH = 54;
var PERMUTATIONS = new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  2,
  6,
  3,
  10,
  7,
  0,
  4,
  13,
  1,
  11,
  12,
  5,
  9,
  14,
  15,
  8,
  3,
  4,
  10,
  12,
  13,
  2,
  7,
  14,
  6,
  5,
  9,
  0,
  11,
  15,
  8,
  1,
  10,
  7,
  12,
  9,
  14,
  3,
  13,
  15,
  4,
  0,
  11,
  2,
  5,
  8,
  1,
  6,
  12,
  13,
  9,
  11,
  15,
  10,
  14,
  8,
  7,
  2,
  5,
  3,
  0,
  1,
  6,
  4,
  9,
  14,
  11,
  5,
  8,
  12,
  15,
  1,
  13,
  3,
  0,
  10,
  2,
  6,
  4,
  7,
  11,
  15,
  5,
  0,
  1,
  9,
  8,
  6,
  14,
  10,
  2,
  12,
  3,
  4,
  7,
  13
]);

// node_modules/@huggingface/blake3-jit/dist/esm/utils.js
var IS_LITTLE_ENDIAN = new Uint8Array(new Uint32Array([16909060]).buffer)[0] === 4;
function readLittleEndianWordsFull(input, offset, words) {
  for (let i = 0; i < 16; ++i, offset += 4) {
    words[i] = input[offset] | input[offset + 1] << 8 | input[offset + 2] << 16 | input[offset + 3] << 24;
  }
}
function writeLittleEndianBytesPartial(words, wordOffset, output, byteOffset, byteCount) {
  const fullWords = byteCount >>> 2;
  let i = 0;
  for (; i < fullWords; ++i, byteOffset += 4) {
    const w = words[wordOffset + i];
    output[byteOffset] = w & 255;
    output[byteOffset + 1] = w >>> 8 & 255;
    output[byteOffset + 2] = w >>> 16 & 255;
    output[byteOffset + 3] = w >>> 24 & 255;
  }
  const remaining = byteCount & 3;
  if (remaining > 0) {
    const w = words[wordOffset + i];
    output[byteOffset] = w & 255;
    if (remaining > 1)
      output[byteOffset + 1] = w >>> 8 & 255;
    if (remaining > 2)
      output[byteOffset + 2] = w >>> 16 & 255;
  }
}
function encodeUTF8(str) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(str);
  }
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      bytes.push(c);
    } else if (c < 2048) {
      bytes.push(192 | c >> 6, 128 | c & 63);
    } else if (c < 55296 || c >= 57344) {
      bytes.push(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
    } else {
      i++;
      c = 65536 + ((c & 1023) << 10 | str.charCodeAt(i) & 1023);
      bytes.push(240 | c >> 18, 128 | c >> 12 & 63, 128 | c >> 6 & 63, 128 | c & 63);
    }
  }
  return new Uint8Array(bytes);
}
var CTZ32_TABLE = new Uint8Array([
  0,
  1,
  28,
  2,
  29,
  14,
  24,
  3,
  30,
  22,
  20,
  15,
  25,
  17,
  4,
  8,
  31,
  27,
  13,
  23,
  21,
  19,
  16,
  7,
  26,
  12,
  18,
  6,
  11,
  5,
  10,
  9
]);

// node_modules/@huggingface/blake3-jit/dist/esm/hasher.js
var XofReader = class {
  inputCv;
  blockWords;
  counter;
  blockLen;
  flags;
  outputBlock;
  outputBlockOffset;
  constructor(inputCv, blockWords, counter, blockLen, flags) {
    this.inputCv = inputCv;
    this.blockWords = blockWords;
    this.counter = counter;
    this.blockLen = blockLen;
    this.flags = flags | ROOT;
    this.outputBlock = new Uint32Array(16);
    this.outputBlockOffset = 64;
  }
  /**
   * Read the next `length` bytes of output.
   */
  read(length) {
    const output = new Uint8Array(length);
    let outputOffset = 0;
    while (outputOffset < length) {
      if (this.outputBlockOffset >= 64) {
        compress2(
          this.inputCv,
          0,
          this.blockWords,
          0,
          this.outputBlock,
          0,
          true,
          // full 64-byte output
          this.counter++,
          this.blockLen,
          this.flags
        );
        this.outputBlockOffset = 0;
      }
      const available = 64 - this.outputBlockOffset;
      const toCopy = Math.min(available, length - outputOffset);
      const wordOffset = this.outputBlockOffset >>> 2;
      const byteWithinWord = this.outputBlockOffset & 3;
      if (byteWithinWord === 0 && toCopy >= 4) {
        const fullWords = toCopy >>> 2;
        writeLittleEndianBytesPartial(this.outputBlock, wordOffset, output, outputOffset, fullWords << 2);
        const bytesCopied = fullWords << 2;
        outputOffset += bytesCopied;
        this.outputBlockOffset += bytesCopied;
      } else {
        for (let i = 0; i < toCopy; i++) {
          const wordIdx = this.outputBlockOffset + i >>> 2;
          const byteIdx = this.outputBlockOffset + i & 3;
          output[outputOffset + i] = this.outputBlock[wordIdx] >>> (byteIdx << 3) & 255;
        }
        outputOffset += toCopy;
        this.outputBlockOffset += toCopy;
      }
    }
    return output;
  }
};
var ChunkState = class {
  chainingValue;
  chunkCounter;
  blockWords;
  blockLen;
  blocksCompressed;
  flags;
  constructor(keyWords, chunkCounter, flags) {
    this.chainingValue = new Uint32Array(keyWords);
    this.chunkCounter = chunkCounter;
    this.blockWords = new Uint32Array(16);
    this.blockLen = 0;
    this.blocksCompressed = 0;
    this.flags = flags;
  }
  resetTo(keyWords, chunkCounter, flags) {
    this.chainingValue.set(keyWords);
    this.chunkCounter = chunkCounter;
    this.blockLen = 0;
    this.blocksCompressed = 0;
    this.flags = flags;
  }
  /**
   * Get the flags for the current block.
   */
  startFlag() {
    return this.blocksCompressed === 0 ? CHUNK_START : 0;
  }
  /**
   * Update the chunk state with input data.
   * Returns the number of bytes consumed.
   */
  update(input, inputOffset, inputLen) {
    let consumed = 0;
    while (inputLen > 0) {
      if (this.blockLen === BLOCK_LEN) {
        compress2(this.chainingValue, 0, this.blockWords, 0, this.chainingValue, 0, false, this.chunkCounter, BLOCK_LEN, this.flags | this.startFlag());
        this.blocksCompressed++;
        this.blockLen = 0;
      }
      const want = BLOCK_LEN - this.blockLen;
      const take = Math.min(want, inputLen);
      if (this.blockLen === 0 && take === BLOCK_LEN) {
        readLittleEndianWordsFull(input, inputOffset, this.blockWords);
      } else {
        for (let i = 0; i < take; i++) {
          const pos = this.blockLen + i;
          const wordIdx = pos >>> 2;
          const byteIdx = pos & 3;
          if (byteIdx === 0) {
            this.blockWords[wordIdx] = input[inputOffset + i];
          } else {
            this.blockWords[wordIdx] |= input[inputOffset + i] << (byteIdx << 3);
          }
        }
      }
      this.blockLen += take;
      inputOffset += take;
      inputLen -= take;
      consumed += take;
    }
    return consumed;
  }
  /**
   * Finalize this chunk and return its output.
   * Returns 8 words (chaining value) or 16 words (if root).
   */
  output() {
    const usedWords = this.blockLen + 3 >>> 2;
    for (let i = usedWords; i < 16; i++) {
      this.blockWords[i] = 0;
    }
    return {
      inputCv: this.chainingValue,
      blockWords: this.blockWords,
      blockLen: this.blockLen,
      counter: this.chunkCounter,
      flags: this.flags | this.startFlag() | CHUNK_END
    };
  }
  /**
   * Get the number of bytes in this chunk.
   */
  len() {
    return this.blocksCompressed * BLOCK_LEN + this.blockLen;
  }
};
var Hasher2 = class _Hasher {
  chunkState;
  keyWords;
  cvStack;
  cvStackLen;
  flags;
  parentBlock;
  parentCv;
  chunkCv;
  outWords;
  finalizeCv;
  /**
   * Create a new Hasher.
   *
   * @param keyWords - Initial key words (IV for regular hashing)
   * @param flags - Domain separation flags
   */
  constructor(keyWords, flags) {
    this.keyWords = keyWords ? new Uint32Array(keyWords) : new Uint32Array(IV);
    this.flags = flags ?? 0;
    this.chunkState = new ChunkState(this.keyWords, 0, this.flags);
    this.cvStack = new Uint32Array(MAX_DEPTH * 8);
    this.cvStackLen = 0;
    this.parentBlock = new Uint32Array(16);
    this.parentCv = new Uint32Array(8);
    this.chunkCv = new Uint32Array(8);
    this.outWords = new Uint32Array(16);
    this.finalizeCv = new Uint32Array(8);
  }
  /**
   * Reset the hasher to process a new message with the same key/flags.
   * Reuses all internal buffers — zero allocations.
   */
  reset() {
    this.chunkState.resetTo(this.keyWords, 0, this.flags);
    this.cvStackLen = 0;
    return this;
  }
  /**
   * Create a new keyed hasher (MAC).
   *
   * @param key - 32-byte key
   */
  static newKeyed(key) {
    if (key.length !== KEY_LEN) {
      throw new Error(`Key must be ${KEY_LEN} bytes, got ${key.length}`);
    }
    const keyWords = new Uint32Array(8);
    if (IS_LITTLE_ENDIAN) {
      const view = new Uint32Array(key.buffer, key.byteOffset, 8);
      keyWords.set(view);
    } else {
      for (let i = 0; i < 8; i++) {
        const off = i * 4;
        keyWords[i] = key[off] | key[off + 1] << 8 | key[off + 2] << 16 | key[off + 3] << 24;
      }
    }
    return new _Hasher(keyWords, KEYED_HASH);
  }
  /**
   * Create a new key derivation hasher.
   *
   * @param context - Context string for domain separation
   */
  static newDeriveKey(context) {
    const contextBytes = encodeUTF8(context);
    const contextHasher = new _Hasher(new Uint32Array(IV), DERIVE_KEY_CONTEXT);
    contextHasher.update(contextBytes);
    const contextKey = new Uint32Array(8);
    const output = contextHasher.finalizeOutput();
    compress2(output.inputCv, 0, output.blockWords, 0, contextKey, 0, false, output.counter, output.blockLen, output.flags | ROOT);
    return new _Hasher(contextKey, DERIVE_KEY_MATERIAL);
  }
  /**
   * Push a chaining value onto the stack.
   */
  pushCv(cv, cvOffset) {
    this.cvStack.set(cv.subarray(cvOffset, cvOffset + 8), this.cvStackLen * 8);
    this.cvStackLen++;
  }
  /**
   * Pop a chaining value from the stack.
   */
  popCv(out, outOffset) {
    this.cvStackLen--;
    out.set(this.cvStack.subarray(this.cvStackLen * 8, (this.cvStackLen + 1) * 8), outOffset);
  }
  /**
   * Add a chunk's chaining value and merge completed subtrees.
   */
  addChunkCv(newCv, newCvOffset, totalChunks) {
    const parentBlock = this.parentBlock;
    const parentCv = this.parentCv;
    while ((totalChunks & 1) === 0) {
      this.popCv(parentBlock, 0);
      parentBlock.set(newCv.subarray(newCvOffset, newCvOffset + 8), 8);
      compress2(this.keyWords, 0, parentBlock, 0, parentCv, 0, false, 0, BLOCK_LEN, this.flags | PARENT);
      newCv = parentCv;
      newCvOffset = 0;
      totalChunks >>>= 1;
    }
    this.pushCv(newCv, newCvOffset);
  }
  /**
   * Update the hasher with input data.
   *
   * @param input - Data to hash
   * @returns this (for chaining)
   */
  update(input) {
    let inputOffset = 0;
    let inputLen = input.length;
    while (inputLen > 0) {
      if (this.chunkState.len() === CHUNK_LEN) {
        const output = this.chunkState.output();
        const chunkCv = this.chunkCv;
        compress2(output.inputCv, 0, output.blockWords, 0, chunkCv, 0, false, output.counter, output.blockLen, output.flags);
        const totalChunks = this.chunkState.chunkCounter + 1;
        this.addChunkCv(chunkCv, 0, totalChunks);
        this.chunkState.resetTo(this.keyWords, totalChunks, this.flags);
      }
      const want = CHUNK_LEN - this.chunkState.len();
      const take = Math.min(want, inputLen);
      this.chunkState.update(input, inputOffset, take);
      inputOffset += take;
      inputLen -= take;
    }
    return this;
  }
  /**
   * Get the output parameters (for XOF mode or finalization).
   */
  finalizeOutput() {
    let output = this.chunkState.output();
    let parentBlock = this.parentBlock;
    let cv = this.finalizeCv;
    if (this.cvStackLen > 0) {
      compress2(output.inputCv, 0, output.blockWords, 0, cv, 0, false, output.counter, output.blockLen, output.flags);
      while (this.cvStackLen > 0) {
        this.cvStackLen--;
        parentBlock.set(this.cvStack.subarray(this.cvStackLen * 8, (this.cvStackLen + 1) * 8), 0);
        parentBlock.set(cv, 8);
        if (this.cvStackLen > 0) {
          compress2(this.keyWords, 0, parentBlock, 0, cv, 0, false, 0, BLOCK_LEN, this.flags | PARENT);
        } else {
          return {
            inputCv: this.keyWords,
            blockWords: parentBlock,
            blockLen: BLOCK_LEN,
            counter: 0,
            flags: this.flags | PARENT
          };
        }
      }
    }
    return output;
  }
  /**
   * Finalize the hash and return the result.
   *
   * @param outputLength - Number of bytes to output (default: 32)
   * @returns The hash output
   */
  finalize(outputLength = OUT_LEN) {
    const output = this.finalizeOutput();
    const result = new Uint8Array(outputLength);
    if (outputLength <= 64) {
      const outWords = this.outWords;
      compress2(
        output.inputCv,
        0,
        output.blockWords,
        0,
        outWords,
        0,
        outputLength > 32,
        // full output if > 32 bytes
        output.counter,
        output.blockLen,
        output.flags | ROOT
      );
      if (IS_LITTLE_ENDIAN) {
        const outBytes = new Uint8Array(outWords.buffer);
        result.set(outBytes.subarray(0, outputLength));
      } else {
        writeLittleEndianBytesPartial(outWords, 0, result, 0, outputLength);
      }
    } else {
      const xof = this.finalizeXof();
      const full = xof.read(outputLength);
      result.set(full);
    }
    return result;
  }
  /**
   * Finalize and return an XOF reader for arbitrary-length output.
   */
  finalizeXof() {
    const output = this.finalizeOutput();
    return new XofReader(new Uint32Array(output.inputCv), new Uint32Array(output.blockWords), output.counter, output.blockLen, output.flags);
  }
};

// node_modules/@huggingface/blake3-jit/dist/esm/wasm-simd.js
function toLebU32Min2(n) {
  return [n & 127 | 128, n >>> 7 & 127];
}
function toLebU32Padded52(n) {
  return [
    n & 127 | 128,
    n >>> 7 & 127 | 128,
    n >>> 14 & 127 | 128,
    n >>> 21 & 127 | 128,
    n >>> 28 & 15
    // Last byte has no continuation bit
  ];
}
function toSignedLeb128_i32(n) {
  const bytes = [];
  let value = n | 0;
  let more = true;
  while (more) {
    let byte = value & 127;
    value >>= 7;
    if (value === 0 && (byte & 64) === 0 || value === -1 && (byte & 64) !== 0) {
      more = false;
    } else {
      byte |= 128;
    }
    bytes.push(byte);
  }
  return bytes;
}
var MSG_ACCESS_ORDER = [
  // Round 1: 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  // Round 2: 2,6,3,10,7,0,4,13,1,11,12,5,9,14,15,8
  2,
  6,
  3,
  10,
  7,
  0,
  4,
  13,
  1,
  11,
  12,
  5,
  9,
  14,
  15,
  8,
  // Round 3: 3,4,10,12,13,2,7,14,6,5,9,0,11,15,8,1
  3,
  4,
  10,
  12,
  13,
  2,
  7,
  14,
  6,
  5,
  9,
  0,
  11,
  15,
  8,
  1,
  // Round 4: 10,7,12,9,14,3,13,15,4,0,11,2,5,8,1,6
  10,
  7,
  12,
  9,
  14,
  3,
  13,
  15,
  4,
  0,
  11,
  2,
  5,
  8,
  1,
  6,
  // Round 5: 12,13,9,11,15,10,14,8,7,2,5,3,0,1,6,4
  12,
  13,
  9,
  11,
  15,
  10,
  14,
  8,
  7,
  2,
  5,
  3,
  0,
  1,
  6,
  4,
  // Round 6: 9,14,11,5,8,12,15,1,13,3,0,10,2,6,4,7
  9,
  14,
  11,
  5,
  8,
  12,
  15,
  1,
  13,
  3,
  0,
  10,
  2,
  6,
  4,
  7,
  // Round 7: 11,15,5,0,1,9,8,6,14,10,2,12,3,4,7,13
  11,
  15,
  5,
  0,
  1,
  9,
  8,
  6,
  14,
  10,
  2,
  12,
  3,
  4,
  7,
  13
];
function generateWasmBytes2() {
  const code = [];
  function put(bytes) {
    code.push(...bytes);
  }
  put([0, 97, 115, 109]);
  put([1, 0, 0, 0]);
  put([1]);
  put([4]);
  put([1]);
  put([96, 0, 0]);
  put([2]);
  put([11]);
  put([1]);
  put([2, 106, 115]);
  put([3, 109, 101, 109]);
  put([2, 0, 1]);
  put([3]);
  put([4]);
  put([3]);
  put([0]);
  put([0]);
  put([0]);
  put([7]);
  put([50]);
  put([3]);
  put([10]);
  put([99, 111, 109, 112, 114, 101, 115, 115, 52, 120]);
  put([0, 0]);
  put([16]);
  put([
    99,
    111,
    109,
    112,
    114,
    101,
    115,
    115,
    67,
    104,
    117,
    110,
    107,
    115,
    52,
    120
  ]);
  put([0, 1]);
  put([14]);
  put([99, 111, 109, 112, 114, 101, 115, 115, 80, 97, 114, 101, 110, 116]);
  put([0, 2]);
  put([10]);
  const sectionSizeOffset = code.length;
  put([0, 0, 0, 0, 0]);
  put([3]);
  const funcSizeOffset = code.length;
  put([0, 0, 0, 0, 0]);
  const funcBodyStart = code.length;
  put([1]);
  put([32, 123]);
  for (let i = 0; i < 16; i++) {
    put([65, ...toLebU32Min2(i * 16)]);
    put([253, 0, 2, 0]);
    put([33, i]);
  }
  for (let i = 0; i < 8; i++) {
    put([65, ...toLebU32Min2(512 + i * 16)]);
    put([253, 0, 2, 0]);
    put([33, 16 + i]);
  }
  const IV2 = [1779033703, 3144134277, 1013904242, 2773480762];
  for (let i = 0; i < 4; i++) {
    const ivBytes = [];
    for (let j = 0; j < 4; j++) {
      ivBytes.push(IV2[i] & 255);
      ivBytes.push(IV2[i] >>> 8 & 255);
      ivBytes.push(IV2[i] >>> 16 & 255);
      ivBytes.push(IV2[i] >>> 24 & 255);
    }
    put([253, 12, ...ivBytes]);
    put([33, 24 + i]);
  }
  put([65, ...toLebU32Min2(768)]);
  put([253, 0, 2, 0]);
  put([33, 28]);
  put([65, ...toLebU32Min2(784)]);
  put([253, 0, 2, 0]);
  put([33, 29]);
  put([65, ...toLebU32Min2(800)]);
  put([253, 0, 2, 0]);
  put([33, 30]);
  put([65, ...toLebU32Min2(816)]);
  put([253, 0, 2, 0]);
  put([33, 31]);
  let msgIdx = 0;
  function g(a, b, c, d) {
    const mx = MSG_ACCESS_ORDER[msgIdx++];
    const my = MSG_ACCESS_ORDER[msgIdx++];
    put([32, 16 + a]);
    put([32, 16 + b]);
    put([253, 174, 1]);
    put([32, mx]);
    put([253, 174, 1]);
    put([33, 16 + a]);
    put([32, 16 + d]);
    put([32, 16 + a]);
    put([253, 81]);
    put([34, 16 + d]);
    put([32, 16 + d]);
    put([253, 13, 2, 3, 0, 1, 6, 7, 4, 5, 10, 11, 8, 9, 14, 15, 12, 13]);
    put([33, 16 + d]);
    put([32, 16 + c]);
    put([32, 16 + d]);
    put([253, 174, 1]);
    put([33, 16 + c]);
    put([32, 16 + b]);
    put([32, 16 + c]);
    put([253, 81]);
    put([34, 16 + b]);
    put([65, 12]);
    put([253, 173, 1]);
    put([32, 16 + b]);
    put([65, 20]);
    put([253, 171, 1]);
    put([253, 80]);
    put([33, 16 + b]);
    put([32, 16 + a]);
    put([32, 16 + b]);
    put([253, 174, 1]);
    put([32, my]);
    put([253, 174, 1]);
    put([33, 16 + a]);
    put([32, 16 + d]);
    put([32, 16 + a]);
    put([253, 81]);
    put([34, 16 + d]);
    put([32, 16 + d]);
    put([253, 13, 1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12]);
    put([33, 16 + d]);
    put([32, 16 + c]);
    put([32, 16 + d]);
    put([253, 174, 1]);
    put([33, 16 + c]);
    put([32, 16 + b]);
    put([32, 16 + c]);
    put([253, 81]);
    put([34, 16 + b]);
    put([65, 7]);
    put([253, 173, 1]);
    put([32, 16 + b]);
    put([65, 25]);
    put([253, 171, 1]);
    put([253, 80]);
    put([33, 16 + b]);
  }
  for (let round = 0; round < 7; round++) {
    g(0, 4, 8, 12);
    g(1, 5, 9, 13);
    g(2, 6, 10, 14);
    g(3, 7, 11, 15);
    g(0, 5, 10, 15);
    g(1, 6, 11, 12);
    g(2, 7, 8, 13);
    g(3, 4, 9, 14);
  }
  for (let i = 0; i < 8; i++) {
    put([65, ...toLebU32Min2(640 + i * 16)]);
    put([32, 16 + i]);
    put([32, 24 + i]);
    put([253, 81]);
    put([253, 11, 2, 0]);
  }
  put([11]);
  const funcBodySize = code.length - funcBodyStart;
  const funcSizeBytes = toLebU32Padded52(funcBodySize);
  for (let i = 0; i < 5; i++) {
    code[funcSizeOffset + i] = funcSizeBytes[i];
  }
  const func1SizeOffset = code.length;
  put([0, 0, 0, 0, 0]);
  const func1BodyStart = code.length;
  const compressChunksBody = generateCompressChunks4xBody();
  put(compressChunksBody);
  const func1BodySize = code.length - func1BodyStart;
  const func1SizeBytes = toLebU32Padded52(func1BodySize);
  for (let i = 0; i < 5; i++) {
    code[func1SizeOffset + i] = func1SizeBytes[i];
  }
  const func2SizeOffset = code.length;
  put([0, 0, 0, 0, 0]);
  const func2BodyStart = code.length;
  const compressParentBody = generateCompressParentBody();
  put(compressParentBody);
  const func2BodySize = code.length - func2BodyStart;
  const func2SizeBytes = toLebU32Padded52(func2BodySize);
  for (let i = 0; i < 5; i++) {
    code[func2SizeOffset + i] = func2SizeBytes[i];
  }
  const sectionSize = code.length - sectionSizeOffset - 5;
  const sectionSizeBytes = toLebU32Padded52(sectionSize);
  for (let i = 0; i < 5; i++) {
    code[sectionSizeOffset + i] = sectionSizeBytes[i];
  }
  return new Uint8Array(code);
}
function generateCompressChunks4xBody() {
  const code = [];
  function put(bytes) {
    code.push(...bytes);
  }
  put([2]);
  put([32, 123]);
  put([1, 127]);
  const BATCH_BLOCK_WORDS = SIMD_MEMORY.BATCH_BLOCK_WORDS;
  const BATCH_CV = SIMD_MEMORY.BATCH_CV;
  const BATCH_COUNTER_LOW = SIMD_MEMORY.BATCH_COUNTER_LOW;
  const BATCH_FLAGS_BASE = SIMD_MEMORY.BATCH_FLAGS_BASE;
  const BATCH_OUTPUT = SIMD_MEMORY.BATCH_OUTPUT;
  const IV2 = [1779033703, 3144134277, 1013904242, 2773480762];
  for (let i = 0; i < 8; i++) {
    put([65, ...toLebU32Min2(BATCH_CV + i * 16)]);
    put([253, 0, 2, 0]);
    put([33, 16 + i]);
  }
  put([65, 0]);
  put([33, 32]);
  put([2, 64]);
  put([3, 64]);
  for (let w = 0; w < 16; w++) {
    put([32, 32]);
    put([65, ...toLebU32Min2(256)]);
    put([108]);
    put([65, ...toLebU32Min2(BATCH_BLOCK_WORDS + w * 16)]);
    put([106]);
    put([253, 0, 2, 0]);
    put([33, w]);
  }
  for (let i = 0; i < 4; i++) {
    const ivBytes = [];
    for (let j = 0; j < 4; j++) {
      ivBytes.push(IV2[i] & 255);
      ivBytes.push(IV2[i] >>> 8 & 255);
      ivBytes.push(IV2[i] >>> 16 & 255);
      ivBytes.push(IV2[i] >>> 24 & 255);
    }
    put([253, 12, ...ivBytes]);
    put([33, 24 + i]);
  }
  put([65, ...toLebU32Min2(BATCH_COUNTER_LOW)]);
  put([253, 0, 2, 0]);
  put([33, 28]);
  put([253, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  put([33, 29]);
  const blockLen64 = [];
  for (let j = 0; j < 4; j++) {
    blockLen64.push(64, 0, 0, 0);
  }
  put([253, 12, ...blockLen64]);
  put([33, 30]);
  put([65, ...toLebU32Min2(BATCH_FLAGS_BASE)]);
  put([253, 0, 2, 0]);
  put([32, 32]);
  put([69]);
  put([32, 32]);
  put([65, 15]);
  put([70]);
  put([65, 1]);
  put([116]);
  put([114]);
  put([253, 17]);
  put([253, 80]);
  put([33, 31]);
  let msgIdx = 0;
  function g(a, b, c, d) {
    const mx = MSG_ACCESS_ORDER[msgIdx++];
    const my = MSG_ACCESS_ORDER[msgIdx++];
    put([32, 16 + a]);
    put([32, 16 + b]);
    put([253, 174, 1]);
    put([32, mx]);
    put([253, 174, 1]);
    put([33, 16 + a]);
    put([32, 16 + d]);
    put([32, 16 + a]);
    put([253, 81]);
    put([34, 16 + d]);
    put([32, 16 + d]);
    put([253, 13, 2, 3, 0, 1, 6, 7, 4, 5, 10, 11, 8, 9, 14, 15, 12, 13]);
    put([33, 16 + d]);
    put([32, 16 + c]);
    put([32, 16 + d]);
    put([253, 174, 1]);
    put([33, 16 + c]);
    put([32, 16 + b]);
    put([32, 16 + c]);
    put([253, 81]);
    put([34, 16 + b]);
    put([65, 12]);
    put([253, 173, 1]);
    put([32, 16 + b]);
    put([65, 20]);
    put([253, 171, 1]);
    put([253, 80]);
    put([33, 16 + b]);
    put([32, 16 + a]);
    put([32, 16 + b]);
    put([253, 174, 1]);
    put([32, my]);
    put([253, 174, 1]);
    put([33, 16 + a]);
    put([32, 16 + d]);
    put([32, 16 + a]);
    put([253, 81]);
    put([34, 16 + d]);
    put([32, 16 + d]);
    put([253, 13, 1, 2, 3, 0, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12]);
    put([33, 16 + d]);
    put([32, 16 + c]);
    put([32, 16 + d]);
    put([253, 174, 1]);
    put([33, 16 + c]);
    put([32, 16 + b]);
    put([32, 16 + c]);
    put([253, 81]);
    put([34, 16 + b]);
    put([65, 7]);
    put([253, 173, 1]);
    put([32, 16 + b]);
    put([65, 25]);
    put([253, 171, 1]);
    put([253, 80]);
    put([33, 16 + b]);
  }
  for (let round = 0; round < 7; round++) {
    g(0, 4, 8, 12);
    g(1, 5, 9, 13);
    g(2, 6, 10, 14);
    g(3, 7, 11, 15);
    g(0, 5, 10, 15);
    g(1, 6, 11, 12);
    g(2, 7, 8, 13);
    g(3, 4, 9, 14);
  }
  for (let i = 0; i < 8; i++) {
    put([32, 16 + i]);
    put([32, 24 + i]);
    put([253, 81]);
    put([33, 16 + i]);
  }
  put([32, 32]);
  put([65, 1]);
  put([106]);
  put([34, 32]);
  put([65, 16]);
  put([73]);
  put([13, 0]);
  put([11]);
  put([11]);
  for (let i = 0; i < 8; i++) {
    put([65, ...toLebU32Min2(BATCH_OUTPUT + i * 16)]);
    put([32, 16 + i]);
    put([253, 11, 2, 0]);
  }
  put([11]);
  return code;
}
function generateCompressParentBody() {
  const code = [];
  function put(bytes) {
    code.push(...bytes);
  }
  put([1]);
  put([32, 127]);
  const PARENT_BLOCK_OFFSET = SIMD_MEMORY.PARENT_BLOCK;
  const CHUNK_CV_OFFSET = SIMD_MEMORY.CHUNK_CV;
  const IV2 = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  for (let i = 0; i < 16; i++) {
    put([65, ...toLebU32Min2(PARENT_BLOCK_OFFSET + i * 4)]);
    put([40, 2, 0]);
    put([33, i]);
  }
  for (let i = 0; i < 8; i++) {
    put([65, ...toSignedLeb128_i32(IV2[i])]);
    put([33, 16 + i]);
  }
  for (let i = 0; i < 4; i++) {
    put([65, ...toSignedLeb128_i32(IV2[i])]);
    put([33, 24 + i]);
  }
  put([65, 0]);
  put([33, 28]);
  put([65, 0]);
  put([33, 29]);
  put([65, 192, 0]);
  put([33, 30]);
  put([65, 4]);
  put([33, 31]);
  function g(a, b, c, d, mx, my) {
    const sa = 16 + a, sb = 16 + b, sc = 16 + c, sd = 16 + d;
    put([32, sa]);
    put([32, sb]);
    put([106]);
    put([32, mx]);
    put([106]);
    put([33, sa]);
    put([32, sd]);
    put([32, sa]);
    put([115]);
    put([65, 16]);
    put([120]);
    put([33, sd]);
    put([32, sc]);
    put([32, sd]);
    put([106]);
    put([33, sc]);
    put([32, sb]);
    put([32, sc]);
    put([115]);
    put([65, 12]);
    put([120]);
    put([33, sb]);
    put([32, sa]);
    put([32, sb]);
    put([106]);
    put([32, my]);
    put([106]);
    put([33, sa]);
    put([32, sd]);
    put([32, sa]);
    put([115]);
    put([65, 8]);
    put([120]);
    put([33, sd]);
    put([32, sc]);
    put([32, sd]);
    put([106]);
    put([33, sc]);
    put([32, sb]);
    put([32, sc]);
    put([115]);
    put([65, 7]);
    put([120]);
    put([33, sb]);
  }
  let msgIdx = 0;
  for (let round = 0; round < 7; round++) {
    g(0, 4, 8, 12, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(1, 5, 9, 13, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(2, 6, 10, 14, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(3, 7, 11, 15, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(0, 5, 10, 15, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(1, 6, 11, 12, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(2, 7, 8, 13, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
    g(3, 4, 9, 14, MSG_ACCESS_ORDER[msgIdx], MSG_ACCESS_ORDER[msgIdx + 1]);
    msgIdx += 2;
  }
  for (let i = 0; i < 8; i++) {
    put([65, ...toLebU32Min2(CHUNK_CV_OFFSET + i * 4)]);
    put([32, 16 + i]);
    put([32, 24 + i]);
    put([115]);
    put([54, 2, 0]);
  }
  put([11]);
  return code;
}
var wasmInstance = null;
var wasmMemory2 = null;
var wasmCompress4x = null;
var wasmCompressChunks4x = null;
var wasmCompressParent = null;
var wasmMemoryView = null;
var wasmMemoryView32 = null;
function isSimdSupported() {
  try {
    const simdTest = new Uint8Array([
      0,
      97,
      115,
      109,
      // magic: \0asm
      1,
      0,
      0,
      0,
      // version: 1
      // Type section (id=1): () -> v128
      1,
      // section id = 1 (type)
      5,
      // section length = 5
      1,
      // 1 type
      96,
      0,
      1,
      123,
      // func () -> v128
      // Function section (id=3)
      3,
      // section id = 3 (function)
      2,
      // section length = 2
      1,
      // 1 function
      0,
      // type index 0
      // Code section (id=10) with v128.const
      10,
      // section id = 10 (code)
      22,
      // section length = 22
      1,
      // 1 function body
      20,
      // body length = 20
      0,
      // 0 locals
      253,
      12,
      // v128.const opcode
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      11
      // end
    ]);
    return WebAssembly.validate(simdTest);
  } catch {
    return false;
  }
}
function setupArenaViews() {
  if (!wasmMemory2)
    return;
  const buffer = wasmMemory2.buffer;
  arenaCvStack = new Uint32Array(buffer, SIMD_MEMORY.CV_STACK, 64 * 8);
  arenaParentBlock = new Uint32Array(buffer, SIMD_MEMORY.PARENT_BLOCK, 16);
  arenaChunkCv = new Uint32Array(buffer, SIMD_MEMORY.CHUNK_CV, 8);
  arenaTempCvs = new Uint32Array(buffer, SIMD_MEMORY.TEMP_CVS, 32);
  arenaBatchBlockWords = new Uint32Array(buffer, SIMD_MEMORY.BATCH_BLOCK_WORDS, 16 * 16 * 4);
  arenaBatchCv = new Uint32Array(buffer, SIMD_MEMORY.BATCH_CV, 32);
  arenaBatchCounterLow = new Uint32Array(buffer, SIMD_MEMORY.BATCH_COUNTER_LOW, 4);
  arenaBatchFlagsBase = new Uint32Array(buffer, SIMD_MEMORY.BATCH_FLAGS_BASE, 4);
  arenaBatchOutput = new Uint32Array(buffer, SIMD_MEMORY.BATCH_OUTPUT, 32);
}
var cachedWasmBytes = null;
function initSimdSync() {
  if (wasmInstance)
    return true;
  if (!isSimdSupported()) {
    return false;
  }
  try {
    const wasmBytes = cachedWasmBytes || generateWasmBytes2();
    cachedWasmBytes = wasmBytes;
    wasmMemory2 = new WebAssembly.Memory({ initial: 1 });
    const importObject = {
      js: { mem: wasmMemory2 }
    };
    const module = new WebAssembly.Module(wasmBytes.buffer);
    wasmInstance = new WebAssembly.Instance(module, importObject);
    wasmCompress4x = wasmInstance.exports.compress4x;
    wasmCompressChunks4x = wasmInstance.exports.compressChunks4x;
    wasmCompressParent = wasmInstance.exports.compressParent;
    wasmMemoryView = new Uint8Array(wasmMemory2.buffer);
    wasmMemoryView32 = new Uint32Array(wasmMemory2.buffer);
    setupArenaViews();
    return true;
  } catch (e) {
    console.warn("Failed to initialize WASM SIMD:", e);
    return false;
  }
}
var SIMD_MEMORY = {
  // SIMD compress4x working area (used by WASM code) - single block
  BLOCK_WORDS: 0,
  // 4 x 16 words = 512 bytes (transposed layout)
  CHAINING_VALUES: 512,
  // 4 x 8 words = 128 bytes
  OUTPUT: 640,
  // 4 x 8 words = 128 bytes
  COUNTER_LOW: 768,
  // 4 words = 16 bytes
  COUNTER_HIGH: 784,
  // 4 words = 16 bytes
  BLOCK_LEN: 800,
  // 4 words = 16 bytes
  FLAGS: 816,
  // 4 words = 16 bytes
  // End of single-block SIMD working area: 832 bytes
  // SIMD compressChunks4x working area - 16 blocks batched
  // Each block position has 16 v128 values (one per message word) = 256 bytes
  // 16 block positions = 16 × 256 = 4096 bytes
  BATCH_BLOCK_WORDS: 832,
  // 16 positions × 256 bytes = 4096 bytes (transposed), ends at 4928
  BATCH_CV: 4928,
  // 4 × 8 words × 4 bytes = 128 bytes (working CVs), ends at 5056
  BATCH_COUNTER_LOW: 5056,
  // 4 words × 4 bytes = 16 bytes (per-chunk counters), ends at 5072
  BATCH_FLAGS_BASE: 5072,
  // 4 words × 4 bytes = 16 bytes (base flags, no START/END), ends at 5088
  BATCH_OUTPUT: 5088,
  // 4 × 8 words × 4 bytes = 128 bytes (final output), ends at 5216
  // End of batch working area: 5216 bytes
  // WASM Arena: JS working buffers (accessed via TypedArray views)
  CV_STACK: 5216,
  // 64 levels × 8 words × 4 bytes = 2048 bytes, ends at 7264
  PARENT_BLOCK: 7264,
  // 16 words × 4 bytes = 64 bytes, ends at 7328
  CHUNK_CV: 7328,
  // 8 words × 4 bytes = 32 bytes, ends at 7360
  TEMP_CVS: 7360
  // 4 × 8 words × 4 bytes = 128 bytes, ends at 7488
  // Total arena usage: ~7488 bytes (fits comfortably in 64KB page)
};
var arenaCvStack = null;
var arenaParentBlock = null;
var arenaChunkCv = null;
var arenaTempCvs = null;
var arenaBatchBlockWords = null;
var arenaBatchCv = null;
var arenaBatchCounterLow = null;
var arenaBatchFlagsBase = null;
var arenaBatchOutput = null;

// node_modules/@huggingface/blake3-jit/dist/esm/hash.js
var CV_STACK_DEPTH = 64;
var HYPER_CV_STACK = new Uint32Array(CV_STACK_DEPTH * 8);
var CV_POOL_SIZE = 64;
var CV_POOL = new Uint32Array(CV_POOL_SIZE * 8);
var CV_VIEWS = [];
for (let i = 0; i < CV_POOL_SIZE; i++) {
  CV_VIEWS.push(CV_POOL.subarray(i * 8, i * 8 + 8));
}
var simdAvailable = false;
var SIMD_THRESHOLD = 4 * CHUNK_LEN;
function ensureSimdSync() {
  if (simdAvailable)
    return true;
  simdAvailable = initSimdSync();
  return simdAvailable;
}
var simdChunkCvs = new Uint32Array(32);
var reusableTempCv = new Uint32Array(8);
var reusableChunkCv = new Uint32Array(8);
var reusablePureParentBlock = new Uint32Array(16);
var reusablePureParentCv = new Uint32Array(8);
var reusableSimdCvs = new Uint32Array(32);
var reusableSimdParentBlock = new Uint32Array(16);
var reusableSimdParentCv = new Uint32Array(8);
var reusableOffsets = new Uint32Array(4);
var reusableCounters = new Uint32Array(4);
var reusableBlockLens = new Uint32Array(4);
var reusableFlags = new Uint32Array(4);
var reusableOut8 = new Uint32Array(8);
var reusableOut8View = new Uint8Array(reusableOut8.buffer, 0, 32);
var SIMD_CV_BASE = SIMD_MEMORY.CHAINING_VALUES / 4;
var SIMD_OUT_BASE = SIMD_MEMORY.OUTPUT / 4;
var SIMD_COUNTER_LOW_BASE = SIMD_MEMORY.COUNTER_LOW / 4;
var SIMD_COUNTER_HIGH_BASE = SIMD_MEMORY.COUNTER_HIGH / 4;
var SIMD_BLOCK_LEN_BASE = SIMD_MEMORY.BLOCK_LEN / 4;
var BATCH_CV_BASE = SIMD_MEMORY.BATCH_CV / 4;
var BATCH_COUNTER_LOW_BASE = SIMD_MEMORY.BATCH_COUNTER_LOW / 4;
var BATCH_FLAGS_BASE_OFFSET = SIMD_MEMORY.BATCH_FLAGS_BASE / 4;
var BATCH_OUTPUT_BASE = SIMD_MEMORY.BATCH_OUTPUT / 4;
var batchChunkOffsets = new Uint32Array(4);
var SIMD_FLAGS_BASE = SIMD_MEMORY.FLAGS / 4;
function warmupSimd() {
  return ensureSimdSync();
}

// node_modules/@huggingface/blake3-jit/dist/esm/index.js
if (typeof globalThis !== "undefined" && typeof globalThis.document !== "undefined") {
  queueMicrotask(() => {
    warmupSimd();
  });
}

// node_modules/@huggingface/xetchunk-wasm/dist/esm/xet-chunker.js
var TARGET_CHUNK_SIZE = 64 * 1024;
var MINIMUM_CHUNK_DIVISOR = 8;
var MAXIMUM_CHUNK_MULTIPLIER = 2;
var HASH_WINDOW_SIZE = 64;
var BLAKE3_DATA_KEY = new Uint8Array([
  102,
  151,
  245,
  119,
  91,
  149,
  80,
  222,
  49,
  53,
  203,
  172,
  165,
  151,
  24,
  28,
  157,
  228,
  33,
  16,
  155,
  235,
  43,
  88,
  180,
  208,
  176,
  75,
  147,
  173,
  242,
  41
]);
var XetChunker = class {
  minimumChunk;
  maximumChunk;
  chunkBuf;
  curChunkLen;
  gear;
  blake3;
  constructor(targetChunkSize = TARGET_CHUNK_SIZE) {
    if (targetChunkSize <= 0) {
      throw new Error("Target chunk size must be greater than 0");
    }
    if ((targetChunkSize & targetChunkSize - 1) !== 0) {
      throw new Error("Target chunk size must be a power of 2");
    }
    if (targetChunkSize <= HASH_WINDOW_SIZE) {
      throw new Error("Target chunk size must be greater than hash window size");
    }
    if (targetChunkSize >= Number.MAX_SAFE_INTEGER) {
      throw new Error("Target chunk size must be less than Number.MAX_SAFE_INTEGER");
    }
    let mask = BigInt(targetChunkSize - 1);
    let leadingZeros = 0;
    for (let i = 63; i >= 0; i--) {
      if ((mask & 1n << BigInt(i)) !== 0n) {
        break;
      }
      leadingZeros++;
    }
    mask = mask << BigInt(leadingZeros);
    const maximumChunk = targetChunkSize * MAXIMUM_CHUNK_MULTIPLIER;
    this.minimumChunk = targetChunkSize / MINIMUM_CHUNK_DIVISOR;
    this.maximumChunk = maximumChunk;
    this.chunkBuf = new Uint8Array(maximumChunk);
    this.curChunkLen = 0;
    this.gear = new Hasher(mask);
    this.blake3 = Hasher2.newKeyed(BLAKE3_DATA_KEY);
  }
  /**
   * Streaming entry point: accepts an arbitrary slice of data, accumulates
   * it, and emits a chunk when a boundary (or max size) is reached.
   * Data is copied into an internal buffer because it may span calls.
   */
  next(data, isFinal) {
    const nBytes = data.length;
    let createChunk = false;
    let consumeLen = 0;
    if (nBytes !== 0) {
      if (this.curChunkLen + HASH_WINDOW_SIZE < this.minimumChunk) {
        const maxAdvance = Math.min(this.minimumChunk - this.curChunkLen - HASH_WINDOW_SIZE - 1, nBytes - consumeLen);
        consumeLen += maxAdvance;
        this.curChunkLen += maxAdvance;
      }
      const readEnd = Math.min(nBytes, consumeLen + this.maximumChunk - this.curChunkLen);
      let bytesToNextBoundary;
      const position = this.gear.nextMatch(data.subarray(consumeLen, readEnd));
      if (position !== -1) {
        bytesToNextBoundary = position;
        createChunk = true;
      } else {
        bytesToNextBoundary = readEnd - consumeLen;
      }
      if (bytesToNextBoundary + this.curChunkLen >= this.maximumChunk) {
        bytesToNextBoundary = this.maximumChunk - this.curChunkLen;
        createChunk = true;
      }
      this.curChunkLen += bytesToNextBoundary;
      consumeLen += bytesToNextBoundary;
      this.chunkBuf.set(data.subarray(0, consumeLen), this.curChunkLen - consumeLen);
    }
    if (createChunk || isFinal && this.curChunkLen > 0) {
      const chunkData = this.chunkBuf.subarray(0, this.curChunkLen);
      const hash3 = this.blake3.reset().update(chunkData).finalize(32);
      const chunk = {
        length: chunkData.length,
        hash: hash3
      };
      this.curChunkLen = 0;
      this.gear.resetHash();
      return {
        chunk,
        bytesConsumed: consumeLen
      };
    }
    return {
      chunk: null,
      bytesConsumed: consumeLen
    };
  }
  /**
   * Batch entry point: processes a large contiguous buffer and returns all
   * complete chunks. Hashes directly from `data` — no intermediate copy
   * to chunkBuf — for every chunk whose bytes are fully within `data`.
   */
  nextBlock(data, isFinal) {
    const chunks = [];
    let pos = 0;
    while (pos < data.length && this.curChunkLen > 0) {
      const result = this.next(data.subarray(pos), false);
      if (result.chunk)
        chunks.push(result.chunk);
      pos += result.bytesConsumed;
    }
    const minSkip = this.minimumChunk > HASH_WINDOW_SIZE ? this.minimumChunk - HASH_WINDOW_SIZE - 1 : 0;
    while (pos < data.length) {
      const chunkStart = pos;
      const scanStart = Math.min(pos + minSkip, data.length);
      const scanEnd = Math.min(data.length, pos + this.maximumChunk);
      const position = this.gear.nextMatch(data.subarray(scanStart, scanEnd));
      let chunkEnd;
      let foundBoundary;
      if (position !== -1 && scanStart + position - chunkStart <= this.maximumChunk) {
        chunkEnd = scanStart + position;
        foundBoundary = true;
      } else if (scanEnd - chunkStart >= this.maximumChunk) {
        chunkEnd = chunkStart + this.maximumChunk;
        foundBoundary = true;
      } else {
        foundBoundary = false;
        chunkEnd = scanEnd;
      }
      if (foundBoundary) {
        const hash3 = this.blake3.reset().update(data.subarray(chunkStart, chunkEnd)).finalize(32);
        chunks.push({ length: chunkEnd - chunkStart, hash: hash3 });
        pos = chunkEnd;
        this.gear.resetHash();
      } else if (isFinal) {
        const hash3 = this.blake3.reset().update(data.subarray(chunkStart)).finalize(32);
        chunks.push({ length: data.length - chunkStart, hash: hash3 });
        pos = data.length;
      } else {
        this.chunkBuf.set(data.subarray(chunkStart), 0);
        this.curChunkLen = data.length - chunkStart;
        pos = data.length;
      }
    }
    return chunks;
  }
  finish() {
    if (this.curChunkLen > 0) {
      const chunkData = this.chunkBuf.subarray(0, this.curChunkLen);
      const hash3 = this.blake3.reset().update(chunkData).finalize(32);
      const chunk = { length: this.curChunkLen, hash: hash3 };
      this.curChunkLen = 0;
      this.gear.resetHash();
      return chunk;
    }
    return null;
  }
};
function createChunker(targetChunkSize = TARGET_CHUNK_SIZE) {
  return new XetChunker(targetChunkSize);
}
function nextBlock(chunker, data) {
  return chunker.nextBlock(data, false);
}
function finalize(chunker) {
  return chunker.finish();
}
function hashToHex(hash3) {
  const view = new DataView(hash3.buffer, hash3.byteOffset, hash3.byteLength);
  const u64 = view.getBigUint64(0, true);
  const u64_2 = view.getBigUint64(8, true);
  const u64_3 = view.getBigUint64(16, true);
  const u64_4 = view.getBigUint64(24, true);
  return u64.toString(16).padStart(16, "0") + u64_2.toString(16).padStart(16, "0") + u64_3.toString(16).padStart(16, "0") + u64_4.toString(16).padStart(16, "0");
}
function hexToBytes(hex) {
  const bytes = new Uint8Array(32);
  const view = new DataView(bytes.buffer);
  view.setBigUint64(0, BigInt("0x" + hex.slice(0, 16)), true);
  view.setBigUint64(8, BigInt("0x" + hex.slice(16, 32)), true);
  view.setBigUint64(16, BigInt("0x" + hex.slice(32, 48)), true);
  view.setBigUint64(24, BigInt("0x" + hex.slice(48, 64)), true);
  return bytes;
}

// node_modules/@huggingface/xetchunk-wasm/dist/esm/xorb-hash.js
var MEAN_CHUNK_PER_NODE = 4;
var BLAKE3_NODE_KEY = new Uint8Array([
  1,
  126,
  197,
  199,
  165,
  71,
  41,
  150,
  253,
  148,
  102,
  102,
  180,
  138,
  2,
  230,
  93,
  221,
  83,
  111,
  55,
  199,
  109,
  210,
  248,
  99,
  82,
  230,
  74,
  83,
  113,
  63
]);
var INDEX_OF_LAST_BYTE_OF_LAST_U64_IN_CHUNK_HASH = 3 * 8;
var nodeHasher = Hasher2.newKeyed(BLAKE3_NODE_KEY);
function xorbHash(chunks) {
  if (chunks.length === 0) {
    return new Uint8Array(32);
  }
  let currentChunks = chunks;
  while (currentChunks.length > 1) {
    const nodes = [];
    let currentIndex = 0;
    let numOfChildrenSoFar = 0;
    for (let i = 0; i < currentChunks.length; i++) {
      if (i === currentChunks.length - 1 || numOfChildrenSoFar === 2 * MEAN_CHUNK_PER_NODE || numOfChildrenSoFar >= 2 && currentChunks[i].hash[INDEX_OF_LAST_BYTE_OF_LAST_U64_IN_CHUNK_HASH] % MEAN_CHUNK_PER_NODE === 0) {
        nodes.push(mergedHashOfSequence(currentChunks.slice(currentIndex, i + 1)));
        currentIndex = i + 1;
        numOfChildrenSoFar = 0;
      } else {
        numOfChildrenSoFar++;
      }
    }
    currentChunks = nodes;
  }
  return currentChunks[0].hash;
}
function mergedHashOfSequence(chunks) {
  let text = "";
  let totalLength = 0;
  for (const chunk of chunks) {
    text += hashToHex(chunk.hash) + " : " + chunk.length + "\n";
    totalLength += chunk.length;
  }
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const hash3 = nodeHasher.reset().update(bytes).finalize(32);
  return { hash: hash3, length: totalLength };
}

// node_modules/@huggingface/xetchunk-wasm/dist/esm/hash-utils.js
var ZERO_KEY = new Uint8Array(32);
var VERIFICATION_KEY = new Uint8Array([
  127,
  24,
  87,
  214,
  206,
  86,
  237,
  102,
  18,
  127,
  249,
  19,
  231,
  165,
  195,
  243,
  164,
  205,
  38,
  213,
  181,
  219,
  73,
  230,
  65,
  36,
  152,
  127,
  40,
  251,
  148,
  195
]);
var fileHasher = Hasher2.newKeyed(ZERO_KEY);
var verificationHasher = Hasher2.newKeyed(VERIFICATION_KEY);
function fileHash(chunks) {
  const xorb = xorbHash(chunks);
  return fileHasher.reset().update(xorb).finalize(32);
}
function hmac(hash3, key) {
  return Hasher2.newKeyed(key).update(hash3).finalize(32);
}
function verificationHash(chunkHashes) {
  const combined = new Uint8Array(chunkHashes.length * 32);
  for (let i = 0; i < chunkHashes.length; i++) {
    combined.set(chunkHashes[i], i * 32);
  }
  return verificationHasher.reset().update(combined).finalize(32);
}

// src/vendor/hfjs-xet/utils/createXorbs.ts
var TARGET_CHUNK_SIZE2 = 64 * 1024;
var MAX_CHUNK_SIZE = 2 * TARGET_CHUNK_SIZE2;
var XORB_SIZE = 64 * 1024 * 1024;
var MAX_XORB_CHUNKS = 8 * 1024;
var INTERVAL_BETWEEN_REMOTE_DEDUP = 4e6;
var PROCESSING_PROGRESS_RATIO = 0.1;
var UPLOADING_PROGRESS_RATIO = 1 - PROCESSING_PROGRESS_RATIO;
function computeXorbHashHex(chunks) {
  const chunkObjs = chunks.map((c) => ({ hash: hexToBytes(c.hash), length: c.length }));
  return hashToHex(xorbHash(chunkObjs));
}
function computeHmacHex(hash3, key) {
  return hashToHex(hmac(hexToBytes(hash3), hexToBytes(key)));
}
function computeVerificationHashHex(hashes) {
  return hashToHex(verificationHash(hashes.map(hexToBytes)));
}
function computeFileHashHex(chunks) {
  const chunkObjs = chunks.map((c) => ({ hash: hexToBytes(c.hash), length: c.length }));
  return hashToHex(fileHash(chunkObjs));
}
function addDataToChunker(data, chunker) {
  return nextBlock(chunker, data).map((c) => ({ hash: hashToHex(c.hash), length: c.length, dedup: false }));
}
function finalizeChunker(chunker) {
  const last = finalize(chunker);
  if (!last) {
    return [];
  }
  return [{ hash: hashToHex(last.hash), length: last.length, dedup: false }];
}
var CurrentXorbInfo = class {
  id;
  offset;
  chunks;
  fileProcessedBytes;
  fileUploadedBytes;
  fileSize;
  data;
  immutableData;
  constructor() {
    this.id = 0;
    this.offset = 0;
    this.chunks = [];
    this.fileProcessedBytes = {};
    this.fileUploadedBytes = {};
    this.fileSize = {};
    this.data = new Uint8Array(XORB_SIZE);
    this.immutableData = null;
  }
  event(computeXorbHash) {
    const xorbChunksCleaned = this.chunks.map((chunk) => ({
      hash: chunk.hash,
      length: chunk.length
    }));
    return {
      event: "xorb",
      xorb: this.data.subarray(0, this.offset),
      hash: computeXorbHash(xorbChunksCleaned),
      chunks: xorbChunksCleaned,
      id: this.id,
      files: Object.entries(this.fileProcessedBytes).map(([path10, processedBytes]) => ({
        path: path10,
        progress: processedBytes / this.fileSize[path10],
        lastSentProgress: ((this.fileUploadedBytes[path10] ?? 0) + (processedBytes - (this.fileUploadedBytes[path10] ?? 0)) * PROCESSING_PROGRESS_RATIO) / this.fileSize[path10]
      }))
    };
  }
};
async function* createXorbs(fileSources, params) {
  const alreadyDoneFileSha256s = /* @__PURE__ */ new Set();
  let xorbId = 0;
  const chunkCache = new ChunkCache();
  let xorb = new CurrentXorbInfo();
  const nextXorb = (currentFile) => {
    const event = xorb.event(computeXorbHashHex);
    xorbId++;
    xorb = new CurrentXorbInfo();
    xorb.id = xorbId;
    xorb.fileUploadedBytes = {
      [currentFile.path]: currentFile.uploadedBytes
    };
    xorb.fileSize[currentFile.path] = currentFile.size;
    return event;
  };
  const pendingFileEvents = [];
  const remoteXorbHashes = [""];
  for await (const fileSource of fileSources) {
    params.yieldCallback?.({
      event: "fileProgress",
      path: fileSource.path,
      progress: 0
    });
    if (fileSource.sha256 && alreadyDoneFileSha256s.has(fileSource.sha256)) {
      params.yieldCallback?.({
        event: "fileProgress",
        path: fileSource.path,
        progress: 1
      });
      continue;
    }
    if (fileSource.sha256) {
      alreadyDoneFileSha256s.add(fileSource.sha256);
    }
    const chunker = createChunker(TARGET_CHUNK_SIZE2);
    {
      xorb.fileSize[fileSource.path] = fileSource.content.size;
      if (fileSource.content instanceof SplicedBlob && fileSource.content.firstSpliceIndex < MAX_CHUNK_SIZE) {
        await loadDedupInfoToCache(
          fileSource.content.originalBlob.slice(0, MAX_CHUNK_SIZE),
          remoteXorbHashes,
          params,
          chunkCache,
          computeHmacHex,
          {
            maxChunks: 1,
            isAtBeginning: true
          }
        );
      }
      let bytesSinceRemoteDedup = Infinity;
      let bytesSinceLastProgressEvent = 0;
      let isFirstFileChunk = true;
      const sourceChunks = [];
      const reader = fileSource.content.stream().getReader();
      let processedBytes = 0;
      let dedupedBytes = 0;
      const fileChunks = [];
      const chunkMetadata = [];
      const addChunks = async function* (chunks) {
        for (const chunk of chunks) {
          if (isFirstFileChunk) {
            chunk.dedup = true;
            isFirstFileChunk = false;
          }
          let chunkIndex = xorb.chunks.length;
          let chunkXorbId = xorbId;
          const chunkToCopy = removeChunkFromSourceData(sourceChunks, chunk.length);
          let cacheData = chunkCache.getChunk(chunk.hash, computeHmacHex);
          if (cacheData === void 0 && chunk.dedup && bytesSinceRemoteDedup >= INTERVAL_BETWEEN_REMOTE_DEDUP) {
            const token = await xetWriteToken(params);
            bytesSinceRemoteDedup = 0;
            const shardResp = await (params.fetch ?? fetch)(token.casUrl + "/v1/chunks/default/" + chunk.hash, {
              headers: {
                Authorization: `Bearer ${token.accessToken}`
              }
            });
            if (shardResp.ok) {
              const shard = await shardResp.blob();
              const shardData = await parseShardData(shard);
              for (const xorb2 of shardData.xorbs) {
                const remoteXorbId = -remoteXorbHashes.length;
                remoteXorbHashes.push(xorb2.hash);
                let i = 0;
                for (const chunk2 of xorb2.chunks) {
                  chunkCache.addChunkToCache(chunk2.hash, remoteXorbId, i++, shardData.hmacKey);
                }
              }
              cacheData = chunkCache.getChunk(chunk.hash, computeHmacHex);
              const oldDedupedBytes = dedupedBytes;
              dedupedBytes = backtrackDedup(xorb, computeHmacHex, shardData, chunkCache, chunkMetadata, dedupedBytes);
              if (dedupedBytes > oldDedupedBytes) {
                xorb.fileUploadedBytes[fileSource.path] ??= 0;
                xorb.fileUploadedBytes[fileSource.path] += dedupedBytes - oldDedupedBytes;
              }
            }
          }
          if (cacheData === void 0) {
            if (!writeChunk(xorb, chunkToCopy, chunk.hash)) {
              yield nextXorb({ path: fileSource.path, uploadedBytes: processedBytes, size: fileSource.content.size });
              chunkIndex = 0;
              chunkXorbId = xorbId;
              for (const event of pendingFileEvents) {
                event.representation = event.representation.map((rep) => ({
                  ...rep,
                  xorbId: rep.xorbId >= 0 ? rep.xorbId : remoteXorbHashes[-rep.xorbId]
                }));
                yield event;
              }
              pendingFileEvents.length = 0;
              if (!writeChunk(xorb, chunkToCopy, chunk.hash)) {
                throw new Error("Failed to write chunk into xorb");
              }
            }
            chunkCache.addChunkToCache(chunk.hash, xorbId, chunkIndex, null);
          } else {
            chunkXorbId = cacheData.xorbIndex;
            chunkIndex = cacheData.chunkIndex;
            dedupedBytes += chunk.length;
            xorb.fileUploadedBytes[fileSource.path] ??= 0;
            xorb.fileUploadedBytes[fileSource.path] += chunk.length;
          }
          bytesSinceRemoteDedup += chunk.length;
          bytesSinceLastProgressEvent += chunk.length;
          fileChunks.push({ hash: chunk.hash, length: chunk.length });
          chunkMetadata.push({
            xorbId: chunkXorbId,
            chunkIndex,
            length: chunk.length
          });
          xorb.fileProcessedBytes[fileSource.path] = processedBytes;
          if (bytesSinceLastProgressEvent >= 1e6) {
            bytesSinceLastProgressEvent = 0;
            params.yieldCallback?.({
              event: "fileProgress",
              path: fileSource.path,
              progress: ((xorb.fileUploadedBytes[fileSource.path] ?? 0) + (xorb.fileProcessedBytes[fileSource.path] - (xorb.fileUploadedBytes[fileSource.path] ?? 0)) * PROCESSING_PROGRESS_RATIO) / fileSource.content.size
            });
          }
          if (xorb.chunks.length >= MAX_XORB_CHUNKS) {
            yield nextXorb({ path: fileSource.path, uploadedBytes: processedBytes, size: fileSource.content.size });
            for (const event of pendingFileEvents) {
              event.representation = event.representation.map((rep) => ({
                ...rep,
                xorbId: rep.xorbId >= 0 ? rep.xorbId : remoteXorbHashes[-rep.xorbId]
              }));
              yield event;
            }
            pendingFileEvents.length = 0;
          }
        }
      };
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          yield* addChunks(finalizeChunker(chunker));
          break;
        }
        processedBytes += value.length;
        sourceChunks.push(value);
        yield* addChunks(addDataToChunker(value, chunker));
      }
      const fileRepresentation = buildFileRepresentation(chunkMetadata, fileChunks, computeVerificationHashHex);
      xorb.immutableData = {
        chunkIndex: xorb.chunks.length,
        offset: xorb.offset
      };
      const dedupRatio = fileSource.content.size > 0 ? dedupedBytes / fileSource.content.size : 0;
      pendingFileEvents.push({
        event: "file",
        path: fileSource.path,
        hash: computeFileHashHex(fileChunks),
        sha256: fileSource.sha256,
        dedupRatio,
        representation: fileRepresentation
      });
    }
  }
  if (xorb.offset > 0) {
    yield xorb.event(computeXorbHashHex);
  }
  for (const event of pendingFileEvents) {
    event.representation = event.representation.map((rep) => ({
      ...rep,
      xorbId: rep.xorbId >= 0 ? rep.xorbId : remoteXorbHashes[-rep.xorbId]
    }));
    yield event;
  }
}
function backtrackDedup(xorb, computeHmac, shardData, chunkCache, chunkMetadata, dedupedBytes) {
  const chunkIndexesToBacktrackFor = /* @__PURE__ */ new Map();
  for (let chunkToRecheckIndex = xorb.immutableData?.chunkIndex ?? 0; chunkToRecheckIndex < xorb.chunks.length; chunkToRecheckIndex++) {
    const chunk = xorb.chunks[chunkToRecheckIndex];
    const hmacHash = computeHmac(chunk.hash, shardData.hmacKey);
    const cacheData = chunkCache.getChunk(hmacHash, null);
    if (cacheData !== void 0) {
      chunkIndexesToBacktrackFor.set(chunkToRecheckIndex, {
        xorbId: cacheData.xorbIndex,
        chunkIndex: cacheData.chunkIndex
      });
      chunkCache.removeChunkFromCache(chunk.hash);
    }
  }
  for (const metadata of chunkMetadata) {
    if (metadata.xorbId === xorb.id && chunkIndexesToBacktrackFor.has(metadata.chunkIndex)) {
      const backtrackData = chunkIndexesToBacktrackFor.get(metadata.chunkIndex);
      if (backtrackData !== void 0) {
        metadata.xorbId = backtrackData.xorbId;
        metadata.chunkIndex = backtrackData.chunkIndex;
        dedupedBytes += metadata.length;
      }
    }
  }
  const xorbRangesToErase = [];
  for (let i = 0; i < xorb.chunks.length; i++) {
    const chunk = xorb.chunks[i];
    if (chunkIndexesToBacktrackFor.has(i)) {
      xorbRangesToErase.push({
        start: chunk.offset,
        end: i < xorb.chunks.length - 1 ? xorb.chunks[i + 1].offset : xorb.offset
      });
    }
  }
  const xorbRangesToKeep = [];
  let currentStart = 0;
  for (let i = 0; i < xorbRangesToErase.length; i++) {
    const range = xorbRangesToErase[i];
    if (currentStart !== range.start) {
      xorbRangesToKeep.push({ start: currentStart, end: range.start });
    }
    currentStart = range.end;
  }
  if (currentStart !== xorb.offset) {
    xorbRangesToKeep.push({ start: currentStart, end: xorb.offset });
  }
  let currentOffset = 0;
  for (const range of xorbRangesToKeep) {
    if (range.start !== currentOffset) {
      xorb.data.set(xorb.data.subarray(range.start, range.end), currentOffset);
    }
    currentOffset += range.end - range.start;
  }
  const newXorbChunks = [];
  const oldIndexToNewIndex = /* @__PURE__ */ new Map();
  let erasedOffset = 0;
  for (let i = 0; i < xorb.chunks.length; i++) {
    const chunk = xorb.chunks[i];
    if (chunkIndexesToBacktrackFor.has(i)) {
      if (i < xorb.chunks.length - 1) {
        erasedOffset += xorb.chunks[i + 1].offset - chunk.offset;
      }
    } else {
      newXorbChunks.push({
        hash: chunk.hash,
        length: chunk.length,
        offset: chunk.offset - erasedOffset
      });
      if (erasedOffset > 0) {
        oldIndexToNewIndex.set(i, newXorbChunks.length - 1);
      }
    }
  }
  xorb.chunks = newXorbChunks;
  xorb.offset = currentOffset;
  for (const chunk of chunkMetadata) {
    if (chunk.xorbId === xorb.id) {
      const newIndex = oldIndexToNewIndex.get(chunk.chunkIndex);
      if (newIndex !== void 0) {
        const cached = chunkCache.getChunk(xorb.chunks[newIndex].hash, null);
        if (cached !== void 0 && cached.xorbIndex === chunk.xorbId && cached.chunkIndex === chunk.chunkIndex) {
          chunkCache.updateChunkIndex(xorb.chunks[newIndex].hash, newIndex);
        }
        chunk.chunkIndex = newIndex;
      }
    }
  }
  return dedupedBytes;
}
function removeChunkFromSourceData(sourceChunks, chunkLength) {
  if (chunkLength === sourceChunks[0].length) {
    const chunkToCopy = sourceChunks[0];
    sourceChunks.shift();
    return chunkToCopy;
  } else if (chunkLength < sourceChunks[0].length) {
    const chunkToCopy = sourceChunks[0].subarray(0, chunkLength);
    sourceChunks[0] = sourceChunks[0].subarray(chunkLength);
    return chunkToCopy;
  } else {
    const chunkToCopy = new Uint8Array(chunkLength);
    let copyOffset = 0;
    let index = 0;
    let toSlice = -1;
    while (copyOffset < chunkLength) {
      const nToCopy = Math.min(sourceChunks[index].length, chunkLength - copyOffset);
      chunkToCopy.set(sourceChunks[index].subarray(0, nToCopy), copyOffset);
      copyOffset += nToCopy;
      if (nToCopy === sourceChunks[index].length) {
        index++;
      } else {
        toSlice = nToCopy;
      }
    }
    sourceChunks.splice(0, index);
    if (toSlice !== -1) {
      sourceChunks[0] = sourceChunks[0].subarray(toSlice);
    }
    return chunkToCopy;
  }
}
function writeChunk(xorb, chunk, hash3) {
  const regularCompressedChunk = compress(chunk);
  const bgCompressedChunk = compress(bg4_split_bytes(chunk));
  const compressedChunk = bgCompressedChunk.length < regularCompressedChunk.length ? bgCompressedChunk : regularCompressedChunk;
  const chunkToWrite = compressedChunk.length < chunk.length ? compressedChunk : chunk;
  if (xorb.offset + XET_CHUNK_HEADER_BYTES + chunkToWrite.length > XORB_SIZE) {
    return false;
  }
  xorb.data[xorb.offset] = 0;
  xorb.data[xorb.offset + 1] = chunkToWrite.length & 255;
  xorb.data[xorb.offset + 2] = chunkToWrite.length >> 8 & 255;
  xorb.data[xorb.offset + 3] = chunkToWrite.length >> 16 & 255;
  xorb.data[xorb.offset + 4] = chunkToWrite.length < chunk.length ? bgCompressedChunk.length < regularCompressedChunk.length ? 2 /* ByteGroupingLZ4 */ : 1 /* LZ4 */ : 0 /* None */;
  xorb.data[xorb.offset + 5] = chunk.length & 255;
  xorb.data[xorb.offset + 6] = chunk.length >> 8 & 255;
  xorb.data[xorb.offset + 7] = chunk.length >> 16 & 255;
  xorb.data.set(chunkToWrite, xorb.offset + XET_CHUNK_HEADER_BYTES);
  xorb.chunks.push({ hash: hash3, length: chunk.length, offset: xorb.offset });
  xorb.offset += XET_CHUNK_HEADER_BYTES + chunkToWrite.length;
  return true;
}
var buildFileRepresentation = (metadata, chunks, computeVerificationHash) => {
  if (metadata.length === 0) {
    return [];
  }
  const representation = [];
  let currentRange = {
    xorbId: metadata[0].xorbId,
    indexStart: metadata[0].chunkIndex,
    indexEnd: metadata[0].chunkIndex + 1,
    length: metadata[0].length,
    chunkHashStart: 0
  };
  for (let i = 1; i < metadata.length; i++) {
    const chunk = metadata[i];
    if (currentRange.xorbId === chunk.xorbId && currentRange.indexEnd === chunk.chunkIndex) {
      currentRange.indexEnd = chunk.chunkIndex + 1;
      currentRange.length += chunk.length;
    } else {
      const rangeHash2 = computeVerificationHash(chunks.slice(currentRange.chunkHashStart, i).map((x) => x.hash));
      representation.push({
        xorbId: currentRange.xorbId,
        indexStart: currentRange.indexStart,
        indexEnd: currentRange.indexEnd,
        length: currentRange.length,
        rangeHash: rangeHash2
      });
      currentRange = {
        xorbId: chunk.xorbId,
        indexStart: chunk.chunkIndex,
        indexEnd: chunk.chunkIndex + 1,
        length: chunk.length,
        chunkHashStart: i
      };
    }
  }
  const rangeHash = computeVerificationHash(chunks.slice(currentRange.chunkHashStart).map((x) => x.hash));
  representation.push({
    xorbId: currentRange.xorbId,
    indexStart: currentRange.indexStart,
    indexEnd: currentRange.indexEnd,
    length: currentRange.length,
    rangeHash
  });
  return representation;
};
async function loadDedupInfoToCache(content, remoteXorbHashes, params, chunkCache, computeHmacHex2, opts) {
  const chunker = createChunker(TARGET_CHUNK_SIZE2);
  const cache2 = chunkCache;
  let dedupedBytes = 0;
  let chunksProcessed = 0;
  let totalBytes = 0;
  let bytesSinceRemoteDedup = Infinity;
  const sourceChunks = [];
  const reader = content.stream().getReader();
  const processChunks = async (chunks) => {
    for (const chunk of chunks) {
      chunksProcessed++;
      if (opts?.isAtBeginning && chunksProcessed === 1) {
        chunk.dedup = true;
      }
      totalBytes += chunk.length;
      removeChunkFromSourceData(sourceChunks, chunk.length);
      let cacheData = cache2.getChunk(chunk.hash, computeHmacHex2);
      if (cacheData !== void 0) {
        dedupedBytes += chunk.length;
        bytesSinceRemoteDedup += chunk.length;
        continue;
      }
      if (chunk.dedup && bytesSinceRemoteDedup >= INTERVAL_BETWEEN_REMOTE_DEDUP) {
        const token = await xetWriteToken(params);
        bytesSinceRemoteDedup = 0;
        const shardResp = await (params.fetch ?? fetch)(token.casUrl + "/v1/chunks/default/" + chunk.hash, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        });
        if (shardResp.ok) {
          const shard = await shardResp.blob();
          const shardData = await parseShardData(shard);
          for (const xorb of shardData.xorbs) {
            const remoteXorbId = -remoteXorbHashes.length;
            remoteXorbHashes.push(xorb.hash);
            let i = 0;
            for (const xorbChunk of xorb.chunks) {
              cache2.addChunkToCache(xorbChunk.hash, remoteXorbId, i++, shardData.hmacKey);
            }
          }
          cacheData = cache2.getChunk(chunk.hash, computeHmacHex2);
        }
      }
      if (cacheData !== void 0) {
        dedupedBytes += chunk.length;
      }
      bytesSinceRemoteDedup += chunk.length;
    }
  };
  while (true) {
    if (opts?.end !== void 0 && totalBytes >= opts.end) {
      break;
    }
    if (opts?.maxChunks !== void 0 && chunksProcessed >= opts.maxChunks) {
      break;
    }
    const { done, value } = await reader.read();
    if (done) {
      await processChunks(finalizeChunker(chunker));
      break;
    }
    sourceChunks.push(value);
    await processChunks(addDataToChunker(value, chunker));
  }
}

// src/vendor/hfjs-xet/utils/uploadShards.ts
var SHARD_MAX_SIZE = 64 * 1024 * 1024;
var SHARD_HEADER_SIZE = 48;
var SHARD_FOOTER_SIZE = 200;
var HASH_LENGTH2 = 32;
var XORB_FOOTER_LENGTH = 48;
var FILE_FOOTER_LENGTH = 48;
var SHARD_HEADER_VERSION = 2n;
var SHARD_FOOTER_VERSION = 1n;
var MDB_FILE_FLAG_WITH_VERIFICATION = 2147483648;
var MDB_FILE_FLAG_WITH_METADATA_EXT = 1073741824;
var SHARD_MAGIC_TAG = new Uint8Array([
  "H".charCodeAt(0),
  "F".charCodeAt(0),
  "R".charCodeAt(0),
  "e".charCodeAt(0),
  "p".charCodeAt(0),
  "o".charCodeAt(0),
  "M".charCodeAt(0),
  "e".charCodeAt(0),
  "t".charCodeAt(0),
  "a".charCodeAt(0),
  "D".charCodeAt(0),
  "a".charCodeAt(0),
  "t".charCodeAt(0),
  "a".charCodeAt(0),
  0,
  85,
  105,
  103,
  69,
  106,
  123,
  129,
  87,
  131,
  165,
  189,
  217,
  92,
  205,
  209,
  74,
  169
]);
async function* uploadShards(source, params) {
  const xorbHashes = [];
  const seenFileXetHashes = /* @__PURE__ */ new Set();
  const fileInfoSection = new Uint8Array(Math.floor(SHARD_MAX_SIZE - SHARD_HEADER_SIZE - SHARD_FOOTER_SIZE) * 0.25);
  const xorbInfoSection = new Uint8Array(Math.floor(SHARD_MAX_SIZE - SHARD_HEADER_SIZE - SHARD_FOOTER_SIZE) * 0.75);
  const xorbView = new DataView(xorbInfoSection.buffer);
  let xorbViewOffset = 0;
  const fileInfoView = new DataView(fileInfoSection.buffer);
  let fileViewOffset = 0;
  let xorbTotalSize = 0n;
  let fileTotalSize = 0n;
  let xorbTotalUnpackedSize = 0n;
  for await (const output of createXorbs(source, params)) {
    switch (output.event) {
      case "xorb": {
        xorbHashes.push(output.hash);
        const xorbEntrySize = HASH_LENGTH2 + 4 + 4 + 4 + 4;
        const chunksSize = output.chunks.length * (HASH_LENGTH2 + 4 + 4 + 8);
        const totalXorbSize = xorbEntrySize + chunksSize;
        if (xorbViewOffset + totalXorbSize > xorbInfoSection.length) {
          if (xorbViewOffset > 0 || fileViewOffset > 0) {
            await uploadShard(createShard(), params);
          }
        }
        writeHashToArray(output.hash, xorbInfoSection, xorbViewOffset);
        xorbViewOffset += HASH_LENGTH2;
        xorbView.setUint32(xorbViewOffset, 0, true);
        xorbViewOffset += 4;
        xorbView.setUint32(xorbViewOffset, output.chunks.length, true);
        xorbViewOffset += 4;
        const xorbUnpackedSize = sum(output.chunks.map((x) => x.length));
        xorbView.setUint32(xorbViewOffset, xorbUnpackedSize, true);
        xorbTotalUnpackedSize += BigInt(xorbUnpackedSize);
        xorbTotalSize += BigInt(output.xorb.byteLength);
        xorbViewOffset += 4;
        xorbView.setUint32(xorbViewOffset, output.xorb.byteLength, true);
        xorbViewOffset += 4;
        let chunkBytes = 0;
        for (const chunk of output.chunks) {
          writeHashToArray(chunk.hash, xorbInfoSection, xorbViewOffset);
          xorbViewOffset += HASH_LENGTH2;
          xorbView.setUint32(xorbViewOffset, chunkBytes, true);
          xorbViewOffset += 4;
          xorbView.setUint32(xorbViewOffset, chunk.length, true);
          xorbViewOffset += 4;
          xorbView.setBigUint64(xorbViewOffset, 0n, true);
          xorbViewOffset += 8;
          chunkBytes += chunk.length;
        }
        for (const file of output.files) {
          yield {
            event: "fileProgress",
            path: file.path,
            progress: file.lastSentProgress
          };
        }
        await uploadXorb(output, params);
        for (const file of output.files) {
          yield { event: "fileProgress", path: file.path, progress: file.progress };
        }
        break;
      }
      case "file": {
        yield {
          event: "file",
          path: output.path,
          xetHash: output.hash,
          sha256: output.sha256,
          dedupRatio: output.dedupRatio
        };
        if (seenFileXetHashes.has(output.hash)) {
          break;
        }
        seenFileXetHashes.add(output.hash);
        const fileHeaderSize = HASH_LENGTH2 + 4 + 4 + 8;
        const representationSize = output.representation.length * (HASH_LENGTH2 + 4 + 4 + 4 + 4);
        const verificationSize = output.representation.length * (HASH_LENGTH2 + 16);
        const fileSha256 = output.sha256;
        const hasMetadataExt = fileSha256 !== void 0;
        const metadataSize = hasMetadataExt ? HASH_LENGTH2 + 16 : 0;
        const totalFileSize = fileHeaderSize + representationSize + verificationSize + metadataSize;
        if (fileViewOffset + totalFileSize > fileInfoSection.length) {
          if (xorbViewOffset > 0 || fileViewOffset > 0) {
            await uploadShard(createShard(), params);
          }
        }
        writeHashToArray(output.hash, fileInfoSection, fileViewOffset);
        fileViewOffset += HASH_LENGTH2;
        fileInfoView.setUint32(
          fileViewOffset,
          MDB_FILE_FLAG_WITH_VERIFICATION + (hasMetadataExt ? MDB_FILE_FLAG_WITH_METADATA_EXT : 0),
          true
        );
        fileViewOffset += 4;
        fileInfoView.setUint32(fileViewOffset, output.representation.length, true);
        fileViewOffset += 4;
        fileInfoView.setBigUint64(fileViewOffset, 0n, true);
        fileViewOffset += 8;
        for (const repItem of output.representation) {
          writeHashToArray(
            typeof repItem.xorbId === "number" ? xorbHashes[repItem.xorbId] : repItem.xorbId,
            fileInfoSection,
            fileViewOffset
          );
          fileViewOffset += HASH_LENGTH2;
          fileInfoView.setUint32(fileViewOffset, 0, true);
          fileViewOffset += 4;
          fileInfoView.setUint32(fileViewOffset, repItem.length, true);
          fileViewOffset += 4;
          fileInfoView.setUint32(fileViewOffset, repItem.indexStart, true);
          fileViewOffset += 4;
          fileInfoView.setUint32(fileViewOffset, repItem.indexEnd, true);
          fileViewOffset += 4;
        }
        for (const repItem of output.representation) {
          writeHashToArray(repItem.rangeHash, fileInfoSection, fileViewOffset);
          fileViewOffset += HASH_LENGTH2;
          for (let i = 0; i < 16; i++) {
            fileInfoSection[fileViewOffset + i] = 0;
          }
          fileViewOffset += 16;
        }
        if (hasMetadataExt) {
          writeHashToArray(fileSha256, fileInfoSection, fileViewOffset);
          fileViewOffset += HASH_LENGTH2;
          for (let i = 0; i < 16; i++) {
            fileInfoSection[fileViewOffset + i] = 0;
          }
          fileViewOffset += 16;
        }
        break;
      }
    }
  }
  function createShard() {
    const shard = new Uint8Array(
      SHARD_HEADER_SIZE + SHARD_FOOTER_SIZE + xorbViewOffset + XORB_FOOTER_LENGTH + fileViewOffset + FILE_FOOTER_LENGTH
    );
    const shardView = new DataView(shard.buffer);
    let shardOffset = 0;
    shard.set(SHARD_MAGIC_TAG, shardOffset);
    shardOffset += SHARD_MAGIC_TAG.length;
    shardView.setBigUint64(shardOffset, SHARD_HEADER_VERSION, true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, BigInt(SHARD_FOOTER_SIZE), true);
    shardOffset += 8;
    shard.set(fileInfoSection.slice(0, fileViewOffset), shardOffset);
    shardOffset += fileViewOffset;
    for (let i = 0; i < 32; i++) {
      shard[shardOffset + i] = 255;
    }
    shardOffset += 32;
    for (let i = 0; i < 16; i++) {
      shard[shardOffset + i] = 0;
    }
    shardOffset += 16;
    const xorbInfoOffset = shardOffset;
    shard.set(xorbInfoSection.slice(0, xorbViewOffset), shardOffset);
    shardOffset += xorbViewOffset;
    for (let i = 0; i < 32; i++) {
      shard[shardOffset + i] = 255;
    }
    shardOffset += 32;
    for (let i = 0; i < 16; i++) {
      shard[shardOffset + i] = 0;
    }
    shardOffset += 16;
    const footerOffset = shardOffset;
    shardView.setBigUint64(shardOffset, SHARD_FOOTER_VERSION, true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, BigInt(SHARD_HEADER_SIZE), true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, BigInt(xorbInfoOffset), true);
    shardOffset += 8;
    for (let i = 0; i < 48; i++) {
      shardView.setUint8(shardOffset + i, 0);
    }
    shardOffset += 48;
    for (let i = 0; i < 32; i++) {
      shardView.setUint8(shardOffset + i, 0);
    }
    shardOffset += 32;
    shardView.setBigUint64(shardOffset, BigInt(Math.floor(Date.now() / 1e3)), true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, 0n, true);
    shardOffset += 8;
    for (let i = 0; i < 48; i++) {
      shardView.setUint8(shardOffset + i, 0);
    }
    shardOffset += 48;
    shardView.setBigUint64(shardOffset, xorbTotalSize, true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, fileTotalSize, true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, xorbTotalUnpackedSize, true);
    shardOffset += 8;
    shardView.setBigUint64(shardOffset, BigInt(footerOffset), true);
    xorbViewOffset = 0;
    fileViewOffset = 0;
    xorbTotalSize = 0n;
    xorbTotalUnpackedSize = 0n;
    fileTotalSize = 0n;
    return shard;
  }
  if (xorbViewOffset || fileViewOffset) {
    await uploadShard(createShard(), params);
  }
}
function writeHashToArray(hash3, array, offset) {
  for (let i = 0; i < hash3.length; i += 16) {
    array[offset + i / 2] = parseInt(hash3.substring(i + 2 * 7, i + 2 * 8), 16);
    array[offset + i / 2 + 1] = parseInt(hash3.substring(i + 2 * 6, i + 2 * 7), 16);
    array[offset + i / 2 + 2] = parseInt(hash3.substring(i + 2 * 5, i + 2 * 6), 16);
    array[offset + i / 2 + 3] = parseInt(hash3.substring(i + 2 * 4, i + 2 * 5), 16);
    array[offset + i / 2 + 4] = parseInt(hash3.substring(i + 2 * 3, i + 2 * 4), 16);
    array[offset + i / 2 + 5] = parseInt(hash3.substring(i + 2 * 2, i + 2 * 3), 16);
    array[offset + i / 2 + 6] = parseInt(hash3.substring(i + 2 * 1, i + 2 * 2), 16);
    array[offset + i / 2 + 7] = parseInt(hash3.substring(i + 2 * 0, i + 2 * 1), 16);
  }
}
async function uploadXorb(xorb, params) {
  const token = await xetWriteToken(params);
  const resp = await (params.fetch ?? fetch)(`${token.casUrl}/v1/xorbs/default/${xorb.hash}`, {
    method: "POST",
    body: xorb.xorb,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...params.xetParams.sessionId ? { "X-Xet-Session-Id": params.xetParams.sessionId } : {}
    },
    ...{
      progressHint: {
        progressCallback: (progress) => {
          for (const file of xorb.files) {
            params.yieldCallback?.({
              event: "fileProgress",
              path: file.path,
              progress: file.lastSentProgress + (file.progress - file.lastSentProgress) * progress
            });
          }
        }
      }
    }
  });
  if (!resp.ok) {
    throw await createApiError(resp);
  }
}
async function uploadShard(shard, params) {
  const token = await xetWriteToken(params);
  const resp = await (params.fetch ?? fetch)(`${token.casUrl}/v1/shards`, {
    method: "POST",
    body: shard,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      ...params.xetParams.sessionId ? { "X-Xet-Session-Id": params.xetParams.sessionId } : {}
    }
  });
  if (!resp.ok) {
    throw await createApiError(resp);
  }
}

// src/hf-bucket-client/client.ts
var HUB_URL = "https://huggingface.co";
var RETRY_STATUSES = /* @__PURE__ */ new Set([408, 429, 500, 502, 503, 504]);
var REQUEST_TIMEOUT_MS = 3e4;
function nextPageUrl(linkHeader) {
  if (!linkHeader) {
    return null;
  }
  for (const part of linkHeader.split(",")) {
    const match2 = part.match(/<([^>]+)>\s*;\s*rel="next"/);
    if (match2?.[1]) {
      return match2[1];
    }
  }
  return null;
}
var BucketHttpError = class extends Error {
  constructor(status, url, body) {
    super(`bucket request failed: ${status} ${url}: ${body.slice(0, 500)}`);
    this.status = status;
    this.url = url;
    this.name = "BucketHttpError";
  }
};
var BucketClient = class {
  bucket;
  hubUrl;
  accessToken;
  fetchImpl;
  constructor(options) {
    this.bucket = options.bucket;
    this.hubUrl = options.hubUrl ?? HUB_URL;
    this.accessToken = options.accessToken;
    this.fetchImpl = options.fetch ?? fetch;
  }
  apiUrl(suffix) {
    return `${this.hubUrl}/api/buckets/${this.bucket}${suffix}`;
  }
  authHeaders() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }
  async request(url, init) {
    const response = await this.fetchWithRetry(url, init);
    if (!response.ok) {
      throw new BucketHttpError(response.status, url, await response.text());
    }
    return response;
  }
  async fetchWithRetry(url, init) {
    const attempts = 4;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      let response;
      try {
        response = await this.fetchImpl(url, {
          ...init,
          signal: init?.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          headers: { ...this.authHeaders(), ...init?.headers }
        });
      } catch (err) {
        if (attempt < attempts - 1 && err instanceof Error && (err.name === "AbortError" || err.name === "TimeoutError")) {
          await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
          continue;
        }
        throw err;
      }
      if (!RETRY_STATUSES.has(response.status) || attempt === attempts - 1) {
        return response;
      }
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** attempt));
    }
    throw new Error("unreachable retry state");
  }
  /** Upload file contents via Xet, then register them in one batch call. */
  async uploadFiles(files) {
    if (files.length === 0) {
      return;
    }
    const hashes = /* @__PURE__ */ new Map();
    const source = (async function* () {
      for (const file of files) {
        yield { content: file.content, path: file.path };
      }
    })();
    for await (const event of uploadShards(source, {
      accessToken: this.accessToken,
      hubUrl: this.hubUrl,
      // All upload traffic goes to the CAS endpoint from the write token;
      // repo/rev are unused by the network path for buckets.
      repo: { type: "model", name: this.bucket },
      rev: "main",
      xetParams: {
        refreshWriteTokenUrl: this.apiUrl("/xet-write-token")
      },
      fetch: this.fetchImpl
    })) {
      if (event.event === "file") {
        hashes.set(event.path, event.xetHash);
      }
    }
    const missing = files.filter((file) => !hashes.has(file.path));
    if (missing.length > 0) {
      throw new Error(`xet upload returned no hash for: ${missing.map((f) => f.path).join(", ")}`);
    }
    await this.batch(
      files.map((file) => ({
        type: "addFile",
        path: file.path,
        xetHash: hashes.get(file.path),
        // Milliseconds, per the Python reference (`int(time.time() * 1000)`).
        mtime: Date.now()
      }))
    );
  }
  async deleteFiles(paths) {
    if (paths.length === 0) {
      return;
    }
    await this.batch(paths.map((path10) => ({ type: "deleteFile", path: path10 })));
  }
  async batch(operations) {
    const body = `${operations.map((op) => JSON.stringify(op)).join("\n")}
`;
    await this.request(this.apiUrl("/batch"), {
      method: "POST",
      headers: { "Content-Type": "application/x-ndjson" },
      body
    });
  }
  /**
   * Download a file. Returns null when the file does not exist; throws on
   * any other failure (including bucket/auth errors), so a missing object is
   * never conflated with an unreachable bucket.
   */
  async downloadFile(path10) {
    const url = `${this.hubUrl}/buckets/${this.bucket}/resolve/${encodeURIComponent(path10)}`;
    const response = await this.fetchWithRetry(url);
    if (response.status === 404) {
      await this.assertBucketAccessible();
      return null;
    }
    if (!response.ok) {
      throw new BucketHttpError(response.status, url, await response.text());
    }
    return await response.blob();
  }
  /** List files under a prefix (recursive), following Link-header pagination. */
  async listFiles(prefix = "") {
    const entries = [];
    const encodedPrefix = prefix ? `/${encodeURIComponent(prefix)}` : "";
    let url = `${this.apiUrl(`/tree${encodedPrefix}`)}?recursive=true`;
    while (url) {
      const response = await this.request(url);
      const page2 = await response.json();
      for (const item of page2) {
        entries.push({
          path: item.path,
          size: item.size ?? 0,
          type: item.type === "directory" ? "directory" : "file"
        });
      }
      url = nextPageUrl(response.headers.get("link"));
    }
    return entries;
  }
  async assertBucketAccessible() {
    await this.request(this.apiUrl(""));
  }
};

// src/mlclaw/codex-auth.ts
import { createCipheriv as createCipheriv2, createDecipheriv as createDecipheriv2, hkdfSync as hkdfSync2, randomBytes as randomBytes7 } from "node:crypto";
import fs6 from "node:fs/promises";
import path6 from "node:path";
var CODEX_AUTH_OBJECT_BASENAME = ".mlclaw/codex-auth.enc";
var CODEX_AUTH_REVOCATION_BASENAME = ".mlclaw/codex-auth.revoked";
function codexAuthObjectPath(statePrefix) {
  return `${normalizeBucketPrefix(statePrefix)}/${CODEX_AUTH_OBJECT_BASENAME}`;
}
function codexAuthRevocationObjectPath(statePrefix) {
  return `${normalizeBucketPrefix(statePrefix)}/${CODEX_AUTH_REVOCATION_BASENAME}`;
}
function codexAuthContext(params) {
  return compactContext({
    ...params.deploymentId ? { deploymentId: params.deploymentId } : {},
    ...params.bucket ? { bucket: params.bucket } : {},
    statePrefix: normalizeBucketPrefix(params.statePrefix)
  });
}
function encodeCodexAuthDocument(params) {
  if (!params.authJson || typeof params.authJson !== "object" || Array.isArray(params.authJson)) {
    throw new Error("Codex auth.json must contain a JSON object");
  }
  const authJson = params.authJson;
  const authMode = typeof authJson.auth_mode === "string" ? authJson.auth_mode : void 0;
  if (authMode && authMode !== "chatgpt") {
    throw new Error("Codex auth.json is not a ChatGPT account login");
  }
  if (!authMode && !("tokens" in authJson)) {
    throw new Error("Codex auth.json does not look like account credentials");
  }
  return {
    version: 1,
    kind: "codex-auth",
    authJson,
    updatedAt: params.now.toISOString()
  };
}
function encryptCodexAuthDocument(params) {
  const context = compactContext(params.context);
  const key = deriveCodexAuthKey(params.secret);
  const iv = randomBytes7(12);
  const cipher = createCipheriv2("aes-256-gcm", key, iv);
  cipher.setAAD(contextAad(context));
  const plaintext = Buffer.from(JSON.stringify(params.document), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const envelope = {
    version: 1,
    kind: "codex-auth",
    algorithm: "aes-256-gcm",
    context,
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    ciphertext: ciphertext.toString("base64url")
  };
  return `${JSON.stringify(envelope)}
`;
}
function decryptCodexAuthDocument(params) {
  const envelope = JSON.parse(params.encrypted);
  if (envelope.version !== 1 || envelope.kind !== "codex-auth" || envelope.algorithm !== "aes-256-gcm" || !envelope.context || typeof envelope.context !== "object" || !envelope.iv || !envelope.tag || !envelope.ciphertext) {
    throw new Error("invalid Codex auth envelope");
  }
  const context = compactContext(envelope.context);
  assertContextMatches(context, params.expectedContext);
  const key = deriveCodexAuthKey(params.secret);
  const decipher = createDecipheriv2("aes-256-gcm", key, Buffer.from(envelope.iv, "base64url"));
  decipher.setAAD(contextAad(context));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
  const plaintext = Buffer.concat([decipher.update(Buffer.from(envelope.ciphertext, "base64url")), decipher.final()]);
  return decodeCodexAuthDocument(JSON.parse(plaintext.toString("utf8")));
}
async function readEncryptedCodexAuthFile(params) {
  let encrypted;
  try {
    encrypted = await fs6.readFile(params.file, "utf8");
  } catch (error) {
    if (isNotFound(error)) return void 0;
    throw new Error("Could not read encrypted Codex credentials");
  }
  try {
    return decryptCodexAuthDocument({
      encrypted,
      secret: params.secret,
      ...params.expectedContext ? { expectedContext: params.expectedContext } : {}
    });
  } catch {
    throw new Error("Encrypted Codex credentials are invalid or cannot be decrypted");
  }
}
async function writeEncryptedCodexAuthFile(params) {
  const encrypted = encryptCodexAuthDocument({
    document: params.document,
    secret: params.secret,
    context: params.context
  });
  await writePrivateFile(params.file, encrypted);
}
async function deleteEncryptedCodexAuthFile(file) {
  await fs6.rm(file, { force: true });
}
function decodeCodexAuthDocument(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid Codex auth document");
  }
  const record = value;
  if (record.version !== 1 || record.kind !== "codex-auth") {
    throw new Error("invalid Codex auth document");
  }
  if (!record.authJson || typeof record.authJson !== "object" || Array.isArray(record.authJson)) {
    throw new Error("invalid Codex auth document");
  }
  const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : void 0;
  if (!updatedAt || Number.isNaN(Date.parse(updatedAt))) {
    throw new Error("invalid Codex auth document");
  }
  return {
    version: 1,
    kind: "codex-auth",
    authJson: record.authJson,
    updatedAt
  };
}
function deriveCodexAuthKey(secret) {
  return Buffer.from(
    hkdfSync2("sha256", Buffer.from(secret, "utf8"), Buffer.alloc(0), Buffer.from("mlclaw:codex-auth:v1"), 32)
  );
}
function compactContext(context) {
  const statePrefix = normalizeBucketPrefix(context.statePrefix);
  return {
    ...context.deploymentId ? { deploymentId: context.deploymentId } : {},
    ...context.bucket ? { bucket: context.bucket } : {},
    statePrefix
  };
}
function assertContextMatches(observed, expected) {
  if (!expected) return;
  const normalized = compactContext(expected);
  for (const key of ["deploymentId", "bucket", "statePrefix"]) {
    if (normalized[key] && observed[key] !== normalized[key]) {
      throw new Error("Codex auth context does not match this deployment");
    }
  }
}
function contextAad(context) {
  return Buffer.from(JSON.stringify(compactContext(context)), "utf8");
}
async function writePrivateFile(file, content) {
  await fs6.mkdir(path6.dirname(file), { recursive: true, mode: 448 });
  const temporary = `${file}.${process.pid}.${randomBytes7(6).toString("hex")}.tmp`;
  try {
    await fs6.writeFile(temporary, content, { encoding: "utf8", mode: 384, flag: "wx" });
    await fs6.chmod(temporary, 384);
    await fs6.rename(temporary, file);
    await fs6.chmod(file, 384);
  } finally {
    await fs6.rm(temporary, { force: true });
  }
}
function isNotFound(error) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}

// src/mlclaw/openai-codex-device-auth.ts
var OPENAI_AUTH_BASE_URL = "https://auth.openai.com";
var OPENAI_CODEX_CLIENT_ID = "app_EMoamEEZ73f0CkXaXp7hrann";
var OPENAI_CODEX_DEVICE_VERIFICATION_URL = `${OPENAI_AUTH_BASE_URL}/codex/device`;
var OPENAI_CODEX_DEVICE_CALLBACK_URL = `${OPENAI_AUTH_BASE_URL}/deviceauth/callback`;
var OPENAI_CODEX_DEVICE_TIMEOUT_MS = 15 * 6e4;
var MAX_RESPONSE_BYTES2 = 256 * 1024;
var JWT_AUTH_CLAIM = "https://api.openai.com/auth";
function codexAuthJsonFromOAuthCredential(credential, now) {
  return {
    auth_mode: "chatgpt",
    OPENAI_API_KEY: null,
    tokens: {
      ...credential.idToken ? { id_token: credential.idToken } : {},
      access_token: credential.access,
      refresh_token: credential.refresh,
      account_id: credential.accountId,
      expires_at: credential.expires
    },
    last_refresh: now.toISOString()
  };
}
function openAICodexCredentialFromAuthJson(value) {
  const auth = objectValue3(value, "Codex auth document");
  if (auth.auth_mode !== "chatgpt") {
    throw new Error("Codex auth document is not a ChatGPT login");
  }
  const tokens = objectValue3(auth.tokens, "Codex auth tokens");
  const access = nonEmptyString(tokens.access_token);
  const refresh = nonEmptyString(tokens.refresh_token);
  const storedAccountId = nonEmptyString(tokens.account_id);
  if (!access || !refresh || !storedAccountId) {
    throw new Error("Codex auth document was missing OAuth credential fields");
  }
  const claims = accessTokenClaims(access);
  if (claims.accountId !== storedAccountId) {
    throw new Error("Codex auth account identity did not match the access token");
  }
  const storedExpires = finiteNonNegativeNumber(tokens.expires_at);
  const idToken = nonEmptyString(tokens.id_token);
  return {
    access,
    refresh,
    expires: storedExpires ?? claims.expires,
    accountId: claims.accountId,
    ...idToken ? { idToken } : {}
  };
}
async function refreshOpenAICodexCredential(options) {
  throwIfAborted(options.signal);
  const fetchFn = options.fetchFn ?? fetch;
  const response = await fetchFn(`${OPENAI_AUTH_BASE_URL}/oauth/token`, {
    method: "POST",
    headers: requestHeaders("application/x-www-form-urlencoded"),
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: options.refreshToken,
      client_id: OPENAI_CODEX_CLIENT_ID
    }),
    ...options.signal ? { signal: options.signal } : {}
  });
  const body = await readJsonObject(response);
  if (!response.ok) {
    throw responseError("OpenAI token refresh failed", response, body);
  }
  return credentialFromTokenResponse(body, options.now ?? Date.now);
}
function requestHeaders(contentType2) {
  return {
    "Content-Type": contentType2,
    originator: "mlclaw",
    "User-Agent": "mlclaw"
  };
}
async function readJsonObject(response) {
  const text = await readResponseTextLimited(response);
  if (!text) return {};
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("OpenAI OAuth response was not valid JSON");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("OpenAI OAuth response was not a JSON object");
  }
  return parsed;
}
async function readResponseTextLimited(response) {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_RESPONSE_BYTES2) {
    await response.body?.cancel().catch(() => void 0);
    throw new Error("OpenAI OAuth response exceeded the size limit");
  }
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES2) {
        await reader.cancel().catch(() => void 0);
        throw new Error("OpenAI OAuth response exceeded the size limit");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}
function responseError(prefix, response, body) {
  const code = oauthErrorCode(body);
  const safeCode = code ? sanitizeErrorText(code) : void 0;
  return new Error(`${prefix} (HTTP ${response.status})${safeCode ? `: ${safeCode}` : ""}`);
}
function oauthErrorCode(body) {
  const error = body.error;
  if (typeof error === "string") return nonEmptyString(error);
  if (error && typeof error === "object" && !Array.isArray(error)) {
    return nonEmptyString(error.code);
  }
  return void 0;
}
function sanitizeErrorText(value) {
  return value.replace(/[\u0000-\u001f\u007f-\u009f]/gu, " ").replace(/\s+/gu, " ").trim().slice(0, 500);
}
function credentialFromTokenResponse(body, now) {
  const access = nonEmptyString(body.access_token);
  const refresh = nonEmptyString(body.refresh_token);
  const expiresInMs = secondsToSafeMilliseconds(body.expires_in);
  if (!access || !refresh || expiresInMs === void 0) {
    throw new Error("OpenAI token response was missing required fields");
  }
  const claims = accessTokenClaims(access);
  const idToken = nonEmptyString(body.id_token);
  return {
    access,
    refresh,
    expires: now() + expiresInMs,
    accountId: claims.accountId,
    ...idToken ? { idToken } : {}
  };
}
function accessTokenClaims(accessToken) {
  const parts = accessToken.split(".");
  if (parts.length !== 3 || !parts[1]) {
    throw new Error("OpenAI access token was not a JWT");
  }
  let payload;
  try {
    payload = objectValue3(JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")), "access token JWT payload");
  } catch {
    throw new Error("OpenAI access token JWT was invalid");
  }
  const claim = payload[JWT_AUTH_CLAIM];
  const accountId = claim && typeof claim === "object" && !Array.isArray(claim) ? nonEmptyString(claim.chatgpt_account_id) : void 0;
  const expiresSeconds = finiteNonNegativeNumber(payload.exp);
  if (!accountId) {
    throw new Error("OpenAI access token did not contain a ChatGPT account ID");
  }
  if (expiresSeconds === void 0 || !Number.isSafeInteger(expiresSeconds * 1e3)) {
    throw new Error("OpenAI access token did not contain a valid expiry");
  }
  return { accountId, expires: expiresSeconds * 1e3 };
}
function nonEmptyString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function objectValue3(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} was not an object`);
  }
  return value;
}
function finiteNonNegativeNumber(value) {
  const number = typeof value === "string" && value.trim() ? Number(value) : value;
  return typeof number === "number" && Number.isFinite(number) && number >= 0 ? number : void 0;
}
function secondsToSafeMilliseconds(value) {
  const seconds = typeof value === "string" && value.trim() ? Number(value) : value;
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return void 0;
  const milliseconds = Math.floor(seconds * 1e3);
  return Number.isSafeInteger(milliseconds) ? milliseconds : void 0;
}
function throwIfAborted(signal) {
  if (signal?.aborted) throw new Error("OpenAI device login cancelled");
}

// src/mlclaw-space-runtime/codex-credentials.ts
var REFRESH_SKEW_MS = 5 * 6e4;
var CodexCredentialStore = class {
  constructor(config2, now = () => /* @__PURE__ */ new Date(), fetchFn = fetch) {
    this.config = config2;
    this.now = now;
    this.fetchFn = fetchFn;
  }
  tail = Promise.resolve();
  async configured() {
    return Boolean(await this.loadDocument());
  }
  async credentialForImport() {
    const source = await this.loadDocument();
    return source ? openAICodexCredentialFromAuthJson(source.authJson) : void 0;
  }
  async credentialIsCurrent(expected) {
    const source = await this.loadDocument();
    if (!source) return false;
    return stableJson(openAICodexCredentialFromAuthJson(source.authJson)) === stableJson(expected);
  }
  async credential(options = {}) {
    return await this.serialized(async () => {
      const source = await this.loadDocument();
      if (!source) throw new Error("Codex account credentials are not configured for this deployment");
      const credential = openAICodexCredentialFromAuthJson(source.authJson);
      if (!options.forceRefresh && credential.expires > this.now().getTime() + REFRESH_SKEW_MS) {
        return credential;
      }
      const refreshed = await refreshOpenAICodexCredential({
        refreshToken: credential.refresh,
        fetchFn: this.fetchFn,
        now: () => this.now().getTime(),
        ...options.signal ? { signal: options.signal } : {}
      });
      if (refreshed.accountId !== credential.accountId) {
        throw new Error("Refreshed Codex credential changed ChatGPT account identity");
      }
      const latest = await this.loadDocument();
      if (!latest) throw new Error("Codex account credentials were revoked during refresh");
      if (stableJson(latest) !== stableJson(source)) {
        return openAICodexCredentialFromAuthJson(latest.authJson);
      }
      const document = encodeCodexAuthDocument({
        authJson: codexAuthJsonFromOAuthCredential(refreshed, this.now()),
        now: this.now()
      });
      await this.saveDocument(document);
      return refreshed;
    });
  }
  async serialized(operation) {
    const result = this.tail.then(operation, operation);
    this.tail = result.then(
      () => void 0,
      () => void 0
    );
    return await result;
  }
  async loadDocument() {
    if (await this.hasRevocationMarker()) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return void 0;
    }
    if (this.config.stateMountDir) {
      return await this.readLocalDocument();
    }
    if (!this.config.stateBucket || !this.config.hfToken) {
      return await this.readLocalDocument();
    }
    const blob = await this.bucketClient().downloadFile(codexAuthObjectPath(this.config.statePrefix));
    if (!blob) {
      await deleteEncryptedCodexAuthFile(this.config.codexAuthStoreFile);
      return void 0;
    }
    await writePrivateRawFile(this.config.codexAuthStoreFile, await blob.text());
    return await this.readLocalDocument();
  }
  async readLocalDocument() {
    return await readEncryptedCodexAuthFile({
      file: this.config.codexAuthStoreFile,
      secret: this.config.credentialKey,
      expectedContext: this.expectedContext()
    });
  }
  async saveDocument(document) {
    if (await this.hasRevocationMarker()) {
      throw new Error("Codex account credentials were revoked during refresh");
    }
    await writeEncryptedCodexAuthFile({
      file: this.config.codexAuthStoreFile,
      document,
      secret: this.config.credentialKey,
      context: this.expectedContext()
    });
    if (!this.config.stateMountDir && this.config.stateBucket && this.config.hfToken) {
      const encrypted = await fs7.readFile(this.config.codexAuthStoreFile, "utf8");
      await this.bucketClient().uploadFiles([
        { path: codexAuthObjectPath(this.config.statePrefix), content: new Blob([encrypted]) }
      ]);
    }
  }
  async hasRevocationMarker() {
    if (this.config.stateMountDir || !this.config.stateBucket || !this.config.hfToken) {
      return await fileExists(path7.join(path7.dirname(this.config.codexAuthStoreFile), "codex-auth.revoked"));
    }
    return Boolean(await this.bucketClient().downloadFile(codexAuthRevocationObjectPath(this.config.statePrefix)));
  }
  expectedContext() {
    return codexAuthContext({
      ...this.config.deploymentId ? { deploymentId: this.config.deploymentId } : {},
      ...this.config.stateBucket ? { bucket: this.config.stateBucket } : {},
      ...this.config.statePrefix ? { statePrefix: this.config.statePrefix } : {}
    });
  }
  bucketClient() {
    if (!this.config.stateBucket || !this.config.hfToken) {
      throw new Error("Hugging Face bucket credentials are not configured for Codex credentials");
    }
    return new BucketClient({
      bucket: this.config.stateBucket,
      accessToken: this.config.hfToken,
      hubUrl: this.config.hubUrl
    });
  }
};
async function writePrivateRawFile(file, content) {
  await fs7.mkdir(path7.dirname(file), { recursive: true, mode: 448 });
  const temporary = `${file}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    await fs7.writeFile(temporary, content, { encoding: "utf8", mode: 384, flag: "wx" });
    await fs7.chmod(temporary, 384);
    await fs7.rename(temporary, file);
    await fs7.chmod(file, 384);
  } finally {
    await fs7.rm(temporary, { force: true });
  }
}
async function fileExists(file) {
  try {
    await fs7.access(file);
    return true;
  } catch (error) {
    if (isNotFound2(error)) return false;
    throw error;
  }
}
function isNotFound2(error) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}
function stableJson(value) {
  return JSON.stringify(value);
}

// src/mlclaw-space-runtime/mcp-credentials.ts
import { createCipheriv as createCipheriv3, createDecipheriv as createDecipheriv3, hkdfSync as hkdfSync3, randomBytes as randomBytes8 } from "node:crypto";
import fs8 from "node:fs/promises";
import path8 from "node:path";
var DEFAULT_REFRESH_TIMEOUT_MS = 3e4;
var McpCredentialStore = class {
  constructor(options) {
    this.options = options;
    this.key = Buffer.from(hkdfSync3(
      "sha256",
      Buffer.from(options.secret, "utf8"),
      Buffer.alloc(0),
      Buffer.from("mlclaw:mcp-oauth:v1", "utf8"),
      32
    ));
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.now = options.now ?? Date.now;
  }
  key;
  fetchImpl;
  now;
  loadPromise;
  document = { version: 1, credentials: {} };
  refreshes = /* @__PURE__ */ new Map();
  mutationTail = Promise.resolve();
  async save(identity, slot = identity.username) {
    await this.mutate(async () => {
      await this.loadForRecovery();
      this.document.credentials[slot] = {
        username: identity.username,
        accessToken: identity.accessToken,
        ...identity.refreshToken ? { refreshToken: identity.refreshToken } : {},
        tokenType: identity.tokenType,
        scope: [...identity.scope],
        ...identity.expiresAt ? { expiresAt: identity.expiresAt } : {},
        updatedAt: this.now()
      };
      await this.persist();
    });
  }
  async clear(username) {
    await this.mutate(async () => {
      const recovered = await this.loadForRecovery();
      if (!(username in this.document.credentials) && !recovered) {
        return;
      }
      delete this.document.credentials[username];
      await this.persist();
    });
  }
  async status(slot) {
    await this.load();
    const credential = this.document.credentials[slot];
    const refreshable = Boolean(credential?.refreshToken);
    const configured = Boolean(credential && (!credential.expiresAt || credential.expiresAt > this.now() + 6e4 || refreshable));
    return credential ? {
      configured,
      username: credential.username,
      scope: [...credential.scope],
      expiresAt: credential.expiresAt ? new Date(credential.expiresAt).toISOString() : null,
      refreshable
    } : {
      configured: false,
      username: slot,
      scope: [],
      expiresAt: null,
      refreshable: false
    };
  }
  async accessToken(slot) {
    await this.load();
    const credential = this.document.credentials[slot];
    if (!credential) {
      throw new Error("Hugging Face MCP authorization is not configured");
    }
    if (!credential.expiresAt || credential.expiresAt > this.now() + 6e4) {
      return credential.accessToken;
    }
    const existing = this.refreshes.get(slot);
    if (existing) {
      return existing;
    }
    const refreshing = this.refresh(slot, credential).finally(() => {
      this.refreshes.delete(slot);
    });
    this.refreshes.set(slot, refreshing);
    return refreshing;
  }
  async load() {
    if (!this.loadPromise) {
      this.loadPromise = this.loadFromDisk().catch((err) => {
        this.loadPromise = void 0;
        throw err;
      });
    }
    await this.loadPromise;
  }
  async loadFromDisk() {
    let raw2;
    try {
      raw2 = await fs8.readFile(this.options.file, "utf8");
    } catch (err) {
      if (isNotFound3(err)) {
        return;
      }
      throw new Error("Could not read encrypted MCP credentials");
    }
    try {
      this.document = decodeDocument(decryptEnvelope(raw2, this.key));
    } catch {
      throw new InvalidCredentialFileError();
    }
  }
  async loadForRecovery() {
    try {
      await this.load();
      return false;
    } catch (err) {
      if (!(err instanceof InvalidCredentialFileError)) {
        throw err;
      }
      this.document = { version: 1, credentials: {} };
      this.loadPromise = Promise.resolve();
      return true;
    }
  }
  mutate(operation) {
    const result = this.mutationTail.then(operation);
    this.mutationTail = result.then(() => void 0, () => void 0);
    return result;
  }
  async persist() {
    const directory = path8.dirname(this.options.file);
    await fs8.mkdir(directory, { recursive: true, mode: 448 });
    const temporary = `${this.options.file}.${process.pid}.${randomBytes8(6).toString("hex")}.tmp`;
    const encrypted = encryptDocument(this.document, this.key);
    try {
      await fs8.writeFile(temporary, `${JSON.stringify(encrypted)}
`, { encoding: "utf8", mode: 384 });
      await fs8.chmod(temporary, 384);
      await fs8.rename(temporary, this.options.file);
      await fs8.chmod(this.options.file, 384);
    } finally {
      await fs8.rm(temporary, { force: true });
    }
  }
  async refresh(slot, credential) {
    return this.mutate(async () => {
      if (this.document.credentials[slot] !== credential) {
        throw new Error("Hugging Face MCP authorization expired; sign in again");
      }
      if (!credential.refreshToken || !this.options.clientId || !this.options.clientSecret) {
        throw new Error("Hugging Face MCP authorization expired; sign in again");
      }
      const providerUrl = this.options.providerUrl.replace(/\/+$/, "");
      const basic = Buffer.from(`${this.options.clientId}:${this.options.clientSecret}`).toString("base64");
      let response;
      try {
        response = await this.fetchImpl(`${providerUrl}/oauth/token`, {
          method: "POST",
          headers: {
            authorization: `Basic ${basic}`,
            "content-type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: credential.refreshToken,
            client_id: this.options.clientId
          }),
          signal: AbortSignal.timeout(this.options.refreshTimeoutMs ?? DEFAULT_REFRESH_TIMEOUT_MS)
        });
      } catch {
        throw new Error("Hugging Face MCP authorization refresh is temporarily unavailable");
      }
      if (!response.ok) {
        const error = await response.clone().json().catch(() => void 0);
        if ((response.status === 400 || response.status === 401) && stringValue4(error?.error) === "invalid_grant") {
          delete this.document.credentials[slot];
          await this.persist();
          throw new Error("Hugging Face MCP authorization expired; sign in again");
        }
        throw new Error("Hugging Face MCP authorization refresh is temporarily unavailable");
      }
      const body = await response.json();
      const accessToken = stringValue4(body.access_token);
      if (!accessToken) {
        throw new Error("Hugging Face MCP token refresh returned an invalid response");
      }
      const expiresIn = numberValue2(body.expires_in);
      const { expiresAt: _expired, ...credentialWithoutExpiry } = credential;
      const refreshed = {
        ...credentialWithoutExpiry,
        accessToken,
        refreshToken: stringValue4(body.refresh_token) ?? credential.refreshToken,
        tokenType: stringValue4(body.token_type) ?? credential.tokenType,
        scope: scopeValue(body.scope) ?? credential.scope,
        ...expiresIn ? { expiresAt: this.now() + expiresIn * 1e3 } : {},
        updatedAt: this.now()
      };
      this.document.credentials[slot] = refreshed;
      await this.persist();
      return accessToken;
    });
  }
};
var InvalidCredentialFileError = class extends Error {
  constructor() {
    super("Encrypted MCP credentials are invalid or cannot be decrypted");
    this.name = "InvalidCredentialFileError";
  }
};
function encryptDocument(document, key) {
  const iv = randomBytes8(12);
  const cipher = createCipheriv3("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(document), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return {
    version: 1,
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64url"),
    tag: cipher.getAuthTag().toString("base64url"),
    ciphertext: ciphertext.toString("base64url")
  };
}
function decryptEnvelope(raw2, key) {
  const envelope = JSON.parse(raw2);
  if (envelope.version !== 1 || envelope.algorithm !== "aes-256-gcm" || !envelope.iv || !envelope.tag || !envelope.ciphertext) {
    throw new Error("invalid envelope");
  }
  const decipher = createDecipheriv3("aes-256-gcm", key, Buffer.from(envelope.iv, "base64url"));
  decipher.setAuthTag(Buffer.from(envelope.tag, "base64url"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, "base64url")),
    decipher.final()
  ]);
  return JSON.parse(plaintext.toString("utf8"));
}
function decodeDocument(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid credential document");
  }
  const record = value;
  if (record.version !== 1 || !record.credentials || typeof record.credentials !== "object" || Array.isArray(record.credentials)) {
    throw new Error("invalid credential document");
  }
  const credentials = {};
  for (const [username, raw2] of Object.entries(record.credentials)) {
    if (!raw2 || typeof raw2 !== "object" || Array.isArray(raw2)) {
      throw new Error("invalid credential");
    }
    const item = raw2;
    const accessToken = stringValue4(item.accessToken);
    const refreshToken = stringValue4(item.refreshToken);
    const expiresAt = numberValue2(item.expiresAt);
    const credentialUsername = stringValue4(item.username);
    if (!accessToken || !credentialUsername) {
      throw new Error("invalid credential");
    }
    credentials[username] = {
      username: credentialUsername,
      accessToken,
      ...refreshToken ? { refreshToken } : {},
      tokenType: stringValue4(item.tokenType) ?? "Bearer",
      scope: scopeValue(item.scope) ?? [],
      ...expiresAt ? { expiresAt } : {},
      updatedAt: numberValue2(item.updatedAt) ?? 0
    };
  }
  return { version: 1, credentials };
}
function scopeValue(value) {
  const values = Array.isArray(value) ? value.filter((item) => typeof item === "string") : typeof value === "string" ? value.split(/\s+/) : void 0;
  return values ? [...new Set(values.map((item) => item.trim()).filter(Boolean))] : void 0;
}
function stringValue4(value) {
  return typeof value === "string" && value.trim() ? value.trim() : void 0;
}
function numberValue2(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : void 0;
}
function isNotFound3(err) {
  return Boolean(err && typeof err === "object" && "code" in err && err.code === "ENOENT");
}

// src/mlclaw-space-runtime/openclaw-state-migration.ts
import { existsSync } from "node:fs";
import fs9 from "node:fs/promises";
import path9 from "node:path";
import { DatabaseSync } from "node:sqlite";
var LEGACY_PROVIDER_ID = "mlclaw-codex";
var NATIVE_PROVIDER_ID = "openai";
var MAX_SESSION_STORE_BYTES = 64 * 1024 * 1024;
async function migrateLegacyOpenAiSessionRefs(config2, now = Date.now) {
  const stateDir = path9.dirname(config2.openclawConfigPath);
  const agentsDir = path9.join(stateDir, "agents");
  let changed = 0;
  for (const agentId of await directoryNames(agentsDir)) {
    const agentRoot = path9.join(agentsDir, agentId);
    changed += await migrateJsonSessionStore(path9.join(agentRoot, "sessions", "sessions.json"), now);
    changed += migrateSqliteSessionStore(path9.join(agentRoot, "agent", "openclaw-agent.sqlite"), now);
  }
  return changed;
}
function migrateSqliteSessionStore(file, now) {
  if (!existsSync(file)) return 0;
  const database = new DatabaseSync(file);
  try {
    if (!hasSessionEntriesTable(database)) return 0;
    const updates = collectSqliteUpdates(database, now);
    if (updates.length === 0) return 0;
    applySqliteUpdates(database, updates);
    return updates.length;
  } finally {
    database.close();
  }
}
function hasSessionEntriesTable(database) {
  return Boolean(
    database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'session_entries'").get()
  );
}
function collectSqliteUpdates(database, now) {
  const rows = database.prepare("SELECT session_key, entry_json FROM session_entries").all();
  return rows.flatMap((row) => {
    const migrated = migrateSerializedEntry(row.entry_json, now);
    return migrated ? [{ sessionKey: row.session_key, entryJson: migrated, updatedAt: now() }] : [];
  });
}
function applySqliteUpdates(database, updates) {
  const update = database.prepare("UPDATE session_entries SET entry_json = ?, updated_at = ? WHERE session_key = ?");
  database.exec("BEGIN IMMEDIATE");
  try {
    for (const item of updates) update.run(item.entryJson, item.updatedAt, item.sessionKey);
    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}
async function migrateJsonSessionStore(file, now) {
  const stat = await optionalStat(file);
  if (!stat?.isFile()) return 0;
  if (stat.size > MAX_SESSION_STORE_BYTES) {
    throw new Error(`OpenClaw session store exceeds ${MAX_SESSION_STORE_BYTES} bytes: ${file}`);
  }
  const value = parseSessionStore(await fs9.readFile(file, "utf8"), file);
  const result = migrateSessionStore(value, now);
  if (result.changed === 0) return 0;
  await writeJsonAtomic(file, result.value, {
    mode: stat.mode & 511,
    uid: stat.uid,
    gid: stat.gid
  });
  return result.changed;
}
async function optionalStat(file) {
  try {
    return await fs9.stat(file);
  } catch (error) {
    if (isNotFound4(error)) return void 0;
    throw error;
  }
}
function parseSessionStore(raw2, file) {
  const value = JSON.parse(raw2);
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`OpenClaw session store must be a JSON object: ${file}`);
  }
  return value;
}
function migrateSessionStore(store, now) {
  let changed = 0;
  const value = Object.fromEntries(
    Object.entries(store).map(([key, entry]) => {
      const result = migrateValue(entry);
      if (result.changed) changed += 1;
      if (result.changed && isMutableRecord(result.value)) result.value.updatedAt = now();
      return [key, result.value];
    })
  );
  return { value, changed };
}
function migrateSerializedEntry(raw2, now) {
  let value;
  try {
    value = JSON.parse(raw2);
  } catch {
    return void 0;
  }
  const result = migrateValue(value);
  if (!result.changed) return void 0;
  if (result.value && typeof result.value === "object" && !Array.isArray(result.value)) {
    result.value.updatedAt = now();
  }
  return JSON.stringify(result.value);
}
function migrateValue(value) {
  if (typeof value === "string") return migrateString(value);
  if (Array.isArray(value)) return migrateArray(value);
  if (isMutableRecord(value)) return migrateRecord(value);
  return { value, changed: false };
}
function migrateString(value) {
  if (value === LEGACY_CODEX_MODEL_REF) return { value: DEFAULT_OPENAI_MODEL_REF, changed: true };
  if (value === LEGACY_PROVIDER_ID) return { value: NATIVE_PROVIDER_ID, changed: true };
  return { value, changed: false };
}
function migrateArray(value) {
  let changed = false;
  const migrated = value.map((entry) => {
    const result = migrateValue(entry);
    changed ||= result.changed;
    return result.value;
  });
  return { value: changed ? migrated : value, changed };
}
function migrateRecord(value) {
  let changed = false;
  const migrated = Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      const migratedKey = key === LEGACY_CODEX_MODEL_REF ? DEFAULT_OPENAI_MODEL_REF : key;
      const result = migrateValue(entry);
      changed ||= migratedKey !== key || result.changed;
      return [migratedKey, result.value];
    })
  );
  return { value: changed ? migrated : value, changed };
}
function isMutableRecord(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
async function directoryNames(directory) {
  try {
    return (await fs9.readdir(directory, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch (error) {
    if (isNotFound4(error)) return [];
    throw error;
  }
}
async function writeJsonAtomic(file, value, ownership) {
  const temporary = `${file}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    await fs9.writeFile(temporary, `${JSON.stringify(value, null, 2)}
`, {
      mode: ownership.mode,
      flag: "wx"
    });
    if (process.getuid?.() === 0) await fs9.chown(temporary, ownership.uid, ownership.gid);
    await fs9.rename(temporary, file);
    await fs9.chmod(file, ownership.mode);
  } finally {
    await fs9.rm(temporary, { force: true });
  }
}
function isNotFound4(error) {
  return Boolean(error && typeof error === "object" && "code" in error && error.code === "ENOENT");
}

// src/mlclaw-space-runtime/proxy.ts
import http2 from "node:http";
import net from "node:net";
var ADMIN_CONTROL_UI_SCOPES = [
  "operator.admin",
  "operator.read",
  "operator.write",
  "operator.approvals",
  "operator.pairing"
];
var USER_CONTROL_UI_SCOPES = ["operator.read", "operator.write"];
var HOP_BY_HOP_HEADERS = /* @__PURE__ */ new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade"
]);
async function proxyHttp(req, res, config2, identity) {
  const headers = sanitizeHeaders(req.headers);
  headers.host = `${config2.openclawHost}:${config2.openclawPort}`;
  if (isHtmlNavigation(req)) {
    delete headers["accept-encoding"];
    delete headers["Accept-Encoding"];
  }
  addTrustedProxyHeaders(headers, config2, identity, requestAccessOrigin(req, config2), proxyClientAddress(req));
  const upstream = http2.request(
    {
      host: config2.openclawHost,
      port: config2.openclawPort,
      method: req.method,
      path: req.url,
      headers
    },
    (upstreamResponse) => {
      const responseHeaders2 = sanitizeHeaders(upstreamResponse.headers);
      const inject = shouldInjectShell({
        method: req.method,
        requestAccept: String(req.headers.accept ?? ""),
        responseContentType: headerValue(upstreamResponse.headers["content-type"]),
        responseContentEncoding: headerValue(upstreamResponse.headers["content-encoding"])
      });
      if (!inject) {
        res.writeHead(upstreamResponse.statusCode ?? 502, responseHeaders2);
        upstreamResponse.pipe(res);
        return;
      }
      const chunks = [];
      upstreamResponse.on("data", (chunk) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });
      upstreamResponse.on("end", () => {
        const body = rewriteOpenClawHtml(Buffer.concat(chunks).toString("utf8"), config2.branding);
        delete responseHeaders2["content-length"];
        delete responseHeaders2["Content-Length"];
        res.writeHead(upstreamResponse.statusCode ?? 502, responseHeaders2);
        res.end(body);
      });
    }
  );
  upstream.on("error", (err) => {
    process.stderr.write(`[mlclaw] upstream HTTP proxy failed: ${err.stack ?? err.message}
`);
    if (!res.headersSent) {
      res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end("OpenClaw gateway is not ready\n");
  });
  req.pipe(upstream);
}
function proxyWebSocket(req, socket, head, config2, identity) {
  const upstream = net.connect(config2.openclawPort, config2.openclawHost);
  let connected = false;
  const destroyBoth = () => {
    upstream.destroy();
    socket.destroy();
  };
  upstream.on("connect", () => {
    connected = true;
    const headers = sanitizeHeaders(req.headers);
    headers.host = `${config2.openclawHost}:${config2.openclawPort}`;
    headers.connection = "Upgrade";
    headers.upgrade = req.headers.upgrade ?? "websocket";
    addTrustedProxyHeaders(headers, config2, identity, requestAccessOrigin(req, config2), proxyClientAddress(req));
    upstream.write(`${req.method ?? "GET"} ${req.url ?? "/"} HTTP/${req.httpVersion}\r
`);
    for (const [key, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          upstream.write(`${key}: ${item}\r
`);
        }
      } else if (value !== void 0) {
        upstream.write(`${key}: ${value}\r
`);
      }
    }
    upstream.write("\r\n");
    if (head.length > 0) {
      upstream.write(head);
    }
    upstream.pipe(socket);
    socket.pipe(upstream);
  });
  upstream.on("error", (err) => {
    process.stderr.write(`[mlclaw] upstream WebSocket proxy failed: ${err.stack ?? err.message}
`);
    if (!connected && !socket.destroyed) {
      socket.write("HTTP/1.1 502 Bad Gateway\r\nConnection: close\r\n\r\n");
    }
    destroyBoth();
  });
  socket.on("error", destroyBoth);
  socket.on("close", () => upstream.destroy());
  upstream.on("close", () => socket.destroy());
}
function rejectWebSocket(socket) {
  socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
  socket.destroy();
}
function sanitizeHeaders(headers) {
  const out = {};
  for (const [key, value] of Object.entries(headers)) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) {
      continue;
    }
    if (lower.startsWith("x-forwarded-") || lower.startsWith("x-openclaw-") || lower.startsWith("tailscale-") || lower === "authorization") {
      continue;
    }
    out[key] = value;
  }
  return out;
}
function addTrustedProxyHeaders(headers, config2, identity, accessOrigin, clientAddress) {
  headers["x-forwarded-user"] = identity.username;
  headers["x-forwarded-for"] = clientAddress;
  headers["x-forwarded-proto"] = accessOrigin.startsWith("https://") ? "https" : "http";
  headers["x-forwarded-host"] = new URL(accessOrigin).host;
  headers["x-openclaw-scopes"] = resolveControlUiScopes(config2, identity).join(",");
}
function proxyClientAddress(req) {
  const remoteAddress = req.socket.remoteAddress?.trim();
  if (remoteAddress && net.isIP(remoteAddress) !== 0 && !isLoopbackAddress(remoteAddress)) {
    return remoteAddress;
  }
  return "192.0.2.1";
}
function isLoopbackAddress(address) {
  const normalized = address.toLowerCase();
  return normalized === "::1" || normalized.startsWith("127.") || normalized.startsWith("::ffff:127.");
}
function requestAccessOrigin(req, config2) {
  const host = req.headers.host?.trim().toLowerCase();
  if (!host) {
    return config2.publicUrl;
  }
  return config2.accessOrigins.find((origin) => new URL(origin).host.toLowerCase() === host) ?? config2.publicUrl;
}
function resolveControlUiScopes(config2, identity) {
  return config2.adminUsers.includes(identity.username) ? ADMIN_CONTROL_UI_SCOPES : USER_CONTROL_UI_SCOPES;
}
function headerValue(value) {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  if (typeof value === "number") {
    return String(value);
  }
  return value;
}
function isHtmlNavigation(req) {
  return (req.method === "GET" || req.method === "HEAD") && String(req.headers.accept ?? "").includes("text/html");
}

// src/mlclaw-space-runtime/server.ts
var SpaceRuntimeServer = class {
  constructor(config2, options = {}) {
    this.config = config2;
    this.exitProcess = options.exitProcess ?? ((code) => process.exit(code));
    this.syncOAuthProfile = options.syncOAuthProfile ?? syncOpenAiOAuthProfile;
    this.mcpCredentials = new McpCredentialStore({
      file: config2.mcpCredentialFile,
      secret: config2.credentialKey,
      providerUrl: config2.providerUrl,
      ...config2.oauthClientId ? { clientId: config2.oauthClientId } : {},
      ...config2.oauthClientSecret ? { clientSecret: config2.oauthClientSecret } : {}
    });
    this.openAiCredentials = new OpenAiCredentialStore(config2.openaiCredentialStoreFile, config2.credentialKey);
    this.codexCredentials = new CodexCredentialStore(config2);
    this.mcpIntegrations = new McpIntegrationServer(config2, this.mcpCredentials);
    const credentialSlot = integrationCredentialSlot(config2);
    this.app = createSpaceRuntimeApp(config2, {
      openclawRunning: () => Boolean(this.openclaw && !this.openclaw.killed),
      openAiConfigured: async () => openAiConfigured() || Boolean(await loadOpenAiCredentialFile(this.config.openaiCredentialFile)) || Boolean(await this.openAiCredentials.load()),
      restartOpenClawWithOpenAi: (apiKey) => this.restartOpenClawWithOpenAi(apiKey),
      restartOpenClaw: () => this.restartOpenClaw(),
      setModelSettings: (model, choices) => {
        this.config.model = model;
        this.config.modelChoices = choices;
      },
      saveMcpCredentials: async (identity) => {
        if (!credentialSlot) {
          throw new Error("ML Claw has no integration administrator");
        }
        await this.mcpCredentials.save(identity, credentialSlot);
      },
      clearMcpCredentials: (slot) => this.mcpCredentials.clear(slot),
      mcpCredentialStatus: (slot) => this.mcpCredentials.status(slot),
      mcpServerStatus: () => managedMcpServerStatus(this.config)
    });
  }
  openclaw;
  telegramBotMux;
  unyoloTelegram;
  openclawGatewayPassword = randomBytes9(48).toString("base64url");
  openclawStarting = false;
  openclawStopping = false;
  telegramBotMuxStopping = false;
  unyoloTelegramStopping = false;
  app;
  exitProcess;
  syncOAuthProfile;
  mcpCredentials;
  mcpIntegrations;
  openAiCredentials;
  codexCredentials;
  async start() {
    if (this.config.mode === "app") {
      await this.mcpIntegrations.start();
      try {
        await this.startTelegramBotMux();
        await this.startUnyoloTelegram();
        await this.startOpenClaw();
      } catch (err) {
        await this.stop();
        throw err;
      }
    }
    const server2 = http3.createServer((req, res) => {
      this.handle(req, res).catch((err) => {
        if (res.destroyed && err instanceof Error && err.name === "AbortError") {
          return;
        }
        process.stderr.write(`[mlclaw] request failed: ${formatError2(err)}
`);
        if (!res.headersSent) {
          res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        }
        res.end("Internal server error\n");
      });
    });
    server2.on("upgrade", (req, socket, head) => {
      const netSocket = socket;
      try {
        const session = readSession(req.headers.cookie, this.config.sessionSecret, this.config.sessionCookieName);
        if (!session || !this.isAllowed(session.username)) {
          rejectWebSocket(netSocket);
          return;
        }
        proxyWebSocket(req, netSocket, head, this.config, { username: session.username });
      } catch (err) {
        process.stderr.write(`[mlclaw] websocket upgrade failed: ${formatError2(err)}
`);
        rejectWebSocket(netSocket);
      }
    });
    try {
      await new Promise((resolve, reject) => {
        const onError = (err) => {
          server2.off("listening", onListening);
          reject(err);
        };
        const onListening = () => {
          server2.off("error", onError);
          resolve();
        };
        server2.once("error", onError);
        server2.once("listening", onListening);
        server2.listen(this.config.port, "0.0.0.0");
      });
    } catch (err) {
      await this.stop();
      server2.close();
      throw err;
    }
    process.stdout.write(`[mlclaw] listening on ${this.config.port} in ${this.config.mode} mode
`);
    return server2;
  }
  async stop() {
    await this.stopOpenClaw();
    await this.stopUnyoloTelegram();
    await this.stopTelegramBotMux();
    await this.mcpIntegrations.stop();
  }
  async startTelegramBotMux() {
    const configPath = this.config.telegramBotMuxConfigPath;
    if (!configPath || this.telegramBotMux) return;
    const command = this.config.telegramBotMuxCommand ?? "/usr/sbin/gosu";
    const args = this.config.telegramBotMuxArgs ?? [
      "telegram-bot-mux",
      "/usr/local/bin/telegram-bot-mux",
      "serve",
      "--config",
      configPath
    ];
    try {
      await spawnSidecar(
        command,
        args,
        telegramBotMuxEnvironment(process.env),
        "telegram-bot-mux",
        (child) => {
          this.telegramBotMux = child;
        },
        (child, code) => {
          if (this.telegramBotMux === child) this.telegramBotMux = void 0;
          if (!this.telegramBotMuxStopping) this.exitProcess(code);
        }
      );
    } catch (error) {
      this.telegramBotMux = void 0;
      throw error;
    }
    if (this.config.telegramBotMuxReadyUrl) {
      await waitForSidecarReady(this.telegramBotMux, this.config.telegramBotMuxReadyUrl, "telegram-bot-mux");
    }
    process.stdout.write("[telegram-bot-mux] shared Telegram poller started\n");
  }
  async stopTelegramBotMux() {
    this.telegramBotMuxStopping = true;
    await stopSidecar(this.telegramBotMux);
    this.telegramBotMux = void 0;
    this.telegramBotMuxStopping = false;
  }
  async startUnyoloTelegram() {
    const configPath = this.config.unyoloTelegramConfigPath;
    if (!configPath || this.unyoloTelegram) return;
    const command = this.config.unyoloTelegramCommand ?? "/usr/sbin/gosu";
    const args = this.config.unyoloTelegramArgs ?? [
      "unyolo-telegram",
      "/usr/local/bin/unyolo-telegram",
      "serve",
      "--config",
      configPath
    ];
    try {
      await spawnSidecar(
        command,
        args,
        unyoloTelegramEnvironment(process.env),
        "unyolo-telegram",
        (child) => {
          this.unyoloTelegram = child;
        },
        (child, code) => {
          if (this.unyoloTelegram === child) this.unyoloTelegram = void 0;
          if (!this.unyoloTelegramStopping) this.exitProcess(code);
        }
      );
    } catch (error) {
      this.unyoloTelegram = void 0;
      throw error;
    }
    process.stdout.write("[unyolo-telegram] approval ingress started\n");
  }
  async stopUnyoloTelegram() {
    this.unyoloTelegramStopping = true;
    await stopSidecar(this.unyoloTelegram);
    this.unyoloTelegram = void 0;
    this.unyoloTelegramStopping = false;
  }
  async stopOpenClaw() {
    const child = this.openclaw;
    if (!child || child.killed) {
      return;
    }
    this.openclawStopping = true;
    child.kill("SIGTERM");
    await new Promise((resolve) => {
      const timer = setTimeout(() => {
        child.kill("SIGKILL");
      }, 1e4);
      child.once("exit", () => {
        clearTimeout(timer);
        resolve();
      });
    });
    this.openclawStopping = false;
  }
  async handle(req, res) {
    const url = new URL(req.url ?? "/", this.config.publicUrl);
    if (this.config.mode === "template" && !isTemplateRuntimePath(url.pathname)) {
      this.sendHtml(res, templatePage(this.config));
      return;
    }
    if (this.shouldRouteToMlClaw(url.pathname)) {
      const requestAbort = new AbortController();
      const abortRequest = () => requestAbort.abort();
      res.once("close", abortRequest);
      try {
        const response = await this.app.fetch(nodeRequestToWebRequest(req, this.config.publicUrl, requestAbort.signal));
        if (!response.headers.has("x-mlclaw-fallback")) {
          await sendWebResponse(res, response);
          return;
        }
      } finally {
        res.off("close", abortRequest);
      }
    }
    const session = readSession(req.headers.cookie, this.config.sessionSecret, this.config.sessionCookieName);
    if (!session) {
      this.sendUnauthenticated(req, res, url);
      return;
    }
    if (!this.isAllowed(session.username)) {
      this.sendHtml(res, unauthorizedPage(session.username), 403);
      return;
    }
    if (this.isAdmin(session.username) && this.config.oauthClientId && this.config.oauthClientSecret && isBrowserNavigation2(req)) {
      const integrations = await managedMcpServerStatus(this.config);
      const credentialSlot = integrationCredentialSlot(this.config);
      const authorization = credentialSlot ? await this.mcpCredentials.status(credentialSlot).catch(() => void 0) : void 0;
      if (integrations.some((integration) => integration.enabled) && !authorization?.configured) {
        const next = normalizeNext(`${url.pathname}${url.search}`);
        this.sendRedirect(res, `/oauth/login?intent=integrations&next=${encodeURIComponent(next)}`);
        return;
      }
    }
    await proxyHttp(req, res, this.config, { username: session.username });
  }
  shouldRouteToMlClaw(pathname) {
    return pathname === "/health" || pathname === "/healthz" || pathname === "/favicon.svg" || pathname === "/favicon-32.png" || pathname === "/favicon.ico" || pathname === "/apple-touch-icon.png" || pathname === "/manifest.webmanifest" || pathname === "/sw.js" || pathname === "/assets/hf-logo.svg" || pathname === "/assets/mlclaw.svg" || pathname === "/assets/assistant-avatar.svg" || pathname === "/assets/mlclaw-control-branding.js" || pathname === "/assets/brand/logo" || pathname === "/plugins/unyolo/ui" || pathname.startsWith("/plugins/unyolo/ui/") || pathname === "/trusted-host/api/unyolo" || pathname.startsWith("/trusted-host/api/unyolo/") || pathname === "/login" || pathname === "/logout" || pathname.startsWith("/oauth/") || pathname === "/mlclaw" || pathname.startsWith("/mlclaw/");
  }
  async startOpenClaw(extraEnv = {}) {
    if (this.openclawStarting || this.openclaw && !this.openclaw.killed) {
      return;
    }
    this.openclawStarting = true;
    try {
      const candidateCredential = await this.codexCredentials.credentialForImport();
      const codexCredential = candidateCredential && await this.codexCredentials.credentialIsCurrent(candidateCredential) ? candidateCredential : void 0;
      const codexConfigured = Boolean(codexCredential);
      const persistedOpenAiKey = await loadOpenAiCredentialFile(this.config.openaiCredentialFile) ?? process.env.OPENAI_API_KEY?.trim() ?? await this.openAiCredentials.load();
      const migratedSessions = await migrateLegacyOpenAiSessionRefs(this.config);
      if (migratedSessions > 0) {
        process.stdout.write(`[mlclaw] Migrated ${migratedSessions} native OpenAI session route(s)
`);
      }
      const resolvedLegacyModel = codexConfigured || persistedOpenAiKey ? DEFAULT_OPENAI_MODEL_REF : this.config.modelChoices[0]?.openclawModel ?? this.config.model;
      if (this.config.model === LEGACY_CODEX_MODEL_REF) {
        this.config.model = resolvedLegacyModel;
      }
      const bootstrapModel = this.config.bootstrapModel === LEGACY_CODEX_MODEL_REF ? resolvedLegacyModel : this.config.bootstrapModel;
      const runtimeSettings2 = await initializeRuntimeSettingsFile({
        file: this.config.runtimeSettingsFile,
        model: bootstrapModel,
        modelChoices: this.config.modelChoices,
        ...this.config.bootstrapUpdatedAt ? { bootstrapUpdatedAt: this.config.bootstrapUpdatedAt } : {}
      });
      this.config.model = runtimeSettings2.model;
      this.config.modelChoices = runtimeSettings2.modelChoices;
      this.config.runtimeSettingsGeneration = runtimeSettings2.generation;
      await configureOpenClawGateway(this.config, {
        codexConfigured,
        openAiConfigured: Boolean(persistedOpenAiKey)
      });
      if (codexConfigured) process.stdout.write("[mlclaw] Native OpenAI OAuth enabled\n");
      const env = {
        ...allowedOpenClawEnvironment(process.env),
        HOME: "/home/node",
        USER: "node",
        LOGNAME: "node",
        OPENCLAW_GATEWAY_PORT: String(this.config.openclawPort),
        OPENCLAW_MODEL: this.config.model,
        ...persistedOpenAiKey ? { OPENAI_API_KEY: persistedOpenAiKey } : {},
        ...extraEnv
      };
      if (!this.config.brokerAgentUrl && this.config.routerToken) {
        env.HF_TOKEN = this.config.routerToken;
        env.HUGGINGFACE_HUB_TOKEN = this.config.routerToken;
      }
      const profileSynced = await this.syncOAuthProfile({
        config: this.config,
        ...codexCredential ? { credential: codexCredential } : {},
        env
      });
      if (codexCredential && !profileSynced) {
        throw new Error("OpenClaw command does not support native OAuth profile provisioning");
      }
      if (codexCredential && !await this.codexCredentials.credentialIsCurrent(codexCredential)) {
        await this.syncOAuthProfile({ config: this.config, env });
        throw new Error("OpenAI OAuth credentials were revoked during native profile provisioning");
      }
      env.OPENCLAW_GATEWAY_PASSWORD = this.openclawGatewayPassword;
      this.openclaw = spawn2(this.config.openclawCommand, this.config.openclawArgs, {
        stdio: "inherit",
        env,
        ...process.getuid?.() === 0 ? { uid: this.config.openclawUid, gid: this.config.openclawGid } : {}
      });
      this.openclaw.once("exit", (code, signal) => {
        process.stdout.write(`[mlclaw] openclaw exited code=${code ?? "null"} signal=${signal ?? "null"}
`);
        this.openclaw = void 0;
        if (!this.openclawStopping) {
          const exitCode = typeof code === "number" && code !== 0 ? code : 1;
          this.exitProcess(exitCode);
        }
      });
    } finally {
      this.openclawStarting = false;
    }
  }
  async restartOpenClawWithOpenAi(apiKey) {
    await this.stopOpenClaw();
    await this.startOpenClaw({ OPENAI_API_KEY: apiKey });
  }
  async restartOpenClaw() {
    await this.stopOpenClaw();
    await this.startOpenClaw();
  }
  isAllowed(username) {
    return this.config.allowAnySignedIn || this.config.allowedUsers.includes(username);
  }
  isAdmin(username) {
    return this.config.adminUsers.includes(username);
  }
  sendUnauthenticated(req, res, url) {
    const next = normalizeNext(`${url.pathname}${url.search}`);
    if (this.config.gatewayLocation === "local" && isBrowserNavigation2(req)) {
      this.sendRedirect(res, "/mlclaw/local-login");
      return;
    }
    if (url.pathname === "/" && (req.method === "GET" || req.method === "HEAD")) {
      this.sendHtml(res, loginPage(this.config, void 0, next));
      return;
    }
    if (isBrowserNavigation2(req) && !isApiPath(url.pathname)) {
      this.sendRedirect(res, `/login?next=${encodeURIComponent(next)}`);
      return;
    }
    if (isApiPath(url.pathname)) {
      res.writeHead(401, { "content-type": "application/json; charset=utf-8" });
      res.end(`${JSON.stringify({ ok: false, error: "authentication required" })}
`);
      return;
    }
    this.sendHtml(res, loginPage(this.config, void 0, next), 401);
  }
  sendRedirect(res, location) {
    res.writeHead(302, { location });
    res.end();
  }
  sendHtml(res, body, status = 200) {
    res.writeHead(status, { "content-type": "text/html; charset=utf-8" });
    res.end(body);
  }
};
async function spawnSidecar(command, args, env, label, assign, onUnexpectedExit) {
  const child = spawn2(command, args, { stdio: "inherit", env });
  assign(child);
  let started = false;
  const spawned = new Promise((resolve, reject) => {
    child.once("spawn", () => {
      started = true;
      resolve();
    });
    child.once("error", reject);
  });
  child.once("exit", (code, signal) => {
    process.stdout.write(`[${label}] exited code=${code ?? "null"} signal=${signal ?? "null"}
`);
    if (started) onUnexpectedExit(child, typeof code === "number" && code !== 0 ? code : 1);
  });
  await spawned;
}
async function stopSidecar(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  child.kill("SIGTERM");
  await new Promise((resolve) => {
    const timer = setTimeout(() => child.kill("SIGKILL"), 1e4);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}
async function waitForSidecarReady(child, readyUrl, label) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    if (!child || child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`${label} exited before readiness`);
    }
    try {
      const response = await fetch(readyUrl, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`${label} readiness timed out`);
}
var SIDECAR_ENV_ALLOWLIST = [
  "PATH",
  "TZ",
  "LANG",
  "LC_ALL",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "no_proxy"
];
function telegramBotMuxEnvironment(source) {
  return sidecarEnvironment(source, "/var/lib/telegram-bot-mux", "telegram-bot-mux");
}
function unyoloTelegramEnvironment(source) {
  return sidecarEnvironment(source, "/var/lib/unyolo-telegram", "unyolo-telegram");
}
function sidecarEnvironment(source, home, identity) {
  const env = { HOME: home, USER: identity, LOGNAME: identity };
  for (const key of SIDECAR_ENV_ALLOWLIST) {
    if (source[key] !== void 0) env[key] = source[key];
  }
  return env;
}
var OPENCLAW_ENV_ALLOWLIST = [
  "PATH",
  "NODE_ENV",
  "TZ",
  "LANG",
  "LC_ALL",
  "OPENCLAW_AGENT_NAME",
  "OPENCLAW_CONFIG_PATH",
  "OPENCLAW_DISABLE_BONJOUR",
  "OPENCLAW_LIVE_DIR",
  "OPENCLAW_STATE_DIR",
  "OPENCLAW_WORKSPACE_DIR",
  "MLCLAW_HF_BROKER_URL",
  "MLCLAW_HF_BROKER_AGENT_SECRET_FILE",
  "TELEGRAM_ALLOWED_USERS",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_API_ROOT"
];
function allowedOpenClawEnvironment(source) {
  const env = {};
  for (const key of OPENCLAW_ENV_ALLOWLIST) {
    if (source[key] !== void 0) {
      env[key] = source[key];
    }
  }
  return env;
}
function nodeRequestToWebRequest(req, publicUrl, signal) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
    } else if (value !== void 0) {
      headers.set(key, value);
    }
  }
  const init = {
    method: req.method ?? "GET",
    headers,
    signal
  };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = Readable2.toWeb(req);
    init.duplex = "half";
  }
  return new Request(new URL(req.url ?? "/", publicUrl).toString(), init);
}
async function sendWebResponse(res, response) {
  const headers = {};
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      headers[key] = value;
    }
  });
  const setCookies = response.headers.getSetCookie?.() ?? (response.headers.get("set-cookie") ? [response.headers.get("set-cookie")] : []);
  if (setCookies.length > 0) {
    headers["set-cookie"] = setCookies;
  }
  res.writeHead(response.status, headers);
  if (!response.body) {
    res.end();
    return;
  }
  const reader = response.body.getReader();
  try {
    while (!res.destroyed) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (!res.write(Buffer.from(value))) {
        await waitForDrainOrClose(res);
      }
    }
  } finally {
    if (res.destroyed) {
      void reader.cancel().catch(() => void 0);
    }
  }
  if (!res.destroyed && !res.writableEnded) {
    res.end();
  }
}
async function waitForDrainOrClose(res) {
  await new Promise((resolve) => {
    const done = () => {
      res.off("drain", done);
      res.off("close", done);
      resolve();
    };
    res.once("drain", done);
    res.once("close", done);
  });
}
function isBrowserNavigation2(req) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return false;
  }
  return String(req.headers.accept ?? "").includes("text/html");
}
function isApiPath(pathname) {
  return pathname.startsWith("/mlclaw/api/");
}
function isTemplateRuntimePath(pathname) {
  return pathname === "/health" || pathname === "/healthz" || pathname === "/favicon.svg" || pathname === "/favicon-32.png" || pathname === "/favicon.ico" || pathname === "/apple-touch-icon.png" || pathname === "/manifest.webmanifest" || pathname === "/assets/hf-logo.svg" || pathname === "/assets/mlclaw.svg" || pathname === "/assets/assistant-avatar.svg" || pathname === "/assets/brand/logo";
}
function formatError2(err) {
  return err instanceof Error ? err.stack ?? err.message : String(err);
}

// src/mlclaw-space-runtime/cli.ts
if (process2.argv[2] === "prepare-unyolo-config") {
  const configPath = process2.env.OPENCLAW_CONFIG_PATH?.trim();
  if (!configPath?.startsWith("/")) throw new Error("OPENCLAW_CONFIG_PATH must be absolute");
  await prepareUnyoloConfig(configPath);
  process2.exit(0);
}
var config = loadConfig();
var server = new SpaceRuntimeServer(config);
var toolingSeeder;
if (config.sessionSecretGenerated && config.mode === "app") {
  process2.stderr.write("[mlclaw] MLCLAW_SESSION_SECRET is missing; generated an ephemeral session secret for this boot\n");
}
var httpServer = await server.start();
if (config.mode === "app") {
  toolingSeeder = spawn3(
    process2.execPath,
    [process2.env.MLCLAW_HF_TOOLING_SEED_SCRIPT ?? "/app/hf-tooling-seed.js", "--wait-for-bootstrap"],
    {
      stdio: "inherit",
      env: toolingSeedEnvironment(process2.env),
      ...process2.getuid?.() === 0 ? { uid: config.openclawUid, gid: config.openclawGid } : {}
    }
  );
  toolingSeeder.once("exit", (code, signal) => {
    if (code && code !== 0) {
      process2.stderr.write(`[hf-tooling] delayed seeder exited code=${code} signal=${signal ?? "null"}
`);
    }
    toolingSeeder = void 0;
  });
  toolingSeeder.once("error", (err) => {
    process2.stderr.write(`[hf-tooling] delayed seeder failed to start: ${err.message}
`);
    toolingSeeder = void 0;
  });
}
async function shutdown(signal) {
  process2.stdout.write(`[mlclaw] received ${signal}; shutting down
`);
  toolingSeeder?.kill(signal);
  httpServer.close();
  await server.stop();
  process2.exit(0);
}
process2.on("SIGTERM", () => void shutdown("SIGTERM"));
process2.on("SIGINT", () => void shutdown("SIGINT"));
function toolingSeedEnvironment(env) {
  return {
    HOME: "/home/node",
    PATH: env.PATH,
    NODE_ENV: env.NODE_ENV,
    OPENCLAW_LIVE_DIR: env.OPENCLAW_LIVE_DIR,
    OPENCLAW_WORKSPACE_DIR: env.OPENCLAW_WORKSPACE_DIR,
    MLCLAW_HF_TOOLING_DIR: env.MLCLAW_HF_TOOLING_DIR
  };
}
export {
  toolingSeedEnvironment
};
