async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  const mymap = L.map('mapid').setView([100, -100], 10);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);

  const request = await fetch(endpoint);

  const restaurants = await request.json();

  function findMatches(wordToMatch, restaurants) {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const restaurantName = place.name.replace(regex, `<span class="h2">${place.name}</span>`);
      const zipcode = place.zip.replace(regex, `<span class="h2">${place.zip}</span>`);
      return `
            <li>
              <div class="name">${place.name}</div>
              <div class="address">Address: ${place.address_line_1}</div>
              <div class="city">City: ${place.city}</div>
              <div class="zipcode">Zipcode: ${place.zip}</div>
            </li>
            <br>
              `;
      // Replacing place.name with restaurantName causes a weird bug where
      // restaurant names repeat a bunch of times.
      // The same thing happens if you replace place.zip with zipcode.
    }).join('');
    suggestions.innerHTML = html;
  }

  function removeMarkers(newmap) {
    newmap.eachLayer((layer) => {
      if (Object.keys(layer.options).length === 0) {
        newmap.removeLayer(layer);
      }
    });
  }
  function addMarker(matchArray, mymap) {
    removeMarkers(mymap);
    matchArray.forEach((element) => {
      const point = element.geocoded_column_1;
      if (!point || !point.coordinates) {
        return map();
      }
      const lat = point.coordinates;
      const marker = lat.reverse();
      L.marker(marker).addTo(mymap);
    });
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

// I also couldn't figure out how to make the list of results disappear after
// clearing the search field.

window.onload = windowActions;