var He=Object.defineProperty;var Ce=t=>{throw TypeError(t)};var Be=(t,e,s)=>e in t?He(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var _=(t,e,s)=>Be(t,typeof e!="symbol"?e+"":e,s),ne=(t,e,s)=>e.has(t)||Ce("Cannot "+s);var i=(t,e,s)=>(ne(t,e,"read from private field"),s?s.call(t):e.get(t)),b=(t,e,s)=>e.has(t)?Ce("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,s),f=(t,e,s,r)=>(ne(t,e,"write to private field"),r?r.call(t,s):e.set(t,s),s),m=(t,e,s)=>(ne(t,e,"access private method"),s);import{S as Ie,p as Se,n as k,s as ee,o as Y,q as Ke,t as ae,v as Oe,w as We,x as ze,y as Ne,z as xe,A as te,B as Ee,E as Ve,r as S,F as _e,G as Ge}from"./index-BjATTbK1.js";var R,h,V,w,F,B,Q,A,G,K,W,q,L,D,z,d,N,oe,he,ue,ce,le,fe,de,Qe,ke,Je=(ke=class extends Ie{constructor(e,s){super();b(this,d);b(this,R);b(this,h);b(this,V);b(this,w);b(this,F);b(this,B);b(this,Q);b(this,A);b(this,G);b(this,K);b(this,W);b(this,q);b(this,L);b(this,D);b(this,z,new Set);this.options=s,f(this,R,e),f(this,A,null),f(this,Q,Se()),this.options.experimental_prefetchInRender||i(this,Q).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(i(this,h).addObserver(this),Pe(i(this,h),this.options)?m(this,d,N).call(this):this.updateResult(),m(this,d,ce).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return pe(i(this,h),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return pe(i(this,h),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,m(this,d,le).call(this),m(this,d,fe).call(this),i(this,h).removeObserver(this)}setOptions(e,s){const r=this.options,n=i(this,h);if(this.options=i(this,R).defaultQueryOptions(e),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof k(this.options.enabled,i(this,h))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");m(this,d,de).call(this),i(this,h).setOptions(this.options),r._defaulted&&!ee(this.options,r)&&i(this,R).getQueryCache().notify({type:"observerOptionsUpdated",query:i(this,h),observer:this});const a=this.hasListeners();a&&Ue(i(this,h),n,this.options,r)&&m(this,d,N).call(this),this.updateResult(s),a&&(i(this,h)!==n||k(this.options.enabled,i(this,h))!==k(r.enabled,i(this,h))||Y(this.options.staleTime,i(this,h))!==Y(r.staleTime,i(this,h)))&&m(this,d,oe).call(this);const o=m(this,d,he).call(this);a&&(i(this,h)!==n||k(this.options.enabled,i(this,h))!==k(r.enabled,i(this,h))||o!==i(this,D))&&m(this,d,ue).call(this,o)}getOptimisticResult(e){const s=i(this,R).getQueryCache().build(i(this,R),e),r=this.createResult(s,e);return Ye(this,r)&&(f(this,w,r),f(this,B,this.options),f(this,F,i(this,h).state)),r}getCurrentResult(){return i(this,w)}trackResult(e,s){const r={};return Object.keys(e).forEach(n=>{Object.defineProperty(r,n,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(n),s==null||s(n),e[n])})}),r}trackProp(e){i(this,z).add(e)}getCurrentQuery(){return i(this,h)}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){const s=i(this,R).defaultQueryOptions(e),r=i(this,R).getQueryCache().build(i(this,R),s);return r.fetch().then(()=>this.createResult(r,s))}fetch(e){return m(this,d,N).call(this,{...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),i(this,w)))}createResult(e,s){var Re;const r=i(this,h),n=this.options,a=i(this,w),o=i(this,F),l=i(this,B),y=e!==r?e.state:i(this,V),{state:p}=e;let c={...p},P=!1,v;if(s._optimisticResults){const g=this.hasListeners(),$=!g&&Pe(e,s),H=g&&Ue(e,r,s,n);($||H)&&(c={...c,...Ne(p.data,e.options)}),s._optimisticResults==="isRestoring"&&(c.fetchStatus="idle")}let{error:x,errorUpdatedAt:O,status:E}=c;if(s.select&&c.data!==void 0)if(a&&c.data===(o==null?void 0:o.data)&&s.select===i(this,G))v=i(this,K);else try{f(this,G,s.select),v=s.select(c.data),v=xe(a==null?void 0:a.data,v,s),f(this,K,v),f(this,A,null)}catch(g){f(this,A,g)}else v=c.data;if(s.placeholderData!==void 0&&v===void 0&&E==="pending"){let g;if(a!=null&&a.isPlaceholderData&&s.placeholderData===(l==null?void 0:l.placeholderData))g=a.data;else if(g=typeof s.placeholderData=="function"?s.placeholderData((Re=i(this,W))==null?void 0:Re.state.data,i(this,W)):s.placeholderData,s.select&&g!==void 0)try{g=s.select(g),f(this,A,null)}catch($){f(this,A,$)}g!==void 0&&(E="success",v=xe(a==null?void 0:a.data,g,s),P=!0)}i(this,A)&&(x=i(this,A),v=i(this,K),O=Date.now(),E="error");const se=c.fetchStatus==="fetching",re=E==="pending",ie=E==="error",ge=re&&se,we=v!==void 0,U={status:E,fetchStatus:c.fetchStatus,isPending:re,isSuccess:E==="success",isError:ie,isInitialLoading:ge,isLoading:ge,data:v,dataUpdatedAt:c.dataUpdatedAt,error:x,errorUpdatedAt:O,failureCount:c.fetchFailureCount,failureReason:c.fetchFailureReason,errorUpdateCount:c.errorUpdateCount,isFetched:c.dataUpdateCount>0||c.errorUpdateCount>0,isFetchedAfterMount:c.dataUpdateCount>y.dataUpdateCount||c.errorUpdateCount>y.errorUpdateCount,isFetching:se,isRefetching:se&&!re,isLoadingError:ie&&!we,isPaused:c.fetchStatus==="paused",isPlaceholderData:P,isRefetchError:ie&&we,isStale:be(e,s),refetch:this.refetch,promise:i(this,Q)};if(this.options.experimental_prefetchInRender){const g=J=>{U.status==="error"?J.reject(U.error):U.data!==void 0&&J.resolve(U.data)},$=()=>{const J=f(this,Q,U.promise=Se());g(J)},H=i(this,Q);switch(H.status){case"pending":e.queryHash===r.queryHash&&g(H);break;case"fulfilled":(U.status==="error"||U.data!==H.value)&&$();break;case"rejected":(U.status!=="error"||U.error!==H.reason)&&$();break}}return U}updateResult(e){const s=i(this,w),r=this.createResult(i(this,h),this.options);if(f(this,F,i(this,h).state),f(this,B,this.options),i(this,F).data!==void 0&&f(this,W,i(this,h)),ee(r,s))return;f(this,w,r);const n={},a=()=>{if(!s)return!0;const{notifyOnChangeProps:o}=this.options,l=typeof o=="function"?o():o;if(l==="all"||!l&&!i(this,z).size)return!0;const u=new Set(l??i(this,z));return this.options.throwOnError&&u.add("error"),Object.keys(i(this,w)).some(y=>{const p=y;return i(this,w)[p]!==s[p]&&u.has(p)})};(e==null?void 0:e.listeners)!==!1&&a()&&(n.listeners=!0),m(this,d,Qe).call(this,{...n,...e})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&m(this,d,ce).call(this)}},R=new WeakMap,h=new WeakMap,V=new WeakMap,w=new WeakMap,F=new WeakMap,B=new WeakMap,Q=new WeakMap,A=new WeakMap,G=new WeakMap,K=new WeakMap,W=new WeakMap,q=new WeakMap,L=new WeakMap,D=new WeakMap,z=new WeakMap,d=new WeakSet,N=function(e){m(this,d,de).call(this);let s=i(this,h).fetch(this.options,e);return e!=null&&e.throwOnError||(s=s.catch(Ke)),s},oe=function(){m(this,d,le).call(this);const e=Y(this.options.staleTime,i(this,h));if(ae||i(this,w).isStale||!Oe(e))return;const r=We(i(this,w).dataUpdatedAt,e)+1;f(this,q,setTimeout(()=>{i(this,w).isStale||this.updateResult()},r))},he=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(i(this,h)):this.options.refetchInterval)??!1},ue=function(e){m(this,d,fe).call(this),f(this,D,e),!(ae||k(this.options.enabled,i(this,h))===!1||!Oe(i(this,D))||i(this,D)===0)&&f(this,L,setInterval(()=>{(this.options.refetchIntervalInBackground||ze.isFocused())&&m(this,d,N).call(this)},i(this,D)))},ce=function(){m(this,d,oe).call(this),m(this,d,ue).call(this,m(this,d,he).call(this))},le=function(){i(this,q)&&(clearTimeout(i(this,q)),f(this,q,void 0))},fe=function(){i(this,L)&&(clearInterval(i(this,L)),f(this,L,void 0))},de=function(){const e=i(this,R).getQueryCache().build(i(this,R),this.options);if(e===i(this,h))return;const s=i(this,h);f(this,h,e),f(this,V,e.state),this.hasListeners()&&(s==null||s.removeObserver(this),e.addObserver(this))},Qe=function(e){te.batch(()=>{e.listeners&&this.listeners.forEach(s=>{s(i(this,w))}),i(this,R).getQueryCache().notify({query:i(this,h),type:"observerResultsUpdated"})})},ke);function Xe(t,e){return k(e.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&e.retryOnMount===!1)}function Pe(t,e){return Xe(t,e)||t.state.data!==void 0&&pe(t,e,e.refetchOnMount)}function pe(t,e,s){if(k(e.enabled,t)!==!1){const r=typeof s=="function"?s(t):s;return r==="always"||r!==!1&&be(t,e)}return!1}function Ue(t,e,s,r){return(t!==e||k(r.enabled,t)===!1)&&(!s.suspense||t.state.status!=="error")&&be(t,s)}function be(t,e){return k(e.enabled,t)!==!1&&t.isStaleByTime(Y(e.staleTime,t))}function Ye(t,e){return!ee(t.getCurrentResult(),e)}var M,j,C,T,I,Z,ye,Te,Ze=(Te=class extends Ie{constructor(e,s){super();b(this,I);b(this,M);b(this,j);b(this,C);b(this,T);f(this,M,e),this.setOptions(s),this.bindMethods(),m(this,I,Z).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var r;const s=this.options;this.options=i(this,M).defaultMutationOptions(e),ee(this.options,s)||i(this,M).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,C),observer:this}),s!=null&&s.mutationKey&&this.options.mutationKey&&Ee(s.mutationKey)!==Ee(this.options.mutationKey)?this.reset():((r=i(this,C))==null?void 0:r.state.status)==="pending"&&i(this,C).setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=i(this,C))==null||e.removeObserver(this)}onMutationUpdate(e){m(this,I,Z).call(this),m(this,I,ye).call(this,e)}getCurrentResult(){return i(this,j)}reset(){var e;(e=i(this,C))==null||e.removeObserver(this),f(this,C,void 0),m(this,I,Z).call(this),m(this,I,ye).call(this)}mutate(e,s){var r;return f(this,T,s),(r=i(this,C))==null||r.removeObserver(this),f(this,C,i(this,M).getMutationCache().build(i(this,M),this.options)),i(this,C).addObserver(this),i(this,C).execute(e)}},M=new WeakMap,j=new WeakMap,C=new WeakMap,T=new WeakMap,I=new WeakSet,Z=function(){var s;const e=((s=i(this,C))==null?void 0:s.state)??Ve();f(this,j,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},ye=function(e){te.batch(()=>{var s,r,n,a,o,l,u,y;if(i(this,T)&&this.hasListeners()){const p=i(this,j).variables,c=i(this,j).context;(e==null?void 0:e.type)==="success"?((r=(s=i(this,T)).onSuccess)==null||r.call(s,e.data,p,c),(a=(n=i(this,T)).onSettled)==null||a.call(n,e.data,null,p,c)):(e==null?void 0:e.type)==="error"&&((l=(o=i(this,T)).onError)==null||l.call(o,e.error,p,c),(y=(u=i(this,T)).onSettled)==null||y.call(u,void 0,e.error,p,c))}this.listeners.forEach(p=>{p(i(this,j))})})},Te),De=S.createContext(!1),et=()=>S.useContext(De);De.Provider;function tt(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var st=S.createContext(tt()),rt=()=>S.useContext(st);function Me(t,e){return typeof t=="function"?t(...e):!!t}function je(){}var it=(t,e)=>{(t.suspense||t.throwOnError)&&(e.isReset()||(t.retryOnMount=!1))},nt=t=>{S.useEffect(()=>{t.clearReset()},[t])},at=({result:t,errorResetBoundary:e,throwOnError:s,query:r})=>t.isError&&!e.isReset()&&!t.isFetching&&r&&Me(s,[t.error,r]),ot=t=>{t.suspense&&(t.staleTime===void 0&&(t.staleTime=1e3),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3)))},ht=(t,e)=>t.isLoading&&t.isFetching&&!e,ut=(t,e)=>(t==null?void 0:t.suspense)&&e.isPending,Ae=(t,e,s)=>e.fetchOptimistic(t).catch(()=>{s.clearReset()});function ct(t,e,s){var p,c,P,v,x;const r=_e(),n=et(),a=rt(),o=r.defaultQueryOptions(t);(c=(p=r.getDefaultOptions().queries)==null?void 0:p._experimental_beforeQuery)==null||c.call(p,o),o._optimisticResults=n?"isRestoring":"optimistic",ot(o),it(o,a),nt(a);const l=!r.getQueryCache().get(o.queryHash),[u]=S.useState(()=>new e(r,o)),y=u.getOptimisticResult(o);if(S.useSyncExternalStore(S.useCallback(O=>{const E=n?()=>{}:u.subscribe(te.batchCalls(O));return u.updateResult(),E},[u,n]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),S.useEffect(()=>{u.setOptions(o,{listeners:!1})},[o,u]),ut(o,y))throw Ae(o,u,a);if(at({result:y,errorResetBoundary:a,throwOnError:o.throwOnError,query:r.getQueryCache().get(o.queryHash)}))throw y.error;if((v=(P=r.getDefaultOptions().queries)==null?void 0:P._experimental_afterQuery)==null||v.call(P,o,y),o.experimental_prefetchInRender&&!ae&&ht(y,n)){const O=l?Ae(o,u,a):(x=r.getQueryCache().get(o.queryHash))==null?void 0:x.promise;O==null||O.catch(je).finally(()=>{u.hasListeners()||u.updateResult()})}return o.notifyOnChangeProps?y:u.trackResult(y)}function Fe(t,e){return ct(t,Je)}function lt(t,e){const s=_e(),[r]=S.useState(()=>new Ze(s,t));S.useEffect(()=>{r.setOptions(t)},[r,t]);const n=S.useSyncExternalStore(S.useCallback(o=>r.subscribe(te.batchCalls(o)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),a=S.useCallback((o,l)=>{r.mutate(o,l).catch(je)},[r]);if(n.error&&Me(r.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:a,mutateAsync:n.mutate}}var ft=(t,e,s={})=>{let r=`${t}=${e}`;if(t.startsWith("__Secure-")&&!s.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(t.startsWith("__Host-")){if(!s.secure)throw new Error("__Host- Cookie must have Secure attributes");if(s.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(s.domain)throw new Error("__Host- Cookie must not have Domain attributes")}if(s&&typeof s.maxAge=="number"&&s.maxAge>=0){if(s.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");r+=`; Max-Age=${Math.floor(s.maxAge)}`}if(s.domain&&s.prefix!=="host"&&(r+=`; Domain=${s.domain}`),s.path&&(r+=`; Path=${s.path}`),s.expires){if(s.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");r+=`; Expires=${s.expires.toUTCString()}`}if(s.httpOnly&&(r+="; HttpOnly"),s.secure&&(r+="; Secure"),s.sameSite&&(r+=`; SameSite=${s.sameSite.charAt(0).toUpperCase()+s.sameSite.slice(1)}`),s.partitioned){if(!s.secure)throw new Error("Partitioned Cookie must have Secure attributes");r+="; Partitioned"}return r},dt=(t,e,s)=>(e=encodeURIComponent(e),ft(t,e,s)),pt=(t,e)=>(t=t.replace(/\/+$/,""),t=t+"/",e=e.replace(/^\/+/,""),t+e),me=(t,e)=>{for(const[s,r]of Object.entries(e)){const n=new RegExp("/:"+s+"(?:{[^/]+})?\\??");t=t.replace(n,r?`/${r}`:"")}return t},yt=(t,e)=>{switch(e){case"ws":return t.replace(/^http/,"ws");case"http":return t.replace(/^ws/,"http")}},mt=t=>/^https?:\/\/[^\/]+?\/index$/.test(t)?t.replace(/\/index$/,"/"):t.replace(/\/index$/,"");function X(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function qe(t,e){if(!X(t)&&!X(e))return e;const s={...t};for(const r in e){const n=e[r];X(s[r])&&X(n)?s[r]=qe(s[r],n):s[r]=n}return s}var Le=(t,e)=>new Proxy(()=>{},{get(r,n){if(!(typeof n!="string"||n==="then"))return Le(t,[...e,n])},apply(r,n,a){return t({path:e,args:a})}}),bt=class{constructor(t,e){_(this,"url");_(this,"method");_(this,"queryParams");_(this,"pathParams",{});_(this,"rBody");_(this,"cType");_(this,"fetch",async(t,e)=>{if(t){if(t.query){for(const[l,u]of Object.entries(t.query))if(u!==void 0)if(this.queryParams||(this.queryParams=new URLSearchParams),Array.isArray(u))for(const y of u)this.queryParams.append(l,y);else this.queryParams.set(l,u)}if(t.form){const l=new FormData;for(const[u,y]of Object.entries(t.form))if(Array.isArray(y))for(const p of y)l.append(u,p);else l.append(u,y);this.rBody=l}t.json&&(this.rBody=JSON.stringify(t.json),this.cType="application/json"),t.param&&(this.pathParams=t.param)}let s=this.method.toUpperCase();const r={...(t==null?void 0:t.header)??{},...typeof(e==null?void 0:e.headers)=="function"?await e.headers():e!=null&&e.headers?e.headers:{}};if(t!=null&&t.cookie){const l=[];for(const[u,y]of Object.entries(t.cookie))l.push(dt(u,y,{path:"/"}));r.Cookie=l.join(",")}this.cType&&(r["Content-Type"]=this.cType);const n=new Headers(r??void 0);let a=this.url;a=mt(a),a=me(a,this.pathParams),this.queryParams&&(a=a+"?"+this.queryParams.toString()),s=this.method.toUpperCase();const o=!(s==="GET"||s==="HEAD");return((e==null?void 0:e.fetch)||fetch)(a,{body:o?this.rBody:void 0,method:s,headers:n,...e==null?void 0:e.init})});this.url=t,this.method=e}},vt=(t,e)=>Le(function s(r){var y;const n=[...r.path];if(n[n.length-1]==="toString")return n[n.length-2]==="name"?n[n.length-3]||"":s.toString();if(n[n.length-1]==="valueOf")return n[n.length-2]==="name"?n[n.length-3]||"":s;let a="";if(/^\$/.test(n[n.length-1])){const p=n.pop();p&&(a=p.replace(/^\$/,""))}const o=n.join("/"),l=pt(t,o);if(a==="url")return r.args[0]&&r.args[0].param?new URL(me(l,r.args[0].param)):new URL(l);if(a==="ws"){const p=yt(r.args[0]&&r.args[0].param?me(l,r.args[0].param):l,"ws"),c=new URL(p),P=(y=r.args[0])==null?void 0:y.query;return P&&Object.entries(P).forEach(([x,O])=>{Array.isArray(O)?O.forEach(E=>c.searchParams.append(x,E)):c.searchParams.set(x,O)}),((...x)=>(e==null?void 0:e.webSocket)!==void 0&&typeof e.webSocket=="function"?e.webSocket(...x):new WebSocket(...x))(c.toString())}const u=new bt(l,a);if(a){e??(e={});const p=qe(e,{...r.args[1]??{}});return u.fetch(r.args[0],p)}return u},[]);function gt(t,e){return vt(t,e)}const ve=gt("",{init:{credentials:"include"}});function $e(t){return{...t,createdAt:new Date(t.createdAt),updatedAt:new Date(t.updatedAt)}}function wt(t){return t.map($e)}async function Rt(t){const e=await ve.api.answers.$post({json:t});return e.ok?$e(await e.json()):null}function Pt(){return lt({mutationKey:["save-answer"],mutationFn:Rt,onSuccess:()=>{Ge.invalidateQueries({queryKey:["get-recent-answers"]})}})}async function Ct(){const t=await ve.api.answers.recent.$get();return t.ok?wt(await t.json()):[]}function Ut(){return Fe({queryKey:["get-recent-answers"],queryFn:Ct})}async function St(t){const e=await ve.api.answers.stats.$get({query:{range:t}});if(!e.ok)return[];const{dataPoints:s}=await e.json();return s}const At=t=>Fe({queryKey:["get-stats",t],queryFn:()=>St(t)});export{Pt as a,Ut as b,At as u};