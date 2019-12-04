import axios from 'axios';

function getLocation({ latitude, longitude }) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsh26jhkU5wtp6r_IcqAnuuuLrulpFl6Q`)
        .catch(err => { throw err })
}

function getCoors(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAsh26jhkU5wtp6r_IcqAnuuuLrulpFl6Q`)
        .catch(err => { throw err })
}

function getDetails(placeId) {
    return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyAsh26jhkU5wtp6r_IcqAnuuuLrulpFl6Q`)
        .catch(err => { throw err })
}

export default {
    getLocation,
    getCoors,
    getDetails
}