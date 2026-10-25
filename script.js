
const meetDate = document.getElementById("meetDate");
const saveDate = document.getElementById("saveDate");
const countdownMessage = document.getElementById("countdownMessage");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

// Show the countdown for the selected meeting date
function updateCountdown(dateValue) {
  if (!dateValue) {
    countdownMessage.textContent =
      "Choose your date to start our countdown. 💗";
    return;
  }

  const target = new Date(dateValue + "T00:00:00");
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  if (Number.isNaN(target.getTime())) {
    countdownMessage.textContent =
      "Please choose a valid date, my love. ♡";
    return;
  }

  const days = Math.round(
    (target.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24)
  );

  if (days < 0) {
    countdownMessage.textContent =
      "That date has passed. Let's choose another day for our next hug. ♡";
  } else if (days === 0) {
    countdownMessage.textContent =
      "It's the day! Sending you the biggest virtual hug. ❤️";
  } else if (days === 1) {
    countdownMessage.textContent =
      "Just 1 more day until our next hug! 💗";
  } else {
    countdownMessage.textContent =
      `${days} days to go until our next hug! 💗`;
  }
}

// Restore a previously selected date
try {
  const savedDate = localStorage.getItem("himaMeetingDate");

  if (savedDate) {
    meetDate.value = savedDate;
    updateCountdown(savedDate);
  }
} catch (error) {
  console.log("Browser storage is unavailable.");
}

// Save the selected meeting date
saveDate.addEventListener("click", function () {
  const selectedDate = meetDate.value;

  if (!selectedDate) {
    countdownMessage.textContent =
      "Choose a date first, then tap the button, love. ♡";

    meetDate.focus();
    return;
  }

  try {
    localStorage.setItem("himaMeetingDate", selectedDate);
  } catch (error) {
    // The countdown can still work without saving the date.
  }

  updateCountdown(selectedDate);
});

// Update when the selected date changes
meetDate.addEventListener("change", function () {
  updateCountdown(meetDate.value);
});

// Open and close the special surprise message
surpriseButton.addEventListener("click", function () {
  const opening = surpriseMessage.hidden;

  surpriseMessage.hidden = !opening;

  surpriseButton.innerHTML = opening
    ? "Close your surprise ♡"
    : "Open your surprise ♡";

  if (opening) {
    surpriseMessage.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    createHeartBurst();
  }
});

// Create floating hearts when the surprise opens
function createHeartBurst() {
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");

    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.setAttribute("aria-hidden", "true");

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = (35 + Math.random() * 45) + "vh";
    heart.style.zIndex = "9999";
    heart.style.pointerEvents = "none";

    heart.style.color =
      Math.random() > 0.5 ? "#ff91b9" : "#c8b5ff";

    heart.style.fontSize =
      (16 + Math.random() * 20) + "px";

    heart.style.transition =
      "transform 1.5s ease, opacity 1.5s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(function () {
      heart.style.transform =
        `translate(${(Math.random() - 0.5) * 160}px, -180px) rotate(35deg)`;

      heart.style.opacity = "0";
    });

    setTimeout(function () {
      heart.remove();
    }, 1600);
  }
}
