import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import NewPatternSizeTab from "./NewPatternSizeTab";
import NewPatternClothingTypeTab from "./NewPatternClothingTypeTab";
import NewPatternSleevesTab from "./NewPatternSleevesTab";
import NewPatternStitchTab from "./NewPatternStitchTab";
import NewPatternDescriptionTab from "./NewPatternDescriptionTab";
import NewPatternNecklineTab from "./NewPatternNecklineTab";
import NewPatternTabs from "./NewPatternTabs";
import { useNavigate } from "react-router-dom";

function NewPattern() {
  const navigate = useNavigate();

  // define state variables for each form option
  const [formData, setFormData] = useState({
    clothingType: "Sweater",
    necklineType: "",
    sleeveType: "",
    sleeveLength: "long",
    size: "xs",
    fitting: "",
    yarnWeight: "",
    ribStitches: "",
    ribWidth: "",
    ribRows: "",
    ribLength: "",
    ribNeedleSize: "4",
    ststStitches: "",
    ststWidth: "",
    ststRows: "",
    ststLength: "",
    ststNeedleSize: "4.5",
    garmentName: "",
    createdFor: "",
    notes: "",
  });

  const [activeTabName, setActiveTabName] = useState("clothing-type");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeImageButtons, setActiveImageButtons] = useState({
    clothingType: "Sweater",
    necklineType: "V-neck",
    sleeveType: "Bishop Sleeves",
  });

  const openPatternTab = (tabName, tabIndex) => {
    setActiveTabName(tabName);
    setActiveTabIndex(tabIndex);
  };

  // function to handle changes in the size dropdown
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const toggleImageButton = (e) => {
    const { value, dataset } = e.currentTarget;
    const type = dataset.type; // (clothingType, necklineType, or sleeveType)

    // update the state
    setActiveImageButtons({
      ...activeImageButtons,
      [type]: value, // use the data type to update the correct state
    });
  };

  function prevTab() {
    setActiveTabIndex(activeTabIndex - 1);
  }

  function nextTab() {
    setActiveTabIndex(activeTabIndex + 1);
  }

  // on form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      clothingType,
      necklineType,
      sleeveType,
      sleeveLength,
      size,
      fitting,
      yarnWeight,
      ribStitches,
      ribWidth,
      ribRows,
      ribLength,
      ribNeedleSize,
      ststStitches,
      ststWidth,
      ststRows,
      ststLength,
      ststNeedleSize,
      garmentName,
      createdFor,
      notes,
    } = formData;

    // get bust circumference based on size input
    function getBustsize(size) {
      let num = 0;
      switch (size) {
        case "xs":
          num = 32;
          break;
        case "s":
          num = 34;
          break;
        case "m":
          num = 38;
          break;
        case "l":
          num = 40;
          break;
        case "xl":
          num = 42;
          break;
        case "2xl":
          num = 46;
          break;
        case "3xl":
          num = 50;
          break;
        default:
          break;
      }
      return num;
    }

    // determine length multiplier based on size input (add to total sweater length for increasing sizes)
    function getLengthMultipler(size) {
      let num;
      switch (size) {
        case "xs":
          num = 1;
          break;
        case "s":
          num = 2;
          break;
        case "m":
          num = 3;
          break;
        case "l":
          num = 4;
          break;
        case "xl":
          num = 5;
          break;
        case "2xl":
          num = 6;
          break;
        case "3xl":
          num = 7;
          break;
        default:
          break;
      }
      return num;
    }

    // get numerical length of sleeves
    function getSleeveLength(sleeveLength) {
      let num;
      switch (sleeveLength) {
        case "long":
          num = 60;
          break;
        case "3/4 length":
          num = 45;
          break;
        case "half":
          num = 30;
          break;
        case "short":
          num = 15;
          break;
        default:
          break;
      }
      return num;
    }

    // get numerical length of sweater
    function getSweaterLength(sizeLengthMultiplier, fitting) {
      let num = 0;
      switch (fitting) {
        case "Petite":
          num = 56 + sizeLengthMultiplier * 2;
          break;
        case "Regular":
          num = 60 + sizeLengthMultiplier * 2;
          break;
        case "Long":
          num = 64 + sizeLengthMultiplier * 2;
          break;
        default:
          break;
      }
      return num;
    }

    // calculate number of stitches to cast on for body
    function calculateCastOn(bustSizeNum, ribStitches, ribWidth) {
      let num = 0;
      const stitchLength = ribStitches / ribWidth;
      num = Math.ceil(stitchLength * bustSizeNum);
      return num;
    }

    // calculate number of stitches for stst
    function calculateStst(bustSizeNum, ststStitches, ststWidth) {
      let num = 0;
      const stitchLength = ststStitches / ststWidth;
      num = Math.ceil(stitchLength * bustSizeNum);
      return num;
    }

    function calculateDecFromRib(numStitches, castOn) {
      let decs = 0;
      decs = Math.abs(numStitches - castOn);
      decs = Math.round(decs);
      return decs;
    }

    function calculateFrontInstructions(
      necklineType,
      necklineStart,
      necklineBO,
      necklineEnd,
      sweaterLengthNum
    ) {
      let instructions = "";
      let roundDecreases, roundDecreasesSlow, roundDecreasesRowsSlow;

      if (necklineBO % 2 === 1) {
        roundDecreases = Math.round(necklineBO / 4);
        roundDecreasesSlow = Math.round(necklineBO / 4);
        roundDecreasesRowsSlow = Math.round(roundDecreases * 2);
      } else {
        roundDecreases = Math.round(necklineBO / 4);
        roundDecreasesSlow = Math.round(necklineBO / 4) - 1;
        roundDecreasesRowsSlow = Math.round(roundDecreases * 2);
      }

      let deepNeckLength = sweaterLengthNum - 10;
      let normalNeckLength = sweaterLengthNum - 5;
      let fullLength = sweaterLengthNum;
      let vneckDecreases = Math.round(necklineBO / 2);

      // Switch case based on the neckline type
      switch (necklineType) {
        case "Round-neck":
          instructions = `
                Work in stst until front piece measures ${normalNeckLength} cm, ending on WS.<br><br>
    
                Shape the neckline by working ${necklineStart} stitches in stst, BO the next ${necklineBO} stitches and work the next ${necklineStart} stitches.
                Each shoulder will be worked separately. Place ${necklineStart} stitches on a stitch holder.
                Each side will have ${necklineStart} stitches remaining.<br><br>
    
                For the left shoulder, decrease ${roundDecreasesSlow} stitches with M1R at the neck edge evenly across ${roundDecreasesRowsSlow} rows.
                Then decrease ${roundDecreases} stitches with M1R at the neck edge every row for ${roundDecreases} rows.<br><br>
                For the right shoulder, decrease ${roundDecreasesSlow} stitches with M1L at the neck edge evenly across  ${roundDecreasesRowsSlow} rows.
                Then decrease ${roundDecreases} stitches with M1L at the neck edge every row for ${roundDecreases} rows.<br><br>
    
                Bind off the remaining ${necklineEnd} stitches on each side.<br>
                `;
          break;
        case "Deep round-neck":
          instructions = `
                Work in stst until front piece measures ${deepNeckLength} cm, ending on WS.<br><br>
    
                Shape the neckline by working ${necklineStart} stitches in stst, BO the next ${necklineBO} stitches and work the next ${necklineStart} stitches.
                Each shoulder will be worked separately. Place ${necklineStart} stitches on a stitch holder.
                Each side will have ${necklineStart} stitches remaining.<br><br>
    
                For the left shoulder, decrease ${roundDecreasesSlow} stitches with M1R at the neck edge evenly across ${roundDecreasesRowsSlow} rows.
                Then decrease ${roundDecreases} stitches with M1R at the neck edge every row for ${roundDecreases} rows.<br><br>
                For the right shoulder, decrease ${roundDecreasesSlow} stitches with M1L at the neck edge evenly across  ${roundDecreasesRowsSlow} rows.
                Then decrease ${roundDecreases} stitches with M1L at the neck edge every row for ${roundDecreases} rows.<br><br>
    
                Continue working in stst until front measures ${fullLength} cm, ending on WS.
                Bind off the remaining ${necklineEnd} stitches on each side.<br>
    
                `;
          break;
        case "V-neck":
          instructions = `
                Work in stst until front piece measures ${normalNeckLength} cm, ending on WS.<br><br>
    
                Shape the neckline by working ${necklineStart} stitches in stst, BO the next ${necklineBO} stitches and work the next ${necklineStart} stitches.
                Each shoulder will be worked separately. Place ${necklineStart} stitches on a stitch holder.
                Each side will have ${necklineStart} stitches remaining.<br><br>
    
                For the left shoulder, decrease ${vneckDecreases} stitches with M1R at the neck edge of the next ${vneckDecreases} rows.
                For the right shoulder, decrease ${vneckDecreases} stitches with M1L at the neck edge of the next ${vneckDecreases} rows.
                Continue working in stst until front measures ${fullLength} cm, ending on WS.
                Bind off the remaining ${necklineEnd} stitches on each side.<br>
                `;
          break;
        case "Deep V-neck":
          instructions = `
                Work in stst until front piece measures ${deepNeckLength} cm, ending on WS.<br><br>
    
                Shape the neckline by working ${necklineStart} stitches in stst, BO the next ${necklineBO} stitches and work the next ${necklineStart} stitches.
                Each shoulder will be worked separately. Place ${necklineStart} stitches on a stitch holder.
                Each side will have ${necklineStart} stitches remaining.<br><br>
    
                For the left shoulder, decrease ${vneckDecreases} stitches with M1R at the neck edge of the next ${vneckDecreases} rows.
                For the right shoulder, decrease ${vneckDecreases} stitches with M1L at the neck edge of the next ${vneckDecreases} rows.
                Continue working in stst until front measures ${fullLength} cm, ending on WS.
                Bind off the remaining ${necklineEnd} stitches on each side.<br>
                `;
          break;
        case "Square-neck":
          instructions = `
                Work in stst until front measures ${deepNeckLength} cm, ending on WS.<br>
                Begin working the neckline by first working ${necklineStart} stitches in stst, bind off the next ${necklineBO} stitches then work the remaining ${necklineStart} stitches.<br><br>
                
                ${necklineStart} stitches remain on each side.<br><br>
    
                Each shoulder will be worked separately. Place ${necklineStart} stitches on separate needles or a piece of scrap yarn.<br>
                For each side, work in stst until front measures ${fullLength} cm, ending on WS then BO ${necklineStart} stitches.<br>
                `;
          break;
        case "Straight-neck":
          instructions = `
                Work in stst until front measures ${fullLength} cm, ending on WS.<br>
                `;
          break;
        default:
          instructions =
            "No instructions available for the selected neckline type.";
          break;
      }

      return instructions;
    }

    /*
        Sizes: XS, S, M, L, XL, 2XL, 3XL
        Finished Chest Measurement: 32,  34,  38,  40,  42,  46,  50
        Wrist measurements:        13.5, 14, 14.5, 15, 15.5, 16, 16.5
        */
    // Determine size based on finished chest measurement
    function getWristCircumference(bustSizeNum) {
      let num = 0;
      switch (bustSizeNum) {
        case "xs":
          num = 13.5;
          break;
        case "s":
          num = 14;
          break;
        case "m":
          num = 14.5;
          break;
        case "l":
          num = 15;
          break;
        case "xl":
          num = 15.5;
          break;
        case "2xl":
          num = 16;
          break;
        case "3xl":
          num = 16.5;
          break;
        default:
          break;
      }
      return num;
    }

    // calculate number of stitches to cast on for sleeves
    function calculateCastOnSleeves(
      wristCircumferenceNum,
      ribStitches,
      ribWidth
    ) {
      let num = 0;
      let stitchLength = ribStitches / ribWidth;
      num = Math.ceil(wristCircumferenceNum / stitchLength);
      return num;
    }

    // calculate armhole circumference: (cm) = BUST/6 + 3.5 to 6 cm.
    function getArmholeCircumference(bustSizeNum, sleeveType) {
      let num = 0;
      switch (sleeveType) {
        case "Drop sleeves":
          num = bustSizeNum / 6 + 3.5;
          break;
        case "Puff Sleeves":
          num = bustSizeNum / 6 + 6;
          break;
        case "Bishop Sleeves":
          num = bustSizeNum / 6 + 3.5;
          break;
        default:
          break;
      }
      return num;
    }

    // calculate sleeve instructions
    function calculateSleeveInstructions(
      sleeveType,
      sleeveLengthNum,
      castOnSleeves,
      ststStitches,
      ststWidth,
      armholeCircumferenceNum
    ) {
      let numStitchesArmhole = 0;
      let numIncreases = 0;
      let instructions = "";

      // calculate stitch length
      const stitchLength = ststStitches / ststWidth;

      // calculate number of stitches for armhole
      numStitchesArmhole = Math.ceil(armholeCircumferenceNum / stitchLength);

      // calculate number of increases
      numIncreases = Math.round(Math.abs(numStitchesArmhole - castOnSleeves));
      const puffStitches = Math.round(numStitchesArmhole * 1.25);
      const bishopStartDec = Math.round(sleeveLengthNum * 0.5);

      // switch case based on the sleeve type
      switch (sleeveType) {
        case "Drop sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${numStitchesArmhole} stitches.<br>
                Work until sleeve length measures ${sleeveLengthNum} cm.<br>
                Bind off ${numStitchesArmhole} stitches.<br>
                `;
          break;
        case "Puff Sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${puffStitches} stitches.<br>
                Work until sleeve length measures ${sleeveLengthNum} cm.<br>
                Bind off ${puffStitches} stitches.<br>
                `;
          break;
        case "Bishop Sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${puffStitches} stitches.<br>
                Work until sleeve length measures ${bishopStartDec} cm.<br>
                Decrease evenly until piece measures ${sleeveLengthNum} cm.<br>
                Bind off ${numStitchesArmhole} stitches.<br>
                `;
          break;
        default:
          instructions =
            "No instructions available for the selected sleeve type.";
          break;
      }
      return instructions;
    }

    function calculateNeckbandInstructions(necklineType) {
      let instructions = "";
      // Switch case based on the neckline type
      switch (necklineType) {
        case ("Round-neck", "Deep round-neck"):
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Work in 1x1 rib until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case ("V-neck", "Deep V-neck"):
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Put in one stitch marker at the bottom of the v-neck.<br>
                Work in 1x1 rib.<br>
                At the same time, M1L before the stitch marker and M1R after the stitch marker.<br>
                Continue until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case "Square-neck":
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Put in two stitch markers: 1 at the left corner and 1 at the right corner of the square neckline.<br>
                Work in 1x1 rib.<br>
                At the same time, M1L before a stitch marker and M1R after a stitch marker.<br>
                Continue until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case "Straight-neck":
          instructions = "";
          break;
        default:
          instructions =
            "No instructions available for the selected neckline type.";
          break;
      }
      return instructions;
    }

    let patternParameters = "";

    // Concatenate parameter values into the patternParameters string
    patternParameters += "Clothing Type: " + clothingType + "<br>";
    patternParameters += "Neckline Type: " + necklineType + "<br>";
    patternParameters += "Sleeve Type: " + sleeveType + "<br>";
    patternParameters += "Sleeve Length: " + sleeveLength + "<br>";
    patternParameters += "Fitting: " + fitting + "<br>";
    patternParameters += "Size: " + size + "<br>";
    patternParameters += "Yarn Weight: " + yarnWeight + "<br>";
    patternParameters += "Rib Stitches: " + ribStitches + "<br>";
    patternParameters += "Rib Width: " + ribWidth + "<br>";
    patternParameters += "Rib Rows: " + ribRows + "<br>";
    patternParameters += "Rib Length: " + ribLength + "<br>";
    patternParameters += "Rib Needle Size: " + ribNeedleSize + "<br>";
    patternParameters +=
      "Stockinette Stitch Stitches: " + ststStitches + "<br>";
    patternParameters += "Stockinette Stitch Width: " + ststWidth + "<br>";
    patternParameters += "Stockinette Stitch Rows: " + ststRows + "<br>";
    patternParameters += "Stockinette Stitch Length: " + ststLength + "<br>";
    patternParameters +=
      "Stockinette Stitch Needle Size: " + ststNeedleSize + "<br>";
    patternParameters += "Garment Name: " + garmentName + "<br>";
    patternParameters += "Created For: " + createdFor + "<br>";
    patternParameters += "Notes: " + notes;

    // calculate bust circumference and set text
    let bustSizeNum = getBustsize(size);
    let bustSizeText = `
    <span class='pattern-label'>Size:</span> ${size}<br>
    <span class='pattern-label'>Finished bust:</span> ${bustSizeNum} cm<br>
    `;

    // calculate sleeve length and set text
    let sleeveLengthNum = getSleeveLength(sleeveLength);
    let sleeveLengthText = `<span class='pattern-label'>Sleeve Length:</span> ${sleeveLength} (${sleeveLengthNum} cm)<br>`;

    // calculate sweater length set text
    let lengthMultiplier = getLengthMultipler(size);
    let sweaterLengthNum = getSweaterLength(lengthMultiplier, fitting);
    let sweaterLengthText = `<span class='pattern-label'>Total length:</span> ${fitting.toLowerCase()} (${sweaterLengthNum} cm)<br>`;

    // calculate the number of stitches to cast on using ribbing gauge
    let castOn = calculateCastOn(bustSizeNum, ribStitches, ribWidth);

    // calculate the number of stitches for stockinette
    let numStitches = Math.round(
      calculateStst(bustSizeNum, ststStitches, ststWidth)
    );

    // calculate when to begin working on neckline
    let necklineStart = Math.round(numStitches / 3);

    // calculate number of stitches to bind off
    let necklineBO = numStitches - necklineStart * 2;

    // calculate number of total rows for neckline before binding off
    let necklineEnd = necklineStart - 6;

    // calculate number of stitches to decrease to match stst and ribbing gauge
    let decsFromRib = calculateDecFromRib(numStitches, castOn);

    // calculate front instructions
    let frontInstructions = calculateFrontInstructions(
      necklineType,
      necklineStart,
      necklineBO,
      necklineEnd,
      sweaterLengthNum
    );

    // calculate circumference of sleeve
    let wristCircumferenceNum = getWristCircumference(bustSizeNum);

    // calculate number of stitches to cast on for sleeves
    let castOnSleeves = calculateCastOnSleeves(
      wristCircumferenceNum,
      ribStitches,
      ribWidth,
      ribRows
    );

    // calculate armhole circumference in cm
    let armholeCircumferenceNum = getArmholeCircumference(
      bustSizeNum,
      sleeveType
    );

    // calculate sleeve instructions
    let sleeveInstructions = calculateSleeveInstructions(
      sleeveType,
      sleeveLengthNum,
      castOnSleeves,
      ststStitches,
      ststWidth,
      ststRows,
      armholeCircumferenceNum
    );

    // calculate neckband instrctions
    let neckbandInstructions = calculateNeckbandInstructions(necklineType);
    let backLength = sweaterLengthNum - 5;

    let measurements =
      "<h2>Measurements</h2><br>" +
      bustSizeText +
      sleeveLengthText +
      sweaterLengthText +
      "<hr>";

    // Materials
    let materials = `
    <h2>Materials</h2><br>
    <span class='pattern-label'>Body:</span> ${ststNeedleSize} mm knitting needles<br>
    <span class='pattern-label'>Ribbing:</span> ${ribNeedleSize} mm knitting needles<br>
    <span class='pattern-label'>Yarn:</span> 500g of ${yarnWeight} weight yarn<hr>
  `;

    // Gauge
    let gauge = `
      <h2>Gauge</h2><br>
      Stockinette Stitch (Main):<br>
      ${ststStitches} stitches and ${ststRows} rows will create a ${ststLength} x ${ststWidth} cm swatch using ${ststNeedleSize} knitting needles<br><br>
      1x1 Rib Stitch (Rib):<br>
      ${ribStitches} stitches and ${ribRows} rows will create a ${ribLength} x ${ribWidth} cm swatch using ${ribNeedleSize} knitting needles<hr>
    `;

    // Stitching Glossary
    let stitchGlossary = `
      <h2>Stitching Glossary</h2><br>
      <b>Stockinette Stitch:</b><br>
      Row 1: K#.<br>
      Row 2: P#.<br>
      Repeat rows 1 and 2 for pattern.<br><br>

      <b>1x1 Rib Stitch:</b><br>
      Row 1: *k1, p1* to the end of the row<br>
      Repeat row 1 for pattern.<br><br>
      <hr>
    `;

    // Knitting Instructions
    let knittingInstructions = `
      <h2>Knitting Instructions</h2><br>

      <h3>Back of Sweater</h3>
      <b>Rib:</b><br>
      Using size ${ribNeedleSize} needles, cast on ${castOn} stitches.<br>
      Work in 1x1 rib stitch until ribbing measures 4cm.<br><br>

      <b>Main:</b><br>
      Change to size ${ststNeedleSize} needles.<br><br>
      For the first row, decrease ${decsFromRib} times evenly while working stst.
      Continue working in stst until back piece measures ${backLength} cm. End on wrong side.<br><br>
      Each shoulder will be worked separately. To shape the neckline, K ${necklineStart} stitches then BO ${necklineBO} stitches.
      Place the remaining ${necklineStart} stitches on separate needles or a piece of scrap yarn. For each side of the neck, BO 6 stitches at the beginning of the next 6 rows.<br><br>
      Bind off the remaining ${necklineEnd} stitches.<br><br>

      <h3>Front of Sweater</h3>
      <b>Rib:</b><br>
      Using size ${ribNeedleSize} needles, cast on ${castOn} stitches.<br>
      Work in 1x1 rib stitch until back piece measures 4cm.<br><br>

      <b>Main:</b><br>
      Change to size ${ststNeedleSize} needles.<br><br>
      ${frontInstructions}<br>
      Sew front and back pieces together.<br><br>

      <h3>Sleeves</h3>
      <b>Rib:</b><br>
      Using size ${ribNeedleSize} needles, cast on ${castOnSleeves} stitches.<br>
      Work in 1x1 rib stitch until sleeve measures 4cm.<br><br>

      <b>Main:</b><br>
      Change to size ${ststNeedleSize} needles.<br>
      ${sleeveInstructions}<br><br>

      <h3>Neckband</h3>
      ${neckbandInstructions}<br><br>

      <h3>Finishing</h3>
      Sew sleeves in position.<br>
      Weave in any loose ends.<br>
      Block the pieces.<br><br>
    `;

    // Combine all the strings
    let patternContent =
      measurements + materials + gauge + stitchGlossary + knittingInstructions;

    navigate("/viewPattern", {
      state: { patternContent, patternParameters },
    });
  };

  return (
    <section>
      <NewPatternTabs
        activeTabName={activeTabName}
        openPatternTab={openPatternTab}
      />

      <div className="navigation-buttons">
        <button id="reset-controls-btn">Reset Controls</button>

        <button
          id="backButton"
          style={{
            display: activeTabIndex === 0 ? "none" : "block",
          }}
          onClick={prevTab}
        >
          Back
        </button>
        <button
          id="nextButton"
          style={{
            display: activeTabIndex === 5 ? "none" : "block",
          }}
          onClick={nextTab}
        >
          Next
        </button>
      </div>

      <form id="pattern-form" onSubmit={handleSubmit}>
        <div className="pattern-container">
          <ThreeScene
            formData={formData}
            activeImageButtons={activeImageButtons}
          />
          <div className="right-panel">
            <NewPatternClothingTypeTab
              activeTabName={activeTabName}
              activeImageButtons={activeImageButtons}
              toggleImageButton={toggleImageButton}
            />
            <NewPatternNecklineTab
              activeTabName={activeTabName}
              activeImageButtons={activeImageButtons}
              toggleImageButton={toggleImageButton}
            />
            <NewPatternSleevesTab
              activeTabName={activeTabName}
              activeImageButtons={activeImageButtons}
              handleChange={handleChange}
              toggleImageButton={toggleImageButton}
            />
            <NewPatternSizeTab
              activeTabName={activeTabName}
              handleChange={handleChange}
            />
            <NewPatternStitchTab
              formData={formData}
              activeTabName={activeTabName}
              handleChange={handleChange}
            />
            <NewPatternDescriptionTab
              formData={formData}
              activeTabName={activeTabName}
              handleChange={handleChange}
            />
          </div>
          <input
            type="hidden"
            id="clothing-type-input"
            name="clothing-type"
            value={activeImageButtons.clothingType}
          />
          <input
            type="hidden"
            id="neckline-type-input"
            name="neckline-type"
            value={activeImageButtons.necklineType}
          />
          <input
            type="hidden"
            id="sleeve-type-input"
            name="sleeve-type"
            value={activeImageButtons.sleeveType}
          />
        </div>
        <section id="divider"></section>
        <div className="submit-button">
          <button type="submit">
            <h2>Submit</h2>
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewPattern;
