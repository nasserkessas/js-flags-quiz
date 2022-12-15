let correct;
let amtCorrect = 0;
let seconds = 20;
let amtIncorrect = 0;
function main() {
  let options = [];
  const maxOptions = 4;

  while (options.length < maxOptions) {
    let country = getRandomCountry();
    if (options.indexOf(country) === -1) {
      options.push(country);
    }
  }
  correct = options[Math.round(Math.random() * (options.length - 1))];
  for (let i = 0; i < options.length; i++) {
    get(`option${i + 1}label`).innerHTML = options[i].name;
    get(`option${i + 1}input`).value = options[i].name;
    get(`option${i + 1}input`).checked = false;
  }

  get("flag").src = correct.flag;
}

function getRandomCountry() {
  return countries[Math.round(Math.random() * (countries.length - 1))];
}

function get(id) {
  return document.getElementById(id);
}

function check() {
  let input;
  try {
    input = document.querySelector('input[name = "option"]:checked').value;
  } catch {
    return;
  }
  if (input === correct.name) {
    amtCorrect++;
    get("score").innerHTML = amtCorrect;
  } else {
    amtIncorrect++;
  }
  main();
}

function finish() {
  clearInterval(checkInterval);
  get("alert").style.display = "block";
  get("card").style.display = "none";
  get("alertscore").innerHTML = amtCorrect;
  let percentage = Math.round((amtCorrect / (amtCorrect + amtIncorrect)) * 100);
  if (isNaN(percentage)) percentage = 100;
  get("alertaccuracy").innerHTML = `${percentage}%`;
}

function timer() {
  setTimeout(finish, seconds * 1000);
  get("time").innerHTML = seconds;
  let countdown = setInterval(function () {
    seconds--;
    get("time").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
    if (seconds === 5) get("time").style.color = "#ff0000";
  }, 1000);
}

function refresh() {
  location = location;
}

let checkInterval = setInterval(check, 50);
main();
timer();
