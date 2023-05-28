import{_ as t}from"./index-7bf2edfc.js";import{s as r,t as n,q as o}from"./.pnpm-835927bf.js";const s=e=>{o({duration:0,forbidClick:!0,message:e})},c=async e=>{s("正在上传拼车信息");try{const{data:a}=await t.post("/api/carpooling/driver/carpooling",e);return a}catch(a){r({type:"danger",message:`上传拼车信息失败,${a.message}`})}finally{n()}return!1},g=async e=>{console.log(e.id),s("正在修改拼车信息");try{const{data:a}=await t.put(`/api/carpooling/driver/carpooling/${e.id}`,e);return a}catch(a){r({type:"danger",message:`修改拼车信息失败,${a.message}`})}finally{n()}return!1},p=async e=>{console.log(e),s("正在删除拼车信息");try{const{data:a}=await t.delete(`/api/carpooling/driver/carpooling/${e}`);return a}catch(a){r({type:"danger",message:`删除拼车信息失败,${a.message}`})}finally{n()}return!1},d=async e=>{s("正在加载拼车信息列表");try{const{data:a}=await t.get("/api/carpooling/driver/carpooling",{params:e});return a}catch{r({type:"danger",message:"加载拼车信息列表失败"})}finally{n()}return null},y=async e=>{s("正在加载拼车信息详情");try{const{data:a}=await t.get(`/api/carpooling/frontend/${e}`);return a}catch{r({type:"danger",message:"加载拼车信息详情失败"})}finally{n()}return null};export{y as a,c as b,p as d,d as h,g as u};