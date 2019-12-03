
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    getActivity,
    addAttendee,
    deleteAttendee,
    add
}

async function getActivity(id) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('activity')
    const activity = await collection.find({ '_id': ObjectId(id) }).toArray();
    return activity[0];
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('activity')
    const items = await collection.find(filterBy).toArray();

    return items;

    try {
        // const activities = await collection.find(criteria).toArray();
        var activities = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'aboutUserId',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()
        console.log('GET ACTIVITIES:', collection.find());

        activities = activities.map(activity => {
            activity.byUser = { _id: activity.byUser._id, username: activity.byUser.username }
            activity.aboutUser = { _id: activity.aboutUser._id, username: activity.aboutUser.username }
            delete activity.byUserId;
            delete activity.aboutUserId;

            return activity;
        })

        return activities
    } catch (err) {
        console.log('ERROR: cannot find activities')
        throw err;
    }
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

async function add(activity) {
    activity.createdBy._id = ObjectId(activity.createdBy._id);
    const collection = await dbService.getCollection('activity')
    try {
        await collection.insertOne(activity);
        return activity;
    } catch (err) {
        console.log(`ERROR: cannot insert activity, ${err}`)
        throw err;
    }
}

async function addAttendee(activity, attendee) {
    activity = await getActivity(activity._id);
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

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}


