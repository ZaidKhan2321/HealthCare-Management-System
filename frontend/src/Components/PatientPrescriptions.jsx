import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientPrescriptions } from '../Redux/actions/Prescription.js';

const sortByDate = (arr, asc = true) =>
  [...arr].sort((a, b) =>
    asc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

const PatientPrescriptions = () => {
  const dispatch = useDispatch();
  const { prescriptions, loading, error } = useSelector(state => state.patientPrescriptions);

  const [sortAsc, setSortAsc] = useState(false);
  const [sortedPrescriptions, setSortedPrescriptions] = useState([]);

  useEffect(() => {
    dispatch(getPatientPrescriptions());
  }, [dispatch]);

  useEffect(() => {
    setSortedPrescriptions(sortByDate(prescriptions, sortAsc));
  }, [prescriptions, sortAsc]);

  const handleSort = () => setSortAsc(prev => !prev);

  return (
    <div className="container py-4">
      <h2>My Prescriptions</h2>
      <button className="btn btn-outline-primary mb-3" onClick={handleSort}>
        Sort by Date {sortAsc ? '↑' : '↓'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {sortedPrescriptions.length === 0 && !loading && <div>No prescriptions found.</div>}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {sortedPrescriptions.map((presc, idx) => (
          <div className="col" key={presc._id || idx}>
            <div className="card mb-3 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>
                  <strong>Doctor:</strong> {presc.doctorName}
                </span>
                <span>
                  <strong>Date:</strong> {new Date(presc.date).toLocaleDateString()}
                </span>
              </div>
              <div className="card-body">
                <h6>Medications:</h6>
                <ul>
                  {presc.medications.map((med, i) => (
                    <li key={i}>
                      <strong>{med.name}</strong> – {med.dosage}, {med.frequency}, {med.duration}
                      {med.instructions && <span> ({med.instructions})</span>}
                    </li>
                  ))}
                </ul>
                {presc.notes && (
                  <div>
                    <strong>Notes:</strong> {presc.notes}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .card { border-radius: 8px; }
        .card-header { background: #f7f7f7; }
      `}</style>
    </div>
  );
};

export default PatientPrescriptions;
