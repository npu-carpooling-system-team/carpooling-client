import{J as e}from"./.pnpm-eed560c6.js";const r=`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5vwYRBKySNSl/60qRqcD
lDVcNP9j2UyB7yalGI9MtlBEZ16pEiR08TuZjUL00go5LEb6z+ghVlp6UOsWR6i3
r7Q+FleKHG2yStqqaWx+11OQzOjffXQwqb1t/0bq/tzy04KBinSaB/yqnMc0yO8n
rZx8OtUX5rMcM7BjvpFOdnCSFUAOOfKRirfT5RydyGeLPOnBTwJIwpygGu20++UX
MxARO1aAJeUXeI+9g+XcsAi1EKbI2YdjWJ8PQnBC9+lsDRS3w8uKqUOZdYu/FxAy
bEjQ+YOXzfu2PB9+BdilkztV/yuF6hfk7MpGdA2JoBsJlljSYWH1mUE+e9mnUyHi
/wIDAQAB`;function i(t){const n=new e;return n.setPublicKey(r),n.encrypt(t)}function o(t){return/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(t)}function a(t){return/^\w{4,16}$/.test(t)}function c(t){return/^\d{4}$/.test(t)}function y(t){return/^\s*$/.test(t)||/^\d{4}$/.test(t)}export{a,c as b,y as c,i as e,o as v};
