
const dbService = require('../../services/db.service')
const activityService = require('../activity/activity.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add,
    addToWishlist,
    removeFromWishlist
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function removeFromWishlist(userId, activityId){
    const collection = await dbService.getCollection('user');
    collection.findOneAndUpdate(
        { '_id': ObjectId(userId) },
        { $push: { "wishlist": ObjectId(activityId) } },
        { new: true },
        (err, doc) => {
            console.log(doc);
            return err ? 'An error has occured' : `${activityId} has been added to ${userId} wishlist`
        }
    )
}

async function addToWishlist(userId, activityId){
    console.log(userId, activityId);
    const collection = await dbService.getCollection('user');
    collection.findOneAndUpdate(
        { '_id': ObjectId(userId) },
        { $push: { "wishlist": ObjectId(activityId) } },
        { new: true },
        (err, doc) => {
            console.log(doc);
            return err ? 'An error has occured' : `${activityId} has been added to ${userId} wishlist`
        }
    )
}

async function getById(userId) {
    if (!userId) return null;
    const collection = await dbService.getCollection('user')
    try {
        user = await collection.aggregate([
            {
                $match: {"_id": ObjectId(userId)}
            },
            {
                $lookup: {
                    from: "activity",
                    let: { user_id: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $in: ["$$user_id", "$attendees._id"] } } }
                    ],
                    as: "activities"
                }
            }
        ]).toArray();
        delete user[0].password
        delete user[0].inbox
        delete user[0].isAdmin
        return user[0]
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    user.isAdmin = false;
    user.inbox = [];
    if (!user.imgUrl) user.imgUrl = "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png";
    user.wishlist = [];
    user.createdAt = Date.now();
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user)
        delete user.password;
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: +filterBy.minBalance }
    }
    return criteria;
}


