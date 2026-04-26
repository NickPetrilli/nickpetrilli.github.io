import React, { useEffect } from 'react';

const Home = () => {

  //Background numbers effect
useEffect(() => {
  const numbersEl = document.querySelector('.numbers');

  const fill = () => {
    const charH = 48;
    const charW = charH * 0.55;
    const cols = Math.ceil(window.innerWidth / charW) + 4;
    const rows = Math.ceil(window.innerHeight / charH) + 4;
    numbersEl.innerHTML = Array.from(
      { length: cols * rows },
      () => `<span>${Math.floor(Math.random() * 10)}</span>`
    ).join('');
  };

  fill();
  window.addEventListener('resize', fill);
  return () => window.removeEventListener('resize', fill);
}, []);

  return (
    <>
      <div className="home-container">
        <div className="numbers-overlay">
          <p className="numbers"></p>
        </div>
        <div className="profile-section">
          <div className="profile-pic-container">
            <img src="/images/Graduation Pic.png" alt="Nick Petrilli" className="profile-pic" />
          </div>
        </div>
          <h1 className="animated-text">Welcome to My Portfolio</h1>
          <p className="animated-text">
            Hello! My name is Nicholas Petrilli and I am a passionate software developer with experience in creating
            innovative and efficient solutions. I graduated from Marist College with a MS in Computer Science in May 2024, and with a BS in Computer Science in May 2023.
            I specialize in developing web applications and enjoy working on challenging projects. Explore my portfolio to learn more about my work.
          </p>
      </div>
    </>
  );
};

export default Home;