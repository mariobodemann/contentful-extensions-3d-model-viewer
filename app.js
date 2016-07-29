var container;
container = document.createElement('div');
document.body.appendChild(container);

if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var selected = null;

var cfExtension = window.contentfulExtension || window.contentfulWidget
cfExtension.init(function (api) {
    console.log('Loaded')

    api.space.getAssets().then(function (assets) {

        assets.items.forEach(asset => {
            var detail = asset.fields.file['en-US'];
            if (detail.fileName.endsWith("obj")) {
                var div = document.createElement('div');
                div.width = 200;
                div.height = 200;
                div.style = 'background: white; padding:10px; display: inline-block; *display: inline; zoom: 1; vertical-align: top; font-size: 12px;'

                loadObject(api, div, asset);

                container.appendChild(div);
            }
        });

        api.window.updateHeight();
    });
});

function loadObject(api, element, asset) {
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
    scene.add(keyLight);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    scene.add(fillLight);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
    scene.add(backLight);

    /* Renderer */
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(element.width, element.height);
    renderer.setClearColor(new THREE.Color("hsl(0, 0%, 100%)"));

    element.appendChild(renderer.domElement);

    /* Controls */
    controls = new THREE.OrbitControls(camera, element);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    element.onclick = selected.bind(this);

    /* Model */
    var objLoader = new THREE.OBJLoader();
    var modelUrl = asset.fields.file['en-US'].url;
    var path = modelUrl.split('/');
    var file = path.pop();
    path = path.join('/') + '/';

    objLoader.setPath(path);
    objLoader.load(file, function (object) {
        object.children.forEach(child => {
            var hue = Math.random() * 360;
            hue = hue - hue % 1.0;
            child.material = new THREE.MeshPhongMaterial( {
                color: new THREE.Color("hsl(" + hue + ", 90%, 25%)"),
                specular: new THREE.Color("hsl(" + (hue + 20) % 360+ ", 90%, 50%)"),
                shading: THREE.SmoothShading
            });
        });
        scene.add(object);
        animate();
    });

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }

    function selected() {
        console.log('selected');
        if (selected) {
            this.selected.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 100%)"));
        }

        this.renderer.setClearColor(0x00FF00);

        selected = {'renderer':this.renderer};

        this.api.field.setValue(this.asset.sys.id);
    }
}