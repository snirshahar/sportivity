import { httpService } from './HttpService.js';

const BASE_URL = 'http://localhost:3000/'

function getActivities(){
    console.log('GET ACTIVIES')
    return httpService.get(BASE_URL + 'activity').then(res => res.data)
}

function getActivity(id){
    return httpService.get(BASE_URL + `activity${id}`).then(res => res.data)
}

function addActivity(activity){
    if(!activity.id){ // Needs to be removed when backend is alive
        activity.id = Math.floor(Math.random() * 1000 + 5000);
        return httpService.post(BASE_URL + 'activity', activity).then(res => res.data);
    }
    return httpService.put(BASE_URL + `activity${activity.id}`, activity).then(res => res.data);
}

function removeActivity(id){
    return httpService.delete(BASE_URL + `activity/${id}`)
}

export default {
    getActivities,
    getActivity,
    addActivity,
    removeActivity
}