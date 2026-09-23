import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas=document.querySelector("#hero-webgl");
if(canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:"high-performance"});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  renderer.outputColorSpace=THREE.SRGBColorSpace;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,100);
  camera.position.set(0,0,8.5);

  const group=new THREE.Group();
  scene.add(group);

  const discMat=new THREE.MeshPhysicalMaterial({
    color:0xe8e8ff,metalness:.55,roughness:.18,transparent:true,opacity:.72,
    iridescence:1,iridescenceIOR:1.3,iridescenceThicknessRange:[120,480],
    clearcoat:1,clearcoatRoughness:.1,side:THREE.DoubleSide
  });
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.55,3.05,128),discMat);
  ring.rotation.x=-.35;
  ring.rotation.z=.15;
  group.add(ring);

  const innerMat=new THREE.MeshPhysicalMaterial({
    color:0xff78b9,metalness:.15,roughness:.15,transparent:true,opacity:.35,
    transmission:.25,thickness:.7,side:THREE.DoubleSide
  });
  const inner=new THREE.Mesh(new THREE.RingGeometry(.55,1.25,96),innerMat);
  inner.position.z=.08;
  inner.rotation.copy(ring.rotation);
  group.add(inner);

  const torusMat=new THREE.MeshPhysicalMaterial({
    color:0x9e84ff,metalness:.3,roughness:.2,transparent:true,opacity:.5,
    transmission:.18,thickness:.45,clearcoat:1
  });
  const torus=new THREE.Mesh(new THREE.TorusGeometry(3.7,.055,20,160),torusMat);
  torus.rotation.set(1.05,.15,-.4);
  group.add(torus);

  const torus2=new THREE.Mesh(new THREE.TorusGeometry(4.25,.035,16,150),new THREE.MeshBasicMaterial({color:0xddff4a,transparent:true,opacity:.5}));
  torus2.rotation.set(.2,1.15,.45);
  group.add(torus2);

  const sparkGeo=new THREE.BufferGeometry();
  const count=170;
  const pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const r=4+Math.random()*4;
    const a=Math.random()*Math.PI*2;
    pos[i*3]=Math.cos(a)*r;
    pos[i*3+1]=(Math.random()-.5)*6.5;
    pos[i*3+2]=Math.sin(a)*r*.5;
  }
  sparkGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const sparks=new THREE.Points(sparkGeo,new THREE.PointsMaterial({color:0xffffff,size:.035,transparent:true,opacity:.55}));
  scene.add(sparks);

  scene.add(new THREE.AmbientLight(0xffffff,1.5));
  const p1=new THREE.PointLight(0xff72b6,24,20);p1.position.set(-4,3,5);scene.add(p1);
  const p2=new THREE.PointLight(0x82dcff,18,18);p2.position.set(4,-2,4);scene.add(p2);
  const p3=new THREE.PointLight(0xddff4a,12,14);p3.position.set(0,4,-1);scene.add(p3);

  let mx=0,my=0,scroll=0;
  addEventListener("pointermove",e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);},{passive:true});
  addEventListener("scroll",()=>{scroll=scrollY;},{passive:true});

  function resize(){
    const rect=canvas.getBoundingClientRect();
    renderer.setSize(rect.width,rect.height,false);
    camera.aspect=rect.width/rect.height;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener("resize",resize);

  let last=0;
  function tick(t){
    requestAnimationFrame(tick);
    const dt=Math.min(.04,(t-last)/1000||.016);last=t;
    group.rotation.z+=dt*.055;
    group.rotation.y+=(mx*.35-group.rotation.y)*.035;
    group.rotation.x+=(-my*.18-group.rotation.x)*.035;
    group.position.y+=(Math.sin(t*.00055)*.12-group.position.y)*.03;
    ring.rotation.z+=dt*.03;
    torus.rotation.z+=dt*.025;
    torus2.rotation.y+=dt*.03;
    sparks.rotation.z=t*.000025;
    camera.position.y+=(Math.min(1.1,scroll/innerHeight)*-.25-camera.position.y)*.025;
    renderer.render(scene,camera);
  }
  requestAnimationFrame(tick);
}
