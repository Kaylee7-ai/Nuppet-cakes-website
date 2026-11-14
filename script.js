/* Nupet Cakes custom cake builder */
const CONFIG = { whatsapp: "233208337856", bakery: "Nupet Cakes" };
const EXAMPLES = [
 {name:"Blush Rose Celebration",occ:"Birthday",img:"https://images.unsplash.com/photo-1511348398635-8efff213a280?auto=format&fit=crop&w=900&q=82",a:"#ffe3ea",b:"#ffb3c7",desc:"Soft pink buttercream with fresh roses.",set:{type:"Layer cake",flavour:"Vanilla",filling:"Strawberry jam",icing:"Buttercream",colour:"Blush",shape:"Round",layers:3,tiers:1,decor:["Fresh flowers"]}},
 {name:"Ivory & Gold Wedding Tiers",occ:"Wedding",img:"https://images.unsplash.com/photo-1525257831700-183b9b8bf5c4?auto=format&fit=crop&w=900&q=82",a:"#fdf3e3",b:"#e8c477",desc:"Three elegant tiers finished in fondant and gold leaf.",set:{type:"Tiered cake",flavour:"Vanilla",filling:"Buttercream",icing:"Fondant",colour:"Ivory",shape:"Round",size:"30–40",tiers:3,layers:3,decor:["Gold leaf","Fresh flowers"]}},
 {name:"Midnight Chocolate Drip",occ:"Birthday",img:"https://images.unsplash.com/photo-1690584176775-473b462e4c50?auto=format&fit=crop&w=900&q=82",a:"#8d6a55",b:"#3b1f1a",desc:"Rich chocolate sponge with a glossy ganache drip.",set:{type:"Drip cake",flavour:"Chocolate",filling:"Chocolate ganache",icing:"Chocolate ganache",colour:"Chocolate",shape:"Round",layers:3,tiers:1,height:"Tall",decor:["Chocolate drip"]}},
 {name:"Red Velvet Heart",occ:"Anniversary",img:"https://images.unsplash.com/photo-1681497397322-f5c92c50839c?auto=format&fit=crop&w=900&q=82",a:"#ffd0dc",b:"#e0245e",desc:"A heart-shaped red velvet with cream cheese frosting.",set:{type:"Layer cake",flavour:"Red velvet",filling:"Cream cheese",icing:"Cream cheese frosting",colour:"Raspberry",shape:"Heart",size:"8–10",layers:2,tiers:1,decor:[]}},
 {name:"Graduation Gold",occ:"Graduation",img:"https://images.pexels.com/photos/33249082/pexels-photo-33249082.jpeg?auto=compress&cs=tinysrgb&w=900",a:"#fff0c8",b:"#d9a441",desc:"Gold finish with a custom topper for the graduate.",set:{type:"Layer cake",flavour:"Chocolate",filling:"Buttercream",icing:"Buttercream",colour:"Gold",shape:"Square",layers:3,tiers:1,decor:["Cake topper","Gold leaf"]}},
 {name:"Rainbow Sprinkle Party",occ:"Kids’ party",img:"https://images.unsplash.com/photo-1759607574688-af5711054087?auto=format&fit=crop&w=900&q=82",a:"#e7d9ff",b:"#ff9fd0",desc:"Fun, colourful and covered in sprinkles.",set:{type:"Layer cake",flavour:"Strawberry",filling:"Buttercream",icing:"Whipped cream",colour:"Lilac",shape:"Round",layers:4,tiers:1,height:"Tall",decor:["Sprinkles","Cake topper"]}},
 {name:"Lemon Garden Naked Cake",occ:"Anniversary",img:"https://images.unsplash.com/photo-1525257831700-183b9b8bf5c4?auto=format&fit=crop&w=900&q=82",a:"#fff7c2",b:"#bfe8d3",desc:"Light lemon sponge, cream cheese and fresh blooms.",set:{type:"Naked cake",flavour:"Lemon",filling:"Cream cheese",icing:"Naked (semi-bare)",colour:"Ivory",shape:"Round",layers:3,tiers:1,decor:["Fresh flowers"]}},
 {name:"Pastel Cupcake Box",occ:"Baby shower",img:"https://images.unsplash.com/photo-1578922794704-7bdd46f70ce0?auto=format&fit=crop&w=900&q=82",a:"#d6f1e4",b:"#cdb4f0",desc:"A dozen swirled cupcakes in soft pastels.",set:{type:"Cupcake box",flavour:"Vanilla",filling:"Buttercream",icing:"Buttercream",colour:"Mint",qty:12,decor:["Sprinkles"]}}
];
const SPONGE={Vanilla:"#f3deb0",Chocolate:"#5a3425","Red velvet":"#b3243b",Lemon:"#f7e27d",Carrot:"#d9822b",Marble:"#8d6a55",Coconut:"#fbf4e6",Strawberry:"#f4a6b8"};
const FILLING={Buttercream:"#fff1d6","Cream cheese":"#fffaf0","Chocolate ganache":"#4a2a20","Strawberry jam":"#c8325a",Caramel:"#c68642","Fresh fruit":"#ff8a65"};
const COLOURS={Blush:"#f7c6d0",Ivory:"#fdf3e3",Raspberry:"#e8336d",Lilac:"#cdb4f0",Sky:"#bfe0f7",Mint:"#bfe8d3",Gold:"#e8c477",Chocolate:"#6b3e2e"};
const GROUPS=[
{k:"occasion",l:"Occasion",o:["Birthday","Wedding","Anniversary","Graduation","Baby shower","Kids’ party","Corporate event","Other"]},
{k:"type",l:"Cake type",o:["Layer cake","Tiered cake","Drip cake","Naked cake","Cheesecake","Cupcake box"]},
{k:"flavour",l:"Sponge flavour",o:Object.keys(SPONGE)},{k:"filling",l:"Filling",o:Object.keys(FILLING)},
{k:"icing",l:"Icing",o:["Buttercream","Fondant","Whipped cream","Chocolate ganache","Cream cheese frosting","Naked (semi-bare)"]},
{k:"shape",l:"Shape",o:["Round","Square","Heart"],cake:1},{k:"size",l:"Servings",o:["8–10","12–15","20–25","30–40"],cake:1},
{k:"height",l:"Height",o:["Standard","Tall","Extra tall"],cake:1},{k:"layers",l:"Sponge layers",o:[2,3,4],cake:1},
{k:"tiers",l:"Tiers",o:[1,2,3],cake:1},{k:"colour",l:"Icing colour",o:Object.keys(COLOURS),swatch:1},
{k:"decor",l:"Decoration (pick any)",o:["Fresh flowers","Gold leaf","Chocolate drip","Sprinkles","Cake topper"],multi:1},
{k:"qty",l:"Cupcakes in the box",o:[6,12,24],cup:1}];
const DEFAULTS={occasion:"Birthday",type:"Layer cake",flavour:"Vanilla",filling:"Buttercream",icing:"Buttercream",shape:"Round",size:"12–15",height:"Standard",layers:3,tiers:1,colour:"Blush",decor:[],qty:12};
let S={...DEFAULTS,decor:[]}, occ="All", toastTimer;
const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>Array.from(e.querySelectorAll(s));
const isCup=()=>S.type==="Cupcake box";
function mix(hex,t){const n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255,f=c=>Math.round(c+(255-c)*t);return "rgb("+f(r)+","+f(g)+","+f(b)+")";}
function buildGroups(){
 $("#groups").innerHTML=GROUPS.map(g=>'<fieldset class="group" data-g="'+g.k+'"><legend>'+g.l+'</legend><div class="pills">'+g.o.map((v,i)=>g.swatch?'<button type="button" class="swatch" data-g="'+g.k+'" data-i="'+i+'" style="--c:'+COLOURS[v]+'" aria-pressed="false" title="'+v+'"><i></i><span>'+v+'</span></button>':'<button type="button" class="pill" data-g="'+g.k+'" data-i="'+i+'" aria-pressed="false">'+v+'</button>').join("")+'</div></fieldset>').join("");
}
$("#groups").addEventListener("click",e=>{
 const b=e.target.closest("button[data-g]");if(!b)return;
 const g=GROUPS.find(x=>x.k===b.dataset.g),v=g.o[+b.dataset.i];
 if(g.multi)S.decor=S.decor.includes(v)?S.decor.filter(x=>x!==v):[...S.decor,v];else S[g.k]=v;
 if(g.k==="type"){if(v==="Tiered cake"&&S.tiers===1)S.tiers=2;if(v!=="Tiered cake"&&S.tiers>1&&!isCup())S.tiers=1;if(v==="Drip cake"&&!S.decor.includes("Chocolate drip"))S.decor.push("Chocolate drip");}
 if(g.k==="tiers"&&v>1&&S.type!=="Tiered cake"&&!isCup())S.type="Tiered cake";
 update();
});
["fName","fDate","fMsg","fNotes"].forEach(id=>$("#"+id).addEventListener("input",update));
$("#fDate").min=new Date().toISOString().slice(0,10);
function cakeSVG(){
 const col=COLOURS[S.colour],naked=S.type==="Naked cake"||S.icing==="Naked (semi-bare)",body=naked?SPONGE[S.flavour]:col,fill=FILLING[S.filling];
 let out='<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".1"/><stop offset=".35" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient></defs>';
 if(isCup()){[90,160,230].forEach((x,i)=>{const y=i===1?200:225;out+='<path d="M'+(x-26)+' '+y+' L'+(x-20)+' '+(y+56)+' H'+(x+20)+' L'+(x+26)+' '+y+' Z" fill="'+SPONGE[S.flavour]+'" stroke="#fff" stroke-opacity=".5"/><path d="M'+(x-30)+' '+y+' Q'+(x-34)+' '+(y-22)+' '+(x-12)+' '+(y-26)+' Q'+(x-8)+' '+(y-52)+' '+x+' '+(y-56)+' Q'+(x+8)+' '+(y-52)+' '+(x+12)+' '+(y-26)+' Q'+(x+34)+' '+(y-22)+' '+(x+30)+' '+y+' Z" fill="'+col+'"/>';if(S.decor.includes("Sprinkles"))out+='<rect x="'+(x-10)+'" y="'+(y-20)+'" width="8" height="3" fill="#ff7a59"/><rect x="'+(x+2)+'" y="'+(y-34)+'" width="8" height="3" fill="#6c63ff"/>';if(S.decor.includes("Fresh flowers"))out+='<circle cx="'+x+'" cy="'+(y-58)+'" r="7" fill="#ff9fb8"/>';});return out+"</svg>";}
 const W={"8–10":150,"12–15":180,"20–25":210,"30–40":240}[S.size]||180,H=({Standard:52,Tall:76,"Extra tall":100}[S.height]||52)*(S.tiers>1?.78:1);
 let y=312,tx=0,ty=0,tw=0;out+='<ellipse cx="160" cy="316" rx="'+(W/2+34)+'" ry="9" fill="#ead9c9"/>';
 for(let i=0;i<S.tiers;i++){const w=W*(1-.24*i),x=160-w/2;y-=H;out+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+H+'" rx="'+(S.shape==="Square"?4:10)+'" fill="'+body+'"/>';for(let k=1;k<S.layers;k++)out+='<rect x="'+(x+2)+'" y="'+(y+H*k/S.layers-2)+'" width="'+(w-4)+'" height="4" rx="2" fill="'+fill+'"/>';out+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+H+'" rx="'+(S.shape==="Square"?4:10)+'" fill="url(#sh)"/>';out+=S.shape==="Square"?'<polygon points="'+x+','+y+' '+(x+w)+','+y+' '+(x+w-12)+','+(y-9)+' '+(x+12)+','+(y-9)+'" fill="'+mix(body,.4)+'"/>':'<ellipse cx="160" cy="'+y+'" rx="'+w/2+'" ry="9" fill="'+mix(body,.4)+'"/>';tx=x;ty=y;tw=w;}
 if(S.shape==="Heart")out+='<text x="160" y="'+(ty+H/2+8)+'" text-anchor="middle" font-size="26" fill="#fff">♥</text>';
 if(S.decor.includes("Chocolate drip")){const sw=tw/6,d=[16,30,20,36,18,26];out+='<rect x="'+tx+'" y="'+ty+'" width="'+tw+'" height="8" fill="#4a2a20"/>';d.forEach((h,j)=>out+='<rect x="'+(tx+j*sw+4)+'" y="'+ty+'" width="'+(sw-8)+'" height="'+h+'" rx="4" fill="#4a2a20"/>');}
 if(S.decor.includes("Sprinkles"))["#ff7a59","#6c63ff","#ffd23f","#1faa59","#e0245e"].forEach((c,j)=>{for(let m=0;m<3;m++)out+='<rect x="'+(tx+10+((j*37+m*53)%Math.max(20,tw-24)))+'" y="'+(ty+10+((j*13+m*19)%Math.max(10,H-20)))+'" width="8" height="3" rx="1.5" fill="'+c+'"/>';});
 if(S.decor.includes("Gold leaf"))for(let j=0;j<6;j++)out+='<circle cx="'+(tx+14+j*((tw-28)/5))+'" cy="'+(ty+H-12-(j%2)*14)+'" r="'+(3+j%3)+'" fill="#d9a441"/>';
 if(S.decor.includes("Fresh flowers"))[-2,-1,0,1,2].forEach((j,n)=>out+='<circle cx="'+(160+j*(tw/6))+'" cy="'+(ty-8-(n%2)*4)+'" r="'+(n===2?10:7)+'" fill="'+["#fff","#ff9fb8","#ffd6a5","#ff9fb8","#fff"][n]+'"/><circle cx="'+(160+j*(tw/6))+'" cy="'+(ty-8-(n%2)*4)+'" r="2.4" fill="#d9a441"/>');
 if(S.decor.includes("Cake topper"))out+='<line x1="160" y1="'+(ty-8)+'" x2="160" y2="'+(ty-34)+'" stroke="#d9a441" stroke-width="2"/><polygon points="160,'+(ty-54)+' 165,'+(ty-42)+' 178,'+(ty-42)+' 168,'+(ty-34)+' 172,'+(ty-21)+' 160,'+(ty-29)+' 148,'+(ty-21)+' 152,'+(ty-34)+' 142,'+(ty-42)+' 155,'+(ty-42)+'" fill="#d9a441"/>';
 return out+"</svg>";
}
function rows(){const r=[["Occasion",S.occasion],["Cake type",S.type],["Sponge",S.flavour],["Filling",S.filling],["Icing",S.icing]];if(isCup())r.push(["Box of",S.qty+" cupcakes"]);else r.push(["Shape",S.shape],["Serves",S.size],["Height",S.height],["Layers",S.layers],["Tiers",S.tiers]);r.push(["Colour",S.colour],["Decoration",S.decor.length?S.decor.join(", "):"None"]);return r;}
function message(){const name=$("#fName").value.trim(),date=$("#fDate").value,msg=$("#fMsg").value.trim(),notes=$("#fNotes").value.trim();return "Hello "+CONFIG.bakery+"! I’d like to enquire about a custom cake.\n\n"+rows().map(([a,b])=>"• "+a+": "+b).join("\n")+"\n• Date needed: "+(date||"to be confirmed")+(msg?"\n• Message on cake: “"+msg+"”":"")+(notes?"\n• Notes: "+notes:"")+(name?"\n\nName: "+name:"")+"\n\nPlease confirm availability, price and notice period. Thank you!";}
function update(){
 GROUPS.forEach(g=>{const fs=$('fieldset[data-g="'+g.k+'"]');fs.hidden=!!((g.cake&&isCup())||(g.cup&&!isCup()));$$("button[data-g]",fs).forEach((b,i)=>{const v=g.o[i],on=g.multi?S.decor.includes(v):S[g.k]===v;b.setAttribute("aria-pressed",on);});});
 $("#preview").innerHTML=cakeSVG();$("#summary").innerHTML=rows().map(([a,b])=>"<li><span>"+a+"</span><span>"+b+"</span></li>").join("");
 const url="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(message());$("#sendWA").href=url;$("#floatWA").href=url;
}
function toast(t){const el=$("#toast");el.textContent=t;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600);}
$("#copyBtn").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(message());toast("Cake details copied");}catch(e){const ta=document.createElement("textarea");ta.value=message();document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("Cake details copied");}catch(_){toast("Couldn’t copy, please try again");}ta.remove();}});
function renderFilters(){const list=["All",...new Set(EXAMPLES.map(x=>x.occ))];$("#filters").innerHTML=list.map(o=>'<button type="button" class="pill" data-occ="'+o+'" aria-pressed="'+(o===occ)+'">'+o+"</button>").join("");}
function renderGallery(){$("#gallery-grid").innerHTML=EXAMPLES.filter(x=>occ==="All"||x.occ===occ).map(x=>'<article class="card"><div class="thumb" style="--a:'+x.a+';--b:'+x.b+'"><img src="'+x.img+'" alt="" loading="lazy" decoding="async" width="600" height="750"></div><div class="card-body"><span class="tagline">'+x.occ+'</span><h3>'+x.name+'</h3><p>'+x.desc+'</p><button type="button" class="link-btn" data-use="'+EXAMPLES.indexOf(x)+'">Build this one →</button></div></article>').join("");}
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-occ]");if(!b)return;occ=b.dataset.occ;renderFilters();renderGallery();});
$("#gallery-grid").addEventListener("click",e=>{const b=e.target.closest("[data-use]");if(!b)return;const ex=EXAMPLES[+b.dataset.use];S={...DEFAULTS,decor:[],...ex.set,occasion:ex.occ};S.decor=[...(ex.set.decor||[])];update();$("#builder").scrollIntoView({behavior:"smooth"});toast('Loaded "'+ex.name+'", make it yours!');});
buildGroups();renderFilters();renderGallery();update();
