(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7147:(e,t,n)=>{Promise.resolve().then(n.bind(n,3431))},3431:(e,t,n)=>{"use strict";n.d(t,{default:()=>d});var a=n(7437),s=n(2265),c=n(9343),r=n(1014),l=n(4839),o=n(6164);let i=s.forwardRef((e,t)=>{let{className:n,type:s,...c}=e;return(0,a.jsx)("input",{type:s,className:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,o.m6)((0,l.W)(t))}("flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",n),ref:t,...c})});i.displayName="Input";var m=n(9772),p=n(668);let u=m.Ry({name:m.Z_({required_error:"Digite seu nome"}).min(2,{message:"Digite pelo menos 2 caracteres"}),email:m.Z_({required_error:"Digite seu email"}).email({message:"Digite um email valido"}),checkbox:m.O7().optional()}),d=()=>{let{setUserName:e,setUserEmail:t,setAcompanhante:n}=(0,s.useContext)(p.V),{register:l,handleSubmit:o,formState:{errors:m}}=(0,c.cI)({resolver:(0,r.F)(u)}),d=async a=>{e(a.name),t(a.email),n(a.checkbox)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("form",{action:"",className:"flex flex-col gap-2",onSubmit:o(d),children:[(0,a.jsx)(i,{...l("name"),placeholder:"Nome",type:"text",className:"rounded text-xl"}),m.name&&(0,a.jsx)("p",{className:"text-red-500",children:m.name.message}),(0,a.jsx)(i,{...l("email"),placeholder:"Email",type:"text",className:"rounded text-xl"}),m.email&&(0,a.jsx)("p",{className:"text-red-500",children:m.email.message}),(0,a.jsxs)("div",{className:"flex flex-row text-center justify-center items-center space-x-3 space-y-0 rounded-md border p-4",children:[(0,a.jsx)("input",{id:"checkbox",className:"size-4",type:"checkbox",...l("checkbox")}),(0,a.jsx)("label",{htmlFor:"checkbox",className:"text-xl",children:"Acompanhante"})]}),(0,a.jsx)("button",{className:"bg-zinc-950 text-white p-2 rounded text-xl",type:"submit",children:"Registrar"})]})})}},668:(e,t,n)=>{"use strict";n.d(t,{V:()=>l,default:()=>o});var a=n(7437),s=n(2265),c=n(2122),r=n.n(c);let l=(0,s.createContext)({pusher:null,setPusher:()=>{},channel:null,setChannel:()=>{},pusherAcomp:null,setPusherAcomp:()=>{},channelAcomp:null,setChannelAcomp:()=>{},userName:"",setUserName:()=>{},userEmail:"",setUserEmail:()=>{},acompanhante:!1,setAcompanhante:()=>{}}),o=e=>{let{children:t}=e,[n,c]=(0,s.useState)(null),[o,i]=(0,s.useState)(null),[m,p]=(0,s.useState)(null),[u,d]=(0,s.useState)(null),[h,x]=(0,s.useState)(""),[b,f]=(0,s.useState)(""),[g,v]=(0,s.useState)(!1);return r().logToConsole=!0,(0,s.useEffect)(()=>{if(h&&b&&g){console.log("teste com acompanhante");let e=new(r())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","/proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:h,email:b,acompanhante:g}}}),t=new(r())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:"".concat(h,"_acomp"),email:"".concat(b,"_acomp")}}});return e.connection.bind("connected",()=>{p(e.subscribe("presence-menu-channel"))}),t.connection.bind("connected",()=>{d(t.subscribe("presence-menu-channel"))}),c(e),i(t),()=>{e.disconnect()}}if(h&&b){console.log("teste sem acompanhante");let e=new(r())("".concat("1f678673e53816425e3a"),{cluster:"".concat("sa1"),authEndpoint:"".concat("https://app.diib.io/vagas-next/","proc/Controllers/server.php"),auth:{headers:{"Content-Type":"application/json"},params:{name:h,email:b}}});return e.connection.bind("connected",()=>{p(e.subscribe("presence-menu-channel"))}),c(e),()=>{e.disconnect()}}},[h,b,g]),(0,a.jsx)(l.Provider,{value:{pusher:n,setPusher:c,channel:m,setChannel:p,userName:h,setUserName:x,userEmail:b,setUserEmail:f,acompanhante:g,setAcompanhante:v,pusherAcomp:o,setPusherAcomp:i,channelAcomp:u,setChannelAcomp:d},children:t})}}},e=>{var t=t=>e(e.s=t);e.O(0,[122,355,130,215,744],()=>t(7147)),_N_E=e.O()}]);