import{J as E,i as $,j as y,o as m,k as j,l as u,a as s,w as o,s as l,m as h,f as A,n as k,F as R,p as v,t as q,b as B,c as _,q as z,v as D,x as K,I as P,B as Q,y as T,z as M}from"./.pnpm-666ef1f2.js";import{_ as x,v as N,a as G,b as J}from"./validatorUtil-0daa244f.js";import{_ as X}from"./index-dc6ae8a1.js";const Y=""+new URL("alipayLogo-e4ca2d5f.png",import.meta.url).href,W=`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5vwYRBKySNSl/60qRqcD
lDVcNP9j2UyB7yalGI9MtlBEZ16pEiR08TuZjUL00go5LEb6z+ghVlp6UOsWR6i3
r7Q+FleKHG2yStqqaWx+11OQzOjffXQwqb1t/0bq/tzy04KBinSaB/yqnMc0yO8n
rZx8OtUX5rMcM7BjvpFOdnCSFUAOOfKRirfT5RydyGeLPOnBTwJIwpygGu20++UX
MxARO1aAJeUXeI+9g+XcsAi1EKbI2YdjWJ8PQnBC9+lsDRS3w8uKqUOZdYu/FxAy
bEjQ+YOXzfu2PB9+BdilkztV/yuF6hfk7MpGdA2JoBsJlljSYWH1mUE+e9mnUyHi
/wIDAQAB`;function Z(r){const d=new E;return d.setPublicKey(W),d.encrypt(r)}const I=r=>(D("data-v-7d1d0a93"),r=r(),K(),r),H={class:"login-box"},ee=I(()=>u("h1",{style:{"margin-top":"10%"}},"西工大拼车平台",-1)),ae={class:"icon-box"},te={class:"form-box",id:"form-box"},se=I(()=>u("div",{style:{height:"5%"}},null,-1)),oe={class:"submit-login-btn"},ne={__name:"UserLogin",setup(r){const d=$(),a=y({username:"",password:"",code:""}),p=y(!0),C=()=>{l({type:"danger",message:"表单校验未通过,请检查输入"});const n=document.getElementById("form-box");n.style.height="50%"},F=async()=>{h({duration:0,forbidClick:!0,message:"登录中"});const n={username:a.value.username,password:Z(a.value.password)};try{const e=await x.post("/api/auth/login/password",n);e.data.code!==null&&e.data.code===2e3?(A.set("token",e.data.result.token),await d.push("/main")):l({type:"danger",message:"用户名密码登录未通过,请检查输入"})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{k()}},g=y(!0),f=y(""),U=async()=>{h({duration:0,forbidClick:!0,message:"请求验证码发送中"});const n={phone:a.value.username};try{const{data:e}=await x.post("/api/auth/sendsms",n);if(e.code!==null&&e.code===2e3){l({type:"success",message:"验证码已发送"}),f.value="300s",g.value=!1;let c=300;const i=setInterval(()=>{c--,f.value=c+"s",c===0&&(clearInterval(i),g.value=!0)},1e3)}else l({type:"danger",message:`验证码发送失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{k()}},S=async()=>{h({duration:0,forbidClick:!0,message:"登录中"});const n={phone:a.value.username,code:a.value.code};try{const e=await x.post("/api/auth/login/phone",n);e.data.code!==null&&e.data.code===2e3?(A.set("token",e.data.result.token),await d.push("/main")):l({type:"danger",message:"用户名短信登录未通过,请检查输入"})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{k()}},V=()=>{window.location.replace("https://openauth.alipaydev.com/oauth2/publicAppAuthorize.htm?app_id=2021000121691518&scope=auth_user&redirect_uri=https%3A%2F%2Fcarpooling-server.wangminan.me%2Fapi%2Fauth%2Flogin%2Foauth%2Fcallback")},L=async()=>{await d.push("/register")};return(n,e)=>{const c=P,i=Q,w=T,b=M,O=R;return m(),j("div",H,[ee,u("div",ae,[s(c,{round:"",width:"80%",height:"80%",src:"/carpooling.svg"})]),u("div",te,[se,s(O,{onSubmit:e[6]||(e[6]=t=>p.value?F():S()),onFailed:C},{default:o(()=>[s(i,{class:"login-type-choose-btn",style:{"margin-top":"0"},plain:"",block:"",type:"warning",onClick:e[0]||(e[0]=t=>p.value=!p.value)},{default:o(()=>[v(q(p.value?"切换到验证码登录":"切换到用户名密码登录"),1)]),_:1}),s(b,{style:{"margin-top":"5%"},inset:""},{default:o(()=>[s(w,{modelValue:a.value.username,"onUpdate:modelValue":e[1]||(e[1]=t=>a.value.username=t),name:"手机号",label:"手机号",placeholder:"请输入手机号",type:"tel",rules:[{validator:B(N),message:"请输入正确的手机号码"}]},null,8,["modelValue","rules"])]),_:1}),p.value?(m(),_(b,{key:0,inset:"",style:{"margin-top":"5%"}},{default:o(()=>[s(w,{modelValue:a.value.password,"onUpdate:modelValue":e[2]||(e[2]=t=>a.value.password=t),name:"密码",label:"密码",type:"password",placeholder:"请输入密码",autocomplete:"off",rules:[{validator:B(G),message:"应为4-16位数字/字母/下划线"}]},null,8,["modelValue","rules"])]),_:1})):(m(),_(b,{key:1,style:{"margin-top":"5%"},inset:""},{default:o(()=>[s(w,{modelValue:a.value.code,"onUpdate:modelValue":e[4]||(e[4]=t=>a.value.code=t),center:"",clearable:"",type:"digit",label:"短信验证码",placeholder:"请输入验证码",rules:[{validator:B(J),message:"应为4位数字"}]},{button:o(()=>[g.value?(m(),_(i,{key:0,size:"small",type:"primary",onClick:e[3]||(e[3]=t=>U())},{default:o(()=>[v(" 发送验证码 ")]),_:1})):g.value?z("",!0):(m(),_(i,{key:1,size:"small",type:"primary",disabled:"",loading:"","loading-text":f.value},null,8,["loading-text"]))]),_:1},8,["modelValue","rules"])]),_:1})),u("div",oe,[s(i,{plain:"",block:"",type:"primary","native-type":"submit"},{default:o(()=>[v(" 登录 ")]),_:1}),s(i,{plain:"",block:"",type:"success",onClick:e[5]||(e[5]=t=>L())},{default:o(()=>[v(" 新账号注册 ")]),_:1})])]),_:1}),u("img",{onClick:e[7]||(e[7]=t=>V()),class:"alipay-icon",src:Y,alt:"支付宝登录"})])])}}},de=X(ne,[["__scopeId","data-v-7d1d0a93"]]);export{de as default};
