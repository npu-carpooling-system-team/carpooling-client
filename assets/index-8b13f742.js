import{_ as t}from"./index-829bfcad.js";import{s as r,v as n,t as c}from"./.pnpm-2d117cc4.js";const s=e=>{c({duration:0,forbidClick:!0,message:e})},p=async e=>{s("正在加载拼车信息列表");try{const{data:a}=await t.get("/api/carpooling/passenger/carpooling",{params:e});return a}catch{r({type:"danger",message:"加载拼车信息列表失败"})}finally{n()}return null},d=async e=>{s("正在加载拼车信息详情");try{const{data:a}=await t.get(`/api/carpooling/frontend/${e}`);return a}catch{r({type:"danger",message:"加载拼车信息详情失败"})}finally{n()}return null},y=async e=>{s("正在提交申请");try{const{data:a}=await t.post(`/api/order/preorder/passenger/apply/${e}`);return a}catch{r({type:"danger",message:"提交申请失败"})}finally{n()}return null},g=async()=>{s("正在加载订单列表");try{const{data:e}=await t.get("/api/order/passenger/order/list");return e}catch{r({type:"danger",message:"加载订单列表失败"})}finally{n()}return null},u=async e=>{s("正在加载订单详情");try{const{data:a}=await t.get(`/api/order/passenger/order?orderId=${e}`);return a}catch{r({type:"danger",message:"加载订单详情失败"})}finally{n()}return null},m=async e=>{s("正在向服务器确认出发");try{const{data:a}=await t.post(`/api/order/inprocess/passenger/departure/confirm/${e}`);return a}catch{r({type:"danger",message:"确认出发失败,服务器异常,请重试"})}finally{n()}return null},h=async()=>{s("正在确认您的取消行程次数");try{const{data:e}=await t.get("/api/order/predeparture/passenger/carpooling/canceltimes");return e}catch{r({type:"danger",message:"确认您的取消行程次数失败,服务器异常,请重试"})}finally{n()}return null},f=async e=>{s("正在取消订单");try{const{data:a}=await t.delete(`/api/order/predeparture/passenger/carpooling/${e}`);return a}catch{r({type:"danger",message:"取消订单失败,服务器异常,请重试"})}finally{n()}return null},w=async e=>{s("正在确认到达");try{const{data:a}=await t.post(`/api/order/inprocess/passenger/arrive/confirm/${e}`);return a}catch{r({type:"danger",message:"确认到达失败,服务器异常,请重试"})}finally{n()}return null},$=async e=>{s("正在发起支付");try{const{data:a}=await t.post(`/api/payment/passenger/pay/${e}`);return a}catch{r({type:"danger",message:"发起支付失败,服务器异常,请重试"})}finally{n()}return null},C=async(e,a)=>{s("正在提交评价");try{const{data:o}=await t.post(`/api/order/finished/passenger/rate/${e}/${a}`);return o}catch{r({type:"danger",message:"提交评价失败,服务器异常,请重试"})}finally{n()}return null},b=async e=>{s("正在更新支付状态");try{const{data:a}=await t.put(`/api/payment/passenger/pay/${e}`);return a}catch{r({type:"danger",message:"更新支付状态失败,服务器异常,请重试"})}finally{n()}return null};export{u as a,$ as b,C as c,m as d,h as e,f,g,w as h,b as i,p as j,d as k,y as l};