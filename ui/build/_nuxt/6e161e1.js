(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{265:function(e,l,t){"use strict";t.r(l);var n=t(53),o=t(54),c={props:{showLabel:{type:Boolean,default:!1}},data:function(){return{language:""}},computed:Object(n.c)({locale:"lang/locale",locales:"lang/locales"}),created:function(){this.language=this.teste},methods:{setLocale:function(e){this.$i18n.teste!==e&&(Object(o.b)(e),this.$store.dispatch("lang/setLocale",{locale:e}))}}},r=t(28),component=Object(r.a)(c,(function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",{staticClass:"flex items-center w-full justify-between",class:{"mt-10 space-x-4":e.showLabel}},[t("label",{directives:[{name:"show",rawName:"v-show",value:e.showLabel,expression:"showLabel"}],staticClass:"block text-sm text-gray-900",class:{"ml-2":e.showLabel},attrs:{for:"locale"}},[e._v("\n    "+e._s(e.$t("language"))+"\n  ")]),e._v(" "),t("select",{directives:[{name:"model",rawName:"v-model",value:e.language,expression:"language"}],staticClass:"mt-1 block w-full pl-3 pr-5 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",class:{"mr-10":e.showLabel},attrs:{id:"locale",name:"locale"},on:{change:[function(l){var t=Array.prototype.filter.call(l.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.language=l.target.multiple?t:t[0]},function(l){return l.preventDefault(),e.setLocale(e.language)}]}},[t("option",{attrs:{disabled:""}},[e._v(e._s(e.$t("select_a_language")))]),e._v(" "),e._l(e.testes,(function(l,n){return t("option",{key:n,domProps:{value:n}},[e._v("\n      "+e._s(l)+"\n    ")])}))],2)])}),[],!1,null,null,null);l.default=component.exports}}]);
