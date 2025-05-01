export const sendAppointmentNotification = async (appointment) => {
    try {
        console.log(`Sending notification for appointment ${appointment._id}`);
        console.log(`Patient: ${appointment.patientId.name}, Doctor: ${appointment.doctorId.name}`);
        console.log(`Date: ${appointment.date}, Time: ${appointment.startTime}`);
        console.log(`Status: ${appointment.status}`);
        
        //Indicating successful notification
        return true;
    } catch (error) {
        console.error(`Failed to send notification: ${error.message}`);
        return false;
    }
};
