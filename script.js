let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let lapCount = 1;
let previousLapSeconds = 0;

function updateDisplay() {
  let h = String(hours).padStart(2, '0');
  let m = String(minutes).padStart(2, '0');
  let s = String(seconds).padStart(2, '0');
  document.getElementById("display").innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

function start() {
  if (timer !== null) return;
  timer = setInterval(stopwatch, 1000);
}

function pause() {
  clearInterval(timer);
  timer = null;
}

function reset() {
  clearInterval(timer);
  [hours, minutes, seconds] = [0, 0, 0];
  updateDisplay();
  clearLaps();
  timer = null;
}

function lap() {
  if (timer === null) return;

  const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
  const diff = currentTotalSeconds - previousLapSeconds;
  previousLapSeconds = currentTotalSeconds;

  const display = document.getElementById("display").innerText;
  const laps = document.getElementById("laps");

  const lapItem = document.createElement("div");
  lapItem.className = "lap";

  const diffH = String(Math.floor(diff / 3600)).padStart(2, '0');
  const diffM = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const diffS = String(diff % 60).padStart(2, '0');
  const diffStr = `+${diffH}:${diffM}:${diffS}`;

  lapItem.innerText = `Lap ${lapCount++}: ${display} (${diffStr})`;
  laps.prepend(lapItem);
}

function clearLaps() {
  document.getElementById("laps").innerHTML = "";
  lapCount = 1;
  previousLapSeconds = 0;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

updateDisplay();
