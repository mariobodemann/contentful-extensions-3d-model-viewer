# WebGL 3D Model Viewer Using three.js extension for Contentful

<img width="400" src="assets/contentful 3d extension.png" />

## Specification

* OBJ loader for loading a geometry format that is as old and widely supported as GIFs.
* MTL loader for loading really simple materials.
* Orbit controls to smoothly turn the camera around the model.
* Nearest-neighbor filtering and a pure white ambient light to showcase pixel art textures.
* All libraries taken from the [three.js](https://github.com/mrdoob/three.js/) repository.

## Contenful UI Extension

Contentful, [the headless CMS](https://contentful.com), offers the ability to add a custom
ui extension. This one will be a sample demonstrating, on how to use a 3d model in this CMS.

For updating/creating the ui, please use the supplied [Makefile](Makefile). Also the 
[contentful-extension-cli](https://github.com/contentful/contentful-extension-cli) is required.
