var container;
container = document.createElement('div');
document.body.appendChild(container);

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var cfExtension = window.contentfulExtension || window.contentfulWidget
cfExtension.init(function (api) {
    console.log('Loaded')

    api.space.getAssets().then(function (assets) {
        console.log(assets);

        assets.items.forEach(asset => {
            var detail = asset.fields.file['en-US'];
            if (detail.fileName.endsWith("obj")) {
                var div = document.createElement('div');
                div.src = detail.url;
                div.width = 200;
                div.height = 200;
                div.textContent = detail.fileName
                div.style = 'background: grey; padding:10px; display: inline-block; *display: inline; zoom: 1; vertical-align: top; font-size: 12px;'

                loadObject(div, detail.url);

                container.appendChild(div)
            }
        });

        api.window.updateHeight();
    });
});

function loadObject(element, modelUrl) {
    var camera, controls, scene, renderer;
    var lighting, ambient, keyLight, fillLight, backLight;

    /* Camera */
    camera = new THREE.PerspectiveCamera(45, element.width / element.height, 1, 1000);
    camera.position.z = 3;

    /* Scene */
    scene = new THREE.Scene();
    lighting = false;

    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    /* Renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(element.width, element.height);
    renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

    element.appendChild(renderer.domElement);

    /* Controls */
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    /* Events */
    element.addEventListener('resize', onWindowResize, false);
    element.addEventListener('keydown', onKeyboardEvent, false);

    /* Model */
    var objLoader = new THREE.OBJLoader();
    var path = modelUrl.split('/');
    var file = path.pop();
    path = path.join('/') + '/';

    console.log(file + "@" + path);

    objLoader.setPath(path);
    objLoader.load(file, function (object) {
        scene.add(object);
        render();
    });

    function onWindowResize() {
        console.log('Resized');

        camera.aspect = element.innerWidth / element.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(element.innerWidth, element.innerHeight);
    }

    function onKeyboardEvent(e) {
        console.log('KeyboardEvent');

        if (e.code === 'KeyL') {

            lighting = !lighting;

            if (lighting) {
                ambient.intensity = 0.25;
                scene.add(keyLight);
                scene.add(fillLight);
                scene.add(backLight);
            } else {
                ambient.intensity = 1.0;
                scene.remove(keyLight);
                scene.remove(fillLight);
                scene.remove(backLight);
            }
        }
    }

    function render() {
        console.log('rendering')
        renderer.render(scene, camera);
    }
}