import React from "react";

function Knitting101() {
  const openTutorialTab = (tabName) => {
    var i, tabcontent, tablinks;
    // keep track of the current scroll position
    const scrollPosition = window.scrollY;
    // get tab content's class name
    tabcontent = document.getElementsByClassName("tabcontent");

    // initially hide all tab contents by setting display to 'none'
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // get class name of tablinks
    tablinks = document.getElementsByClassName("tutorial-tab-links");

    for (i = 0; i < tablinks.length; i++) {
      // loop through tablinks and remove "active" from class name
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      if (
        // if there is a match between tablink match with the clicked tab
        tablinks[i] &&
        tablinks[i].getAttribute("onclick") &&
        tablinks[i].getAttribute("onclick").includes(tabName)
      ) {
        // add active to the matched tablink
        tablinks[i].classList.add("active");
      }
    }

    // change the matchd tablink's display to block
    document.getElementById(tabName).style.display = "block";
    window.scrollTo(0, scrollPosition);
  };

  return (
    <div id="body-style-dark">
      {/* body style with dark background */}
      <section className="general-main-content">
        {/* use general main content styling for knitting101 page*/}
        <section id="knitting101-title">
          {/* knitting101 title text */}
          <h2>New to knitting? Get started and learn!</h2>
        </section>

        <section id="divider"></section>

        <section id="video">
          {/* comprehensive tutorial video*/}
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
          {/* comprehensive tutorial video*/}
          <h3>Knitting for beginners: A Complete Introduction</h3>
          <a
            href="https://www.youtube.com/watch?v=p_R1UDsNOMk"
            target="_blank"
            rel="noreferrer"
            id="view-video-btn"
          >
            View Video
          </a>
        </section>
        <p>Credit: @RJ Knits on YouTube</p>

        <section id="divider"></section>

        <div className="stitches-tutorial-title">
          {/* stitches tutorial title*/}
          <h2>There's more! Check out these other short knitting videos</h2>
        </div>

        <div className="stitches-tutorial">
          {/* stitches tutorial section with tab links*/}
          <ul className="tab-links">
            <li>
              {/* for each tab, on click, pass event and tabname to openTutorialTab function */}
              {/* cast on tab */}
              <span
                className="tutorial-tab-links active"
                onClick={(event) => openTutorialTab("tutorial-video-co")}
              >
                Cast-on
              </span>
            </li>
            <li>
              {/* knit stitch tab */}
              <span
                className="tutorial-tab-links"
                onClick={(event) => openTutorialTab("tutorial-video-k")}
              >
                Knit Stitch
              </span>
            </li>
            <li>
              {/* purl stitch tab */}
              <span
                className="tutorial-tab-links"
                onClick={(event) => openTutorialTab("tutorial-video-p")}
              >
                Purl Stitch
              </span>
            </li>
            <li>
              {/* inc stitch tab */}
              <span
                className="tutorial-tab-links"
                onClick={(event) => openTutorialTab("tutorial-video-inc")}
              >
                Increases
              </span>
            </li>
            <li>
              {/* dec stitch tab */}
              <span
                className="tutorial-tab-links"
                onClick={(event) => openTutorialTab("tutorial-video-dec")}
              >
                Decreases
              </span>
            </li>
            <li>
              {/* bind-off stitch tab */}
              <span
                className="tutorial-tab-links"
                onClick={(event) => openTutorialTab("tutorial-video-bo")}
              >
                Bind-off
              </span>
            </li>
          </ul>

          {/* display video for each individual stitch tab */}
          <div className="video-container">
            <div id="tutorial-video-co" className="tabcontent active">
              <section id="video">
                {/* cast-on video */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Tw3lqx1UaDY"
                  title="How to Cast-on: Long-Tail Cast-on"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                {/* cast-on video title*/}
                <h3>Long-tail Cast-On (CO)</h3>
                <a
                  href="https://www.youtube.com/embed/Tw3lqx1UaDY"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                {/* cast-on video text*/}
                <p>Credit: @KnittingHelp.com on YouTube</p>
                <p>
                  The long tail cast on is a popular method used to begin
                  knitting projects. It creates a neat, stretchy edge and is
                  relatively easy to learn. A text explanation can be confusing
                  to read, therefore, please watch this knitting tutorial to
                  understand this cast on. Also, a good tip for this cast on is
                  to remember that when leaving a tail of yarn (the "long
                  tail"), the length should be approximately three times the
                  width of your project. It is better to overestimate the length
                  of the long tail.
                </p>
              </section>
            </div>

            <div id="tutorial-video-k" className="tabcontent">
              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/SPGIj-X_xw4"
                  title="The Knit Stitch (Continental Method)"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Knit Stitch (K)</h3>
                <a
                  href="https://www.youtube.com/embed/SPGIj-X_xw4"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @KnittingHelp.com on YouTube</p>
                <p>
                  This stitch is the 1 of 2 fundamental stitches knitters should
                  learn. To create a knit stitch, continental knitters will
                  first make sure the yarn is in the back of the work. Then, the
                  right needle is inserted into the front loop of the stitch
                  then the yarn is "picked" up and pulled in through the loop.
                </p>
              </section>
            </div>

            <div id="tutorial-video-p" className="tabcontent">
              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/LEkuYJyuqd4"
                  title="The Purl Stitch (Continental Style)"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Purl Stitch (P)</h3>
                <a
                  href="https://www.youtube.com/embed/LEkuYJyuqd4"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @KnittingHelp.com on YouTube</p>
                <p>
                  This is one of the fundamental stitches to learn for knitting.
                  To create a purl stitch with the continental method, the yarn
                  must first be placed in front of the work. Next, the right
                  needle is inserted through the front look of the next stitch
                  then the working yarn is wrapped around the right needle with
                  your left hand then the stitch is pulled through.
                </p>
              </section>
            </div>

            <div id="tutorial-video-inc" className="tabcontent">
              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/qCV0VC0Yim4"
                  title="Make One Right (m1r)"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Make One Right (M1R)</h3>
                <a
                  href="https://www.youtube.com/embed/qCV0VC0Yim4"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @theknitwitch on YouTube</p>
                <p>
                  Make one right is a right leaning increase. It is a neat and
                  insivible increase but can be difficult to work. To make one
                  right, we first lift the bar between the stitches from back to
                  front with the right needle, and place it on the left needle.
                  Then we knit into the front loop of the lifted bar.
                </p>
              </section>

              <section id="divider"></section>

              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/zmUSinUjZbE"
                  title="Make One Left"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Make One Left (M1L)</h3>
                <a
                  href="https://www.youtube.com/embed/zmUSinUjZbE"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @theknitwitch on YouTube</p>
                <p>
                  Make one left is a left learning increase. Using the right
                  needle, lift the bar between the stitches from front and back
                  and place it on the left needle, then knit into the back loop
                  of the lifted bar.
                </p>
              </section>

              <section id="divider"></section>

              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/ScnEIEu3-Ks"
                  title="How to Knit a Yarn Over (Continental Method)"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Yarn Over (YO)</h3>
                <a
                  href="https://www.youtube.com/embed/ScnEIEu3-Ks"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @KnittingHelp.com on YouTube</p>
                <p>
                  This type of increase creates a hole in the knitted work. It
                  is essential to learn for lace patterns. When performing a
                  yarn over, the yarn needs to be brought to the front between
                  the needles then without knitting into the next stitch, simply
                  wrap the working yarn over the right-hand needle towards the
                  back.
                </p>
              </section>
            </div>

            <div id="tutorial-video-dec" className="tabcontent">
              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Lx8BySRLlAE"
                  title="K2TOG for Beginners - Easy Decrease for Beginner Knitters"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Knit Two Together (K2TOG)</h3>
                <a
                  href="https://www.youtube.com/embed/Lx8BySRLlAE"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @The Blue Mouse Knits on YouTube</p>
                <p>
                  Knit two together is a neat looking decrease that leans to the
                  right. Its name instructs how one would execute this stitch
                  ...simply knit two stitches together as though they were a
                  single stitch.
                </p>
              </section>

              <section id="divider"></section>

              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Cg1ykku04is"
                  title="Knitting Help - ssk, or slip-slip-knit"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Slip Slip Knit (SSK)</h3>
                <a
                  href="https://www.youtube.com/embed/Cg1ykku04is"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @VeryPink Knits on YouTube</p>
                <p>
                  Slip slip knit is a left learning decrease. To execute, simply
                  slip two stitches as if to knit then insert left needle
                  through the front loops of the slipped stitches then knit them
                  together through the back loops. An improved version of SSK
                  will slip one stitch as if to knit, then slip the next as if
                  to purl, then knit them together through the back loops. This
                  version lays slightly flatter and looks more similar to k2tog
                  so some may prefer this method.
                </p>
              </section>
            </div>

            <div id="tutorial-video-bo" className="tabcontent">
              <section id="video">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/VSwjIUiQZlM"
                  title="How to BIND OFF Knitting for Total Beginners"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </section>
              <section id="video-title">
                <h3>Bind Off (BO)</h3>
                <a
                  href="https://www.youtube.com/embed/Cg1ykku04is"
                  target="_blank"
                  rel="noreferrer"
                  id="view-video-btn"
                >
                  View Video
                </a>
              </section>
              <section id="stitch-tutorial-text">
                <p>Credit: @Sheep & Stitch on YouTube</p>
                <p>
                  To do a simple knit bind off, knit two stitches then using the
                  left needle, insert through the front loop of the first sttich
                  then pass it over the second. A pattern may call to bind off
                  in pattern which means to continue working in pattern and for
                  every two stitches worked, pass the first stitch over the
                  second. For example, to bind off in pattern for 1x1 rib, you
                  may knit one stitch, purl the next, then pass the knit stitch
                  over the purl stitch.
                </p>
              </section>
            </div>
          </div>
        </div>
        <section id="divider"></section>
      </section>
    </div>
  );
}

export default Knitting101;
