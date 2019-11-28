const activityService = require('../services/activity.service')

module.exports = (app) => {
    // LIST
    app.get('/api/activity', (req, res) => {
        // const filterBy = {
        //     q: req.query.q,
        //     creatorId: req.query.creatorId
        // }
        
        activityService.query()
            .then(activitiess => res.json(activitiess))
            .catch(err => {
                console.log('ERR', err);
                res.status(500).json({err: 'Internal Error, try again later'});
            })
    });

    // SINGLE
    app.get('/api/activity/:activityId', (req, res) => {
        const activityId = req.params.activityId;
        activityService.getById(activityId)
            .then(activity => res.json(activity))
            .catch(err => {
                console.log('ERR', err);
                res.status(500).json({err: 'Internal Error, try again later'});
            })
    });

    // DELETE
    app.delete('/api/activity/:activityId', (req, res) => {
        // if (!req.session.user) return res.status(401).json({err: 'Please Login'});
        const user = req.session.user;
        const activityId = req.params.activityId;
        activityService.remove(activityId, user)
            .then(() => res.end())
            .catch(err => {
                console.log('ERR', err);
                res.status(500).json({err: 'Internal Error, try again later'});
            })
    });

    // CREATE
    app.post('/api/activity', (req, res) => {
        // if (!req.session.user) return res.status(401).json({err: 'Please Login'});
        const activity = req.body;
        activity.creator = req.session.user;
        activityService.add(activity)
            .then(addedactivity => res.json(addedactivity))
            .catch(err => {
                console.log('ERR', err);
                res.status(500).json({err: 'Internal Error, try again later'});
            })
    });

    // UPDATE
    app.put('/api/activity/:activityId', (req, res) => {
        // if (!req.session.user) return res.status(401).json({err: 'Please Login'});
        const activity = req.body;
        const user = req.session.user;
        
        activityService.update(activity, user)
            .then(updatedActivity => res.json(updatedActivity))
            .catch(err => {
                console.log('ERR', err);
                res.status(500).json({err: 'Internal Error, try again later'});
            })
    })

    app.post('/api/activity/:activityId/attendees/:userId', (req, res) => {
        const userId = req.params.userId;
        const activityId = req.params.activityId;
        activityService.addAttendee(activityId, userId)
            .then(updatedActivity => res.json(updatedActivity))
            .catch(err => {
                console.log('err', err);
                res.status(500).json({err: 'Internet Error'})
            })

    })

    app.delete('/api/activity/:activityId/attendees/:userId', (req, res) => {
        const userId = req.params.userId;
        const activityId = req.params.activityId;
        console.log(req.params);
        activityService.removeAttendee(activityId, userId)
            .then(updatedActivity => res.json(updatedActivity))
            .catch(err => {
                console.log('err', err);
                res.status(500).json({err: 'Internet Error'})
            })

    })
}