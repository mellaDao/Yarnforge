import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/newPattern");
  };

  return (
    <section className="home-main-content">
      {/* Invite users to start designing a pattern */}
      <div className="getting-started">
        <h2>Design your own knitting pattern for free!</h2>
        {/* Redirects to generate_pattern.php */}
        <button id="get-started-btn" onClick={handleGetStartedClick}>
          Get Started
        </button>
      </div>
      <div className="tutorial">
        {/* Show youtube video for an introductory video for knitting */}
        <section id="tutorial-title">
          <h3>
            Don't know how to knit? Check out this video tutorial from RJ Knits!
          </h3>
        </section>

        <section id="tutorial-video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/p_R1UDsNOMk"
            title="Knitting for beginners: A Complete Introduction"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </section>

        <section id="tutorial-video-title">
          <h3>Knitting for beginners: A Complete Introduction</h3>
          <a
            href="https://www.youtube.com/watch?v=p_R1UDsNOMk"
            target="_blank"
            rel="noopener noreferrer"
            id="view-video-btn"
          >
            View Video
          </a>
        </section>
        {/* Credit for YT video */}
        <p>Credit: @RJ Knits on YouTube</p>
      </div>
    </section>
  );
}

export default Home;
