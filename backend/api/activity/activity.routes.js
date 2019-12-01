const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { addActivity, getActivities, deleteActivity, getActivity, addAttendee, deleteAttendee } = require('./activity.controller');
const router = express.Router();

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getActivities);
router.get('/:id', getActivity);
router.put('/:activityId/attendee/:attendeeId', addAttendee);
router.delete('/:activityId/attendee/:attendeeId', deleteAttendee);
router.post('/', requireAuth, addActivity);
router.delete('/:id', requireAuth, deleteActivity);

module.exports = router;