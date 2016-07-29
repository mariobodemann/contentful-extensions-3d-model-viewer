URL=https://mariobodemann.github.io/contentful-extensions-3d-model-viewer/index.html

default:
	

create:	
	@echo 0 > .contentful-version
	contentful-extension create \
		--space-id ${SPACE_ID} \
		--id threed-model-viewer \
		--name "3D Model Viewer"\
		--field-types Asset \
		--src $(URL)
	

update:
	contentful-extension update \
		--space-id ${SPACE_ID} \
		--id threed-model-viewer \
		--name "3D Model Viewer"\
		--force \
		--field-types Asset \
		--src $(URL)
	

delete:
	 contentful-extension delete \
		--space-id $(SPACE_ID) \
		--id threed-model-viewer \
		--force

list:
	 @contentful-extension read \
		--space-id $(SPACE_ID) \
		--all

