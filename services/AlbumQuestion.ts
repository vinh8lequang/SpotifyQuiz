import getInt from "./getRandomInt";
import { shuffle } from "./getRandomInt";
const questions=[
    'Which of these albums is NOT from the artist ',
   'In what year was this album realeased ',
   'Which of these albums is from the artist ',

]




export default function generateQuestion(data){
    var i = getInt(0,3)
    var p  = shuffle([0,1,4,3]);
    switch(i){
        case 0:
            return {
                question: questions[0] +'\n'+ data[0].artists,
                answers:[
                    data[p[0]].albumName,
                    data[p[1]].albumName,
                    data[p[2]].albumName,
                    data[p[3]].albumName,

                ],
                correct:data[4].albumName,
                image:data[getInt(0,3)].imageUri

            }
        case 1:
            return {
                question: questions[1] ,
                answers:[
                    
                    data[0].release_date,
                    data[1].release_date,
                    data[2].release_date,
                    data[4].release_date,

                ],
                correct:data[4].release_date,
                image:data[4].imageUri

            }
        case 2:
            return {
                question: questions[2] +'\n'+ data[4].artists,
                answers:[
                    data[p[0]].albumName,
                    data[p[1]].albumName,
                    data[p[2]].albumName,
                    data[p[3]].albumName,

                ],
                correct:data[4].albumName,
                image:data[4].imageUri

            }
        
    }
}