import React from 'react';

const HostedSite = ({ url }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav
        style={{
          width: '20%',
          backgroundColor: '#f4f4f4',
          padding: '20px',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        }}
      >
        <h1>Garrett Strange</h1>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/">Home</a></li>
          <li><a href="/starchart">StarChart</a></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
      <iframe
        src={url}
        style={{ width: '80%', border: 'none' }}
        title="Hosted Site"
      />
    </div>
  );
};

export default HostedSite;
