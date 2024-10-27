import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/errorPage.css';
//error messages are passed through url and showed here
const ErrorPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const message = queryParams?.get('message');
  const errorDetails = queryParams?.get('error');

  return (
    <div className="error_page">
      <div className="error_page-box">
        <div className="error_page-heading">Something wrong here...</div>
        <p>
          {message}.{errorDetails}
        </p>
        <Link to="/" className="error_page-btn">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
