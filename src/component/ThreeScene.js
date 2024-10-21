import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const currentClothingTypeRef = useRef(null);
  const currentNecklineTypeRef = useRef(null);
  const currentSleeveTypeRef = useRef(null);
  const currentSleeveTypeStringRef = useRef(null);
  const currentSleeveLengthStringRef = useRef("long");

  useEffect(() => {
    const init = () => {
      const container = containerRef.current;

      const camera = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 20);
      cameraRef.current = camera;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x59597d);
      sceneRef.current = scene;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      //load initial model
      selectClothingType("Sweater");
      selectNecklineType("Round-neck");
      selectSleeveType("Bishop Sleeves");

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableKeys = true;
      controls.listenToKeyEvents(document.body);
      controls.keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
      };
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
      controlsRef.current = controls;

      // Set the initial size of the renderer
      onWindowResize();

      const resetControlsBtn = document.getElementById("reset-controls-btn");
      resetControlsBtn.addEventListener("click", resetControls);

      // Add event listeners for clothing type events
      document
        .getElementById("clothing-type-button1")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentClothingTypeRef.current);
          selectClothingType("Sweater");
          console.log("Current Clothing Type:", currentClothingTypeRef.current);
        });

      document
        .getElementById("clothing-type-button2")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentClothingTypeRef.current);
          selectClothingType("Dress");
          console.log("Current Clothing Type:", currentClothingTypeRef.current);
        });

      // Add event listeners for neckline type events
      document
        .getElementById("neckline-type-button1")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("Round-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });
      document
        .getElementById("neckline-type-button2")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("Deep round-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });
      document
        .getElementById("neckline-type-button3")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("V-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });
      document
        .getElementById("neckline-type-button4")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("Deep V-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });
      document
        .getElementById("neckline-type-button5")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("Square-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });
      document
        .getElementById("neckline-type-button6")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentNecklineTypeRef.current);
          selectNecklineType("Straight-neck");
          console.log("Current Neckline Type:", currentNecklineTypeRef.current);
        });

      // Add event listeners for sleeve type events
      document
        .getElementById("sleeve-type-button1")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentSleeveTypeRef.current);
          selectSleeveType("Drop Sleeves");
        });
      document
        .getElementById("sleeve-type-button2")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentSleeveTypeRef.current);
          selectSleeveType("Puff Sleeves");
        });
      document
        .getElementById("sleeve-type-button3")
        .addEventListener("click", function () {
          sceneRef.current.remove(currentSleeveTypeRef.current);
          selectSleeveType("Bishop Sleeves");
        });

      // Get all radio buttons for sleeve length
      const sleeveLengthButtons = document.querySelectorAll(
        'input[name="sleeve-length"]'
      );
      // Add event listener to each radio button
      sleeveLengthButtons.forEach((button) => {
        button.addEventListener("change", () => {
          if (button.checked) {
            sceneRef.current.remove(currentSleeveTypeRef.current);
            currentSleeveLengthStringRef.current = button.value;
            selectSleeveLength(button.value);
          }
        });
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    init(); // Call init inside the useEffect
    animate(); // Call animate inside the useEffect

    window.addEventListener("resize", onWindowResize);
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  });

  const selectClothingType = (clothingType) => {
    const fbxLoader = new FBXLoader();
    let url;
    if (clothingType === "Sweater") {
      url = "/models/clothes-sweater.fbx";
    } else {
      url = "/models/clothes-dress.fbx";
    }

    fbxLoader.load(
      url,
      (object) => {
        sceneRef.current.remove(currentClothingTypeRef.current);
        object.scale.set(0.07, 0.07, 0.07);
        object.position.y = -25;
        object.position.x = 4;
        object.position.z = 13;
        object.rotation.y -= Math.PI / 2;
        currentClothingTypeRef.current = object;
        sceneRef.current.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  };

  const selectNecklineType = (necklineType) => {
    const fbxLoader = new FBXLoader();
    let url;
    switch (necklineType) {
      case "Round-neck":
        url = "/models/round-neck.fbx";
        break;
      case "Deep round-neck":
        url = "/models/round-neck-deep.fbx";
        break;
      case "V-neck":
        url = "/models/v-neck.fbx";
        break;
      case "Deep V-neck":
        url = "/models/v-neck-deep.fbx";
        break;
      case "Square-neck":
        url = "/models/square-neck.fbx";
        break;
      case "Straight-neck":
        url = "/models/straight-neck.fbx";
        break;
      default:
        return;
    }

    fbxLoader.load(
      url,
      (object) => {
        sceneRef.current.remove(currentNecklineTypeRef.current);
        object.scale.set(0.07, 0.07, 0.07);
        object.position.y = -25;
        object.position.x = 4;
        object.position.z = 13;
        object.rotation.y -= Math.PI / 2;
        currentNecklineTypeRef.current = object;
        sceneRef.current.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  };

  const selectSleeveType = (sleeveType) => {
    const fbxLoader = new FBXLoader();
    let url;
    switch (sleeveType) {
      case "Drop Sleeves":
        url = `/models/drop-sleeve-${currentSleeveLengthStringRef.current}.fbx`;
        break;
      case "Puff Sleeves":
        url = `/models/puff-sleeve-${currentSleeveLengthStringRef.current}.fbx`;
        break;
      case "Bishop Sleeves":
        url = `/models/bishop-sleeve-${currentSleeveLengthStringRef.current}.fbx`;
        break;
      default:
        return;
    }

    fbxLoader.load(
      url,
      (object) => {
        sceneRef.current.remove(currentSleeveTypeRef.current);
        object.scale.set(0.07, 0.07, 0.07);
        object.position.y = -25;
        object.position.x = 4;
        object.position.z = 13;
        object.rotation.y -= Math.PI / 2;
        currentSleeveTypeRef.current = object;
        currentSleeveTypeStringRef.current = sleeveType;
        sceneRef.current.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log("An error happened");
      }
    );
  };

  const selectSleeveLength = (sleeveLength) => {
    selectSleeveType(currentSleeveTypeStringRef.current);
  };

  const resetControls = () => {
    controlsRef.current.reset();
  };

  const onWindowResize = () => {
    const container = containerRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  return <div className="left-panel" id="left-panel" ref={containerRef}></div>;
};

export default ThreeScene;
