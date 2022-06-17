const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/job');

const express = require('express');
const router = express.Router();

router.route('/')
.get(getAllJobs)
.post(createJob)

router.route('/:id')
.get(getJob)
.patch(updateJob)
.delete(deleteJob)

module.exports = router

//alternatives
// router.get('/jobs', getAllJobs);
// router.get('/jobs/:id', getJob);
// router.post('/jobs/new', createJob);
// router.patch('/jobs/:id', updateJob);
// router.delete('/jobs/:id', deleteJob);