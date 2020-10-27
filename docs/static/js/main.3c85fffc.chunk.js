(this["webpackJsonpmanning-redux"]=this["webpackJsonpmanning-redux"]||[]).push([[0],{31:function(e,t,r){},32:function(e,t,r){},33:function(e,t,r){},34:function(e,t,r){},35:function(e,t,r){},36:function(e,t,r){},37:function(e,t,r){},38:function(e,t,r){},39:function(e,t,r){},40:function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"CHOCOLATE",(function(){return N})),r.d(n,"VANILLA",(function(){return A})),r.d(n,"STRAWBERRY",(function(){return S})),r.d(n,"MOCHA",(function(){return R})),r.d(n,"PISTACHIO",(function(){return F})),r.d(n,"COOKIE_AND_DOUGH",(function(){return w})),r.d(n,"COOKIES_AND_CREAM",(function(){return D})),r.d(n,"SALTED_CARAMEL",(function(){return T}));var c=r(0),a=r(1),o=r(10),s=r.n(o),i=r(8),l=r(4),u=r(5),d=r(7),j=r(6),b=(r(31),function(e){var t=e.title,r=e.children;return Object(c.jsxs)("div",{className:"panel",children:[Object(c.jsx)("div",{className:"panel__title",children:t}),Object(c.jsx)("div",{className:"panel__content",children:r})]})}),O=r(3),p=r(16),f=r.n(p),h=(r(32),function(e){var t,r=e.label,n=e.priority,a=e.className,o=e.size,s=e.onClick,i=e.type,l=void 0===i?"button":i,u=f()("button",(t={},Object(O.a)(t,"button--".concat(n),n),Object(O.a)(t,"button--size-".concat(o),o),t),a);return Object(c.jsx)("button",{className:u,onClick:s,type:l,children:r})});h.defaultProps={priority:"primary",onClick:function(){}};var m,v=h,x=(r(33),function(e){var t=e.flavorName,r=e.scoops,n=e.onClickRestock,a=e.onClickFlavor;return Object(c.jsxs)("div",{className:"freezer-flavor",children:[Object(c.jsxs)("div",{className:"freezer-flavor__inner",onClick:a,children:[Object(c.jsx)("div",{className:"freezer-flavor__scoops-counter",children:r}),Object(c.jsx)("div",{className:"freezer-flavor__name",children:t})]}),Object(c.jsx)(v,{onClick:n,className:"freezer-flavor__restock-button",label:"Restock"})]})}),y=void 0,C=function(e){var t=Object.keys(e.flavors).map((function(t){return Object(c.jsx)(x,{onClickRestock:e.onClickRestock.bind(y,t),onClickFlavor:e.onClickFlavor.bind(y,t),flavorName:t,scoops:e.flavors[t]},t)})),r="Freezer (\xb0".concat(e.temperature,"C)");return e.temperature||(r="Freezer"),Object(c.jsxs)(b,{title:r,children:[Object(c.jsx)(v,{label:"Add product",onClick:e.onClickAddProduct}),Object(c.jsx)("br",{}),t]})},k=r(2),_="UPDATE_TEMPERATURE",g="ADD_PRODUCT_TO_FREEZER",E="REMOVE_SCOOP",N="CHOCOLATE",A="VANILLA",S="STRAWBERRY",R="MOCHA",F="PISTACHIO",w="COOKIE_AND_DOUGH",D="COOKIES_AND_CREAM",T="SALTED_CARAMEL",z={temperature:null,flavors:(m={},Object(O.a)(m,S,10),Object(O.a)(m,T,20),m)};var L=function(e){return{type:_,payload:e}},M=function(e,t){return{type:g,payload:{name:e,amount:t}}},P=function(e){return{type:E,payload:e}},I=function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(){var e;Object(l.a)(this,r);for(var c=arguments.length,a=new Array(c),o=0;o<c;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).handleClickRestock=function(t){var r=parseInt(window.prompt("Enter amount to restock ".concat(t)));isNaN(r)||e.props.addProductToFreezer(t,r)},e.handleClickAddProduct=function(){var t=Object.keys(n),r=window.prompt("Enter flavor name to restock. (Choose from ".concat(t.join(", "),")"));n[r]&&e.handleClickRestock(r)},e.handleClickFlavor=function(t){e.props.removeScoop(t)},e}return Object(u.a)(r,[{key:"componentDidMount",value:function(){var e=this;setInterval((function(){var t=-Math.round(10*Math.random());e.props.updateTemperature(t)}),2e3)}},{key:"render",value:function(){return Object(c.jsx)(C,{flavors:this.props.flavors,temperature:this.props.temperature,onClickRestock:this.handleClickRestock,onClickFlavor:this.handleClickFlavor,onClickAddProduct:this.handleClickAddProduct})}}]),r}(a.Component),H=Object(i.b)((function(e){return{flavors:e.freezer.flavors,temperature:e.freezer.temperature}}),(function(e){return{updateTemperature:function(t){return e(L(t))},addProductToFreezer:function(t,r){return e(M(t,r))},removeScoop:function(t){return e(P(t))}}}))(I),U=(r(34),function(e){var t=e.children;return Object(c.jsx)("div",{className:"grid-row",children:t})}),Y=function(e){var t=e.children,r=e.size;return Object(c.jsx)("div",{className:"grid-col",style:{flex:r},children:t})};Y.defaultProps={size:"1"};r(35);var K=function(e){var t=e.children;return Object(c.jsx)("div",{className:"button-group",children:t})},B=(r(36),{customerName:"",scoops:{},cone:!1}),V=function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(e){var n;return Object(l.a)(this,r),(n=t.call(this,e)).handleFormSubmit=function(e){e.preventDefault(),console.log("Order data:",n.state),n.props.placeOrder(n.state),n.setState(B)},n.handleDecreaseFlavor=function(e){if(n.state.scoops[e])if(1===n.state.scoops[e]){var t=Object(k.a)({},n.state.scoops);delete t[e],n.setState({scoops:t})}else n.setState({scoops:Object(k.a)(Object(k.a)({},n.state.scoops),{},Object(O.a)({},e,n.state.scoops[e]-1))})},n.handleIncreaseFlavor=function(e){n.setState({scoops:Object(k.a)(Object(k.a)({},n.state.scoops),{},Object(O.a)({},e,(n.state.scoops[e]||0)+1))})},n.state=Object(k.a)({},B),n}return Object(u.a)(r,[{key:"render",value:function(){var e=this;return Object(c.jsx)(b,{title:"New order",children:Object(c.jsxs)("form",{className:"new-order-form",onSubmit:this.handleFormSubmit,children:[Object(c.jsxs)(U,{children:[Object(c.jsxs)(Y,{children:[Object(c.jsx)("label",{htmlFor:"customer-name",children:"Customer name"}),Object(c.jsx)("input",{type:"text",id:"customer-name",name:"name",value:this.state.customerName,onChange:function(t){return e.setState({customerName:t.target.value})},autoComplete:"off"})]}),Object(c.jsxs)(Y,{children:[Object(c.jsx)("label",{children:"Container"}),Object(c.jsxs)(K,{children:[Object(c.jsx)(v,{label:"Cup",priority:this.state.cone?"secondary":"primary",onClick:function(){return e.setState({cone:!1})}}),Object(c.jsx)(v,{label:"Cone",priority:this.state.cone?"primary":"secondary",onClick:function(){return e.setState({cone:!0})}})]})]})]}),Object(c.jsx)("label",{children:"Scoops"}),Object(c.jsxs)("table",{className:"new-order-scoops-table",children:[Object(c.jsxs)("colgroup",{children:[Object(c.jsx)("col",{width:"80%"}),Object(c.jsx)("col",{width:"20%"})]}),Object(c.jsx)("tbody",{children:Object.keys(n).map((function(t){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:Object(c.jsx)("strong",{children:t})}),Object(c.jsx)("td",{children:Object(c.jsxs)(K,{children:[Object(c.jsx)(v,{size:"small",label:"-",priority:"primary",onClick:function(){return e.handleDecreaseFlavor(t)}}),Object(c.jsx)(v,{size:"small",label:e.state.scoops[t]||0,priority:"secondary"}),Object(c.jsx)(v,{size:"small",label:"+",priority:"primary",onClick:function(){return e.handleIncreaseFlavor(t)}})]})})]},t)}))})]}),Object(c.jsx)(v,{className:"new-order-submit-button",label:"Add order",type:"submit"})]})})}}]),r}(a.Component),W=r(19),G="PLACE_ORDER",J="FULFILL_ORDER",Q="PAY_FOR_ORDER",Z="CANCEL_ORDER";var q=function(e){var t=e.customerName,r=e.createdAt,n=void 0===r?Date.now():r,c=e.cone,a=void 0===c||c,o=e.scoops;return{type:G,payload:{customerName:t,createdAt:n,cone:a,scoops:o}}},X=function(e){return{type:J,payload:e}},$=function(e){return{type:Q,payload:e}},ee=function(e){return{type:Z,payload:e}},te=Object(i.b)(null,(function(e){return{placeOrder:function(t){return e(q(t))}}}))(V),re=(r(37),["pending","fulfilled","paid"]),ne=function(e){var t=e.customerName,r=(e.createdAt,e.cone),n=e.scoops,a=e.status,o=e.onChangeStatus,s=e.onCancle,i=Object.keys(n).map((function(e){var t=n[e];return Object(c.jsxs)("tr",{className:"order-ticket__flavor",children:[Object(c.jsx)("td",{children:e}),Object(c.jsx)("td",{style:{textAlign:"right"},children:t})]},e)})),l=Object.keys(n).reduce((function(e,t){return e+n[t]}),0);return Object(c.jsxs)("div",{className:"order-ticket",children:[Object(c.jsx)("table",{className:"order-ticket__table",children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{className:"order-ticket__name-and-status",children:[Object(c.jsx)("td",{children:Object(c.jsx)("strong",{className:"order-ticket__name",children:t})}),Object(c.jsx)("td",{children:Object(c.jsx)("select",{className:"order-ticket__status",value:a,onChange:function(e){return o(e.target.value)},children:re.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))})})]}),Object(c.jsx)("tr",{className:"order-ticket__product-info",children:Object(c.jsxs)("td",{colSpan:2,children:[Object(c.jsx)("strong",{children:r?"Cone":"Cup"})," \u2014 ",l," scoops"]})}),i]})}),Object(c.jsx)("button",{onClick:s,children:"Cancle"})]})},ce=function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"handleChangeStatus",value:function(e,t){switch(t){case"fulfilled":this.props.fulfillOrder(e);break;case"paid":this.props.payForOrder(e)}}},{key:"render",value:function(){var e=this;return Object(c.jsx)(b,{title:"Orders",horizontalScroll:!0,children:this.props.orders.map((function(t,r){return Object(c.jsx)(ne,Object(k.a)(Object(k.a)({},t),{},{onChangeStatus:function(t){return e.handleChangeStatus(r,t)},onCancle:function(){return e.props.cancelOrder(r)}}),t.createdAt)}))})}}]),r}(a.Component),ae=Object(i.b)((function(e){return{orders:e.orders}}),(function(e){return{fulfillOrder:function(t){return e(X(t))},payForOrder:function(t){return e($(t))},cancelOrder:function(t){return e(ee(t))}}}))(ce),oe="FETCH_EMPLOYEES_REQUEST",se="FETCH_EMPLOYEES_SUCCESS",ie="FETCH_EMPLOYEES_FAILURE",le={loading:!1,data:[],error:null};var ue=function(){return function(e,t){return e({type:oe}),fetch("/employees.json").then((function(e){return e.json()})).then((function(t){return e({type:se,payload:t})})).catch((function(t){return e({type:ie,payload:t.message})}))}},de=(r(38),function(e){var t=e.photo,r=e.name,n=e.status;return Object(c.jsxs)("tr",{className:"colleague",children:[Object(c.jsx)("td",{children:Object(c.jsx)("img",{className:"colleague__photo",src:t,alt:r})}),Object(c.jsxs)("td",{className:"colleague__info",children:[Object(c.jsx)("div",{className:"colleague__name",children:r}),Object(c.jsx)("div",{className:"colleague__status",children:n})]})]})}),je=function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"render",value:function(){var e;return e=this.props.loading?Object(c.jsx)("p",{children:"Loading..."}):this.props.error?Object(c.jsxs)("p",{children:["Something went wrong when fetching the data: ",Object(c.jsx)("code",{children:this.props.error})]}):Object(c.jsxs)("table",{className:"colleagues-table",children:[Object(c.jsxs)("colgroup",{children:[Object(c.jsx)("col",{width:"0"}),Object(c.jsx)("col",{width:"100%"})]}),Object(c.jsx)("tbody",{children:this.props.data.map((function(e,t){return Object(c.jsx)(de,{photo:e.picture.thumbnail,name:e.name.first,status:e.status},t)}))})]}),Object(c.jsx)(b,{title:"Colleagues",children:e})}}]),r}(a.Component),be=function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"componentDidMount",value:function(){this.props.fetchEmployees()}},{key:"render",value:function(){return Object(c.jsx)(je,Object(k.a)({},this.props.employees))}}]),r}(a.Component),Oe=Object(i.b)((function(e){return{employees:e.employees}}),(function(e){return{fetchEmployees:function(){return e(ue())}}}))(be),pe=(r(39),function(e){Object(d.a)(r,e);var t=Object(j.a)(r);function r(){return Object(l.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"render",value:function(){return Object(c.jsxs)("main",{className:"app",children:[Object(c.jsx)("img",{className:"logo",src:"/logo.svg",alt:"Mister Melty's Ice Cream"}),Object(c.jsxs)(U,{children:[Object(c.jsx)(Y,{children:Object(c.jsx)(H,{})}),Object(c.jsx)(Y,{children:Object(c.jsx)(te,{})})]}),Object(c.jsxs)(U,{children:[Object(c.jsx)(Y,{size:3,children:Object(c.jsx)(ae,{})}),Object(c.jsx)(Y,{size:1,children:Object(c.jsx)(Oe,{})})]})]})}}]),r}(a.Component)),fe=r(9),he=r(17),me=r(18),ve=Object(fe.combineReducers)({freezer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:return Object(k.a)(Object(k.a)({},e),{},{temperature:t.payload});case g:var r=60,n=(e.flavors[t.payload.name]||0)+t.payload.amount;return Object(k.a)(Object(k.a)({},e),{},{flavors:Object(k.a)(Object(k.a)({},e.flavors),{},Object(O.a)({},t.payload.name,Math.min(n,r)))});case E:var c=0,a=e.flavors[t.payload]-1;return Object(k.a)(Object(k.a)({},e),{},{flavors:Object(k.a)(Object(k.a)({},e.flavors),{},Object(O.a)({},t.payload,Math.max(a,c)))});default:return e}},orders:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case G:return[].concat(Object(W.a)(e),[Object(k.a)(Object(k.a)({},t.payload),{},{status:"pending"})]);case J:return e.map((function(e,r){return r===t.payload?Object(k.a)(Object(k.a)({},e),{},{status:"fulfilled"}):e}));case Q:return e.map((function(e,r){return r===t.payload?Object(k.a)(Object(k.a)({},e),{},{status:"paid"}):e}));case Z:return e.filter((function(e,r){return r!==t.payload}));default:return e}},employees:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case oe:return Object(k.a)(Object(k.a)({},e),{},{loading:!0});case se:return Object(k.a)(Object(k.a)({},e),{},{loading:!1,data:t.payload});case ie:return Object(k.a)(Object(k.a)({},e),{},{loading:!1,error:t.payload});default:return e}}}),xe=Object(fe.createStore)(ve,Object(me.composeWithDevTools)(Object(fe.applyMiddleware)(he.a)));setTimeout((function(){xe.dispatch(M(N,15))}),1500),s.a.render(Object(c.jsx)(i.a,{store:xe,children:Object(c.jsx)(pe,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.3c85fffc.chunk.js.map