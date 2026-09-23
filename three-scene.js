import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas=document.querySelector("#hero-webgl");
if(canvas && !matchMedia("(prefers-reduced-motion: reduce)").matches){
  const mobile=matchMedia("(max-width: 820px)").matches;
  const renderer=new THREE.WebGLRenderer({
    canvas,
    alpha:true,
    antialias:!mobile,
    powerPreference:"high-performance"
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.7));
  renderer.outputColorSpace=THREE.SRGBColorSpace;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(mobile?50:42,1,.1,100);
  camera.position.set(0,0,mobile?9.25:8.5);

  const world=new THREE.Group();
  scene.add(world);

  const cdGroup=new THREE.Group();
  world.add(cdGroup);

  const discMat=new THREE.MeshPhysicalMaterial({
    color:0xe8e8ff,
    metalness:.48,
    roughness:.14,
    transparent:true,
    opacity:.73,
    iridescence:1,
    iridescenceIOR:1.33,
    iridescenceThicknessRange:[110,520],
    clearcoat:1,
    clearcoatRoughness:.08,
    side:THREE.DoubleSide
  });

  const ring=new THREE.Mesh(new THREE.RingGeometry(1.5,3.08,160),discMat);
  ring.rotation.x=-.34;
  ring.rotation.z=.12;
  cdGroup.add(ring);

  const innerMat=new THREE.MeshPhysicalMaterial({
    color:0xff78b9,
    metalness:.12,
    roughness:.12,
    transparent:true,
    opacity:.38,
    transmission:.32,
    thickness:.72,
    clearcoat:1,
    side:THREE.DoubleSide
  });

  const inner=new THREE.Mesh(new THREE.RingGeometry(.5,1.22,120),innerMat);
  inner.position.z=.09;
  inner.rotation.copy(ring.rotation);
  cdGroup.add(inner);

  const glassMat=new THREE.MeshPhysicalMaterial({
    color:0x9e84ff,
    metalness:.14,
    roughness:.12,
    transparent:true,
    opacity:.46,
    transmission:.35,
    thickness:.7,
    clearcoat:1,
    clearcoatRoughness:.08
  });

  const torus=new THREE.Mesh(new THREE.TorusGeometry(3.7,.055,22,180),glassMat);
  torus.rotation.set(1.05,.15,-.4);
  world.add(torus);

  const torus2=new THREE.Mesh(
    new THREE.TorusGeometry(4.3,.035,18,180),
    new THREE.MeshBasicMaterial({color:0xddff4a,transparent:true,opacity:.5})
  );
  torus2.rotation.set(.22,1.16,.45);
  world.add(torus2);

  const orbMat=new THREE.MeshPhysicalMaterial({
    color:0xffffff,
    metalness:.12,
    roughness:.08,
    transparent:true,
    opacity:.38,
    transmission:.42,
    thickness:.9,
    iridescence:1,
    iridescenceIOR:1.25,
    iridescenceThicknessRange:[80,420],
    clearcoat:1
  });

  const orbPositions=[
    [-4.25,2.1,-.6,.62],
    [4.15,1.3,-1.2,.5],
    [-3.55,-2.35,.3,.42],
    [4.35,-2.05,.8,.7],
    [2.5,3.1,-1.8,.3]
  ];

  const orbs=orbPositions.map(([x,y,z,s],i)=>{
    const geo=i%2
      ? new THREE.IcosahedronGeometry(s,2)
      : new THREE.SphereGeometry(s,32,24);
    const mesh=new THREE.Mesh(geo,orbMat.clone());
    mesh.material.color.set(i%2?0x82dcff:0xff72b6);
    mesh.position.set(x,y,z);
    mesh.rotation.set(i*.4,i*.25,i*.15);
    world.add(mesh);
    return mesh;
  });

  const shardMat=new THREE.MeshPhysicalMaterial({
    color:0xddff4a,
    metalness:.08,
    roughness:.16,
    transparent:true,
    opacity:.42,
    transmission:.28,
    thickness:.35,
    clearcoat:1
  });

  const shardGeo=new THREE.OctahedronGeometry(.34,0);
  const shards=[];
  for(let i=0;i<9;i++){
    const shard=new THREE.Mesh(shardGeo,shardMat.clone());
    const a=(i/9)*Math.PI*2;
    shard.position.set(Math.cos(a)*(4.6+(i%3)*.32),Math.sin(a)*2.5,(i%2?-.8:.8));
    shard.scale.setScalar(.55+(i%4)*.12);
    world.add(shard);
    shards.push(shard);
  }

  const sparkGeo=new THREE.BufferGeometry();
  const count=mobile?110:220;
  const pos=new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const r=4+Math.random()*5;
    const a=Math.random()*Math.PI*2;
    pos[i*3]=Math.cos(a)*r;
    pos[i*3+1]=(Math.random()-.5)*7.2;
    pos[i*3+2]=Math.sin(a)*r*.55;
  }
  sparkGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const sparks=new THREE.Points(
    sparkGeo,
    new THREE.PointsMaterial({
      color:0xffffff,
      size:mobile?.032:.038,
      transparent:true,
      opacity:.58,
      depthWrite:false
    })
  );
  scene.add(sparks);

  scene.add(new THREE.AmbientLight(0xffffff,1.55));
  const p1=new THREE.PointLight(0xff72b6,25,20);p1.position.set(-4,3,5);scene.add(p1);
  const p2=new THREE.PointLight(0x82dcff,20,18);p2.position.set(4,-2,4);scene.add(p2);
  const p3=new THREE.PointLight(0xddff4a,14,16);p3.position.set(0,4,-1);scene.add(p3);

  let mx=0,my=0;
  let scrollYValue=scrollY;
  let lastScroll=scrollY;
  let velocity=0;
  let active=true;

  const hero=document.querySelector(".hero");
  const visibility=new IntersectionObserver(entries=>{
    active=entries.some(e=>e.isIntersecting);
  },{threshold:0});
  if(hero)visibility.observe(hero);

  addEventListener("pointermove",e=>{
    if(e.pointerType==="touch")return;
    mx=(e.clientX/innerWidth-.5);
    my=(e.clientY/innerHeight-.5);
  },{passive:true});

  addEventListener("scroll",()=>{
    scrollYValue=scrollY;
    const delta=scrollY-lastScroll;
    velocity+=(delta-velocity)*.35;
    lastScroll=scrollY;
  },{passive:true});

  function resize(){
    const rect=canvas.getBoundingClientRect();
    renderer.setSize(rect.width,rect.height,false);
    camera.aspect=rect.width/rect.height;
    camera.fov=innerWidth<820?50:42;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener("resize",resize);

  let lastTime=0;
  function tick(t){
    requestAnimationFrame(tick);
    if(!active||document.hidden)return;

    const dt=Math.min(.04,(t-lastTime)/1000||.016);
    lastTime=t;

    const heroHeight=Math.max(innerHeight,hero?.offsetHeight||innerHeight);
    const scrollProgress=Math.min(1,Math.max(0,scrollYValue/heroHeight));

    velocity*=.92;
    const speed=Math.min(1,Math.abs(velocity)/45);

    world.rotation.y+=(mx*.28-world.rotation.y)*.032;
    world.rotation.x+=(-my*.13-world.rotation.x)*.032;
    world.rotation.z+=(velocity*.00032-world.rotation.z)*.035;
    world.position.y+=(Math.sin(t*.00052)*.1-scrollProgress*.24-world.position.y)*.028;

    cdGroup.rotation.z+=dt*(.045+speed*.1);
    cdGroup.rotation.x=(-.02+Math.sin(t*.00034)*.018);
    cdGroup.scale.setScalar(1+speed*.025);

    ring.rotation.z+=dt*.022;
    torus.rotation.z+=dt*(.022+speed*.025);
    torus2.rotation.y+=dt*(.03+speed*.02);
    sparks.rotation.z=t*.000024;
    sparks.position.y=Math.sin(t*.00025)*.08;

    orbs.forEach((orb,i)=>{
      orb.rotation.x+=dt*(.08+i*.01);
      orb.rotation.y+=dt*(.1+i*.012);
      orb.position.y+=Math.sin(t*.00055+i)*.0009;
    });

    shards.forEach((shard,i)=>{
      shard.rotation.x+=dt*(.16+i*.008);
      shard.rotation.y+=dt*(.12+i*.01);
    });

    camera.position.z+=( (mobile?9.25:8.5)-scrollProgress*(mobile?.28:.55)-camera.position.z )*.025;
    camera.position.y+=(-scrollProgress*(mobile?.18:.3)-camera.position.y)*.025;

    renderer.render(scene,camera);
  }
  requestAnimationFrame(tick);
}
