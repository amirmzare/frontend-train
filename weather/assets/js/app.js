const weatherData = {
    tehran: { temp: 31, condition: "آفتابی", humidity: 22, wind: 14 },
    mashhad: { temp: 27, condition: "نیمه‌ابری", humidity: 35, wind: 10 },
    shiraz: { temp: 34, condition: "آفتابی", humidity: 18, wind: 12 },
    tabriz: { temp: 24, condition: "بارانی", humidity: 50, wind: 8 },
    esfahan: { temp: 29, condition: "ابری", humidity: 40, wind: 11 },
    rasht: { temp: 26, condition: "بارانی", humidity: 78, wind: 6 },
    yazd: { temp: 38, condition: "آفتابی", humidity: 12, wind: 15 },
    kerman: { temp: 30, condition: "نیمه‌ابری", humidity: 28, wind: 9 },
    ahvaz: { temp: 41, condition: "گرد و غبار", humidity: 20, wind: 18 },
    bandarabbas: { temp: 36, condition: "شرجی", humidity: 80, wind: 7 },
};

const input = document.querySelector("#search-input");
const btn = document.querySelector("#search-btn");
const resultBox = document.querySelector(".result-box");
const times = document.querySelector(".time");
const form = document.querySelector("#search-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let value = input.value;
    value = value.toLowerCase();
    for (let [city, data] of Object.entries(weatherData)) {
        if (value === city) {
            resultBox.innerHTML = `
            <div class="condition" >${data["condition"]}</div>
            <span class="temp" >${data["temp"]} C°</span>
            <div class="city-name">
                <img src="./assets/image/icons/location.png" alt="loc"/>
                <h3>${value.toUpperCase()}</h3>
            </div>
            <div class="info">
                    <div class="wind">
                    <img src="./assets/image/icons/pressure.png" />
                    <span>1020 Pa</span>
                    <p>Pressure</p>
                </div>
                <div class="wind">
                    <img src="./assets/image/icons/wind-speed.png" />
                    <span>${data["wind"]} km/h</span>
                    <p>wind speed</p>
                </div>
                <div class="wind">
                    <img src="./assets/image/icons/humidity.png" />
                    <span>%${data["humidity"]}</span>
                    <p>humidity</p>
                </div>
            </div>
                `;
            const cond = document.querySelector(".condition");
            const condition = data["condition"];
            if (condition === "آفتابی") {
                cond.className = "condition aftabi";
                cond.textContent = "sunny";
            }

            if (condition === "ابری") {
                cond.className = "condition abri";
                cond.textContent = "cloudy";
            }
            if (condition === "بارانی") {
                cond.className = "condition barani";
                cond.textContent = "rainy";
            }
            if (condition === "نیمه‌ابری") {
                cond.className = "condition nime-abri";
                cond.textContent = "partly cloudy";
            }
            if (condition === "گرد و غبار") {
                cond.className = "condition gard";
                cond.textContent = "dusty";
            }
            if (condition === "شرجی") {
                cond.className = "condition sharji";
                cond.textContent = "humid";
            }
            break;
        }
        if (value !== city) {
            resultBox.innerHTML = `
            <div class='error'>
                <img src="./assets/image/icons/error.png" />
                <h4>City not found</h4>
            </div>
            `;
            resultBox.className = "result-box";
        }
    }

    input.value = "";
});

setInterval(() => {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    h = h < 10 ? "0" + h : h;

    times.innerHTML = `
    <h1>${h} : ${m} : ${s}</h1>
    `;
}, 1000);
