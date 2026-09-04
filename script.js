document.addEventListener("DOMContentLoaded", () => {
    const config = invitationConfig;
    const cover = document.getElementById("cover");
    const birthday = document.getElementById("birthday");
    const photo = document.getElementById("photo");
    const message = document.getElementById("message");
    const together = document.getElementById("together");
    const closing = document.getElementById("closing");
    const openInvitation = document.getElementById("openInvitation");
    const coverImage = document.getElementById("coverImage");
    const birthdaySmallText = document.getElementById("birthdaySmallText");
    const birthdayTitle = document.getElementById("birthdayTitle");
    const birthdayName = document.getElementById("birthdayName");
    const birthdayMessage = document.getElementById("birthdayMessage");
    const photoLabel = document.getElementById("photoLabel");
    const mainPhoto = document.getElementById("mainPhoto");
    const photoName = document.getElementById("photoName");
    const messageLabel = document.getElementById("messageLabel");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");
    const messageSender = document.getElementById("messageSender");
    const memoriesLabel = document.getElementById("memoriesLabel");
    const memoryPhoto1 = document.getElementById("memoryPhoto1");
    const memoryPhoto2 = document.getElementById("memoryPhoto2");
    const closingSender = document.getElementById("closingSender");
    const whatsappButton = document.getElementById("whatsappButton");
    const musicButton = document.getElementById("musicButton");
    const musicIcon = document.getElementById("musicIcon");
    const backgroundMusic = document.getElementById("backgroundMusic");
    const scenes = [cover, birthday, photo, message, together, closing];
    let currentScene = 0;
    let invitationOpened = false;
    let musicPlaying = false;
    let isTransitioning = false;
    let coverOpening = false;
    let touchStartY = 0;
    let touchEndY = 0;
    function loadContent() {
        document.title = `Happy Birthday ${config.birthdayName}`;
        coverImage.src = config.cover.image;
        coverImage.alt = config.cover.alt;
        birthdaySmallText.textContent = config.birthday.smallText;
        birthdayTitle.textContent = config.birthday.title;
        birthdayName.textContent = config.birthdayName;
        birthdayMessage.textContent = config.birthday.message;
        photoLabel.textContent = config.mainPhoto.label;
        mainPhoto.src = config.mainPhoto.image;
        mainPhoto.alt = config.mainPhoto.alt;
        photoName.textContent = config.birthdayName;
        messageLabel.textContent = config.message.label;
        messageTitle.textContent = config.message.title;
        messageText.textContent = config.message.text;
        messageSender.textContent = config.senderName;
        memoriesLabel.textContent = config.memories.label;
        if (config.memories.photos.length > 0) {
            memoryPhoto1.src = config.memories.photos[0].image;
            memoryPhoto1.alt = config.memories.photos[0].alt;
        }
        if (config.memories.photos.length > 1) {
            memoryPhoto2.src = config.memories.photos[1].image;
            memoryPhoto2.alt = config.memories.photos[1].alt;
        }
        closingSender.textContent = config.closing.senderName;
        setupMusic();
        setupWhatsApp();
        playMusic();
    }
    function createSakuraPetals() {
        const container = document.getElementById("sakuraContainer");
        if (!container) {
            return;
        }
        const petalCount = window.innerWidth <= 600 ? 26 : 34;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement("span");
            petal.className = "sakura-petal";
            const size = 6 + Math.random() * 7;
            const left = Math.random() * 100;
            const duration = 8 + Math.random() * 9;
            const delay = Math.random() * -16;
            const drift1 = -50 + Math.random() * 100;
            const drift2 = -80 + Math.random() * 160;
            const drift3 = -100 + Math.random() * 200;
            const rotate1 = 120 + Math.random() * 240;
            const rotate2 = 300 + Math.random() * 360;
            const rotate3 = 480 + Math.random() * 480;
            const opacity = 0.32 + Math.random() * 0.38;
            petal.style.left = `${left}%`;
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.35}px`;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.setProperty("--drift-1", `${drift1}px`);
            petal.style.setProperty("--drift-2", `${drift2}px`);
            petal.style.setProperty("--drift-3", `${drift3}px`);
            petal.style.setProperty("--rotate-1", `${rotate1}deg`);
            petal.style.setProperty("--rotate-2", `${rotate2}deg`);
            petal.style.setProperty("--rotate-3", `${rotate3}deg`);
            petal.style.setProperty("--petal-opacity", opacity);
            container.appendChild(petal);
        }
    }
    function setupMusic() {
        if (!config.music.enabled || !config.music.source) {
            musicButton.style.display = "none";
            return;
        }
        backgroundMusic.src = config.music.source;
        backgroundMusic.title = config.music.title;
        backgroundMusic.volume = 0.5;
        musicIcon.textContent = "🔇";
        musicButton.setAttribute("aria-label", "Nyalakan musik");
        musicButton.setAttribute("title", "Nyalakan musik");
        musicButton.classList.remove("playing");
    }
    function setupWhatsApp() {
        if (!config.whatsapp.number) {
            whatsappButton.style.display = "none";
            return;
        }
        const number = config.whatsapp.number.replace(/\D/g, "");
        const text = encodeURIComponent(config.whatsapp.message || "");
        whatsappButton.href = `https://wa.me/${number}?text=${text}`;
        whatsappButton.target = "_blank";
        whatsappButton.rel = "noopener noreferrer";
    }
    function playMusic() {
        if (!config.music.enabled || !config.music.source) {
            return;
        }
        backgroundMusic.play()
            .then(() => {
                musicPlaying = true;
                updateMusicButton();
            })
            .catch(() => {
                musicPlaying = false;
                updateMusicButton();
            });
    }
    function pauseMusic() {
        backgroundMusic.pause();
        musicPlaying = false;
        updateMusicButton();
    }
    function toggleMusic() {
        if (!config.music.enabled || !config.music.source) {
            return;
        }
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }
    function updateMusicButton() {
        if (musicPlaying) {
            musicIcon.textContent = "🔊";
            musicButton.setAttribute("aria-label", "Matikan musik");
            musicButton.setAttribute("title", "Matikan musik");
            musicButton.classList.add("playing");
        } else {
            musicIcon.textContent = "🔇";
            musicButton.setAttribute("aria-label", "Nyalakan musik");
            musicButton.setAttribute("title", "Nyalakan musik");
            musicButton.classList.remove("playing");
        }
    }
    function showScene(index) {
        if (index < 0 || index >= scenes.length) {
            return;
        }
        if (index === currentScene || isTransitioning) {
            return;
        }
        isTransitioning = true;
        const current = scenes[currentScene];
        const next = scenes[index];
        current.classList.remove("active");
        current.classList.add("previous");
        next.classList.remove("previous");
        next.classList.add("active");
        currentScene = index;
        const handleTransitionEnd = (event) => {
            if (event.target !== next) {
                return;
            }
            next.removeEventListener("transitionend", handleTransitionEnd);
            scenes.forEach((scene, sceneIndex) => {
                if (sceneIndex !== currentScene) {
                    scene.classList.remove("previous");
                }
            });
            isTransitioning = false;
        };
        next.addEventListener("transitionend", handleTransitionEnd);
    }
    function openInvitationScene() {
        if (invitationOpened || isTransitioning || coverOpening) {
            return;
        }
        coverOpening = true;
        isTransitioning = true;
        playMusic();
        cover.classList.add("opened");
        const handleCoverTransition = (event) => {
            if (event.target !== openInvitation) {
                return;
            }
            openInvitation.removeEventListener("transitionend", handleCoverTransition);
            coverOpening = false;
            invitationOpened = true;
            isTransitioning = false;
            showScene(1);
        };
        openInvitation.addEventListener("transitionend", handleCoverTransition);
    }
    function nextScene() {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        if (currentScene < scenes.length - 1) {
            showScene(currentScene + 1);
        }
    }
    function previousScene() {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        if (currentScene > 1) {
            showScene(currentScene - 1);
        }
    }
    function handleWheel(event) {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        if (event.deltaY > 0) {
            nextScene();
        } else if (event.deltaY < 0) {
            previousScene();
        }
    }
    function handleTouchStart(event) {
        touchStartY = event.changedTouches[0].screenY;
    }
    function handleTouchEnd(event) {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        touchEndY = event.changedTouches[0].screenY;
        const distance = touchStartY - touchEndY;
        if (Math.abs(distance) < 50) {
            return;
        }
        if (distance > 0) {
            nextScene();
        } else {
            previousScene();
        }
    }
    function handleSceneClick(event) {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        if (event.target.closest("#musicButton")) {
            return;
        }
        if (event.target.closest("#whatsappButton")) {
            return;
        }
        if (currentScene > 0 && currentScene < scenes.length - 1) {
            nextScene();
        }
    }
    openInvitation.addEventListener("click", openInvitationScene);
    musicButton.addEventListener("click", toggleMusic);
    window.addEventListener("wheel", handleWheel, {
        passive: true
    });
    window.addEventListener("touchstart", handleTouchStart, {
        passive: true
    });
    window.addEventListener("touchend", handleTouchEnd, {
        passive: true
    });
    scenes.forEach((scene) => {
        scene.addEventListener("click", handleSceneClick);
    });
    document.addEventListener("keydown", (event) => {
        if (!invitationOpened || isTransitioning) {
            return;
        }
        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowRight" ||
            event.key === " "
        ) {
            event.preventDefault();
            nextScene();
        }
        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft"
        ) {
            event.preventDefault();
            previousScene();
        }
    });
    backgroundMusic.addEventListener("play", () => {
        musicPlaying = true;
        updateMusicButton();
    });
    backgroundMusic.addEventListener("pause", () => {
        musicPlaying = false;
        updateMusicButton();
    });
    backgroundMusic.addEventListener("ended", () => {
        musicPlaying = false;
        updateMusicButton();
    });
    loadContent();
    createSakuraPetals();
    updateMusicButton();
});