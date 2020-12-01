(this["webpackJsonpsrg-web"]=this["webpackJsonpsrg-web"]||[]).push([[0],{79:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var a=n(4),i=n(0),r=n.n(i),s=n(11),c=n.n(s),o=(n(79),n(30)),l=n.n(o),h=n(39),j=n(40),u=n(23),b=n(24),p=n(20),d=n(26),m=n(25),f=n(120),O=n(124),x=n(125),g=n(132),y=n(127),v=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).handleChange=e.handleChange.bind(Object(p.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(p.a)(e)),e}return Object(b.a)(n,[{key:"handleChange",value:function(e){var t=e.target.name,n=e.target.value;"member_emails"===t?this.setState({member_emails:n.split(/\r?\n/)}):"member_names"===t?this.setState({member_names:n.split(/\r?\n/)}):"deadline"===t?this.setState({deadline:Date.parse(n)/1e3}):"grpSize"===t?this.setState({grpSize:parseInt(n)}):this.setState(Object(j.a)({},t,n))}},{key:"handleSubmit",value:function(){var e=Object(h.a)(l.a.mark((function e(t){var n,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)},fetch("http://13.92.86.43:80/create",n).then((function(e){return e.json()})).then((function(e){a.props.history.push("/Done")})).catch((function(e){console.info(e+"------err------")}));case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(a.jsxs)("div",{id:"main",children:[Object(a.jsxs)("div",{style:{"margin-left":"40px"},children:[Object(a.jsx)("br",{}),"How to use:",Object(a.jsx)("br",{}),Object(a.jsxs)(f.a,{children:[Object(a.jsx)(O.a,{children:"Fill out this Form"}),Object(a.jsx)(O.a,{children:"App sends out a form to all members to fill out their preferences."}),Object(a.jsx)(O.a,{children:"Once done (or deadline reached), the app will form you and the members groups and send emails to informing people of their groups"})]})]}),Object(a.jsx)("br",{}),Object(a.jsx)(x.a,{container:!0,spacing:0,direction:"column",alignItems:"left",style:{minHeight:"100vh",margin:"40px"},children:Object(a.jsxs)("form",{id:"mainForm",onSubmit:this.handleSubmit,children:[Object(a.jsx)("p",{children:"Your Name"}),Object(a.jsx)(g.a,{name:"owner_name",type:"text",required:!0,"data-parse":"uppercase",onChange:this.handleChange}),Object(a.jsx)("p",{children:"Your Email"}),Object(a.jsx)(g.a,{name:"owner_email",type:"email",required:!0,onChange:this.handleChange}),Object(a.jsx)("p",{children:"Title of Project"}),Object(a.jsx)(g.a,{name:"title",type:"text",required:!0,onChange:this.handleChange}),Object(a.jsx)("p",{children:"Max Group Size"}),Object(a.jsx)(g.a,{name:"grpSize",type:"number",InputProps:{inputProps:{min:0}},required:!0,onChange:this.handleChange}),Object(a.jsx)("p",{children:"The Deadline for Group Formation"}),Object(a.jsx)(g.a,{name:"deadline",type:"date",required:!0,onChange:this.handleChange}),Object(a.jsx)("p",{children:"Names of Members seperated by newline"}),Object(a.jsx)(g.a,{multiline:!0,required:!0,rowsMax:10,onChange:this.handleChange,label:"Member Names",variant:"outlined",name:"member_names"}),Object(a.jsx)("p",{children:"Emails of Members (In same order as names)"}),Object(a.jsx)(g.a,{multiline:!0,required:!0,rowsMax:10,onChange:this.handleChange,label:"Member Emails",variant:"outlined",name:"member_emails"}),Object(a.jsx)("p",{}),Object(a.jsx)(y.a,{type:"Submit",variant:"contained",color:"primary",children:"Submit"})]})})]})}}]),n}(r.a.Component),C=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(b.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{children:Object(a.jsx)("h1",{children:"About..."})})}}]),n}(r.a.Component),S=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(b.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{style:{margin:"30px"},children:Object(a.jsx)("h1",{children:"Done"})})}}]),n}(r.a.Component),w=n(130),k=n(131),P=n(67),I=n(12),T=n(49),N=n(66),_=n.n(N),D=n(133),q=n(128),M=n(88),z=n(129),E=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleTag=a.handleTag.bind(Object(p.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(p.a)(a)),a.delete=a.delete.bind(Object(p.a)(a)),a.getNames=a.getNames.bind(Object(p.a)(a)),a.getNames(),a.state={name:"Anjay",title:"Test",owner_name:"Test",all:[],chosen:[],chosenPref:[]},a}return Object(b.a)(n,[{key:"getNames",value:function(){var e=Object(h.a)(l.a.mark((function e(){var t,n=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t={method:"GET",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)},fetch("http://13.92.86.43:80/fill/"+this.props.match.params.id+"/"+this.props.match.params.secret,t).then((function(e){return e.json()})).then((function(e){n.setState({name:e.name,title:e.title,owner_name:e.owner_name,all:e.names,chosen:[]})})).catch((function(e){console.info(e+"------err------")}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=this.state.chosenPref,a={data:this.state.chosen.map((function(e,t){return[e,n[t]]}))},i={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};fetch("http://13.92.86.43:80/submit/"+this.props.match.params.id+"/"+this.props.match.params.secret,i).then((function(e){return e.json()})).then((function(e){t.props.history.push("/Done")})).catch((function(e){console.info(e+"------err------")}))}},{key:"delete",value:function(e){var t=this.state.chosen;t.splice(e,1),this.setState({chosen:t})}},{key:"pref",value:function(e,t){var n=this.state.chosenPref;n[e]=parseInt(t),this.setState({chosenPref:n})}},{key:"handleTag",value:function(e,t){if(this.state.all.includes(t)){var n=this.state.chosen;n.includes(t)||(n.push(t),this.setState({chosen:n}))}}},{key:"render",value:function(){var e=this,t=[],n=function(n){t.push(Object(a.jsx)(F,{name:e.state.chosen[n],onClick:function(){return e.delete(n)},onPref:function(t){return e.pref(n,t.target.value)}},n.toString()))};for(var i in this.state.chosen)n(i);return Object(a.jsx)(x.a,{container:!0,spacing:0,direction:"column",alignItems:"center",style:{minHeight:"100vh",margin:"40px"},children:Object(a.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(a.jsxs)("p",{children:["Hello ",this.state.name,",",Object(a.jsx)("br",{}),"Please fill out your Preference for ",this.state.title," "]}),Object(a.jsxs)("span",{style:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},children:[Object(a.jsx)(q.a,{style:{margin:10},children:"Find Name"}),Object(a.jsx)(D.a,{onInputChange:this.handleTag,options:this.state.all,getOptionLabel:function(e){return e},style:{width:300},onChange:this.onTagsChange,renderInput:function(e){return Object(a.jsx)(g.a,Object(T.a)(Object(T.a)({},e),{},{variant:"outlined"}))}}),"       "]}),Object(a.jsx)(M.a,{elevation:0,style:{maxHeight:400,overflow:"auto"},children:Object(a.jsx)(f.a,{style:{justifyContent:"center",alignItems:"center"},children:t})}),Object(a.jsx)("span",{style:{margin:"20px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},children:Object(a.jsx)(y.a,{type:"submit",style:{margin:"20px",alignSelf:"center"},variant:"contained",color:"primary",children:"Submit"})})," "]})})}}]),n}(r.a.Component),F=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(e){return Object(u.a)(this,n),t.call(this,e)}return Object(b.a)(n,[{key:"render",value:function(){return Object(a.jsx)(O.a,{style:{justifyContent:"center",alignItems:"center"},children:Object(a.jsx)(M.a,{children:Object(a.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(a.jsx)(q.a,{align:"center",style:{margin:"20px"},children:this.props.name}),Object(a.jsx)(g.a,{style:{minWidth:"170px"},required:!0,onChange:this.props.onPref,InputProps:{inputProps:{max:10,min:0}},type:"number",label:"Preference (0-10)"}),Object(a.jsx)(z.a,{"aria-label":"delete",onClick:this.props.onClick,children:Object(a.jsx)(_.a,{fontSize:"large"})})]})})})}}]),n}(r.a.Component),G=E;function H(){return Object(a.jsx)("main",{children:Object(a.jsxs)(I.c,{children:[Object(a.jsx)(I.a,{path:"/",component:v,exact:!0}),Object(a.jsx)(I.a,{path:"/home",component:v,exact:!0}),Object(a.jsx)(I.a,{path:"/about",component:C}),Object(a.jsx)(I.a,{path:"/done",component:S}),Object(a.jsx)(I.a,{path:"/fillPreference/:id/:secret",component:G})]})})}c.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsxs)("div",{children:[Object(a.jsx)(w.a,{position:"static",children:Object(a.jsx)(k.a,{children:"Group Us"})}),Object(a.jsx)(P.a,{basename:"https://anjaygoel.github.io/GroupUs/",children:Object(a.jsx)(H,{})}),","]})}),document.getElementById("root"))}},[[87,1,2]]]);
//# sourceMappingURL=main.1038b5bd.chunk.js.map