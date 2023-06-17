import{H as O,m as n,J as _,l as z,o as E,K as G,a as M,p as R,d as o,b as i,s as u,F as K,x as b,e as D,q as V,A as Q,B as W,E as X,D as Y,a2 as Z,a3 as ee,a4 as ae,G as le}from"./.pnpm-2d117cc4.js";import{u as oe}from"./index-555cb1a4.js";import{e as re}from"./index-9246da9d.js";import{_ as te}from"./index-2c57a5fa.js";import"./index-829bfcad.js";const ne=O("carpoolingCache",()=>({carpoolingCache:n({departureTime:"",arriveTime:"",departurePoint:"",arrivePoint:"",passingPoint:"",description:"",totalPassengerNo:"",leftPassengerNo:"",price:""})}),{persist:{storage:sessionStorage,paths:["carpoolingCache"],key:"carpoolingCache"}});const j=f=>(Q("data-v-7473f240"),f=f(),W(),f),se={class:"driver-home-container"},ie=j(()=>V("h2",null,"添加您的行程",-1)),ue=j(()=>V("p",null,"您确认添加行程则代表您认可我们的",-1)),pe={class:"submit-carpooling-btn"},de={__name:"DriverHome",setup(f){const T=ne(),{carpoolingCache:p}=_(T),N=z(),l=n({departureTime:"",arriveTime:"",departurePoint:"",arrivePoint:"",passingPoint:"",description:"",totalPassengerNo:"",leftPassengerNo:"",price:""}),s=n(""),U=new Date,x=async()=>{if(l.value.departurePoint===""||l.value.arrivePoint===""){u({type:"danger",message:"请输入出发与到达地点"});return}const r=[];s.value!==""&&r.push(s.value.split(" ")),await N.push("/main/driver/preview-map?departurePoint="+l.value.departurePoint+"&arrivePoint="+l.value.arrivePoint+"&passingPoint="+r)},P=n(!1),c=n(!1),y=n(!1),C=n(!1),v=n(""),m=n(""),d=n(""),g=n(""),A=({selectedValues:r})=>{v.value=r.join("-"),d.value=r.join("-"),P.value=!1},B=({selectedValues:r})=>{m.value=r.join(":"),y.value=!1},I=({selectedValues:r})=>{d.value=r.join("-"),c.value=!1},F=({selectedValues:r})=>{g.value=r.join(":"),C.value=!1},H=()=>{const r=oe(),{currentUser:e}=_(r);if(e.value.user.alipayId===""||e.value.user.alipayId===null)return u({type:"danger",message:"请先绑定支付宝"}),!1;if(l.value.departureTime>=l.value.arriveTime)return u({type:"danger",message:"到达时间应在出发时间之后"}),!1;let t=new Date().toLocaleString("zh",{hour12:!1});return t=t.replace(/\//g,"-"),t.split("-")[1].length===1&&(t=t.replace(/-/,"-0")),l.value.departureTime<=t?(u({type:"danger",message:"出发时间应当在当前时间之后"}),!1):(e.value.driver.driversLicenseType==="C1"||e.value.driver.driversLicenseType==="C2")&&l.value.totalPassengerNo>5?(u({type:"danger",message:"您的驾照类型不支持超过5人的拼车"}),!1):l.value.totalPassengerNo<l.value.leftPassengerNo?(u({type:"danger",message:"总乘客人数应大于等于剩余乘客人数"}),!1):!0},S=()=>{l.value={departureTime:"",arriveTime:"",departurePoint:"",arrivePoint:"",passingPoint:"",description:"",totalPassengerNo:"",leftPassengerNo:"",price:""},s.value="",v.value="",m.value="",d.value="",g.value="",T.$patch(r=>{r.carpoolingCache=l.value})},J=async()=>{if(l.value.passingPoint=JSON.stringify(s.value.split(" ")),l.value.departureTime=v.value+" "+m.value,l.value.arriveTime=d.value+" "+g.value,!H())return;const r=await re(l.value);r.code===2e3?(u({type:"success",message:"发布成功,请到详情页查看"}),S()):r.msg!==null?u({type:"danger",message:`发布失败,${r.msg}`}):u({type:"danger",message:"发布失败"})};return E(()=>{p.value.departurePoint!==""&&(l.value=p.value,s.value=p.value.passingPoint===""?"":JSON.parse(p.value.passingPoint).join(" "),v.value=p.value.departureTime.split(" ")[0],m.value=p.value.departureTime.split(" ")[1],d.value=p.value.arriveTime.split(" ")[0],g.value=p.value.arriveTime.split(" ")[1])}),G(()=>{l.value.passingPoint=s.value===""?"":JSON.stringify(s.value.split(" ")),T.$patch(r=>{r.carpoolingCache=l.value})}),(r,e)=>{const t=X,w=Y,$=Z,k=ee,q=ae,h=le,L=K;return M(),R("div",se,[ie,o(L,{onSubmit:e[26]||(e[26]=a=>J())},{default:i(()=>[o(h,{inset:""},{default:i(()=>[o(t,{modelValue:l.value.departurePoint,"onUpdate:modelValue":e[0]||(e[0]=a=>l.value.departurePoint=a),name:"出发地",label:"出发地",placeholder:"请输入出发地点",rules:[{required:!0,message:"请输入出发地点"}]},null,8,["modelValue"]),o(t,{modelValue:l.value.arrivePoint,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.arrivePoint=a),name:"到达地",label:"到达地",placeholder:"请输入到达地点",rules:[{required:!0,message:"请输入到达地点"}]},null,8,["modelValue"]),o(t,{modelValue:s.value,"onUpdate:modelValue":e[2]||(e[2]=a=>s.value=a),name:"途径地",label:"途径地",placeholder:"多个途径地点之间请用空格隔开"},null,8,["modelValue"]),o(w,{plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"2% auto"},onClick:e[3]||(e[3]=a=>x())},{default:i(()=>[b(" 预览行程路线 ")]),_:1}),o(t,{modelValue:v.value,"onUpdate:modelValue":e[4]||(e[4]=a=>v.value=a),"is-link":"",readonly:"",name:"departureDatePicker",label:"出发日期",placeholder:"点击选择出发日期",onClick:e[5]||(e[5]=a=>P.value=!0),rules:[{required:!0,message:"请选择出发日期"}]},null,8,["modelValue"]),o(k,{show:P.value,"onUpdate:show":e[7]||(e[7]=a=>P.value=a),position:"bottom"},{default:i(()=>[o($,{"min-date":D(U),onConfirm:A,onCancel:e[6]||(e[6]=a=>P.value=!1)},null,8,["min-date"])]),_:1},8,["show"]),o(t,{modelValue:m.value,"onUpdate:modelValue":e[8]||(e[8]=a=>m.value=a),"is-link":"",readonly:"",name:"departureTimePicker",label:"出发时间",placeholder:"点击选择出发时间",onClick:e[9]||(e[9]=a=>y.value=!0),rules:[{required:!0,message:"请输入出发时间"}]},null,8,["modelValue"]),o(k,{show:y.value,"onUpdate:show":e[11]||(e[11]=a=>y.value=a),position:"bottom"},{default:i(()=>[o(q,{onCancel:e[10]||(e[10]=a=>y.value=!1),onConfirm:B})]),_:1},8,["show"]),o(t,{modelValue:d.value,"onUpdate:modelValue":e[12]||(e[12]=a=>d.value=a),"is-link":"",readonly:"",name:"arriveDatePicker",label:"到达日期",placeholder:"选择到达日期(默认当日到达)",onClick:e[13]||(e[13]=a=>c.value=!0),rules:[{required:!0,message:"请选择到达日期"}]},null,8,["modelValue"]),o(k,{show:c.value,"onUpdate:show":e[15]||(e[15]=a=>c.value=a),position:"bottom"},{default:i(()=>[o($,{"min-date":D(U),onConfirm:I,onCancel:e[14]||(e[14]=a=>c.value=!1)},null,8,["min-date"])]),_:1},8,["show"]),o(t,{modelValue:g.value,"onUpdate:modelValue":e[16]||(e[16]=a=>g.value=a),"is-link":"",readonly:"",name:"arriveTimePicker",label:"到达时间",placeholder:"选择到达时间",onClick:e[17]||(e[17]=a=>C.value=!0),rules:[{required:!0,message:"请选择到达时间"}]},null,8,["modelValue"]),o(k,{show:C.value,"onUpdate:show":e[19]||(e[19]=a=>C.value=a),position:"bottom"},{default:i(()=>[o(q,{onCancel:e[18]||(e[18]=a=>C.value=!1),onConfirm:F})]),_:1},8,["show"]),o(t,{modelValue:l.value.description,"onUpdate:modelValue":e[20]||(e[20]=a=>l.value.description=a),name:"行程描述",label:"行程描述",placeholder:"请输入行程描述",rules:[{required:!0,message:"请输入行程描述"}]},null,8,["modelValue"]),o(t,{modelValue:l.value.totalPassengerNo,"onUpdate:modelValue":e[21]||(e[21]=a=>l.value.totalPassengerNo=a),name:"总座位数",label:"总座位数",placeholder:"请输入总座位数",type:"digit",rules:[{required:!0,message:"请输入总座位数"}]},null,8,["modelValue"]),o(t,{modelValue:l.value.leftPassengerNo,"onUpdate:modelValue":e[22]||(e[22]=a=>l.value.leftPassengerNo=a),name:"剩余座位数",label:"剩余座位数",placeholder:"一般与总座位数一致",type:"digit",rules:[{required:!0,message:"请输入剩余座位数"}]},null,8,["modelValue"]),o(t,{modelValue:l.value.price,"onUpdate:modelValue":e[23]||(e[23]=a=>l.value.price=a),name:"价格",label:"价格",placeholder:"您期望收取乘客的价格",type:"digit",rules:[{required:!0,message:"请输入价格"}]},null,8,["modelValue"]),V("div",null,[ue,V("p",{style:{color:"#5CA0FF"},onClick:e[24]||(e[24]=a=>D(N).push("/main/driver/fee-policy"))}," 服务费率政策 ")]),V("div",pe,[o(w,{plain:"",block:"",type:"primary","native-type":"submit"},{default:i(()=>[b(" 添加行程 ")]),_:1}),o(w,{plain:"",block:"",type:"success",onClick:e[25]||(e[25]=a=>S())},{default:i(()=>[b(" 清空数据 ")]),_:1})])]),_:1})]),_:1})])}}},ce=te(de,[["__scopeId","data-v-7473f240"]]);export{ce as default};