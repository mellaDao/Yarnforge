import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = ({ formData, activeImageButtons }) => {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const currentClothingTypeRef = useRef(null);
  const currentNecklineTypeRef = useRef(null);
  const currentSleeveTypeRef = useRef(null);

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
      let sleeveLength = formData.sleeveLength;
      selectClothingType(activeImageButtons.clothingType);
      selectNecklineType(activeImageButtons.necklineType);
      selectSleeveType(activeImageButtons.sleeveType, sleeveLength);

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

  const selectSleeveType = (sleeveType, sleeveLength) => {
    const fbxLoader = new FBXLoader();
    let url;
    switch (sleeveType) {
      case "Drop Sleeves":
        url = `/models/drop-sleeve-${sleeveLength}.fbx`;
        break;
      case "Puff Sleeves":
        url = `/models/puff-sleeve-${sleeveLength}.fbx`;
        break;
      case "Bishop Sleeves":
        url = `/models/bishop-sleeve-${sleeveLength}.fbx`;
        break;
      default:
        return;
    }

    console.log("Loading sleeve model from:", url);

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
