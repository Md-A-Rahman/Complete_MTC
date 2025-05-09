import React, { useState, useEffect } from 'react';

const initialState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  qualifications: '',
  assignedCenter: '',
  subjects: [],
  sessionType: '',
  sessionTiming: '',
  assignedHadiyaAmount: '',
  bankName: '',
  accountNumber: '',
  bankBranch: '',
  ifscCode: '',
};

const sessionTypes = [
  { value: 'arabic', label: 'Arabic' },
  { value: 'tuition', label: 'Tuition' },
];
const sessionTimings = [
  { value: 'after_fajr', label: 'After Fajr' },
  { value: 'after_zohar', label: 'After Zohar' },
  { value: 'after_asar', label: 'After Asar' },
  { value: 'after_maghrib', label: 'After Maghrib' },
  { value: 'after_isha', label: 'After Isha' },
];
// Centers will be fetched from backend API

const subjectsList = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Science', label: 'Science' },
  { value: 'English', label: 'English' },
  { value: 'Social Studies', label: 'Social Studies' },
  { value: 'Islamic Studies', label: 'Islamic Studies' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Hindi', label: 'Hindi' },
];

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  fontSize: 15,
  marginTop: 4,
  marginBottom: 4,
  background: '#fff',
  boxSizing: 'border-box',
};
const selectStyle = {
  ...inputStyle,
  minHeight: 38,
};

const AddTutorForm = ({ onSubmit, formData, setFormData, fieldErrors, isSubmitting }) => {
  const [centers, setCenters] = useState([]);
  const [centersError, setCentersError] = useState(null);

  useEffect(() => {
    async function fetchCenters() {
      const userStr = localStorage.getItem('userData');
let token = null;
if (userStr) {
  try {
    const userObj = JSON.parse(userStr);
    token = userObj.token;
  } catch (e) {
    token = null;
  }
}
console.log('[AddTutorForm] JWT token from localStorage:', token);
      if (!token) {
        setCentersError(`You are not logged in or your session expired. Please log in as admin to load centers. [token: ${token}]`);
        setCenters([]);
        return;
      }
      try {
        const res = await fetch('/api/centers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setCentersError('Session expired or unauthorized. Please log in as admin again to load centers.');
          } else {
            setCentersError('Failed to fetch centers. Please try again.');
          }
          setCenters([]);
          return;
        }
        const data = await res.json();
        setCenters(data);
        setCentersError(null);
      } catch (err) {
        setCentersError('Error fetching centers. Please check your connection and try again.');
        setCenters([]);
      }
    }
    fetchCenters();
    // eslint-disable-next-line
  }, []);

  // Retry handler for centers fetch
  const handleRetryCenters = () => {
    setCentersError(null);
    setCenters([]);
    // Re-run fetchCenters
    (async () => {
      const userStr = localStorage.getItem('userData');
let token = null;
if (userStr) {
  try {
    const userObj = JSON.parse(userStr);
    token = userObj.token;
  } catch (e) {
    token = null;
  }
}
console.log('[AddTutorForm] JWT token from localStorage:', token);
      if (!token) {
        setCentersError(`You are not logged in or your session expired. Please log in as admin to load centers. [token: ${token}]`);
        setCenters([]);
        return;
      }
      try {
        const res = await fetch('/api/centers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setCentersError('Session expired or unauthorized. Please log in as admin again to load centers.');
          } else {
            setCentersError('Failed to fetch centers. Please try again.');
          }
          setCenters([]);
          return;
        }
        const data = await res.json();
        setCenters(data);
        setCentersError(null);
      } catch (err) {
        setCentersError('Error fetching centers. Please check your connection and try again.');
        setCenters([]);
      }
    })();
  };

  // Initialize the form with provided data or defaults
  const safeInitialForm = {
    ...initialState,
    ...formData
  };
  const [localForm, setLocalForm] = useState(safeInitialForm);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({ ...prev, [name]: value }));
  };
  // Nested change handling has been simplified as documents are no longer part of the form
  // Bank details handling has been removed since it's no longer part of the form
  const handleSubjectsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setLocalForm(prev => ({ ...prev, subjects: selected }));
  };
  // File upload handling has been removed since documents are no longer part of the form

  // Form submit
  const validate = () => {
    const errs = {};
    if (!localForm.phone || !/^[0-9]{10}$/.test(localForm.phone)) {
      errs.phone = 'Valid 10-digit phone number is required.';
    }
    if (!localForm.password || localForm.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (!localForm.assignedCenter) {
      errs.assignedCenter = 'Assigned Center is required.';
    }
    if (!localForm.assignedHadiyaAmount || isNaN(localForm.assignedHadiyaAmount) || Number(localForm.assignedHadiyaAmount) <= 0) {
      errs.assignedHadiyaAmount = 'Valid Hadiya amount is required.';
    }
    if (!Array.isArray(localForm.subjects) || localForm.subjects.length === 0) {
      errs.subjects = 'At least one subject must be selected.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit(localForm);
  };

  return (

    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 32 }}>
      <h2 style={{ marginBottom: 32, fontWeight: 700, fontSize: 28, color: '#2563eb', textAlign: 'center' }}>Add Tutor</h2>
      {/* Show error if centers cannot be loaded due to missing/expired token */}
      {centersError && (
        <div style={{ color: '#b91c1c', marginBottom: 20, background: '#fee2e2', padding: 12, borderRadius: 6, border: '1px solid #fca5a5' }}>
          {centersError}
          {centersError.toLowerCase().includes('log in') && (
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={handleRetryCenters} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>
                Retry
              </button>
            </div>
          )}
        </div>
      )}
      {/* Personal Info */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Personal Information</div>
        <div style={{ marginBottom: 16 }}>
          <label>Name*</label>
          <input name="name" value={localForm.name || ''} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email*</label>
          <input name="email" value={localForm.email || ''} onChange={handleChange} type="email" required style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Phone* <span style={{ fontWeight: 400, color: '#888', fontSize: 12 }}>(This will be the tutor's login username)</span></label>
          <input name="phone" value={localForm.phone || ''} onChange={handleChange} required pattern="[0-9]{10}" maxLength={10} style={inputStyle} />
          {errors.phone && <div style={{ color: 'red', fontSize: 13 }}>{errors.phone}</div>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Login Password*</label>
          <input 
            name="password" 
            value={localForm.password || ''} 
            onChange={handleChange} 
            type="text" 
            required 
            style={inputStyle} 
            placeholder="Minimum 6 characters" 
          />
          <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>
            <strong>Important:</strong> This password will be used by the tutor to login with their phone number.
            Must be at least 6 characters long.
          </div>
          {errors.password && <div style={{ color: 'red', fontSize: 13 }}>{errors.password}</div>}
        </div>
        <div style={{ marginBottom: 0 }}>
          <label>Qualifications</label>
          <input name="qualifications" value={localForm.qualifications || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      {/* Center & Subjects */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Center & Subjects</div>
        <div style={{ marginBottom: 16 }}>
          <label>Assigned Center* <span style={{ fontWeight: 400, color: '#888', fontSize: 12 }}>(Select the center to assign this tutor. Will be stored as ObjectId.)</span></label>
          {centersError ? (
            <div style={{ color: 'red', fontSize: 14, marginBottom: 8 }}>
              {centersError}
              <button type="button" onClick={handleRetryCenters} style={{ marginLeft: 16, padding: '2px 10px', borderRadius: 4, border: '1px solid #bbb', background: '#f4f4f4', cursor: 'pointer' }}>Retry</button>
            </div>
          ) : null}
          <select name="assignedCenter" value={localForm.assignedCenter || ''} onChange={handleChange} required style={selectStyle} disabled={!!centersError}>
            <option value="">Select Center</option>
            {Array.isArray(centers) && centers.length === 0 && !centersError && (
              <option value="">No centers available</option>
            )}
            {(Array.isArray(centers) ? centers : []).map(center => (
              <option key={center && center._id ? center._id : ''} value={center && center._id ? center._id : ''}>{center && center.name ? center.name : ''}</option>
            ))}
          </select>
          {errors.assignedCenter && <div style={{ color: 'red', fontSize: 13 }}>{errors.assignedCenter}</div>}
        </div>

      </div>

      {/* Session Info */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Session Information</div>
        <div style={{ marginBottom: 16 }}>
          <label>Session Type*</label>
          <select name="sessionType" value={localForm.sessionType || ''} onChange={handleChange} required style={selectStyle}>
            <option value="">Select Session Type</option>
            {sessionTypes.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 0 }}>
          <label>Session Timing*</label>
          <select name="sessionTiming" value={localForm.sessionTiming || ''} onChange={handleChange} required style={selectStyle}>
            <option value="">Select Timing</option>
            {sessionTimings.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Subjects */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Subjects*</div>
        <div style={{ marginBottom: 0 }}>
          <label>Select Subject(s)* <span style={{ fontWeight: 400, color: '#888', fontSize: 12 }}>(Required. Hold Ctrl/Cmd to select multiple)</span></label>
          <select
            name="subjects"
            multiple
            required
            value={localForm.subjects || []}
            onChange={handleSubjectsChange}
            style={{ ...selectStyle, minHeight: 70 }}
          >
            {subjectsList.map(subject => (
              <option key={subject.value} value={subject.value}>{subject.label}</option>
            ))}
          </select>
          <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>
            Select at least one subject the tutor will teach.
          </div>
          {errors.subjects && <div style={{ color: 'red', fontSize: 13 }}>{errors.subjects}</div>}
        </div>
      </div>

      {/* Hadiya */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Hadiya Information</div>
        <div style={{ marginBottom: 0 }}>
          <label>Assigned Hadiya Amount* (₹)</label>
          <input name="assignedHadiyaAmount" value={localForm.assignedHadiyaAmount || ''} onChange={handleChange} type="number" required style={inputStyle} />
          {errors.assignedHadiyaAmount && <div style={{ color: 'red', fontSize: 13 }}>{errors.assignedHadiyaAmount}</div>}
        </div>
      </div>

      {/* Bank Account Fields */}
      <div style={{ background: '#f9fafb', borderRadius: 8, padding: 24, marginBottom: 28, border: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 18, color: '#222' }}>Identification & Bank Details</div>
        <div style={{ marginBottom: 16 }}>
          <label>Aadhar Number</label>
          <input name="aadharNumber" value={formData.aadharNumber || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Bank Name</label>
          <input name="bankName" value={localForm.bankName || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Account Number</label>
          <input name="accountNumber" value={localForm.accountNumber || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Bank Branch</label>
          <input name="bankBranch" value={localForm.bankBranch || ''} onChange={handleChange} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 0 }}>
          <label>IFSC Code</label>
          <input name="ifscCode" value={localForm.ifscCode || ''} onChange={handleChange} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
        <button type="submit" disabled={isSubmitting} style={{ padding: '12px 48px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 20, cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.10)' }}>
          {isSubmitting ? 'Submitting...' : 'Add Tutor'}
        </button>
      </div>
    </form>

  );
};

export default AddTutorForm;
