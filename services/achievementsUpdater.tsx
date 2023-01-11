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
    "Melody Master": awarded for answering 15 track questions correctly
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

  achievements[1].forEach((item) => {
    if (questionType == item.type) {
      if (item.stage === "stage0") {
        //stage 0 achievement (only once)
        if (typeCounter > 0) {
          item.unlocked = true;
        }
      } else if (item.stage === "stage1") {
        //stage 1 achievement (when reached 5 points)
        if (typeCounter >= 5) {
          item.unlocked = true;
        }
      } else if (item.stage === "stage2") {
        //stage 2 achievement (when reached 10 points)
        if (typeCounter >= 10) {
          item.unlocked = true;
        }
      } else if (item.stage === "stage3") {
        //stage 3 achievement (when reached 15 points)
        if (typeCounter >= 15) {
          item.unlocked = true;
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
