import{l as _,H as d,o as g,q as f,t as w,r as v,a as o,n as h,d as n,b as k,V as y,W as b,e as t,c as i,y as c,X as C}from"./.pnpm-ebac48d5.js";import{u as T}from"./index-295a5901.js";const M={__name:"CarpoolingMain",setup(x){const a=_(),l=T(),{currentUser:e}=d(l),u=async({title:r})=>{r==="乘客-订单"?await a.push("/main/carpooling/passenger-order"):await a.push("/main/carpooling/driver-carpooling")};return g(async()=>{f({message:"加载行程中...",forbidClick:!0,duration:0});try{e.value.user.isPassenger?window.location.href="#/main/carpooling/passenger-order":window.location.href="#/main/carpooling/driver-carpooling"}finally{w()}}),(r,B)=>{const s=C,p=b,m=v("router-view");return o(),h(y,null,[n(p,{onClickTab:u,sticky:""},{default:k(()=>[t(e).user.isPassenger?(o(),i(s,{key:0,title:"乘客-订单",name:"order"})):c("",!0),t(e).user.isDriver?(o(),i(s,{key:1,title:"司机-行程",name:"carpooling"})):c("",!0)]),_:1}),n(m)],64)}}};export{M as default};