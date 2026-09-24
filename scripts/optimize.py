#!/usr/bin/env python3
"""Produce crisp, responsive HDM artwork from the original user-supplied era files.
No upscaling of low-resolution source covers. No sprite atlas.
"""
from pathlib import Path
from PIL import Image, ImageOps
import json
ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/"assets"/"hdm"
DEST.mkdir(parents=True, exist_ok=True)

CONFIG={
  "santa":("Santa Claus Lane","sinfondo.png","cover.jpg","logo.png",["1.jpg","2.jpg"]),
  "meta":("Metamorphosis","sinfondo.png","cover.png","logo_metamorphosis.png",["2.jpg","3.jpg"]),
  "self":("Hilary Duff","sinfondo.png","cover.jpg","logo.png",["2.jpg","4.jpg"]),
  "wanted":("Most Wanted","sinfondo.png","cover.jpeg","logo_white_full.png",["1.jpg","2.jpg"]),
  "dignity":("Dignity","sinfondo.png","cover.jpg",None,["2.jpg","4.jpg"]),
  "bibo":("Bibo","sinfondo.png","cover.jpg","logo_name.png",["3.jpg","4.jpg"]),
  "luck":("luck","sinfondo.png","cover.jpeg",None,["3.jpg","2.jpg"]),
}

def convert(source,destination,max_width,max_height,quality=88):
    im=Image.open(source)
    im=ImageOps.exif_transpose(im)
    has_alpha="A" in im.getbands() or "transparency" in im.info
    im=im.convert("RGBA" if has_alpha else "RGB")
    # Never upscale small source originals.
    im.thumbnail((max_width,max_height),Image.Resampling.LANCZOS)
    im.save(destination,format="WEBP",quality=quality,method=6,
            alpha_quality=100 if has_alpha else None)
    return [im.width,im.height,int(destination.stat().st_size)]

manifest={}
for slug,(folder,cut,cover,logo,photos) in CONFIG.items():
    folder=ROOT/folder
    entries={}
    srcs={"cut":(cut,1530,1680,92),"cover":(cover,850,850,94)}
    if logo:srcs["logo"]=(logo,1500,650,94)
    for i,filename in enumerate(photos,1):
        srcs[f"photo{i}"]=(filename,1550,1720,90)
    for label,(filename,w,h,quality) in srcs.items():
        target=DEST/f"{slug}-{label}.webp"
        size=convert(folder/filename,target,w,h,quality)
        entries[label]={"path":f"assets/hdm/{target.name}","width":size[0],"height":size[1],"bytes":size[2]}
    manifest[slug]=entries

extras={
  "hero":("luck/3.jpg",1400,1700,91),
  "hero_wide":("luck/4.jpg",1500,1200,89),
  "news_tour":("luck/2.jpg",1120,920,88),
  "news_vogue":("luck/1.jpg",1120,1350,88),
  "news_album":("luck/6.png",1120,850,87),
  "lizzie_art":("Lizzie/sinfondo.png",1600,1080,94),
  "lizzie_photo":("Lizzie/1.jpg",900,1050,93),
  "lizzie_extra":("Lizzie/sinfondo2.png",550,550,94),
  "mask":("funnymask.png",1000,1160,93),
  "hdm_logo":("Logo_white.png",1600,1600,94),
  "signature":("signature.webp",900,450,94)
}
for key,(path,w,h,q) in extras.items():
    target=DEST/f"{key}.webp"
    size=convert(ROOT/path,target,w,h,q)
    manifest[key]={"path":f"assets/hdm/{target.name}","width":size[0],"height":size[1],"bytes":size[2]}
(DEST/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print("Optimized artwork:",len(list(DEST.glob("*.webp"))))
print("Total KB:",sum(f.stat().st_size for f in DEST.glob("*.webp"))//1024)
