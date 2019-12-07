const activityService = require('./activity.service')

async function getActivities(req, res) {
    const activities = await activityService.query(req.query)
    res.send(activities)
}

async function getActivity(req, res) {
    const activity = await activityService.getActivity(req.params.id)
    res.send(activity)
}

async function deleteActivity(req, res) {
    await activityService.remove(req.params._id)
    res.end()
}

async function addActivity(req, res) {
    var activity = req.body;
    const owner = { _id: req.session.user._id, fullName: req.session.user.fullName, imgUrl: req.session.user.imgUrl };
    if (!activity.imgUrls || !activity.imgUrls.length) {
        activity.imgUrls = ['https://www.subaruhawaii.com/sites/default/files/styles/subaru_step2_accessory/public/model/model_management/1422065168_54c2fe103503d.jpg?itok=f7LACBG8']
    }

    activity.createdAt = Date.now();
    activity.msgs = [];
    activity.createdBy = owner;
    activity.attendees = [owner];
    activity = await activityService.add(activity)
    res.send(activity)
}

async function addAttendee(req, res) {
    const { attendee, activity } = req.body;
    const response = await activityService.addAttendee(activity, attendee);
    res.send(response)
}

async function deleteAttendee(req, res) {
    const { attendeeId, activity } = req.body;
    res.send(await activityService.deleteAttendee(activity, attendeeId))
}

module.exports = {
    getActivities,
    getActivity,
    deleteActivity,
    addActivity,
    addAttendee,
    deleteAttendee
}