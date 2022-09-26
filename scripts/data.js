const key = 'RzgBfrC7ftDgY1B3m7PGCw0p2ddjtvXl';

//Función que toma información meteorológica. 
const getWeather = async (id) => {
  
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
  
    const response = await fetch(base + query);
    const data = await response.json();
  
    return data[0];

};

//Función que toma información de la ciudad. 
const getCity = async (city) => {
  
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
  
    const response = await fetch(base + query);
    const data = await response.json();
  
    return data[0];
  
};