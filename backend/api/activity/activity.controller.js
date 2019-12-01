const activityService = require('./activity.service')

async function getActivities(req, res) {
    const activities = await activityService.query(req.query)
    res.send(activities)
}

async function getActivity(req, res){
    const activity = await activityService.getActivity(req.params.id)
    res.send(activity)
}

async function deleteActivity(req, res) {
    await activityService.remove(req.params._id)
    res.end()
}

async function addActivity(req, res) {
    var activity = req.body;
    activity.createdAt = Date.now();
    activity.msgs = [];
    activity.createdBy = { _id: req.session.user._id, fullName: req.session.user.fullName, imgUrl: req.session.user.imgUrl };
    activity = await activityService.add(activity)
    res.send(activity)
}

async function addAttendee(req, res) {

}

async function deleteAttendee(req, res) {

}

async function getAttendees(req, res) {

}

module.exports = {
    getActivities,
    getActivity,
    deleteActivity,
    addActivity,
    addAttendee,
    deleteAttendee,
    getAttendees
}