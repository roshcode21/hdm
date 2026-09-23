import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas=document.querySelector("#hero-webgl");
if(!canvas)throw new Error("HDM canvas not found");

const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));
renderer.outputColorSpace=THREE.SRGBColorSpace;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(43,1,.1,60);
camera.position.set(0,0,8.5);

const group=new THREE.Group();
scene.add(group);

const disc=new THREE.Mesh(
  new THREE.RingGeometry(1.45,3.05,96),
  new THREE.MeshPhysicalMaterial({
    color:0xe8e6ff,
    metalness:.38,
    roughness:.2,
    transparent:true,
    opacity:.7,
    iridescence:1,
    iridescenceIOR:1.25,
    iridescenceThicknessRange:[120,420],
    clearcoat:.8,
    side:THREE.DoubleSide
  })
);
disc.rotation.x=-.34;
group.add(disc);

const ring1=new THREE.Mesh(
  new THREE.TorusGeometry(3.72,.045,12,110),
  new THREE.MeshBasicMaterial({color:0xff72b6,transparent:true,opacity:.38})
);
ring1.rotation.set(1.05,.12,-.4);
group.add(ring1);

const ring2=new THREE.Mesh(
  new THREE.TorusGeometry(4.18,.032,10,100),
  new THREE.MeshBasicMaterial({color:0xdcff4d,transparent:true,opacity:.4})
);
ring2.rotation.set(.25,1.12,.4);
group.add(ring2);

const orbGeo=new THREE.IcosahedronGeometry(.48,1);
const orbMat=new THREE.MeshPhysicalMaterial({color:0x82dcff,roughness:.22,metalness:.12,transparent:true,opacity:.42,clearcoat:.8});
const orb1=new THREE.Mesh(orbGeo,orbMat);orb1.position.set(-3.8,2,-.5);group.add(orb1);
const orb2=new THREE.Mesh(orbGeo,orbMat.clone());orb2.material.color.set(0xff72b6);orb2.position.set(4,-1.9,.5);orb2.scale.setScalar(.8);group.add(orb2);

const pts=new Float32Array(90*3);
for(let i=0;i<90;i++){
  const a=Math.random()*Math.PI*2,r=4+Math.random()*4;
  pts[i*3]=Math.cos(a)*r;
  pts[i*3+1]=(Math.random()-.5)*6;
  pts[i*3+2]=Math.sin(a)*r*.45;
}
const pg=new THREE.BufferGeometry();
pg.setAttribute("position",new THREE.BufferAttribute(pts,3));
const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0xffffff,size:.035,transparent:true,opacity:.48,depthWrite:false}));
scene.add(particles);

scene.add(new THREE.AmbientLight(0xffffff,1.4));
const pink=new THREE.PointLight(0xff72b6,18,16);pink.position.set(-4,3,5);scene.add(pink);
const blue=new THREE.PointLight(0x82dcff,14,16);blue.position.set(4,-2,4);scene.add(blue);

let mx=0,my=0,raf=0,running=false,last=0;
addEventListener("pointermove",e=>{
  mx=e.clientX/innerWidth-.5;
  my=e.clientY/innerHeight-.5;
},{passive:true});

function resize(){
  const r=canvas.getBoundingClientRect();
  renderer.setSize(r.width,r.height,false);
  camera.aspect=r.width/r.height;
  camera.updateProjectionMatrix();
}
resize();
addEventListener("resize",resize,{passive:true});

function frame(t){
  if(!running)return;
  const dt=Math.min(.04,(t-last)/1000||.016);last=t;
  group.rotation.y+=(mx*.24-group.rotation.y)*.035;
  group.rotation.x+=(-my*.12-group.rotation.x)*.035;
  disc.rotation.z+=dt*.035;
  ring1.rotation.z+=dt*.02;
  ring2.rotation.y+=dt*.025;
  orb1.rotation.x+=dt*.12;orb1.rotation.y+=dt*.16;
  orb2.rotation.x-=dt*.1;orb2.rotation.y+=dt*.13;
  particles.rotation.z+=dt*.008;
  renderer.render(scene,camera);
  raf=requestAnimationFrame(frame);
}
function start(){
  if(running)return;
  running=true;last=performance.now();raf=requestAnimationFrame(frame);
}
function stop(){
  running=false;
  if(raf)cancelAnimationFrame(raf);
  raf=0;
}
const hero=document.querySelector(".hero");
const observer=new IntersectionObserver(entries=>entries[0]?.isIntersecting?start():stop(),{threshold:.02});
observer.observe(hero);
document.addEventListener("visibilitychange",()=>document.hidden?stop():start());
