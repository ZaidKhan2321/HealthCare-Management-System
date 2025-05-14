import mongoose from 'mongoose';
import { doctorSchema } from './Doctor.Schema.js';

const DoctorModel = mongoose.model('Doctor', doctorSchema);

export default class DoctorRepository {
    async createDoctorProfile(data) {
        const doctor = new DoctorModel(data);
        return await doctor.save();
    }

    async getDoctorByUserId(userId) {
        return await DoctorModel.findOne({ userId });
    }

    async updateDoctorProfile(userId, updateData) {
        return await DoctorModel.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true }
        );
    }

    async updateSchedule(userId, newSchedule) {
        return await DoctorModel.findOneAndUpdate(
            { userId },
            { $set: { schedule: newSchedule } },
            { new: true }
        );
    }

    async deleteDoctorProfile(userId) {
        return await DoctorModel.findOneAndDelete({ userId });
    }

    async getAllDoctors() {
        return await DoctorModel.find({});
    }

    async countDoctors(query = {}) {
        return await DoctorModel.countDocuments(query);
    }

    async getDoctorsPaginated(query = {}, skip = 0, limit = 30) {
        return await DoctorModel.find(query).skip(skip).limit(limit);
    }

}
