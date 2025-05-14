import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorProfile, updateDoctorProfile } from '../Redux/actions/Doctor.js';

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, updating, updateSuccess, updateError } = useSelector(state => state.doctorProfile);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);

  useEffect(() => {
    dispatch(getDoctorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  useEffect(() => {
    if (updateSuccess) setEditMode(false);
  }, [updateSuccess]);

  const handleChange = (section, field, value) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleRootChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQualificationChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      qualifications: prev.qualifications.map((q, i) =>
        i === idx ? { ...q, [field]: value } : q
      ),
    }));
  };

  const handleScheduleChange = (idx, field, value) => {
    setForm(prev => ({
      ...prev,
      schedule: prev.schedule.map((s, i) =>
        i === idx ? { ...s, [field]: value } : s
      ),
    }));
  };

  const addQualification = () => {
    setForm(prev => ({
      ...prev,
      qualifications: [...(prev.qualifications || []), { degree: '', university: '', year: '' }]
    }));
  };

  const addSchedule = () => {
    setForm(prev => ({
      ...prev,
      schedule: [...(prev.schedule || []), {
        dayOfWeek: '', startTime: '', endTime: '', isAvailable: false
      }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDoctorProfile(form));
  };

  if (loading || !form) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const { personalInfo, specialty, qualifications, contact, schedule, consultationFee } = form;

  return (
    <div className="container mt-4">
      <h2>Doctor Profile</h2>
      {updateError && <div className="alert alert-danger">{updateError}</div>}
      {updateSuccess && <div className="alert alert-success">Profile updated!</div>}
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Personal Information</span>
            {!editMode && <button type="button" className="btn btn-secondary" onClick={() => setEditMode(true)}>Update</button>}
            {editMode && (
              <div>
                <button type="button" className="btn btn-outline-secondary mx-2" onClick={() => { setEditMode(false); setForm(profile); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={updating}>{updating ? 'Saving...' : 'Save Changes'}</button>
              </div>
            )}
          </div>
          <div className="card-body">
            {['firstName', 'lastName', 'gender', 'dateOfBirth', 'contactNumber', 'address'].map(field => (
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                {editMode ? (
                  field === 'gender' ? (
                    <select
                      className="form-control"
                      value={personalInfo[field] || ''}
                      onChange={e => handleChange('personalInfo', field, e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : field === 'dateOfBirth' ? (
                    <input
                      type="date"
                      className="form-control"
                      value={personalInfo.dateOfBirth ? personalInfo.dateOfBirth.slice(0, 10) : ''}
                      onChange={e => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      value={personalInfo[field] || ''}
                      onChange={e => handleChange('personalInfo', field, e.target.value)}
                    />
                  )
                ) : (
                  <div className="form-control-plaintext">{field === 'dateOfBirth' ? new Date(personalInfo.dateOfBirth).toLocaleDateString() : personalInfo[field]}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Specialty</div>
          <div className="card-body">
            {editMode ? (
              <input
                type="text"
                className="form-control"
                value={specialty || ''}
                onChange={e => handleRootChange('specialty', e.target.value)}
              />
            ) : (
              <div className="form-control-plaintext">{specialty}</div>
            )}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Qualifications</span>
            {editMode && <button type="button" className="btn btn-sm btn-success" onClick={addQualification}>Add</button>}
          </div>
          <div className="card-body">
            {(qualifications || []).map((q, idx) => (
              <div className="row mb-2" key={idx}>
                <div className="col">
                  <label>Degree</label>
                  {editMode ? <input type="text" className="form-control" value={q.degree || ''} onChange={e => handleQualificationChange(idx, 'degree', e.target.value)} /> : <div className="form-control-plaintext">{q.degree}</div>}
                </div>
                <div className="col">
                  <label>University</label>
                  {editMode ? <input type="text" className="form-control" value={q.university || ''} onChange={e => handleQualificationChange(idx, 'university', e.target.value)} /> : <div className="form-control-plaintext">{q.university}</div>}
                </div>
                <div className="col">
                  <label>Year</label>
                  {editMode ? <input type="number" className="form-control" value={q.year || ''} onChange={e => handleQualificationChange(idx, 'year', e.target.value)} /> : <div className="form-control-plaintext">{q.year}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Contact Info</div>
          <div className="card-body">
            {['phone', 'emergencyContact', 'hospitalAffiliation'].map(field => (
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                {editMode ? (
                  <input
                    type="text"
                    className="form-control"
                    value={contact?.[field] || ''}
                    onChange={e => setForm(prev => ({
                      ...prev,
                      contact: { ...prev.contact, [field]: e.target.value }
                    }))}
                  />
                ) : (
                  <div className="form-control-plaintext">{contact?.[field]}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Schedule</span>
            {editMode && <button type="button" className="btn btn-sm btn-success" onClick={addSchedule}>Add</button>}
          </div>
          <div className="card-body">
            {(schedule || []).map((s, idx) => (
              <div className="row mb-2" key={idx}>
                <div className="col">
                  <label>Day</label>
                  {editMode ? (
                    <select className="form-control" value={s.dayOfWeek || ''} onChange={e => handleScheduleChange(idx, 'dayOfWeek', e.target.value)}>
                      <option value="">Select</option>
                      {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => <option key={day} value={day}>{day}</option>)}
                    </select>
                  ) : <div className="form-control-plaintext">{s.dayOfWeek}</div>}
                </div>
                <div className="col">
                  <label>Start Time</label>
                  {editMode ? <input type="time" className="form-control" value={s.startTime || ''} onChange={e => handleScheduleChange(idx, 'startTime', e.target.value)} /> : <div className="form-control-plaintext">{s.startTime}</div>}
                </div>
                <div className="col">
                  <label>End Time</label>
                  {editMode ? <input type="time" className="form-control" value={s.endTime || ''} onChange={e => handleScheduleChange(idx, 'endTime', e.target.value)} /> : <div className="form-control-plaintext">{s.endTime}</div>}
                </div>
                <div className="col">
                  <label>Available</label>
                  {editMode ? (
                    <select className="form-control" value={s.isAvailable ? 'yes' : 'no'} onChange={e => handleScheduleChange(idx, 'isAvailable', e.target.value === 'yes')}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  ) : <div className="form-control-plaintext">{s.isAvailable ? 'Yes' : 'No'}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">Consultation Fee</div>
          <div className="card-body">
            {editMode ? (
              <input
                type="number"
                className="form-control"
                value={consultationFee || ''}
                onChange={e => handleRootChange('consultationFee', e.target.value)}
              />
            ) : (
              <div className="form-control-plaintext">{consultationFee}</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
