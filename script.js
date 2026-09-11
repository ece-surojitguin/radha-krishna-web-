const scene = document.querySelector(".scene");

const playBtn = document.getElementById("playBtn");
const musicBtn = document.getElementById("musicBtn");
const replayBtn = document.getElementById("replayBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

const music = document.getElementById("music");
const image = document.getElementById("mainImage");


// --------------------------------
// Create stars
// --------------------------------

const stars = document.querySelector(".stars");

for (let i = 0; i < 80; i++) {

    const star = document.createElement("span");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
    );

    star.style.animationDelay =
        Math.random() * 4 + "s";

    stars.appendChild(star);
}


// --------------------------------
// Create golden particles
// --------------------------------

const particles = document.querySelector(".particles");

for (let i = 0; i < 35; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.setProperty(
        "--duration",
        (7 + Math.random() * 8) + "s"
    );

    particle.style.setProperty(
        "--drift",
        (Math.random() * 160 - 80) + "px"
    );

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    particles.appendChild(particle);
}


// --------------------------------
// Create flower petals
// --------------------------------

const petals = document.querySelector(".petals");

for (let i = 0; i < 18; i++) {

    const petal = document.createElement("span");

    petal.className = "petal";

    petal.style.left =
        Math.random() * 100 + "%";

    petal.style.setProperty(
        "--duration",
        (8 + Math.random() * 8) + "s"
    );

    petal.style.setProperty(
        "--drift",
        (Math.random() * 180 - 90) + "px"
    );

    petal.style.animationDelay =
        Math.random() * 10 + "s";

    petals.appendChild(petal);
}


// --------------------------------
// Play / pause animation
// --------------------------------

let animationPlaying = true;

playBtn.addEventListener("click", () => {

    animationPlaying = !animationPlaying;

    scene.classList.toggle(
        "paused",
        !animationPlaying
    );

    playBtn.textContent =
        animationPlaying ? "❚❚" : "▶";
});


// --------------------------------
// Music
// --------------------------------

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    try {

        if (!musicPlaying) {

            await music.play();

            musicPlaying = true;

            musicBtn.textContent = "🔊";

        } else {

            music.pause();

            musicPlaying = false;

            musicBtn.textContent = "♫";
        }

    } catch (error) {

        console.log(
            "Add assets/radha-krishna.mp3 to enable music."
        );

        musicBtn.textContent = "♫";
    }
});


// --------------------------------
// Replay
// --------------------------------

replayBtn.addEventListener("click", () => {

    scene.classList.remove("paused");

    image.style.animation = "none";

    void image.offsetWidth;

    image.style.animation =
        "divineFloat 6s ease-in-out infinite";
});


// --------------------------------
// Fullscreen
// --------------------------------

fullscreenBtn.addEventListener("click", async () => {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement.requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (error) {

        console.log("Fullscreen unavailable.");
    }
});


// --------------------------------
// Mouse parallax
// --------------------------------

document.addEventListener("mousemove", (event) => {

    if (window.innerWidth < 700) return;

    const x =
        (event.clientX / window.innerWidth - 0.5);

    const y =
        (event.clientY / window.innerHeight - 0.5);

    image.style.transform =
        `translate(${x * 12}px, ${y * 12}px) scale(1.01)`;
});


// --------------------------------
// Reset parallax
// --------------------------------

document.addEventListener("mouseleave", () => {

    image.style.transform =
        "translate(0, 0) scale(1)";
});
