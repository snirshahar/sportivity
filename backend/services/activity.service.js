const fs = require('fs');
const utilService = require('./util.service');

module.exports = {
    query,
    add,
    getById,
    remove,
    update,
    addAttendee,
    removeAttendee
}

var activities = _createActivities();
const users = require('../data/user.json');


function query(filterBy = {}) {
    var filteredActivities = activities;
    // TODO: support case isensitive


    if (filterBy.creatorId) filteredActivities = activities.filter(activity => activity.creator.id === filterBy.creatorId)
    if (filterBy.q) {
        var regex = new RegExp(`${filterBy.q}`, 'i');
        filteredActivities = filteredActivities.filter(activity => regex.test(activity.title) ||
            regex.test(activity.description))
    }


    return Promise.resolve(activities);
}

function add(activity) {
    activity.id = utilService.makeId();
    activities.unshift(activity);
    _saveActivitiesToFile();
    return Promise.resolve(activity);
}

function getById(id) {
    var activity = activities.find(activity => activity.id === id);
    if (activity) return Promise.resolve(activity);
    return Promise.reject('Unknown activity');
}

function remove(id, user) {
    var activityIdx = activities.findIndex(activity => activity.id === id);
    var curractivity = activities[activityIdx];
    if (!user.isAdmin && curractivity.creator.id !== user.id) {
        return Promise.reject('No permission')
    }
    activities.splice(activityIdx, 1);
    _saveActivitiesToFile();
    return Promise.resolve();
}

function update(activity, user) {
    var activityIdx = activities.findIndex(curractivity => curractivity.id === activity.id);
    var curractivity = activities[activityIdx];
    if (!user.isAdmin && curractivity.creator.id !== user.id) {
        return Promise.reject('No permission')
    }
    activities.splice(activityIdx, 1, activity);
    _saveActivitiesToFile();
    return Promise.resolve(activity);
}

function addAttendee(activityId, userId) {
    const user = users.find(user => user.id === userId);
    const activity = activities.find(activity => activity.id === activityId);
    const { id, fullName, imgUrl } = user;
    activity.attendees.push({ id, fullName, imgUrl });
    return Promise.resolve(activity);
}

function removeAttendee(activityId, userId){
    const activity = activities.find(activity => activity.id === activityId);
    activity.attendees = activity.attendees.filter(attendee => attendee.id !== userId)
    return Promise.resolve(activity);
}

function _createActivities() {
    var activities = require('../data/activity.json')
    if (activities && activities.length) return activities;
    return [];
    // return ['Cannot edit todo', 'Cannot touch the nums'].map(_createactivity)
}

// function _createactivity(title) {
//     return {
//         id: utilService.makeId(),
//         title
//     }
// }

function _saveActivitiesToFile() {
    fs.writeFileSync('data/activity.json', JSON.stringify(activities, null, 2));
}


