(()=>{"use strict";var e={780:(e,t,n)=>{const r=n(918);class o{constructor(e,t){if(this.maxAge=e,this[Symbol.toStringTag]="Map",this.data=new Map,r(this.data),t)for(const[e,n]of t)this.set(e,n)}get size(){return this.data.size}clear(){this.data.clear()}delete(e){return this.data.delete(e)}has(e){return this.data.has(e)}get(e){const t=this.data.get(e);if(t)return t.data}set(e,t){return this.data.set(e,{maxAge:Date.now()+this.maxAge,data:t}),this}values(){return this.createIterator((e=>e[1].data))}keys(){return this.data.keys()}entries(){return this.createIterator((e=>[e[0],e[1].data]))}forEach(e,t){for(const[n,r]of this.entries())e.apply(t,[r,n,this])}[Symbol.iterator](){return this.entries()}*createIterator(e){for(const t of this.data.entries())yield e(t)}}e.exports=o},918:(e,t,n)=>{const r=n(931);e.exports=function(e,t="maxAge"){let n,o,i;const a=async()=>{if(void 0!==n)return;const a=async a=>{i=r();const s=a[1][t]-Date.now();return s<=0?(e.delete(a[0]),void i.resolve()):(n=a[0],o=setTimeout((()=>{e.delete(a[0]),i&&i.resolve()}),s),"function"==typeof o.unref&&o.unref(),i.promise)};try{for(const t of e)await a(t)}catch(e){}n=void 0},s=e.set.bind(e);return e.set=(t,r)=>{e.has(t)&&e.delete(t);const u=s(t,r);return n&&n===t&&(n=void 0,void 0!==o&&(clearTimeout(o),o=void 0),void 0!==i&&(i.reject(void 0),i=void 0)),a(),u},a(),e}},931:e=>{e.exports=()=>{const e={};return e.promise=new Promise(((t,n)=>{e.resolve=t,e.reject=n})),e}},478:function(e,t){var n=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.setConversationProperty=void 0,t.setConversationProperty=function(e,t,r){return n(this,void 0,void 0,(function*(){yield function(e,t,r,o){return n(this,void 0,void 0,(function*(){return fetch(`https://chat.openai.com/backend-api${r}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(o)})}))}(e,0,`/conversation/${t}`,r)}))}},826:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},o=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},i=this&&this.__asyncValues||function(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(n){t[n]=e[n]&&function(t){return new Promise((function(r,o){!function(e,t,n,r){Promise.resolve(r).then((function(t){e({value:t,done:n})}),t)}(r,o,(t=e[n](t)).done,t.value)}))}}};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchSSE=void 0;const a=n(403),s=n(426);t.fetchSSE=function(e,t){var n,u,c,l;return r(this,void 0,void 0,(function*(){const{onMessage:r}=t,d=o(t,["onMessage"]),f=yield fetch(e,d);if(!f.ok){const e=(yield f.json().catch((()=>({})))).detail||`${f.status} ${f.statusText}`;throw r(e,!0),new Error(e)}const v=(0,a.createParser)((e=>{"event"===e.type&&r(e.data)}));try{for(var y,h=!0,p=i((0,s.streamAsyncIterable)(f.body));y=yield p.next(),!(n=y.done);){l=y.value,h=!1;try{const e=l,t=(new TextDecoder).decode(e);v.feed(t)}finally{h=!0}}}catch(e){u={error:e}}finally{try{h||n||!(c=p.return)||(yield c.call(p))}finally{if(u)throw u.error}}}))}},784:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.generateAnswers=t.cache=t.KEY_ACCESS_TOKEN=void 0;const i=n(826),a=n(429),s=o(n(780)),u=n(478);t.KEY_ACCESS_TOKEN="accessToken",t.cache=new s.default(1e4),t.generateAnswers=function(e,n){return r(this,void 0,void 0,(function*(){const o=yield function(){return r(this,void 0,void 0,(function*(){if(t.cache.get(t.KEY_ACCESS_TOKEN))return t.cache.get(t.KEY_ACCESS_TOKEN);const e=yield fetch("https://chat.openai.com/api/auth/session");if(403===e.status)throw new Error("CLOUDFLARE");const n=yield e.json().catch((()=>({})));if(!n.accessToken)throw new Error("UNAUTHORIZED");return t.cache.set(t.KEY_ACCESS_TOKEN,n.accessToken),n.accessToken}))}();let s;const c=new AbortController;e.onDisconnect.addListener((()=>{c.abort()})),console.log(o),yield(0,i.fetchSSE)("https://chat.openai.com/backend-api/conversation",{method:"POST",signal:c.signal,headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({action:"next",messages:[{id:(0,a.v4)(),role:"user",content:{content_type:"text",parts:[n]}}],model:"text-davinci-002-render",parent_message_id:(0,a.v4)()}),onMessage(t,n){var r,i,a;if(n)return console.log("SSE ERROR",t),void e.postMessage({message:t});{if("[DONE]"===t)return console.log("SSE MESSAGE DONE",t),void(s&&(0,u.setConversationProperty)(o,s,{is_visible:!1}));const n=JSON.parse(t),c=null===(a=null===(i=null===(r=n.message)||void 0===r?void 0:r.content)||void 0===i?void 0:i.parts)||void 0===a?void 0:a[0];s=n.conversation_id,c&&(console.log("TEXT FROM CHATGPT",c),e.postMessage({text:c,messageId:n.message.id,conversationId:n.conversation_id}))}}})}))}},985:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function s(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(784);chrome.contextMenus.create({id:"simplify-gpt",title:"SimplifyGPT",contexts:["selection"]}),chrome.contextMenus.onClicked.addListener(((e,t)=>{console.log(e,t),(null==t?void 0:t.id)&&chrome.tabs.sendMessage(t.id,{type:"SIMPLIFY_GPT",data:e})})),chrome.runtime.onConnect.addListener((e=>{e.onMessage.addListener((t=>r(void 0,void 0,void 0,(function*(){console.log("received msg",t);try{yield(0,o.generateAnswers)(e,t.question)}catch(t){console.error(t),e.postMessage({error:t.message}),o.cache.delete(o.KEY_ACCESS_TOKEN)}}))))}))},426:function(e,t){var n=this&&this.__await||function(e){return this instanceof n?(this.v=e,this):new n(e)},r=this&&this.__asyncGenerator||function(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var o,i=r.apply(e,t||[]),a=[];return o={},s("next"),s("throw"),s("return"),o[Symbol.asyncIterator]=function(){return this},o;function s(e){i[e]&&(o[e]=function(t){return new Promise((function(n,r){a.push([e,t,n,r])>1||u(e,t)}))})}function u(e,t){try{(r=i[e](t)).value instanceof n?Promise.resolve(r.value.v).then(c,l):d(a[0][2],r)}catch(e){d(a[0][3],e)}var r}function c(e){u("next",e)}function l(e){u("throw",e)}function d(e,t){e(t),a.shift(),a.length&&u(a[0][0],a[0][1])}};Object.defineProperty(t,"__esModule",{value:!0}),t.streamAsyncIterable=void 0,t.streamAsyncIterable=function(e){return r(this,arguments,(function*(){const t=e.getReader();try{for(;;){const{done:e,value:r}=yield n(t.read());if(e)return yield n(void 0);yield yield n(r)}}finally{t.releaseLock()}}))}},429:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NIL",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"parse",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"stringify",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"v1",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"v3",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"v4",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"v5",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"validate",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"version",{enumerable:!0,get:function(){return u.default}});var r=f(n(990)),o=f(n(237)),i=f(n(355)),a=f(n(764)),s=f(n(314)),u=f(n(464)),c=f(n(435)),l=f(n(8)),d=f(n(222));function f(e){return e&&e.__esModule?e:{default:e}}},163:(e,t)=>{function n(e){return 14+(e+64>>>9<<4)+1}function r(e,t){const n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function o(e,t,n,o,i,a){return r((s=r(r(t,e),r(o,a)))<<(u=i)|s>>>32-u,n);var s,u}function i(e,t,n,r,i,a,s){return o(t&n|~t&r,e,t,i,a,s)}function a(e,t,n,r,i,a,s){return o(t&r|n&~r,e,t,i,a,s)}function s(e,t,n,r,i,a,s){return o(t^n^r,e,t,i,a,s)}function u(e,t,n,r,i,a,s){return o(n^(t|~r),e,t,i,a,s)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(e){if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=new Uint8Array(t.length);for(let n=0;n<t.length;++n)e[n]=t.charCodeAt(n)}return function(e){const t=[],n=32*e.length,r="0123456789abcdef";for(let o=0;o<n;o+=8){const n=e[o>>5]>>>o%32&255,i=parseInt(r.charAt(n>>>4&15)+r.charAt(15&n),16);t.push(i)}return t}(function(e,t){e[t>>5]|=128<<t%32,e[n(t)-1]=t;let o=1732584193,c=-271733879,l=-1732584194,d=271733878;for(let t=0;t<e.length;t+=16){const n=o,f=c,v=l,y=d;o=i(o,c,l,d,e[t],7,-680876936),d=i(d,o,c,l,e[t+1],12,-389564586),l=i(l,d,o,c,e[t+2],17,606105819),c=i(c,l,d,o,e[t+3],22,-1044525330),o=i(o,c,l,d,e[t+4],7,-176418897),d=i(d,o,c,l,e[t+5],12,1200080426),l=i(l,d,o,c,e[t+6],17,-1473231341),c=i(c,l,d,o,e[t+7],22,-45705983),o=i(o,c,l,d,e[t+8],7,1770035416),d=i(d,o,c,l,e[t+9],12,-1958414417),l=i(l,d,o,c,e[t+10],17,-42063),c=i(c,l,d,o,e[t+11],22,-1990404162),o=i(o,c,l,d,e[t+12],7,1804603682),d=i(d,o,c,l,e[t+13],12,-40341101),l=i(l,d,o,c,e[t+14],17,-1502002290),c=i(c,l,d,o,e[t+15],22,1236535329),o=a(o,c,l,d,e[t+1],5,-165796510),d=a(d,o,c,l,e[t+6],9,-1069501632),l=a(l,d,o,c,e[t+11],14,643717713),c=a(c,l,d,o,e[t],20,-373897302),o=a(o,c,l,d,e[t+5],5,-701558691),d=a(d,o,c,l,e[t+10],9,38016083),l=a(l,d,o,c,e[t+15],14,-660478335),c=a(c,l,d,o,e[t+4],20,-405537848),o=a(o,c,l,d,e[t+9],5,568446438),d=a(d,o,c,l,e[t+14],9,-1019803690),l=a(l,d,o,c,e[t+3],14,-187363961),c=a(c,l,d,o,e[t+8],20,1163531501),o=a(o,c,l,d,e[t+13],5,-1444681467),d=a(d,o,c,l,e[t+2],9,-51403784),l=a(l,d,o,c,e[t+7],14,1735328473),c=a(c,l,d,o,e[t+12],20,-1926607734),o=s(o,c,l,d,e[t+5],4,-378558),d=s(d,o,c,l,e[t+8],11,-2022574463),l=s(l,d,o,c,e[t+11],16,1839030562),c=s(c,l,d,o,e[t+14],23,-35309556),o=s(o,c,l,d,e[t+1],4,-1530992060),d=s(d,o,c,l,e[t+4],11,1272893353),l=s(l,d,o,c,e[t+7],16,-155497632),c=s(c,l,d,o,e[t+10],23,-1094730640),o=s(o,c,l,d,e[t+13],4,681279174),d=s(d,o,c,l,e[t],11,-358537222),l=s(l,d,o,c,e[t+3],16,-722521979),c=s(c,l,d,o,e[t+6],23,76029189),o=s(o,c,l,d,e[t+9],4,-640364487),d=s(d,o,c,l,e[t+12],11,-421815835),l=s(l,d,o,c,e[t+15],16,530742520),c=s(c,l,d,o,e[t+2],23,-995338651),o=u(o,c,l,d,e[t],6,-198630844),d=u(d,o,c,l,e[t+7],10,1126891415),l=u(l,d,o,c,e[t+14],15,-1416354905),c=u(c,l,d,o,e[t+5],21,-57434055),o=u(o,c,l,d,e[t+12],6,1700485571),d=u(d,o,c,l,e[t+3],10,-1894986606),l=u(l,d,o,c,e[t+10],15,-1051523),c=u(c,l,d,o,e[t+1],21,-2054922799),o=u(o,c,l,d,e[t+8],6,1873313359),d=u(d,o,c,l,e[t+15],10,-30611744),l=u(l,d,o,c,e[t+6],15,-1560198380),c=u(c,l,d,o,e[t+13],21,1309151649),o=u(o,c,l,d,e[t+4],6,-145523070),d=u(d,o,c,l,e[t+11],10,-1120210379),l=u(l,d,o,c,e[t+2],15,718787259),c=u(c,l,d,o,e[t+9],21,-343485551),o=r(o,n),c=r(c,f),l=r(l,v),d=r(d,y)}return[o,c,l,d]}(function(e){if(0===e.length)return[];const t=8*e.length,r=new Uint32Array(n(t));for(let n=0;n<t;n+=8)r[n>>5]|=(255&e[n/8])<<n%32;return r}(e),8*e.length))}},790:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};t.default=n},314:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default="00000000-0000-0000-0000-000000000000"},222:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=(r=n(435))&&r.__esModule?r:{default:r};t.default=function(e){if(!(0,o.default)(e))throw TypeError("Invalid UUID");let t;const n=new Uint8Array(16);return n[0]=(t=parseInt(e.slice(0,8),16))>>>24,n[1]=t>>>16&255,n[2]=t>>>8&255,n[3]=255&t,n[4]=(t=parseInt(e.slice(9,13),16))>>>8,n[5]=255&t,n[6]=(t=parseInt(e.slice(14,18),16))>>>8,n[7]=255&t,n[8]=(t=parseInt(e.slice(19,23),16))>>>8,n[9]=255&t,n[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,n[11]=t/4294967296&255,n[12]=t>>>24&255,n[13]=t>>>16&255,n[14]=t>>>8&255,n[15]=255&t,n}},58:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.default=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i},319:(e,t)=>{let n;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!n&&(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(r)};const r=new Uint8Array(16)},757:(e,t)=>{function n(e,t,n,r){switch(e){case 0:return t&n^~t&r;case 1:case 3:return t^n^r;case 2:return t&n^t&r^n&r}}function r(e,t){return e<<t|e>>>32-t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(e){const t=[1518500249,1859775393,2400959708,3395469782],o=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof e){const t=unescape(encodeURIComponent(e));e=[];for(let n=0;n<t.length;++n)e.push(t.charCodeAt(n))}else Array.isArray(e)||(e=Array.prototype.slice.call(e));e.push(128);const i=e.length/4+2,a=Math.ceil(i/16),s=new Array(a);for(let t=0;t<a;++t){const n=new Uint32Array(16);for(let r=0;r<16;++r)n[r]=e[64*t+4*r]<<24|e[64*t+4*r+1]<<16|e[64*t+4*r+2]<<8|e[64*t+4*r+3];s[t]=n}s[a-1][14]=8*(e.length-1)/Math.pow(2,32),s[a-1][14]=Math.floor(s[a-1][14]),s[a-1][15]=8*(e.length-1)&4294967295;for(let e=0;e<a;++e){const i=new Uint32Array(80);for(let t=0;t<16;++t)i[t]=s[e][t];for(let e=16;e<80;++e)i[e]=r(i[e-3]^i[e-8]^i[e-14]^i[e-16],1);let a=o[0],u=o[1],c=o[2],l=o[3],d=o[4];for(let e=0;e<80;++e){const o=Math.floor(e/20),s=r(a,5)+n(o,u,c,l)+d+t[o]+i[e]>>>0;d=l,l=c,c=r(u,30)>>>0,u=a,a=s}o[0]=o[0]+a>>>0,o[1]=o[1]+u>>>0,o[2]=o[2]+c>>>0,o[3]=o[3]+l>>>0,o[4]=o[4]+d>>>0}return[o[0]>>24&255,o[0]>>16&255,o[0]>>8&255,255&o[0],o[1]>>24&255,o[1]>>16&255,o[1]>>8&255,255&o[1],o[2]>>24&255,o[2]>>16&255,o[2]>>8&255,255&o[2],o[3]>>24&255,o[3]>>16&255,o[3]>>8&255,255&o[3],o[4]>>24&255,o[4]>>16&255,o[4]>>8&255,255&o[4]]}},8:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,t.unsafeStringify=a;var r,o=(r=n(435))&&r.__esModule?r:{default:r};const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));function a(e,t=0){return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}t.default=function(e,t=0){const n=a(e,t);if(!(0,o.default)(n))throw TypeError("Stringified UUID is invalid");return n}},990:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=(r=n(319))&&r.__esModule?r:{default:r},i=n(8);let a,s,u=0,c=0;t.default=function(e,t,n){let r=t&&n||0;const l=t||new Array(16);let d=(e=e||{}).node||a,f=void 0!==e.clockseq?e.clockseq:s;if(null==d||null==f){const t=e.random||(e.rng||o.default)();null==d&&(d=a=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==f&&(f=s=16383&(t[6]<<8|t[7]))}let v=void 0!==e.msecs?e.msecs:Date.now(),y=void 0!==e.nsecs?e.nsecs:c+1;const h=v-u+(y-c)/1e4;if(h<0&&void 0===e.clockseq&&(f=f+1&16383),(h<0||v>u)&&void 0===e.nsecs&&(y=0),y>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=v,c=y,s=f,v+=122192928e5;const p=(1e4*(268435455&v)+y)%4294967296;l[r++]=p>>>24&255,l[r++]=p>>>16&255,l[r++]=p>>>8&255,l[r++]=255&p;const _=v/4294967296*1e4&268435455;l[r++]=_>>>8&255,l[r++]=255&_,l[r++]=_>>>24&15|16,l[r++]=_>>>16&255,l[r++]=f>>>8|128,l[r++]=255&f;for(let e=0;e<6;++e)l[r+e]=d[e];return t||(0,i.unsafeStringify)(l)}},237:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(925)),o=i(n(163));function i(e){return e&&e.__esModule?e:{default:e}}var a=(0,r.default)("v3",48,o.default);t.default=a},925:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.URL=t.DNS=void 0,t.default=function(e,t,n){function r(e,r,a,s){var u;if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e));const t=[];for(let n=0;n<e.length;++n)t.push(e.charCodeAt(n));return t}(e)),"string"==typeof r&&(r=(0,i.default)(r)),16!==(null===(u=r)||void 0===u?void 0:u.length))throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let c=new Uint8Array(16+e.length);if(c.set(r),c.set(e,r.length),c=n(c),c[6]=15&c[6]|t,c[8]=63&c[8]|128,a){s=s||0;for(let e=0;e<16;++e)a[s+e]=c[e];return a}return(0,o.unsafeStringify)(c)}try{r.name=e}catch(e){}return r.DNS=a,r.URL=s,r};var r,o=n(8),i=(r=n(222))&&r.__esModule?r:{default:r};const a="6ba7b810-9dad-11d1-80b4-00c04fd430c8";t.DNS=a;const s="6ba7b811-9dad-11d1-80b4-00c04fd430c8";t.URL=s},355:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(790)),o=a(n(319)),i=n(8);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){if(r.default.randomUUID&&!t&&!e)return r.default.randomUUID();const a=(e=e||{}).random||(e.rng||o.default)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=a[e];return t}return(0,i.unsafeStringify)(a)}},764:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n(925)),o=i(n(757));function i(e){return e&&e.__esModule?e:{default:e}}var a=(0,r.default)("v5",80,o.default);t.default=a},435:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=(r=n(58))&&r.__esModule?r:{default:r};t.default=function(e){return"string"==typeof e&&o.default.test(e)}},464:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,o=(r=n(435))&&r.__esModule?r:{default:r};t.default=function(e){if(!(0,o.default)(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)}},403:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=[239,187,191];t.createParser=function(e){let t,r,o,i,a,s,u;return c(),{feed:function(e){r=r?r+e:e,t&&function(e){return n.every(((t,n)=>e.charCodeAt(n)===t))}(r)&&(r=r.slice(n.length)),t=!1;const a=r.length;let s=0,u=!1;for(;s<a;){u&&("\n"===r[s]&&++s,u=!1);let e,t=-1,n=i;for(let i=o;t<0&&i<a;++i)e=r[i],":"===e&&n<0?n=i-s:"\r"===e?(u=!0,t=i-s):"\n"===e&&(t=i-s);if(t<0){o=a-s,i=n;break}o=0,i=-1,l(r,s,n,t),s+=t+1}s===a?r="":s>0&&(r=r.slice(s))},reset:c};function c(){t=!0,r="",o=0,i=-1,a=void 0,s=void 0,u=""}function l(t,n,r,o){if(0===o)return u.length>0&&(e({type:"event",id:a,event:s||void 0,data:u.slice(0,-1)}),u="",a=void 0),void(s=void 0);const i=r<0,c=t.slice(n,n+(i?o:r));let l=0;l=i?o:" "===t[n+r+1]?r+2:r+1;const d=n+l,f=o-l,v=t.slice(d,d+f).toString();if("data"===c)u+=v?"".concat(v,"\n"):"\n";else if("event"===c)s=v;else if("id"!==c||v.includes("\0")){if("retry"===c){const t=parseInt(v,10);Number.isNaN(t)||e({type:"reconnect-interval",value:t})}}else a=v}}}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(985)})();