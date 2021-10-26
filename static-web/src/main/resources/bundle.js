(()=>{var te=typeof window!="undefined"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0;var P=(r,e,t=null)=>{for(;e!==t;){let s=e.nextSibling;r.removeChild(e),e=s}};var v=`{{lit-${String(Math.random()).slice(2)}}}`,se=`<!--${v}-->`,Le=new RegExp(`${v}|${se}`),L="$lit$",R=class{constructor(e,t){this.parts=[],this.element=t;let s=[],n=[],o=document.createTreeWalker(t.content,133,null,!1),i=0,a=-1,d=0,{strings:m,values:{length:g}}=e;for(;d<g;){let c=o.nextNode();if(c===null){o.currentNode=n.pop();continue}if(a++,c.nodeType===1){if(c.hasAttributes()){let b=c.attributes,{length:$}=b,k=0;for(let y=0;y<$;y++)Re(b[y].name,L)&&k++;for(;k-- >0;){let y=m[d],T=F.exec(y)[2],j=T.toLowerCase()+L,E=c.getAttribute(j);c.removeAttribute(j);let w=E.split(Le);this.parts.push({type:"attribute",index:a,name:T,strings:w}),d+=w.length-1}}c.tagName==="TEMPLATE"&&(n.push(c),o.currentNode=c.content)}else if(c.nodeType===3){let b=c.data;if(b.indexOf(v)>=0){let $=c.parentNode,k=b.split(Le),y=k.length-1;for(let T=0;T<y;T++){let j,E=k[T];if(E==="")j=x();else{let w=F.exec(E);w!==null&&Re(w[2],L)&&(E=E.slice(0,w.index)+w[1]+w[2].slice(0,-L.length)+w[3]),j=document.createTextNode(E)}$.insertBefore(j,c),this.parts.push({type:"node",index:++a})}k[y]===""?($.insertBefore(x(),c),s.push(c)):c.data=k[y],d+=y}}else if(c.nodeType===8)if(c.data===v){let b=c.parentNode;(c.previousSibling===null||a===i)&&(a++,b.insertBefore(x(),c)),i=a,this.parts.push({type:"node",index:a}),c.nextSibling===null?c.data="":(s.push(c),a--),d++}else{let b=-1;for(;(b=c.data.indexOf(v,b+1))!==-1;)this.parts.push({type:"node",index:-1}),d++}}for(let c of s)c.parentNode.removeChild(c)}},Re=(r,e)=>{let t=r.length-e.length;return t>=0&&r.slice(t)===e},I=r=>r.index!==-1,x=()=>document.createComment(""),F=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;var re=133;function ne(r,e){let{element:{content:t},parts:s}=r,n=document.createTreeWalker(t,re,null,!1),o=O(s),i=s[o],a=-1,d=0,m=[],g=null;for(;n.nextNode();){a++;let c=n.currentNode;for(c.previousSibling===g&&(g=null),e.has(c)&&(m.push(c),g===null&&(g=c)),g!==null&&d++;i!==void 0&&i.index===a;)i.index=g!==null?-1:i.index-d,o=O(s,o),i=s[o]}m.forEach(c=>c.parentNode.removeChild(c))}var et=r=>{let e=r.nodeType===11?0:1,t=document.createTreeWalker(r,re,null,!1);for(;t.nextNode();)e++;return e},O=(r,e=-1)=>{for(let t=e+1;t<r.length;t++){let s=r[t];if(I(s))return t}return-1};function Ve(r,e,t=null){let{element:{content:s},parts:n}=r;if(t==null){s.appendChild(e);return}let o=document.createTreeWalker(s,re,null,!1),i=O(n),a=0,d=-1;for(;o.nextNode();)for(d++,o.currentNode===t&&(a=et(e),t.parentNode.insertBefore(e,t));i!==-1&&n[i].index===d;){if(a>0){for(;i!==-1;)n[i].index+=a,i=O(n,i);return}i=O(n,i)}}var Ie=new WeakMap,oe=r=>(...e)=>{let t=r(...e);return Ie.set(t,!0),t},N=r=>typeof r=="function"&&Ie.has(r);var f={},H={};var A=class{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(let s of this.__parts)s!==void 0&&s.setValue(e[t]),t++;for(let s of this.__parts)s!==void 0&&s.commit()}_clone(){let e=te?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],s=this.template.parts,n=document.createTreeWalker(e,133,null,!1),o=0,i=0,a,d=n.nextNode();for(;o<s.length;){if(a=s[o],!I(a)){this.__parts.push(void 0),o++;continue}for(;i<a.index;)i++,d.nodeName==="TEMPLATE"&&(t.push(d),n.currentNode=d.content),(d=n.nextNode())===null&&(n.currentNode=t.pop(),d=n.nextNode());if(a.type==="node"){let m=this.processor.handleTextExpression(this.options);m.insertAfterNode(d.previousSibling),this.__parts.push(m)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,a.name,a.strings,this.options));o++}return te&&(document.adoptNode(e),customElements.upgrade(e)),e}};var Oe=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:r=>r}),st=` ${v} `,z=class{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){let e=this.strings.length-1,t="",s=!1;for(let n=0;n<e;n++){let o=this.strings[n],i=o.lastIndexOf("<!--");s=(i>-1||s)&&o.indexOf("-->",i+1)===-1;let a=F.exec(o);a===null?t+=o+(s?st:se):t+=o.substr(0,a.index)+a[1]+a[2]+L+a[3]+v}return t+=this.strings[e],t}getTemplateElement(){let e=document.createElement("template"),t=this.getHTML();return Oe!==void 0&&(t=Oe.createHTML(t)),e.innerHTML=t,e}};var D=r=>r===null||!(typeof r=="object"||typeof r=="function"),W=r=>Array.isArray(r)||!!(r&&r[Symbol.iterator]),U=class{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let n=0;n<s.length-1;n++)this.parts[n]=this._createPart()}_createPart(){return new V(this)}_getValue(){let e=this.strings,t=e.length-1,s=this.parts;if(t===1&&e[0]===""&&e[1]===""){let o=s[0].value;if(typeof o=="symbol")return String(o);if(typeof o=="string"||!W(o))return o}let n="";for(let o=0;o<t;o++){n+=e[o];let i=s[o];if(i!==void 0){let a=i.value;if(D(a)||!W(a))n+=typeof a=="string"?a:String(a);else for(let d of a)n+=typeof d=="string"?d:String(d)}}return n+=e[t],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}},V=class{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==f&&(!D(e)||e!==this.value)&&(this.value=e,N(e)||(this.committer.dirty=!0))}commit(){for(;N(this.value);){let e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}},S=class{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(x()),this.endNode=e.appendChild(x())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=x()),e.__insert(this.endNode=x())}insertAfterPart(e){e.__insert(this.startNode=x()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;N(this.__pendingValue);){let t=this.__pendingValue;this.__pendingValue=f,t(this)}let e=this.__pendingValue;e!==f&&(D(e)?e!==this.value&&this.__commitText(e):e instanceof z?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):W(e)?this.__commitIterable(e):e===H?(this.value=H,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){let t=this.startNode.nextSibling;e=e??"";let s=typeof e=="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){let t=this.options.templateFactory(e);if(this.value instanceof A&&this.value.template===t)this.value.update(e.values);else{let s=new A(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());let t=this.value,s=0,n;for(let o of e)n=t[s],n===void 0&&(n=new S(this.options),t.push(n),s===0?n.appendIntoPart(this):n.insertAfterPart(t[s-1])),n.setValue(o),n.commit(),s++;s<t.length&&(t.length=s,this.clear(n&&n.endNode))}clear(e=this.startNode){P(this.startNode.parentNode,e.nextSibling,this.endNode)}},J=class{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,s.length!==2||s[0]!==""||s[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;N(this.__pendingValue);){let t=this.__pendingValue;this.__pendingValue=f,t(this)}if(this.__pendingValue===f)return;let e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}},K=class extends U{constructor(e,t,s){super(e,t,s);this.single=s.length===2&&s[0]===""&&s[1]===""}_createPart(){return new B(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}},B=class extends V{},Ue=!1;(()=>{try{let r={get capture(){return Ue=!0,!1}};window.addEventListener("test",r,r),window.removeEventListener("test",r,r)}catch(r){}})();var G=class{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=n=>this.handleEvent(n)}setValue(e){this.__pendingValue=e}commit(){for(;N(this.__pendingValue);){let o=this.__pendingValue;this.__pendingValue=f,o(this)}if(this.__pendingValue===f)return;let e=this.__pendingValue,t=this.value,s=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=e!=null&&(t==null||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=rt(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}},rt=r=>r&&(Ue?{capture:r.capture,passive:r.passive,once:r.once}:r.capture);function ie(r){let e=M.get(r.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(r.type,e));let t=e.stringsArray.get(r.strings);if(t!==void 0)return t;let s=r.strings.join(v);return t=e.keyString.get(s),t===void 0&&(t=new R(r,r.getTemplateElement()),e.keyString.set(s,t)),e.stringsArray.set(r.strings,t),t}var M=new Map;var _=new WeakMap,ae=(r,e,t)=>{let s=_.get(e);s===void 0&&(P(e,e.firstChild),_.set(e,s=new S(Object.assign({templateFactory:ie},t))),s.appendInto(e)),s.setValue(r),s.commit()};var le=class{handleAttributeExpressions(e,t,s,n){let o=t[0];return o==="."?new K(e,t.slice(1),s).parts:o==="@"?[new G(e,t.slice(1),n.eventContext)]:o==="?"?[new J(e,t.slice(1),s)]:new U(e,t,s).parts}handleTextExpression(e){return new S(e)}},pe=new le;typeof window!="undefined"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");var l=(r,...e)=>new z(r,e,"html",pe);var qe=(r,e)=>`${r}--${e}`,Q=!0;typeof window.ShadyCSS=="undefined"?Q=!1:typeof window.ShadyCSS.prepareTemplateDom=="undefined"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Q=!1);var ot=r=>e=>{let t=qe(e.type,r),s=M.get(t);s===void 0&&(s={stringsArray:new WeakMap,keyString:new Map},M.set(t,s));let n=s.stringsArray.get(e.strings);if(n!==void 0)return n;let o=e.strings.join(v);if(n=s.keyString.get(o),n===void 0){let i=e.getTemplateElement();Q&&window.ShadyCSS.prepareTemplateDom(i,r),n=new R(e,i),s.keyString.set(o,n)}return s.stringsArray.set(e.strings,n),n},it=["html","svg"],at=r=>{it.forEach(e=>{let t=M.get(qe(e,r));t!==void 0&&t.keyString.forEach(s=>{let{element:{content:n}}=s,o=new Set;Array.from(n.querySelectorAll("style")).forEach(i=>{o.add(i)}),ne(s,o)})})},$e=new Set,lt=(r,e,t)=>{$e.add(r);let s=t?t.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:o}=n;if(o===0){window.ShadyCSS.prepareTemplateStyles(s,r);return}let i=document.createElement("style");for(let m=0;m<o;m++){let g=n[m];g.parentNode.removeChild(g),i.textContent+=g.textContent}at(r);let a=s.content;t?Ve(t,i,a.firstChild):a.insertBefore(i,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,r);let d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&d!==null)e.insertBefore(d.cloneNode(!0),e.firstChild);else if(t){a.insertBefore(i,a.firstChild);let m=new Set;m.add(i),ne(t,m)}},Fe=(r,e,t)=>{if(!t||typeof t!="object"||!t.scopeName)throw new Error("The `scopeName` option is required.");let s=t.scopeName,n=_.has(e),o=Q&&e.nodeType===11&&!!e.host,i=o&&!$e.has(s),a=i?document.createDocumentFragment():e;if(ae(r,a,Object.assign({templateFactory:ot(s)},t)),i){let d=_.get(a);_.delete(a);let m=d.value instanceof A?d.value.template:void 0;lt(s,a,m),P(e,e.firstChild),e.appendChild(a),_.set(e,d)}!n&&o&&window.ShadyCSS.styleElement(e.host)};var He;window.JSCompiler_renameProperty=(r,e)=>r;var ce={toAttribute(r,e){switch(e){case Boolean:return r?"":null;case Object:case Array:return r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){switch(e){case Boolean:return r!==null;case Number:return r===null?null:Number(r);case Object:case Array:return JSON.parse(r)}return r}},De=(r,e)=>e!==r&&(e===e||r===r),he={attribute:!0,type:String,converter:ce,reflect:!1,hasChanged:De},de=1,ue=1<<2,me=1<<3,fe=1<<4,ge="finalized",q=class extends HTMLElement{constructor(){super();this.initialize()}static get observedAttributes(){this.finalize();let e=[];return this._classProperties.forEach((t,s)=>{let n=this._attributeNameForProperty(s,t);n!==void 0&&(this._attributeToPropertyMap.set(n,s),e.push(n))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;let e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((t,s)=>this._classProperties.set(s,t))}}static createProperty(e,t=he){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;let s=typeof e=="symbol"?Symbol():`__${e}`,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){let o=this[e];this[t]=n,this.requestUpdateInternal(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||he}static finalize(){let e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ge)||e.finalize(),this[ge]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){let t=this.properties,s=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(t):[]];for(let n of s)this.createProperty(n,t[n])}}static _attributeNameForProperty(e,t){let s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=De){return s(e,t)}static _propertyValueFromAttribute(e,t){let s=t.type,n=t.converter||ce,o=typeof n=="function"?n:n.fromAttribute;return o?o(e,s):e}static _propertyValueToAttribute(e,t){if(t.reflect===void 0)return;let s=t.type,n=t.converter;return(n&&n.toAttribute||ce.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){let s=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,s)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=he){let n=this.constructor,o=n._attributeNameForProperty(e,s);if(o!==void 0){let i=n._propertyValueToAttribute(t,s);if(i===void 0)return;this._updateState=this._updateState|me,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._updateState=this._updateState&~me}}_attributeToProperty(e,t){if(this._updateState&me)return;let s=this.constructor,n=s._attributeToPropertyMap.get(e);if(n!==void 0){let o=s.getPropertyOptions(n);this._updateState=this._updateState|fe,this[n]=s._propertyValueFromAttribute(t,o),this._updateState=this._updateState&~fe}}requestUpdateInternal(e,t,s){let n=!0;if(e!==void 0){let o=this.constructor;s=s||o.getPropertyOptions(e),o._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),s.reflect===!0&&!(this._updateState&fe)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|ue;try{await this._updatePromise}catch(t){}let e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&ue}get hasUpdated(){return this._updateState&de}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1,t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(s){throw e=!1,this._markUpdated(),s}e&&(this._updateState&de||(this._updateState=this._updateState|de,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~ue}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,s)=>this._propertyToAttribute(s,this[s],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}};He=ge;q[He]=!0;var We=Element.prototype,as=We.msMatchesSelector||We.webkitMatchesSelector;var Y=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ve=Symbol(),X=class{constructor(e,t){if(t!==ve)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(Y?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}},Je=r=>new X(String(r),ve),pt=r=>{if(r instanceof X)return r.cssText;if(typeof r=="number")return r;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${r}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},p=(r,...e)=>{let t=e.reduce((s,n,o)=>s+pt(n)+r[o+1],r[0]);return new X(t,ve)};(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");var Ke={},h=class extends q{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;let e=this.getStyles();if(Array.isArray(e)){let t=(o,i)=>o.reduceRight((a,d)=>Array.isArray(d)?t(d,a):(a.add(d),a),i),s=t(e,new Set),n=[];s.forEach(o=>n.unshift(o)),this._styles=n}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!Y){let s=Array.prototype.slice.call(t.cssRules).reduce((n,o)=>n+o.cssText,"");return Je(s)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){let e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(t=>t.cssText),this.localName):Y?this.renderRoot.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){let t=this.render();super.update(e),t!==Ke&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(s=>{let n=document.createElement("style");n.textContent=s.cssText,this.renderRoot.appendChild(n)}))}render(){return Ke}};h.finalized=!0;h.render=Fe;h.shadowRootOptions={mode:"open"};var Ge=p`
  /* Base colors */
  --pzsh-color-white: #ffffff;
  --pzsh-color-gray-1: #fafafa;
  --pzsh-color-gray-2: #f2f2f2;
  --pzsh-color-gray-3: #d8d8d8;
  --pzsh-color-gray-4: #62676b;
  --pzsh-color-black: #000000;

  /* Puzzle brand colors */
  --pzsh-color-brand-1: #1e5a96;
  --pzsh-color-brand-2: #3b7bbe;
  --pzsh-color-brand-3: #238bca;
  --pzsh-color-brand-4: #3fa8e0;
  --pzsh-color-brand-5: #46bcc0;
  --pzsh-color-brand-6: #2c97a6;
  --pzsh-color-brand-7: #69b978;
  --pzsh-color-brand-8: #61b44b;

  --pzsh-color-brand-alt-1: #dcedf9;
  --pzsh-color-brand-alt-2: #1c2948;
  --pzsh-color-brand-alt-3: #3fa8e0; /* Logo color */
  --pzsh-color-brand-alt-4: #69b978; /* Logo color */

  --pzsh-green: var(--pzsh-color-brand-7);
  --pzsh-blue: var(--pzsh-color-brand-alt-3);

  /* Component colors */
  --pzsh-topbar-bg: var(--pzsh-color-brand-1);
  --pzsh-topbar-bg-alt: var(--pzsh-color-brand-2);
  --pzsh-topbar-fg: var(--pzsh-color-white);
  --pzsh-menu-bg: var(--pzsh-color-white);
  --pzsh-menu-bg-alt: var(--pzsh-color-gray-2);
  --pzsh-menu-fg: var(--pzsh-color-gray-4);
  --pzsh-menu-active: var(--pzsh-color-brand-8);
  --pzsh-menu-divider: var(--pzsh-color-gray-4);
  --pzsh-menu-dropdown-item-bg: var(--pzsh-color-white);
  --pzsh-menu-dropdown-item-bg-alt: var(--pzsh-color-gray-2);
  --pzsh-menu-dropdown-item-fg: var(--pzsh-color-gray-4);
  --pzsh-banner-bg: var(--pzsh-color-brand-alt-1);
  --pzsh-nav-fg: var(--pzsh-color-brand-1);
  --pzsh-nav-active: var(--pzsh-color-brand-8);
  --pzsh-subnav-bg: var(--pzsh-color-white);
  --pzsh-subnav-border: var(--pzsh-color-gray-3);
  --pzsh-subnav-fg: var(--pzsh-color-gray-4);
  --pzsh-subnav-active: var(--pzsh-color-gray-3);
  --pzsh-hero-bg-start: var(--pzsh-banner-bg);
  --pzsh-hero-bg-end: var(--pzsh-color-white);
  --pzsh-footer-bg: var(--pzsh-color-gray-2);
  --pzsh-footer-border: var(--pzsh-color-gray-3);

  /* Fonts */
  --pzsh-font-size-base: 16px;
  --pzsh-font-family: "Roboto", sans-serif;
  --pzsh-monospace-font-family: "Roboto Mono", monospace;

  /* Spacings */
  --pzsh-spacer: 8px;
  --pzsh-page-padding-horizontal-mobile: calc(2 * var(--pzsh-spacer));
  --pzsh-page-padding-horizontal-desktop: calc(6 * var(--pzsh-spacer));
  --pzsh-menu-item-gap: var(--pzsh-spacer);
  --pzsh-menu-item-padding-horizontal: calc(3 * var(--pzsh-spacer));
  --pzsh-menu-item-padding-vertical: calc(2 * var(--pzsh-spacer));
  --pzsh-nav-item-padding-horizontal-desktop: calc(2 * var(--pzsh-spacer));

  /* Sizes */
  --pzsh-breakpoint: 800px;
  --pzsh-logo-height: 32px;
  --pzsh-icon-size: 24px;
  --pzsh-topbar-height: calc(2 * var(--pzsh-spacer) + var(--pzsh-logo-height));
  --pzsh-nav-line-height: 18px;
  --pzsh-nav-height: calc(
    2 * var(--pzsh-nav-item-padding-horizontal-desktop) +
      var(--pzsh-nav-line-height)
  );
  --pzsh-banner-content-height: calc(15 * var(--pzsh-spacer));
  --pzsh-hero-height: calc(20 * var(--pzsh-spacer));

  /* Layering */
  --pzsh-menu-z-index: 1000;
  --pzsh-menu-backdrop-z-index: 999;
  --pzsh-menu-dropdown-z-index: 1000;
`,Qe=p`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400;1,500&family=Roboto+Mono:wght@400;500&display=swap");
`,u=p`
  :host {
    ${Ge}
    ${Qe}
  }

  /* Reset */
  :host,
  :host * {
    box-sizing: border-box;
    font-family: var(--pzsh-font-family);
    font-size: var(--pzsh-font-size-base);
  }
  img,
  svg {
    display: block;
  }
`;function ct(r){let e=document.createElement("style");e.innerText=r,document.querySelector("body").appendChild(e)}ct(p`
  :root {
    ${Ge}
  }
  ${Qe}
`);var be=class extends h{static get styles(){return[u,p`
        :host {
          position: absolute;
          top: var(--pzsh-topbar-height);
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(135, 139, 142, 0.4);
          backdrop-filter: blur(4px);
          z-index: var(--pzsh-menu-backdrop-z-index);
        }
      `]}render(){return l``}};window.customElements.define("pzsh-backdrop",be);var Ye=class{constructor(e){this.classes=new Set,this.changed=!1,this.element=e;let t=(e.getAttribute("class")||"").split(/\s+/);for(let s of t)this.classes.add(s)}add(e){this.classes.add(e),this.changed=!0}remove(e){this.classes.delete(e),this.changed=!0}commit(){if(this.changed){let e="";this.classes.forEach(t=>e+=t+" "),this.element.setAttribute("class",e)}}},Xe=new WeakMap,C=oe(r=>e=>{if(!(e instanceof V)||e instanceof B||e.committer.name!=="class"||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");let{committer:t}=e,{element:s}=t,n=Xe.get(e);n===void 0&&(s.setAttribute("class",t.strings.join(" ")),Xe.set(e,n=new Set));let o=s.classList||new Ye(s);n.forEach(i=>{i in r||(o.remove(i),n.delete(i))});for(let i in r){let a=r[i];a!=n.has(i)&&(a?(o.add(i),n.add(i)):(o.remove(i),n.delete(i)))}typeof o.commit=="function"&&o.commit()});var ye=class extends h{static get properties(){return{hasNav:{attribute:!1},hasSubnav:{attribute:!1}}}static get styles(){return[u,p`
        :host {
          display: flex;
          flex-direction: column;
          background-color: var(--pzsh-banner-bg);
        }
        ::slotted([slot="tangram"]) {
          display: none;
        }
        .content {
          flex: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative; /* Move in front of tangram */
        }
        ::slotted([slot="content"]) {
          flex: auto;
          overflow: hidden;
          margin: var(--pzsh-spacer) calc(2 * var(--pzsh-spacer));
        }

        @media (min-width: 800px) {
          :host {
            position: relative;
            overflow: hidden;
          }
          ::slotted([slot="tangram"]) {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
          }
          ::slotted([slot="content"]) {
            margin: calc(6 * var(--pzsh-spacer)) var(--pzsh-spacer);
          }
          .content.has-nav {
            margin-top: var(--pzsh-nav-height);
          }
          .content.has-subnav {
            margin-top: calc(2 * var(--pzsh-nav-height));
          }
        }
      `]}constructor(){super();this.hasNav=!1,this.hasSubnav=!1,this.handleMenuNavChange=this.handleMenuNavChange.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("pzsh-menu-nav-change",this.handleMenuNavChange,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pzsh-menu-nav-change",this.handleMenuNavChange,!0)}handleMenuNavChange(e){e.stopPropagation();let{hasNav:t,hasSubnav:s}=e.detail;this.hasNav=t,this.hasSubnav=s}render(){return l`
      <slot name="tangram"></slot>
      <div
        class=${C({content:!0,"has-nav":this.hasNav,"has-subnav":this.hasSubnav})}
      >
        <slot name="content"></slot>
      </div>
    `}};window.customElements.define("pzsh-banner",ye);var xe=class extends h{static get styles(){return[u,p`
        :host {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        ::slotted(*) {
          /* Let the content eat the rest */
          flex: auto;
        }
        ::slotted(pzsh-topbar),
        ::slotted(pzsh-banner),
        ::slotted(pzsh-hero),
        ::slotted(pzsh-menu),
        ::slotted(pzsh-footer) {
          flex: none;
        }
      `]}render(){return l` <slot></slot> `}};window.customElements.define("pzsh-container",xe);var we=class extends h{static get styles(){return[u,p`
        :host(pzsh-footer) {
          padding: calc(var(--pzsh-spacer)) calc(6 * var(--pzsh-spacer));
          background-color: var(--pzsh-footer-bg);

          display: flex;
          justify-content: space-between;
          align-items: center;

          border-top: 2px solid var(--pzsh-footer-border);
        }

        ::slotted(*) {
          color: var(--pzsh-color-gray-4);
          font-family: Roboto, sans-serif;
          gap: calc(2 * var(--pzsh-spacer));

          padding-top: var(--pzsh-spacer);
          padding-bottom: var(--pzsh-spacer);

          display: flex;
          flex: 1;
        }

        ::slotted([slot="start"]) {
          align-items: center;
          justify-content: flex-start;
        }

        ::slotted([slot="center"]) {
          align-items: center;
          justify-content: center;
        }

        ::slotted([slot="end"]) {
          align-items: center;
          justify-content: flex-end;
        }

        @media (max-width: 800px) {
          :host(pzsh-footer) {
            padding: calc(var(--pzsh-spacer)) calc(3 * var(--pzsh-spacer));

            display: flex;
            flex-direction: column;

            row-gap: var(--pzsh-spacer);
          }

          ::slotted([slot="start"]) {
            order: 2;
          }

          ::slotted([slot="center"]) {
            order: 1;
          }

          ::slotted([slot="end"]) {
            order: 3;
          }
        }
      `]}render(){return l`
      <slot name="start"></slot>
      <slot name="center"></slot>
      <slot name="end"></slot>
      <slot></slot>
    `}};window.customElements.define("pzsh-footer",we);var ze=class extends h{static get properties(){return{href:{type:String}}}static get styles(){return[u,p`
        a {
          display: flex;
          align-items: center;
          font-family: var(--pzsh-font-family);
          color: var(--pzsh-color-brand-1);
          text-decoration: none;
        }
        a:hover,
        a:active {
          text-decoration: underline;
        }
        ::slotted(pzsh-icon),
        ::slotted(svg) {
          margin-right: calc(var(--pzsh-spacer) / 2);
        }

        @media (max-width: 800px) {
          a {
            margin-left: 0;
            color: var(--pzsh-color-brand-1);
          }
          a:hover,
          a:active {
            background-color: var(--pzsh-topbar-menu-bg-alt);
            text-decoration: none;
          }
        }
      `]}constructor(){super();this.href="#"}render(){return l`<a href="${this.href}">
      <slot></slot>
    </a>`}};window.customElements.define("pzsh-footer-link",ze);var Se=class extends h{static get styles(){return[u,p`
        :host {
          height: var(--pzsh-hero-height);
          padding: 0 var(--pzsh-page-padding-horizontal-mobile);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--pzsh-spacer);
          background: var(--pzsh-hero-bg-start);
          background: linear-gradient(
            180deg,
            var(--pzsh-hero-bg-start) 0%,
            var(--pzsh-hero-bg-end) 100%
          );
        }

        .text {
          max-width: 350px;

          /* Move a bit above mathematical center */
          margin-bottom: calc(2 * var(--pzsh-spacer));
        }
        .logo {
          max-height: var(--pzsh-hero-height);
        }

        ::slotted([slot="title"]),
        ::slotted([slot="slogan"]) {
          font-family: var(--pzsh-font-family);
          font-weight: normal;
          line-height: 1;
        }

        ::slotted([slot="title"]) {
          margin: 0;
          font-size: 32px;
          color: var(--pzsh-color-brand-alt-2);
        }
        ::slotted([slot="slogan"]) {
          margin-top: var(--pzsh-spacer);
          margin-bottom: 0;
          font-size: 18px;
          color: var(--pzsh-color-brand-alt-3);
        }

        @media (min-width: 390px) {
          :host {
            gap: calc(3 * var(--pzsh-spacer));
          }

          .text {
            /* Move a bit above mathematical center */
            margin-bottom: calc(6 * var(--pzsh-spacer));
          }
        }

        @media (min-width: 800px) {
          :host {
            gap: calc(5 * var(--pzsh-spacer));
          }
        }
      `]}render(){return l`
      <div class="text">
        <slot name="title"></slot>
        <slot name="slogan"></slot>
      </div>
      <div class="logo">
        <slot name="logo"></slot>
      </div>
    `}};window.customElements.define("pzsh-hero",Se);var ht={"angle-down":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 9.17a1 1 0 00-1.41 0L12 12.71 8.46 9.17a1 1 0 00-1.41 0 1 1 0 000 1.42l4.24 4.24a1 1 0 001.42 0L17 10.59a1 1 0 000-1.42z"/></svg>
`,"angle-up":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 13.41l-4.29-4.24a1 1 0 00-1.42 0l-4.24 4.24a1 1 0 000 1.42 1 1 0 001.41 0L12 11.29l3.54 3.54a1 1 0 00.7.29 1 1 0 00.71-.29 1 1 0 00.05-1.42z"/></svg>`,bars:l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 8h18a1 1 0 000-2H3a1 1 0 000 2zm18 8H3a1 1 0 000 2h18a1 1 0 000-2zm0-5H3a1 1 0 000 2h18a1 1 0 000-2z"/></svg>`,github:l`<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.247a10 10 0 00-3.162 19.487c.5.088.687-.212.687-.475 0-.237-.012-1.025-.012-1.862-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 00-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 011.538 1.025 2.137 2.137 0 002.912.825 2.104 2.104 0 01.638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 011.025-2.688 3.594 3.594 0 01.1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 015 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 01.1 2.65 3.869 3.869 0 011.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 01.675 1.85c0 1.338-.012 2.413-.012 2.75 0 .263.187.575.687.475A10.005 10.005 0 0012 2.247z"/></svg>`,gitlab:l`<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M21.94 12.865l-1.066-3.28.001.005v-.005l-2.115-6.51a.833.833 0 00-.799-.57.822.822 0 00-.788.576l-2.007 6.178H8.834L6.824 3.08a.822.822 0 00-.788-.575H6.03a.839.839 0 00-.796.575L3.127 9.584l-.002.006.001-.005-1.069 3.28a1.195 1.195 0 00.435 1.34l9.229 6.705.004.003.012.008-.011-.008.002.001.001.001a.466.466 0 00.045.028l.006.004.004.002.003.001h.002l.005.003.025.01.023.01h.001l.004.002.005.002h.002l.006.002h.003c.011.004.022.006.034.009l.013.003h.002l.005.002.007.001h.007a.467.467 0 00.066.006h.001a.469.469 0 00.067-.005h.007l.007-.002.004-.001h.002l.014-.004.034-.008h.002l.006-.003h.002l.005-.002.004-.001h.001l.025-.011.023-.01.005-.002h.002l.003-.002.004-.002.007-.004a.468.468 0 00.044-.027l.004-.003.005-.003 9.23-6.706a1.195 1.195 0 00.434-1.339zm-3.973-9.18l1.81 5.574h-3.62zm-11.937 0L7.843 9.26h-3.62zm-2.984 9.757a.255.255 0 01-.092-.285l.794-2.438 5.822 7.464zm1.494-3.24h3.61l2.573 7.927zm7.165 10.696l-.006-.005-.011-.01-.02-.018.002.001.002.002a.473.473 0 00.043.037l.002.002zm.293-1.894l-1.514-4.665-1.344-4.138h5.72zm.31 1.88l-.01.008-.002.001-.005.005-.012.009.002-.002a.455.455 0 00.043-.036l.001-.002.002-.002zM15.851 10.2h3.61l-.74.947-5.447 6.98zm5.1 3.241l-6.523 4.74 5.824-7.463.791 2.437a.255.255 0 01-.092.286z"/></svg>`,multiply:l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41 12l6.3-6.29a1 1 0 10-1.42-1.42L12 10.59l-6.29-6.3a1 1 0 00-1.42 1.42l6.3 6.29-6.3 6.29a1 1 0 000 1.42 1 1 0 001.42 0l6.29-6.3 6.29 6.3a1 1 0 001.42 0 1 1 0 000-1.42z"/></svg>`,"plus-circle":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm4-9h-3V8a1 1 0 00-2 0v3H8a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2z"/></svg>`,"question-circle":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.29 15.29a1.58 1.58 0 00-.12.15.76.76 0 00-.09.18.64.64 0 00-.06.18 1.36 1.36 0 000 .2.84.84 0 00.08.38.9.9 0 00.54.54.94.94 0 00.76 0 .9.9 0 00.54-.54A1 1 0 0013 16a1 1 0 00-.29-.71 1 1 0 00-1.42 0zM12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm0-13a3 3 0 00-2.6 1.5 1 1 0 101.73 1A1 1 0 0112 9a1 1 0 010 2 1 1 0 00-1 1v1a1 1 0 002 0v-.18A3 3 0 0012 7z"/></svg>`,search:l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1016.61 18l3.68 3.68a1 1 0 001.42 0 1 1 0 000-1.39zM11 18a7 7 0 117-7 7 7 0 01-7 7z"/></svg>`,setting:l`<svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M19.9 12.66a1 1 0 010-1.32l1.28-1.44a1 1 0 00.12-1.17l-2-3.46a1 1 0 00-1.07-.48l-1.88.38a1 1 0 01-1.15-.66l-.61-1.83a1 1 0 00-.95-.68h-4a1 1 0 00-1 .68l-.56 1.83a1 1 0 01-1.15.66L5 4.79a1 1 0 00-1 .48L2 8.73a1 1 0 00.1 1.17l1.27 1.44a1 1 0 010 1.32L2.1 14.1a1 1 0 00-.1 1.17l2 3.46a1 1 0 001.07.48l1.88-.38a1 1 0 011.15.66l.61 1.83a1 1 0 001 .68h4a1 1 0 00.95-.68l.61-1.83a1 1 0 011.15-.66l1.88.38a1 1 0 001.07-.48l2-3.46a1 1 0 00-.12-1.17zM18.41 14l.8.9-1.28 2.22-1.18-.24a3 3 0 00-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 00-3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 000-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 003.45-2L10.36 4h2.56l.38 1.14a3 3 0 003.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 000 3.98zm-6.77-6a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"/></svg>`,"sign-out-alt":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12.59 13l-2.3 2.29a1 1 0 000 1.42 1 1 0 001.42 0l4-4a1 1 0 00.21-.33 1 1 0 000-.76 1 1 0 00-.21-.33l-4-4a1 1 0 10-1.42 1.42l2.3 2.29H3a1 1 0 000 2zM12 2a10 10 0 00-9 5.55 1 1 0 001.8.9A8 8 0 1112 20a7.93 7.93 0 01-7.16-4.45 1 1 0 00-1.8.9A10 10 0 1012 2z"/></svg>`,"sliders-v-alt":l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 8.18V3a1 1 0 00-2 0v5.18a3 3 0 000 5.64V21a1 1 0 002 0v-7.18a3 3 0 000-5.64zM19 12a1 1 0 111-1 1 1 0 01-1 1zm-6 2.18V3a1 1 0 00-2 0v11.18a3 3 0 000 5.64V21a1 1 0 002 0v-1.18a3 3 0 000-5.64zM12 18a1 1 0 111-1 1 1 0 01-1 1zM6 6.18V3a1 1 0 00-2 0v3.18a3 3 0 000 5.64V21a1 1 0 002 0v-9.18a3 3 0 000-5.64zM5 10a1 1 0 111-1 1 1 0 01-1 1z"/></svg>`,user:l`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71 12.71a6 6 0 10-7.42 0 10 10 0 00-6.22 8.18 1 1 0 002 .22 8 8 0 0115.9 0 1 1 0 001 .89h.11a1 1 0 00.88-1.1 10 10 0 00-6.25-8.19zM12 12a4 4 0 114-4 4 4 0 01-4 4z"/></svg>`},_e=class extends h{static get properties(){return{name:{type:String}}}static get styles(){return[u,p`
        :host {
          display: inline-block;
        }
        svg {
          width: 24px;
          height: 24px;
        }
      `]}render(){return l`${ht[this.name]}`}};window.customElements.define("pzsh-icon",_e);function Z(r,e){return r.nodeName.toLowerCase()===e||r.closest(e)!=null}function Ze(r){r.getBoundingClientRect().bottom>window.innerHeight&&r.scrollIntoView(!1),r.getBoundingClientRect().top<0&&r.scrollIntoView()}function ee(r,e){if(e.type==="keydown"&&(e.key==="ArrowUp"||e.key==="ArrowDown")){let t=r(),s=t.findIndex(o=>o===document.activeElement);e.key==="ArrowUp"?s-=1:e.key==="ArrowDown"&&(s+=1);let n=t[s];console.log(t,n),n&&(n.focus(),Ze(n),e.preventDefault())}}var Ce=class extends h{static get properties(){return{open:{attribute:!1}}}static get styles(){return[u,p`
        nav {
          position: absolute;
          top: var(--pzsh-topbar-height);
          left: 0;
          right: 0;
          display: none;
          overflow: hidden;
          padding: calc(2 * var(--pzsh-spacer) - var(--pzsh-menu-item-gap))
            calc(3 * var(--pzsh-spacer)) calc(2 * var(--pzsh-spacer))
            calc(3 * var(--pzsh-spacer));
          background-color: var(--pzsh-menu-bg);
          box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
          z-index: var(--pzsh-menu-z-index);
        }
        nav.open {
          display: block;
        }

        ::slotted([slot="actions"]) {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 800px) {
          nav {
            display: block; /* Always visible even when "closed" */
            position: static;
            padding: 0;
            background-color: transparent;
            box-shadow: none;
          }

          /* Display the nav on the desktop in the banner using absolute positioning */
          ::slotted([slot="nav"]) {
            position: absolute;
            top: var(--pzsh-topbar-height);
            left: 0;
            right: 0;
          }

          /* Display the menu actions on desktop in the topbar using absolute positioning */
          ::slotted([slot="actions"]) {
            position: absolute;
            top: 0;
            right: calc(6 * var(--pzsh-spacer));
            z-index: var(--pzsh-menu-z-index);
            height: var(--pzsh-topbar-height);
            flex-direction: row;
            align-items: center;
            gap: calc(3 * var(--pzsh-spacer));
          }
        }
      `]}constructor(){super();this.available=!1,this.open=!1,this.hasNav=!1,this.hasSubnav=!1,this.toggleMenu=this.toggleMenu.bind(this),this.handleEvent=this.handleEvent.bind(this),this.actionsObserver=new MutationObserver(e=>e.forEach(this.handleActionsChange.bind(this)))}connectedCallback(){super.connectedCallback(),document.addEventListener("pzsh-menu-toggle",this.toggleMenu,!0),document.addEventListener("click",this.handleEvent,!0),document.addEventListener("keydown",this.handleEvent,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pzsh-menu-toggle",this.toggleMenu,!0),document.removeEventListener("click",this.handleEvent,!0),document.removeEventListener("keydown",this.handleEvent,!0)}toggleMenu(e){e?.stopPropagation(),this.open=!this.open,this.toggleBackdrop(this.open),this.triggerMenuChange(this.available,this.open)}toggleBackdrop(){let e=document.querySelector("pzsh-backdrop");e&&e.remove(),this.open&&document.querySelector("body").appendChild(document.createElement("pzsh-backdrop"))}handleEvent(e){this.handleMenuClose(e),this.handleMenuNavigation(e)}handleMenuClose(e){this.open&&(e.type==="click"&&!Z(e.target,"pzsh-topbar")||e.type==="keydown"&&e.key==="Escape")&&this.toggleMenu()}handleMenuNavigation(e){this.open&&ee(this.getMenuItems.bind(this),e)}getMenuItems(){let e=this.querySelectorAll("[slot='nav'] pzsh-nav-item"),t=this.querySelector("[slot='actions']")?.children||[];return[...e,...t].reduce((s,n)=>n.nodeName.toLowerCase()==="pzsh-menu-dropdown"?[...s,...n.querySelector('[slot="items"]').children].filter(o=>o.nodeName.toLowerCase()!=="pzsh-menu-divider"):(s.push(n),s),[])}handleSlotChange(e){let t=e.target;this.updateMenuAvailablity(),t.getAttribute("name")==="nav"&&this.updateNavAvailability(),t.getAttribute("name")==="actions"&&t.assignedNodes().forEach(s=>this.actionsObserver.observe(s,{childList:!0}))}handleActionsChange(){this.updateMenuAvailablity()}updateMenuAvailablity(){let e=this.hasMenuItems();e!==this.available&&this.triggerMenuChange(e,this.open),this.available=e}hasMenuItems(){let e=this.shadowRoot.querySelector('slot[name="nav"]'),t=this.shadowRoot.querySelector('slot[name="actions"]'),s=this.shadowRoot.querySelector('slot[name="items"]');return e.assignedNodes().length>0||t.assignedNodes()[0]?.children?.length>0||s.assignedNodes().length>0}triggerMenuChange(e,t){this.dispatchEvent(new CustomEvent("pzsh-menu-change",{detail:{available:e,open:t}}))}updateNavAvailability(){let e=this.shadowRoot.querySelector('slot[name="nav"]'),t=e.assignedNodes().length>0,s=e.assignedNodes()[0]?.querySelector("pzsh-subnav")!=null;(t!==this.hasNav||s!==this.hasSubnav)&&this.triggerNavChange(t,s),this.hasNav=t,this.hasSubnav=s}triggerNavChange(e,t){this.dispatchEvent(new CustomEvent("pzsh-menu-nav-change",{detail:{hasNav:e,hasSubnav:t}}))}render(){let e={open:this.open};return l`
      <nav
        class=${C(e)}
        @slotchange=${this.handleSlotChange}
        role="menu"
      >
        <slot name="nav"></slot>
        <slot name="actions"></slot>
        <slot name="items"></slot>
      </nav>
    `}};customElements.define("pzsh-menu",Ce);var ke=class extends h{static get properties(){return{href:{type:String}}}static get styles(){return[u,p`
        a {
          display: flex;
          align-items: center;
          font-family: var(--pzsh-font-family);
          margin-top: var(--pzsh-menu-item-gap);
          padding: var(--pzsh-menu-item-padding-vertical)
            var(--pzsh-menu-item-padding-horizontal);
          background-color: var(--pzsh-menu-bg-alt);
          color: var(--pzsh-menu-fg);
          text-decoration: none;
          white-space: nowrap;
        }
        :host(:focus) a,
        a:hover,
        a:active,
        a:focus {
          color: var(--pzsh-menu-active);
        }
        ::slotted(pzsh-icon),
        ::slotted(svg) {
          margin-right: calc(var(--pzsh-spacer) / 2);
        }

        @media (min-width: 800px) {
          a {
            margin: 0;
            padding: 0;
            color: var(--pzsh-topbar-fg);
            background: transparent;
          }
          :host(:focus) a,
          a:hover,
          a:active,
          a:focus {
            color: var(--pzsh-topbar-fg);
            text-decoration: underline;
          }
        }
      `]}constructor(){super();this.href="#"}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}render(){return l`<a href="${this.href}" role="menuitem">
      <slot></slot>
    </a>`}};window.customElements.define("pzsh-menu-action",ke);var Ee=class extends h{static get styles(){return[u,p`
        @media (max-width: 799px) {
          :host {
            margin: calc(3 * var(--pzsh-spacer)) 0;
            border-top: 1px solid var(--pzsh-menu-divider);
          }
        }
      `]}};window.customElements.define("pzsh-menu-divider",Ee);var Pe=class extends h{static get properties(){return{open:{attribute:!1}}}static get styles(){return[u,p`
        :host {
          position: relative;
          margin-top: var(--pzsh-spacer);
        }

        .toggle {
          display: flex; /* TODO: How does this work in today's browsers? */
          align-items: center;
          width: 100%;
          border: 0;
          padding: var(--pzsh-menu-item-padding-vertical)
            var(--pzsh-menu-item-padding-horizontal);
          color: var(--pzsh-color-gray-4);
          background-color: transparent;
        }

        .toggle-angle {
          display: none;
        }

        ::slotted([slot="toggle"]) {
          display: flex;
          align-items: center;
          gap: calc(var(--pzsh-spacer) / 2);
          font-family: var(--pzsh-font-family);
          font-size: 1rem;
        }

        .dropdown-menu {
          margin-top: calc(-1 * var(--pzsh-menu-item-gap));
        }

        @media (min-width: 800px) {
          :host {
            margin: 0;
          }

          .toggle {
            width: auto;
            padding: 0;
            color: var(--pzsh-topbar-fg);
          }

          .toggle-angle {
            display: block;
          }

          .dropdown-menu {
            display: none;
            position: absolute;
            top: 100%;
            right: 0;
            z-index: var(--pzsh-menu-dropdown-z-index);
            margin-top: calc(var(--pzsh-spacer) / 2);
            border: 1px solid var(--pzsh-color-gray-3);
            border-radius: 4px;
            padding: var(--pzsh-spacer) 0;
            background-color: var(--pzsh-menu-dropdown-item-bg);
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
          }
          .dropdown-menu.open {
            display: block;
          }
        }
      `]}constructor(){super();this.open=!1,this.handleEvent=this.handleEvent.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.handleEvent,!0),document.addEventListener("keydown",this.handleEvent,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleEvent,!0),document.removeEventListener("keydown",this.handleEvent,!0)}handleEvent(e){this.handleMenuClose(e),this.handleMenuNavigation(e)}handleMenuClose(e){this.open&&(e.type==="click"&&!Z(e.target,'pzsh-menu-dropdown [slot="toggle"]')||e.type==="keydown"&&e.key==="Escape")&&this.toggleMenu()}handleMenuNavigation(e){this.open&&ee(()=>[...this.querySelector("[slot='items']").children],e)}toggleMenu(){this.open=!this.open}render(){let e=this.open?"angle-up":"angle-down";return l`
      <button
        type="button"
        class="toggle"
        @click=${this.toggleMenu}
        aria-expanded=${this.open}
      >
        <slot name="toggle"></slot>
        <pzsh-icon class="toggle-angle" name=${e}></pzsh-icon>
      </button>
      <div
        class=${C({"dropdown-menu":!0,open:this.open})}
        role="menu"
      >
        <slot name="items"></slot>
      </div>
    `}};window.customElements.define("pzsh-menu-dropdown",Pe);var Ne=class extends h{static get properties(){return{href:{type:String}}}static get styles(){return[u,p`
        :host {
          display: block;
        }
        a {
          display: flex;
          align-items: center;
          font-family: var(--pzsh-font-family);
          margin-top: var(--pzsh-menu-item-gap);
          padding: var(--pzsh-menu-item-padding-vertical)
            var(--pzsh-menu-item-padding-horizontal)
            var(--pzsh-menu-item-padding-vertical)
            calc(
              var(--pzsh-icon-size) + var(--pzsh-spacer) / 2 +var(--pzsh-menu-item-padding-horizontal)
            );
          color: var(--pzsh-menu-fg);
          background-color: var(--pzsh-menu-bg-alt);
          text-decoration: none;
          white-space: nowrap;
        }
        :host(:focus) a,
        a:hover,
        a:active,
        a:focus {
          color: var(--pzsh-menu-active);
        }
        ::slotted(pzsh-icon),
        ::slotted(svg) {
          margin-right: calc(var(--pzsh-spacer) / 2);
        }

        @media (min-width: 800px) {
          a {
            margin: 0;
            padding: var(--pzsh-menu-item-padding-vertical)
              var(--pzsh-menu-item-padding-horizontal);
            color: var(--pzsh-menu-dropdown-item-fg);
            background-color: transparent;
          }
          :host(:focus) a,
          a:hover,
          a:active,
          a:focus {
            color: var(--pzsh-menu-dropdown-item-fg);
            background-color: var(--pzsh-menu-dropdown-item-bg-alt);
          }
        }
      `]}constructor(){super();this.href="#"}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}render(){return l`<a href="${this.href}" role="menuitem">
      <slot></slot>
    </a>`}};window.customElements.define("pzsh-menu-dropdown-item",Ne);var Ae=class extends h{static get styles(){return[u,p`
        nav {
          display: flex;
          flex-direction: column;
          background-color: var(--pzsh-menu-bg);
        }

        @media (min-width: 800px) {
          nav {
            flex-direction: row;
            flex-wrap: wrap;
            background-color: transparent;
          }
        }
      `]}render(){return l`
      <nav>
        <slot></slot>
      </nav>
    `}};customElements.define("pzsh-nav",Ae);var Me=class extends h{static get properties(){return{href:{type:String},active:{type:Boolean}}}static get styles(){return[u,p`
        a {
          display: block;
          margin-top: var(--pzsh-menu-item-gap);
          padding: var(--pzsh-menu-item-padding-vertical)
            var(--pzsh-menu-item-padding-horizontal);
          color: var(--pzsh-menu-fg);
          background-color: var(--pzsh-menu-bg-alt);
          text-decoration: none;
          white-space: nowrap;
        }
        :host(:focus) a,
        a:hover,
        a:active,
        a:focus {
          color: var(--pzsh-menu-active);
        }

        @media (min-width: 800px) {
          :host {
            line-height: var(--pzsh-nav-line-height);
          }
          a {
            margin: 0;
            padding: 0 var(--pzsh-nav-item-padding-horizontal-desktop);
            color: var(--pzsh-nav-fg);
            background-color: transparent;
          }
          a,
          :host(:focus) a,
          a:hover,
          a:active,
          a:focus {
            color: var(--pzsh-nav-fg);
          }
          a > div {
            padding: var(--pzsh-nav-item-padding-horizontal-desktop) 0
              calc(var(--pzsh-nav-item-padding-horizontal-desktop) - 5px) 0;
            border-bottom: 5px solid transparent;
          }
          :host(:focus) a > div,
          a:hover > div,
          a:active > div,
          a:focus > div,
          a.active > div {
            border-color: var(--pzsh-nav-active);
          }
        }
      `]}constructor(){super();this.href="#",this.active=!1}connectedCallback(){super.connectedCallback(),this.hasAttribute("tabindex")||this.setAttribute("tabindex",0)}render(){return l`<a
      class=${C({active:this.active})}
      href="${this.href}"
      role="menuitem"
      part="pzsh-nav-item"
    >
      <div><slot></slot></div>
    </a>`}};customElements.define("pzsh-nav-item",Me);var Te=class extends h{static get styles(){return[u,p`
        :host {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 800px) {
          :host {
            width: 100%;
            order: 1;
            flex-direction: row;
            background-color: var(--pzsh-subnav-bg);
            border-bottom: 1px solid var(--pzsh-subnav-border);
          }
          ::slotted(pzsh-nav-item) {
            --pzsh-nav-fg: var(--pzsh-subnav-fg);
            --pzsh-nav-active: var(--pzsh-subnav-active);
          }
        }
      `]}render(){return l` <slot></slot> `}};customElements.define("pzsh-subnav",Te);var je=class extends h{static get properties(){return{menuAvailable:{attribute:!1},menuOpen:{attribute:!1},href:{type:String}}}static get styles(){return[u,p`
        :host {
          display: flex;
          align-items: center;
          height: var(--pzsh-topbar-height);
          padding: calc(var(--pzsh-spacer))
            var(--pzsh-page-padding-horizontal-mobile);
          background: var(--pzsh-topbar-bg);
        }

        a.logo-link {
          display: flex; /* Fix vertical centering */
        }

        .menu-button {
          margin-left: auto;
          padding: var(--pzsh-spacer);
          border: 0;
          border-radius: 3px;
          background-color: transparent;
          color: var(--pzsh-topbar-fg);
          cursor: pointer;
        }
        .menu-button:hover {
          background-color: var(--pzsh-topbar-bg-alt);
        }
        .menu-button pzsh-icon {
          display: block;
        }

        @media (max-width: 799px) {
          :host {
            margin-bottom: 0 !important;
          }
        }

        @media (min-width: 800px) {
          :host {
            padding-left: var(--pzsh-page-padding-horizontal-desktop);
            padding-right: var(--pzsh-page-padding-horizontal-desktop);
          }

          .menu-button {
            display: none;
          }
        }
      `]}constructor(){super();this.menuAvailable=!1,this.menuOpen=!1,this.handleMenuChange=this.handleMenuChange.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("pzsh-menu-change",this.handleMenuChange,!0)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("pzsh-menu-change",this.handleMenuChange,!0)}handleMenuChange(e){e.stopPropagation();let{available:t,open:s}=e.detail;this.menuAvailable=t,this.menuOpen=s}toggleMenu(){this.dispatchEvent(new CustomEvent("pzsh-menu-toggle"))}renderMenuButton(){if(this.menuAvailable){let e=this.menuOpen?"multiply":"bars";return l`<button
        type="button"
        class="menu-button"
        @click=${this.toggleMenu}
        aria-expanded=${this.menuOpen}
      >
        <pzsh-icon name=${e}></pzsh-icon>
      </button>`}return null}renderLogo(){return this.href?l`<a class="logo-link" href=${this.href}>
          <slot></slot>
        </a>`:l`<slot></slot>`}render(){return l`${this.renderLogo()} ${this.renderMenuButton()} `}};window.customElements.define("pzsh-topbar",je);})();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
//# sourceMappingURL=bundle.js.map
