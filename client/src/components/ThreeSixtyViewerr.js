import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { gsap } from 'gsap';

const ThreeSixtyViewerr = () => {
  const mountRef = useRef(null);
  let scene, camera, renderer, controls;
  let sphere, geometry;
  let intervalId = null;

  useEffect(() => {
    scene = new THREE.Scene();

    const width = window.innerWidth  ;
    const height = window.innerHeight ;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/mn.jpg',
      (texture) => {
        geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ map: texture });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      },
      undefined,
      (error) => {
        console.error('Une erreur est survenue lors du chargement de la texture :', error);
      }
    );

    // Premier POI
    const poiPosition = new THREE.Vector3(100, 0, -95); // Position du premier POI
    const poiTexture = new THREE.TextureLoader().load('/fleches.png'); // Chemin de votre icône
    const poiMaterial = new THREE.SpriteMaterial({ map: poiTexture, transparent: true, opacity: 0.8 });
    const poiSprite = new THREE.Sprite(poiMaterial);
    poiSprite.position.copy(poiPosition);
    poiSprite.scale.set(20, 20, 1); // Ajustez la taille selon vos besoins
    scene.add(poiSprite);

    // Animation du premier POI
    const animatePOI = () => {
      gsap.to(poiSprite.scale, {
        x: 24,
        y: 24,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    };

    animatePOI();

    const onClickPOI = () => {
      if (sphere && geometry) {
        const currentTexture = sphere.material.map && sphere.material.map.image && sphere.material.map.image.src;
    
        if (currentTexture && currentTexture.endsWith('n1.jpg')) {
          // Si la sphère affiche la deuxième image, retournez à la première image
          textureLoader.load(
            '/mn.jpg',
            (texture) => {
              // Supprimez la sphère actuelle
              scene.remove(sphere);
    
              // Ajoutez la première image 360
              const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
              scene.add(newSphere);
              sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère
    
              // Rendre le premier POI visible et les autres invisibles
              poiSprite.visible = true;
              poiSprite2.visible = true;
            //   poiSprite3.visible = true;
    
             // Remettre le premier POI à sa position d'origine
          poiSprite.position.set(100, 0, -95);;
          poiSprite2.position.set(100, 0, 100); // Réinitialiser la position du deuxième POI
        //   poiSprite3.position.set(-50, 40, -100); // Réinitialiser la position du troisième POI
        },
            undefined,
            (error) => {
              console.error('Erreur lors du chargement de la texture :', error);
            }
          );
        } else {
          // Si la sphère affiche la première image, chargez la deuxième image (cas initial)
          textureLoader.load(
            '/n1.jpg',
            (texture) => {
              // Supprimez la sphère actuelle
              scene.remove(sphere);
    
              // Ajoutez la deuxième image 360
              const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
              scene.add(newSphere);
              sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère
    
              // Rendre le premier POI visible et les autres invisibles
              poiSprite.visible = true;
              poiSprite2.visible = false;
            //   poiSprite3.visible = false;
    
              // Déplacer le premier POI à la nouvelle position pour la deuxième image
              poiSprite.position.set(45, 0, -5); // Nouvelle position pour la deuxième image
            // Réinitialiser la position des autres POI si nécessaire
          poiSprite2.position.set(100, 0, 100);
        //   poiSprite3.position.set(-50, 40, -100);
        },
            undefined,
            (error) => {
              console.error('Erreur lors du chargement de la texture :', error);
            }
          );
        }
      }
    };
    

    // Associez onClickPOI au clic sur le premier POI
    poiSprite.userData = { onClick: onClickPOI };

    // Deuxième POI
    const poiPosition2 = new THREE.Vector3(200, 0, 100); // Position du deuxième POI
    const poiTexture2 = new THREE.TextureLoader().load('/fleches.png'); // Chemin de votre icône
    const poiMaterial2 = new THREE.SpriteMaterial({ map: poiTexture2, transparent: true, opacity: 0.8 });
    const poiSprite2 = new THREE.Sprite(poiMaterial2);
    poiSprite2.position.copy(poiPosition2);
    poiSprite2.scale.set(20, 20, 1); // Ajustez la taille selon vos besoins
    scene.add(poiSprite2);

    // Animation du deuxième POI
    const animatePOI2 = () => {
      gsap.to(poiSprite2.scale, {
        x: 24,
        y: 24,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    };

    animatePOI2();

    // Action sur clic du deuxième POI
    const onClickPOI2 = () => {
      const currentTexture = sphere.material.map && sphere.material.map.image && sphere.material.map.image.src;
    
      if (currentTexture && currentTexture.endsWith('lelen.jpg')) {
        // Si la sphère affiche la deuxième image, retournez à la première image
        textureLoader.load(
          '/mn.jpg',
          (texture) => {
            // Supprimez la sphère actuelle
            scene.remove(sphere);
    
            // Ajoutez la première image 360
            const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
            scene.add(newSphere);
            sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère
    
            // Rendre tous les POI visibles et réinitialiser leurs positions
            poiSprite.visible = true;
            poiSprite2.visible = true;
            // poiSprite3.visible = true;
    
            // Réinitialiser la position du deuxième POI
            poiSprite2.position.set(200, 0, 100); // Nouvelle position pour la première image
            // Réinitialiser la position des autres POI si nécessaire
            poiSprite.position.set(100, 0, -95);
            // poiSprite3.position.set(-50, 40, -100);
          },
          undefined,
          (error) => {
            console.error('Erreur lors du chargement de la texture :', error);
          }
        );
      } else {
        // Si la sphère affiche la première image, chargez la deuxième image (cas initial)
        textureLoader.load(
          '/lelen.jpg',
          (texture) => {
            // Supprimez la sphère actuelle
            scene.remove(sphere);
    
            // Ajoutez la deuxième image 360
            const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
            scene.add(newSphere);
            sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère
    
            // Rendre le deuxième POI visible et les autres invisibles
            poiSprite.visible = false;
            poiSprite2.visible = true;
            // poiSprite3.visible = false;
    
            // Déplacer le deuxième POI à la nouvelle position pour la deuxième image
            poiSprite2.position.set(-140, 0, 30); // Nouvelle position pour la deuxième image
            // Réinitialiser la position des autres POI si nécessaire
            poiSprite.position.set(100, 0, -15);
            // poiSprite3.position.set(-50, 40, -100);
          },
          undefined,
          (error) => {
            console.error('Erreur lors du chargement de la texture :', error);
          }
        );
      }
    };
    
    
    
    // Associez onClickPOI2 au clic sur le deuxième POI
    poiSprite2.userData = { onClick: onClickPOI2 };
    

    // Associez onClickPOI2 au clic sur le deuxième POI
    poiSprite2.userData = { onClick: onClickPOI2 };
// Ajoutez ces lignes après la définition du deuxième POI

// // Troisième POI
// const poiPosition3 = new THREE.Vector3(-50,40, -100); // Position du troisième POI
// const poiTexture3 = new THREE.TextureLoader().load('/fleches.png'); // Chemin de votre icône
// const poiMaterial3 = new THREE.SpriteMaterial({ map: poiTexture3, transparent: true, opacity: 0.8 });
// const poiSprite3 = new THREE.Sprite(poiMaterial3);
// poiSprite3.position.copy(poiPosition3);
// poiSprite3.scale.set(20, 20, 1); // Ajustez la taille selon vos besoins
// scene.add(poiSprite3);

// // Animation du troisième POI
// const animatePOI3 = () => {
//   gsap.to(poiSprite3.scale, {
//     x: 24,
//     y: 24,
//     duration: 0.5,
//     yoyo: true,
//     repeat: -1,
//     ease: "power1.inOut"
//   });
// };

// animatePOI3();

// // Action sur clic du troisième POI
// const onClickPOI3 = () => {
//   const currentTexture = sphere.material.map && sphere.material.map.image && sphere.material.map.image.src;

//   if (currentTexture && currentTexture.endsWith('mv.jpg')) {
//     // Si la sphère affiche la troisième image, retournez à la première image
//     textureLoader.load(
//       '/n1.jpg',
//       (texture) => {
//         // Supprimez la sphère actuelle
//         scene.remove(sphere);

//         // Ajoutez la première image 360
//         const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
//         scene.add(newSphere);
//         sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère

//         // Rendre tous les POI visibles et réinitialiser leurs positions
//         poiSprite.visible = true;
//         poiSprite2.visible = true;
//         poiSprite3.visible = true;

//         // Réinitialiser la position du troisième POI
//         poiSprite3.position.set(100, 0, -15); // Nouvelle position pour la première image
//         // Réinitialiser la position des autres POI si nécessaire
//         poiSprite.position.set(100, 0, -15);
//         poiSprite2.position.set(100, 0, 100);
//       },
//       undefined,
//       (error) => {
//         console.error('Erreur lors du chargement de la texture :', error);
//       }
//     );
//   } else {
//     // Si la sphère affiche la première image, chargez la troisième image (cas initial)
//     textureLoader.load(
//       '/mv.jpg',
//       (texture) => {
//         // Supprimez la sphère actuelle
//         scene.remove(sphere);

//         // Ajoutez la troisième image 360
//         const newSphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture }));
//         scene.add(newSphere);
//         sphere = newSphere; // Mettez à jour la référence vers la nouvelle sphère

//         // Rendre le troisième POI visible et les autres invisibles
//         poiSprite.visible = false;
//         poiSprite2.visible = false;
//         poiSprite3.visible = true;

//         // Déplacer le troisième POI à la nouvelle position pour la deuxième image
//         poiSprite3.position.set(80, -40, -40); // Nouvelle position pour la deuxième image
//         // Réinitialiser la position des autres POI si nécessaire
//         poiSprite.position.set(100, 0, -15);
//         poiSprite2.position.set(100, 0, 100);
//       },
//       undefined,
//       (error) => {
//         console.error('Erreur lors du chargement de la texture :', error);
//       }
//     );
//   }
// };



// // Associez onClickPOI3 au clic sur le troisième POI
// poiSprite3.userData = { onClick: onClickPOI3 };

    // Gestion des événements
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject.userData.onClick) {
          intersectedObject.userData.onClick();
        }
      }
    };

    window.addEventListener('click', onMouseClick, false);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const rotateCamera = (direction) => {
      const angle = 0.1;
      const offset = new THREE.Vector3();
      offset.copy(camera.position).sub(controls.target);

      if (direction === 'up') {
        offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      } else if (direction === 'down') {
        offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), -angle);
      } else if (direction === 'left') {
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
      } else if (direction === 'right') {
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
      }

      camera.position.copy(controls.target).add(offset);
      camera.lookAt(controls.target);
      controls.update();
    };

    const onKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          rotateCamera('up');
          break;
        case 'ArrowDown':
          rotateCamera('down');
          break;
        case 'ArrowLeft':
          rotateCamera('left');
          break;
        case 'ArrowRight':
          rotateCamera('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown, false);

    const onMouseEnter = () => {
      document.body.style.overflow = 'hidden';
    };

    const onMouseLeave = () => {
      document.body.style.overflow = 'auto';
    };

    mountRef.current.addEventListener('mouseenter', onMouseEnter);
    mountRef.current.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('keydown', onKeyDown);
      mountRef.current.removeEventListener('mouseenter', onMouseEnter);
      mountRef.current.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onMouseClick);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  const handleMouseDown = (direction) => {
    intervalId = setInterval(() => {
      handleNavigationButtonClick(direction);
    }, 100);
  };

  const handleMouseUp = () => {
    clearInterval(intervalId);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      mountRef.current.requestFullscreen().catch((err) => {
        alert(`Erreur lors de la tentative de passer en mode plein écran : ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleZoomIn = () => {
    if (camera.fov < 30) return;

    camera.fov -= 10;
    camera.updateProjectionMatrix();
  };

  const handleZoomOut = () => {
    if (camera.fov > 100) return;

    camera.fov += 10;
    camera.updateProjectionMatrix();
  };

  const handleNavigationButtonClick = (direction) => {
    const angle = 0.1;
    const offset = new THREE.Vector3();
    offset.copy(camera.position).sub(controls.target);

    switch (direction) {
      case 'up':
        offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), angle);
        break;
      case 'down':
        offset.applyAxisAngle(new THREE.Vector3(1, 0, 0), -angle);
        break;
      case 'left':
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
        break;
      case 'right':
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
        break;
      default:
        break;
    }

    camera.position.copy(controls.target).add(offset);
    camera.lookAt(controls.target);
    controls.update();
  };

  return (
    <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <button
        onMouseDown={() => handleMouseDown('left')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '45%',
          transform: 'translate(-50%, 0)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <button
        onMouseDown={() => handleMouseDown('right')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '55%',
          transform: 'translate(-50%, 0)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-arrow-right"></i>
      </button>
      <button
        onMouseDown={() => handleMouseDown('up')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <button
        onMouseDown={() => handleMouseDown('down')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-arrow-down"></i>
      </button>

      <button
        onClick={toggleFullScreen}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-expand"></i>
      </button>

      <button
        onClick={handleZoomIn}
        style={{
          position: 'absolute',
          top: '10px',
          right: '50px',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-search-plus"></i>
      </button>

      <button
        onClick={handleZoomOut}
        style={{
          position: 'absolute',
          top: '10px',
          right: '90px',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '10px',
          cursor: 'pointer'
        }}
      >
        <i className="fas fa-search-minus"></i>
      </button>
    </div>
  );
};

export default ThreeSixtyViewerr;
