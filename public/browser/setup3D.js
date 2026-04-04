class Visualizer3D {
  constructor() {
    this.table = document.getElementById('board');
    if (!this.table) {
      setTimeout(() => new Visualizer3D(), 500);
      return;
    }

    this.rows = this.table.rows.length;
    this.cols = this.table.rows[0].cells.length;
    
    // Hide the original DOM board but keep it there
    this.table.style.opacity = '0';
    this.table.style.pointerEvents = 'none';
    this.table.style.position = 'absolute';
    this.table.style.zIndex = '-1';
    
    // document.body.style.backgroundColor = '#030310'; // Removed to keep original

    this.initThreeJS();
    this.createGrid();
    this.setupMutationObserver();
    this.setupRaycaster();
    this.injectProfileIntoTutorial();
    
    this.animate();
  }

  initThreeJS() {
    this.container = document.createElement('div');
    this.container.id = 'three-container';
    this.container.style.position = 'absolute';
    this.container.style.top = '150px';
    this.container.style.left = '0';
    this.container.style.width = '100vw';
    this.container.style.height = 'calc(100vh - 150px)';
    this.container.style.zIndex = '1';
    document.body.appendChild(this.container);

    this.scene = new THREE.Scene();
    // Use an off-white background to match original
    this.scene.background = new THREE.Color('#ffffff');
    // Soft fog
    this.scene.fog = new THREE.Fog('#ffffff', 20, 100);

    const aspect = window.innerWidth / (window.innerHeight - 150);
    this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    
    // Isometric-ish angled down
    this.camera.position.set(0, 45, 30);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight - 150);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(20, 50, 20);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    // Particles background removed for cleaner look
  }
  
  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) {
      positions[i] = (Math.random() - 0.5) * 150;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.2, transparent: true, opacity: 0.6 });
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createGrid() {
    this.cubes = {};
    const cubeSize = 0.9;
    const gap = 0.1;
    
    // Center the grid
    const offsetX = (this.cols * (cubeSize + gap)) / 2;
    const offsetZ = (this.rows * (cubeSize + gap)) / 2;

    this.geometry = new THREE.BoxGeometry(cubeSize, 0.2, cubeSize);
    
    // Default material - to match original grid
    this.materials = {
      default: new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: true }),
      wall: new THREE.MeshPhongMaterial({ color: 0x2c3e50, shininess: 30 }),
      start: new THREE.MeshStandardMaterial({ color: 0x1abc9c, emissive: 0x1abc9c, emissiveIntensity: 0.4 }),
      target: new THREE.MeshStandardMaterial({ color: 0xe74c3c, emissive: 0xe74c3c, emissiveIntensity: 0.4 }),
      visited: new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.5 }),
      shortestPath: new THREE.MeshStandardMaterial({ color: 0xffea00, emissive: 0xffea00, emissiveIntensity: 0.8 })
    };

    // Edge geometry for the grid lines
    const edges = new THREE.EdgesGeometry(this.geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x82c8fa, transparent: true, opacity: 0.3 });

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const mesh = new THREE.Mesh(this.geometry, this.materials.default);
        mesh.position.set(
          c * (cubeSize + gap) - offsetX,
          0, // Flush with grid
          r * (cubeSize + gap) - offsetZ
        );
        
        // Add grid outline to each cube
        const edgeLines = new THREE.LineSegments(edges, lineMaterial);
        mesh.add(edgeLines);

        mesh.userData = { r, c, id: `${r}-${c}` };
        this.scene.add(mesh);
        this.cubes[`${r}-${c}`] = mesh;
      }
    }
    
    // Initial sync
    setTimeout(() => this.fullSync(), 500);
  }

  fullSync() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const td = document.getElementById(`${r}-${c}`);
        if(td) this.updateCubeState(`${r}-${c}`, td.className);
      }
    }
  }

  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const id = mutation.target.id;
          const className = mutation.target.className;
          if (this.cubes[id]) {
            this.updateCubeState(id, className);
          }
        }
      });
    });

    const config = { attributes: true, subtree: true, attributeFilter: ['class'] };
    this.observer.observe(this.table, config);
  }

  updateCubeState(id, className) {
    const cube = this.cubes[id];
    let targetY = 0;
    let targetScaleY = 1;
    let mat = this.materials.default;

    if (className.includes('wall')) {
      mat = this.materials.wall;
      targetScaleY = 6; // Extrude wall
      targetY = 0.5;
    } else if (className.includes('start')) {
      mat = this.materials.start;
      targetScaleY = 2;
      targetY = 0.1;
    } else if (className.includes('target')) {
      mat = this.materials.target;
      targetScaleY = 2;
      targetY = 0.1;
    } else if (className.includes('shortest-path')) {
      mat = this.materials.shortestPath;
      targetScaleY = 2.5;
      targetY = 0.15;
    } else if (className.includes('visited')) {
      mat = this.materials.visited;
      targetScaleY = 2;
      targetY = 0.1;
    }

    cube.material = mat;
    
    // Simple basic animation
    cube.scale.y = targetScaleY;
    cube.position.y = targetY;
  }

  setupRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isDragging = false;
    this.isRightClickDragging = false;

    // We block native table interacting so we overlay on our Three container
    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
    window.addEventListener('mouseup', (e) => this.onMouseUp(e));
    
    // Also handle resizing
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / (window.innerHeight - 150);
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight - 150);
    });
  }

  getIntersectedCube(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / window.innerWidth) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / (window.innerHeight - 150)) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(Object.values(this.cubes));
    
    if (intersects.length > 0) {
      return intersects[0].object;
    }
    return null;
  }

  onMouseDown(e) {
    const cube = this.getIntersectedCube(e);
    if (cube) {
      const td = document.getElementById(cube.userData.id);
      if (td && td.onmousedown) {
        td.onmousedown({ preventDefault: () => {} });
      }
    }
  }

  onMouseMove(e) {
    const cube = this.getIntersectedCube(e);
    if (cube) {
      if (this.lastHoveredCube && this.lastHoveredCube !== cube) {
        const lastTd = document.getElementById(this.lastHoveredCube.userData.id);
        if (lastTd && lastTd.onmouseleave) lastTd.onmouseleave();
      }
      
      const td = document.getElementById(cube.userData.id);
      if (td && td.onmouseenter) {
        td.onmouseenter();
      }
      this.lastHoveredCube = cube;
    }
  }

  onMouseUp(e) {
    // just fire to any cube we are on
    const cube = this.getIntersectedCube(e);
    if (cube) {
      const td = document.getElementById(cube.userData.id);
      if (td && td.onmouseup) td.onmouseup();
    } else {
      // Fire on any arbitrary element in board if mouse is up anywhere
      const randomTd = document.getElementById('0-0');
      if (randomTd && randomTd.onmouseup) randomTd.onmouseup();
    }
  }

  injectProfileIntoTutorial() {
    const profileHTML = `
      <div id="profileInTutorial" style="margin: 15px auto; display: flex; max-width: 320px; align-items: center; gap: 15px; background: #f8f9fa; border: 1px solid #e2e8f0; padding: 12px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <img src="public/styling/Virendra.jpeg" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #00d4ff;" />
        <div style="text-align: left;">
          <h4 style="margin: 0 0 2px 0; font-size: 16px; color: #1e293b; font-weight: 700;">Virendra Gadekar</h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; font-weight: 600;">Full Stack Developer • DYPSST 2025</p>
          <div style="display: flex; gap: 8px;">
            <a href="https://github.com/viru0909-dev" target="_blank" style="font-size: 11px; text-decoration: none; background: #e2e8f0; color: #475569; padding: 3px 8px; border-radius: 4px; font-weight: 500;">GitHub</a>
            <a href="https://www.linkedin.com/in/virendragadekar/" target="_blank" style="font-size: 11px; text-decoration: none; background: #dbeafe; color: #2563eb; padding: 3px 8px; border-radius: 4px; font-weight: 500;">LinkedIn</a>
          </div>
        </div>
      </div>
    `;

    const inject = () => {
      const tutorial = document.getElementById('tutorial');
      if (tutorial) {
        // Find if this is the first page by checking for the text
        if (tutorial.innerHTML.includes('Welcome to Pathfinding Visualizer!')) {
          if (!document.getElementById('profileInTutorial')) {
            const h6 = tutorial.querySelector('h6');
            if (h6) h6.insertAdjacentHTML('afterend', profileHTML);
          }
        }
      }
    };

    // Initial check
    setTimeout(inject, 500);

    // Watch for tutorial modal changes (when user clicks Next/Previous)
    const observer = new MutationObserver(() => inject());
    const tutorialElement = document.getElementById('tutorial');
    if (tutorialElement) {
      observer.observe(tutorialElement, { childList: true, subtree: true, characterData: true });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Slow particle rotation
    if (this.particles) {
      this.particles.rotation.y += 0.0005;
      this.particles.rotation.x += 0.0002;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Start visualizer when DOM is ready
window.addEventListener('load', () => {
  new Visualizer3D();
});
