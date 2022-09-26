const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {
    
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    details.innerHTML = `
    <div class="details text-muted text-uppercase text-center">
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `

}

const updateCity = async (city) => {

  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  return { cityDetails, weather };

};

cityForm.addEventListener('submit', e => {
    e.preventDefault();
  
  //Tomar valor de la ciudad.
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //Actualizar UI con valor de la ciudad. 
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});