console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
    duration: "5:34",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
    duration: "2:50",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
    duration: "4:32",
  },
  {
    songName: "Different Heaven & EH!DE - My Heart [NCS Release]",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
    duration: "4:02",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
    duration: "5:30",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/6.jpg",
    duration: "4:01",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/7.jpg",
    duration: "3:15",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/8.jpg",
    duration: "2:14",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "songs/2.mp3",
    coverPath: "covers/9.jpg",
    duration: "5:30",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "songs/4.mp3",
    coverPath: "covers/10.jpg",
    duration: "4:52",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  console.log(
    (element.getElementsByClassName("timestamp")[0].innerText =
      songs[i].duration)
  );
});

// Handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    Array.from(document.getElementsByClassName("songItemPlay"))[
      songIndex
    ].classList.remove("fa-play-circle");
    Array.from(document.getElementsByClassName("songItemPlay"))[
      songIndex
    ].classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    Array.from(document.getElementsByClassName("songItemPlay"))[
      songIndex
    ].classList.remove("fa-pause-circle");
    Array.from(document.getElementsByClassName("songItemPlay"))[
      songIndex
    ].classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
  //   console.log(progress);
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

const playButton = (songIndex) => {
  makeAllPlays();
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  Array.from(document.getElementsByClassName("songItemPlay"))[
    songIndex
  ].classList.remove("fa-play-circle");
  Array.from(document.getElementsByClassName("songItemPlay"))[
    songIndex
  ].classList.add("fa-pause-circle");
  gif.style.opacity = 1;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      let check = parseInt(e.target.id);
      if (audioElement.paused && check === songIndex) {
        makeAllPlays();
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        Array.from(document.getElementsByClassName("songItemPlay"))[
          songIndex
        ].classList.remove("fa-play-circle");
        Array.from(document.getElementsByClassName("songItemPlay"))[
          songIndex
        ].classList.add("fa-pause-circle");
        gif.style.opacity = 1;
      } else if (check != songIndex) {
        songIndex = check;
        playButton(songIndex);
      } else {
        songIndex = check;
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        Array.from(document.getElementsByClassName("songItemPlay"))[
          songIndex
        ].classList.remove("fa-pause-circle");
        Array.from(document.getElementsByClassName("songItemPlay"))[
          songIndex
        ].classList.add("fa-play-circle");
        gif.style.opacity = 0;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  playButton(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  playButton(songIndex);
});
