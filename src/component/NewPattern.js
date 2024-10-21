import React, { useState } from "react";
import ThreeScene from "./ThreeScene";
import { useNavigate } from "react-router-dom";

function NewPattern() {
  const navigate = useNavigate();
  // Define state variables for each dropdown
  const [size, setSize] = useState("xs");
  const [stStNeedleSize, setStStNeedleSize] = useState("4.5");
  const [ribNeedleSize, setRibNeedleSize] = useState("4");

  // Function to handle changes in the size dropdown
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  // Function to handle changes in the neckline dropdown
  const handleStStNeedleChange = (event) => {
    setStStNeedleSize(event.target.value);
  };

  // Function to handle changes in the neckline dropdown
  const handleRibNeedleChange = (event) => {
    setRibNeedleSize(event.target.value);
  };

  var activeButtons = {};

  function toggleImageButton(button) {
    // Toggle the active class for the clicked button
    button.classList.toggle("active");
    // Get parent group
    var buttonGroup = button.parentElement;
    // Remove the active class from other buttons
    var buttons = buttonGroup.querySelectorAll(".image-button");

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] !== button) {
        buttons[i].classList.remove("active");
        buttons[i].style.color = ""; // Reset background color
        delete activeButtons[buttons[i].id];
      }
    }

    if (button.classList.contains("active")) {
      button.style.color = "#009c7a"; // Change background color to blue
      activeButtons[button.id] = true;
    } else {
      button.style.color = ""; // Reset background color
      delete activeButtons[button.id];
    }

    var inputId = button.id.replace(/-button\d+$/, "-input");
    var inputValue = button.classList.contains("active") ? button.value : "";
    document.getElementById(inputId).value = inputValue;
  }

  function setButtonStates() {
    var buttons = document.getElementsByClassName("image-button");
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (activeButtons[button.id]) {
        button.classList.add("active");
        button.style.color = "#009c7a";
      } else {
        button.classList.remove("active");
        button.style.color = "";
      }
    }
  }

  var currentTab = 0;

  function openPatternTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("pattern-tab-links"); // Ensure it matches the class name
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      tablinks[i].style.backgroundColor = "#6E48D5";
      if (tablinks[i].dataset.tab === tabName) {
        currentTab = i;
        tablinks[i].classList.add("active");
        tablinks[i].style.backgroundColor = "#009c7a";
      }
    }
    document.getElementById(tabName).style.display = "block";
    updateBackButtonVisibility();
    setButtonStates();
  }

  function prevTab() {
    if (typeof currentTab === "undefined") {
      currentTab = 0;
    }
    // Calculate the index of the previous tab
    var prevIndex =
      (currentTab - 1 + document.getElementsByClassName("tabcontent").length) %
      document.getElementsByClassName("tabcontent").length;
    // Call openPatternTab with the event and the tabName of the previous tab
    if (
      prevIndex === document.getElementsByClassName("tabcontent").length - 1 &&
      currentTab === 0
    ) {
      return;
    }

    openPatternTab(
      null,
      document
        .getElementsByClassName("pattern-tab-links")
        [prevIndex].getAttribute("onclick")
        .split("'")[1]
    );
  }

  function nextTab() {
    if (typeof currentTab === "undefined") {
      currentTab = 0;
    }
    // Calculate the index of the next tab
    var nextIndex =
      (currentTab + 1) % document.getElementsByClassName("tabcontent").length;
    // Call openPatternTab with the event and the tabName of the next tab
    if (
      nextIndex === 0 &&
      currentTab === document.getElementsByClassName("tabcontent").length - 1
    ) {
      return;
    }

    openPatternTab(
      null,
      document
        .getElementsByClassName("pattern-tab-links")
        [nextIndex].getAttribute("onclick")
        .split("'")[1]
    );
  }
  // Function to hide or show the back button based on the currentTab value
  function updateBackButtonVisibility() {
    const backButton = document.getElementById("backButton");
    if (currentTab === 0) {
      backButton.style.display = "none"; // Hide the back button
    } else {
      backButton.style.display = "block"; // Show the back button
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let clothingType = "",
      necklineType = "",
      sleeveType = "",
      sleeveLength = "",
      fitting = "",
      sizeDropdown = "",
      yarnWeight = "",
      ribStitches = "",
      ribWidth = "",
      ribRows = "",
      ribLength = "",
      ribNeedleSize = "",
      ststStitches = "",
      ststWidth = "",
      ststRows = "",
      ststLength = "",
      ststNeedleSize = "",
      garmentName = "",
      createdFor = "",
      notes = "";

    const sanitizeInput = (input) => {
      const element = document.createElement("div");
      element.innerText = input;
      return element.innerHTML;
    };

    const form = event.target;
    const formData = new FormData(form);

    formData.forEach((value, key) => {
      if (key.includes("clothing-type")) {
        clothingType = sanitizeInput(value);
      } else if (key.includes("neckline-type")) {
        necklineType = sanitizeInput(value);
      } else if (key.includes("sleeve-type")) {
        sleeveType = sanitizeInput(value);
      } else if (key.includes("sleeve-length")) {
        sleeveLength = sanitizeInput(value);
      } else if (key === "size-dropdown") {
        sizeDropdown = sanitizeInput(value);
      } else if (key.includes("fit")) {
        fitting = sanitizeInput(value);
      } else if (key === "yarn_weight") {
        yarnWeight = sanitizeInput(value);
      } else if (key === "rib_stitches") {
        ribStitches = sanitizeInput(value);
      } else if (key === "rib_width") {
        ribWidth = sanitizeInput(value);
      } else if (key === "rib_rows") {
        ribRows = sanitizeInput(value);
      } else if (key === "rib_length") {
        ribLength = sanitizeInput(value);
      } else if (key === "rib_needle_size") {
        ribNeedleSize = sanitizeInput(value);
      } else if (key === "stst_stitches") {
        ststStitches = sanitizeInput(value);
      } else if (key === "stst_width") {
        ststWidth = sanitizeInput(value);
      } else if (key === "stst_rows") {
        ststRows = sanitizeInput(value);
      } else if (key === "stst_length") {
        ststLength = sanitizeInput(value);
      } else if (key === "stst_needle_size") {
        ststNeedleSize = sanitizeInput(value);
      } else if (key === "garment_name") {
        garmentName = sanitizeInput(value);
      } else if (key === "created_for") {
        createdFor = sanitizeInput(value);
      } else if (key === "notes") {
        notes = sanitizeInput(value);
      }
    });
    /*
    console.log({
      clothingType,
      necklineType,
      sleeveType,
      sleeveLength,
      sizeDropdown,
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
    });
*/
    function calculateSweaterLength(fitting) {
      let length = 0;
      switch (fitting) {
        case "Petite":
          length = 45;
          break;
        case "Regular":
          length = 50;
          break;
        case "Tall":
          length = 55;
          break;
        default:
          break;
      }

      return length;
    }

    //32, 34, 38, 40, 42, 46, 50
    function getMeasurements(size, sleeveLength, fitting, sweaterLength) {
      let sizeText = "";
      let sleeveText = "";
      switch (size) {
        case "xs":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 32 cm<br>
                `;
          break;
        case "s":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 34 cm<br>
                `;
          break;
        case "m":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 38 cm<br>
                `;
          break;
        case "l":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 40 cm<br>
                `;
          break;
        case "xl":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 42 cm<br>
                `;
          break;
        case "2xl":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 46 cm<br>
                `;
          break;
        case "3xl":
          sizeText = `
                <span class='pattern-label'>Size:</span> ${size}<br>
                <span class='pattern-label'>Finished bust:</span> 50 cm<br>
                `;
          break;
        default:
          break;
      }

      switch (sleeveLength) {
        case "long":
          sleeveText =
            "<span class='pattern-label'>Sleeve Length:</span> long (60 cm)<br>";
          break;
        case "3/4 length":
          sleeveText =
            "<span class='pattern-label'>Sleeve Length:</span> 3/4 length (45 cm)<br>";
          break;
        case "half":
          sleeveText =
            "<span class='pattern-label'>Sleeve Length:</span> half (30 cm)<br>";
          break;
        case "short":
          sleeveText =
            "<span class='pattern-label'>Sleeve Length:</span> short (15 cm)<br>";
          break;
        default:
          break;
      }

      const sweaterLengthText = `<span class='pattern-label'>Total length:</span> ${sweaterLength} cm<br>`;

      return sizeText + sleeveText + sweaterLengthText;
    }

    function calculateCastOn(size, ribStitches, ribWidth, ribRows) {
      let numStitches = 0;
      const stitchLength = ribStitches / ribWidth;
      /*
        Sizes: XS, S, M, L, XL, 2XL, 3XL
        Finished Chest Measurement: 32, 34, 38, 40, 42, 46, 50
        */
      // Determine size based on finished chest measurement
      switch (size) {
        case "xs":
          numStitches = stitchLength * 32;
          break;
        case "s":
          numStitches = stitchLength * 34;
          break;
        case "m":
          numStitches = stitchLength * 38;
          break;
        case "l":
          numStitches = stitchLength * 40;
          break;
        case "xl":
          numStitches = stitchLength * 42;
          break;
        case "2xl":
          numStitches = stitchLength * 46;
          break;
        case "3xl":
          numStitches = stitchLength * 50;
          break;
        default:
          break;
      }
      numStitches = Math.ceil(numStitches);
      return numStitches;
    }

    function calculateStst(size, ststStitches, ststWidth, ststRows) {
      let numStitches = 0;
      const stitchLength = ststStitches / ststWidth;
      /*
        Sizes: XS, S, M, L, XL, 2XL, 3XL
        Finished Chest Measurement: 32, 34, 38, 40, 42, 46, 50
        */
      // Determine size based on finished chest measurement
      switch (size) {
        case "xs":
          numStitches = stitchLength * 32;
          break;
        case "s":
          numStitches = stitchLength * 34;
          break;
        case "m":
          numStitches = stitchLength * 38;
          break;
        case "l":
          numStitches = stitchLength * 40;
          break;
        case "xl":
          numStitches = stitchLength * 42;
          break;
        case "2xl":
          numStitches = stitchLength * 46;
          break;
        case "3xl":
          numStitches = stitchLength * 50;
          break;
        default:
          break;
      }
      return numStitches;
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
      sweaterLength
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

      let deepNeckLength = sweaterLength - 5;
      let fullLength = sweaterLength + 10;
      let vneckDecreases = Math.round(necklineBO / 2);

      // Switch case based on the neckline type
      switch (necklineType) {
        case "Round-neck":
          instructions = `
                Work in stst until front piece measures ${sweaterLength} cm, ending on WS.<br><br>
    
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
                Work in stst until front piece measures ${sweaterLength} cm, ending on WS.<br><br>
    
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

    function calculateCastOnSleeves(size, ribStitches, ribWidth, ribRows) {
      let numStitches = 0;
      let stitchLength = ribStitches / ribWidth;
      /*
        Sizes: XS, S, M, L, XL, 2XL, 3XL
        Finished Chest Measurement: 32,  34,  38,  40,  42,  46,  50
        Wrist measurements:        13.5, 14, 14.5, 15, 15.5, 16, 16.5
        */
      // Determine size based on finished chest measurement
      switch (size) {
        case "xs":
          numStitches = Math.round(stitchLength * 13.5);
          break;
        case "s":
          numStitches = Math.round(stitchLength * 14);
          break;
        case "m":
          numStitches = Math.round(stitchLength * 14.5);
          break;
        case "l":
          numStitches = Math.round(stitchLength * 15);
          break;
        case "xl":
          numStitches = Math.round(stitchLength * 15.5);
          break;
        case "2xl":
          numStitches = Math.round(stitchLength * 16);
          break;
        case "3xl":
          numStitches = Math.round(stitchLength * 16.5);
          break;
        default:
          break;
      }
      return numStitches;
    }

    function calculateSleeveInstructions(
      size,
      sleeveType,
      sleeveLength,
      castOnSleeves,
      ststStitches,
      ststWidth,
      ststRows
    ) {
      // Calculate stitch length
      const stitchLength = ststStitches / ststWidth;
      let numStitches = 0;
      let numIncreases = 0;

      // Calculate number of stitches based on size
      switch (size) {
        case "xs":
          numStitches = Math.round(stitchLength * 35.25);
          break;
        case "s":
          numStitches = Math.round(stitchLength * 36.75);
          break;
        case "m":
          numStitches = Math.round(stitchLength * 38.25);
          break;
        case "l":
          numStitches = Math.round(stitchLength * 39.5);
          break;
        case "xl":
          numStitches = Math.round(stitchLength * 41);
          break;
        case "2xl":
          numStitches = Math.round(stitchLength * 42.25);
          break;
        case "3xl":
          numStitches = Math.round(stitchLength * 43.75);
          break;
        default:
          break;
      }

      // Calculate sleeve length in centimeters
      let sleeveLengthCM = 0;

      switch (sleeveLength) {
        case "long":
          sleeveLengthCM = 60;
          break;
        case "3/4 length":
          sleeveLengthCM = 45;
          break;
        case "half":
          sleeveLengthCM = 30;
          break;
        case "short":
          sleeveLengthCM = 15;
          break;
        default:
          break;
      }

      // Calculate number of increases
      numIncreases = Math.round(Math.abs(numStitches - castOnSleeves));
      let instructions = "";
      const puffStitches = Math.round(numStitches * 1.25);
      const bishopStartDec = Math.round(sleeveLengthCM * 0.5);

      // Switch case based on the sleeve type
      switch (sleeveType) {
        case "Drop sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${numStitches} stitches.<br>
                Work until sleeve length measures ${sleeveLengthCM} cm.<br>
                Bind off ${numStitches} stitches.<br>
                `;
          break;
        case "Puff Sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${puffStitches} stitches.<br>
                Work until sleeve length measures ${sleeveLengthCM} cm.<br>
                Bind off ${puffStitches} stitches.<br>
                `;
          break;
        case "Bishop Sleeves":
          instructions = `
                Increase ${numIncreases} times evenly over ${puffStitches} stitches.<br>
                Work until sleeve length measures ${bishopStartDec} cm.<br>
                Decrease evenly until piece measures ${sleeveLengthCM} cm.<br>
                Bind off ${numStitches} stitches.<br>
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
        case "Round-neck":
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Work in 1x1 rib until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case "Deep round-neck":
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Work in 1x1 rib until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case "V-neck":
          instructions = `
                Pick up approximately 3 stitches for every 4 rows.<br>
                Put in one stitch marker at the bottom of the v-neck.<br>
                Work in 1x1 rib.<br>
                At the same time, M1L before the stitch marker and M1R after the stitch marker.<br>
                Continue until neckband measures 2.5 cm, ending on WS.<br>
                Bind off stitches loosely or with a larger needle size.<br>
                `;
          break;
        case "Deep V-neck":
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

    let sweaterLength = calculateSweaterLength(fitting);
    let measurements = getMeasurements(
      size,
      sleeveLength,
      fitting,
      sweaterLength
    );
    let castOn = calculateCastOn(size, ribStitches, ribWidth, ribRows);
    let numStitches = Math.round(
      calculateStst(size, ststStitches, ststWidth, ststRows)
    );
    let necklineStart = Math.round(numStitches / 3);
    let necklineBO = numStitches - necklineStart * 2;
    let necklineEnd = necklineStart - 6;
    let decsFromRib = calculateDecFromRib(numStitches, castOn);
    let frontInstructions = calculateFrontInstructions(
      necklineType,
      necklineStart,
      necklineBO,
      necklineEnd,
      sweaterLength
    );
    let castOnSleeves = calculateCastOnSleeves(
      size,
      ribStitches,
      ribWidth,
      ribRows
    );
    let sleeveInstructions = calculateSleeveInstructions(
      size,
      sleeveType,
      sleeveLength,
      castOnSleeves,
      ststStitches,
      ststWidth,
      ststRows
    );
    let neckbandInstructions = calculateNeckbandInstructions(necklineType);
    let backLength = sweaterLength + 5;

    measurements = "<h2>Measurements</h2><br>" + measurements + "<hr>";

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
      <div className="tabs-wrapper">
        <button
          className="pattern-tab-links default-tab active"
          data-tab="clothing-type"
          onClick={(event) => openPatternTab(event, "clothing-type")}
        >
          Clothing Type
        </button>
        <button
          className="pattern-tab-links"
          data-tab="neckline"
          onClick={(event) => openPatternTab(event, "neckline")}
        >
          Neckline
        </button>
        <button
          className="pattern-tab-links"
          data-tab="sleeves"
          onClick={(event) => openPatternTab(event, "sleeves")}
        >
          Sleeves
        </button>
        <button
          className="pattern-tab-links"
          data-tab="size"
          onClick={(event) => openPatternTab(event, "size")}
        >
          Size
        </button>
        <button
          className="pattern-tab-links"
          data-tab="stitch"
          onClick={(event) => openPatternTab(event, "stitch")}
        >
          Stitch
        </button>
        <button
          className="pattern-tab-links"
          data-tab="description"
          onClick={(event) => openPatternTab(event, "description")}
        >
          Description
        </button>
      </div>
      <div className="navigation-buttons">
        <button id="reset-controls-btn">Reset Controls</button>
        <button id="backButton" onClick={prevTab}>
          Back
        </button>
        <button id="nextButton" onClick={nextTab}>
          Next
        </button>
      </div>

      <form id="pattern-form" onSubmit={handleSubmit}>
        <div className="pattern-container">
          <ThreeScene />
          <div className="right-panel">
            {/* clothing type tab content */}
            <div
              id="clothing-type"
              className="tabcontent"
              style={{ display: "block" }}
            >
              <h2>Clothing Type</h2>
              <div className="image-button-wrapper-2x1">
                <button
                  type="button"
                  id="clothing-type-button1"
                  className="image-button"
                  value="Sweater"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/clothes-sweater.png" alt="Sweater" />
                  <br></br>Sweater
                </button>
                <button
                  type="button"
                  id="clothing-type-button2"
                  className="image-button"
                  value="Dress"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/clothes-dress.png" alt="Dress" />
                  <br></br>Dress
                </button>
              </div>
            </div>

            <div id="neckline" className="tabcontent">
              <h2>Neckline</h2>

              <div className="image-button-wrapper-2x3">
                <button
                  type="button"
                  id="neckline-type-button1"
                  className="image-button"
                  value="Round-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/round-neck.png" alt="Round-Neck" />
                  <br></br>
                  Round-neck
                </button>
                <button
                  type="button"
                  id="neckline-type-button2"
                  className="image-button"
                  value="Deep round-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/round-neck-deep.png" alt="Deep round-neck" />
                  <br></br>
                  Deep round-neck
                </button>
                <button
                  type="button"
                  id="neckline-type-button3"
                  className="image-button"
                  value="V-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/v-neck.png" alt="V-neck" />
                  <br></br>
                  V-neck
                </button>
                <button
                  type="button"
                  id="neckline-type-button4"
                  className="image-button"
                  value="Deep V-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/v-neck-deep.png" alt="Deep V-neck" />
                  <br></br>
                  Deep V-neck
                </button>
                <button
                  type="button"
                  id="neckline-type-button5"
                  className="image-button"
                  value="Square-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/square-neck.png" alt="Square-Neck" />
                  <br></br>
                  Square-neck
                </button>
                <button
                  type="button"
                  id="neckline-type-button6"
                  className="image-button"
                  value="Straight-neck"
                  onClick={(event) => toggleImageButton(event.currentTarget)}
                >
                  <img src="/icons/straight-neck.png" alt="Straight-Neck" />
                  <br></br>
                  Straight-neck
                </button>
              </div>
            </div>

            <div id="sleeves" className="tabcontent">
              <h2>Sleeves</h2>
              <p>Choose your sleeve style</p>
              <div className="options-wrapper">
                <div className="image-button-wrapper-3x1">
                  <button
                    type="button"
                    id="sleeve-type-button1"
                    className="image-button"
                    value="Drop Sleeves"
                    onClick={(event) => toggleImageButton(event.currentTarget)}
                  >
                    <img src="/icons/drop-sleeve.png" alt="Drop Sleeves" />
                    <br></br>
                    Drop Sleeves
                  </button>
                  <button
                    type="button"
                    id="sleeve-type-button2"
                    className="image-button"
                    value="Puff Sleeves"
                    onClick={(event) => toggleImageButton(event.currentTarget)}
                  >
                    <img src="/icons/puff-sleeve.png" alt="Puff Sleeves" />
                    <br></br>
                    Puff Sleeves
                  </button>
                  <button
                    type="button"
                    id="sleeve-type-button3"
                    className="image-button"
                    value="Bishop Sleeves"
                    onClick={(event) => toggleImageButton(event.currentTarget)}
                  >
                    <img src="/icons/bishop-sleeve.png" alt="Bishop Sleeves" />
                    <br></br>
                    Bishop Sleeves
                  </button>
                </div>
                <hr />

                <p>Choose your sleeve length</p>
                <input
                  type="radio"
                  id="sleeve-length-button1"
                  name="sleeve-length"
                  value="long"
                  defaultChecked
                />
                <label htmlFor="sleeve-length-button1">Long</label>

                <input
                  type="radio"
                  id="sleeve-length-button3"
                  name="sleeve-length"
                  value="half"
                />
                <label htmlFor="sleeve-length-button2">Half</label>

                <input
                  type="radio"
                  id="sleeve-length-button4"
                  name="sleeve-length"
                  value="short"
                />
                <label htmlFor="sleeve-length-button3">Short</label>
              </div>
            </div>

            <div id="size" className="tabcontent">
              <h2>Size</h2>
              <div className="options-wrapper">
                <p>Choose a baseline size</p>
                <select
                  id="size-dropdown"
                  name="size-dropdown"
                  value={size}
                  onChange={handleSizeChange}
                >
                  <option value="xs" data-bust="32" data-waist="24">
                    XS
                  </option>
                  <option value="s" data-bust="36" data-waist="28">
                    S
                  </option>
                  <option value="m" data-bust="40" data-waist="32">
                    M
                  </option>
                  <option value="l" data-bust="44" data-waist="36">
                    L
                  </option>
                  <option value="xl" data-bust="48" data-waist="40">
                    XL
                  </option>
                  <option value="2xl" data-bust="52" data-waist="44">
                    2XL
                  </option>
                  <option value="3xl" data-bust="56" data-waist="48">
                    3XL
                  </option>
                </select>
                <hr />

                <p>Select a fitting</p>
                <input type="radio" id="petite" name="fit" value="Petite" />
                <label htmlFor="petite">Petite</label>
                <input
                  type="radio"
                  id="regular"
                  name="fit"
                  value="Regular"
                  defaultChecked
                />
                <label htmlFor="regular">Regular</label>
                <input type="radio" id="tall" name="fit" value="Tall" />
                <label htmlFor="tall">Tall</label>
              </div>
            </div>
            <div id="stitch" className="tabcontent">
              <h2>Stitch</h2>
              {/* 
                <div className="image-button-wrapper">
                    <button type="button" id="stitch-type-button1" className="image-button" value="Stockinette" onClick={(event) => toggleImageButton(event.target)}>
                        <img src="http://via.placeholder.com/250x300" alt="Stockinette" />
                        <br />Stockinette
                    </button>
                    <button type="button" id="stitch-type-button2" className="image-button" value="1x1 Rib" onClick={(event) => toggleImageButton(event.target)}>
                        <img src="http://via.placeholder.com/250x300" alt="1x1 Rib" />
                        <br />1x1 Rib
                    </button>
                </div>
                */}
              <p>Stockinette gauge</p>
              <div className="gauge-wrapper">
                <div className="form-row">
                  <label htmlFor="yarn_weight">Yarn Weight:</label>
                  <select
                    id="yarn_weight"
                    name="yarn_weight"
                    value={ribNeedleSize}
                    onChange={setRibNeedleSize}
                  >
                    <option value="Lace">Lace</option>
                    <option value="Light Fingering">Light Fingering</option>
                    <option value="Sport">Sport</option>
                    <option value="DK">DK</option>
                    <option value="Worsted">Worsted</option>
                    <option value="Aran">Aran</option>
                    <option value="Bulky">Bulky</option>
                    <option value="Super Bulky">Super Bulky</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="stst_stitches">Number of Stitches</label>
                  <input
                    type="number"
                    id="stst_stitches"
                    name="stst_stitches"
                    defaultValue="18"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="stst_width">Width (cm)</label>
                  <input
                    type="number"
                    id="stst_width"
                    name="stst_width"
                    defaultValue="10"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="stst_rows">Number of Rows</label>
                  <input
                    type="number"
                    id="stst_rows"
                    name="stst_rows"
                    defaultValue="23"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="stst_length">Length (cm)</label>
                  <input
                    type="number"
                    id="stst_length"
                    name="stst_length"
                    defaultValue="10"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="stst_needle_size">Needle Size:</label>
                  <select
                    id="stst_needle_size"
                    name="stst_needle_size"
                    value={stStNeedleSize}
                    onChange={handleStStNeedleChange}
                  >
                    <option value="US 0 / 2mm / UK 14">
                      US 0 / 2mm / UK 14
                    </option>
                    <option value="2.25">US 1 / 2.25mm / UK 13</option>
                    <option value="2.5">US 1.5 / 2.5mm / UK 12</option>
                    <option value="2.75">US 2 / 2.75mm / UK 12</option>
                    <option value="3">US 2.5 / 3mm / UK 11</option>
                    <option value="3.25">US 3 / 3.25mm / UK 10</option>
                    <option value="3.5">US 4 / 3.5mm / UK 9</option>
                    <option value="3.75">US 5 / 3.75mm / UK 9</option>
                    <option value="4">US 6 / 4mm / UK 8</option>
                    <option value="4.5">US 7 / 4.5mm / UK 7</option>
                    <option value="5">US 8 / 5mm / UK 6</option>
                    <option value="5.5">US 9 / 5.5mm / UK 5</option>
                    <option value="6">US 10 / 6mm / UK 4</option>
                    <option value="6.5">US 10.5 / 6.5mm / UK 3</option>
                    <option value="7">US 10.75 / 7mm / UK 2</option>
                    <option value="8">US 11 / 8mm / UK 0</option>
                    <option value="9">US 13 / 9mm / UK 00</option>
                    <option value="10">US 15 / 10mm / UK 000</option>
                  </select>
                </div>
              </div>
              <hr />
              <p>Rib gauge</p>
              <div className="gauge-wrapper">
                <div className="form-row">
                  <label htmlFor="rib_stitches">Number of Stitches</label>
                  <input
                    type="number"
                    id="rib_stitches"
                    name="rib_stitches"
                    defaultValue="18"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rib_width">Width (cm)</label>
                  <input
                    type="number"
                    id="rib_width"
                    name="rib_width"
                    defaultValue="10"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rib_rows">Number of Rows</label>
                  <input
                    type="number"
                    id="rib_rows"
                    name="rib_rows"
                    defaultValue="23"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rib_length">Length (cm)</label>
                  <input
                    type="number"
                    id="rib_length"
                    name="rib_length"
                    defaultValue="10"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rib_needle_size">Needle Size:</label>
                  <select
                    id="rib_needle_size"
                    name="rib_needle_size"
                    value={ribNeedleSize}
                    onChange={handleRibNeedleChange}
                  >
                    <option value="2">US 0 / 2mm / UK 14</option>
                    <option value="2.25">US 1 / 2.25mm / UK 13</option>
                    <option value="2.5">US 1.5 / 2.5mm / UK 12</option>
                    <option value="2.75">US 2 / 2.75mm / UK 12</option>
                    <option value="3">US 2.5 / 3mm / UK 11</option>
                    <option value="3.25">US 3 / 3.25mm / UK 10</option>
                    <option value="3.5">US 4 / 3.5mm / UK 9</option>
                    <option value="3.75">US 5 / 3.75mm / UK 9</option>
                    <option value="4">US 6 / 4mm / UK 8</option>
                    <option value="4.5">US 7 / 4.5mm / UK 7</option>
                    <option value="5">US 8 / 5mm / UK 6</option>
                    <option value="5.5">US 9 / 5.5mm / UK 5</option>
                    <option value="6">US 10 / 6mm / UK 4</option>
                    <option value="6.5">US 10.5 / 6.5mm / UK 3</option>
                    <option value="7">US 10.75 / 7mm / UK 2</option>
                    <option value="8">US 11 / 8mm / UK 0</option>
                    <option value="9">US 13 / 9mm / UK 00</option>
                    <option value="10">US 15 / 10mm / UK 000</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="description" className="tabcontent">
              <h2>Description</h2>
              <p>Add a description for your pattern</p>
              <div className="description-wrapper">
                <div className="form-row">
                  <label htmlFor="garment_name">Name of your garment</label>
                  <input
                    type="text"
                    id="garment_name"
                    name="garment_name"
                    defaultValue="N/A"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="created_for">Created for</label>
                  <input
                    type="text"
                    id="created_for"
                    name="created_for"
                    defaultValue="N/A"
                  />
                </div>
                <div className="form-textarea">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="10"
                    cols="65"
                    placeholder="Type a description for your garment here"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <input
            type="hidden"
            id="clothing-type-input"
            name="clothing-type"
            value="Sweater"
          />
          <input
            type="hidden"
            id="neckline-type-input"
            name="neckline-type"
            value="V-neck"
          />
          <input
            type="hidden"
            id="sleeve-type-input"
            name="sleeve-type"
            value="Drop sleeves"
          />
          <input
            type="hidden"
            id="stitch-type-input"
            name="stitch-type"
            value="Stockinette"
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
