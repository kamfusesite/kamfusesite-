const titleText = "@kamfuse"; // слово которое будет печататься 
let currentChar = 0;

function typeTitle() {
  if (currentChar < titleText.length) {
    document.title = titleText.substring(0, currentChar + 1);
    currentChar++;
    setTimeout(typeTitle, 650); // скорость печати 
  } else {
    setTimeout(resetTitleAnimation, 0); // задержка перед сносом анимации
  }
}

function resetTitleAnimation() {
  currentChar = 0;
  document.title = "k"; // первая буква слова
  setTimeout(typeTitle, 0); //задержка перед началом новой анимации текста
}

window.addEventListener('load', () => {
  setTimeout(typeTitle, 20); // начальная задержка
});

document.addEventListener('DOMContentLoaded', () => {
  const introScreen = document.getElementById('intro-screen');
  const mainContent = document.querySelector('main');
  const starsCanvas = document.getElementById('stars');
  const musicPlayer = document.getElementById('background-music');
  const playPauseBtn = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const trackInfo = document.getElementById('track-info');
  const disc = document.getElementById('disc');
  const nextBtn = document.getElementById('btn-next');
  const prevBtn = document.getElementById('btn-prev');

  // 🎵 Плейлист
  const playlist = [
    { title: "Opium Beat", file: "1.mp3", cover: "1.jpg" },
    { title: "Cyber Flow", file: "2.mp3", cover: "2.jpg" },
    { title: "Midnight", file: "3.mp3", cover: "3.jpg" }
  ];

  let current = 0;

  function loadTrack(index) {
    const track = playlist[index];
    musicPlayer.src = track.file;
    trackInfo.textContent = track.title;
    if (disc) disc.src = track.cover;
    musicPlayer.play().catch(e => console.log('Autoplay error:', e));
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }

  // Заставка
  introScreen.addEventListener('click', () => {
    introScreen.style.opacity = '0';
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.setAttribute('aria-hidden', 'false');
    }, 500);
    loadTrack(current);
  });

  // Управление Play/Pause
  playPauseBtn.addEventListener('click', () => {
    if (musicPlayer.paused) {
      musicPlayer.play();
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      musicPlayer.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  });

  // Следующий трек
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % playlist.length;
      loadTrack(current);
    });
  }

  // Предыдущий трек
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + playlist.length) % playlist.length;
      loadTrack(current);
    });
  }

  // 🌌 Звёзды
  if (starsCanvas) {
    const ctx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;

    const stars = [];
    const starCount = 25;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      ctx.fillStyle = 'white';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function updateStars() {
      stars.forEach(star => {
        star.x += star.vx / 100;
        star.y += star.vy / 100;

        if (star.x < 0 || star.x > starsCanvas.width) star.vx = -star.vx;
        if (star.y < 0 || star.y > starsCanvas.height) star.vy = -star.vy;
      });
    }

    function animate() {
      drawStars();
      updateStars();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    });
  }
});
