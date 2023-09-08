
function fixDecode(str){
let codes = [
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
    str=str.replaceAll(codes[i][0],codes[i][1]);
  }

return str;
  
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()){ 
  a.push(n);
    let ntext=n.textContent;
  
  ntext=fixDecode(ntext);
    
  if(ntext!=n.textContent){
    n.textContent=ntext;
  }
    
  };
  return a;
}
setInterval(function(){
  textNodesUnder(document.firstElementChild);
},1000);
textNodesUnder(document.firstElementChild);