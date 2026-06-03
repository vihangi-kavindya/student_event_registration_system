import React from "react";

function SubmittedDetails({ data }) {
  return (
    <div className="submitted-details">
      <h2>Submitted Details</h2>

      <p>
        <strong>Full Name:</strong> {data.fullName}
      </p>

      <p>
        <strong>Student ID:</strong> {data.studentId}
      </p>

      <p>
        <strong>Email:</strong> {data.email}
      </p>

      <p>
        <strong>Academic Year:</strong> {data.academicYear}
      </p>

      <p>
        <strong>Participation Mode:</strong> {data.participationMode}
      </p>

      <p>
        <strong>Gender:</strong> {data.gender}
      </p>

      <p>
        <strong>Comments:</strong> {data.comments || "No comments provided"}
      </p>
    </div>
  );
}

export default SubmittedDetails;