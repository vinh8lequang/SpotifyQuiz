import { getData } from "../utils/storage";
import { storeData } from "../utils/storage";

/*
Album achievements:
    "Album Newbie": awarded for answering 1 album question correctly
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

//initialize the achievements in storage on first load
const achievementsInit = async () => {
  var achievements = await getData("@achievements");
  achievements = JSON.parse(achievements);

  if (!achievements) {
    achievements = [
      [
        {
          albumCounter: 0,
          trackCounter: 0,
          audioCounter: 0,
        },
      ],
      [
        {
          type: "album",
          stage: "stage0",
          id: "Album Newbie",
          desc: "1 album question answered correctly.",
          imageUri: "https://i.ibb.co/wsnbcdt/album0.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage1",
          id: "Vinyl Collector",
          desc: "5 album questions answered correctly.",
          imageUri: "https://i.ibb.co/7JVwN8z/album1.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage2",
          id: "Studio Rat",
          desc: "10 album questions answered correctly.",
          imageUri: "https://i.ibb.co/ns5PbLW/album2.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage3",
          id: "Discography Devotee",
          desc: "15 album questions answered correctly.",
          imageUri: "https://i.ibb.co/p08hHKC/album3.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage0",
          id: "Rising Track Star",
          desc: "1 track question answered correctly.",
          imageUri: "https://i.ibb.co/gdn1QHZ/track0.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage1",
          id: "Hitmaker",
          desc: "5 track questions answered correctly.",
          imageUri: "https://i.ibb.co/tqVvMMJ/track1.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage2",
          id: "Track Titan",
          desc: "10 track questions answered correctly.",
          imageUri: "https://i.ibb.co/f1RM2YL/track2.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage3",
          id: "Melody Master",
          desc: "15 track questions answered correctly.",
          imageUri: "https://i.ibb.co/HVdW22D/track3.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage0",
          id: "Sound Prodigy",
          desc: "1 audio question answered correctly.",
          imageUri: "https://i.ibb.co/vHF2F2P/audio0.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage1",
          id: "Sound Scientist",
          desc: "5 audio questions answered correctly.",
          imageUri: "https://i.ibb.co/6yn1L3H/audio1.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage2",
          id: "Frequency Finder",
          desc: "10 audio questions answered correctly.",
          imageUri: "https://i.ibb.co/ctHD9Sq/audio2.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage3",
          id: "Musical Maverick",
          desc: "15 audio questions answered correctly.",
          imageUri: "https://i.ibb.co/10H9BN7/audio3.png",
          unlocked: false,
        },
      ],
    ];
  }
  //   console.debug("ach init", achievements);
  storeData("@achievements", JSON.stringify(achievements));
};

export default achievementsInit;
