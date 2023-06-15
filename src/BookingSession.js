import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import "./styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
//import { Input } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function BookingSession(props) {
    // Note that we have to initialize ALL of fields with values. These
    // could come from props, but since we don’t want to prefill this form,
    // we just use an empty string. If we don’t do this, React will yell
    // at us.
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    const whereDropdownValueHandler = (e) => {
        const selectedValue = e.target.value;
        setDoctorName(selectedValue === "Select Doctor" ? "" : selectedValue);
    };

    useEffect(() => {
        const isDoctorSelected = Boolean(doctorName);
        const doctorSelectedDiv = document.getElementById("doctorSelected");
        if (doctorSelectedDiv) {
            doctorSelectedDiv.style.display = isDoctorSelected ? "block" : "none";
        }
    }, [doctorName]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: ""
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="input-field">
                <label htmlFor="firstName" className="form-label">
                    First Name
                </label>
                <input
                    id="firstName"
                    className="form-control"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
            </div>
            <div className="input-field">
                <label htmlFor="lastName" className="form-label">
                    Last Name
                </label>
                <input
                    id="lastName"
                    className="form-control"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
            </div>
            <div className="input-field">
                <label htmlFor="email" className="form-label">
                    Email Address
                </label>
                <input
                    id="email"
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </div>
            <br />
            <h4>Doctor</h4>
            <div class="dropdown">
                <select
                    className="form-select"
                    aria-label="Doctor Select"
                    onChange={whereDropdownValueHandler}
                >
                    <option>Select Doctor</option>
                    <option value="Dr. Hopkins">Dr. Hopkins</option>
                    <option value="Dr. Lara">Dr. Lara</option>
                    <option value="Dr. Singh">Dr. Singh</option>
                </select>
            </div>
            <div id="doctorSelected">
                <div className="where">
                    <h4>Where?</h4>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="gMeet"
                            id="google-meet"
                        />
                        <label class="form-check-label" forHtml="gMeet">
                            Google Meet
                        </label>
                    </div>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="phone"
                            id="phone"
                            checked
                        />
                        <label class="form-check-label" forHtml="phone">
                            Phone
                        </label>
                    </div>
                </div>
                <div className="when">
                    <label htmlFor="date" className="form-label">
                        Date and Time
                    </label>
                    <div style={{ position: "relative" }}>
                        <DatePicker
                            id="date"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy, HH:mm"
                            showTimeInput
                            className="form-control"
                        />
                        <FaCalendarAlt
                            size={20}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                pointerEvents: "none"
                            }}
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="confirm-booking-button">
                Confirm Booking
            </button>
        </form>
    );
}