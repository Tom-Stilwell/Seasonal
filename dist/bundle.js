!function(t){var s={};function i(h){if(s[h])return s[h].exports;var e=s[h]={i:h,l:!1,exports:{}};return t[h].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=t,i.c=s,i.d=function(t,s,h){i.o(t,s)||Object.defineProperty(t,s,{configurable:!1,enumerable:!0,get:h})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(s,"a",s),s},i.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},i.p="",i(i.s=0)}([function(t,s,i){"use strict";i.r(s);class h{constructor(t,s,i){this.ctx=t,this.W=s,this.H=i,this.width=64,this.height=64,this.posX=s/2,this.posY=i-64,this.hit=!1,this.rightHit=!1,this.leftHit=!1,this.topHit=!1,this.bottomHit=!1,this.imageSources=["./playerRunRight.png","./playerRunLeft.png","./jumpRight.png","./jumpLeft.png"],this.images=new Array(4),this.preloadImages(),this.bindMovements(),this.player=this.images[0],this.runOffset=0,this.runOffset2=0,this.jumpOffset=0,this.jumpOffset2=0,this.startedJumping=!1,this.draw=this.draw.bind(this),this.keys={left:!1,right:!1,up:!1,down:!1},this.jumps=0,this.wraps=0}preloadImages(){let t;for(let s=0;s<this.imageSources.length;s++)(t=new Image).src=this.imageSources[s],this.images[s]=t}bindMovements(){document.addEventListener("keydown",t=>{switch(t.key){case"ArrowUp":this.keys.up=!0;break;case"ArrowLeft":this.keys.left=!0;break;case"ArrowRight":this.keys.right=!0;break;case"ArrowDown":this.keys.down=!0}}),document.addEventListener("keyup",t=>{switch(t.key){case"ArrowUp":this.keys.up=!1;break;case"ArrowLeft":this.keys.left=!1;break;case"ArrowRight":this.keys.right=!1;break;case"ArrowDown":this.keys.down=!1}})}draw(t){this.H=t;let s=this.keys.up?this.jumpOffset2:this.runOffset2;this.posY>this.H-64&&(this.posY=this.H-64),this.posY<this.H-64&&!this.bottomHit&&(this.posY+=10),this.ctx.filter="brightness(50%)",this.ctx.drawImage(this.player,s,0,64,64,this.posX,this.posY,this.width,this.height),this.ctx.filter="none",this.update()}parseCollisions(){this.hit?(this.bottomHit&&(this.rightHit=!1,this.leftHit=!1),this.rightHit&&!this.bottomHit&&(this.posX-=2),this.leftHit&&!this.bottomHit&&(this.posX+=2),this.topHit&&(this.posY+=10)):(this.rightHit=!1,this.leftHit=!1,this.topHit=!1,this.bottomHit=!1)}checkJump(){this.keys.up?(this.jumps%5==0&&(this.startedJumping||(this.jumpOffset=0),this.jumpOffset+=64,this.jumpOffset=this.jumpOffset%704,(this.keys.left||this.player.src.indexOf("Left")>-1)&&(this.player=this.images[3]),(this.keys.right||this.player.src.indexOf("Right")>-1)&&(this.player=this.images[2]),this.startedJumping=!0),this.jumpOffset>=256&&this.jumpOffset<384?this.posY-=20:this.jumpOffset>=384&&this.jumpOffset<512&&!this.bottomHit?this.posY+=10:640===this.jumpOffset&&(this.startedJumping=!1),this.player.src.indexOf("Right")>-1?(this.player=this.images[2],this.jumpOffset2=640-this.jumpOffset):this.jumpOffset2=this.jumpOffset,this.jumps++):(this.posY<this.H-64&&!this.bottomHit&&(this.posY+=20),this.startedJumping=!1,this.jumpOffset=64,this.jumpOffset2=64)}checkWalk(){this.keys.left&&!this.leftHit&&(this.posX-=10,this.keys.up?this.jumpOffset<256&&(this.posX+=10):(this.runOffset+=64,this.runOffset2=this.runOffset%320,this.player=this.images[1])),this.keys.right&&!this.rightHit&&(this.posX+=10,this.keys.up?this.jumpOffset<256&&(this.posX-=10):(this.runOffset+=64,this.runOffset2=this.runOffset%320,this.runOffset2=256-this.runOffset2,this.player=this.images[0]))}wrap(){this.posX>this.W&&(this.posX=-this.width/2,this.wraps++),this.posX+this.width/2<0&&(this.posX=this.W,this.wraps--)}update(){this.parseCollisions(),this.checkJump(),this.checkWalk(),this.wrap()}}class e{constructor(t,s,i,h){this.ctx=t,this.W=s,this.H=i,this.season=h,this.createGhosts()}createGhosts(){switch(this.season){case"winter":this.ghosts=[{x:this.W/3,y:this.H-100,w:100,h:100},{x:this.W/3-150,y:this.H-200,w:100,h:100},{x:this.W/3+50,y:this.H-300,w:100,h:100},{x:this.W/3+150,y:this.H-300,w:100,h:100},{x:this.W/3+250,y:this.H-300,w:100,h:100}];break;case"spring":this.ghosts=[{x:this.W-100,y:this.H-100,w:100,h:100},{x:this.W-300,y:this.H-200,w:100,h:100},{x:this.W/3+100,y:this.H-300,w:100,h:100},{x:this.W/3+200,y:this.H-300,w:100,h:100},{x:this.W/3+300,y:this.H-300,w:100,h:100},{x:this.W/3+100,y:this.H-200,w:100,h:100},{x:this.W/3+100,y:this.H-100,w:100,h:100}];break;case"summer":this.ghosts=[{x:300,y:this.H-300,w:100,h:100},{x:300,y:this.H-200,w:100,h:100},{x:300,y:this.H-100,w:100,h:100}];break;case"fall":this.ghosts=[]}}draw(){if("fall"===this.season)return this.ctx.beginPath(),this.ctx.moveTo(400,200),this.ctx.lineTo(600,300),this.ctx.lineTo(400,400),this.ctx.lineWidth=15,this.ctx.strokeStyle="rgba(230, 0, 0, .004)",void this.ctx.stroke();this.ghosts.forEach(t=>{this.ctx.beginPath(),this.ctx.rect(t.x,t.y="winter"===this.season?t.y-.01:t.y,t.w,t.h),this.ctx.fillStyle="rgba(230, 0, 0, .004)",this.ctx.fill()})}}class a{constructor(t,s,i){this.posX=s[0],this.posY=s[1],this.ctx=t,this.color=i,this.radius=30}draw(){this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(this.posX,this.posY,this.radius,0,2*Math.PI);let t=this.ctx.createRadialGradient(this.posX,this.posY,5,this.posX,this.posY,30);t.addColorStop(0,"white"),t.addColorStop(1,this.color),this.ctx.shadowBlur=30,this.ctx.shadowColor="white",this.ctx.fillStyle=t,this.ctx.fill(),this.ctx.restore()}}class r{constructor(t,s,i){this.mp=500,this.particles=new Array(this.mp);for(let t=0;t<this.mp;t++)this.particles[t]={x:Math.random()*s,y:Math.random()*i,r:3*Math.random()+1,d:Math.random()*this.mp};this.ctx=t,this.W=s,this.H=i,this.angle=0,document.getElementById("canvases").style.background="#6b92b9",this.orb=new a(this.ctx,[this.W/1.3,this.H/3],"pink"),this.draw=this.draw.bind(this)}draw(){let t;this.ctx.fillStyle="rgba(255, 255, 255, 0.8)",this.ctx.beginPath();for(let s=0;s<this.mp;s++)t=this.particles[s],this.ctx.moveTo(t.x,t.y),this.ctx.arc(t.x,t.y,t.r,0,2*Math.PI,!0);this.ctx.fill(),this.orb.draw(),this.update()}update(){let t;this.angle+=.005;for(let s=0;s<this.mp;s++)(t=this.particles[s]).y+=Math.cos(this.angle+t.d)+1+t.r/2,t.x+=2*Math.sin(this.angle),(t.x>this.W+5||t.x<-5||t.y>this.H)&&(s%10>0?this.particles[s]={x:Math.random()*this.W,y:-10,r:t.r,d:t.d}:Math.sin(this.angle)>0?this.particles[s]={x:-5,y:Math.random()*this.H,r:t.r,d:t.d}:this.particles[s]={x:this.W+5,y:Math.random()*this.H,r:t.r,d:t.d})}}class n{constructor(t,s,i){this.ctx=t,this.colors=["#80ff80","#ff80d5","#ff8533","#ffff4d","#84e1e1","#ff99bb","#ff531a","#4d4dff"],document.getElementById("canvases").style.background="#eeccff",this.W=s,this.H=i,this.orb=new a(this.ctx,[100,300],"yellow"),this.centers=[],this.stems=[],this.petals=[],this.makeFlowers(20),this.centersInc=new Array(this.centers.length);for(let t=0;t<this.centers.length;t++)this.centersInc[t]=this.centers[t],this.centersInc[t].radius=0;this.petalsInc=new Array(this.petals.length);for(let t=0;t<this.petals.length;t++)this.petalsInc[t]={},this.petalsInc[t].start=this.petals[t].start.slice(),this.petalsInc[t].point1=this.petals[t].start.slice(),this.petalsInc[t].point2=this.petals[t].start.slice(),this.petalsInc[t].point3=this.petals[t].start.slice();this.stemsInc=new Array(this.stems.length);for(let t=0;t<this.stems.length;t++)this.stemsInc[t]={},this.stemsInc[t].x=this.stems[t].x,this.stemsInc[t].y=this.stems[t].y,this.stemsInc[t].width=this.stems[t].width,this.stemsInc[t].height=0;this.draw=this.draw.bind(this),this.done=!1}randomColor(){return this.colors[Math.floor(Math.random()*this.colors.length)]}makeFlowers(t){let s,i,h,e,a,r;for(let n=0;n<t;n++)i={x:(s={x:Math.floor(Math.random()*(this.W-200))+100,y:Math.floor(200*Math.random())+(this.H-300),maxRadius:Math.floor(10*Math.random())+5,color:this.randomColor()}).x-s.maxRadius/10,y:s.y+s.maxRadius/2,width:s.maxRadius/3,maxHeight:this.H-s.y},h={start:[s.x+s.maxRadius,s.y],maxPoint1:[s.x+5*s.maxRadius,s.y+5*s.maxRadius],maxPoint2:[s.x+5*s.maxRadius,s.y],maxPoint3:[s.x+5*s.maxRadius,s.y-5*s.maxRadius]},e={start:[s.x,s.y+s.maxRadius],maxPoint1:[s.x-5*s.maxRadius,s.y+5*s.maxRadius],maxPoint2:[s.x,s.y+5*s.maxRadius],maxPoint3:[s.x+5*s.maxRadius,s.y+5*s.maxRadius]},a={start:[s.x-s.maxRadius,s.y],maxPoint1:[s.x-5*s.maxRadius,s.y+5*s.maxRadius],maxPoint2:[s.x-5*s.maxRadius,s.y],maxPoint3:[s.x-5*s.maxRadius,s.y-5*s.maxRadius]},r={start:[s.x,s.y-s.maxRadius],maxPoint1:[s.x-5*s.maxRadius,s.y-5*s.maxRadius],maxPoint2:[s.x,s.y-5*s.maxRadius],maxPoint3:[s.x+5*s.maxRadius,s.y-5*s.maxRadius]},this.centers.push(s),this.stems.push(i),this.petals.push(h,e,a,r)}drawStems(){this.ctx.save(),this.ctx.fillStyle="green";const t=this.stems,s=this.stemsInc;let i;for(let h=0;h<s.length;h++)i=s[h],this.ctx.beginPath(),this.ctx.fillRect(i.x,i.y,i.width,i.height),this.ctx.closePath(),Math.round(i.height)!==t[h].maxHeight&&(i.height+=(t[h].maxHeight-i.height)/10);this.ctx.restore()}makePetal(t){const s=this.ctx;s.save(),s.beginPath(),s.moveTo(t.start[0],t.start[1]),s.quadraticCurveTo(t.point1[0],t.point1[1],t.point2[0],t.point2[1]),s.quadraticCurveTo(t.point3[0],t.point3[1],t.start[0],t.start[1]),s.closePath(),s.fillStyle=t.color,s.fill(),s.restore()}drawPetals(){this.ctx.save(),this.ctx.beginPath();const t=this.petals,s=this.petalsInc;let i,h;for(let e=0;e<s.length;e++)i=s[e],h=t[e],this.makePetal(i),Math.round(i.point1[0])!==t[e].maxPoint1[0]&&(this.done=!0,i.color=this.randomColor(),i.point1[0]+=(h.maxPoint1[0]-h.start[0])/100,i.point1[1]+=(h.maxPoint1[1]-h.start[1])/100,i.point2[0]+=(h.maxPoint2[0]-h.start[0])/100,i.point2[1]+=(h.maxPoint2[1]-h.start[1])/100,i.point3[0]+=(h.maxPoint3[0]-h.start[0])/100,i.point3[1]+=(h.maxPoint3[1]-h.start[1])/100)}makeCenter(t,s,i,h){const e=this.ctx;e.save(),e.beginPath(),e.arc(t,s,i,0,2*Math.PI,!1),e.closePath(),e.fillStyle=h,e.fill(),e.restore()}drawCenters(){const t=this.centers.slice(),s=this.centersInc.slice();let i,h;for(let e=0;e<s.length;e++)i=t[e],h=s[e],this.makeCenter(h.x,h.y,h.radius,h.color),Math.round(h.radius)<=i.maxRadius&&(h.radius+=(i.maxRadius-h.radius)/10)}draw(){this.drawStems(),this.drawCenters(),this.drawPetals(),this.orb.draw()}}class o{constructor(t,s,i,h){this.ctx=t,this.W=s,this.H=i,this.stickman=h,document.getElementById("canvases").style.background="#ff8566",this.orb=new a(this.ctx,[this.W/2,300],"brown"),this.maxSuns=5,this.suns=new Array(this.maxSuns);for(let t=0;t<this.maxSuns;t++)this.suns[t]={x:(t+1)*this.W/(this.maxSuns+1),y:100+t%2*100};this.smoke=new Image,this.smoke.src="./smoke.png",this.smokes=[],this.smoking=!0}drawSuns(){this.suns.forEach(t=>{this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.x,t.y,50,0,2*Math.PI);let s=this.ctx.createRadialGradient(t.x,t.y,5,t.x,t.y,50);s.addColorStop(0,"orange"),s.addColorStop(1,"yellow"),this.ctx.shadowBlur=100,this.ctx.shadowColor="yellow",this.ctx.fillStyle=s,this.ctx.fill(),this.ctx.restore()})}drawSmoke(){this.smoking?(this.smokes.push({x:this.stickman.posX+22,y:this.stickman.posY-36,times:0}),this.smoking=!1):this.smoking=!0,this.smokes.forEach(t=>{t.times<=5?(this.ctx.filter=`opacity(${1/(t.times+1)})`,this.ctx.drawImage(this.smoke,650,450,200,450,t.x,t.y,20,36),this.ctx.filter="none"):this.smokes.shift(),t.y-=10,this.smoking&&t.times++})}draw(){this.drawSuns(),this.drawSmoke(),this.orb.draw()}}class l{constructor(t,s,i,h){this.ctx=t,this.W=s,this.H=i,this.stickman=h,document.getElementById("canvases").style.background="#6b6b47",this.maxDrops=500,this.drops=new Array(this.maxDrops);for(let t=0;t<this.maxDrops;t++)this.drops[t]={x:Math.random()*this.W,y:Math.random()*this.H,length:Math.random(),driftX:4*Math.random()-2,driftY:10*Math.random()+10};this.flees=0,this.stickman.wraps=0}drawRain(){let t;this.ctx.save(),this.ctx.strokeStyle="rgba(174,194,224,0.7)",this.ctx.lineWidth=1,this.ctx.lineCap="round";for(let s=0;s<this.maxDrops;s++)t=this.drops[s],this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(t.x+t.length*t.driftX,t.y+t.length*t.driftY),this.ctx.stroke(),this.ctx.closePath();this.update()}update(){let t;for(let s=0;s<this.maxDrops;s++)(t=this.drops[s]).x+=t.driftX,t.y+=t.driftY,(t.x>this.W||t.y>this.H)&&(t.x=Math.random()*this.W,t.y=-30)}draw(){this.drawRain(),this.stickman.wraps>0&&(this.orb=this.orb||new a(this.ctx,[this.W-100,this.H-150],"lightblue"),this.orb.draw(),this.stickman.posX>700&&0===this.flees?(this.orb.posX=200,this.flees++):this.stickman.posX<400&&1===this.flees&&(this.orb.posX=this.W/2-20))}}document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("game-canvas"),s=t.getContext("2d");let i=1e3;t.width=i,t.height=500;const a=new class{constructor(t,s,i){this.ctx=t,this.W=s,this.H=i-84,this.height=this.H,this.levels=["winter","spring","summer","fall"],this.levelType="winter",this.stickman=new h(this.ctx,this.W,this.H-2),this.ghosts=new e(this.ctx,this.W,this.H-6,this.levelType),this.level=new r(this.ctx,this.W,this.H,this.levelType),this.ground=new Image,this.ground.src="./blocks.png",this.ground.onload=(()=>{this.drawGround()})}resetLevel(){this.stickman.posX=20,this.loadLevel()}run(){this.ctx.clearRect(0,0,this.W,this.height="winter"===this.levelType?this.height-.01:this.H),this.level.draw(),this.stickman.draw(this.height),this.ghosts.draw(),this.isStickmanColliding(),this.isTouchingOrb()&&(this.drawGround(),this.levelType=this.levels[(this.levels.indexOf(this.levelType)+1)%this.levels.length],this.loadLevel(),this.ghosts=new e(this.ctx,this.W,this.height,this.levelType),this.orb=this.level.orb)}loadLevel(){switch(this.height=this.H,this.levelType){case"winter":this.level=new r(this.ctx,this.W,this.H,this.levelType);break;case"spring":this.level=new n(this.ctx,this.W,this.H);break;case"summer":this.level=new o(this.ctx,this.W,this.H,this.stickman);break;case"fall":this.level=new l(this.ctx,this.W,this.H,this.stickman)}}drawGround(){this.ctx.clearRect(0,0,this.W,this.H);for(let t=0;t<this.W;t+=100)this.ctx.drawImage(this.ground,t,this.H-6,100,100)}isStickmanColliding(){let t,s;return this.stickman.hit=!1,!(!this.ghosts||!this.ghosts.ghosts)&&(this.ghosts.ghosts.some(i=>{if([s,t]=[!1,!1],this.stickman.posX>=i.x&&this.stickman.posX<=i.x+i.w&&([this.stickman.leftHit,s]=[!0,!0]),this.stickman.posX+this.stickman.width>=i.x&&this.stickman.posX+this.stickman.width<=i.x+i.w&&([this.stickman.rightHit,s]=[!0,!0]),this.stickman.posY>=i.y&&this.stickman.posY<=i.y+i.h&&([this.stickman.topHit,t]=[!0,!0]),this.stickman.posY+this.stickman.height>=i.y&&this.stickman.posY+this.stickman.height<=i.y+i.h&&([this.stickman.bottomHit,t]=[!0,!0]),s&&t)return this.stickman.hit=!0,!0;this.stickman.rightHit=!1,this.stickman.leftHit=!1,this.stickman.topHit=!1,this.stickman.bottomHit=!1}),this.stickman.hit)}isTouchingOrb(){if(!this.level.orb)return!1;const t=this.level.orb,s=this.stickman;return Math.sqrt(Math.pow(t.posX-s.posX,2)+Math.pow(t.posY-s.posY,2))<t.radius+(s.width-30)/2}}(s,i,500);new class{constructor(t,s,i,h,e){this.weather=t,this.stickman=s,this.ghosts=i,this.W=h,this.H=e,this.bindEvents=this.bindEvents.bind(this),this.isPrinting=!1}bindEvents(){document.addEventListener("keypress",t=>{if(this.isPrinting)return;if(32!==t.keyCode)return;this.isPrinting=!0;const s=this.weather.ctx.getImageData(0,0,this.W,this.H).data;for(let t=0;t<s.length;t+=4)0===s[t]&&0===s[t+1]&&0===s[t+2]&&0===s[t+3]?(s[t]=255-s[t],s[t+1]=255-s[t+1],s[t+2]=255-s[t+2],s[t+3]=255):255===s[t]&&3===s[t+3]?s[t+3]=255:(s[t]=255-s[t],s[t+1]=255-s[t+1],s[t+2]=255-s[t+2]);const i=document.getElementById("screenshot-canvas");i.width=this.W,i.height=this.H;const h=i.getContext("2d"),e=h.createImageData(this.W,this.H);for(let t=0;t<e.data.length;t++)e.data[t]=s[t];h.putImageData(e,0,0),setTimeout(()=>{h.clearRect(0,0,this.W,this.H),this.isPrinting=!1},2e3)})}}(a.level,a.stickman,a.ghosts,i,500).bindEvents();const c=document.getElementById("mute"),m=document.getElementById("unmute"),d=document.getElementById("audio");d.volume=.2,c.addEventListener("click",()=>{d.muted=!0,c.style.display="none",m.style.display="block"}),m.addEventListener("click",()=>{d.muted=!1,c.style.display="block",m.style.display="none"});const p=document.getElementById("instructions"),x=document.getElementById("close-x"),u=document.getElementById("question"),f=document.getElementById("start");function y(){a.run(),requestAnimationFrame(y)}x.addEventListener("click",()=>{p.style.display="none",u.style.display="block"}),f.addEventListener("click",()=>{f.style.display="none",p.style.display="none",u.style.display="block",x.style.display="block",y()},{once:!0}),u.addEventListener("click",()=>{p.style.display="block",u.style.display="none"}),document.getElementById("stuck").addEventListener("click",()=>{a.resetLevel()})})}]);
//# sourceMappingURL=bundle.js.map