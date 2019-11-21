const express = require('express');
const router = express.Router();

const secured = require('../utils/secured');

const controller = require('./projectInvitesController');

// For testing purposes
router.get('/all', controller.getAllInvites);

router.post('/create', secured, controller.createProjectInvite);
router.get('/', secured, controller.getInvitesByUser);
router.get('/:id', secured, controller.getInvitesByProjectId);
router.put('/accept/:id', secured, controller.acceptInviteById);
router.put('/:id', secured, controller.updateInviteById);


module.exports = router;
