"use strict";(self.webpackChunkwafflle_video_editor=self.webpackChunkwafflle_video_editor||[]).push([[659],{659:(Lt,R,c)=>{c.r(R),c.d(R,{VideoEditorPageComponent:()=>Nt});var r=c(953),y=c(177);let C;try{C=typeof Intl<"u"&&Intl.v8BreakIterator}catch{C=!1}let E,x=(()=>{class i{constructor(e){this._platformId=e,this.isBrowser=this._platformId?(0,y.UE)(this._platformId):"object"==typeof document&&!!document,this.EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent),this.TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent),this.BLINK=this.isBrowser&&!(!window.chrome&&!C)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT,this.WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT,this.IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window),this.FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent),this.ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT,this.SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT}static#e=this.\u0275fac=function(n){return new(n||i)(r.KVO(r.Agw))};static#t=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function T(i){return function le(){if(null==E&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>E=!0}))}finally{E=E||!1}return E}()?i:!!i.capture}var A=c(254),S=c(337);c(539);var P=c(762);class Ne extends S.y{constructor(t,e){super()}schedule(t,e=0){return this}}let j=(()=>{class i{constructor(e,n=i.now){this.SchedulerAction=e,this.now=n}schedule(e,n=0,o){return new this.SchedulerAction(this,e).schedule(o,n)}}return i.now=()=>Date.now(),i})();class m extends j{constructor(t,e=j.now){super(t,()=>m.delegate&&m.delegate!==this?m.delegate.now():e()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(t,e=0,n){return m.delegate&&m.delegate!==this?m.delegate.schedule(t,e,n):super.schedule(t,e,n)}flush(t){const{actions:e}=this;if(this.active)return void e.push(t);let n;this.active=!0;do{if(n=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,n){for(;t=e.shift();)t.unsubscribe();throw n}}}const Le=new m(class Re extends Ne{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){if(this.closed)return this;this.state=t;const n=this.id,o=this.scheduler;return null!=n&&(this.id=this.recycleAsyncId(o,n,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(o,this.id,e),this}requestAsyncId(t,e,n=0){return setInterval(t.flush.bind(t,this),n)}recycleAsyncId(t,e,n=0){if(null!==n&&this.delay===n&&!1===this.pending)return e;clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const n=this._execute(t,e);if(n)return n;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let o,n=!1;try{this.work(t)}catch(s){n=!0,o=!!s&&s||new Error(s)}if(n)return this.unsubscribe(),o}_unsubscribe(){const t=this.id,e=this.scheduler,n=e.actions,o=n.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==o&&n.splice(o,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null}});class Se{constructor(t,e){this.dueTime=t,this.scheduler=e}call(t,e){return e.subscribe(new Pe(t,this.dueTime,this.scheduler))}}class Pe extends P.v{constructor(t,e,n){super(t),this.dueTime=e,this.scheduler=n,this.debouncedSubscription=null,this.lastValue=null,this.hasValue=!1}_next(t){this.clearDebounce(),this.lastValue=t,this.hasValue=!0,this.add(this.debouncedSubscription=this.scheduler.schedule(je,this.dueTime,this))}_complete(){this.debouncedNext(),this.destination.complete()}debouncedNext(){if(this.clearDebounce(),this.hasValue){const{lastValue:t}=this;this.lastValue=null,this.hasValue=!1,this.destination.next(t)}}clearDebounce(){const t=this.debouncedSubscription;null!==t&&(this.remove(t),t.unsubscribe(),this.debouncedSubscription=null)}}function je(i){i.debouncedNext()}c(728);var k=c(6);function B(i){return Array.isArray(i)?i:[i]}function V(i){return i instanceof r.aKT?i.nativeElement:i}var Ve=c(714),Ke=c(639),He=c(817),We=c(493);class $e{constructor(t){this.total=t}call(t,e){return e.subscribe(new ze(t,this.total))}}class ze extends P.v{constructor(t,e){super(t),this.total=e,this.count=0}_next(t){++this.count>this.total&&this.destination.next(t)}}var Ze=c(176),Ye=c(605);const K=new Set;let f,Xe=(()=>{class i{constructor(e,n){this._platform=e,this._nonce=n,this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):qe}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&function Qe(i,t){if(!K.has(i))try{f||(f=document.createElement("style"),t&&f.setAttribute("nonce",t),f.setAttribute("type","text/css"),document.head.appendChild(f)),f.sheet&&(f.sheet.insertRule(`@media ${i} {body{ }}`,0),K.add(i))}catch(e){console.error(e)}}(e,this._nonce),this._matchMedia(e)}static#e=this.\u0275fac=function(n){return new(n||i)(r.KVO(x),r.KVO(r.BIS,8))};static#t=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function qe(i){return{matches:"all"===i||""===i,media:i,addListener:()=>{},removeListener:()=>{}}}let Je=(()=>{class i{constructor(e,n){this._mediaMatcher=e,this._zone=n,this._queries=new Map,this._destroySubject=new A.B7}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return H(B(e)).some(o=>this._registerQuery(o).mql.matches)}observe(e){const o=H(B(e)).map(a=>this._registerQuery(a).observable);let s=(0,Ve.zV)(o);return s=(0,Ke.x)(s.pipe((0,We.s)(1)),s.pipe(function Ge(i){return t=>t.lift(new $e(i))}(1),function U(i,t=Le){return e=>e.lift(new Se(i,t))}(0))),s.pipe((0,k.T)(a=>{const l={matches:!1,breakpoints:{}};return a.forEach(({matches:h,query:v})=>{l.matches=l.matches||h,l.breakpoints[v]=h}),l}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);const n=this._mediaMatcher.matchMedia(e),s={observable:new He.c(a=>{const l=h=>this._zone.run(()=>a.next(h));return n.addListener(l),()=>{n.removeListener(l)}}).pipe((0,Ze.Z)(n),(0,k.T)(({matches:a})=>({query:e,matches:a})),(0,Ye.Q)(this._destroySubject)),mql:n};return this._queries.set(e,s),s}static#e=this.\u0275fac=function(n){return new(n||i)(r.KVO(Xe),r.KVO(r.SKi))};static#t=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function H(i){return i.map(t=>t.split(",")).reduce((t,e)=>t.concat(e)).map(t=>t.trim())}var _=function(i){return i[i.NONE=0]="NONE",i[i.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",i[i.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",i}(_||{});const z="cdk-high-contrast-black-on-white",Z="cdk-high-contrast-white-on-black",O="cdk-high-contrast-active";let mt=(()=>{class i{constructor(e,n){this._platform=e,this._document=n,this._breakpointSubscription=(0,r.WQX)(Je).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return _.NONE;const e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);const n=this._document.defaultView||window,o=n&&n.getComputedStyle?n.getComputedStyle(e):null,s=(o&&o.backgroundColor||"").replace(/ /g,"");switch(e.remove(),s){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return _.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return _.BLACK_ON_WHITE}return _.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){const e=this._document.body.classList;e.remove(O,z,Z),this._hasCheckedHighContrastMode=!0;const n=this.getHighContrastMode();n===_.BLACK_ON_WHITE?e.add(O,z):n===_.WHITE_ON_BLACK&&e.add(O,Z)}}static#e=this.\u0275fac=function(n){return new(n||i)(r.KVO(x),r.KVO(y.qQ))};static#t=this.\u0275prov=r.jDH({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),Y=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=r.$C({type:i});static#i=this.\u0275inj=r.G2t({})}return i})();const gt=new r.nKC("mat-sanity-checks",{providedIn:"root",factory:function _t(){return!0}});let q=(()=>{class i{constructor(e,n,o){this._sanityChecks=n,this._document=o,this._hasDoneGlobalChecks=!1,e._applyBodyHighContrastModeCssClasses(),this._hasDoneGlobalChecks||(this._hasDoneGlobalChecks=!0)}_checkIsEnabled(e){return!function he(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}()&&("boolean"==typeof this._sanityChecks?this._sanityChecks:!!this._sanityChecks[e])}static#e=this.\u0275fac=function(n){return new(n||i)(r.KVO(mt),r.KVO(gt,8),r.KVO(y.qQ))};static#t=this.\u0275mod=r.$C({type:i});static#i=this.\u0275inj=r.G2t({imports:[Y,Y]})}return i})();var u=function(i){return i[i.FADING_IN=0]="FADING_IN",i[i.VISIBLE=1]="VISIBLE",i[i.FADING_OUT=2]="FADING_OUT",i[i.HIDDEN=3]="HIDDEN",i}();class Tt{constructor(t,e,n,o=!1){this._renderer=t,this.element=e,this.config=n,this._animationForciblyDisabledThroughCss=o,this.state=u.HIDDEN}fadeOut(){this._renderer.fadeOutRipple(this)}}const J=T({passive:!0,capture:!0});class Dt{constructor(){this._events=new Map,this._delegateEventHandler=t=>{const e=function ue(i){return i.composedPath?i.composedPath()[0]:i.target}(t);e&&this._events.get(t.type)?.forEach((n,o)=>{(o===e||o.contains(e))&&n.forEach(s=>s.handleEvent(t))})}}addHandler(t,e,n,o){const s=this._events.get(e);if(s){const a=s.get(n);a?a.add(o):s.set(n,new Set([o]))}else this._events.set(e,new Map([[n,new Set([o])]])),t.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,J)})}removeHandler(t,e,n){const o=this._events.get(t);if(!o)return;const s=o.get(e);s&&(s.delete(n),0===s.size&&o.delete(e),0===o.size&&(this._events.delete(t),document.removeEventListener(t,this._delegateEventHandler,J)))}}const ee={enterDuration:225,exitDuration:150},te=T({passive:!0,capture:!0}),ie=["mousedown","touchstart"],ne=["mouseup","mouseleave","touchend","touchcancel"];class F{static#e=this._eventManager=new Dt;constructor(t,e,n,o){this._target=t,this._ngZone=e,this._platform=o,this._isPointerDown=!1,this._activeRipples=new Map,this._pointerUpEventsRegistered=!1,o.isBrowser&&(this._containerElement=V())}fadeInRipple(t,e,n={}){const o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),s={...ee,...n.animation};n.centered&&(t=o.left+o.width/2,e=o.top+o.height/2);const a=n.radius||function Ct(i,t,e){const n=Math.max(Math.abs(i-e.left),Math.abs(i-e.right)),o=Math.max(Math.abs(t-e.top),Math.abs(t-e.bottom));return Math.sqrt(n*n+o*o)}(t,e,o),l=t-o.left,h=e-o.top,v=s.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=l-a+"px",d.style.top=h-a+"px",d.style.height=2*a+"px",d.style.width=2*a+"px",null!=n.color&&(d.style.backgroundColor=n.color),d.style.transitionDuration=`${v}ms`,this._containerElement.appendChild(d);const oe=window.getComputedStyle(d),se=oe.transitionDuration,N="none"===oe.transitionProperty||"0s"===se||"0s, 0s"===se||0===o.width&&0===o.height,g=new Tt(this,d,n,N);d.style.transform="scale3d(1, 1, 1)",g.state=u.FADING_IN,n.persistent||(this._mostRecentTransientRipple=g);let re=null;return!N&&(v||s.exitDuration)&&this._ngZone.runOutsideAngular(()=>{const ae=()=>this._finishRippleTransition(g),ce=()=>this._destroyRipple(g);d.addEventListener("transitionend",ae),d.addEventListener("transitioncancel",ce),re={onTransitionEnd:ae,onTransitionCancel:ce}}),this._activeRipples.set(g,re),(N||!v)&&this._finishRippleTransition(g),g}fadeOutRipple(t){if(t.state===u.FADING_OUT||t.state===u.HIDDEN)return;const e=t.element,n={...ee,...t.config.animation};e.style.transitionDuration=`${n.exitDuration}ms`,e.style.opacity="0",t.state=u.FADING_OUT,(t._animationForciblyDisabledThroughCss||!n.exitDuration)&&this._finishRippleTransition(t)}fadeOutAll(){this._getActiveRipples().forEach(t=>t.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(t=>{t.config.persistent||t.fadeOut()})}setupTriggerEvents(t){const e=V();!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,ie.forEach(n=>{F._eventManager.addHandler(this._ngZone,n,e,this)}))}handleEvent(t){"mousedown"===t.type?this._onMousedown(t):"touchstart"===t.type?this._onTouchStart(t):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{ne.forEach(e=>{this._triggerElement.addEventListener(e,this,te)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(t){t.state===u.FADING_IN?this._startFadeOutTransition(t):t.state===u.FADING_OUT&&this._destroyRipple(t)}_startFadeOutTransition(t){const e=t===this._mostRecentTransientRipple,{persistent:n}=t.config;t.state=u.VISIBLE,!n&&(!e||!this._isPointerDown)&&t.fadeOut()}_destroyRipple(t){const e=this._activeRipples.get(t)??null;this._activeRipples.delete(t),this._activeRipples.size||(this._containerRect=null),t===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),t.state=u.HIDDEN,null!==e&&(t.element.removeEventListener("transitionend",e.onTransitionEnd),t.element.removeEventListener("transitioncancel",e.onTransitionCancel)),t.element.remove()}_onMousedown(t){const e=function lt(i){return 0===i.buttons||0===i.detail}(t),n=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+800;!this._target.rippleDisabled&&!e&&!n&&(this._isPointerDown=!0,this.fadeInRipple(t.clientX,t.clientY,this._target.rippleConfig))}_onTouchStart(t){if(!this._target.rippleDisabled&&!function dt(i){const t=i.touches&&i.touches[0]||i.changedTouches&&i.changedTouches[0];return!(!t||-1!==t.identifier||null!=t.radiusX&&1!==t.radiusX||null!=t.radiusY&&1!==t.radiusY)}(t)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;const e=t.changedTouches;if(e)for(let n=0;n<e.length;n++)this.fadeInRipple(e[n].clientX,e[n].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(t=>{!t.config.persistent&&(t.state===u.VISIBLE||t.config.terminateOnPointerUp&&t.state===u.FADING_IN)&&t.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){const t=this._triggerElement;t&&(ie.forEach(e=>F._eventManager.removeHandler(e,t,this)),this._pointerUpEventsRegistered&&(ne.forEach(e=>t.removeEventListener(e,this,te)),this._pointerUpEventsRegistered=!1))}}const xt=["*",[["mat-toolbar-row"]]],wt=["*","mat-toolbar-row"];let kt=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275dir=r.FsC({type:i,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"],standalone:!0})}return i})(),Ot=(()=>{class i{constructor(e,n,o){this._elementRef=e,this._platform=n,this._document=o}ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){}static#e=this.\u0275fac=function(n){return new(n||i)(r.rXU(r.aKT),r.rXU(x),r.rXU(y.qQ))};static#t=this.\u0275cmp=r.VBU({type:i,selectors:[["mat-toolbar"]],contentQueries:function(n,o,s){if(1&n&&r.wni(s,kt,5),2&n){let a;r.mGM(a=r.lsd())&&(o._toolbarRows=a)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(n,o){2&n&&(r.HbH(o.color?"mat-"+o.color:""),r.AVh("mat-toolbar-multiple-rows",o._toolbarRows.length>0)("mat-toolbar-single-row",0===o._toolbarRows.length))},inputs:{color:"color"},exportAs:["matToolbar"],standalone:!0,features:[r.aNF],ngContentSelectors:wt,decls:2,vars:0,template:function(n,o){1&n&&(r.NAR(xt),r.SdG(0),r.SdG(1,1))},styles:[".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color:var(--mat-toolbar-container-text-color);--mdc-outlined-button-label-text-color:var(--mat-toolbar-container-text-color)}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],encapsulation:2,changeDetection:0})}return i})(),Ft=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275mod=r.$C({type:i});static#i=this.\u0275inj=r.G2t({imports:[q,q]})}return i})(),Nt=(()=>{class i{static#e=this.\u0275fac=function(n){return new(n||i)};static#t=this.\u0275cmp=r.VBU({type:i,selectors:[["app-video-editor"]],standalone:!0,features:[r.aNF],decls:7,vars:0,consts:[[1,"spacer"],[1,"toolbar__controls"],["type","button",1,"button-round"]],template:function(n,o){1&n&&(r.j41(0,"mat-toolbar")(1,"span"),r.EFF(2,"WAFFLLE"),r.k0s(),r.nrm(3,"div",0),r.j41(4,"div",1)(5,"button",2),r.EFF(6,"Export"),r.k0s()()())},dependencies:[Ft,Ot],styles:[".toolbar__controls[_ngcontent-%COMP%]   .button-round[_ngcontent-%COMP%]{color:#333;background-color:#f5f5f5}.toolbar__controls[_ngcontent-%COMP%]   .button-round[_ngcontent-%COMP%]:hover{background-color:#ddd}"]})}return i})()}}]);