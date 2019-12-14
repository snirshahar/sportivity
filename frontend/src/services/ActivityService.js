import HttpService from './HttpService.js';

const BASE_URL = 'activity/'

function getActivities() {
    return HttpService.get(BASE_URL)
}

function getActivity(id) {
    return HttpService.get(BASE_URL + id)
}

function addActivity(activity) {
    if (!activity._id) { // Needs to be removed when backend is alive
        return HttpService.post(BASE_URL, activity);
    }
    return HttpService.put(BASE_URL + activity._id, activity);
}

function removeActivity(id) {
    return HttpService.delete(BASE_URL + id)
}

function addAttendee(activity, attendee) {
    return HttpService.put(BASE_URL + `${activity._id}/attendee/${attendee._id}`, { activity, attendee });
}

function deleteAttendee(activityId, attendeeId){
    return HttpService.delete(BASE_URL + `${activityId}/attendee/${attendeeId}`, { activityId, attendeeId });
}
export default {
    getActivities,
    getActivity,
    addActivity,
    removeActivity,
    addAttendee,
    deleteAttendee
}