import './styles.css';
import './js/fetchCountries'
import countryCard from "./js/templates/country-card.hbs"
import fetchCountries from './js/fetchCountries'
import notification from './js/pnotify'
import _ from 'lodash';
const refs = {
    input: document.querySelector('.input-js'),
    countryContainer: document.querySelector('.country-list')
}


refs.input.addEventListener('input',  _.debounce(onInputChange,500)) 

function onInputChange(event) {
    clearCountryList()
    const inputValue = event.target.value.toLowerCase()
    fetchCountries(inputValue).then(makeCountryCardMarkup).then(insertCountryCardMarkup).catch(notification.onErrorNotification)
}


function makeCountryCardMarkup(country) {
    if (country.length > 10) {
        notification.onTooManyResults()
        return ''
    }
    if (country.length === 1) {
        notification.onSucsessNotification()
       
        return countryCard(country[0])
    }
    
    
    return  country.map(country => `<li class='possible-country-list'>${country.name}</li>`).join('');
}


function insertCountryCardMarkup(markup) {
    refs.countryContainer.insertAdjacentHTML('beforeend', markup)
    
}

function clearCountryList() {
    refs.countryContainer.innerHTML =''
}

