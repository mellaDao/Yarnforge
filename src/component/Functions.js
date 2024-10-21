var activeButtons = {};

function toggleImageButton(button) {
  // Toggle the active class for the clicked button
  button.classList.toggle("active");

  //get parent group
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
    if (tablinks[i].getAttribute("onclick").includes(tabName)) {
      currentTab = i;
      tablinks[i].classList.add("active");
      tablinks[i].style.backgroundColor = "#009c7a";
    }
  }
  document.getElementById(tabName).style.display = "block";
  updateBackButtonVisibility();
  setButtonStates();
}

function openGeneratedPatternTab(evt, tabName) {
  // Get all tab contents and hide them
  var tabContents = document.querySelectorAll(".tabcontent");
  tabContents.forEach(function (content) {
    content.classList.remove("active");
  });

  // Get all tab links and remove the 'active' class
  var tabLinks = document.querySelectorAll(
    ".generated-pattern-tab-links button"
  );
  tabLinks.forEach(function (link) {
    link.classList.remove("active");
    link.style.backgroundColor = "#6E48D5";
  });

  // Show the clicked tab content
  var activeTabContent = document.getElementById(tabName);
  activeTabContent.classList.add("active");

  // Add 'active' class to the clicked tab button
  evt.currentTarget.classList.add("active");
  evt.currentTarget.style.backgroundColor = "#009c7a";
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

// Call the function initially to set the initial visibility of the back button
updateBackButtonVisibility();

function confirmDelete(pattern_id) {
  // Get the anchor element
  var deleteLink = event.target;

  // Change the text to confirmation message
  deleteLink.textContent = "Are you sure? ";
  deleteLink.style.color = "white";

  // Create yes and no links
  var yesLink = document.createElement("a");
  yesLink.textContent = "Yes";
  yesLink.href = "#";
  yesLink.style.color = "lightgray";
  yesLink.style.paddingLeft = "20px";
  yesLink.onclick = function () {
    // Redirect to delete_pattern.php
    window.location.href = "delete_pattern.php?pattern_id=" + pattern_id;
    return false; // Prevent default link behavior
  };

  var noLink = document.createElement("a");
  noLink.textContent = "No";
  noLink.href = "#";
  noLink.style.color = "white";
  noLink.style.paddingLeft = "20px";
  noLink.onclick = function () {
    // Restore original text
    deleteLink.textContent = "Delete Pattern";
    deleteLink.style.color = "red";
    deleteLink.parentNode.removeChild(yesLink);
    deleteLink.parentNode.removeChild(noLink);
    return false; // Prevent default link behavior
  };

  // Append yes and no links
  deleteLink.parentNode.appendChild(document.createTextNode(" "));
  deleteLink.parentNode.appendChild(yesLink);
  deleteLink.parentNode.appendChild(document.createTextNode(" "));
  deleteLink.parentNode.appendChild(noLink);
}
