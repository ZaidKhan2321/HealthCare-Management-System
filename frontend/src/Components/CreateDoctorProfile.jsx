import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDoctorProfile } from '../Redux/actions/Doctor.js';
import { useNavigate } from 'react-router-dom';
import DateOfBirthPicker from './DateOfBirthPicker.jsx'

const CreateDoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, profile, error, success } = useSelector(state => state.doctorProfileCreate);

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      contactNumber: "",
      address: ""
    },
    specialty: ""
  });

  useEffect(() => {
      if (profile) navigate('/')
    }, [profile, navigate])

  const handlePersonalInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDoctorProfile(formData));
  };

  return (
    <div className="container mt-4">
      <h2>Create Doctor Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">Personal Information</div>
          <div className="card-body">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.firstName}
                onChange={e => handlePersonalInfoChange('firstName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.lastName}
                onChange={e => handlePersonalInfoChange('lastName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={formData.personalInfo.gender}
                onChange={e => handlePersonalInfoChange('gender', e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <DateOfBirthPicker
                value={formData.personalInfo.dateOfBirth}
                onChange={val => handlePersonalInfoChange('dateOfBirth', val)}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.contactNumber}
                onChange={e => handlePersonalInfoChange('contactNumber', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.address}
                onChange={e => handlePersonalInfoChange('address', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-header">Specialty</div>
          <div className="card-body">
            <div className="form-group">
              <label>Specialty</label>
              <input
                type="text"
                className="form-control"
                value={formData.specialty}
                onChange={e => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {loading ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateDoctorProfile;
