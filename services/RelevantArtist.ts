import { getData } from "../utils/storage";
import { storeData } from "../utils/storage";

const relevantArtist = async(e,f)=>{
     var artists = await getData("@relevantArtist");
     var found= false
     artists = JSON.parse(artists);

     if(!artists){
        artists=[{
            artistName:e,
            imageUri:f,
            puntuation: 1,
            id:e
        }]
     }else{
        artists.forEach(element => {
            if(e == element.artistName){
                element.puntuation++
                storeData("@relevantArtist", JSON.stringify(artists));
                found=true
            }
        });
        if(found==false){
            artists.push({
                artistName:e,
                imageUri:f,
                puntuation: 1,
                id:e+1
                    })

        }

     }

     console.log(artists)
     storeData("@relevantArtist", JSON.stringify(artists));
}

export default relevantArtist