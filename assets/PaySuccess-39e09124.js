import{l as o,o as t,s as a,a as c,n as r,z as n,A as _,p as d}from"./.pnpm-ef8d297c.js";import{i as u}from"./index-1718fef5.js";import{_ as p}from"./index-f8813b5b.js";import"./index-95c6f037.js";const i=e=>(n("data-v-c77e4ebd"),e=e(),_(),e),l={class:"welcome-banner"},m=i(()=>d("h1",null,"正在处理支付信息",-1)),y=[m],h={__name:"PaySuccess",setup(e){const s=o().currentRoute.value.query.out_trade_no;return t(async()=>{a({type:"success",message:"收到支付,正在更新订单状态"});try{await u(s)}finally{window.location.href="#/main/carpooling/passenger-order"}}),(S,v)=>(c(),r("div",l,y))}},g=p(h,[["__scopeId","data-v-c77e4ebd"]]);export{g as default};
