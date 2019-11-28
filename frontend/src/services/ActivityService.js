import { httpService } from './HttpService.js';

const BASE_URL = 'http://localhost:3000/api/activity/'

function getActivities(){
    return httpService.get(BASE_URL).then(res => {
        console.log('getActivities', res.data);
        return res.data
    })
}

function getActivity(id){
    return httpService.get(BASE_URL + id).then(res => res.data)
}

function addActivity(activity){
    if(!activity.id){ // Needs to be removed when backend is alive
        activity.id = Math.floor(Math.random() * 1000 + 5000);
        return httpService.post(BASE_URL, activity).then(res => res.data);
    }
    return httpService.put(BASE_URL + activity.id, activity).then(res => res.data);
}

function removeActivity(id){
    return httpService.delete(BASE_URL + id)
}

function addAttendee(activityId, attendeeId){
    return httpService.post(BASE_URL + `${activityId}/attendees/${attendeeId}`)
}

function removeAttendee(activityId, attendeeId){
    return httpService.delete(BASE_URL + `${activityId}/attendees/${attendeeId}`)
}

export default {
    getActivities,
    getActivity,
    addActivity,
    removeActivity,
    addAttendee,
    removeAttendee
}