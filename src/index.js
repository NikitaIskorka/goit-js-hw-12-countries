import './styles.css';
import './js/fetchCountries'
import countryCard from "./js/templates/country-card.hbs"
import fetchCountries from './js/fetchCountries'
import notification from './js/pnotify'
var debounce = require('lodash.debounce');
console.dir(debounce);
const refs = {
    input: document.querySelector('.input-js'),
    countryContainer: document.querySelector('.country-list')
}
console.log(refs.input);
console.log(refs.countryContainer);

refs.input.addEventListener('input',  debounce(onInputChange,100)) 

function onInputChange(event) {
    clearCountryList()
    const inputValue = event.currentTarget.value.toLowerCase()
    fetchCountries(inputValue).then(makeCountryCardMarkup).then(insertCountryCardMarkup).catch(notification.onErrorNotification)
}


function makeCountryCardMarkup(country) {
    if (country.length > 10) {
        notification.onTooManyResults()
        return ''
    }
    if (country.length === 1) {
        notification.onSucsessNotification()
       return  countryCard(country[0])
    }
    
    
    return countryCard(country)
}


function insertCountryCardMarkup(markup) {
    refs.countryContainer.insertAdjacentHTML('beforeend', markup)
    
}

function clearCountryList() {
    refs.countryContainer.innerHTML =''
}

