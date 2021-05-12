import './styles.css';
import './js/fetchCountries'
import countryCard from "./js/templates/country-card.hbs"
import fetchCountries from './js/fetchCountries'
import notification from './js/pnotify'

const refs = {
    input: document.querySelector('.input-js'),
    countryContainer: document.querySelector('.country-list')
}
console.log(refs.input);
console.log(refs.countryContainer);

refs.input.addEventListener('input',onInputChange)
function onInputChange(event) {
    const inputValue = event.currentTarget.value.toLowerCase()
    fetchCountries(inputValue).then(country => {
         render(country)
     })
}
function render(country) {
    const markup = countryCard(country)
    refs.countryContainer.insertAdjacentHTML('beforeend',markup)
}
