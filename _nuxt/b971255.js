(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{552:function(e,t,r){"use strict";r.r(t);var n=r(201),o=r(546),l=r(602),c=r(135),d=r(480),f=r(64),m=r(487),v={props:{groups:{type:Array,default:null},member:{type:Object,default:null}},data:function(){return{pages:0,headers:[{text:"Name",value:"name"},{text:"Group Type ",value:"groupType"},{text:"Location",value:"location"},{text:"Members",value:"members"},{text:"Status ",value:"status"},{text:"Created Date",value:"created"}],show:!1,editedItem:{}}}},_=r(59),component=Object(_.a)(v,(function(){var e=this,t=e._self._c;return e.groups?t(l.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.groups,"item-key":"name"},scopedSlots:e._u([{key:"top",fn:function(){return[t(f.a,{attrs:{color:"",flat:""}},[t(m.a,{staticClass:"font-weight-medium"},[e._v("\n        Groups\n      ")]),e._v(" "),t(d.a)],1)]},proxy:!0},{key:"item.created",fn:function(r){var n=r.item;return[t("span",[e._v(e._s(e._f("dateformat")(n.createdDate)))])]}},{key:"item.status",fn:function(r){var l=r.item;return[t(o.a,{attrs:{color:"ACTIVE"==l.status?"success":""}},["ACTIVE"==l.status?t(n.a,{attrs:{left:""}},[t(c.a,[e._v("mdi-checkbox-marked-circle")])],1):e._e(),e._v("\n      "+e._s(l.status.toLowerCase())+"\n    ")],1)]}},{key:"no-data",fn:function(){return[t("span",[e._v("No group found ...")])]},proxy:!0}],null,!1,4005661522)}):t("skeleton-table-loader")}),[],!1,null,null,null);t.default=component.exports}}]);