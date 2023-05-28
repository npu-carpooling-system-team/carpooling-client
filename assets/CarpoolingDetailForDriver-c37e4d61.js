import{m as r,l as q,o as F,a as L,n as B,d as o,e as N,b as i,X as M,s as u,N as G,F as j,v as w,p as J,H as z,D as Q,B as x,a2 as H,a3 as X,a4 as K,E as W}from"./.pnpm-835927bf.js";import{a as Y,u as Z,d as h}from"./index-4c37d959.js";import{u as ee}from"./index-afc3e635.js";import{_ as ae}from"./index-bfb35c41.js";import"./index-7bf2edfc.js";const le={class:"submit-carpooling-btn"},oe={__name:"CarpoolingDetailForDriver",setup(te){const E=r(""),b=q(),n=r({}),l=r({id:"",departurePoint:"",arrivePoint:"",passingPoint:"",departureTime:"",arriveTime:"",description:"",totalPassengerNo:"",leftPassengerNo:"",price:""}),d=new Map;d.set("ORDER_FORCE_CLOSED","订单强制结束"),d.set("PRE_ORDER_REQUEST_SUBMITTED","订单已提交"),d.set("PRE_ORDER_REQUEST_PASSED","订单已通过"),d.set("PRE_DEPARTURE_USER_CANCELLED","订单已被用户取消"),d.set("DRIVING_USER_CONFIRM_DEPARTURE","用户确认发车"),d.set("DRIVING_USER_CONFIRM_ARRIVED","用户确认到达"),d.set("ARRIVED_USER_UNPAID","用户未支付"),d.set("ORDER_NORMAL_CLOSED","订单正常结束");const m=r(!1),v=r(!1),g=r(!1),f=r(!1),P=r(""),C=r(""),V=r(""),D=r(""),_=async()=>{const t=await Y(E.value);t!==null&&t.code===2e3?(n.value=t.carpooling,console.log(n.value)):t!==null?u({type:"danger",message:`加载订单具体信息失败,${t.msg}`}):u({type:"danger",message:"加载订单具体信息失败,请检查网络连接"})},S=async()=>{l.value=n.value,P.value=n.value.departureTime.split(" ")[0],C.value=n.value.departureTime.split(" ")[1],V.value=n.value.arriveTime.split(" ")[0],D.value=n.value.arriveTime.split(" ")[1],l.value.passingPoint=JSON.parse(n.value.passingPoint).join(" "),console.log(l)},y=r("");F(async()=>{E.value=b.currentRoute.value.query.carpoolingId,await _(),y.value=JSON.parse(n.value.passingPoint).join(" "),await S()});const I=async()=>{const t=[];n.value.passingPoint!==""&&t.push(l.value.passingPoint),window.location.href="#/main/driver/preview-map?departurePoint="+n.value.departurePoint+"&arrivePoint="+n.value.arrivePoint+"&passingPoint="+n.value.passingPoint},c=()=>{const t=ee(),{currentUser:e}=z(t);if(e.value.user.alipayId===""||e.value.user.alipayId===null)return u({type:"danger",message:"请先绑定支付宝"}),!1;if(l.value.departureTime>=l.value.arriveTime)return console.log(l.value),u({type:"danger",message:"到达时间应在出发时间之后"}),!1;let p=new Date().toLocaleString("zh",{hour12:!1});return p=p.replace(/\//g,"-"),p.split("-")[1].length===1&&(p=p.replace(/-/,"-0")),l.value.departureTime<=p?(u({type:"danger",message:"出发时间应当在当前时间之后"}),!1):(e.value.driver.driversLicenseType==="C1"||e.value.driver.driversLicenseType==="C2")&&l.value.totalPassengerNo>5?(u({type:"danger",message:"您的驾照类型不支持超过5人的拼车"}),!1):l.value.totalPassengerNo<l.value.leftPassengerNo?(u({type:"danger",message:"总乘客人数应大于等于剩余乘客人数"}),!1):!0},$=async()=>{if(l.value.passingPoint=JSON.stringify(y.value.split(" ")),l.value.departureTime=P.value+" "+C.value,l.value.arriveTime=V.value+" "+D.value,!c())return;const t=await Z(l.value);t.code===2e3?(u({type:"success",message:"修改成功,请到详情页查看"}),clearAddCarpoolingDto()):t.msg!==null?u({type:"danger",message:`修改失败,${t.msg}`}):u({type:"danger",message:"修改失败"})};return(t,e)=>{const p=G,s=Q,T=x,k=H,R=X,U=K,O=W,A=j;return L(),B(M,null,[o(p,{title:"订单详情","left-text":"返回","left-arrow":"",onClickLeft:e[0]||(e[0]=a=>N(b).go(-1))}),o(A,{onSubmit:e[26]||(e[26]=a=>$())},{default:i(()=>[o(O,{inset:""},{default:i(()=>[o(s,{modelValue:l.value.departurePoint,"onUpdate:modelValue":e[1]||(e[1]=a=>l.value.departurePoint=a),name:"出发地",label:"出发地",placeholder:"请输入出发地点",rules:[{required:!0,message:"请输入出发地点"}]},null,8,["modelValue"]),o(s,{modelValue:l.value.arrivePoint,"onUpdate:modelValue":e[2]||(e[2]=a=>l.value.arrivePoint=a),name:"到达地",label:"到达地",placeholder:"请输入到达地点",rules:[{required:!0,message:"请输入到达地点"}]},null,8,["modelValue"]),o(s,{modelValue:y.value,"onUpdate:modelValue":e[3]||(e[3]=a=>y.value=a),name:"途径地",label:"途径地",placeholder:"多个途径地点之间请用空格隔开"},null,8,["modelValue"]),o(T,{plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"2% auto"},onClick:e[4]||(e[4]=a=>I())},{default:i(()=>[w(" 预览行程路线 ")]),_:1}),o(s,{modelValue:P.value,"onUpdate:modelValue":e[5]||(e[5]=a=>P.value=a),"is-link":"",name:"departureDatePicker",label:"出发日期",placeholder:"点击选择出发日期",onClick:e[6]||(e[6]=a=>m.value=!0),rules:[{required:!0,message:"请选择出发日期"}]},null,8,["modelValue"]),o(R,{show:m.value,"onUpdate:show":e[8]||(e[8]=a=>m.value=a),position:"bottom"},{default:i(()=>[o(k,{"min-date":t.today,onConfirm:t.onDepartureDateConfirm,onCancel:e[7]||(e[7]=a=>m.value=!1)},null,8,["min-date","onConfirm"])]),_:1},8,["show"]),o(s,{modelValue:C.value,"onUpdate:modelValue":e[9]||(e[9]=a=>C.value=a),"is-link":"",name:"departureTimePicker",label:"出发时间",placeholder:"点击选择出发时间",onClick:e[10]||(e[10]=a=>g.value=!0),rules:[{required:!0,message:"请输入出发时间"}]},null,8,["modelValue"]),o(R,{show:g.value,"onUpdate:show":e[12]||(e[12]=a=>g.value=a),position:"bottom"},{default:i(()=>[o(U,{onConfirm:t.onDepartureTimeConfirm,onCancel:e[11]||(e[11]=a=>g.value=!1)},null,8,["onConfirm"])]),_:1},8,["show"]),o(s,{modelValue:V.value,"onUpdate:modelValue":e[13]||(e[13]=a=>V.value=a),"is-link":"",name:"arriveDatePicker",label:"到达日期",placeholder:"选择到达日期(默认当日到达)",onClick:e[14]||(e[14]=a=>v.value=!0),rules:[{required:!0,message:"请选择到达日期"}]},null,8,["modelValue"]),o(R,{show:v.value,"onUpdate:show":e[16]||(e[16]=a=>v.value=a),position:"bottom"},{default:i(()=>[o(k,{"min-date":t.today,onConfirm:t.onArriveDateConfirm,onCancel:e[15]||(e[15]=a=>v.value=!1)},null,8,["min-date","onConfirm"])]),_:1},8,["show"]),o(s,{modelValue:D.value,"onUpdate:modelValue":e[17]||(e[17]=a=>D.value=a),"is-link":"",name:"arriveTimePicker",label:"到达时间",placeholder:"选择到达时间",onClick:e[18]||(e[18]=a=>f.value=!0),rules:[{required:!0,message:"请选择到达时间"}]},null,8,["modelValue"]),o(R,{show:f.value,"onUpdate:show":e[20]||(e[20]=a=>f.value=a),position:"bottom"},{default:i(()=>[o(U,{onConfirm:t.onArriveTimeConfirm,onCancel:e[19]||(e[19]=a=>f.value=!1)},null,8,["onConfirm"])]),_:1},8,["show"]),o(s,{modelValue:l.value.description,"onUpdate:modelValue":e[21]||(e[21]=a=>l.value.description=a),name:"行程描述",label:"行程描述",placeholder:"请输入行程描述",rules:[{required:!0,message:"请输入行程描述"}]},null,8,["modelValue"]),o(s,{modelValue:l.value.totalPassengerNo,"onUpdate:modelValue":e[22]||(e[22]=a=>l.value.totalPassengerNo=a),name:"总座位数",label:"总座位数",placeholder:"请输入总座位数",type:"digit",rules:[{required:!0,message:"请输入总座位数"}]},null,8,["modelValue"]),o(s,{modelValue:l.value.leftPassengerNo,"onUpdate:modelValue":e[23]||(e[23]=a=>l.value.leftPassengerNo=a),name:"剩余座位数",label:"剩余座位数",placeholder:"一般与总座位数一致",type:"digit",rules:[{required:!0,message:"请输入剩余座位数"}]},null,8,["modelValue"]),o(s,{modelValue:l.value.price,"onUpdate:modelValue":e[24]||(e[24]=a=>l.value.price=a),name:"价格",label:"价格",placeholder:"您期望收取乘客的价格",type:"digit",rules:[{required:!0,message:"请输入价格"}]},null,8,["modelValue"]),J("div",le,[o(T,{plain:"",block:"",type:"primary","native-type":"submit"},{default:i(()=>[w(" 修改行程 ")]),_:1}),o(T,{plain:"",block:"",type:"danger",onClick:e[25]||(e[25]=a=>N(h)(l.value.id))},{default:i(()=>[w(" 删除行程 ")]),_:1})])]),_:1})]),_:1})],64)}}},de=ae(oe,[["__scopeId","data-v-f2b491eb"]]);export{de as default};