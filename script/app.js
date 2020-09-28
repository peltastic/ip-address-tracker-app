let ipData;

const block1 = document.getElementById("block1");
const block2 = document.getElementById("block2");
const block3 = document.getElementById("block3");
const block4 = document.getElementById("block4");

let latitude = 37.4223;
let longitude = -122.085;

//function that sends our request to ipyfy. Its inside a function
// so that we can call it again when the search btn is clicked to aviod 
// redundant code

function httpRequest(ip) {
  axios
    .get(
      "https://geo.ipify.org/api/v1?apiKey=at_xuPPlfX7uJABBg7yIoF9vgdlYsM04&ipAddress=" +
        ip
    )
    .then((res) => {
      console.log(res.data);
      ipData = res.data;
      block1.textContent = ipData.ip;
      block2.textContent =
        ipData.location.city +
        ", " +
        ipData.location.region +
        ", " +
        ipData.location.country;
      block3.textContent = ipData.location.timezone;
      block4.textContent = ipData.isp;
      latitude = ipData.location.lat;
      longitude = ipData.location.lng;

      var mymap = L.map("mapid").setView([latitude, longitude], 13);

      var tileLayer = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVsdGFzdGljIiwiYSI6ImNrZmlvcW5qdTBlZzMyem9kNWdya2J3MXUifQ.FtqkSaFMf4zmPAJTeiIAXQ",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            "pk.eyJ1IjoicGVsdGFzdGljIiwiYSI6ImNrZmlvcW5qdTBlZzMyem9kNWdya2J3MXUifQ.FtqkSaFMf4zmPAJTeiIAXQ",
        }
      ).addTo(mymap);

      var marker = L.marker([latitude, longitude]).addTo(mymap);
    });
}

httpRequest("");

const searchIn = document.querySelector(".imageContainer__inputs input");
const searchBtn = document.querySelector(".imageContainer__inputs button");
const ipRegEx = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b /

let userSearchValue;

function search(event) {
  userSearchValue = event.target.value;
}

console.log(searchIn);
searchIn.addEventListener("change", (e) => search(e));

searchBtn.addEventListener("click", () => {
  if (!ipRegEx.test(userSearchValue)) {
    document.getElementById('error').style.display = "block"
  } else {
    document.getElementById('error').style.display = "none"
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = '<div id="mapid"></div>';
    httpRequest(userSearchValue);
  }
});
