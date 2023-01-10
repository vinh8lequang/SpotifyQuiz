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

//initialize the achievements in storage on first load
const achievementsInit = async () => {
  var achievements = await getData("@achievements");
  achievements = JSON.parse(achievements);

  if (!achievements) {
    achievements = [
      [
        {
          albumCounter: 32,
          trackCounter: 8,
          audioCounter: 2,
        },
      ],
      [
        {
          type: "album",
          id: "stage0",
          name: "Album Newbie",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "album",
          id: "stage1",
          name: "Vinyl Collector",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "album",
          id: "stage2",
          name: "Studio Rat",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "album",
          id: "stage3",
          name: "Discography Devotee",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "track",
          id: "stage0",
          name: "Rising Track Star",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "track",
          id: "stage1",
          name: "Hitmaker",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "track",
          id: "stage2",
          name: "Track Titan",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "track",
          id: "stage3",
          name: "Melody Master",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "audio",
          id: "stage0",
          name: "Sound Prodigy",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "audio",
          id: "stage1",
          name: "Sound Scientist",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "audio",
          id: "stage2",
          name: "Frequency Finder",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
        {
          type: "audio",
          id: "stage3",
          name: "Musical Maverick",
          imageUri:
            "https://banner2.cleanpng.com/20171127/378/gold-badge-template-png-clipart-picture-5a1bbbe670b253.4268003715117670144616.jpg",
          amount: 0,
        },
      ],
    ];
  }
  //   console.debug("ach init", achievements);
  storeData("@achievements", JSON.stringify(achievements));
};

export default achievementsInit;
