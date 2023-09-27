import fetch from 'node-fetch';
import http from 'http';
import {addCorsHeaders} from './modules/cors-headers.mjs';
import {normalizeRequest,mapResHeaders,applyResponse} from './modules/http-fetch.mjs';
import maintain from './modules/auto-maintain.mjs';
import {availReq,availRes} from './modules/availability.mjs';
import {serverRequestResponse} from './server.mjs';
import './modules/serverlessCache.mjs';




let server = http.createServer(availReq(onRequest));

server.listen(3000);
maintain(server);

async function onRequest(req, res) {
 res=availRes(res);
 const cacheKey=serverlessCache.generateCacheKey(req);
  //console.log(cacheKey);
 const cacheVal=serverlessCache.match(cacheKey);
if(cacheVal){return await applyResponse(res,cacheVal);}

  
 let reqDTO = await normalizeRequest(req);

 let resDTO = await serverRequestResponse(reqDTO);
  serverlessCache.put(cacheKey,resDTO);
  return await applyResponse(res,resDTO);

}

