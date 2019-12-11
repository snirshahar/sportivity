
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    getActivity,
    addAttendee,
    deleteAttendee,
    add,
    addMsg
}

async function getActivity(id) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('activity')
    const activity = await collection.find({ '_id': ObjectId(id) }).toArray();
    return activity[0];
}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('activity')
    const items = await collection.find(filterBy).toArray();
    return items;
}

async function remove(activityId) {
    const collection = await dbService.getCollection('activity')
    try {
        await collection.deleteOne({ "_id": ObjectId(activityId) })
    } catch (err) {
        console.log(`ERROR: cannot remove activity ${activityId}`)
        throw err;
    }
}

async function add(activity, owner) {
    activity.createdBy = owner;
    activity.createdBy._id = ObjectId(activity.createdBy._id);
    activity.createdAt = Date.now();
    activity.msgs = [];
    activity.attendees = [];
    const collection = await dbService.getCollection('activity')
    try {
        await collection.insertOne(activity, async (err, doc) => 
        await addAttendee(doc.ops[0]._id, owner));
        return activity;
    } catch (err) {
        console.log(`ERROR: cannot insert activity, ${err}`)
        throw err;
    }
}

async function addAttendee(activityId, attendee) {
    console.log(activityId, attendee)
    attendee._id = ObjectId(attendee._id);
    let activity = await getActivity(activityId);

    console.log('ATTTTTTTTTTT', activity.attendees);
    if (activity.attendees.length === activity.maxAttendees) return 'The activity is full'; // Add a message
    const collection = await dbService.getCollection('activity');
    collection.findOneAndUpdate(
        { '_id': ObjectId(activity._id) },
        { $push: { "attendees": attendee } },
        { new: true },
        (err, doc) => {
            return err ? 'An error has occured' : `${attendee.fullName} has been added to ${activity.title}`
        }
    ) 
}

async function deleteAttendee(activity, attendeeId) {
    // activity = await getActivity(activity._id);
    const currAttendees = activity.attendees.filter(att => att._id !== attendeeId);
    currAttendees.forEach(att => att._id = ObjectId(att._id))
    const collection = await dbService.getCollection('activity');
    collection.findOneAndUpdate(
        { '_id': ObjectId(activity._id) },
        { $set: { "attendees": currAttendees } },
        { new: true },
        (err, doc) => {
            return err ? 'An error has occured' : `Member has been removed from ${activity.title}`
        }
    )
    
}

async function addMsg(activityId, msg) {
    msg.sentAt = Date.now()
    const collection = await dbService.getCollection('activity');
    collection.findOneAndUpdate(
        { '_id': ObjectId(activityId) },
        { $push: { "msgs": msg } },
        // (err, doc) => {
            // console.log(doc.value.msgs);
        // }
    )
    return msg;
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}