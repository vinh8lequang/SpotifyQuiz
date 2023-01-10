import { getData } from "../utils/storage";
import { storeData } from "../utils/storage";

const relevantArtist = async (e, f) => {
  if (e != undefined || f != undefined) {
    var artists = await getData("@relevantArtist");
    var found = false;
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
      artists.forEach((element) => {
        if (e == element.artistName) {
          element.puntuation++;
          found = true;
        }
      });
      if (found == false) {
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
      artists.sort((a, b) => {
        return a.puntuation < b.puntuation;
      })
    );

    storeData("@relevantArtist", JSON.stringify(artists));
  }
};

export default relevantArtist;
