const job = require('../models/job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async(req, res)=> {
    const allJobs = await job.find({createdBy: req.user.userId}).sort('-createdAt');
    res.status(StatusCodes.OK).json({allJobs, Qty: allJobs.length});
};

const getJob = async (req, res)=> {
    // nested destruction syntax
    // drawing userId from req.user
    // drawing id from req.params and assigned to variable jobId
    const {
        user: {userId},
        params: {id: jobId}
    } = req ;

    const lookUpJob = await job.findOne({
        createdBy: userId,
        _id: jobId
    });

    if(!lookUpJob) {
        throw new NotFoundError("can't found this job, it's may removed or something has happened");
    }
    res.status(StatusCodes.OK).json({lookUpJob})
};

const createJob = async (req, res)=> {
    req.body.createdBy = req.user.userId;
    const newJob = await job.create({...req.body});

    res.status(StatusCodes.CREATED).json({newJob});
};

const updateJob = async (req, res)=> {
    const {
        body: {company, position},
        user: {userId},
        params: {id: jobId}
    } = req ;

    if(company === '' || position === ''){
        throw new BadRequestError('company and position fields are required !')
    };

    const patchJob = await job.findOneAndUpdate({createdBy: userId, _id: jobId}, {...req.body}, {new: true, runValidators: true});

    if(!patchJob){
        throw new NotFoundError("can't find job, something has happend. please check !")
    }
    res.status(StatusCodes.OK).json({patchJob});
};

const deleteJob = async (req, res)=> {
    const {
        params: {id: jobId},
        user: {userId}
    } = req;
    
    const removedJob =  await job.findByIdAndRemove({_id: jobId, createdBy: userId});

    res.status(StatusCodes.OK).send('successful delete Job');
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}