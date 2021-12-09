async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

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
            <div class="name">${place.name}</div></li>
            <div class="address">Address: ${place.address_line_1}</div>
            <div class="city">City: ${place.city}</div>
            <div class="zipcode">Zipcode: ${place.zip}</div>
          </li>
          <br>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}

window.onload = windowActions;