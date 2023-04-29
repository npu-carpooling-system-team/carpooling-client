// UTF8编码转成汉字字符串
export function revertFromUTF8(szInput) {
    let x, wch, wch1, wch2, uch = "", szRet = "";
    for (x=0; x<szInput.length; x++) {
        if (szInput.charAt(x)==="%") {
            wch =parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
            if (!wch) {break;}
            if (!(wch & 0x80)) {
                wch = wch;
            } else if (!(wch & 0x20)) {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
                wch  = (wch & 0x1F)<< 6;
                wch1 = wch1 & 0x3F;
                wch  = wch + wch1;
            } else {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
                x++;
                wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x),16);
                wch  = (wch & 0x0F)<< 12;
                wch1 = (wch1 & 0x3F)<< 6;
                wch2 = (wch2 & 0x3F);
                wch  = wch + wch1 + wch2;
            }
            szRet += String.fromCharCode(wch);
        } else {
            szRet += szInput.charAt(x);
        }
    }
    return(szRet);
}

export function EncodeToUtf8(s1)
{
    const s = escape(s1);
    const sa = s.split("%");
    let retV = "";
    if(sa[0] !== "")
    {
        retV = sa[0];
    }
    for(var i = 1; i < sa.length; i ++)
    {
        if(sa[i].substring(0,1) === "u")
        {
            retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
        }
        else retV += "%" + sa[i];
    }
    return retV;
}

function Str2Hex(s)
{
    let c = "";
    let n;
    const ss = "0123456789ABCDEF";
    let digS = "";
    for(let i = 0; i < s.length; i ++) {
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += Dec2Dig(eval(n));
    }
    //return value;
    return digS;
}
function Dec2Dig(n1)
{
    let s = "";
    let n2 = 0;
    for(let i = 0; i < 4; i++) {
        n2 = Math.pow(2,3 - i);
        if(n1 >= n2)
        {
            s += '1';
            n1 = n1 - n2;
        }
        else
            s += '0';
    }
    return s;
}
function Dig2Dec(s)
{
    let retV = 0;
    if(s.length === 4) {
        for(let i = 0; i < 4; i ++)
        {
            retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
        }
        return retV;
    }
    return -1;
}
function Hex2Utf8(s) {
    let retS = "";
    let tempS = "";
    let ss = "";
    if(s.length === 16)
    {
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" +  s.substring(4, 10);
        tempS += "10" + s.substring(10,16);
        const sss = "0123456789ABCDEF";
        for(let i = 0; i < 3; i ++)
        {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
        }
        return retS;
    }
    return "";
}

