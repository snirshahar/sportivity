import HttpService from './HttpService.js';

const BASE_URL = 'activity/'

function getActivities(){
    return HttpService.get(BASE_URL)
}

function getActivity(id){
    console.log(id);
    return HttpService.get(BASE_URL + id)
}

function addActivity(activity){
    if(!activity.id){ // Needs to be removed when backend is alive
        activity.id = Math.floor(Math.random() * 1000 + 5000);
        return HttpService.post(BASE_URL, activity).then(res => res.data);
    }
    return HttpService.put(BASE_URL + activity.id, activity).then(res => res.data);
}

function removeActivity(id){
    return HttpService.delete(BASE_URL + id)
}

function addAttendee(activityId, attendeeId){
    return HttpService.post(BASE_URL + `${activityId}/attendees/${attendeeId}`)
}

function removeAttendee(activityId, attendeeId){
    return HttpService.delete(BASE_URL + `${activityId}/attendees/${attendeeId}`)
}

export default {
    getActivities,
    getActivity,
    addActivity,
    removeActivity,
    addAttendee,
    removeAttendee
}