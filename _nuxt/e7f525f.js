(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{605:function(e,t,n){"use strict";n.r(t);var r=n(602),o=n(135),l=n(480),c=n(595),m=n(64),d=n(487),f=(n(38),n(14)),h=(n(67),{data:function(){return{members:null,pages:0,loading:!1,headers:[{text:"Name ",value:"name"},{text:"MSISDN ",value:"msisdn"},{text:"Role",value:"role"},{text:"Status ",value:"status"},{text:"Deposits ",value:"deposits"},{text:"Dividends ",value:"dividend"},{text:"Penalty",value:"penalty"},{text:"Withdraws",value:"withdraws"},{text:"Dividends ",value:"dividend"},{text:"Social Fund",value:"socialfund"},{text:"S.F Withdraws",value:"socialfundWithdraws"},{text:"Created Date",value:"created"}]}},head:function(){return{title:"Members"}},created:function(){this.paginate({page:0,itemsPerPage:15})},methods:{rowclick:function(e){this.show=!0,this.$router.push("/members/".concat(e.msisdn))},filterfromdatabase:function(e){var t=this;return Object(f.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.$api.$get("/members/search",{params:{page:0,size:5,sort:"name asc",search:e}}).then((function(e){t.loading=!1,t.page=e.currentPage,t.members=e.results})).catch((function(e){}));case 3:case"end":return n.stop()}}),n)})))()},paginate:function(e){var t=this;return Object(f.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$api.$get("/members",{params:{page:e.page,size:e.itemsPerPage,sort:"name desc"}}).then((function(e){t.pages=e.totalRows,t.page=e.currentPage,t.members=e.results})).catch((function(e){}));case 2:case"end":return n.stop()}}),n)})))()}}}),v=n(59),component=Object(v.a)(h,(function(){var e=this,t=e._self._c;return e.members?t(r.a,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.members,"item-key":"createdDate",loading:e.loading,"loading-text":"Loading... Please wait","footer-props":e.footerprops,"server-items-length":e.pages},on:{"click:row":e.rowclick,pagination:e.paginate},scopedSlots:e._u([{key:"top",fn:function(){return[t(m.a,{attrs:{flat:""}},[t(d.a,{staticClass:"font-weight-medium"},[e._v("\n        Group Members\n      ")]),e._v(" "),t(l.a),e._v(" "),t(c.a,{staticClass:"search mr-2",attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search member by name, MSISDN","single-line":"","hide-details":"",outlined:"",filled:"",height:"40",dense:"",clearable:"",autocomplete:"off"},on:{input:e.filterfromdatabase}})],1)]},proxy:!0},{key:"item.created",fn:function(n){var r=n.item;return[t("span",[e._v(e._s(e._f("dateformat")(r.createdDate)))])]}},{key:"item.name",fn:function(n){var r=n.item;return[t("span",[e._v(e._s(r.name.split(" ")[0]+" "+r.familyName.split(" ")[0]))])]}},{key:"item.status",fn:function(n){return["ACTIVE"==n.item.status?t(o.a,{attrs:{small:""}},[e._v("\n      mdi-checkbox-marked-circle\n    ")]):t(o.a,{attrs:{small:""}},[e._v("\n      mdi-close-circle\n    ")])]}}],null,!1,1872739817)}):t("skeleton-table-loader")}),[],!1,null,null,null);t.default=component.exports}}]);