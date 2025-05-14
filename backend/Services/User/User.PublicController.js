import DoctorRepository from '../Doctor/Doctor.Repository.js';
import UserRepository from '../User/User.Repository.js';
import FeedbackRatingRepository from '../FeedbackRating/FeedbackRating.Repository.js';

export default class PublicController {
    constructor() {
        this.doctorRepo = new DoctorRepository();
        this.userRepo = new UserRepository();
        this.feedbackRepo = new FeedbackRatingRepository();
    }

    // @desc    Get public info for all doctors
    // @route   GET /api/public/doctors
    // @access  PUBLIC
    async getAllDoctorsPublicInfo(req, res) {
        try{
            const { search = '', page = 1, limit = 30 } = req.query;
            const pageNum = Number(page) || 1;
            const limitNum = Number(limit) || 30;
            const skip = (pageNum - 1) * limitNum;
        
            // Search by doctor name (case-insensitive)
            let doctorQuery = {};
            if (search) {
                // Get userIds of users matching the name
                const users = await this.userRepo.findUsersByName(search);
                const userIds = users.map(u => u._id);
                doctorQuery.userId = { $in: userIds };
            }
            
            const total = await this.doctorRepo.countDoctors(doctorQuery);
            const doctors = await this.doctorRepo.getDoctorsPaginated(doctorQuery, skip, limitNum);
            
            if (!doctors || doctors.length === 0) {
                return res.status(404).json({ message: 'No doctors found' });
            }
            const userIds = doctors.map(doc => doc.userId);
            const users = await this.userRepo.findUsersByIds(userIds);
            const userIdToName = {};
            users.forEach(u => { userIdToName[u._id.toString()] = u.name; });
            
            const ratings = {};
            await Promise.all(doctors.map(async (doc) => {
                ratings[doc.userId] = await this.feedbackRepo.getDoctorRating(doc.userId);
            }));

            // Public data array
            const publicDoctors = doctors.map(doc => ({
                userId: doc.userId,
                name: userIdToName[doc.userId.toString()] || "",
                specialty: doc.specialty,
                degrees: (doc.qualifications || []).map(q => q.degree),
                consultationFee: doc.consultationFee,
                rating: ratings[doc.userId],
                availableSchedule: (doc.schedule || []).filter(s => s.isAvailable).map(s => ({
                    dayOfWeek: s.dayOfWeek,
                    startTime: s.startTime,
                    endTime: s.endTime
                }))
            }));
        
            return res.status(200).json({
                doctors: publicDoctors,
                page: pageNum,
                pages: Math.ceil(total / limitNum),
                total
            });
        }catch(err){
            return res.status(400).json({ message: err.message });
        }
    }
}



