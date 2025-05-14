import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientProfile, updatePatientProfile } from '../Redux/actions/Patient';
import './CSS/PatientProfile.css';

const PatientProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.patientProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Date formatting utilities
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
  };

  const parseDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    dispatch(getPatientProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        personalInfo: {
          ...profile.personalInfo,
          dateOfBirth: parseDateForInput(profile.personalInfo?.dateOfBirth)
        },
        demographics: profile.demographics || {},
        medicalHistory: profile.medicalHistory || {},
        ehr: profile.ehr || {}
      });
    }
  }, [profile]);

  const handleEditClick = () => setIsEditMode(true);
  const handleCancel = () => setIsEditMode(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        dateOfBirth: new Date(formData.personalInfo.dateOfBirth).toISOString()
      }
    };
    dispatch(updatePatientProfile(dataToSend));
    setIsEditMode(false);
  };

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const ReadOnlyField = ({ label, value, isDate = false }) => (
    <div className="read-only-field">
      <label>{label}</label>
      <div className="value">
        {isDate ? formatDate(value) : value || 'N/A'}
      </div>
    </div>
  );

  const EditField = ({ label, name, section, value, type = 'text', options }) => {
    if (type === 'select') {
      return (
        <div className="form-group">
          <label>{label}</label>
          <select
            className="form-control"
            value={value || ''}
            onChange={(e) => handleChange(section, name, e.target.value)}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          className="form-control"
          value={value || ''}
          onChange={(e) => handleChange(section, name, e.target.value)}
        />
      </div>
    );
  };

  const renderSection = (section, fields) => {
    return Object.entries(fields).map(([key, config]) => {
      if (isEditMode) {
        return (
          <EditField
            key={key}
            label={config.label}
            name={key}
            section={section}
            value={formData[section]?.[key]}
            type={config.type}
            options={config.options}
          />
        );
      }
      return (
        <ReadOnlyField
          key={key}
          label={config.label}
          value={formData[section]?.[key]}
          isDate={config.isDate}
        />
      );
    });
  };

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <h2>Patient Profile</h2>
        {!isEditMode && (
          <button className="btn btn-primary" onClick={handleEditClick}>
            Update Profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="card section-card">
          <div className="card-header">Personal Information</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderSection('personalInfo', {
                  firstName: { label: 'First Name' },
                  lastName: { label: 'Last Name' },
                  dateOfBirth: { 
                    label: 'Date of Birth', 
                    type: 'date',
                    isDate: true
                  },
                  gender: {
                    label: 'Gender',
                    type: 'select',
                    options: [
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' }
                    ]
                  },
                  contactNumber: { label: 'Contact Number' },
                  address: { label: 'Address' }
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Demographics Section */}
        <div className="card section-card">
          <div className="card-header">Demographics</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                {renderSection('demographics', {
                  maritalStatus: { 
                    label: 'Marital Status',
                    type: 'select',
                    options: [
                      { value: 'single', label: 'Single' },
                      { value: 'married', label: 'Married' },
                      { value: 'divorced', label: 'Divorced' }
                    ]
                  },
                  occupation: { label: 'Occupation' },
                  ethnicity: { label: 'Ethnicity' }
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Medical History (Read-only) */}
        <div className="card section-card">
          <div className="card-header">Medical History</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ReadOnlyField label="Allergies" value={formData.medicalHistory?.allergies?.join(', ')} />
                <ReadOnlyField label="Chronic Conditions" value={formData.medicalHistory?.chronicConditions?.join(', ')} />
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Information (Read-only) */}
        <div className="card section-card">
          <div className="card-header">Insurance Information</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ReadOnlyField label="Provider" value={profile?.insurance?.provider} />
                <ReadOnlyField label="Policy Number" value={profile?.insurance?.policyNumber} />
                <ReadOnlyField label="Valid Till" value={formatDate(profile?.insurance?.validTill)} isDate />
              </div>
            </div>
          </div>
        </div>

        {/* EHR (Read-only) */}
        <div className="card section-card">
          <div className="card-header">Medical Records</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <ReadOnlyField label="Last Diagnosis" value={formData.ehr?.diagnoses?.join(', ')} />
                <ReadOnlyField label="Last Prescription" value={formData.ehr?.prescriptions?.map(p => p.medication).join(', ')} />
              </div>
            </div>
          </div>
        </div>

        {isEditMode && (
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PatientProfile;
