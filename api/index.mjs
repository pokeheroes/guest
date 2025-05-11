

async function fetchText(url){
    return await(await fetch(url,{
	      headers:{
		      "Cache-Control":"no-cache"
	      }
      })).text();
}


export default async function handler(req,res) {
  const player = 'MissingLink';
  try{
    res.setHeader('Cache-Control','no-cache');
    const profile =  await fetchText(`https://pokeheroes.com/userprofile?name=${player}`);
    let party = (String(profile).match(/pokemon.php.id.(\d+)/g) ?? []).map(x => x.replace(/\D/g, ''));
    console.log(party);
    
    await Promise.all(party.map(id=>fetchText(`https://pokeheroes.com/interact?id=${id}&action=direct`)));
    
    const box1 = await fetchText(`https://pokeheroes.com/userboxes.php?name=${player}`);
    const box1poke = (String(box1).match(/pokemon.id.(\d+)/g) ?? []).map(x => x.replace(/\D/g, ''));
    console.log(box1poke);
    await Promise.all(box1poke.map(id=>fetchText(`https://pokeheroes.com/interact?id=${id}&action=direct`)));
    return res.json({
      message: `ok`,
    });
  }catch(e){
    console.log(e);
    return res.json({
      error:e.message,
    });
  }
}
