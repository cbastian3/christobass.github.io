// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let renderer;
let scene;
let light;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

function init() {

  // Get a reference to the container element that will hold our scene
  container = document.querySelector( '#scene-container' );
  //var level1 = docuement.querySelector('#level1');
  // create a Scene
  scene = new THREE.Scene();

  scene.background = new THREE.Color( 0x8FBCD4 );

  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set( 0, 0, 10 );

  // create a geometry
  const geometry = new THREE.ConeGeometry( 2, 2, 2 );

  // create a purple Standard material
  const material = new THREE.MeshStandardMaterial( { color: 0x800080 } );

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );

  // add the mesh to the scene object
  scene.add( mesh );

  // Create a directional light
  light = new THREE.DirectionalLight( 0xffffff, 5.0 );

  // move the light back and up a bit
  light.position.set( 10, 10, 10 );

  // remember to add the light to the scene
  scene.add( light );

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  // add the automatically created <canvas> element to the page
  container.appendChild( renderer.domElement );

}

function animate() {

  // call animate recursively
  requestAnimationFrame( animate );

  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.0001;
  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.001;

  light.position.x +=0.09;
  light.rotation.y +=0.09;

  // render, or 'create a still image', of the scene
  // this will create one still image / frame each time the animate
  // function calls itself
  renderer.render( scene, camera );

}

// call the init function to set everything up
init();

// then call the animate function to render the scene
animate();
