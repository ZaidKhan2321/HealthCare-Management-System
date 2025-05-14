import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPatientProfile } from '../Redux/actions/Patient.js'
import { useNavigate } from 'react-router-dom'
import DateOfBirthPicker from './DateOfBirthPicker.jsx'
import './CSS/PatientProfile.css'

const CreatePatientProfile = () => {
  const dispatch = useDispatch()
  const { loading, profile, error } = useSelector((state) => state.patientCreate)
  const [formData, setFormData] = useState({
    personalInfo: {},
    demographics: {}
  })

  const navigate = useNavigate()
  useEffect(() => {
    if (profile) navigate('/')
  }, [profile, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createPatientProfile(formData))
  }

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }


  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <h2>Complete Your Profile</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Personal Info Section */}
        <div className="card section-card">
          <div className="card-header">Personal Information</div>
          <div className="card-body">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.firstName || ''}
                onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.lastName || ''}
                onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                value={formData.personalInfo.gender || ''}
                onChange={(e) => handleChange('personalInfo', 'gender', e.target.value)}
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
                value={formData.personalInfo.dateOfBirth || ''}
                onChange={val => handleChange("personalInfo", "dateOfBirth", val)}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.contactNumber || ''}
                onChange={(e) => handleChange('personalInfo', 'contactNumber', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.address || ''}
                onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Demographics Section */}
        <div className="card section-card">
          <div className="card-header">Demographics</div>
          <div className="card-body">
            <div className="form-group">
              <label>Marital Status</label>
              <select
                className="form-control"
                value={formData.demographics.maritalStatus || ''}
                onChange={(e) => handleChange('demographics', 'maritalStatus', e.target.value)}
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                className="form-control"
                value={formData.demographics.occupation || ''}
                onChange={(e) => handleChange('demographics', 'occupation', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Ethnicity</label>
              <input
                type="text"
                className="form-control"
                value={formData.demographics.ethnicity || ''}
                onChange={(e) => handleChange('demographics', 'ethnicity', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-block">
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default CreatePatientProfile
