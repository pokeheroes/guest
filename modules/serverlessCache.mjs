if(!globalThis.serverlessCache){globalThis.serverlessCache=Object.create(null);}


globalThis.serverlessCache.put=function(key,val){
  globalThis.serverlessCache[key]=val;
}



globalThis.serverlessCache.match=function(key){
  return globalThis.serverlessCache[key];
}

