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
          imageUri: "https://i.postimg.cc/xTw7x9bZ/album0.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage1",
          id: "Vinyl Collector",
          desc: "5 album questions answered correctly.",
          imageUri: "https://i.postimg.cc/9fVk21bt/album1.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage2",
          id: "Studio Rat",
          desc: "10 album questions answered correctly.",
          imageUri: "https://i.postimg.cc/cCK9hz1Z/album2.png",
          unlocked: false,
        },
        {
          type: "album",
          stage: "stage3",
          id: "Discography Devotee",
          desc: "15 album questions answered correctly.",
          imageUri: "https://i.postimg.cc/pdZ6L81N/album3.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage0",
          id: "Rising Track Star",
          desc: "1 track question answered correctly.",
          imageUri: "https://i.postimg.cc/28Z9BgX7/track0.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage1",
          id: "Hitmaker",
          desc: "5 track questions answered correctly.",
          imageUri: "https://i.postimg.cc/qvHbcQPV/track1.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage2",
          id: "Track Titan",
          desc: "10 track questions answered correctly.",
          imageUri: "https://i.postimg.cc/xdt62Qcn/track2.png",
          unlocked: false,
        },
        {
          type: "track",
          stage: "stage3",
          id: "Melody Master",
          desc: "15 track questions answered correctly.",
          imageUri: "https://i.postimg.cc/FHbPT3vf/track3.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage0",
          id: "Sound Prodigy",
          desc: "1 audio question answered correctly.",
          imageUri: "https://i.postimg.cc/6pCPFFrp/audio0.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage1",
          id: "Sound Scientist",
          desc: "5 audio questions answered correctly.",
          imageUri: "https://i.postimg.cc/sXHHpzrw/audio1.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage2",
          id: "Frequency Finder",
          desc: "10 audio questions answered correctly.",
          imageUri: "https://i.postimg.cc/Tw3HLwZK/audio2.png",
          unlocked: false,
        },
        {
          type: "audio",
          stage: "stage3",
          id: "Musical Maverick",
          desc: "15 audio questions answered correctly.",
          imageUri: "https://i.postimg.cc/rF03NDzW/audio3.png",
          unlocked: false,
        },
      ],
    ];
  }
  //   console.debug("ach init", achievements);
  storeData("@achievements", JSON.stringify(achievements));
};

export default achievementsInit;
