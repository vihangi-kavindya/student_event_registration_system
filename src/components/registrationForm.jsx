import { useState } from "react";
import "../styles/form.css";
import SuccessMessage from "./SuccessMessage";
import SubmittedDetails from "./SubmittedDetails";

function RegistrationForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    year: "",
    mode: "",
    dob: "",
    gender: "",
    studentImage: null,
    comments: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    const fieldValue =
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    validateField(name, fieldValue);
  };

  const validateField = (name, value) => {

    let error = "";

    switch (name) {

      case "fullName":
        if (!value) {
          error = "Full name is required";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          error = "Only letters and spaces allowed";
        } else if (value.length < 3) {
          error = "Minimum 3 characters required";
        }
        break;

      case "studentId":
        if (!value) {
          error = "Student ID is required";
        } else if (!/^[A-Za-z]{2}\d{7}$/.test(value)) {
          error = "Example: IT2023001";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (
          !/^[^\s@]+@[^\s@]+\.(edu|ac\.lk)$/i.test(value)
        ) {
          error = "Invalid university email";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
        ) {
          error =
            "Password must contain uppercase, lowercase, number and special character";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "contact":
        if (!/^\d{10}$/.test(value)) {
          error = "Contact number must contain exactly 10 digits";
        }
        break;

      case "year":
        if (!value) {
          error = "Select academic year";
        }
        break;

      case "mode":
        if (!value) {
          error = "Select participation mode";
        }
        break;

      case "dob":

        if (!value) {
          error = "Date of birth required";
        } else {

          const today = new Date();
          const birthDate = new Date(value);

          let age =
            today.getFullYear() - birthDate.getFullYear();

          const monthDifference =
            today.getMonth() - birthDate.getMonth();

          if (
            monthDifference < 0 ||
            (monthDifference === 0 &&
              today.getDate() < birthDate.getDate())
          ) {
            age--;
          }

          if (age < 16) {
            error = "Student must be older than 16 years";
          }
        }

        break;

      case "gender":
        if (!value) {
          error = "Select gender";
        }
        break;

      case "studentImage":

        if (value) {

          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
          ];

          if (!allowedTypes.includes(value.type)) {
            error = "Only image files allowed";
          }

          if (value.size > 2 * 1024 * 1024) {
            error = "Maximum file size is 2MB";
          }
        }

        break;

      case "comments":
        if (value.length > 200) {
          error = "Maximum 200 characters allowed";
        }
        break;

      case "agreement":
        if (!value) {
          error = "You must agree before submission";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    const hasErrors = Object.values(errors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    setSuccess(
      "Student event registration submitted successfully!"
    );

    setSubmittedData(formData);
  };

  const handleReset = () => {

    setFormData({
      fullName: "",
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      year: "",
      mode: "",
      dob: "",
      gender: "",
      studentImage: null,
      comments: "",
      agreement: false,
    });

    setErrors({});
    setSuccess("");
    setSubmittedData(null);
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>

        <h2>Student Event Registration</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <p className="error">{errors.fullName}</p>

        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
        />
        <p className="error">{errors.studentId}</p>

        <input
          type="email"
          name="email"
          placeholder="University Email"
          value={formData.email}
          onChange={handleChange}
        />
        <p className="error">{errors.email}</p>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <p className="error">{errors.password}</p>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <p className="error">{errors.confirmPassword}</p>

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />

        <small>
          {formData.contact.length}/10 digits
        </small>

        <p className="error">{errors.contact}</p>

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
        >
          <option value="">Select Academic Year</option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <p className="error">{errors.year}</p>

        <label>Participation Mode</label>

        <div>
          <input
            type="radio"
            name="mode"
            value="Online"
            onChange={handleChange}
          />
          Online

          <input
            type="radio"
            name="mode"
            value="Physical"
            onChange={handleChange}
          />
          Physical
        </div>

        <p className="error">{errors.mode}</p>

        <label>Date of Birth</label>

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <p className="error">{errors.dob}</p>

        <label>Gender</label>

        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
          />
          Male

          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
          />
          Female
        </div>

        <p className="error">{errors.gender}</p>

        <label>Upload Student ID Image</label>

        <input
          type="file"
          name="studentImage"
          onChange={handleChange}
        />

        <p className="error">{errors.studentImage}</p>

        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />

        <small>
          {formData.comments.length}/200 characters
        </small>

        <p className="error">{errors.comments}</p>

        <div className="checkbox">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
          />
          I Agree to Terms and Conditions
        </div>

        <p className="error">{errors.agreement}</p>

        <button type="submit">
          Submit
        </button>

        <button
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>

      </form>

      {success && (
        <SuccessMessage message={success} />
      )}

      {submittedData && (
        <SubmittedDetails data={submittedData} />
      )}

    </div>
  );
}

export default RegistrationForm;