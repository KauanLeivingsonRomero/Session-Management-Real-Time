(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{9284:(e,s,n)=>{Promise.resolve().then(n.t.bind(n,3275,23)),Promise.resolve().then(n.bind(n,668)),Promise.resolve().then(n.bind(n,6404))},668:(e,s,n)=>{"use strict";n.d(s,{V:()=>r,default:()=>i});var a=n(7437),t=n(2265),o=n(2122),c=n.n(o);let r=(0,t.createContext)({pusher:null,setPusher:()=>{},channel:null,setChannel:()=>{},pusherAcomp:null,setPusherAcomp:()=>{},channelAcomp:null,setChannelAcomp:()=>{},userName:"",setUserName:()=>{},userEmail:"",setUserEmail:()=>{},acompanhante:!1,setAcompanhante:()=>{}}),i=e=>{let{children:s}=e,[n,o]=(0,t.useState)(null),[i,u]=(0,t.useState)(null),[l,p]=(0,t.useState)(null),[h,m]=(0,t.useState)(null),[d,b]=(0,t.useState)(""),[S,_]=(0,t.useState)(""),[k,v]=(0,t.useState)(!1);return c().logToConsole=!0,(0,t.useEffect)(()=>{if(d&&S&&k){console.log("teste com acompanhante");let e=new(c())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","/proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:d,email:S,acompanhante:k}}}),s=new(c())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:"".concat(d,"_acomp"),email:"".concat(S,"_acomp")}}});return e.connection.bind("connected",()=>{p(e.subscribe("presence-menu-channel"))}),s.connection.bind("connected",()=>{m(s.subscribe("presence-menu-channel"))}),o(e),u(s),()=>{e.disconnect()}}if(d&&S){console.log("teste sem acompanhante");let e=new(c())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:d,email:S}}});return e.connection.bind("connected",()=>{p(e.subscribe("presence-menu-channel"))}),o(e),()=>{e.disconnect()}}},[d,S,k]),(0,a.jsx)(r.Provider,{value:{pusher:n,setPusher:o,channel:l,setChannel:p,userName:d,setUserName:b,userEmail:S,setUserEmail:_,acompanhante:k,setAcompanhante:v,pusherAcomp:i,setPusherAcomp:u,channelAcomp:h,setChannelAcomp:m},children:s})}},6404:(e,s,n)=>{"use strict";n.d(s,{B:()=>i,default:()=>u});var a=n(7437),t=n(2265),o=n(668),c=n(6463),r=n(8472);let i=(0,t.createContext)({menuCount:0,setMenuCount:()=>{},session17:0,setSession17:()=>{},session18:0,setSession18:()=>{},session19:0,setSession19:()=>{},session20:0,setSession20:()=>{},session21:0,setSession21:()=>{},session22:0,setSession22:()=>{}}),u=e=>{let{children:s}=e,[n,u]=(0,t.useState)(0),[l,p]=(0,t.useState)(0),[h,m]=(0,t.useState)(0),[d,b]=(0,t.useState)(0),[S,_]=(0,t.useState)(0),[k,v]=(0,t.useState)(0),[f,C]=(0,t.useState)(0),{channel:E}=(0,t.useContext)(o.V),g=(0,c.useRouter)();return(0,t.useEffect)(()=>{(async()=>{try{(await r.Z.get("".concat("https://app.diib.io/vagas-next/","/proc/Controllers/session.php"))).data.forEach(e=>{switch(e.session_time){case"17:00":p(e.session_users);break;case"18:00":m(e.session_users);break;case"19:00":b(e.session_users);break;case"20:00":_(e.session_users);break;case"21:00":v(e.session_users);break;case"22:00":C(e.session_users)}})}catch(e){console.error("Erro ao buscar sess\xf5es:",e)}})()},[]),(0,t.useEffect)(()=>{null==E||E.bind("pusher:subscription_succeeded",e=>{u(e.count),g.replace("/horarios")}),null==E||E.bind("pusher:member_added",()=>{u(e=>e+1),console.log("Member added")}),null==E||E.bind("pusher:member_removed",()=>{u(e=>e-1),console.log("Member removed")}),null==E||E.bind("client-consume",e=>{if(console.log(e),e.acompanhante)switch(e.session_time){case"17:00":p(e=>e+2);break;case"18:00":m(e=>e+2);break;case"19:00":b(e=>e+2);break;case"20:00":_(e=>e+2);break;case"21:00":v(e=>e+2);break;case"22:00":C(e=>e+2)}else switch(e.session_time){case"17:00":p(e=>e+1);break;case"18:00":m(e=>e+1);break;case"19:00":b(e=>e+1);break;case"20:00":_(e=>e+1);break;case"21:00":v(e=>e+1);break;case"22:00":C(e=>e+1)}})},[E]),(0,a.jsx)(i.Provider,{value:{menuCount:n,setMenuCount:u,session17:l,setSession17:p,session18:h,setSession18:m,session19:d,setSession19:b,session20:S,setSession20:_,session21:k,setSession21:v,session22:f,setSession22:C},children:s})}},3275:()=>{}},e=>{var s=s=>e(e.s=s);e.O(0,[757,122,236,130,215,744],()=>s(9284)),_N_E=e.O()}]);