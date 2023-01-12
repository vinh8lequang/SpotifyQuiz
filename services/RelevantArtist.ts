import { getData } from "../utils/storage";
import { storeData } from "../utils/storage";

const relevantArtist = async (e, f) => {
  var flag = false
  var top = await getData("@topArtis");
  top = JSON.parse(top);
  top.forEach((element) => {
        if (e == element.artistName) {
          flag = true;
        }
  });
  if(flag){
  if (e != undefined || f != undefined) {
    var artists = await getData("@relevantArtist");
    var found = false;
    //@ts-ignore
    artists = JSON.parse(artists);

    if (!artists) {
      artists = [
        {
          artistName: e,
          imageUri: f,
          puntuation: 1,
          id: e,
        },
      ];
    } else {
      //@ts-ignore
      artists.forEach((element) => {
        if (e == element.artistName) {
          element.puntuation++;
          found = true;
        }
      });
      if (!found) {
        //@ts-ignore
        artists.push({
          artistName: e,
          imageUri: f,
          puntuation: 1,
          id: e + 1,
        });
      }
    }
    //artists= artists.sort(artists.puntuation)
    console.log(
      //@ts-ignore
      artists.sort((a, b) => {
        return a.puntuation < b.puntuation;
      })
    );

    storeData("@relevantArtist", JSON.stringify(artists));
  }
}else{
  if (e != undefined || f != undefined) {
    var artists = await getData("@newDiscoveries");
    var found = false;
    //@ts-ignore
    artists = JSON.parse(artists);

    if (!artists) {
      artists = [
        {
          artistName: e,
          imageUri: f,
          puntuation: 1,
          id: e,
        },
      ];
    } else {
      //@ts-ignore
      artists.forEach((element) => {
        if (e == element.artistName) {
          element.puntuation++;
          found = true;
        }
      });
      if (!found) {
        //@ts-ignore
        artists.push({
          artistName: e,
          imageUri: f,
          puntuation: 1,
          id: e + 1,
        });
      }
    }
    //artists= artists.sort(artists.puntuation)
    console.log(
      //@ts-ignore
      artists.sort((a, b) => {
        return a.puntuation < b.puntuation;
      })
    );

    storeData("@newDiscoveries", JSON.stringify(artists));
  }

}
};

export default relevantArtist;
