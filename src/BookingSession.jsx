import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import moment from "moment";
import { parseISO, format } from "date-fns";
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
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [doctorName, setDoctorName] = useState("");
    // const [selectedDate, setSelectedDate] = useState(null);
    /* commenting the initial states because formik is handeling the state internally*/

    const [isLoading, setIsLoading] = useState(false);
    const [appointmentScheduling, setAppointmentScheduling] = useState(false);
    const [bookingStatus, setBookingStatus] = useState(false);

    useEffect(() => {
        const fillFormDiv = document.getElementById("fill-the-form");
        if (fillFormDiv) {
            fillFormDiv.style.display = isLoading ? "none" : "block";
        }

    }, [isLoading]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            doctorName: "",
            meetingMethod: "",
            selectedDate: "",
            selectedDateTime: null,
        },
        onSubmit: (values) => {
            setIsLoading(true);
            setAppointmentScheduling(true);
            axios
                .post("https://jsonplaceholder.typicode.com/posts", values)
                .then((response) => {
                    // alert(JSON.stringify(values, null, 2));
                    setIsLoading(false);
                    setAppointmentScheduling(false);
                    setBookingStatus(true)
                })
                .catch((e) => {
                    throw new Error(e);
                    setIsLoading(false);
                });
        },
    });

    // const selectedDateTimeHandler = (selectedDateTime) => {
    //     console.log("passed datetime is = " + selectedDateTime)
    //     // if (selectedDateTime) {
    //     //     const parsedDate = parse(selectedDateTime, 'dd/MM/yyyy HH:mm', new Date());
    //     //     if (isValid(parsedDate)) {
    //     //         const formattedDate = format(parsedDate, 'dd/MM/yyyy, HH:mm');
    //     //         formik.setFieldValue('selectedDateTime', formattedDate);
    //     //     } else {
    //     //         formik.setFieldValue('selectedDateTime', null);
    //     //         console.error('Invalid date');
    //     //     }
    //     // } else {
    //     //     formik.setFieldValue('selectedDateTime', null);
    //     // }
    // }

    const selectedDateTimeHandler = (date) => {
        formik.setFieldValue("selectedDateTime", date);
    };

    const doctorChangeHandler = (e) => {
        const selectedValue = e.target.value;
        //setDoctorName(selectedValue === "Select Doctor" ? "" : selectedValue);
        formik.setFieldValue(
            "doctorName",
            selectedValue === "Select Doctor" ? "" : selectedValue
        );
    };

    const cancelAppointmentHandler = () => {
        setBookingStatus(false);
        window.location.reload();
    }

    useEffect(() => {
        const isDoctorSelected = Boolean(formik.values.doctorName);
        const doctorSelectedDiv = document.getElementById("doctorSelected");
        if (doctorSelectedDiv) {
            doctorSelectedDiv.style.display = isDoctorSelected ? "block" : "none";
        }
    }, [formik.values.doctorName]);

    return (
        <div id="main">
            {bookingStatus ? (
                <div>
                    <h2>Appointment booked successfully</h2>
                    <button onClick={cancelAppointmentHandler}>Cancel appointment</button>
                </div>
            ) : (
                <div>
                    <h1>Book a session</h1>
                    <p>Fill in the form below to book a virtual session with your doctor</p>
                    {appointmentScheduling ? (
                        <h2>Please wait, scheduling your appointment..</h2>
                    ) : (
                        <div id="fill-the-form">
                            <h4>Basic Info</h4>
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
                                <div className="dropdown">
                                    <select
                                        className="form-select"
                                        aria-label="Doctor Select"
                                        onChange={doctorChangeHandler}
                                        value={formik.values.doctorName}
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
                                                name="meetingMethod"
                                                id="google-meet"
                                                onChange={formik.handleChange}
                                                value="google Meet"
                                            />
                                            <label class="form-check-label" htmlFor="google-meet">
                                                Google Meet
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="meetingMethod"
                                                id="phone"
                                                onChange={formik.handleChange}
                                                value="phone"
                                            />
                                            <label class="form-check-label" htmlFor="phone">
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
                                                selected={formik.values.selectedDateTime}
                                                onChange={selectedDateTimeHandler}
                                                value={formik.values.selectedDateTime}
                                                dateFormat="dd/MM/yyyy, HH:mm"
                                                showTimeInput
                                                className="form-control"
                                            />
                                            <FaCalendarAlt size={20} className="calendar-icon" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="confirm-booking-button">
                                    Confirm Booking
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
