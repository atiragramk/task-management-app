"use strict";(self.webpackChunktask_management_app=self.webpackChunktask_management_app||[]).push([[273],{588:function(n,e,r){r.d(e,{S:function(){return d}});var t=r(5671),i=r(3144),o=r(136),a=r(7277),s=r(2791),c=r(1381),l=r(184),d=function(n){(0,o.Z)(r,n);var e=(0,a.Z)(r);function r(){var n;(0,t.Z)(this,r);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(n=e.call.apply(e,[this].concat(o))).state={error:!1},n}return(0,i.Z)(r,[{key:"componentDidCatch",value:function(n){this.setState({error:!0})}},{key:"render",value:function(){return this.state.error?(0,l.jsx)(c.B,{}):this.props.children}}]),r}(s.Component)},1381:function(n,e,r){r.d(e,{B:function(){return f}});var t,i=r(6151),o=r(3504),a=r.p+"static/media/error.d9aa7b1a785ebcbec41f.gif",s=r(168),c=r(6934),l=r(6598),d=(0,c.ZP)(l.Z)(t||(t=(0,s.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),u=r(184),f=function(){return(0,u.jsxs)(d,{children:[(0,u.jsx)("img",{src:a,alt:"error"}),(0,u.jsx)(i.Z,{component:o.rU,variant:"contained",to:"/",children:"Back to Main"})]})}},6954:function(n,e,r){r.d(e,{u:function(){return k}});var t,i,o,a=r(1413),s=r(2791),c=r(9818),l=r(7123),d=r(9709),u=r(9823),f=r(5931),m=r(168),x=r(6934),h=r(195),p=r(3400),Z=r(890),j=(0,x.ZP)(h.Z)(t||(t=(0,m.Z)(["\n  padding-top: 20px;\n"]))),v=(0,x.ZP)(p.Z)(i||(i=(0,m.Z)(['\n  position: absolute;\n  right: 8px;\n  top: 10px;\n  color: "#9E9E9E";\n']))),C=(0,x.ZP)(Z.Z)(o||(o=(0,m.Z)(["\n  min-width: 550px;\n  padding: 16px;\n"]))),g=r(184),b=s.forwardRef((function(n,e){return(0,g.jsx)(f.Z,(0,a.Z)({ref:e},n))})),k=function(n){var e=n.title,r=n.children,t=n.onClose,i=n.formName,o=n.onConfirm,a=n.loading,s=n.info,f=i?"primary":"error";return(0,g.jsxs)(c.Z,{keepMounted:!0,TransitionComponent:b,maxWidth:"md",open:!0,children:[(0,g.jsx)(C,{variant:"h6",children:e}),(0,g.jsx)(v,{"aria-label":"close",onClick:t,children:(0,g.jsx)(u.Z,{})}),(0,g.jsx)(j,{dividers:!0,children:r}),!s&&(0,g.jsxs)(l.Z,{children:[(0,g.jsx)(d.Z,{disabled:a,size:"small",variant:"outlined",onClick:t,children:"Cancel"}),(0,g.jsx)(d.Z,{type:"submit",color:f,disabled:a,form:i,size:"small",onClick:o,variant:"contained",children:"Confirm"})]})]})}},7314:function(n,e,r){r.r(e),r.d(e,{default:function(){return L}});var t,i=r(9434),o=r(2791),a=r(6598),s=r(7482),c=r(4554),l=r(890),d=r(6151),u=r(5921),f=r(2419),m=r(873),x=function(n){return n.projects},h=(0,m.P1)(x,(function(n){return n.loading})),p=(0,m.P1)(x,(function(n){return n.error})),Z=(0,m.P1)(x,(function(n){return n.data})),j=(0,m.P1)(x,(function(n){return n.createState})),v=r(8212),C=r(7604),g=r(6839),b=r(1413),k=r(4165),w=r(5861),y=r(6954),P=r(1134),_=r(4695),N=r(1724),E=r(8096),S=r(7133),q=r(8550),B=r(184),I=function(n){var e=n.onClose,r=n.onConfirm,t=(0,i.v9)(j).loading,o=N.Ry().shape({name:N.Z_().required("Name is required"),description:N.Z_().required("Description is required")}),a=(0,P.cI)({resolver:(0,_.X)(o)}),s=a.control,c=a.handleSubmit,l=a.formState.errors,d=function(){var n=(0,w.Z)((0,k.Z)().mark((function n(e){return(0,k.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{r(e)}catch(t){}case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,B.jsx)(y.u,{loading:t,formName:"create_project",title:"Create Project",onClose:e,children:(0,B.jsxs)("form",{onSubmit:c(d),id:"create_project",children:[(0,B.jsxs)(E.Z,{sx:{width:"100%"},children:[(0,B.jsx)(S.Z,{required:!0,children:"Project Name"}),(0,B.jsx)(P.Qr,{name:"name",control:s,defaultValue:"",render:function(n){var e,r=n.field;return(0,B.jsx)(q.Z,(0,b.Z)({error:Boolean(l.name),helperText:null===(e=l.name)||void 0===e?void 0:e.message,size:"small"},r))}})]}),(0,B.jsxs)(E.Z,{sx:{width:"100%"},children:[(0,B.jsx)(S.Z,{required:!0,children:"Description"}),(0,B.jsx)(P.Qr,{name:"description",control:s,defaultValue:"",render:function(n){var e,r=n.field;return(0,B.jsx)(q.Z,(0,b.Z)({multiline:!0,rows:5,error:Boolean(l.description),helperText:null===(e=l.description)||void 0===e?void 0:e.message,size:"small"},r))}})]})]})})},z=r(168),D=r(6934),M=r(3504),R=(0,D.ZP)(M.rU)(t||(t=(0,z.Z)(["\n  text-decoration: none;\n  color: #7e57c2;\n  &:hover {\n    text-decoration: underline;\n  }\n"]))),T="MODAL_CREATE_PROJECT_NAME",A=r(588),O=r(1381),L=function(){var n=(0,i.v9)(Z),e=(0,i.v9)(h),r=(0,i.v9)(p),t=(0,i.v9)(C.Y),m=t.open,x=t.name,j=(0,i.I0)();(0,o.useEffect)((function(){j((0,v.G)())}),[j]);var b=[{field:"name",headerName:"Name",flex:1,renderCell:function(n){return(0,B.jsx)(R,{to:"/projects/".concat(n.row._id),children:n.value})}},{field:"description",headerName:"Description",flex:2},{field:"shortName",headerName:"Key",flex:1}],k=function(){j((0,g.IN)({name:T}))};return(0,B.jsxs)(A.S,{children:[e&&(0,B.jsx)(s.Z,{}),!r&&!e&&(0,B.jsxs)(a.Z,{maxWidth:"xl",sx:{mt:2},children:[(0,B.jsxs)(c.Z,{sx:{display:"flex",alignItems:"baseline",justifyContent:"space-between"},children:[(0,B.jsx)(l.Z,{variant:"h5",children:"Projects"}),(0,B.jsx)(d.Z,{sx:{mb:2},onClick:k,variant:"contained",size:"small",startIcon:(0,B.jsx)(f.Z,{}),children:"Create Project"})]}),(0,B.jsx)(c.Z,{sx:{height:"550px",width:"100%"},children:(0,B.jsx)(u._,{disableColumnMenu:!0,components:{LoadingOverlay:s.Z},loading:e,rows:n,getRowId:function(n){return n._id},columns:b})}),m&&x===T&&(0,B.jsx)(I,{onConfirm:function(n){j((0,v.S)(n))},onClose:k})]}),r&&!e&&(0,B.jsx)(O.B,{})]})}},7604:function(n,e,r){r.d(e,{Y:function(){return t}});var t=function(n){return n.modal}}}]);
//# sourceMappingURL=273.09406e05.chunk.js.map