import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // clicking get started button will navigate user to new pattern page
    navigate("/newPattern");
  };

  return (
    <section id="body-style-dark">
      <section className="home-main-content">
        {/* home main content */}
        <div className="getting-started">
          {/* invite users to start designing a pattern */}
          <h2>Design your own knitting pattern for free!</h2>
          <button id="get-started-btn" onClick={handleGetStartedClick}>
            {/* button to redirects to generate_pattern.php */}
            Get Started
          </button>
        </div>
        <div className="tutorial">
          {/* tutorial section text */}
          <section id="tutorial-title">
            <h3>
              Don't know how to knit? Check out this video tutorial from RJ
              Knits!
            </h3>
          </section>

          <section id="video">
            {/* tutorial video*/}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/p_R1UDsNOMk"
              title="Knitting for beginners: A Complete Introduction"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </section>

          <section id="video-title">
            {/* tutorial video title text */}
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

          {/* credit for YT video */}
          <p>Credit: @RJ Knits on YouTube</p>
        </div>
      </section>
    </section>
  );
}

export default Home;
