const key = 'xNd7439EPmgPuUK43KsmaOc3hTKJxtRr';

//Función que toma información de la ciudad. 
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};
//Función que toma información meteorológica. 
const getWeather = async (cityKey) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}


getCity('london')
    .then(data => {
        return getWeather(data.Key);
    }).then(data => {
        console.log(data)
        }).catch(err => console.log(err));