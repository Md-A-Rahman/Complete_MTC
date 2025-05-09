import React from 'react';

const TutorProfile = ({ tutor, onClose }) => {
  if (!tutor) {
    return <div>No tutor data available</div>;
  }

  const sectionStyle = {
    background: '#f9fafb',
    borderRadius: 8,
    padding: 24,
    marginBottom: 28,
    border: '1px solid #e5e7eb'
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 18,
    color: '#222'
  };

  const fieldStyle = {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    fontWeight: 500,
    marginBottom: 4,
    fontSize: 14,
    color: '#4b5563'
  };

  const valueStyle = {
    fontSize: 16,
    color: '#111827'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Tutor Profile</h2>
        <button 
          onClick={onClose}
          style={{ padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}
        >
          Back to List
        </button>
      </div>

      {/* Personal Information */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Personal Information</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Name</div>
            <div style={valueStyle}>{tutor.name || 'Not provided'}</div>
          </div>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>{tutor.email || 'Not provided'}</div>
          </div>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Phone (Login Username)</div>
            <div style={valueStyle}>{tutor.phone || 'Not provided'}</div>
          </div>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Qualifications</div>
            <div style={valueStyle}>{tutor.qualifications || 'Not provided'}</div>
          </div>
        </div>
      </div>

      {/* Center & Subjects */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Center & Subjects</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Assigned Center</div>
            <div style={valueStyle}>
              {tutor.assignedCenter ? (
                typeof tutor.assignedCenter === 'object' ? tutor.assignedCenter.name : 'ID: ' + tutor.assignedCenter
              ) : 'Not assigned'}
            </div>
          </div>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Subjects</div>
            <div style={valueStyle}>
              {Array.isArray(tutor.subjects) && tutor.subjects.length > 0 
                ? tutor.subjects.join(', ')
                : 'No subjects assigned'}
            </div>
          </div>
        </div>
      </div>

      {/* Session Information */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Session Information</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={fieldStyle}>
            <div style={labelStyle}>Session Type</div>
            <div style={valueStyle}>
              {tutor.sessionType ? (
                tutor.sessionType === 'arabic' ? 'Arabic' : 
                tutor.sessionType === 'tuition' ? 'Tuition' : 
                tutor.sessionType
              ) : 'Not specified'}
            </div>
          </div>
          
          <div style={fieldStyle}>
            <div style={labelStyle}>Session Timing</div>
            <div style={valueStyle}>
              {tutor.sessionTiming ? (
                tutor.sessionTiming === 'after_fajr' ? 'After Fajr' : 
                tutor.sessionTiming === 'after_zohar' ? 'After Zohar' : 
                tutor.sessionTiming === 'after_asar' ? 'After Asar' : 
                tutor.sessionTiming === 'after_maghrib' ? 'After Maghrib' : 
                tutor.sessionTiming === 'after_isha' ? 'After Isha' : 
                tutor.sessionTiming
              ) : 'Not specified'}
            </div>
          </div>
        </div>
      </div>

      {/* Hadiya */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Hadiya</div>
        
        <div style={fieldStyle}>
          <div style={labelStyle}>Assigned Hadiya Amount</div>
          <div style={valueStyle}>
            {tutor.assignedHadiyaAmount ? `₹${tutor.assignedHadiyaAmount}` : 'Not assigned'}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Documents</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {tutor.documents && (
            <>
              <div style={fieldStyle}>
                <div style={labelStyle}>Aadhar Number</div>
                <div style={valueStyle}>{tutor.documents.aadharNumber || 'Not provided'}</div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>Aadhar Photo</div>
                <div style={valueStyle}>
                  {tutor.documents.aadharPhoto ? (
                    <a href={tutor.documents.aadharPhoto} target="_blank" rel="noopener noreferrer">View Document</a>
                  ) : 'Not uploaded'}
                </div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>Certificates</div>
                <div style={valueStyle}>
                  {Array.isArray(tutor.documents.certificates) && tutor.documents.certificates.length > 0 ? (
                    tutor.documents.certificates.map((cert, index) => (
                      <div key={index}>
                        <a href={cert} target="_blank" rel="noopener noreferrer">Certificate {index + 1}</a>
                      </div>
                    ))
                  ) : 'No certificates uploaded'}
                </div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>Memos</div>
                <div style={valueStyle}>
                  {Array.isArray(tutor.documents.memos) && tutor.documents.memos.length > 0 ? (
                    tutor.documents.memos.map((memo, index) => (
                      <div key={index}>
                        <a href={memo} target="_blank" rel="noopener noreferrer">Memo {index + 1}</a>
                      </div>
                    ))
                  ) : 'No memos uploaded'}
                </div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>Resume</div>
                <div style={valueStyle}>
                  {tutor.documents.resume ? (
                    <a href={tutor.documents.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                  ) : 'Not uploaded'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bank Details */}
      <div style={sectionStyle}>
        <div style={titleStyle}>Bank Details</div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {tutor.documents && tutor.documents.bankAccount && (
            <>
              <div style={fieldStyle}>
                <div style={labelStyle}>Bank Account Number</div>
                <div style={valueStyle}>{tutor.documents.bankAccount.accountNumber || 'Not provided'}</div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>IFSC Code</div>
                <div style={valueStyle}>{tutor.documents.bankAccount.ifscCode || 'Not provided'}</div>
              </div>
              
              <div style={fieldStyle}>
                <div style={labelStyle}>Passbook Photo</div>
                <div style={valueStyle}>
                  {tutor.documents.bankAccount.passbookPhoto ? (
                    <a href={tutor.documents.bankAccount.passbookPhoto} target="_blank" rel="noopener noreferrer">View Passbook</a>
                  ) : 'Not uploaded'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
