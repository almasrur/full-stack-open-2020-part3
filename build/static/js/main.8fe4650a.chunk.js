(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),u=t(4),i=t(2),l=function(e){var n=e.persons,t=e.handleDeletePerson;return r.a.createElement(r.a.Fragment,null,n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number," ","",r.a.createElement("button",{onClick:function(){return t(e)}},"delete"))})))},m=function(e){var n=e.filterString,t=e.onChange;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},f=function(e){return r.a.createElement("form",{onSubmit:e.onSubmit},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.name,onChange:e.onNameChange})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:e.number,onChange:e.onNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=t(3),d=t.n(s),h="/api/persons",b=function(){return d.a.get(h).then((function(e){return e.data}))},p=function(e){return d.a.post(h,e).then((function(e){return e.data}))},v=function(e){return d.a.put("".concat(h,"/").concat(e.id),e).then((function(e){return e.data}))},g=function(e){return d.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},E=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.type},n.message)},O=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),s=Object(i.a)(c,2),d=s[0],h=s[1],O=Object(a.useState)(""),j=Object(i.a)(O,2),w=j[0],C=j[1],S=Object(a.useState)(""),k=Object(i.a)(S,2),y=k[0],N=k[1],D=Object(a.useState)(null),P=Object(i.a)(D,2),x=P[0],I=P[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);var J=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";I({message:e,type:n}),setTimeout((function(){I(null)}),5e3)},L=y?t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(y.toLowerCase())})):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{notification:x}),r.a.createElement(m,{filterString:y,onChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(f,{onSubmit:function(e){e.preventDefault();var n={name:d,number:w};if(t.some((function(e){return e.name===d}))){var a=window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?")),r=t.find((function(e){return e.name===d})),c=Object(u.a)(Object(u.a)({},r),{},{number:w});a&&v(c).then((function(e){o(t.map((function(n){return n.name!==d?n:e}))),J("Changed ".concat(d))})).catch((function(e){o(t.filter((function(e){return e.name!==d}))),J("Information of ".concat(d,"  has already been removed from the server"),"error")}))}else p(n).then((function(e){console.log("hi"),o(t.concat(e)),J("Added ".concat(d))})).catch((function(e){console.log("hi"),console.log(e.response.data.error),J("".concat(e.response.data.error),"error")}));h(""),C("")},name:d,onNameChange:function(e){h(e.target.value)},number:w,onNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(l,{persons:L,handleDeletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&g(e.id).then((function(n){o(t.filter((function(n){return n.name!==e.name}))),J("deleted ".concat(e.name))}))}}))};t(37);c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.8fe4650a.chunk.js.map