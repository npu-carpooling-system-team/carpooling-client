import{k as S,l as d,H as $,m as z,o as m,n as b,b as e,d as _,a,p as r,c as w,y as F,V as C,s as U,N as G,E as M,O as q,Y as H,B as O,D as P,x as p,a7 as Y,I as j,a1 as A,R as J,P as K}from"./.pnpm-0253f632.js";import{b as Q,c as W}from"./index-ce78151c.js";import{u as X}from"./index-35b7bc46.js";import{_ as Z}from"./index-5cee732f.js";import"./index-2f5f63c9.js";const ee={class:"message-div"},te={class:"input-container"},ae={__name:"ChatDetail",setup(oe){const v=S();let u;const s=d({}),f=d("加载中..."),V=X(),{currentUser:I}=$(V),i=d(""),g=async()=>{const l=await Q();l.code===2e3?(s.value=l.result.list.find(t=>t.toUserVo.id===u),f.value=s.value.toUserVo.username):U({type:"danger",message:`获取聊天详情失败,${l.msg}`})},T=async()=>{const l={toUserId:u,message:i.value},t=await W(l);t.code===2e3?(i.value="",await g()):U({type:"danger",message:`发送失败,${t.msg}`})};let c;z(async()=>{c=0,u=v.currentRoute.value.query.toUserId,await g()});const n=d(!0);return window.onscroll=function(){document.documentElement.scrollTop<5&&(n.value=!0),document.documentElement.scrollTop-c>10&&n.value?(n.value=!1,c=document.documentElement.scrollTop):c-document.documentElement.scrollTop>10&&!n.value&&(n.value=!0,c=document.documentElement.scrollTop)},(l,t)=>{const k=G,x=Y,B=j,h=A,D=J,E=K,y=M,N=q,R=O,L=P;return m(),b(C,null,[e(k,{title:f.value,"left-text":"返回","left-arrow":"",onClickLeft:t[0]||(t[0]=o=>_(v).go(-1))},null,8,["title"]),e(N,{finished:!0,"finished-text":"没有更多聊天了"},{default:a(()=>[(m(!0),b(C,null,H(s.value.chats,o=>(m(),w(y,{style:{"margin-top":"2%"},key:o,inset:""},{default:a(()=>[e(E,{class:"chatItem"},{default:a(()=>[e(D,null,{default:a(()=>[e(h,{span:"8",class:"avatar-col"},{default:a(()=>[e(B,{round:"",width:"3rem",height:"3rem",src:o.fromUserId===_(u)?s.value.toUserVo.avatar:_(I).user.userImage},{loading:a(()=>[e(x,{type:"spinner",size:"20"})]),_:2},1032,["src"]),r("div",null,[r("strong",null,p(o.fromUserId===s.value.toUserVo.id?s.value.toUserVo.username:"您"),1)])]),_:2},1024),e(h,{span:"16",class:"chat-col"},{default:a(()=>[r("div",null,[r("div",ee,p(o.message),1),r("div",null,p(o.sendTime),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),r("div",te,[n.value?(m(),w(y,{key:0,class:"chat-input",inset:""},{default:a(()=>[e(L,{center:"",label:"您的留言","label-align":"center",rows:"1",modelValue:i.value,"onUpdate:modelValue":t[1]||(t[1]=o=>i.value=o)},{button:a(()=>[e(R,{size:"small",type:"primary",icon:"guide-o",onClick:T})]),_:1},8,["modelValue"])]),_:1})):F("",!0)])],64)}}},ue=Z(ae,[["__scopeId","data-v-7b8eb05b"]]);export{ue as default};
