import { useEffect, useRef, useState } from "react";

const GOLD = "#c9a84c";
const GOLD2 = "#f0d080";
const BONE = "#f5f0e8";
const OBSIDIAN = "#03030a";

// ── DATA ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon:"📞", title:"AI Receptionist Systems", desc:"Handle incoming calls, bookings, and customer queries automatically 24/7. Never miss a lead again.", accent:"#4488ff" },
  { icon:"⚙️", title:"Automation Workflows", desc:"Build smart systems using n8n and AI to automate your business operations end-to-end.", accent:GOLD },
  { icon:"🌐", title:"Website & Lead Systems", desc:"Create websites and funnels designed to generate leads and bookings on autopilot.", accent:"#22dd88" },
  { icon:"🎬", title:"AI Content & Video", desc:"Produce cinematic AI-driven content for marketing and branding at scale.", accent:"#bb44ff" },
];

const PROJECTS = [
  {
    num:"01", name:"AI Receptionist", tag:"AI · Perth", accent:"#4488ff",
    problem:"Businesses were missing calls and losing potential bookings after hours.",
    solution:"Built an AI voice receptionist connected to phone systems, calendar, and workflows.",
    result:"Captured missed calls 24/7 and turned them into confirmed bookings automatically.",
    links:[{label:"Watch Demo",href:"#demo"},{label:"View Workflow",href:"#"}],
  },
  {
    num:"02", name:"Perth Shine Crew", tag:"Local · Brand", accent:"#22dd88",
    problem:"Low online presence and poor lead conversion for a growing cleaning business.",
    solution:"Built full brand identity, website, and lead-focused conversion structure.",
    result:"Improved visibility and increased inbound cleaning inquiries significantly.",
    links:[{label:"View Website",href:"#"}],
  },
  {
    num:"03", name:"TooFan", tag:"SaaS", accent:"#bb44ff",
    problem:"Need for a scalable multi-service food delivery and ride-hailing platform.",
    solution:"Developed full-stack system with multiple apps, backend, and payment integration.",
    result:"Functional platform handling food delivery and ride services across Australia.",
    links:[{label:"View Project",href:"#"}],
  },
];

const HOW_IT_WORKS = [
  { n:"01", title:"Analyse", desc:"We analyse your business and identify every missed opportunity and gap." },
  { n:"02", title:"Build", desc:"We build a custom AI system tailored precisely to your workflow and brand." },
  { n:"03", title:"Connect", desc:"We connect it to your phone, calendar, CRM, and daily operations." },
  { n:"04", title:"Automate", desc:"Your business runs with automated bookings, responses, and follow-ups 24/7." },
];

const RESULTS = [
  { stat:"24/7", label:"Always On", desc:"Capture bookings around the clock" },
  { stat:"0", label:"Missed Calls", desc:"Every call handled automatically" },
  { stat:"3×", label:"Faster Response", desc:"Instant replies vs hours of wait" },
  { stat:"∞", label:"Scalability", desc:"Handle any volume without extra staff" },
];

// ── SCRAMBLE ──────────────────────────────────────────────────────────────────
function useScramble(target, trigger) {
  const [txt, setTxt] = useState(target);
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZαβγδΩΣ∞★✦";
  useEffect(() => {
    if (!trigger) return;
    let f = 0, tot = target.length * 4;
    const id = setInterval(() => {
      setTxt(target.split("").map((c,i) => c===" "?" ": f>i*4?c:CHARS[Math.floor(Math.random()*CHARS.length)]).join(""));
      if (++f > tot) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [trigger]);
  return txt;
}

// ── PER-CHAR 3D SCROLL REVEAL ─────────────────────────────────────────────────
function Reveal3D({ text, italic=false, color=BONE, size="inherit", delay=0, stagger=45, weight=300, block=false, font="cormorant" }) {
  const ref = useRef(); const [vis,setVis]=useState(false);
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true)},{threshold:0.1});
    if(ref.current)ob.observe(ref.current); return()=>ob.disconnect();
  },[]);
  const ff = font==="cinzel"?"'Cinzel',serif":"'Cormorant Garamond',serif";
  return (
    <div ref={ref} style={{fontFamily:ff,fontSize:size,fontWeight:weight,fontStyle:italic?"italic":"normal",lineHeight:1.05,display:block?"block":"inline-block",perspective:"600px"}}>
      {text.split("").map((ch,i)=>(
        <span key={i} style={{
          display:"inline-block",color,
          transition:`opacity .7s ${delay+i*stagger}ms,transform .8s ${delay+i*stagger}ms cubic-bezier(.23,1,.32,1)`,
          opacity:vis?1:0,
          transform:vis?"translateY(0) rotateX(0deg) scale(1)":"translateY(80px) rotateX(-50deg) scale(.85)",
          transformOrigin:"bottom center",
          whiteSpace:ch===" "?"pre":"normal",
        }}>{ch===" "?"\u00A0":ch}</span>
      ))}
    </div>
  );
}

// ── LIQUID HOVER ──────────────────────────────────────────────────────────────
function Liquid({ text, base=BONE, hover=GOLD, size="inherit" }) {
  const [h,setH]=useState(false);
  return (
    <span onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:"inline-flex",flexWrap:"wrap",cursor:"default",fontSize:size}}>
      {text.split("").map((c,i)=>(
        <span key={i} style={{display:"inline-block",color:h?hover:base,
          transition:`transform .45s ${i*28}ms cubic-bezier(.34,1.56,.64,1),color .3s ${i*18}ms`,
          transform:h?`translateY(-10px) rotate(${i%2===0?-4:4}deg) scale(1.1)`:"translateY(0)",
        }}>{c===" "?"\u00A0":c}</span>
      ))}
    </span>
  );
}

// ── GLITCH ────────────────────────────────────────────────────────────────────
function Glitch({ text, style={} }) {
  const [g,setG]=useState(false);
  useEffect(()=>{
    const f=()=>{ setG(true); setTimeout(()=>setG(false),400); };
    const id=setInterval(f,3500+Math.random()*2000); return()=>clearInterval(id);
  },[]);
  return (
    <span style={{position:"relative",display:"inline-block",...style}}>
      {text}
      {g&&<>
        <span aria-hidden style={{position:"absolute",top:0,left:0,color:"#ff004c",clipPath:"inset(20% 0 60% 0)",transform:"translateX(-5px)",pointerEvents:"none"}}>{text}</span>
        <span aria-hidden style={{position:"absolute",top:0,left:0,color:"#00eeff",clipPath:"inset(60% 0 10% 0)",transform:"translateX(5px)",pointerEvents:"none"}}>{text}</span>
      </>}
    </span>
  );
}

// ── COUNTER ───────────────────────────────────────────────────────────────────
function Counter({ val, suffix="" }) {
  const [n,setN]=useState(0); const ref=useRef(); const [s,setS]=useState(false);
  useEffect(()=>{const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setS(true)},{threshold:.4}); if(ref.current)ob.observe(ref.current); return()=>ob.disconnect();},[]);
  useEffect(()=>{
    if(!s||isNaN(val))return;
    let c=0; const step=val/50;
    const id=setInterval(()=>{ c=Math.min(c+step,val); setN(Math.floor(c)); if(c>=val)clearInterval(id); },35);
    return()=>clearInterval(id);
  },[s]);
  return <span ref={ref}>{isNaN(val)?val:n}{suffix}</span>;
}

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
function Label({ text }) {
  const ref=useRef(); const [v,setV]=useState(false);
  useEffect(()=>{const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:.3}); if(ref.current)ob.observe(ref.current); return()=>ob.disconnect();},[]);
  return (
    <div ref={ref} style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.8rem"}}>
      <div style={{height:1,background:GOLD,transition:"width .9s cubic-bezier(.23,1,.32,1)",width:v?50:0}}/>
      <p style={{fontSize:".6rem",letterSpacing:".55em",color:GOLD,textTransform:"uppercase",opacity:v?1:0,transition:"opacity .6s .4s"}}>{text}</p>
    </div>
  );
}

// ── FADE IN DIV ───────────────────────────────────────────────────────────────
function FadeIn({ children, delay=0, style={} }) {
  const ref=useRef(); const [v,setV]=useState(false);
  useEffect(()=>{const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:.1}); if(ref.current)ob.observe(ref.current); return()=>ob.disconnect();},[]);
  return (
    <div ref={ref} style={{transition:`opacity .8s ${delay}ms,transform .9s ${delay}ms cubic-bezier(.23,1,.32,1)`,opacity:v?1:0,transform:v?"translateY(0)":"translateY(40px)",...style}}>
      {children}
    </div>
  );
}

// ── GALAXY CANVAS ─────────────────────────────────────────────────────────────
function GalaxyCanvas({ scrollY }) {
  const ref=useRef();
  const sceneRef=useRef(); const camRef=useRef(); const rendRef=useRef();
  const shootersRef=useRef([]); const mouseRef=useRef({x:0,y:0});

  useEffect(()=>{
    if(camRef.current){
      camRef.current.position.y=-scrollY*.004;
      camRef.current.position.z=28-scrollY*.007;
      camRef.current.rotation.z=scrollY*.00015;
    }
  },[scrollY]);

  useEffect(()=>{
    if(!window.THREE)return;
    const THREE=window.THREE;
    const canvas=ref.current;
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    renderer.setSize(innerWidth,innerHeight);
    rendRef.current=renderer;
    const scene=new THREE.Scene(); sceneRef.current=scene;
    const camera=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.1,500);
    camera.position.z=28; camRef.current=camera;

    // nebula planes
    [0x1a0533,0x0a1a4a,0x2a0a0a,0x0a2a1a,0x1a1a00,0x100a2a].forEach((col,i)=>{
      const g=new THREE.PlaneGeometry(80+i*30,60+i*20);
      const m=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.04+i*.005,side:THREE.DoubleSide,depthWrite:false});
      const mesh=new THREE.Mesh(g,m);
      mesh.rotation.x=-Math.PI/2+(Math.random()-.5)*.4;
      mesh.rotation.z=(Math.random()-.5)*.5;
      mesh.position.set((Math.random()-.5)*10,(Math.random()-.5)*5,-20-i*8);
      scene.add(mesh);
    });

    // star layers
    const starMeshes=[];
    [{count:5000,spread:200,size:.12,opacity:.9},{count:3000,spread:120,size:.08,opacity:.7},{count:2000,spread:80,size:.18,opacity:.5}].forEach(({count,spread,size,opacity})=>{
      const pos=new Float32Array(count*3),col=new Float32Array(count*3);
      for(let i=0;i<count;i++){
        pos[i*3]=(Math.random()-.5)*spread; pos[i*3+1]=(Math.random()-.5)*spread*.5; pos[i*3+2]=(Math.random()-.5)*spread;
        const t=Math.random();
        if(t<.15){col[i*3]=1;col[i*3+1]=.9;col[i*3+2]=.5;}
        else if(t<.3){col[i*3]=.8;col[i*3+1]=.85;col[i*3+2]=1;}
        else{col[i*3]=1;col[i*3+1]=1;col[i*3+2]=1;}
      }
      const geo=new THREE.BufferGeometry();
      geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
      geo.setAttribute("color",new THREE.BufferAttribute(col,3));
      const mat=new THREE.PointsMaterial({size,vertexColors:true,transparent:true,opacity,sizeAttenuation:true});
      const pts=new THREE.Points(geo,mat); scene.add(pts); starMeshes.push(pts);
    });

    // milky way arm
    const armCount=8000,armPos=new Float32Array(armCount*3),armCol=new Float32Array(armCount*3);
    for(let i=0;i<armCount;i++){
      const angle=(i/armCount)*Math.PI*6,radius=2+i/armCount*40,spread=(Math.random()-.5)*6;
      armPos[i*3]=Math.cos(angle)*radius+(Math.random()-.5)*spread;
      armPos[i*3+1]=(Math.random()-.5)*4;
      armPos[i*3+2]=Math.sin(angle)*radius*.4+(Math.random()-.5)*spread;
      const b=Math.random();
      if(b<.2){armCol[i*3]=1;armCol[i*3+1]=.85;armCol[i*3+2]=.4;}
      else{armCol[i*3]=.7+b*.3;armCol[i*3+1]=.7+b*.3;armCol[i*3+2]=.8+b*.2;}
    }
    const armGeo=new THREE.BufferGeometry();
    armGeo.setAttribute("position",new THREE.BufferAttribute(armPos,3));
    armGeo.setAttribute("color",new THREE.BufferAttribute(armCol,3));
    const arm=new THREE.Points(armGeo,new THREE.PointsMaterial({size:.06,vertexColors:true,transparent:true,opacity:.55,sizeAttenuation:true}));
    arm.rotation.x=Math.PI/6; scene.add(arm);

    // gold dust
    const dustPos=new Float32Array(600*3);
    for(let i=0;i<600;i++){dustPos[i*3]=(Math.random()-.5)*60;dustPos[i*3+1]=(Math.random()-.5)*30;dustPos[i*3+2]=(Math.random()-.5)*40-10;}
    const dustGeo=new THREE.BufferGeometry();
    dustGeo.setAttribute("position",new THREE.BufferAttribute(dustPos,3));
    const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({size:.08,color:0xc9a84c,transparent:true,opacity:.3,sizeAttenuation:true}));
    scene.add(dust);

    // rings
    const rings=[];
    for(let i=0;i<4;i++){
      const rg=new THREE.RingGeometry(8+i*6,8.04+i*6,80);
      const rm=new THREE.MeshBasicMaterial({color:0xc9a84c,transparent:true,opacity:.03+i*.005,side:THREE.DoubleSide});
      const mesh=new THREE.Mesh(rg,rm); mesh.rotation.x=Math.PI/2.5+i*.1; mesh.position.z=-15-i*5;
      scene.add(mesh); rings.push(mesh);
    }

    const onMouse=(e)=>{ mouseRef.current={x:(e.clientX/innerWidth-.5)*2,y:(e.clientY/innerHeight-.5)*2}; };
    window.addEventListener("mousemove",onMouse);
    const onResize=()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); };
    window.addEventListener("resize",onResize);

    let t=0,alive=true;
    const loop=()=>{
      if(!alive)return; requestAnimationFrame(loop); t+=.003;
      const mx=mouseRef.current.x,my=mouseRef.current.y;
      starMeshes.forEach((s,i)=>{ s.rotation.y=t*.02*(i+1)+mx*.05; s.rotation.x=t*.01+my*.03; });
      arm.rotation.y=t*.05+mx*.04; dust.rotation.y=t*.04; dust.rotation.x=t*.02;
      rings.forEach((r,i)=>{ r.rotation.z=t*.03*(i+1); r.material.opacity=.02+Math.sin(t+i)*.015; });
      const shooters=shootersRef.current;
      for(let i=shooters.length-1;i>=0;i--){
        const s=shooters[i]; s.life--;
        const pos=s.geo.attributes.position.array;
        pos[0]+=s.vx; pos[1]+=s.vy; pos[3]=pos[0]-s.vx*8; pos[4]=pos[1]-s.vy*8;
        s.geo.attributes.position.needsUpdate=true;
        s.mat.opacity=Math.max(0,s.life/s.maxLife*.8);
        if(s.life<=0){ scene.remove(s.line); s.geo.dispose(); s.mat.dispose(); shooters.splice(i,1); }
      }
      renderer.render(scene,camera);
    };
    loop();
    return()=>{ alive=false; window.removeEventListener("mousemove",onMouse); window.removeEventListener("resize",onResize); renderer.dispose(); };
  },[]);

  const lastScroll=useRef(0);
  useEffect(()=>{
    if(!window.THREE||!sceneRef.current)return;
    const delta=Math.abs(scrollY-lastScroll.current);
    if(delta<25)return; lastScroll.current=scrollY;
    const THREE=window.THREE; const scene=sceneRef.current;
    const count=Math.min(10,Math.floor(delta/25));
    for(let i=0;i<count;i++){
      const x=(Math.random()-.5)*40,y=(Math.random()-.5)*20,z=-5-Math.random()*15;
      const angle=Math.random()*Math.PI*2,speed=.3+Math.random()*.4;
      const vx=Math.cos(angle)*speed,vy=Math.sin(angle)*speed*.5;
      const geo=new THREE.BufferGeometry();
      const pts=new Float32Array([x,y,z,x-vx*8,y-vy*8,z]);
      geo.setAttribute("position",new THREE.BufferAttribute(pts,3));
      const mat=new THREE.LineBasicMaterial({color:Math.random()>.5?0xf0d080:0xffffff,transparent:true,opacity:.9,linewidth:1});
      const line=new THREE.Line(geo,mat);
      scene.add(line);
      const maxLife=25+Math.floor(Math.random()*20);
      shootersRef.current.push({geo,mat,line,vx,vy,life:maxLife,maxLife});
    }
  },[scrollY]);

  return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;
}

// ── CARD 3D CANVAS ────────────────────────────────────────────────────────────
function CardCanvas({ accent, idx }) {
  const ref=useRef();
  useEffect(()=>{
    if(!window.THREE)return;
    const THREE=window.THREE,canvas=ref.current;
    const w=canvas.parentElement?.clientWidth||300,h=canvas.parentElement?.clientHeight||300;
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.setSize(w,h);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(55,w/h,.1,100); camera.position.z=4;
    const geos=[new THREE.IcosahedronGeometry(.9,1),new THREE.OctahedronGeometry(.95,0),new THREE.TetrahedronGeometry(1.05,0)];
    const color=new THREE.Color(accent);
    const geo=geos[idx%geos.length];
    const wire=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color,wireframe:true,transparent:true,opacity:.55}));
    const inner=new THREE.Mesh(geo.clone(),new THREE.MeshBasicMaterial({color:new THREE.Color(accent).multiplyScalar(.2),transparent:true,opacity:.35}));
    scene.add(wire); scene.add(inner);
    const N=100,op=new Float32Array(N*3);
    for(let i=0;i<N;i++){const phi=Math.acos(1-2*(i/N)),th=Math.PI*(1+Math.sqrt(5))*i,r=1.7;op[i*3]=r*Math.sin(phi)*Math.cos(th);op[i*3+1]=r*Math.sin(phi)*Math.sin(th);op[i*3+2]=r*Math.cos(phi);}
    const pg=new THREE.BufferGeometry(); pg.setAttribute("position",new THREE.BufferAttribute(op,3));
    scene.add(new THREE.Points(pg,new THREE.PointsMaterial({size:.04,color,transparent:true,opacity:.7})));
    let t=Math.random()*100,alive=true;
    const loop=()=>{ if(!alive)return; requestAnimationFrame(loop); t+=.008; wire.rotation.x=t*.35; wire.rotation.y=t*.55; inner.rotation.x=t*.35; inner.rotation.y=t*.55; renderer.render(scene,camera); };
    loop();
    return()=>{ alive=false; renderer.dispose(); };
  },[]);
  return <canvas ref={ref} style={{width:"100%",height:"100%",display:"block"}}/>;
}

// ══════════════════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [threeOk,setThreeOk]=useState(!!window.THREE);
  const [scrollY,setScrollY]=useState(0);
  const [mouse,setMouse]=useState({x:0,y:0});
  const [hovCard,setHovCard]=useState(null);
  const [ctaVis,setCtaVis]=useState(false);
  const ctaRef=useRef();
  const scrambled=useScramble("automate",ctaVis);

  useEffect(()=>{
    if(window.THREE){setThreeOk(true);return;}
    const s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload=()=>setThreeOk(true);
    document.head.appendChild(s);
  },[]);

  useEffect(()=>{
    const onS=()=>setScrollY(window.scrollY);
    const onM=(e)=>setMouse({x:e.clientX,y:e.clientY});
    window.addEventListener("scroll",onS,{passive:true});
    window.addEventListener("mousemove",onM,{passive:true});
    return()=>{ window.removeEventListener("scroll",onS); window.removeEventListener("mousemove",onM); };
  },[]);

  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{if(e.isIntersecting)setCtaVis(true)},{threshold:.3});
    if(ctaRef.current)ob.observe(ctaRef.current); return()=>ob.disconnect();
  },[]);

  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div style={{background:OBSIDIAN,minHeight:"100vh",fontFamily:"'Space Mono',monospace",color:BONE,overflowX:"hidden"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Space+Mono:wght@400;700&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      ::-webkit-scrollbar{width:3px;}
      ::-webkit-scrollbar-thumb{background:${GOLD}55;border-radius:2px;}

      @keyframes fadeUp{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
      @keyframes marqueeL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.15}}
      @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(4deg)}}
      @keyframes orbSpin{to{transform:rotate(360deg)}}
      @keyframes orbSpinR{to{transform:rotate(-360deg)}}
      @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
      @keyframes twinkle{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
      @keyframes breathe{0%,100%{opacity:.05}50%{opacity:.18}}
      @keyframes goldGlow{0%,100%{text-shadow:0 0 20px ${GOLD}44,0 0 60px ${GOLD}22}50%{text-shadow:0 0 40px ${GOLD}99,0 0 120px ${GOLD}55,0 0 200px ${GOLD}22}}
      @keyframes borderPulse{0%,100%{border-color:${GOLD}33}50%{border-color:${GOLD}88}}
      @keyframes lineSlide{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      @keyframes stepGlow{0%,100%{box-shadow:0 0 0px ${GOLD}00}50%{box-shadow:0 0 30px ${GOLD}55}}

      .hero-ch{display:inline-block;transition:transform .35s cubic-bezier(.34,1.56,.64,1),color .25s,text-shadow .25s,filter .3s;cursor:default;}
      .hero-ch:hover{transform:translateY(-15px) scale(1.2) rotate(-3deg)!important;color:${GOLD2}!important;text-shadow:0 0 30px ${GOLD}cc,0 0 80px ${GOLD}77,0 0 150px ${GOLD}33!important;filter:brightness(1.4);}

      .nav-btn{background:none;border:none;cursor:pointer;font-family:'Space Mono',monospace;font-size:.58rem;letter-spacing:.4em;color:rgba(245,240,232,.4);text-transform:uppercase;position:relative;padding-bottom:3px;transition:color .3s,letter-spacing .3s;}
      .nav-btn::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:${GOLD};transition:width .4s cubic-bezier(.23,1,.32,1);}
      .nav-btn:hover{color:${GOLD};letter-spacing:.5em;}
      .nav-btn:hover::after{width:100%;}

      .btn-gold{display:inline-block;padding:.85rem 2.2rem;border:1px solid ${GOLD};color:${GOLD};font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:.35em;text-transform:uppercase;text-decoration:none;background:transparent;cursor:pointer;transition:background .4s,color .4s,letter-spacing .3s,box-shadow .4s;animation:borderPulse 3s ease-in-out infinite;}
      .btn-gold:hover{background:${GOLD};color:${OBSIDIAN};letter-spacing:.5em;box-shadow:0 0 50px ${GOLD}55;}
      .btn-ghost{display:inline-block;padding:.85rem 2.2rem;border:1px solid rgba(245,240,232,.2);color:rgba(245,240,232,.6);font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:.35em;text-transform:uppercase;text-decoration:none;background:transparent;cursor:pointer;transition:border-color .4s,color .4s;}
      .btn-ghost:hover{border-color:${GOLD};color:${GOLD};}

      .svc-card{padding:2.5rem;border:1px solid ${GOLD}15;background:rgba(255,255,255,.015);position:relative;overflow:hidden;transition:border-color .4s,background .4s,transform .4s;}
      .svc-card::before{content:'';position:absolute;top:0;left:0;width:0;height:2px;transition:width .6s cubic-bezier(.23,1,.32,1);}
      .svc-card:hover{border-color:${GOLD}55;background:${GOLD}06;transform:translateY(-4px);}
      .svc-card:hover::before{width:100%;}

      .proj-card{flex-shrink:0;width:clamp(300px,36vw,480px);border:1px solid ${GOLD}18;background:rgba(3,3,10,.75);position:relative;overflow:hidden;transition:border-color .4s,transform .5s cubic-bezier(.23,1,.32,1),box-shadow .5s;cursor:pointer;}
      .proj-card:hover{border-color:${GOLD}77;transform:translateY(-8px) scale(1.01);box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 40px ${GOLD}18;}

      .step-num{width:56px;height:56px;border:1px solid ${GOLD}44;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Cinzel',serif;font-size:1rem;font-weight:700;color:${GOLD};flex-shrink:0;animation:stepGlow 3s ease-in-out infinite;}

      .result-card{padding:2.5rem;border:1px solid ${GOLD}15;background:rgba(255,255,255,.01);text-align:center;position:relative;overflow:hidden;transition:border-color .4s,background .4s;}
      .result-card:hover{border-color:${GOLD}55;background:${GOLD}06;}

      .skill-cell{padding:2.5rem;border-right:1px solid ${GOLD}15;border-bottom:1px solid ${GOLD}15;position:relative;overflow:hidden;transition:background .4s;}
      .skill-cell::before{content:'';position:absolute;top:0;left:0;width:0;height:2px;background:linear-gradient(90deg,${GOLD},${GOLD2});transition:width .6s cubic-bezier(.23,1,.32,1);}
      .skill-cell:hover::before{width:100%;}
      .skill-cell:hover{background:${GOLD}07;}

      .cta{display:inline-block;padding:1.1rem 3.5rem;border:1px solid ${GOLD};color:${GOLD};font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.4em;text-transform:uppercase;text-decoration:none;position:relative;overflow:hidden;transition:color .4s,letter-spacing .3s,box-shadow .4s;animation:borderPulse 3s ease-in-out infinite;}
      .cta::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,${GOLD}22,${GOLD},${GOLD}22,transparent);transition:left .5s cubic-bezier(.23,1,.32,1);}
      .cta:hover::before{left:100%;}
      .cta:hover{color:${BONE};letter-spacing:.55em;box-shadow:0 0 60px ${GOLD}44,0 0 120px ${GOLD}22;}
    `}</style>

    {/* Mouse glow */}
    <div style={{position:"fixed",pointerEvents:"none",zIndex:1,width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${GOLD}09 0%,transparent 70%)`,transform:`translate(${mouse.x-250}px,${mouse.y-250}px)`,transition:"transform .1s linear"}}/>

    {/* Galaxy */}
    {threeOk && <GalaxyCanvas scrollY={scrollY}/>}

    {/* CSS twinkling stars */}
    {[...Array(55)].map((_,i)=>(
      <div key={i} style={{position:"fixed",pointerEvents:"none",zIndex:2,width:i%7===0?3:i%5===0?2:1.5,height:i%7===0?3:i%5===0?2:1.5,borderRadius:"50%",background:i%4===0?GOLD:BONE,left:`${(i*17.3)%100}%`,top:`${(i*13.7)%100}%`,animation:`twinkle ${2+i*.07}s ease-in-out infinite`,animationDelay:`${(i*.13)%5}s`,opacity:.35}}/>
    ))}

    {/* ── NAV ──────────────────────────────────────────────────────────────── */}
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"1.5rem 3rem",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(to bottom,rgba(3,3,10,.95),transparent)"}}>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:"1.3rem",fontWeight:700,color:BONE,letterSpacing:".15em",animation:"goldGlow 4s ease-in-out infinite"}}>
        NAB<span style={{color:GOLD}}>IN</span>
      </div>
      <div style={{display:"flex",gap:"2.2rem"}}>
        {["services","work","how","results","about","contact"].map(s=>(
          <button key={s} className="nav-btn" onClick={()=>go(s)}>{s}</button>
        ))}
      </div>
    </nav>

    {/* ══ HERO ══════════════════════════════════════════════════════════════════ */}
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",position:"relative",overflow:"hidden",zIndex:10,padding:"8rem 4vw 6rem"}}>

      {[...Array(9)].map((_,i)=>(
        <div key={i} style={{position:"absolute",top:0,bottom:0,left:`${(i+1)*10}%`,width:1,background:`linear-gradient(to bottom,transparent,${GOLD}10,transparent)`,animation:`breathe ${2.5+i*.3}s ease-in-out infinite`,animationDelay:`${i*.15}s`}}/>
      ))}

      {/* Eyebrow */}
      <p style={{fontFamily:"'Cinzel',serif",fontSize:".6rem",letterSpacing:".6em",color:GOLD,textTransform:"uppercase",animation:"fadeUp 1s .3s both",marginBottom:"2rem",textShadow:`0 0 20px ${GOLD}66`}}>
        AI Systems Builder · Perth, Australia
      </p>

      {/* Name */}
      <div style={{perspective:"800px",animation:"fadeUp 1.3s .5s both",marginBottom:"1.5rem"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:".15em"}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(4rem,11vw,10rem)",fontWeight:900,letterSpacing:".08em",lineHeight:.9,userSelect:"none"}}>
            {"NABIN".split("").map((ch,i)=>(
              <span key={i} className="hero-ch" style={{
                color:ch==="N"?GOLD:BONE,
                display:"inline-block",
                textShadow:ch==="N"?`0 0 30px ${GOLD}88`:undefined,
              }}>{ch}</span>
            ))}
          </div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2rem,5.5vw,5.5rem)",fontWeight:900,letterSpacing:".12em",lineHeight:.9,userSelect:"none"}}>
            {"DHAMI".split("").map((ch,i)=>(
              <span key={i} className="hero-ch" style={{
                color:ch==="D"?GOLD:BONE,
                display:"inline-block",
                textShadow:ch==="D"?`0 0 30px ${GOLD}88`:undefined,
              }}>{ch}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero headline */}
      <p style={{
        fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.1rem,2.5vw,1.8rem)",fontStyle:"italic",fontWeight:300,
        color:BONE,maxWidth:"700px",lineHeight:1.5,animation:"fadeUp 1s .9s both",marginBottom:"1rem",
      }}>
        I build AI receptionists that capture missed calls and turn them into bookings.
      </p>
      <p style={{
        fontFamily:"'Space Mono',monospace",fontSize:".72rem",letterSpacing:".12em",
        color:"rgba(245,240,232,.45)",maxWidth:"580px",lineHeight:1.8,animation:"fadeUp 1s 1.1s both",marginBottom:"3rem",
      }}>
        Helping local businesses automate calls, bookings, and follow-ups using AI.
      </p>

      {/* CTAs */}
      <div style={{display:"flex",gap:"1.2rem",flexWrap:"wrap",justifyContent:"center",animation:"fadeUp 1s 1.4s both"}}>
        <button className="btn-gold" onClick={()=>go("demo")}>Book a Demo</button>
        <button className="btn-ghost" onClick={()=>go("how")}>See How It Works</button>
      </div>

      {/* Shimmer sub */}
      <p style={{
        fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(.8rem,1.5vw,1.1rem)",fontStyle:"italic",
        marginTop:"3rem",animation:"fadeUp 1s 1.7s both,shimmer 5s 3s linear infinite",
        background:`linear-gradient(90deg,rgba(245,240,232,.15) 0%,${GOLD} 50%,rgba(245,240,232,.15) 100%)`,
        backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
      }}>
        Software Architect &nbsp;·&nbsp; AI Automation &nbsp;·&nbsp; Digital Ventures
      </p>

      {/* Scroll cue */}
      <div style={{position:"absolute",bottom:"2.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:".6rem",animation:"fadeUp 1s 2.2s both"}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:".5rem",letterSpacing:".5em",color:GOLD,textTransform:"uppercase"}}>Scroll</span>
        <div style={{width:1,height:55,background:`linear-gradient(to bottom,${GOLD},transparent)`,animation:"pulse 2s ease-in-out infinite"}}/>
      </div>
    </section>

    {/* ══ MARQUEE ════════════════════════════════════════════════════════════════ */}
    <div style={{overflow:"hidden",borderTop:`1px solid ${GOLD}22`,borderBottom:`1px solid ${GOLD}22`,padding:"1.3rem 0",background:"rgba(3,3,10,.8)",zIndex:10,position:"relative"}}>
      <div style={{display:"flex",gap:"3rem",animation:"marqueeL 22s linear infinite",width:"max-content"}}>
        {[...Array(2)].flatMap(()=>["AI Receptionist","✦","Automation","✦","Lead Systems","✦","Voice AI","✦","n8n Workflows","✦","24/7 Bookings","✦","Perth AU","✦"]).map((item,i)=>(
          <span key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontStyle:item==="✦"?"normal":"italic",color:item==="✦"?GOLD:`${GOLD}55`,whiteSpace:"nowrap",letterSpacing:".12em"}}>{item}</span>
        ))}
      </div>
    </div>

    {/* ══ SERVICES / WHAT I DO ═══════════════════════════════════════════════════ */}
    <section id="services" style={{padding:"9rem 6vw",zIndex:10,position:"relative",background:"rgba(3,3,10,.6)"}}>
      <div style={{maxWidth:1300,margin:"0 auto"}}>
        <Label text="What I Do"/>
        <div style={{marginBottom:"4rem"}}>
          <Reveal3D text="AI Systems" size="clamp(2.8rem,5vw,5rem)" color={BONE} font="cinzel" stagger={40}/>
          <Reveal3D text=" that work" size="clamp(2.8rem,5vw,5rem)" color={GOLD} italic stagger={40} delay={300}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1.5px"}}>
          {SERVICES.map((sv,i)=>(
            <FadeIn key={sv.title} delay={i*100}>
              <div className="svc-card" style={{"--acc":sv.accent}}>
                <style>{`.svc-card:nth-child(${i+1})::before{background:linear-gradient(90deg,${sv.accent},${sv.accent}88);}`}</style>
                <div style={{display:"flex",gap:"1.5rem",alignItems:"flex-start"}}>
                  <div style={{fontSize:"2.2rem",flexShrink:0}}>{sv.icon}</div>
                  <div>
                    <h3 style={{fontFamily:"'Cinzel',serif",fontSize:"1rem",fontWeight:600,color:BONE,marginBottom:".8rem",letterSpacing:".05em",lineHeight:1.4}}>
                      <Liquid text={sv.title} base={BONE} hover={sv.accent} size="1rem"/>
                    </h3>
                    <p style={{fontSize:".7rem",color:"rgba(245,240,232,.45)",lineHeight:1.9}}>→ {sv.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ FEATURED WORK ══════════════════════════════════════════════════════════ */}
    <section id="work" style={{padding:"8rem 0",zIndex:10,position:"relative",background:"rgba(3,3,10,.75)"}}>
      <div style={{padding:"0 6vw",marginBottom:"4rem",maxWidth:1300,marginLeft:"auto",marginRight:"auto"}}>
        <Label text="Featured Work"/>
        <Reveal3D text="What I've built" size="clamp(2.8rem,5vw,5rem)" color={BONE} font="cinzel" stagger={30}/>
      </div>
      <div style={{display:"flex",gap:3,padding:"0 6vw",overflowX:"auto",scrollbarWidth:"none",cursor:"grab",paddingBottom:"2.5rem"}}>
        {PROJECTS.map((p,i)=>(
          <div key={p.name} className="proj-card" onMouseEnter={()=>setHovCard(i)} onMouseLeave={()=>setHovCard(null)}>
            {/* 3D shape */}
            <div style={{height:220,position:"relative",overflow:"hidden",opacity:hovCard===i?.9:.4,transition:"opacity .5s"}}>
              {threeOk && <CardCanvas accent={p.accent} idx={i}/>}
            </div>
            {/* glow */}
            <div style={{position:"absolute",top:0,left:0,right:0,height:220,background:`radial-gradient(circle at 50% 50%,${p.accent}20,transparent 65%)`,opacity:hovCard===i?1:0,transition:"opacity .5s",pointerEvents:"none"}}/>
            {/* corner brackets */}
            {[["top","left"],["bottom","right"]].map(([v,h])=>(
              <div key={`${v}${h}`} style={{position:"absolute",[v]:12,[h]:12,zIndex:2}}>
                <div style={{width:hovCard===i?28:0,height:1,background:p.accent,transition:"width .4s"}}/>
                <div style={{width:1,height:hovCard===i?28:0,background:p.accent,transition:"height .4s"}}/>
              </div>
            ))}
            {/* content */}
            <div style={{padding:"2rem 2.5rem 2.5rem",borderTop:`1px solid ${p.accent}22`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
                <p style={{fontSize:".5rem",letterSpacing:".45em",color:p.accent}}>{p.num} / 03</p>
                <span style={{fontSize:".5rem",letterSpacing:".3em",color:p.accent,border:`1px solid ${p.accent}`,padding:".2rem .6rem",textTransform:"uppercase"}}>{p.tag}</span>
              </div>
              <h3 style={{fontFamily:"'Cinzel',serif",fontSize:"1.5rem",fontWeight:700,color:BONE,marginBottom:"1.5rem"}}>
                <Liquid text={p.name} base={BONE} hover={p.accent}/>
              </h3>
              {[["Problem",p.problem],["Solution",p.solution],["Result",p.result]].map(([label,txt])=>(
                <div key={label} style={{marginBottom:"1rem"}}>
                  <span style={{fontSize:".52rem",letterSpacing:".4em",color:GOLD,textTransform:"uppercase",display:"block",marginBottom:".3rem"}}>{label}</span>
                  <p style={{fontSize:".68rem",color:"rgba(245,240,232,.5)",lineHeight:1.85}}>{txt}</p>
                </div>
              ))}
              <div style={{display:"flex",gap:".8rem",marginTop:"1.8rem",flexWrap:"wrap"}}>
                {p.links.map(l=>(
                  <a key={l.label} href={l.href} className="btn-ghost" style={{fontSize:".52rem",padding:".6rem 1.4rem"}}>{l.label}</a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ══ LIVE DEMO ══════════════════════════════════════════════════════════════ */}
    <section id="demo" style={{padding:"9rem 6vw",zIndex:10,position:"relative",background:`rgba(201,168,76,.02)`,borderTop:`1px solid ${GOLD}15`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <Label text="Live Demo"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
          <div>
            <Reveal3D text="Try the AI" size="clamp(2.5rem,4vw,4.5rem)" color={BONE} font="cinzel" stagger={40}/>
            <Reveal3D text="Receptionist" size="clamp(2.5rem,4vw,4.5rem)" color={GOLD} italic stagger={35} delay={250}/>
            <p style={{fontSize:".78rem",color:"rgba(245,240,232,.5)",lineHeight:2,marginTop:"1.8rem",marginBottom:"2.5rem"}}>
              Call and experience how it handles bookings in real time. Hear the AI pick up, qualify your inquiry, and book you in — all without a human.
            </p>
            <FadeIn delay={200}>
              <div style={{border:`1px solid ${GOLD}33`,padding:"2rem",background:"rgba(201,168,76,.04)",marginBottom:"1.5rem"}}>
                <p style={{fontSize:".55rem",letterSpacing:".4em",color:GOLD,textTransform:"uppercase",marginBottom:".8rem"}}>Call Now</p>
                <p style={{fontFamily:"'Cinzel',serif",fontSize:"2rem",fontWeight:700,color:BONE,letterSpacing:".1em",animation:"goldGlow 3s ease-in-out infinite"}}>
                  +61 485 010 230
                </p>
                <p style={{fontSize:".6rem",color:"rgba(245,240,232,.3)",marginTop:".5rem"}}>Live AI receptionist — available 24/7</p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={300}>
            <div style={{border:`1px solid ${GOLD}22`,background:"rgba(3,3,10,.8)",aspectRatio:"16/9",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
              {/* Animated rings behind play button */}
              {[1,2,3].map(n=>(
                <div key={n} style={{position:"absolute",borderRadius:"50%",border:`1px solid ${GOLD}${["22","14","0a"][n-1]}`,width:`${n*35}%`,height:`${n*35}%`,animation:`orbSpin ${8+n*5}s linear infinite`}}/>
              ))}
              <div style={{width:70,height:70,borderRadius:"50%",border:`2px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",cursor:"pointer",transition:"background .3s",background:`${GOLD}11`}}>
                <div style={{width:0,height:0,borderStyle:"solid",borderWidth:"12px 0 12px 22px",borderColor:`transparent transparent transparent ${GOLD}`,marginLeft:4}}/>
              </div>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:".55rem",letterSpacing:".4em",color:"rgba(245,240,232,.35)",textTransform:"uppercase",marginTop:"1.5rem",position:"relative"}}>Watch Demo Video</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* ══ HOW IT WORKS ═══════════════════════════════════════════════════════════ */}
    <section id="how" style={{padding:"9rem 6vw",zIndex:10,position:"relative",background:"rgba(3,3,10,.7)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <Label text="Process"/>
        <div style={{marginBottom:"5rem"}}>
          <Reveal3D text="How it works" size="clamp(2.8rem,5vw,5rem)" color={BONE} font="cinzel" stagger={35}/>
        </div>
        <div style={{position:"relative"}}>
          {/* vertical line */}
          <div style={{position:"absolute",left:27,top:0,bottom:0,width:1,background:`linear-gradient(to bottom,${GOLD}33,${GOLD}11)`}}/>
          <div style={{display:"flex",flexDirection:"column",gap:"3rem"}}>
            {HOW_IT_WORKS.map((step,i)=>(
              <FadeIn key={step.n} delay={i*120}>
                <div style={{display:"flex",gap:"2.5rem",alignItems:"flex-start"}}>
                  <div className="step-num" style={{animationDelay:`${i*.5}s`}}>{step.n}</div>
                  <div style={{paddingTop:".8rem"}}>
                    <h3 style={{fontFamily:"'Cinzel',serif",fontSize:"1.3rem",fontWeight:700,color:BONE,marginBottom:".7rem",letterSpacing:".08em"}}>
                      <Liquid text={step.title} base={BONE} hover={GOLD}/>
                    </h3>
                    <p style={{fontSize:".72rem",color:"rgba(245,240,232,.45)",lineHeight:1.9,maxWidth:"55ch"}}>{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ══ RESULTS & IMPACT ═══════════════════════════════════════════════════════ */}
    <section id="results" style={{padding:"9rem 6vw",zIndex:10,position:"relative",borderTop:`1px solid ${GOLD}15`,background:`rgba(201,168,76,.025)`}}>
      <div style={{maxWidth:1300,margin:"0 auto"}}>
        <Label text="Results & Impact"/>
        <div style={{marginBottom:"5rem"}}>
          <Reveal3D text="What you gain" size="clamp(2.8rem,5vw,5rem)" color={BONE} font="cinzel" stagger={35}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1.5px",marginBottom:"4rem"}}>
          {RESULTS.map((r,i)=>(
            <FadeIn key={r.label} delay={i*80}>
              <div className="result-card">
                <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2.5rem,4vw,3.5rem)",fontWeight:900,color:GOLD,lineHeight:1,marginBottom:".5rem",animation:"goldGlow 4s ease-in-out infinite",animationDelay:`${i*.5}s`}}>
                  <Counter val={isNaN(r.stat)?r.stat:parseInt(r.stat)} suffix={r.stat.includes("×")?"×":r.stat.includes("/")?"/7":""}/>
                </div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:".75rem",fontWeight:600,color:BONE,letterSpacing:".15em",textTransform:"uppercase",marginBottom:".5rem"}}>{r.label}</div>
                <div style={{fontSize:".62rem",color:"rgba(245,240,232,.35)",lineHeight:1.7}}>{r.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        {/* Benefit list */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",maxWidth:800,margin:"0 auto"}}>
          {["Reduce missed calls and lost opportunities","Capture bookings automatically 24/7","Save time on manual and repetitive tasks","Improve customer response speed instantly"].map((b,i)=>(
            <FadeIn key={b} delay={i*80}>
              <div style={{display:"flex",gap:"1rem",alignItems:"flex-start",padding:"1.2rem",border:`1px solid ${GOLD}18`}}>
                <span style={{color:GOLD,fontSize:"1rem",flexShrink:0,marginTop:".1rem"}}>✔</span>
                <p style={{fontSize:".7rem",color:"rgba(245,240,232,.55)",lineHeight:1.75}}>{b}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* ══ ABOUT ══════════════════════════════════════════════════════════════════ */}
    <section id="about" style={{padding:"9rem 6vw",position:"relative",zIndex:10,background:"rgba(3,3,10,.6)"}}>
      <div style={{maxWidth:1300,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6rem",alignItems:"center"}}>
        <div>
          <Label text="About"/>
          <div style={{marginBottom:".15em"}}><Reveal3D text="Building" size="clamp(2.5rem,4.5vw,5rem)" color={BONE} stagger={38}/></div>
          <div style={{marginBottom:".15em"}}><Reveal3D text="AI systems" size="clamp(2.5rem,4.5vw,5rem)" color={GOLD} italic stagger={38} delay={180}/></div>
          <div style={{marginBottom:"2rem"}}><Reveal3D text="that replace" size="clamp(2.5rem,4.5vw,5rem)" color={BONE} stagger={38} delay={360}/></div>
          <p style={{fontSize:".78rem",lineHeight:2.1,color:"rgba(245,240,232,.5)",maxWidth:"48ch",marginBottom:"2.5rem"}}>
            I build AI systems that replace repetitive work and help businesses grow faster. Focused on automation, AI voice agents, and real-world business impact. Based in Perth, Australia.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
            {[["6+","Projects Delivered"],["24/7","Systems Running"],["Perth","Based in AU"]].map(([v,label])=>(
              <div key={label} style={{borderTop:`1px solid ${GOLD}33`,paddingTop:"1.2rem"}}>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:"2.5rem",fontWeight:700,color:GOLD,lineHeight:1,textShadow:`0 0 20px ${GOLD}55`}}>{v}</div>
                <div style={{fontSize:".52rem",letterSpacing:".35em",color:"rgba(245,240,232,.3)",textTransform:"uppercase",marginTop:".4rem"}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Orb */}
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{width:"min(360px,75vw)",height:"min(360px,75vw)",position:"relative"}}>
            {[{s:1,d:12,r:"orbSpin"},{s:.82,d:16,r:"orbSpinR"},{s:.63,d:20,r:"orbSpin"},{s:.44,d:26,r:"orbSpinR"}].map(({s,d,r},i)=>(
              <div key={i} style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${GOLD}${["44","2a","1a","0e"][i]}`,transform:`scale(${s})`,animation:`${r} ${d}s linear infinite`}}/>
            ))}
            <div style={{position:"absolute",inset:"22%",borderRadius:"50%",background:`radial-gradient(circle,${GOLD}25 0%,transparent 70%)`,animation:"pulse 3s ease-in-out infinite"}}/>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:"5.5rem",fontWeight:900,color:GOLD,animation:"float 4s ease-in-out infinite,goldGlow 3s ease-in-out infinite"}}>N</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ TESTIMONIAL ════════════════════════════════════════════════════════════ */}
    <section style={{padding:"7rem 6vw",zIndex:10,position:"relative",borderTop:`1px solid ${GOLD}15`,background:"rgba(3,3,10,.8)"}}>
      <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <Label text="Client Words"/>
        <FadeIn>
          <div style={{position:"relative",padding:"4rem",border:`1px solid ${GOLD}22`,background:"rgba(201,168,76,.03)"}}>
            {/* quote mark */}
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"8rem",color:`${GOLD}22`,lineHeight:0,position:"absolute",top:"2rem",left:"2.5rem",fontWeight:300}}>"</div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.2rem,2.5vw,1.8rem)",fontStyle:"italic",fontWeight:300,color:"rgba(245,240,232,.75)",lineHeight:1.7,position:"relative"}}>
              Nabin helped us reduce missed calls and improve our bookings. The AI system runs 24/7 without any extra staff needed.
            </p>
            <div style={{marginTop:"2rem",borderTop:`1px solid ${GOLD}22`,paddingTop:"1.5rem"}}>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:".75rem",color:GOLD,letterSpacing:".2em"}}>CLIENT NAME</p>
              <p style={{fontSize:".58rem",color:"rgba(245,240,232,.3)",letterSpacing:".3em",marginTop:".3rem",textTransform:"uppercase"}}>Perth, Australia — replace with real testimonial</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ══ FINAL CTA / CONTACT ════════════════════════════════════════════════════ */}
    <section id="contact" ref={ctaRef} style={{padding:"9rem 6vw",textAlign:"center",zIndex:10,position:"relative",overflow:"hidden",background:"rgba(3,3,10,.9)"}}>
      {[1,2,3,4].map(n=>(
        <div key={n} style={{position:"absolute",top:"50%",left:"50%",borderRadius:"50%",border:`1px solid ${GOLD}${["18","10","0a","06"][n-1]}`,width:`${n*28}vw`,height:`${n*28}vw`,transform:"translate(-50%,-50%)",animation:`orbSpin ${12+n*10}s linear infinite`,pointerEvents:"none"}}/>
      ))}
      <div style={{position:"relative"}}>
        <Label text="Let's Build"/>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1rem,2.5vw,1.8rem)",fontStyle:"italic",fontWeight:300,color:"rgba(245,240,232,.3)",letterSpacing:".12em",marginBottom:".5rem"}}>
          Ready to automate your business?
        </p>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(3rem,8vw,8rem)",fontWeight:900,lineHeight:.92,marginBottom:"1rem",animation:"goldGlow 3s ease-in-out infinite"}}>
          <Glitch text="LET'S" style={{display:"block",color:BONE}}/>
          <span style={{display:"block",fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontWeight:300,color:GOLD,fontSize:"clamp(3.5rem,9vw,9rem)"}}>
            {ctaVis?scrambled:"automate"}
          </span>
        </div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1rem,2vw,1.5rem)",fontStyle:"italic",fontWeight:300,color:"rgba(245,240,232,.4)",marginBottom:"3rem",letterSpacing:".08em"}}>
          Let's build a system that works for you 24/7.
        </p>
        <div style={{display:"flex",gap:"1.2rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem"}}>
          <button className="btn-gold" onClick={()=>go("demo")}>Book a Demo</button>
          <a href="mailto:nabin@example.com" className="cta">Contact Me</a>
        </div>
        <p style={{fontSize:".58rem",letterSpacing:".35em",color:"rgba(245,240,232,.2)",textTransform:"uppercase",marginTop:"2rem"}}>nabin@example.com &nbsp;·&nbsp; Perth, Australia</p>
      </div>
    </section>

    {/* FOOTER */}
    <footer style={{borderTop:`1px solid ${GOLD}15`,padding:"2rem 6vw",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10,position:"relative"}}>
      {["© 2025 Nabin Dhami","Perth · Australia · Everywhere","AI Systems Builder"].map(t=>(
        <span key={t} style={{fontSize:".52rem",letterSpacing:".35em",color:"rgba(245,240,232,.15)",textTransform:"uppercase"}}>{t}</span>
      ))}
    </footer>
    </div>
  );
}
