# WebGL 3D Model Viewer Using three.js ui extension for Contentful

<img width="400" src="assets/contentful 3d extension.png" />

This Contentful UI extension takes over asset selection for OBJ 3d model files. Simply install it and you can select it for any media type field of your content type (`Appearance > 3D Model Viewer`).

## Installation

Please install the [contentful-cli](https://github.com/contentful/contentful-cli#cloud-installation) and execute following commmand:

```
contentful extension create --space-id $SPACE_ID --id modelviewer --name "3D Model Viewer" --field-types "Asset" --src https:/mariobodemann.github.io/contentful-extensions-3d-model-viewer/ 
```

## What is Contentful?

[Contentful](https://www.contentful.com) provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.
