import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-pic-container">
          <img src="/images/Graduation Pic.png" alt="Nick Petrilli" className="profile-pic" />
        </div>
        <h1 className="animated-text">Welcome to My Portfolio</h1>
        <p className="animated-text">
          Hello! My name is Nick Petrilli and I am a passionate software developer with experience in creating
          innovative and efficient solutions. I graduated from Marist College with a MS in Computer Science in May 2024, and with a BS in Computer Science in May 2023.
          I specialize in developing web applications and enjoy working on challenging projects. Explore my portfolio to learn more about my work.
        </p>
      </div>
    </div>
  );
};
export default Home;