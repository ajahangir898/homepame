import { useState } from "react";
import "./style.css";

export const BookingModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("request"); // "request" or "appointment"
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [connectMethod, setConnectMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    note: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    { id: "morning", label: "08:00 AM to 12:00 PM" },
    { id: "afternoon", label: "12:01 PM to 04:00 PM" },
    { id: "evening", label: "04:01 PM to 08:00 PM" },
    { id: "night", label: "08:01 PM to 12:00 PM" },
  ];

  const connectOptions = [
    { id: "google-meet", label: "Google Meet", icon: "meet" },
    { id: "zoom", label: "Zoom", icon: "zoom" },
    { id: "phone", label: "Phone Call", icon: "phone" },
    { id: "office", label: "D-14/3, Bank Colony, Savar, Dhaka-1340", icon: "location" },
  ];

  // Calendar helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const formatSelectedDate = (date) => {
    if (!date) return "";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]}`;
  };

  const isDateClickable = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Only future dates and specific available dates (simulated)
    const availableDays = [14, 15, 16, 18, 20, 21, 25, 26, 27, 28, 29, 30];
    return checkDate >= today && availableDays.includes(day);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectDate = (day) => {
    if (isDateClickable(day)) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.number.trim()) newErrors.number = "Number is required";
    
    if (activeTab === "appointment") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!selectedDate) newErrors.date = "Please select a date";
      if (!selectedTimeSlot) newErrors.time = "Please select a time slot";
      if (!connectMethod) newErrors.connect = "Please select how to connect";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const endpoint = activeTab === "request" ? "/api/call-requests" : "/api/bookings";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate?.toISOString(),
          timeSlot: selectedTimeSlot,
          connectMethod,
          type: activeTab,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", number: "", note: "", email: "" });
        setSelectedDate(null);
        setSelectedTimeSlot("");
        setConnectMethod("");
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const dayLabels = ["So.", "Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];

    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const clickable = isDateClickable(day);
      const selected = selectedDate?.getDate() === day && 
                       selectedDate?.getMonth() === currentDate.getMonth();
      const today = isToday(day);
      
      days.push(
        <div
          key={day}
          className={`calendar-day ${clickable ? "clickable" : "disabled"} ${selected ? "selected" : ""} ${today ? "today" : ""}`}
          onClick={() => selectDate(day)}
        >
          {clickable && <div className="day-bg"></div>}
          <span>{day}</span>
          {today && !clickable && <div className="today-dot"></div>}
        </div>
      );
    }

    return (
      <div className="calendar-section">
        <div className="calendar-header">
          <button type="button" className="calendar-nav prev" onClick={prevMonth}>
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M5 1L1 6L5 11" stroke="#d6d3d1" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="calendar-month">{formatMonthYear(currentDate)}</span>
          <button type="button" className="calendar-nav next" onClick={nextMonth}>
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M1 1L5 6L1 11" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day-labels">
            {dayLabels.map((label) => (
              <div key={label} className="day-label">{label}</div>
            ))}
          </div>
          <div className="calendar-days">{days}</div>
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => (
    <div className="time-slots-section">
      <div className="selected-date-display">
        {selectedDate ? formatSelectedDate(selectedDate) : "Select a date"}
      </div>
      <div className="time-slots-list">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            className={`time-slot ${selectedTimeSlot === slot.id ? "selected" : ""}`}
            onClick={() => setSelectedTimeSlot(slot.id)}
          >
            {slot.label}
          </button>
        ))}
        <div className="custom-time-slot">
          <input
            type="text"
            placeholder="Enter Your Preferable Time"
            className="custom-time-input"
          />
        </div>
      </div>
    </div>
  );

  const renderConnectOptions = () => (
    <div className="connect-section">
      <h4 className="connect-title">Where we can connect?</h4>
      <div className="connect-options">
        {connectOptions.map((option) => (
          <label key={option.id} className="connect-option">
            <input
              type="radio"
              name="connectMethod"
              value={option.id}
              checked={connectMethod === option.id}
              onChange={(e) => setConnectMethod(e.target.value)}
            />
            <span className="radio-custom"></span>
            <span className={`connect-icon ${option.icon}`}>
              {option.icon === "meet" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="#000"/>
                </svg>
              )}
              {option.icon === "zoom" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect width="20" height="20" rx="4" fill="#044343"/>
                  <path d="M5 8H12V14H5V8Z" fill="white"/>
                  <path d="M13 9L16 7V15L13 13V9Z" fill="white"/>
                </svg>
              )}
              {option.icon === "phone" && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#000"/>
                </svg>
              )}
              {option.icon === "location" && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1.66666C6.77504 1.66666 4.16671 4.27499 4.16671 7.49999C4.16671 11.875 10 18.3333 10 18.3333C10 18.3333 15.8334 11.875 15.8334 7.49999C15.8334 4.27499 13.225 1.66666 10 1.66666ZM10 9.58332C8.85004 9.58332 7.91671 8.64999 7.91671 7.49999C7.91671 6.34999 8.85004 5.41666 10 5.41666C11.15 5.41666 12.0834 6.34999 12.0834 7.49999C12.0834 8.64999 11.15 9.58332 10 9.58332Z" fill="#044343"/>
                </svg>
              )}
            </span>
            <span className="connect-label">{option.label}</span>
          </label>
        ))}
      </div>
      {errors.connect && <span className="error-text-new">{errors.connect}</span>}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-new appointment-mode" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-new" onClick={onClose}>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <path d="M16 16L28 28M28 16L16 28" stroke="#71717A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Tab Switcher */}
        <div className="modal-tabs">
          <button
            className={`modal-tab ${activeTab === "request" ? "active" : ""}`}
            onClick={() => setActiveTab("request")}
          >
            Requests a Call
          </button>
          <button
            className={`modal-tab ${activeTab === "appointment" ? "active" : ""}`}
            onClick={() => setActiveTab("appointment")}
          >
            Book an Appointment
          </button>
        </div>

        {submitted ? (
          <div className="booking-success-new">
            <svg className="success-icon-new" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3>{activeTab === "request" ? "Request Sent!" : "Booking Confirmed!"}</h3>
            <p>We'll contact you shortly.</p>
          </div>
        ) : (
          <form className="booking-form-new" onSubmit={handleSubmit}>
            {errors.submit && <div className="error-alert-new">{errors.submit}</div>}

            {/* Appointment Tab - Calendar & Time Slots */}
            {activeTab === "appointment" && (
              <div className="calendar-time-row">
                {renderCalendar()}
                <div className="vertical-divider"></div>
                {renderTimeSlots()}
              </div>
            )}

            {/* Form Fields Row */}
            <div className="form-connect-row">
              <div className="form-fields-column">
                {/* Name Field */}
                <div className="form-field-new">
                  <div className={`input-wrapper-new ${errors.name ? "error" : ""}`}>
                    <div className="input-icon">
                      <img src="https://hdnfltv.com/image/nitimages/user.webp" alt="" width="20" height="20" />
                    </div>
                    <div className="input-divider"></div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Inter Your Name....."
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="floating-label-new">Name*</label>
                  {errors.name && <span className="error-text-new">{errors.name}</span>}
                </div>

                {/* Number Field */}
                <div className="form-field-new">
                  <div className={`input-wrapper-new ${errors.number ? "error" : ""}`}>
                    <div className="input-icon">
                      <img src="https://hdnfltv.com/image/nitimages/user.webp" alt="" width="20" height="20" />
                    </div>
                    <div className="input-divider"></div>
                    <input
                      type="tel"
                      name="number"
                      placeholder="Inter your Number....."
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                  <label className="floating-label-new">Number*</label>
                  {errors.number && <span className="error-text-new">{errors.number}</span>}
                </div>

                {/* Email Field - Only for appointment */}
                {activeTab === "appointment" && (
                  <div className="form-field-new">
                    <div className={`input-wrapper-new ${errors.email ? "error" : ""}`}>
                      <div className="input-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 3.33334H3.33366C2.41699 3.33334 1.67533 4.08334 1.67533 5.00001L1.66699 15C1.66699 15.9167 2.41699 16.6667 3.33366 16.6667H16.667C17.5837 16.6667 18.3337 15.9167 18.3337 15V5.00001C18.3337 4.08334 17.5837 3.33334 16.667 3.33334ZM16.667 6.66668L10.0003 10.8333L3.33366 6.66668V5.00001L10.0003 9.16668L16.667 5.00001V6.66668Z" fill="#A8A29E"/>
                        </svg>
                      </div>
                      <div className="input-divider"></div>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@xyz.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <label className="floating-label-new">E-Mail-Adresse *</label>
                    {errors.email && <span className="error-text-new">{errors.email}</span>}
                  </div>
                )}

                {/* Submit Button */}
                <button type="submit" className="submit-btn-new" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-new"></span>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>

              {/* Where we can connect - Only for appointment */}
              {activeTab === "appointment" && renderConnectOptions()}
            </div>

            {/* Note Section */}
            <div className="note-section">
              <h4 className="note-title">Note</h4>
              <div className="note-wrapper">
                <textarea
                  name="note"
                  placeholder="Anything you want to say...."
                  value={formData.note}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
