// ------- get All countries -----------------
const getAll = () => {
    fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,cca3,capital,region,population"
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach((country) => {
                renderCountry(country);
            });
        });
};
getAll();

// ------------ Search --------------------------------
const getCountries = async (name) => {
    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        if (!response.ok) {
            throw new Error("کشور پیدا نشد ❌");
        }
        return await response.json();
    } catch (error) {
        return { error: error.message }; // فقط پیام خطا رو برمی‌گردونه
    }
};
const renderCountry = (data) => {
    const country = `
    <a class="link" href="#">
        <div class="country">
        <img src="${data.flags.png}" />
        <h3 class="country-name">${data.name.common}</h3>
        <span>Population :${data.population}</span>
        <span>Region :${data.region}</span>
        <span>Capital :${data.capital}</span>
        </div>
        </a>
    `;
    $(".countries-holder").append(country);
};

$(".search").on("change", async () => {
    const value = $(".search").val().trim();
    if (value !== "") {
        const data = await getCountries(value);
        if (data.error) {
            $(".error").html("<h1>not found country</h1>");
            $(".countries-holder").html("");
        } else {
            $(".countries-holder").html("");
            $(".countries-holder").html(renderCountry(data[0]));
            $(".error").html("");
        }
    }
    if (value === "") {
        $(".error").html("");
        getAll();
    }
});
// ---------filter by region--------------------------
const filter = (region) => {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach((country) => {
                renderCountry(country);
            });
        });
};
$("#filter").select2({
    placeholder: "Filter by Region",
    allowClear: true,
});

$("#filter").on("change", async () => {
    const region = $("#filter").val();
    console.log(region);
    $(".countries-holder").html("");
    if (region) {
        filter(region);
    }
    if (!region) {
        getAll();
    }
});

// ---------- click on country and go to details page -----------------

$(".countries-holder").on("click", ".link", async (e) => {
    // e.preventDefault();
    const x = e.currentTarget;
    const name = $(x).find(".country-name").html();
    console.log(name);
    $(".link").attr("href", `./detail.html?name=${name}`);
    const data = await getCountries(name);
    console.log(data);
    detail(data[0]);
});

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

if (countryName) {
    getCountries(countryName).then((data) => {
        detail(data[0]);
    });
}
//---- get name of country borders from cca ---
const getname = (cca) => {
    return fetch(`https://restcountries.com/v3.1/alpha/${cca}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data[0].name.common;
        });
};
const renderBorders = async (borders) => {
    if (!borders || borders.length === 0) return "None";

    const spans = await Promise.all(
        borders.map(async (cca) => {
            const commonName = await getname(cca);
            return `<span class="border-span">${commonName}</span>`;
        })
    );

    return spans.join(" ");
};
// ---------- create element details page ------------
const detail = async (data) => {
    const bordersHtml = await renderBorders(data.borders);
    let nativeNames = "-";
    if (data.name.nativeName) {
        nativeNames = Object.values(data.name.nativeName)
            .map((n) => n.common)
            .join(", ");
    }
    let currencies = "-";
    if (data.currencies) {
        currencies = Object.values(data.currencies)
            .map((c) => `${c.name} (${c.symbol || ""})`)
            .join(", ");
    }
    const country = `
    <div class="country-detail">
        <div class="country-img">
            <img src="${data.flags.png}" />
        </div>
        <div class="details">
            <h3 class="country-name">${data.name.common}</h3>
            <div class="country-span">
                <span><b>Native Name : </b>${nativeNames}</span>
                <span><b>Population :</b> ${data.population.toLocaleString()}</span>
                <span><b>Region :</b> ${data.region}</span>
                <span><b>Sub Region :</b> ${data.subregion}</span>
                <span><b>Capital :</b> ${data.capital}</span>
                <span><b>top level Domain :</b> ${data.tld}</span>
                <span><b>Currencies :</b> ${currencies}</span>
                <span><b>Languages :</b> ${Object.values(data.languages).join(
                    ", "
                )}</span>
            </div>
            <div class="borders">
                <b>Border countries:</b>
                ${bordersHtml}
            </div>
        </div>
    </div>
  `;
    $(".container").html(country);
};
