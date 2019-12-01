import axios from 'axios';

function getLocation({ latitude, longitude }) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAsh26jhkU5wtp6r_IcqAnuuuLrulpFl6Q`)
        .catch(err => { throw err })
}

export default {
    getLocation
}