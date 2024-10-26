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
  const currentClothingTypeRef = useRef(null); // Default to null
  const currentNecklineTypeRef = useRef(null);
  const currentSleeveTypeRef = useRef(null);

  // 1. Initialize scene, camera, renderer, and controls on mount
  useEffect(() => {
    const initScene = () => {
      const container = containerRef.current;

      if (container && container.firstChild) {
        container.removeChild(container.firstChild);
      }

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

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableKeys = true;
      controls.listenToKeyEvents(document.body);
      controlsRef.current = controls;

      const animate = () => {
        requestAnimationFrame(animate);
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      animate();

      window.addEventListener("resize", onWindowResize);
    };

    const onWindowResize = () => {
      const container = containerRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    initScene();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Empty dependency array to ensure initialization only happens once

  // 2. Update the clothing type model when `activeImageButtons.clothingType` changes
  useEffect(() => {
    if (!sceneRef.current) return; // Wait until the scene is initialized
    selectClothingType(activeImageButtons.clothingType);
  }, [activeImageButtons.clothingType]);

  // 3. Update the neckline model when `activeImageButtons.necklineType` changes
  useEffect(() => {
    if (!sceneRef.current) return; // Wait until the scene is initialized
    selectNecklineType(activeImageButtons.necklineType);
  }, [activeImageButtons.necklineType]);

  // 4. Update the sleeve type model when `activeImageButtons.sleeveType` or `formData.sleeveLength` changes
  useEffect(() => {
    if (!sceneRef.current) return; // Wait until the scene is initialized
    selectSleeveType(activeImageButtons.sleeveType, formData.sleeveLength);
  }, [activeImageButtons.sleeveType, formData.sleeveLength]);

  const selectClothingType = (clothingType) => {
    const fbxLoader = new FBXLoader();
    let url;
    if (clothingType === "sweater") {
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
      case "round-neck":
        url = "/models/round-neck.fbx";
        break;
      case "deep-round-neck":
        url = "/models/round-neck-deep.fbx";
        break;
      case "v-neck":
        url = "/models/v-neck.fbx";
        break;
      case "deep-v-neck":
        url = "/models/v-neck-deep.fbx";
        break;
      case "square-neck":
        url = "/models/square-neck.fbx";
        break;
      case "straight-neck":
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
    console.log("sleevetype:", sleeveType);
    console.log("sleeveLength:", sleeveLength);
    const fbxLoader = new FBXLoader();
    let url;
    switch (sleeveType) {
      case "drop-sleeves":
        url = `/models/drop-sleeve-${sleeveLength}.fbx`;
        break;
      case "puff-sleeves":
        url = `/models/puff-sleeve-${sleeveLength}.fbx`;
        break;
      case "bishop-sleeves":
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

  return <div className="left-panel" id="left-panel" ref={containerRef}></div>;
};

export default ThreeScene;
