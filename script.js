function initTabriknoma() {
  var greeting = document.getElementById('greeting');
  var videoScreen = document.getElementById('video-screen');
  var video = document.getElementById('bday-video');
  var missing = document.getElementById('missing-video');
  var tapBtn = document.getElementById('tap-btn');
  var backBtn = document.getElementById('back-btn');

  if (!greeting || !videoScreen || !video || !tapBtn || !backBtn) {
    return; // markup missing something — fail quietly, never throw
  }

  function showVideo() {
    greeting.classList.add('is-hidden');
    videoScreen.classList.add('is-visible');
    try {
      var p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function () { /* autoplay blocked — native controls still work */ });
      }
    } catch (err) { /* ignore */ }
  }

  function showGreeting() {
    try { video.pause(); } catch (err) { /* ignore */ }
    videoScreen.classList.remove('is-visible');
    greeting.classList.remove('is-hidden');
  }

  tapBtn.addEventListener('click', showVideo);
  backBtn.addEventListener('click', showGreeting);

  video.addEventListener('error', function () {
    if (missing) missing.classList.add('show');
    video.style.display = 'none';
  });

  // Optional: if this page is opened inside a Telegram Mini App, make it
  // behave a bit more native. Wrapped so it can never block the buttons above.
  try {
    var tg = window.Telegram && window.Telegram.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
    }
  } catch (err) { /* not inside Telegram — ignore */ }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabriknoma);
} else {
  initTabriknoma();
}
