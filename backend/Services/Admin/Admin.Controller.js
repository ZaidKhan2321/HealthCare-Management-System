import AdminRepository from './Admin.Repository.js';

export default class AdminController {
    constructor() {
        this.adminRepo = new AdminRepository();
    }

    // User Management
    async getAllUsers(req, res) {
        try {
            const users = await this.adminRepo.findAllUsers();
            return res.status(200).json(users.map(user => ({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                isApproved: user.isApproved
            })));
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async approveUser(req, res) {
        try {
            const user = await this.adminRepo.approveUser(req.params.userId);
            await this.adminRepo.createAuditLog({
                action: 'USER_MODIFIED',
                targetUserId: user._id,
                performedBy: req.user._id,
                details: { field: 'approval', newValue: true }
            });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Role Management
    async updateUserRole(req, res) {
        try {
            const { userId } = req.params;
            const { newRole } = req.body;
            
            if (userId.toString() === req.user._id.toString()) {
                return res.status(400).json({ message: "Cannot modify own role" });
            }

            const user = await this.adminRepo.updateUserRole(userId, newRole);
            await this.adminRepo.createAuditLog({
                action: 'ROLE_CHANGED',
                targetUserId: user._id,
                performedBy: req.user._id,
                details: { previousRole: user.role, newRole }
            });
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // Dashboard
    async getSystemStats(req, res) {
        try {
            const stats = await this.adminRepo.getSystemStats();
            return res.status(200).json(stats);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
