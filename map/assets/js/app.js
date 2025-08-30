// https://geo.ipify.org/api/v1?apiKey=at_WL9AXxFrjNg2B3NFoc78ryjunkbRn&ipAddress=1.1.1.1

function getLocationInfo(search) {
    return fetch(
        `https://geo.ipify.org/api/v1?apiKey=at_WL9AXxFrjNg2B3NFoc78ryjunkbRn&ipAddress=${search}`
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

const map = L.map("map-container").setView([36.5755139, 53.0566417], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

L.marker([36.5755139, 53.0566417]).addTo(map);

// $("#form").on("submit", async (event) => {
//     event.preventDefault();
//     const value = $("#search").val();
//     const data = await getLocationInfo(value);
//     console.log(data);
//     // $("#isp").html(data.isp);
//     // $("#address").html(
//     //     `${data.location.city}, ${data.location.region}, ${data.location.country}`
//     // );
//     // map.flyTo([data.location.lat, data.location.lng]);
//     // L.marker([data.location.lat, data.location.lng]).addTo(map);
// });
function updateUI(data) {
    $("#ip").text(data.ip);
    $("#location").text(
        `${data.location.city}, ${data.location.region}, ${data.location.country}`
    );
    $("#timezone").text(`UTC ${data.location.timezone}`);
    $("#isp").text(data.isp);

    // نقشه
    map.flyTo([data.location.lat, data.location.lng], 13);

    if (window.currentMarker) {
        map.removeLayer(window.currentMarker);
    }
    window.currentMarker = L.marker([
        data.location.lat,
        data.location.lng,
    ]).addTo(map);
}
$("#form").on("submit", async (event) => {
    event.preventDefault();
    const value = $("#search").val().trim();
    const data = await getLocationInfo(value);
    updateUI(data);
});

window.addEventListener("load", async () => {
    const data = await getLocationInfo("");
    updateUI(data);
});
