const music = document.getElementById("bg-music");
const btn = document.getElementById("mute-btn");

music.muted = true;

btn.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    btn.textContent = " Sound ON";
  } else {
    music.muted = true;
    btn.textContent = " Muted";
  }
});


