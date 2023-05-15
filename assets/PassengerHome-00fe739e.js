import{s as w,t as O,q as R,l as u,m as A,o as P,n as x,b as a,a as n,p as N,V as S,F as M,O as Q,v as m,d as L,Y,B as Z,Z as J,D as K,_ as W,$ as X,a0 as ee,E as ae,c as te,x as c,a1 as le,R as ne,P as oe,z as se,A as re}from"./.pnpm-0253f632.js";import{_ as ue}from"./index-2f5f63c9.js";import{_ as ie}from"./index-5cee732f.js";const de=r=>{R({duration:0,forbidClick:!0,message:r})},pe=async r=>{de("正在加载拼车信息列表");try{const{data:o}=await ue.get("/api/carpooling/passenger/carpooling",{params:r});return o}catch{w({type:"danger",message:"加载拼车信息列表失败"})}finally{O()}return null};const me=r=>(se("data-v-e4ce4812"),r=r(),re(),r),ve={class:"carpooling-card-container"},ce=me(()=>N("span",null,"-->",-1)),_e={__name:"PassengerHome",setup(r){const o=u(""),i=u(""),l=u({pageNum:1,pageSize:10,query:"",departureTime:"",arriveTime:""}),B=new Date;let V=new Date;V.setDate(new Date().getDate()+2);const _=u(!1),f=u(!1),g=u([]),T=u(!1),k=u(!1);let d={query:"",departureTime:"",arriveTime:""};const y=async v=>{if(v||l.value.pageNum++,(d.query!==l.value.query||d.departureTime!==l.value.departureTime||d.arriveTime!==l.value.arriveTime)&&(l.value.pageNum=1,k.value=!1),T.value=!0,o.value!==""&&(l.value.departureTime=o.value,i.value!==""?l.value.departureTime=l.value.departureTime+" "+i.value:l.value.departureTime=l.value.departureTime+" 00:00"),o.value===""&&i.value!==""){w({type:"danger",message:"请选择出发日期"});return}const e=await pe(l.value);if(e===null&&w({type:"danger",message:"获取拼车列表失败: 服务器错误"}),e.code===2e3){const D=new Date().toISOString().slice(0,19).replace("T"," ");for(let p=0;p<e.data.length;p++)e.data[p].departureTime<D&&(e.data.splice(p,1),p--);d.query!==l.value.query||d.departureTime!==l.value.departureTime||d.arriveTime!==l.value.arriveTime?(g.value=[],g.value.push(...e.data),d={query:l.value.query,departureTime:l.value.departureTime,arriveTime:l.value.arriveTime}):g.value.push(...e.data),e.total!==l.value.pageSize&&(k.value=!0)}else w({type:"danger",message:`获取拼车列表失败：${e.msg}`});T.value=!1};A(async()=>{await y(!0)});const I=({selectedValues:v})=>{o.value=v.join("-"),_.value=!1},U=({selectedValues:v})=>{i.value=v.join(":"),f.value=!1},$=()=>{o.value="",_.value=!1},F=()=>{i.value="",f.value=!1};return(v,e)=>{const D=Z,p=J,h=K,z=W,q=X,H=ee,b=ae,j=M,s=le,C=ne,E=oe,G=Q;return P(),x(S,null,[a(j,{class:"searchForm"},{default:n(()=>[a(b,{inset:""},{default:n(()=>[a(p,{label:"搜索",modelValue:l.value.query,"onUpdate:modelValue":e[1]||(e[1]=t=>l.value.query=t),"show-action":"",placeholder:"请输入搜索关键词",onClear:e[2]||(e[2]=t=>y())},{action:n(()=>[a(D,{plain:"",block:"",type:"primary",size:"mini",onClick:e[0]||(e[0]=t=>y())},{default:n(()=>[m(" 搜索 ")]),_:1})]),_:1},8,["modelValue"]),a(h,{modelValue:o.value,"onUpdate:modelValue":e[3]||(e[3]=t=>o.value=t),"is-link":"",readonly:"",name:"departureDatePicker",label:"出发日期",placeholder:"点击选择出发日期(可空)",onClick:e[4]||(e[4]=t=>_.value=!0),clearable:""},null,8,["modelValue"]),a(q,{show:_.value,"onUpdate:show":e[5]||(e[5]=t=>_.value=t),position:"bottom"},{default:n(()=>[a(z,{"min-date":L(B),"max-date":L(V),onConfirm:I,onCancel:$},null,8,["min-date","max-date"])]),_:1},8,["show"]),a(h,{modelValue:i.value,"onUpdate:modelValue":e[6]||(e[6]=t=>i.value=t),"is-link":"",readonly:"",name:"departureTimePicker",label:"出发时间",placeholder:"点击选择出发时间(可空)",onClick:e[7]||(e[7]=t=>f.value=!0)},null,8,["modelValue"]),a(q,{show:f.value,"onUpdate:show":e[8]||(e[8]=t=>f.value=t),position:"bottom"},{default:n(()=>[a(H,{onConfirm:U,onCancel:F})]),_:1},8,["show"])]),_:1})]),_:1}),N("div",ve,[a(G,{loading:T.value,"onUpdate:loading":e[9]||(e[9]=t=>T.value=t),finished:k.value,"finished-text":"没有更多行程了",onLoad:y},{default:n(()=>[(P(!0),x(S,null,Y(g.value,t=>(P(),te(b,{inset:"",style:{"margin-top":"2%"},key:t},{default:n(()=>[a(E,{class:"carpoolingItem"},{default:n(()=>[a(C,null,{default:n(()=>[a(s,{span:"11"},{default:n(()=>[m(c(t.departurePoint),1)]),_:2},1024),a(s,{span:"2"},{default:n(()=>[ce]),_:1}),a(s,{span:"11"},{default:n(()=>[m(c(t.arrivePoint),1)]),_:2},1024)]),_:2},1024),a(C,null,{default:n(()=>[a(s,{span:"11"},{default:n(()=>[m(c(t.departureTime),1)]),_:2},1024),a(s,{span:"2"}),a(s,{span:"11"},{default:n(()=>[m(c(t.arriveTime),1)]),_:2},1024)]),_:2},1024),a(C,null,{default:n(()=>[a(s,{span:"11"},{default:n(()=>[m(" 价格: "+c(t.price),1)]),_:2},1024),a(s,{span:"2"}),a(s,{span:"11"},{default:n(()=>[m(" 余座: "+c(t.leftPassengerNo),1)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1},8,["loading","finished"])])],64)}}},ye=ie(_e,[["__scopeId","data-v-e4ce4812"]]);export{ye as default};
