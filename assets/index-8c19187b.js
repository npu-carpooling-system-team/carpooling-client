import{u as L,o as v,c as O,w as P,a as A,b as I,r as k,C as y,d as R,e as T,f as b,s as w,g as D,h as V}from"./.pnpm-666ef1f2.js";let p,N=(async()=>{(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();let d,f,h,_,m,i,g,u;p=(r,n)=>{const o=r.__vccOpts||r;for(const[t,e]of n)o[t]=e;return o},d={__name:"App",setup(r){const n=L();return(o,t)=>{const e=k("router-view"),a=y;return v(),O(a,{class:"config-provider",theme:I(n)?"dark":"light"},{default:P(()=>[A(e)]),_:1},8,["theme"])}}},f=p(d,[["__scopeId","data-v-32ac731c"]]),h="modulepreload",_=function(r,n){return new URL(r,n).href},m={},i=function(r,n,o){if(!n||n.length===0)return r();const t=document.getElementsByTagName("link");return Promise.all(n.map(e=>{if(e=_(e,o),e in m)return;m[e]=!0;const a=e.endsWith(".css"),E=a?'[rel="stylesheet"]':"";if(o)for(let l=t.length-1;l>=0;l--){const c=t[l];if(c.href===e&&(!a||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${E}`))return;const s=document.createElement("link");if(s.rel=a?"stylesheet":h,a||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),a)return new Promise((l,c)=>{s.addEventListener("load",l),s.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>r())},g=[{path:"/",name:"default",redirect:"/login"},{path:"/login",name:"login",component:()=>i(()=>import("./UserLogin-c8612ac5.js"),["./UserLogin-c8612ac5.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css","./validatorUtil-0daa244f.js","./UserLogin-4a5e5be8.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u767B\u5F55"}},{path:"/register",name:"register",component:()=>i(()=>import("./UserRegister-b4284032.js"),["./UserRegister-b4284032.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css","./validatorUtil-0daa244f.js","./UserRegister-2eb87ab0.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u6CE8\u518C"}},{path:"/privacy",name:"privacy",component:()=>i(()=>import("./PrivacyPolicy-660690de.js"),["./PrivacyPolicy-660690de.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css","./PrivacyPolicy-7ef4bf9b.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u9690\u79C1\u653F\u7B56"}},{path:"/oauth/alipay/success",name:"oauth-success",component:()=>i(()=>import("./OAuthSuccess-e8630bea.js"),["./OAuthSuccess-e8630bea.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css","./OAuthSuccess-bab16393.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u652F\u4ED8\u5B9D\u767B\u9646\u6210\u529F"}},{path:"/oauth/alipay/failure",name:"oauth-failure",component:()=>i(()=>import("./OAuthFailure-d22693a3.js"),["./OAuthFailure-d22693a3.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u652F\u4ED8\u5B9D\u767B\u9646\u5931\u8D25"}},{path:"/main",name:"main",component:()=>i(()=>import("./MainPage-2f913a09.js"),["./MainPage-2f913a09.js",".pnpm-666ef1f2.js",".pnpm-8618943e.css"],import.meta.url),meta:{title:"\u897F\u5DE5\u5927\u62FC\u8F66\u7CFB\u7EDF-\u4E3B\u9875"}}],u=R({history:T(),routes:g}),u.beforeEach((r,n,o)=>{if(r.meta.title&&(document.title=r.meta.title),r.path==="/login"||r.path==="/register"||r.path==="/oauth/alipay/success"||r.path==="/oauth/alipay/failure"||r.path==="/privacy")return o();if(!b.get("token"))return w({type:"danger",message:"\u8BF7\u5148\u767B\u5F55"}),o("/login");o()}),D(f).use(V()).use(u).use(y).mount("#app")})();export{p as _,N as __tla};