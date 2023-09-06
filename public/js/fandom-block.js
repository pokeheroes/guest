checkReferer();

setInterval(async function() {
checkReferer();
  let s = document.querySelector('svg.close-icon');
  if (s&&s.click) { s.click(); }
  //s=document.querySelector('[xlink:href="#wds-icons-close-tiny"]');
  //if(s){s.click();}

  
let searchButton=document.querySelector('.mobile-global-navigation__button-search:not([clickable])');

if(searchButton){
searchButton.onclick = function() { window.location.href = '/wiki/Special:Search'; };
searchButton.setAttribute('clickable','true');
}

let wikia_php=document.querySelector('[href^="https://api.lenguapedia.org/corsFetch/"][href$="wikia.php?controller=ThemeApi&method=themeVariables"]');
  if(wikia_php){
    wikia_php.setAttribute('href','https://api.lenguapedia.org/corsFetchStyles/https://minecraft.fandom.com/wikia.php?controller=ThemeApi&method=themeVariables');
  }

  let load_php=document.querySelector('[href^="https://api.lenguapedia.org/corsFetch/"][href*="load.php"]');
  if(load_php){

    load_php.setAttribute('href',load_php.getAttribute('href').replace('corsFetch','corsFetchStyles'));
  }

  let form_action = document.querySelector('[action*=".fandom.com"]');
  if(form_action){
    form_action.setAttribute('action',form_action.getAttribute('action').replace('.fandom.com','-wikia.lenguapedia.org'));
  }

  
removeLinkListeners();
  oddballLinks();
  textNodesUnder(document.body);
}, 200);



let searchButton=document.querySelector('.mobile-global-navigation__button-search:not([clickable])');

if(searchButton){
searchButton.onclick = function() { window.location.href = '/wiki/Special:Search'; };
searchButton.setAttribute('clickable','true');
}

  function removeLinkListeners(){
    let searchLinks = document.querySelectorAll('li.top-results__item:not([unlisten])');
    const searchLinks_length = searchLinks.length;
    for(let i=0;i<searchLinks_length;i++){

      searchLinks[i].innerHTML=searchLinks[i].innerHTML.toString();
      searchLinks[i].setAttribute('unlisten','');
    }

    
  }

function oddballLinks(){

  let rsd = document.querySelector('link[type="application/rsd+xml"]:not([modified])');
  if(rsd){
    rsd_split = rsd.getAttribute('href').split('/');
    rsd_split[2]=window.location.host;
    rsdModified=rsd_split.join('/');
    rsd.setAttribute('href',rsdModified);
    rsd.setAttribute('modified',rsdModified);
  }


  

}

function checkReferer(){

let referer=document.querySelector('http-header[key="referer"]');
if(referer){
  let refererHost=referer.getAttribute('value').split('/')[2];
  if(refererHost&&(refererHost!=window.location.host)){
console.log(refererHost, window.location.host);
    let window_location=window.location.href.split('/');
    window_location[2]=refererHost;
    window.location.href=window_location.join('/');
    referer.remove();
  }
}  

  
}

/*
const encoder = new TextEncoder();
const view = encoder.encode('•â€¢');
let wrong = String.fromCharCode(...view)
console.log(wrong);
const wrongCodes = wrong.split('').map((x) => x.charCodeAt(0));
console.log(wrongCodes);

const uint8 = new Uint8Array(wrongCodes.length);
for(let i=0;i<wrongCodes.length;i++){
uint8[i] = wrongCodes[i];
}
const decoder = new TextDecoder();
const str = decoder.decode(uint8); 
console.log(str);

*/

function fixDecode(str){
let codes = [
         ['â€¢','•'],
         ['â€“','–'],
         ['Â&','&'],
         ['â€‹',''],
         ['Â ',' ']
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

function fixInlineStyles(){
let styles=document.querySelectorAll('[style*="url(https://static.wikia.nocookie.net"]');
  const styles_length=styles.length;
  for(let i=0;i<styles_length;i++){

    styles[i].setAttribute('style',styles[i].getAttribute('style').replaceAll('url(https://static.wikia.nocookie.net','url(https://api.lenguapedia.org/corsFetch/https://static.wikia.nocookie.net'))
    
    
  }


  
}
      
textNodesUnder(document);
setTimeout(function(){textNodesUnder(document);},100);