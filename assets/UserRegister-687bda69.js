import{G as ue,l as y,k as ce,H as ve,w as me,m as pe,J as ge,o as d,n as Y,b as v,a as n,q as h,s as l,t as b,F as fe,d as $,c as o,v as f,y as u,p as I,z as ye,A as ke,D as he,B as be,K as De,L as Ce,U as Ve,E as we}from"./.pnpm-8ecbf009.js";import{e as _e,v as Z,b as G,a as xe,c as Ne}from"./validatorUtil-2c7c173b.js";import{_ as w}from"./index-1a883a7b.js";import{_ as Pe}from"./index-fdcbcded.js";const H=async c=>{const k=j(c.content,c.file.name),m=new FormData;return m.append("file",k),await w.post("/api/auth/register/ocr/idCard",m)},$e=async c=>{const k=j(c.content,c.file.name),m=new FormData;return m.append("file",k),await w.post("/api/auth/register/ocr/drivingLicense",m)},K=async c=>{const k=j(c.content,c.file.name),m=new FormData;return m.append("file",k),await w.post("/api/auth/register/ocr/vehicleLicense",m)};function j(c,k){let m=c.split(","),g=m[0].match(/:(.*?);/)[1],a=window.atob(m[1]),D=a.length,C=new Uint8Array(D);for(;D--;)C[D]=a.charCodeAt(D);return new File([C],k,{type:g})}const Ie=ue("registerDtoCache",()=>({registerCache:y({registerDto:{username:"",password:"",email:"",isDriver:!1,isPassenger:!1,driversPersonalId:"",driversName:"",driversLicenseNo:"",driversLicenseType:"",driversPlateNo:"",driversVehicleType:"",driversExpireDate:""},checkSmsDisabled:!1,checkMailDisabled:!1,checkIdFront:!1,checkIdBack:!1,checkDriving:!1,checkCarFront:!1,checkCarBack:!1})}),{persist:{storage:sessionStorage,paths:["registerCache"],key:"registerCache"}});const q=c=>(ye("data-v-aaaf5fed"),c=c(),ke(),c),Ee={class:"register-form"},Se=q(()=>I("h3",{class:"title"},"西工大拼车平台——注册",-1)),ze=q(()=>I("h5",null,"用户角色选择(可多选)",-1)),Le={key:4},Te=q(()=>I("a",null,"您确认注册则代表您认可我们的",-1)),Ue={class:"submit-login-btn"},Fe={__name:"UserRegister",setup(c){const k=ce(),m=Ie(),{registerCache:g}=ve(m),a=y({username:"",password:"",email:"",isDriver:!1,isPassenger:!1,driversPersonalId:"",driversName:"",driversLicenseNo:"",driversLicenseType:"",driversPlateNo:"",driversVehicleType:"",driversExpireDate:""}),D=y(!0),C=y({phone:"",code:""}),A=y(""),Q=async()=>{if(!Z(a.value.username)){l({type:"danger",message:"手机号格式不正确"});return}h({duration:0,forbidClick:!0,message:"请求验证码发送中"});const s={phone:a.value.username};try{const{data:e}=await w.post("/api/auth/sendsms",s);if(e.code!==null&&e.code===2e3){l({type:"success",message:"验证码已发送"}),A.value="300s",D.value=!1;let r=300;const t=setInterval(()=>{r--,A.value=r+"s",r===0&&(clearInterval(t),D.value=!0)},1e3)}else l({type:"danger",message:`验证码发送失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}},V=y(!1),W=async()=>{if(C.value.phone=a.value.username,!G(C.value.code)||!Z(C.value.phone)){l({type:"danger",message:"格式不正确"});return}h({duration:0,forbidClick:!0,message:"请求验证码验证中"});try{const{data:s}=await w.post("/api/auth/checksms",C.value);s.code!==null&&s.code===2e3?(l({type:"success",message:"验证码验证成功"}),V.value=!0):l({type:"danger",message:`验证码验证失败,${s.msg},请重试`})}catch(s){l({type:"danger",message:`服务器异常${s},请通知管理员`})}finally{b()}},x=y({mail:"",code:""}),_=y(!1),L=y(!0),J=y(""),X=async()=>{if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(a.value.email)){l({type:"danger",message:"邮箱格式不正确"});return}h({duration:0,forbidClick:!0,message:"请求验证码发送中"});const s={email:a.value.email};try{const{data:e}=await w.post("/api/auth/sendmail",s);if(e.code!==null&&e.code===2e3){l({type:"success",message:"验证码已发送"}),J.value="300s",L.value=!1;let r=300;const t=setInterval(()=>{r--,J.value=r+"s",r===0&&(clearInterval(t),L.value=!1)},1e3)}else l({type:"danger",message:`验证码发送失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}},ee=async()=>{if(x.value.mail=a.value.email,!G(x.value.code)||/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(x.value.code)){l({type:"danger",message:"格式不正确"});return}h({duration:0,forbidClick:!0,message:"请求邮箱验证中"});try{const{data:s}=await w.post("/api/auth/checkmail",x.value);s.code!==null&&s.code===2e3?(l({type:"success",message:"邮箱验证成功"}),_.value=!0):l({type:"danger",message:`邮箱验证失败,${s.msg},请重试`})}catch(s){l({type:"danger",message:`服务器异常${s},请通知管理员`})}finally{b()}},E=y([]),p=y(!1);let T=!1,U=!1,F=!1,R=!1,B=!1;const S=s=>(console.log(s.file.type),s.content.size>10*1024*1024?(l({type:"danger",message:"文件大小不能超过10M"}),!1):/image\/(png|jpg|jpeg|JPG|PNG)/.test(s.file.type)?!0:(l({type:"danger",message:"文件格式不正确"}),!1)),ae=async s=>{if(S(s)){h({duration:0,forbidClick:!0,message:"正在识别身份证"});try{const{data:e}=await H(s);if(e.code===2e3){const r=JSON.parse(e.data);if(r.data.face!==null){const t=r.data.face;if(t.warning.isCopy!==0||t.warning.isReshoot!==0){l({type:"danger",message:"识别到翻拍或复制。请识别原件身份证"});return}a.value.driversName=t.data.name,a.value.driversPersonalId=t.data.idNumber,T=!0}else l({type:"danger",message:"身份证识别失败,请重试"})}else l({type:"danger",message:`身份证识别失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}}},se=async s=>{if(S(s)){h({duration:0,forbidClick:!0,message:"正在识别身份证"});try{const{data:e}=await H(s);if(e.code===2e3){const r=JSON.parse(e.data);if(r.data.back!==null){const t=r.data.back;if(t.warning.isCopy!==0||t.warning.isReshoot!==0){l({type:"danger",message:"识别到翻拍或复制。请识别原件身份证"});return}t.data.validPeriod.split("-")[1]==="长期"?t.data.validPeriod="2999-12-31":a.value.driversExpireDate=t.data.validPeriod.split("-")[1].replace(/(\d{4})\.(\d{2})\.(\d{2})/,"$1-$2-$3"),U=!0}else l({type:"danger",message:"请识别身份证反面"})}else l({type:"danger",message:`身份证识别失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}}},le=async s=>{if(S(s))a.value.driversName===""&&l({type:"danger",message:"请先识别身份证信息"});else return;h({duration:0,forbidClick:!0,message:"正在识别驾驶证"});try{const{data:e}=await $e(s);if(e.code===2e3){const r=JSON.parse(e.data);if(r.data.face!==null){if(r.data.face.data.name!==a.value.driversName||r.data.face.data.licenseNumber!==a.value.driversPersonalId){l({type:"danger",message:"驾驶证与身份证所属人不一致,请更新材料"});return}a.value.driversLicenseNo=r.data.face.data.licenseNumber,a.value.driversLicenseType=r.data.face.data.approvedType;const t=r.data.face.data.validPeriod.split("至")[1];a.value.driversExpireDate===""?a.value.driversExpireDate=t:a.value.driversExpireDate=a.value.driversExpireDate>t?t:a.value.driversExpireDate,F=!0}else l({type:"danger",message:"驾驶证识别失败,请重试"})}else l({type:"danger",message:`驾驶证识别失败,${e.msg},请重试`})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}},re=async s=>{if(S(s)){h({duration:0,forbidClick:!0,message:"正在识别行驶证"});try{const{data:e}=await K(s);if(e.code===2e3){const r=JSON.parse(e.data);if(r.data.face!==null){if(r.data.face.data.owner!==a.value.driversName){l({type:"danger",message:"行驶证与身份证所属人不一致或身份信息为空,请更新材料"});return}else r.data.face.data.useNature!=="非营运"&&l({type:"warning",message:"行驶证非营运,我们建议您更新材料"});a.value.driversPlateNo=r.data.face.data.licensePlateNumber,a.value.driversVehicleType=r.data.face.data.model+" "+r.data.face.data.vehicleType,R=!0}}else l({type:"danger",message:"行驶证识别失败,请重试"})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}}},te=async s=>{if(S(s)){h({duration:0,forbidClick:!0,message:"正在识别行驶证"});try{const{data:e}=await K(s);if(e.code===2e3){const r=JSON.parse(e.data);if(r.data.back!==null){if(r.data.back.data.inspectionRecord===null){l({type:"danger",message:"行驶证未年检,请更新材料"});return}const t=r.data.back.data.inspectionRecord,M=/有效期至(\d{1,4}年\d{1,2}月)/g,N=t.match(M);if(N===null){l({type:"danger",message:"行驶证年检信息解析失败,请更新材料"});return}N.sort((O,i)=>{const de=O.match(/\d{1,4}年\d{1,2}月/)[0],oe=i.match(/\d{1,4}年\d{1,2}月/)[0];return de>oe?1:-1});const z=N[N.length-1].match(/\d{1,4}年\d{1,2}月/)[0].replace("年","-").replace("月","-01");a.value.driversExpireDate===""?a.value.driversExpireDate=z:a.value.driversExpireDate=a.value.driversExpireDate>z?z:a.value.driversExpireDate,B=!0}}else l({type:"danger",message:"行驶证识别失败,请重试"})}catch(e){l({type:"danger",message:`服务器异常${e},请通知管理员`})}finally{b()}}};me(E,s=>{p.value=!!s.includes("isDriver")});const ie=()=>a.value.isDriver&&(a.value.driversName===""||a.value.driversPersonalId===""||a.value.driversVehicleType===""||a.value.driversExpireDate===""||a.value.driversPlateNo==="")?(l({type:"danger",message:"请完善司机信息"}),!1):V.value?!_.value&&a.value.email!==""?(l({type:"danger",message:"请先完成邮箱校验"}),!1):a.value.isDriver&&(!T||!U||!F||!R||!B)?(l({type:"danger",message:"请先有关证照校验"}),!1):!0:(l({type:"danger",message:"请先完成手机号校验"}),!1),ne=async()=>{h({duration:0,forbidClick:!0,message:"正在提交注册信息,我们推荐您完成注册后及时绑定支付宝。"});try{if(E.value.indexOf("isDriver")!==-1?a.value.isDriver=!0:E.value.indexOf("isPassenger")!==-1&&(a.value.isPassenger=!0),!a.value.isDriver&&!a.value.isPassenger){l({type:"danger",message:"请选择用户角色"});return}if(!ie())return;a.value.password=_e(a.value.password);const{data:s}=await w.post("/api/auth/register/user",a.value);s.code===2e3?(l({type:"success",message:"注册成功,请您登录"}),await k.push("/login")):l({type:"danger",message:s.message})}catch(s){l({type:"danger",message:`服务器异常${s},请通知管理员`})}finally{b()}};return pe(()=>{(g.value.registerDto.isDriver||g.value.registerDto.isPassenger||g.value.registerDto.username!=="")&&(a.value=g.value.registerDto,V.value=g.value.checkSmsDisabled,_.value=g.value.checkMailDisabled,T=g.value.checkIdFront,U=g.value.checkIdBack,F=g.value.checkDriving,R=g.value.checkCarFront,B=g.value.checkCarBack)}),ge(()=>{m.$patch(s=>{s.registerCache.registerDto=a.value,s.registerCache.checkSmsDisabled=V.value,s.registerCache.checkMailDisabled=_.value,s.registerCache.checkIdFront=T,s.registerCache.checkIdBack=U,s.registerCache.checkDriving=F,s.registerCache.checkCarFront=R,s.registerCache.checkCarBack=B})}),(s,e)=>{const r=he,t=be,M=De,N=Ce,P=Ve,z=we,O=fe;return d(),Y("div",Ee,[Se,v(O,{onSubmit:e[19]||(e[19]=i=>ne())},{default:n(()=>[v(z,{inset:"",style:{padding:"1%"}},{default:n(()=>[v(r,{modelValue:a.value.username,"onUpdate:modelValue":e[0]||(e[0]=i=>a.value.username=i),name:"手机号",label:"手机号",placeholder:"请输入手机号",type:"tel",clearable:"",rules:[{validator:$(Z),message:"请输入正确的手机号码"}],disabled:V.value},null,8,["modelValue","rules","disabled"]),V.value?u("",!0):(d(),o(r,{key:0,modelValue:C.value.code,"onUpdate:modelValue":e[2]||(e[2]=i=>C.value.code=i),center:"",clearable:"",type:"digit",label:"短信验证码",placeholder:"请输入验证码",rules:[{validator:$(G),message:"应为4位数字"}]},{button:n(()=>[D.value?(d(),o(t,{key:0,size:"small",type:"primary",onClick:e[1]||(e[1]=i=>Q()),disabled:V.value},{default:n(()=>[f(" 发送验证码 ")]),_:1},8,["disabled"])):D.value?u("",!0):(d(),o(t,{key:1,size:"small",type:"primary",disabled:"",loading:"","loading-text":A.value},null,8,["loading-text"]))]),_:1},8,["modelValue","rules"])),V.value?u("",!0):(d(),o(t,{key:1,plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"1% auto"},onClick:e[3]||(e[3]=i=>W())},{default:n(()=>[f("验证手机号码")]),_:1})),v(r,{modelValue:a.value.password,"onUpdate:modelValue":e[4]||(e[4]=i=>a.value.password=i),name:"密码",label:"密码",type:"password",placeholder:"请设置密码",autocomplete:"off",rules:[{validator:$(xe),message:"应为4-16位数字/字母/下划线"}]},null,8,["modelValue","rules"]),v(r,{modelValue:a.value.email,"onUpdate:modelValue":e[5]||(e[5]=i=>a.value.email=i),center:"",clearable:"",label:"邮箱",placeholder:"请输入邮箱(非强制)",disabled:_.value},null,8,["modelValue","disabled"]),_.value?u("",!0):(d(),o(r,{key:2,modelValue:x.value.code,"onUpdate:modelValue":e[7]||(e[7]=i=>x.value.code=i),center:"",clearable:"",type:"digit",label:"邮箱验证码",placeholder:"请输入验证码",rules:[{required:!1,validator:$(Ne),message:"应为4位数字"}]},{button:n(()=>[L.value?(d(),o(t,{key:0,size:"small",type:"primary",onClick:e[6]||(e[6]=i=>X())},{default:n(()=>[f(" 发送验证码 ")]),_:1})):L.value?u("",!0):(d(),o(t,{key:1,size:"small",type:"primary",disabled:"",loading:"","loading-text":J.value},null,8,["loading-text"]))]),_:1},8,["modelValue","rules"])),_.value?u("",!0):(d(),o(t,{key:3,plain:"",block:"",type:"primary",size:"small",style:{width:"40%",margin:"1% auto"},onClick:e[8]||(e[8]=i=>ee())},{default:n(()=>[f("验证邮箱")]),_:1})),ze,v(N,{modelValue:E.value,"onUpdate:modelValue":e[9]||(e[9]=i=>E.value=i),direction:"horizontal",class:"checkbox-area"},{default:n(()=>[v(M,{name:"isPassenger"},{default:n(()=>[f("我希望拼车-乘客")]),_:1}),v(M,{name:"isDriver"},{default:n(()=>[f("我可以搭人-司机")]),_:1})]),_:1},8,["modelValue"]),p.value?(d(),Y("h5",Le,"请您补充以下信息")):u("",!0),p.value?(d(),o(P,{key:5,style:{width:"60%",margin:"0 auto"},"after-read":ae},{default:n(()=>[v(t,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[f(" 拍摄您的身份证-正面-以自动识别 ")]),_:1})]),_:1})):u("",!0),p.value?(d(),o(P,{key:6,style:{width:"60%",margin:"1% auto"},"after-read":se},{default:n(()=>[v(t,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[f(" 拍摄您的身份证-背面-以自动识别 ")]),_:1})]),_:1})):u("",!0),p.value?(d(),o(r,{key:7,modelValue:a.value.driversPersonalId,"onUpdate:modelValue":e[10]||(e[10]=i=>a.value.driversPersonalId=i),center:"",disabled:"",clearable:"",label:"身份证号",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(r,{key:8,modelValue:a.value.driversName,"onUpdate:modelValue":e[11]||(e[11]=i=>a.value.driversName=i),center:"",disabled:"",clearable:"",label:"真实姓名",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(P,{key:9,style:{width:"60%",margin:"1% auto"},"after-read":le},{default:n(()=>[v(t,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[f(" 拍摄您的驾驶证-主页-以自动识别 ")]),_:1})]),_:1})):u("",!0),p.value?(d(),o(r,{key:10,modelValue:a.value.driversLicenseNo,"onUpdate:modelValue":e[12]||(e[12]=i=>a.value.driversLicenseNo=i),center:"",disabled:"",clearable:"",label:"驾驶证号",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(r,{key:11,modelValue:a.value.driversLicenseType,"onUpdate:modelValue":e[13]||(e[13]=i=>a.value.driversLicenseType=i),center:"",disabled:"",clearable:"",label:"准驾类型",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(P,{key:12,style:{width:"60%",margin:"1% auto"},"after-read":re},{default:n(()=>[v(t,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[f(" 拍摄您的行驶证-主页-以自动识别 ")]),_:1})]),_:1})):u("",!0),p.value?(d(),o(P,{key:13,style:{width:"60%",margin:"1% auto"},"after-read":te},{default:n(()=>[v(t,{plain:"",block:"",type:"primary",size:"small"},{default:n(()=>[f(" 拍摄您的行驶证-副页-以自动识别 ")]),_:1})]),_:1})):u("",!0),p.value?(d(),o(r,{key:14,modelValue:a.value.driversPlateNo,"onUpdate:modelValue":e[14]||(e[14]=i=>a.value.driversPlateNo=i),center:"",disabled:"",clearable:"",label:"车牌号",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(r,{key:15,modelValue:a.value.driversVehicleType,"onUpdate:modelValue":e[15]||(e[15]=i=>a.value.driversVehicleType=i),center:"",disabled:"",clearable:"",autosize:"",type:"textarea",label:"车型",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0),p.value?(d(),o(r,{key:16,modelValue:a.value.driversExpireDate,"onUpdate:modelValue":e[16]||(e[16]=i=>a.value.driversExpireDate=i),center:"",disabled:"",clearable:"",label:"证照最早过期时间",placeholder:"该位置会被自动填充"},null,8,["modelValue"])):u("",!0)]),_:1}),I("p",null,[Te,I("a",{style:{color:"#5CA0FF"},onClick:e[17]||(e[17]=i=>$(k).push("/privacy"))},"隐私政策")]),I("div",Ue,[v(t,{plain:"",block:"",type:"primary","native-type":"submit"},{default:n(()=>[f(" 注册 ")]),_:1}),v(t,{plain:"",block:"",type:"success",onClick:e[18]||(e[18]=i=>$(k).push("/login"))},{default:n(()=>[f(" 返回登录页 ")]),_:1})])]),_:1})])}}},Je=Pe(Fe,[["__scopeId","data-v-aaaf5fed"]]);export{Je as default};