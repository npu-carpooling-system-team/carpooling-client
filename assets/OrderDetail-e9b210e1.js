import{m as u,l as m,o as p,a as c,n as v,d as o,e as D,b as f,V as O,s as d,N as g,E as I,D as P}from"./.pnpm-ebac48d5.js";import{a as y}from"./index-e213e929.js";import{_ as N}from"./index-a752f00d.js";import"./index-d8a8587d.js";const S={__name:"OrderDetail",setup(U){const s=u(""),_=m(),e=u({}),t=new Map;t.set("ORDER_FORCE_CLOSED","订单强制结束"),t.set("PRE_ORDER_REQUEST_SUBMITTED","订单已提交"),t.set("PRE_ORDER_REQUEST_PASSED","订单已通过"),t.set("PRE_DEPARTURE_USER_CANCELLED","订单已被用户取消"),t.set("DRIVING_USER_CONFIRM_DEPARTURE","用户确认发车"),t.set("DRIVING_USER_CONFIRM_ARRIVED","用户确认到达"),t.set("ARRIVED_USER_UNPAID","用户未支付"),t.set("ORDER_NORMAL_CLOSED","订单正常结束");const i=async()=>{const a=await y(s.value);a!==null&&a.code===2e3?(e.value=a.result.result,console.log(e.value)):a!==null?d({type:"danger",message:`加载订单具体信息失败,${a.msg}`}):d({type:"danger",message:"加载订单具体信息失败,请检查网络连接"})};return p(async()=>{s.value=_.currentRoute.value.query.orderId,await i()}),(a,l)=>{const R=g,r=P,E=I;return c(),v(O,null,[o(R,{title:"订单"+s.value+"详情","left-text":"返回","left-arrow":"",onClickLeft:l[0]||(l[0]=n=>D(_).go(-1))},null,8,["title"]),o(E,{inset:""},{default:f(()=>[o(r,{readonly:"",modelValue:e.value.departurePoint,"onUpdate:modelValue":l[1]||(l[1]=n=>e.value.departurePoint=n),name:"出发地",label:"出发地"},null,8,["modelValue"]),o(r,{readonly:"",modelValue:e.value.arrivePoint,"onUpdate:modelValue":l[2]||(l[2]=n=>e.value.arrivePoint=n),name:"到达地",label:"到达地"},null,8,["modelValue"]),o(r,{readonly:"","v-model":e.value.passingPoint?JSON.parse(e.value.passingPoint).join(" "):"无",name:"到达地",label:"到达地"},null,8,["v-model"])]),_:1})],64)}}},w=N(S,[["__scopeId","data-v-55c9e03c"]]);export{w as default};
