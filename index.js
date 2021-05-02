  async function getToken() {
    try {
      const clientId = "2273d8d368eb4a00a111cceee1f521c4";
      const clientSecret = "f1b873c2be724576ae0bc1e945fe8e22";
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization': "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
      });
      const data = await result.json();
      return (data);
      
    } catch (error) {
      console.log(error);
    }
  }

getToken().then((result)=>{
  const token = result.access_token;
  getPlayList(token);
});

async function getPlayList(apitoken) {
  try {
    const result = await fetch("https://api.spotify.com/v1/users/chinna-1996/playlists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + apitoken,
      },
    });

    const data = await result.json();
    data.items.forEach(element => {
      console.log(element.external_urls.spotify);
      var col=document.createElement('div');
      col.setAttribute('class','col-md-6')
      var card = document.createElement('div');
      card.setAttribute('class','card mt-5');
      var card_body = document.createElement('div');
      card_body.setAttribute('class','card-body');
      var anchor = document.createElement('a');
      anchor.setAttribute('href',element.external_urls.spotify)
      anchor.setAttribute('target','_blank')
      var img = document.createElement('img');
      img.setAttribute('class','img-fluid')
      img.setAttribute('src',element.images[0].url);
     img.setAttribute('style','height:500px;width:500px')
     anchor.append(img);
      card_body.append(anchor);
      card.append(card_body);
      col.append(card);
      document.getElementById('playlist-container').append(col);

    });
  } catch (error) {
    console.log(error);
  }
}



