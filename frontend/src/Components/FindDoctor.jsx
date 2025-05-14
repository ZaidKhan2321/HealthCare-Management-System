import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDoctors } from '../Redux/actions/DoctorPublic.js';
import { FaStar } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  // Check availability for today
  const now = new Date();
  const today = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toTimeString().slice(0,5); // "HH:MM"
  const availableSlot = doctor.availableSchedule.find(
    s =>
      s.dayOfWeek === today &&
      (!s.startTime || !s.endTime ||
        (currentTime >= s.startTime && currentTime <= s.endTime))
  );
  const isAvailable = !!availableSlot;

  // Star rating rendering
  const stars = [];
  const rating = Number(doctor.rating) || 0;
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        color={i <= Math.round(rating) ? "#F2C265" : "#a9a9a9"}
        size={18}
      />
    );
  }

  return (
    <div className="card doctor-card m-2" style={{ minWidth: 280, flex: 1 }}>
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>
        <div><strong>Specialty:</strong> {doctor.specialty}</div>
        <div><strong>Degrees:</strong> {doctor.degrees.join(', ')}</div>
        <div><strong>Fee:</strong> ₹{doctor.consultationFee}</div>
        <div className="d-flex align-items-center mt-2">
          {stars}
          <span className="ms-2">{doctor.rating ? doctor.rating.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
      <div
        className={`card-footer text-white text-center fw-bold ${isAvailable ? 'bg-success' : 'bg-danger'}`}
        style={{ borderRadius: '0 0 6px 6px' }}
      >
        {isAvailable ? 'Available Now' : 'Not Available Now'}
      </div>
    </div>
  );
};

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const FindDoctor = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error, page, pages, total } = useSelector(state => state.doctorPublicList);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(listDoctors(debouncedSearch, currentPage, 30));
  }, [dispatch, debouncedSearch, currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container py-4">
      <h2>Find a Doctor</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by doctor name..."
          value={search}
          onChange={handleSearch}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {doctors.map((doc, idx) => (
          <div className="col" key={doc.userId || idx}>
            <DoctorCard doctor={doc} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <nav>
          <ul className="pagination">
            {[...Array(pages).keys()].map(x => (
              <li key={x + 1} className={`page-item${x + 1 === page ? ' active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(x + 1)}>
                  {x + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <style>{`
        .doctor-card { box-shadow: 0 2px 8px rgba(0,0,0,0.07); border-radius: 8px; }
        .doctor-card .card-footer { font-size: 1.1rem; }
      `}</style>
    </div>
  );
};

export default FindDoctor;
