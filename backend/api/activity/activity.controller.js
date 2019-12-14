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
    activity = await activityService.add(activity, owner)
    res.send(activity)
}

async function addAttendee(req, res) {
    const { attendee, activity } = req.body;
    const response = await activityService.addAttendee(activity._id, attendee);
    res.send(response)
}

async function deleteAttendee(req, res) {
    const { attendeeId, activityId } = req.body;
    res.send(await activityService.deleteAttendee(activityId, attendeeId))
}

module.exports = {
    getActivities,
    getActivity,
    deleteActivity,
    addActivity,
    addAttendee,
    deleteAttendee
}