import{l as L,m as k,o as V,s as N,a as c,n as p,d as t,e as B,b as a,V as u,N as b,O as S,Y as U,c as $,p as _,x as r,v as m,a7 as z,I as R,Z as D,R as E,a8 as G,P,E as T,z as A,A as F}from"./.pnpm-ebac48d5.js";import{b as M}from"./index-9b5987c8.js";import{_ as O}from"./index-234ba5b2.js";import"./index-d8a8587d.js";const Y=o=>(A("data-v-19a92746"),o=o(),F(),o),Z=Y(()=>_("br",null,null,-1)),j={__name:"ChatsList",setup(o){const f=L(),i=k([]);V(async()=>{const s=await M();s.code===2e3?i.value=s.result.list:N({type:"danger",message:`获取聊天列表失败,${s.msg}`})});const h=async s=>{window.location.href=`#/main/my/my-chats/detail?toUserId=${s.toUserVo.id}`};return(s,d)=>{const v=b,g=z,y=R,n=D,l=E,w=G,C=P,x=T,I=S;return c(),p(u,null,[t(v,{title:"我的聊天","left-text":"返回","left-arrow":"",onClickLeft:d[0]||(d[0]=e=>B(f).go(-1))}),t(I,{finished:!0,"finished-text":"没有更多聊天了"},{default:a(()=>[(c(!0),p(u,null,U(i.value,e=>(c(),$(x,{inset:"",style:{"margin-top":"2%"},key:e},{default:a(()=>[t(C,{class:"chatPreview"},{default:a(()=>[t(l,{onClick:q=>h(e)},{default:a(()=>[t(n,{span:"8"},{default:a(()=>[t(y,{class:"avatar-container",round:"",width:"4.5rem",height:"4.5rem",src:e.toUserVo.avatar,fit:"cover"},{loading:a(()=>[t(g,{type:"spinner",size:"20"})]),_:2},1032,["src"])]),_:2},1024),t(n,{span:"14"},{default:a(()=>[t(l,{style:{height:"2rem"}},{default:a(()=>[t(n,{span:"24",style:{"font-size":"1.5rem"}},{default:a(()=>[_("strong",null,r(e.toUserVo.username),1)]),_:2},1024)]),_:2},1024),t(l,null,{default:a(()=>[t(n,{span:"24"},{default:a(()=>[_("div",null,[m(r(e.chats[e.chats.length-1].message)+" ",1),Z,m(" "+r(e.chats[e.chats.length-1].sendTime),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024),t(n,{span:"2"},{default:a(()=>[t(w,{name:"arrow"})]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})],64)}}},W=O(j,[["__scopeId","data-v-19a92746"]]);export{W as default};