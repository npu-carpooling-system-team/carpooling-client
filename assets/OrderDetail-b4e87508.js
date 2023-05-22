import{m as R,l as g,o as A,a as o,n as u,d as l,e as V,b as i,p as I,y as r,c as D,V as N,s as c,N as S,B as O,E as C,v,D as T}from"./.pnpm-33e9fd8e.js";import{a as L}from"./index-298f05d4.js";import{_ as k}from"./index-106ae9d8.js";import"./index-85061a81.js";const w={class:"btn-area"},B={key:0},b={key:1,style:{"flex-direction":"row"}},M={key:2},x={key:4},F={key:6},G={key:7},Q={__name:"OrderDetail",setup($){const m=R(""),E=g(),e=R({}),s=new Map;s.set("ORDER_FORCE_CLOSED","订单强制结束"),s.set("PRE_ORDER_REQUEST_SUBMITTED","订单已提交"),s.set("PRE_ORDER_REQUEST_PASSED","订单已通过"),s.set("PRE_DEPARTURE_USER_CANCELLED","订单已被用户取消"),s.set("DRIVING_USER_CONFIRM_DEPARTURE","用户确认发车"),s.set("ARRIVED_USER_UNPAID","用户未支付"),s.set("PAID_WAITING_CALLBACK","已支付，等待回调"),s.set("ORDER_NORMAL_CLOSED","订单正常结束");const P=async()=>{const n=await L(m.value);n!==null&&n.code===2e3?e.value=n.result.result:n!==null?c({type:"danger",message:`加载订单具体信息失败,${n.msg}`}):c({type:"danger",message:"加载订单具体信息失败,请检查网络连接"})},p=R("");A(async()=>{m.value=E.currentRoute.value.query.orderId,await P(),p.value=JSON.parse(e.value.passingPoint).join(" "),console.log(e.value.status)});const y=async()=>{const n=[];console.log(e.value),e.value.passingPoint!==""&&n.push(JSON.parse(e.value.passingPoint)),window.location.href="#/main/driver/preview-map?departurePoint="+e.value.departurePoint+"&arrivePoint="+e.value.arrivePoint+"&passingPoint="+e.value.passingPoint+"&fromUrl=/main/carpooling/passenger-order"};return(n,a)=>{const U=S,_=T,d=O,f=C;return o(),u(N,null,[l(U,{title:"订单详情","left-text":"返回","left-arrow":"",onClickLeft:a[0]||(a[0]=t=>V(E).go(-1))}),l(f,{inset:""},{default:i(()=>[l(_,{readonly:"",modelValue:e.value.departurePoint,"onUpdate:modelValue":a[1]||(a[1]=t=>e.value.departurePoint=t),name:"出发地",label:"出发地"},null,8,["modelValue"]),l(_,{readonly:"",modelValue:e.value.arrivePoint,"onUpdate:modelValue":a[2]||(a[2]=t=>e.value.arrivePoint=t),name:"到达地",label:"到达地"},null,8,["modelValue"]),l(_,{readonly:"",modelValue:p.value,"onUpdate:modelValue":a[3]||(a[3]=t=>p.value=t),name:"途径地",label:"途径地"},null,8,["modelValue"]),l(d,{plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"2% auto"},onClick:a[4]||(a[4]=t=>y())},{default:i(()=>[v(" 预览行程路线 ")]),_:1}),l(_,{modelValue:e.value.departureTime,"onUpdate:modelValue":a[5]||(a[5]=t=>e.value.departureTime=t),name:"出发时间",label:"出发时间"},null,8,["modelValue"]),l(_,{modelValue:e.value.arriveTime,"onUpdate:modelValue":a[6]||(a[6]=t=>e.value.arriveTime=t),name:"到达时间",label:"到达时间"},null,8,["modelValue"])]),_:1}),I("div",w,[e.value.status==="PRE_ORDER_REQUEST_SUBMITTED"?(o(),u("div",B,"正在等待司机确认")):r("",!0),e.value.status==="PRE_ORDER_REQUEST_PASSED"?(o(),u("div",b,[l(d,{plain:""},{default:i(()=>[v(" 确认发车 ")]),_:1}),l(d,{plain:"",type:"danger"},{default:i(()=>[v(" 取消行程 ")]),_:1})])):r("",!0),e.value.status==="PRE_DEPARTURE_USER_CANCELLED"?(o(),u("div",M,"订单已被用户取消")):r("",!0),e.value.status==="DRIVING_USER_CONFIRM_DEPARTURE"?(o(),D(d,{key:3,plain:""},{default:i(()=>[v(" 确认到达 ")]),_:1})):r("",!0),e.value.status==="ARRIVED_USER_UNPAID"?(o(),u("div",x,"请您支付订单")):r("",!0),e.value.status==="ARRIVED_USER_UNPAID"?(o(),D(d,{key:5,plain:""},{default:i(()=>[v(" 开始支付 ")]),_:1})):r("",!0),e.value.status==="PAID_WAITING_CALLBACK"?(o(),u("div",F,"已支付，等待回调")):r("",!0),e.value.status==="ORDER_NORMAL_CLOSED"?(o(),u("div",G,"订单正常结束")):r("",!0)])],64)}}},q=k(Q,[["__scopeId","data-v-ec855059"]]);export{q as default};
