import React from 'react';
import Layout from './Layout';

const Analytics = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      {/* Page Heading */}
      <h1 className="text-5xl font-extrabold text-blue-900 mb-16 text-center">
        Analytics Overview
      </h1>

      {/* Job Posting Approach */}
      <section className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mb-12 transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Job Posting Approach</h2>
        <p className="text-gray-700 leading-relaxed">
          Posting jobs effectively is crucial for attracting the right talent. By clearly defining job descriptions, requirements, and company culture, employers can ensure that their listings reach qualified candidates. Consider using different channels like job boards, social media, and your company’s website to maximize reach.
        </p>
      </section>

      {/* Applied Job Approach */}
      <section className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mb-12 transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Applied Job Approach</h2>
        <p className="text-gray-700 leading-relaxed">
          The applied job approach helps you track the effectiveness of your job postings. By analyzing the number of applications, sources of applicants, and applicant profiles, employers can refine their job descriptions and improve targeting. This data helps in understanding which roles are getting more attention and why.
        </p>
      </section>

      {/* Job Application Approach */}
      <section className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mb-12 transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Job Application Approach</h2>
        <p className="text-gray-700 leading-relaxed">
          The job application process should be streamlined and user-friendly. Employers should ensure that candidates can apply easily and quickly while providing enough information to make informed decisions. It’s important to track which application methods (online forms, email, etc.) are the most effective in getting quality candidates.
        </p>
      </section>

      {/* Interview Scheduling Approach */}
      <section className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mb-12 transform hover:-translate-y-1">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Interview Scheduling Approach</h2>
        <p className="text-gray-700 leading-relaxed">
          Scheduling interviews in a timely and organized manner is key to maintaining a positive candidate experience. Tools that allow for easy interview scheduling and reminders help both employers and applicants stay on track. Analyzing the average time between application and interview can help optimize this process.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center mt-16">
        <p className="text-gray-600">&copy; 2024 Career Craft - Empowering Employers with Data Insights</p>
      </footer>
    </div>
    </Layout>
  );
};

export default Analytics;
