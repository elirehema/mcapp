(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{678:function(e,t,r){"use strict";r.r(t);var n=r(651),o=r(68),c=r(500),l=(r(12),r(9),r(17),r(18),r(11),r(5),r(13),r(2)),f=r(117);function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var m={data:function(){return{headers:[{text:"Permission Name",value:"name"},{text:"Entity",value:"entity"},{text:"Actions",value:"action",sortable:!1}]}},created:function(){this.$store.dispatch("_fetchpermissions")},methods:{},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(l.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(f.c)({permissions:"permissions"}))},d=m,h=r(62),component=Object(h.a)(d,(function(){var e=this,t=e._self._c;return e.permissions&&e.$rules.hasPermission("permission.read")?t(n.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.permissions,"sort-by":"calories",dense:"","items-per-page":"15"},scopedSlots:e._u([{key:"top",fn:function(){return[t(o.a,{attrs:{color:"primary",flat:""}},[t(c.a,{staticClass:"text-h5 font-weight-bold white--text"},[e._v("Pemissions")])],1)]},proxy:!0}],null,!1,1650587167)}):t("skeleton-table-loader")}),[],!1,null,null,null);t.default=component.exports}}]);