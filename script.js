const scene =
    document.getElementById("scene");

const mainImage =
    document.getElementById("mainImage");

const playBtn =
    document.getElementById("playBtn");

const musicBtn =
    document.getElementById("musicBtn");

const replayBtn =
    document.getElementById("replayBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const music =
    document.getElementById("music");

const musicStatus =
    document.getElementById("musicStatus");


// =====================================
// CREATE STARS
// =====================================

const stars =
    document.getElementById("stars");

for (let i = 0; i < 80; i++) {

    const star =
        document.createElement("span");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 100 + "%";

    star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
    );

    star.style.animationDelay =
        Math.random() * 4 + "s";

    stars.appendChild(star);
}


// =====================================
// CREATE PARTICLES
// =====================================

const particles =
    document.getElementById("particles");

for (let i = 0; i < 35; i++) {

    const particle =
        document.createElement("span");

    particle.className =
        "particle";

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


// =====================================
// CREATE PETALS
// =====================================

const petals =
    document.getElementById("petals");

for (let i = 0; i < 18; i++) {

    const petal =
        document.createElement("span");

    petal.className =
        "petal";

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


// =====================================
// ANIMATION PLAY / PAUSE
// =====================================

let animationPlaying = true;

playBtn.addEventListener(
    "click",
    () => {

        animationPlaying =
            !animationPlaying;

        if (animationPlaying) {

            scene.classList.remove(
                "paused"
            );

            playBtn.textContent =
                "❚❚";

            playBtn.setAttribute(
                "aria-label",
                "Pause animation"
            );

        } else {

            scene.classList.add(
                "paused"
            );

            playBtn.textContent =
                "▶";

            playBtn.setAttribute(
                "aria-label",
                "Play animation"
            );
        }
    }
);


// =====================================
// MUSIC
// =====================================

let musicPlaying = false;


// Check if audio can load

music.addEventListener(
    "canplaythrough",
    () => {

        console.log(
            "Music file loaded successfully."
        );

        musicStatus.textContent =
            "Music: Ready";
    }
);


// If audio cannot load

music.addEventListener(
    "error",
    () => {

        console.error(
            "Music could not be loaded."
        );

        musicStatus.textContent =
            "Music: File not found";

        musicBtn.disabled = true;

        musicBtn.style.opacity = "0.5";
    }
);


// When music starts

music.addEventListener(
    "play",
    () => {

        musicPlaying = true;

        musicBtn.textContent =
            "🔊";

        musicStatus.textContent =
            "Music: ON";
    }
);


// When music stops

music.addEventListener(
    "pause",
    () => {

        musicPlaying = false;

        musicBtn.textContent =
            "♫";

        musicStatus.textContent =
            "Music: OFF";
    }
);


// Music button

musicBtn.addEventListener(
    "click",
    async () => {

        try {

            if (!musicPlaying) {

                /*
                 IMPORTANT:
                 This play() happens after
                 the user's button tap, so
                 mobile browsers normally
                 allow it.
                */

                await music.play();

            } else {

                music.pause();
            }

        } catch (error) {

            console.error(
                "Audio playback error:",
                error
            );

            musicStatus.textContent =
                "Tap again to play music";
        }
    }
);


// =====================================
// REPLAY
// =====================================

replayBtn.addEventListener(
    "click",
    () => {

        scene.classList.remove(
            "paused"
        );

        animationPlaying = true;

        playBtn.textContent =
            "❚❚";

        // Restart image animation

        mainImage.style.animation =
            "none";

        void mainImage.offsetWidth;

        mainImage.style.animation =
            "divineFloat 6s ease-in-out infinite";
    }
);


// =====================================
// FULLSCREEN
// =====================================

fullscreenBtn.addEventListener(
    "click",
    async () => {

        try {

            if (!document.fullscreenElement) {

                await document.documentElement
                    .requestFullscreen();

            } else {

                await document.exitFullscreen();
            }

        } catch (error) {

            console.log(
                "Fullscreen unavailable."
            );
        }
    }
);


// =====================================
// DESKTOP PARALLAX
// =====================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (window.innerWidth < 700)
            return;

        const x =
            event.clientX /
            window.innerWidth -
            0.5;

        const y =
            event.clientY /
            window.innerHeight -
            0.5;

        mainImage.style.transform =
            `translate(${x * 10}px, ${y * 10}px)`;
    }
);


// =====================================
// RESET PARALLAX
// =====================================

document.addEventListener(
    "mouseleave",
    () => {

        mainImage.style.transform =
            "translate(0, 0)";
    }
);


// =====================================
// PREVENT BROKEN IMAGE EXPERIENCE
// =====================================

mainImage.addEventListener(
    "error",
    () => {

        console.error(
            "Image not found: assets/radha-krishna.jpg"
        );
    }
);
