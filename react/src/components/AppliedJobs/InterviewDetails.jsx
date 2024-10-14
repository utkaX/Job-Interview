import React from 'react';

const InterviewDetails = ({ interviewDate, interviewTime }) => {
    return (
        <div className="interview-details">
            <p>Interview Scheduled: {interviewDate} at {interviewTime}</p>
            <button className="join-button bg-green-500 text-white px-3 py-2 rounded-md mt-2">
                Join Interview
            </button>
        </div>
    );
};

export default InterviewDetails;
