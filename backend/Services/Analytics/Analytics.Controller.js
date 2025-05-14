import AnalyticsRepository from './Analytics.Repository.js';

export default class AnalyticsController {
    constructor() {
        this.repo = new AnalyticsRepository();
    }

    // User statistics
    async getUserStats(req, res) {
        try {
            const stats = await this.repo.getUserStats();
            await this.repo.logReport(req.user._id, 'user-stats', {});
            return res.status(200).json(stats);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Appointment statistics
    async getAppointmentStats(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const stats = await this.repo.getAppointmentStats(startDate, endDate);
            await this.repo.logReport(req.user._id, 'appointment-stats', { startDate, endDate });
            return res.status(200).json(stats);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Revenue statistics
    async getRevenueStats(req, res) {
        try {
            const { startDate, endDate } = req.query;
            const stats = await this.repo.getRevenueStats(startDate, endDate);
            await this.repo.logReport(req.user._id, 'revenue-stats', { startDate, endDate });
            return res.status(200).json(stats);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Recent analytics logs
    async getRecentLogs(req, res) {
        try {
            const logs = await this.repo.getRecentLogs();
            return res.status(200).json(logs);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
