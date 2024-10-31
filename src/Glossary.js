import React from "react";

function Glossary() {
  return (
    <section id="body-style-dark">
      <section className="general-main-content">
        <section id="glossary-intro">
          {/* Glossary page title */}
          <h2>Glossary for Knitting Abbreviations</h2>
        </section>

        <section id="divider"></section>

        <section id="glossary">
          {/* Glossary section */}
          <div className="glossary-term">
            {/* Glossary term and its meaning or description*/}
            <h3>
              <strong>StSt</strong>
            </h3>
            <p>Stockinette.</p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>CO</strong>
            </h3>
            <p>Cast on.</p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>K</strong>
            </h3>
            <p>Knit stitch.</p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>P</strong>
            </h3>
            <p>Purl stitch.</p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>K2Tog</strong>
            </h3>
            <p>
              Knit two stitches together as though they were a single stitch.
              This makes a right leaning decrease.
            </p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>SSK</strong>
            </h3>
            <p>
              Slip slip knit. Slip two stitches as if to knit. Insert left
              needle through the front loops of the slipped stitches then knit
              them together. This makes a left leaning decrease.
            </p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>M1R</strong>
            </h3>
            <p>
              Make one right. Using the left needle, lift the bar between the
              stitches from back to front and place it on the left needle, then
              knit into the front loop of the lifted bar. <br></br>
              This makes a right leaning increase.
            </p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>M1L</strong>
            </h3>
            <p>
              Make one left. Using the right needle, lift the bar between the
              stitches from front and back and place it on the left needle, then
              knit into the back loop of the lifted bar.<br></br>
              This makes a left leaning increase.
            </p>
          </div>
          <div className="glossary-term">
            <h3>
              <strong>BO</strong>
            </h3>
            <p>Bind off.</p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Glossary;
