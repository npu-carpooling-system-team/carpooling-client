import{l as L,m as k,o as B,s as N,a as l,p as u,d as t,e as V,b as a,Y as m,N as b,P as S,Z as U,c as $,q as r,y as _,x as f,aa as G,I as R,_ as z,R as D,ab as P,Q as T,G as q,A,B as E}from"./.pnpm-2d117cc4.js";import{b as F}from"./index-d41de336.js";import{_ as M}from"./index-a9245716.js";import"./index-00b9cb53.js";const Q=o=>(A("data-v-dd29c753"),o=o(),E(),o),Y=Q(()=>r("br",null,null,-1)),Z={__name:"ChatsList",setup(o){const d=L(),i=k([]);B(async()=>{const s=await F();s.code===2e3?i.value=s.result.list:N({type:"danger",message:`获取聊天列表失败,${s.msg}`})});const h=async s=>{await d.push(`/main/my/my-chats/detail?toUserId=${s.toUserVo.id}`)};return(s,p)=>{const v=b,g=G,y=R,n=z,c=D,w=P,C=T,x=q,I=S;return l(),u(m,null,[t(v,{title:"我的聊天","left-text":"返回","left-arrow":"",onClickLeft:p[0]||(p[0]=e=>V(d).go(-1))}),t(I,{finished:!0,"finished-text":"没有更多聊天了"},{default:a(()=>[(l(!0),u(m,null,U(i.value,e=>(l(),$(x,{inset:"",style:{"margin-top":"2%"},key:e},{default:a(()=>[t(C,{class:"chatPreview"},{default:a(()=>[t(c,{onClick:j=>h(e)},{default:a(()=>[t(n,{span:"8"},{default:a(()=>[t(y,{class:"avatar-container",round:"",width:"4.5rem",height:"4.5rem",src:e.toUserVo.avatar,fit:"cover"},{loading:a(()=>[t(g,{type:"spinner",size:"20"})]),_:2},1032,["src"])]),_:2},1024),t(n,{span:"14"},{default:a(()=>[t(c,{style:{height:"2rem"}},{default:a(()=>[t(n,{span:"24",style:{"font-size":"1.5rem"}},{default:a(()=>[r("strong",null,_(e.toUserVo.username),1)]),_:2},1024)]),_:2},1024),t(c,null,{default:a(()=>[t(n,{span:"24"},{default:a(()=>[r("div",null,[f(_(e.chats[e.chats.length-1].message)+" ",1),Y,f(" "+_(e.chats[e.chats.length-1].sendTime),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024),t(n,{span:"2"},{default:a(()=>[t(w,{name:"arrow"})]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})],64)}}},W=M(Z,[["__scopeId","data-v-dd29c753"]]);export{W as default};