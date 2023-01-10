import { getData } from "../utils/storage";
import { storeData } from "../utils/storage";

/*
Album achievements:
    "Album Newbie": awarded for answering 1 album question1 correctly
    "Vinyl Collector": awarded for answering 5 album questions correctly
    "Studio Rat": awarded for answering 10 album questions correctly
    "Discography Devotee": awarded for answering 15 album questions correctly
Track achievements:
    "Rising Track Star": awarded for answering 1 track question correctly
    "Hitmaker": awarded for answering 5 track questions correctly
    "Track Titan": awarded for answering 10 track questions correctly
    "Melody Master": awarded for answering 20 track questions correctly
Audio Questions:
    "Sound Prodigy": awarded for answering 1 audio question correctly
    "Sound Scientist": awarded for answering 5 audio questions correctly
    "Frequency Finder": awarded for answering 10 audio questions correctly
    "Musical Maverick": awarded for answering 15 audio questions correctly
*/

const achievementsUpdater = async (questionType: string) => {
  if (questionType === undefined) {
    return null;
  }
  var achievements = await getData("@achievements");
  achievements = JSON.parse(achievements);

  var typeCounter = 0; //total counter of a certain type (album,track,audio)
  if (questionType === "album") {
    typeCounter = ++achievements[0][0].albumCounter;
  } else if (questionType === "track") {
    typeCounter = ++achievements[0][0].trackCounter;
  } else if (questionType === "audio") {
    typeCounter = ++achievements[0][0].audioCounter;
  }

  const divisor = 5;
  var quotient = Math.floor(typeCounter / divisor);

  achievements[1].forEach((item) => {
    if (questionType == item.type) {
      if (item.id === "stage0") {
        //stage 0 achievement (only once)
        if (typeCounter > 0) {
          item.amount = 1;
        }
      } else if (item.id === "stage1") {
        //stage 1 achievement (every 5 points)
        if (quotient >= 1) {
          item.amount = quotient;
        }
      } else if (item.id === "stage2") {
        //stage 2 achievement (every 10 points)
        if (quotient >= 2) {
          item.amount = Math.floor(quotient / 2);
        }
      } else if (item.id === "stage3") {
        //stage 3 achievement (every 15 points)
        if (quotient >= 3) {
          item.amount = Math.floor(quotient / 3);
        }
      }
    }
  });

  // console.log("ach update", achievements[1]);
  // console.log("ach update", achievements[1][0]);
  console.log("ach update", achievements);

  storeData("@achievements", JSON.stringify(achievements));
};

export default achievementsUpdater;
