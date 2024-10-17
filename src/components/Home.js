import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to My Blog!</h1>
      <p style={styles.description}>
        Discover a collection of insightful articles, share your thoughts, and join the community of learners and writers.
      </p>
      <div style={styles.nav}>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.2rem',
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '2rem',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  }
};

export default Home;
