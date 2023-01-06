import getInt from "./getRandomInt";
import { shuffle } from "./getRandomInt";
const questions = [
  "Which one of these albums is NOT from the artist ",
  "In what year was this album released ",
  "Which one of these albums IS from the artist ",

  "Which one of these tracks IS from the artist ",
  "Which one of these tracks does NOT belong to the album ",
  "Which one of these tracks belong to the album ",
];

export function generateQuestionTrack(data: any) {
  var i = getInt(3, 6);
  var p = shuffle([0, 1, 4, 3]);
  console.log(i + questions[i]);
  switch (i) {
    case 3:
      console.log(data[4].trackName);
      return {
        question: `${questions[3]}${data[4].artist}`,
        answers: [
          data[p[0]].trackName,
          data[p[1]].trackName,
          data[p[2]].trackName,
          data[p[3]].trackName,
        ],
        correct: data[4].trackName,
        image: data[4].artistImage,
        aux:{
          artist:data[4].artist,
          url:data[4].artistImage
        }
      };
    case 4:
      console.log(data[4].trackName);
      return {
        question: `${questions[4]}${data[0].albumName}`,
        answers: [
          data[p[0]].trackName,
          data[p[1]].trackName,
          data[p[2]].trackName,
          data[p[3]].trackName,
        ],
        correct: data[4].trackName,
        image: data[0].albumImage,

        aux:{
          artist:data[4].artist,
          url:data[4].artistImage
        }

      };
    case 5:
      console.log(data[4].trackName);
      return {
        question: `${questions[5]}${data[4].albumName}`,
        answers: [
          data[p[0]].trackName,
          data[p[1]].trackName,
          data[p[2]].trackName,
          data[p[3]].trackName,
        ],
        correct: data[4].trackName,
        image: data[4].albumImage,
        aux:{
          artist:data[4].artist,
          url:data[4].artistImage
        }
      };
  }
}

export function generateQuestionAlbum(data: any) {
  var i = getInt(0, 3);
  var p = shuffle([0, 1, 4, 3]);
  switch (i) {
    case 0:
      return {
        question: `${questions[0]}${data[0].artists}`,
        answers: [
          data[p[0]].albumName,
          data[p[1]].albumName,
          data[p[2]].albumName,
          data[p[3]].albumName,
        ],
        correct: data[4].albumName,
        image: data[0].artistsImage,

        aux:{
          artist:data[0].artists,
          url:data[0].artistsImage
        }
      };
    case 1:
      return {
        question: questions[1],
        answers: [
          data[0].release_date,
          data[1].release_date,
          data[2].release_date,
          data[4].release_date,
        ],
        correct: data[4].release_date,
        image: data[4].imageUri,

        aux:{
          artist:data[4].artists,
          url:data[4].artistsImage
        }
      };
    case 2:
      return {
        question: `${questions[2]}${data[4].artists}`,
        answers: [
          data[p[0]].albumName,
          data[p[1]].albumName,
          data[p[2]].albumName,
          data[p[3]].albumName,
        ],
        correct: data[4].albumName,
        image: data[4].artistsImage,
        aux:{
          artist:data[4].artists,
          url:data[4].artistsImage
        }
      };
  }
}
