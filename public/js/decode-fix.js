if(!globalThis.fixingDecode){
  globalThis.fixingDecode=false;
}
if(!globalThis.decodeCount){
  globalThis.decodeCount=0;
}

async function setTextContent(n,text){

   n.textContent=text;
  
}


async function recode(str){
//const encoder = new TextEncoder();
//const view = encoder.encode(str);
let wrong = str;//String.fromCharCode(...view)
//console.log(wrong);
const wrongCodes = wrong.split('').map((x) => x.charCodeAt(0));
//console.log(wrongCodes);

const uint8 = new Uint8Array(wrongCodes.length);
for(let i=0;i<wrongCodes.length;i++){
uint8[i] = wrongCodes[i];
}
const decoder = new TextDecoder();
const out = decoder.decode(uint8); 
//console.log(str);
return out;

  
}





async function fixDecode(str){
if(!globalThis.decodeTable){
globalThis.decodeTable=[];


for(let i=0;i<4096;i++){try{
let char = String.fromCharCode(i);
const encoder = new TextEncoder();
const view = encoder.encode(char);
decodeTable.push([String.fromCharCode(...view),char]);
}catch(e){continue;}}
let codes = [
         ['â€¦','…'],
         ['Â† ','←'],
         ['Â†’','→'],
         ['â€œ','“'],
         ['â€ ','” '],
         ['â€','”'],
         ['â€™', '’'],
         ['â€‰•â€‰',' • '],
         ['â€‰',' '],
         ['â€¢','•'],
         ['â€“','–'],
         ['Â&','&'],
         ['Ã©','é'],
         ['â€‹',''],
         ['Â','']
           ];
  const codes_length=codes.length;
  for(let i=0;i<codes_length;i++){
    decodeTable.push(codes[i]);
  }
  
}

  

  const decodeTable_length=decodeTable.length;
  for(let i=0;i<decodeTable_length;i++){try{
    str=str.replaceAll(decodeTable[i][0],decodeTable[i][1]);
  }catch(e){continue}}

return str;
  
}

async function textNodesUnder(el){
  if(fixingDecode){return;}
  if(decodeCount>10){return;}
  decodeCount++;
  fixingDecode=true;
  var n, walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()){ 
  
    let ntext=n.textContent;
  
  ntext=await fixDecode(ntext);

    
  if(ntext!=n.textContent){
   await setTextContent(n,ntext);
  }
    
  };
  fixingDecode=false;
  return ;
}
setInterval(async function(){
  await textNodesUnder(document.firstElementChild);
},1000);
textNodesUnder(document.firstElementChild);