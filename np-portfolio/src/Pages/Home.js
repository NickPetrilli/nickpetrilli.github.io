import React, { useEffect } from 'react';

const Home = () => {

  //Background numbers effect
  useEffect(() => {
    const numbers = document.querySelector('.numbers');
    const numString = numbers.textContent;
    const splitNum = numString.split("");

    numbers.textContent = "";
    for (let i = 0; i < splitNum.length; i++) {
      numbers.innerHTML += "<span>" + splitNum[i] + "</span>";
    }
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="numbers-overlay">
          <p className="numbers">
            1583265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078
            1583265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078
            1583265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078115881265443896124301805912443078
          </p>
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