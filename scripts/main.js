const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    
    const cityDetails = data.cityDetails;
    const weather = data.weather;
    
    //Actualiza UI con datos de la ciudad y clima
    details.innerHTML = `
    <div class="details text-muted text-uppercase text-center">
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    </div>
    `;

    //Inserta el ícono en el DOM.
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //Condicional día/noche, inserta imagen en el DOM.
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';       
    }else{
        timeSrc = 'img/night.svg';
    };
    time.setAttribute('src', timeSrc);

    // Quita la clase d-none si es necesario.
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };

    console.log(data);

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
    
  //Local storage.
  localStorage.setItem('city', city); 
});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}