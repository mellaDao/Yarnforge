import React from "react";

function About() {
  return (
    <body id="body-style1">
      <section className="general-main-content">
        <section id="about-yarnforge">
          {/* about YarnForge text*/}
          <h2>About YarnForge.com</h2>
          <p>
            Yarnforge.com is a knitting pattern generator site made as a student
            project. This is the first version of YarnForge.com, where Mella
            developed this website in PHP and created the 3D models in Blender.
            Regardless of your knitting experience, I hope to provide the tools
            and resources you need to create your knitting design.
          </p>
        </section>

        <section id="divider"></section>

        {/* about mella text */}
        <section id="about-mella">
          <h2>About Mella</h2>
          <p>
            Hey there! I'm Mella and I've been knitting for a few years. I may
            not be the best knitter or designer, but I wanted to try my hand at
            creating a website to make knitting patterns. I see this project as
            a way to document my journey, and I hope this website will reflect
            the growth of both my knowledge with web development and knitting.
          </p>
          <p>
            In the future, I hope to make a more flexible pattern generator by
            adding more design options and different construction methods.
          </p>
        </section>
      </section>
    </body>
  );
}

export default About;
