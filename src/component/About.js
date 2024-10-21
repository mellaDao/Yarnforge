import React from "react";

function About() {
  return (
    <body id="body-style1">
      <section className="general-main-content">
        <section id="about-yarnforge">
          {/* Simple header and paragraph about YarnForge */}
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

        {/* Simple header and paragraph about the website creator */} 
        <section id="about-mella">
          <h2>About Mella</h2>
          <p>
            Hey there. I'm Mella and I've been knitting for about a year and a
            half. In comparison to many of my fellow knitters in the the fiber
            arts community, I'm probably a young sprout in terms of experience.
            Regardless, I've been really enjoying taking my time to learn this
            craft in my free time. I may not be the best knitter or designer,
            but I wanted to try my hand at creating a website to make knitting
            patterns. I see this project as a way to document my journey, and I
            hope this website will reflect the growth of both my knowledge with
            web development and knitting.
          </p>
          <p>
            In the future, I hope to make a more flexible pattern generator by
            adding more design options and different construction methods. I
            strictly knit in only continental style but I'd like to learn
            English and combination style in the future so that I can record
            knitting tutorial videos and add them to the website.
          </p>
        </section>
      </section>
    </body>
  );
}

export default About;
