import { useState, useMemo } from 'react';
import { X, Calendar, User, Phone, MessageSquare, Sparkles, Shield, Clock } from 'lucide-react';
import { whatsappLink } from '../../config/site';
import '../../styles/VipConsultationModal.css';

export default function VipConsultationModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [interest, setInterest] = useState('gold');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState('in-store'); // in-store, virtual
  const [submitted, setSubmitted] = useState(false);
  const [showCustomDate, setShowCustomDate] = useState(false);

  const today = (() => {
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

  const availableDates = useMemo(() => {
    const dates = [];
    let current = new Date();
    // Start booking availability from tomorrow
    current.setDate(current.getDate() + 1);
    
    while (dates.length < 7) {
      if (current.getDay() !== 0) { // Skip Sundays (showroom closed)
        dates.push({
          value: current.toISOString().split('T')[0],
          dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
          dateNum: current.getDate(),
          monthName: current.toLocaleDateString('en-US', { month: 'short' }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const [date, setDate] = useState(availableDates[0]?.value || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate booking save, then format WhatsApp payload
    const interestLabels = {
      gold: 'Fine Gold Ornaments',
      diamond: 'Diamond Boutique',
      himachali: 'Silver & Heritage Collection',
      custom: 'Bespoke Custom Designs'
    };

    const typeLabels = {
      'in-store': 'In-Store VIP Showroom Consultation (The Mall Shimla)',
      'virtual': 'Virtual WhatsApp Video Call Consultation'
    };

    const message =
      `Hello Satya Jewellers Shimla, I would like to book a VIP Consultation appointment:\n\n` +
      `- Name: ${name}\n` +
      `- Phone: ${phoneNumber}\n` +
      `- Date Requested: ${date}\n` +
      `- Consultation Mode: ${typeLabels[type]}\n` +
      `- Interested Collection: ${interestLabels[interest]}\n` +
      `- Custom Requirements: ${notes || 'None Specified'}\n\n` +
      `Please confirm slot availability.`;

    // Open WhatsApp
    window.open(whatsappLink(message), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Left Side: Luxury Perks */}
        <div className="modal-perks-sidebar">
          <div className="perks-bg-overlay"></div>
          <div className="perks-content-wrapper">
            <span className="perks-tag">
              <Sparkles size={11} className="text-gold" />
              Bespoke Experience
            </span>
            <h3>VIP Showroom Experience</h3>
            <p className="perks-tagline">Enjoy luxury hospitality and custom crafting at Shimla's finest showroom.</p>
            
            <div className="perks-list">
              <div className="perk-item">
                <Shield size={18} className="perk-icon" />
                <div className="perk-text">
                  <h5>Private Lounge Viewing</h5>
                  <p>Browse signature necklaces and bridal collections in a secure private lounge.</p>
                </div>
              </div>
              <div className="perk-item">
                <Calendar size={18} className="perk-icon" />
                <div className="perk-text">
                  <h5>Free Karatmeter Assay</h5>
                  <p>Bring old jewelry for free, instant X-ray purity testing reports.</p>
                </div>
              </div>
              <div className="perk-item">
                <Clock size={18} className="perk-icon" />
                <div className="perk-text">
                  <h5>Bespoke CAD Previews</h5>
                  <p>Consult with our designer to map your ideas to 3D computer drawings.</p>
                </div>
              </div>
            </div>
            
            <div className="perks-footer-note">
              Shop No. 62, Satya Complex, The Mall Shimla
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="modal-form-area">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <h2>Schedule <span className="text-gold-gradient">Appointment</span></h2>
                <p>Reserve your private session. Submitting will direct you to WhatsApp to finalize your slot with our coordinator.</p>
              </div>

              <div className="form-fields">
                {/* Full Name */}
                <div className="form-group">
                  <label><User size={13} className="text-gold" /> Full Name</label>
                  <input 
                    type="text" required placeholder="Enter your full name" 
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label><Phone size={13} className="text-gold" /> Phone Number</label>
                  <input 
                    type="tel" required placeholder="e.g. +91 98765 43210" 
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                {/* Consultation Date */}
                <div className="form-group">
                  <label><Calendar size={13} className="text-gold" /> Select Appointment Date</label>
                  <div className="calendar-scroll-grid">
                    {availableDates.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        className={`calendar-date-cell ${date === d.value ? 'active' : ''}`}
                        onClick={() => setDate(d.value)}
                      >
                        <span className="cal-day">{d.dayName}</span>
                        <span className="cal-num">{d.dateNum}</span>
                        <span className="cal-month">{d.monthName}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="custom-date-container">
                    <button
                      type="button"
                      className="custom-date-toggle-btn"
                      onClick={() => setShowCustomDate(!showCustomDate)}
                    >
                      {showCustomDate ? 'Close custom calendar' : 'Choose another date...'}
                    </button>
                    {showCustomDate && (
                      <input 
                        type="date" 
                        required
                        min={today}
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                        className="custom-date-native-input"
                      />
                    )}
                  </div>
                </div>

                {/* Consult Mode */}
                <div className="form-group">
                  <label>Consultation Mode</label>
                  <div className="consult-type-toggle">
                    <button 
                      type="button"
                      className={`type-toggle-btn ${type === 'in-store' ? 'active' : ''}`}
                      onClick={() => setType('in-store')}
                    >
                      In-Store (Shimla)
                    </button>
                    <button 
                      type="button"
                      className={`type-toggle-btn ${type === 'virtual' ? 'active' : ''}`}
                      onClick={() => setType('virtual')}
                    >
                      Virtual Video Call
                    </button>
                  </div>
                </div>

                {/* Interest Area */}
                <div className="form-group">
                  <label>Interested Collection</label>
                  <select value={interest} onChange={(e) => setInterest(e.target.value)}>
                    <option value="gold">Gold Jewellery Ornaments</option>
                    <option value="diamond">Fine Diamond Boutique</option>
                    <option value="himachali">Silver & Heritage Collection</option>
                    <option value="custom">Bespoke Custom Designing</option>
                  </select>
                </div>

                {/* Special Instructions */}
                <div className="form-group">
                  <label><MessageSquare size={13} className="text-gold" /> Custom Requirements / Notes</label>
                  <textarea 
                    placeholder="Enter any design ideas, specific carat needs, or weight preferences..."
                    value={notes} onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <button type="submit" className="button-premium form-submit-btn">
                Confirm & Book on WhatsApp
              </button>
            </form>
          ) : (
            <div className="form-success-state">
              <div className="success-icon-badge">
                <Sparkles size={32} className="text-gold" />
              </div>
              <h3>Request Transmitted!</h3>
              <p>We have opened a WhatsApp chat to confirm your requested slot. A customer care representative from our showroom on The Mall, Shimla will finalize the time slot with you shortly.</p>
              
              <button 
                type="button" 
                className="button-premium" 
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
              >
                Return to Gallery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
