import e,{Component as t,createRef as r}from"react";class o extends t{constructor(){super(),this.canvasRef=r(),this.legendCreate=this.legendCreate.bind(this),this.drawbackgound=this.drawbackgound.bind(this),this.drawBars=this.drawBars.bind(this),this.clearCanvas=this.clearCanvas.bind(this)}componentDidMount(){this.drawbackgound()}componentDidUpdate(){this.clearCanvas(),this.drawbackgound()}clearCanvas(){const e=this.canvasRef.current;e.getContext("2d").clearRect(0,0,e.width,e.height)}drawbackgound(){const{style:{widthGraph:e="1000",heightGraph:t="500",lineColor:r="black",fontSizeBackground:o="10",widthLine:n="1",fontBackground:a="monospace",percentSide:s="left"},maxPercent:i="100%"}=this.props,l="right"===s?e-4*o:10,d="70%"===i?8:"50%"===i?6:11,p=this.canvasRef.current.getContext("2d"),c=t/(d+1);let h=t-c,g=0;Array(d).fill(0).forEach((()=>{p.beginPath(),p.strokeStyle=r,p.lineWidth=n,p.moveTo(0,h),p.lineTo(e,h),p.stroke(),p.closePath(),p.fillStyle=r,p.font=`${o}px ${a}`,p.fillText(`${g}%`,l,h-2*n),h-=c,g+=10})),this.drawBars()}drawBars(){const{style:{widthBar:e="60",widthGraph:t="1000",heightGraph:r="500",fontSizeBar:o="15",fontBar:n="monospace",maxPercent:a="100%",fontColordifBar:s=!1,fontColor:i="black",topPercent:l=!1,withLegend:d=!1,baseName:p=!0},data:c={},colors:h=[]}=this.props,g=this.canvasRef.current,f=+o||20,y=n||"serif",b="70%"===a?8:"50%"===a?6:11,P=r/(b+1),T=g.getContext("2d"),w=Object.keys(c),k=Object.values(c).reduce(((e,t)=>e+ +t),0),C=r-r/(b+1),B=+e/2;let u=t/2-w.length/2*(+e+B);w.forEach(((t,r)=>{T.font=`${f}px ${y}`;const n=`${(100*+c[t]/k).toFixed(1)}%`,a=+c[t]*(10*P)/k;T.fillStyle=h[r]||"#aaa",T.fillRect(u,C,+e,-a),s&&(T.fillStyle=i||"black"),p&&T.fillText(t,u+e/8,C+f),l&&T.fillText(n,u+e/4,C-a-o/2),u+=B+ +e})),d&&this.legendCreate()}legendCreate(){const{style:{fontLegendSize:e="20",borderLegend:t="1",colorBorderLegend:r="black",colorLegend:o="white",fontLegend:n="monospace",widthGraph:a="1000",fontColorLegend:s="black",legendSide:i="right",legendVertical:l="atop",heightGraph:d="500"},data:p={},colors:c=[]}=this.props,h=this.canvasRef.current.getContext("2d"),g=Math.max(...Object.keys(p).map((e=>e.length)))*+e+5*+e,f=(+e+ +e/2)*Object.keys(p).length+2*+e,y="right"===i?a-(g+10):10,b="atop"===l?10:d-(f+10);h.fillStyle=r,h.fillRect(y-t,b-t,g+ +t,f+ +t),h.fillStyle=o,h.fillRect(y,b,g-+t,f-+t);const P=y+ +e;let T=b+ +e;c.forEach((t=>{h.fillStyle=t,h.fillRect(P,T,e,e),T+=+e+ +e/2}));const w=P+ +e+ +e/2;let k=b+(+e+ +e-e/6);const C=Object.keys(p);h.fillStyle=s,C.forEach((t=>{h.font=`${e}px ${n}`,h.fillText(t,w,k),k+=+e+ +e/2}))}render(){const{style:{widthGraph:t="1000",heightGraph:r="500",backgroundColor:o="white",widthBorder:n=1,borderColor:a="black"}=INITIAL_STATE}=this.props;return e.createElement("canvas",{className:"canvas",ref:this.canvasRef,width:t,height:r,style:{border:`${n}px solid ${a}`,backgroundColor:o}})}}o.PropTypes={data:PropTypes.shape({}),colors:PropTypes.arrayOf(PropTypes.string),maxPercent:PropTypes.string,backgroundColor:PropTypes.string,lineColor:PropTypes.string,fontSizeBackground:PropTypes.string,widthGraph:PropTypes.string,heightGraph:PropTypes.string,widthBorder:PropTypes.string,borderColor:PropTypes.string,widthLine:PropTypes.string,fontBackground:PropTypes.string,maxPercent:PropTypes.string,percentSide:PropTypes.string,widthBar:PropTypes.string,fontSizeBar:PropTypes.string,fontBar:PropTypes.string,fontColordifBar:PropTypes.bool,fontColor:PropTypes.string,topPercent:PropTypes.bool,baseName:PropTypes.bool,withLegend:PropTypes.bool,fontLegend:PropTypes.string,fontLegendSize:PropTypes.string,fontColorLegend:PropTypes.string,colorLegend:PropTypes.string,borderLegend:PropTypes.string,colorBorderLegend:PropTypes.string,legendSide:PropTypes.string,legendVertical:PropTypes.string},o.defaultProps={data:{data1:6,data2:4},colors:["green","red"],maxPercent:"100%",style:{backgroundColor:"white",lineColor:"black",fontSizeBackground:"10",widthGraph:"1000",heightGraph:"500",widthBorder:"1",borderColor:"black",widthLine:"1",fontBackground:"monospace",percentSide:"left",widthBar:"60",fontSizeBar:"15",fontBar:"monospace",fontColordifBar:!1,fontColor:"black",topPercent:!1,baseName:!0,withLegend:!1,fontLegend:"monospace",fontLegendSize:"20",fontColorLegend:"black",colorLegend:"white",borderLegend:"1",colorBorderLegend:"black",legendSide:"right",legendVertical:"atop"}};export{o as GraphicComponent};