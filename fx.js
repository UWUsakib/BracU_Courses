/* Mouse-reactive streak particles (courses pages) */
(function(){
const cv=document.getElementById('fx'),ctx=cv.getContext('2d');
let W,H,dpr=Math.min(devicePixelRatio||1,2),P=[],m={x:-999,y:-999,on:false};
const R=190;
function size(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#04040a';ctx.fillRect(0,0,W,H);
 const n=Math.min(900,Math.floor(W*H/1800));P=[];for(let i=0;i<n;i++)P.push(mk(true))}
function mk(r){const hue=Math.random()<.5?185:Math.random()<.5?230:265;
 return{x:Math.random()*W,y:r?Math.random()*H:-10,px:0,py:0,vx:(Math.random()-.5)*.1,vy:.5+Math.random()*1.1,hue,a:.25+Math.random()*.35,heat:0}}
addEventListener('resize',size);
addEventListener('pointermove',e=>{m.x=e.clientX;m.y=e.clientY;m.on=true});
addEventListener('pointerleave',()=>{m.on=false;m.x=m.y=-999});
size();
function frame(){
 ctx.fillStyle='rgba(4,4,10,.16)';ctx.fillRect(0,0,W,H);
 if(m.on){const g=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,130);g.addColorStop(0,'rgba(150,30,90,.20)');g.addColorStop(1,'rgba(150,30,90,0)');ctx.fillStyle=g;ctx.fillRect(m.x-130,m.y-130,260,260)}
 for(const p of P){
  p.px=p.x;p.py=p.y;
  const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);
  if(m.on&&d<R){const f=(1-d/R);
   p.vx+=(dx/d)*.16*f+(-dy/d)*.34*f; p.vy+=(dy/d)*.16*f+(dx/d)*.34*f; p.heat=Math.min(1,p.heat+.18*f+.04)}
  p.vx*=.965;p.vy=p.vy*.965+.02;
  if(Math.abs(p.vy)<.5&&p.heat<.05)p.vy+=.03;
  p.heat*=.985;
  p.x+=p.vx;p.y+=p.vy;
  const h=p.heat,col=h>.08?`hsla(${330-h*10},85%,${55+h*25}%,${.35+h*.6})`:`hsla(${p.hue},70%,65%,${p.a})`;
  ctx.strokeStyle=col;ctx.lineWidth=h>.08?1.3:1;ctx.beginPath();ctx.moveTo(p.px,p.py);ctx.lineTo(p.x,p.y);ctx.stroke();
  if(h>.25){ctx.fillStyle='rgba(255,255,255,'+h+')';ctx.fillRect(p.x-1,p.y-1,2,2)}
  if(p.y>H+10||p.x<-20||p.x>W+20){Object.assign(p,mk(false),{x:Math.random()*W})}
 }
 requestAnimationFrame(frame)}
frame();
})();
