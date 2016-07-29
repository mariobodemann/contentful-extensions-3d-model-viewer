VERSION=`cat .contentful-version`
NEW_VERSION=$$(( $(VERSION) +1))
URL=https://mariobodemann.github.io/contentful-extensions-3d-model-viewer/index.html

default:
	

create:	
	export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=${CMA_TOKEN};
	contentful-extension create \
		--space-id ${SPACE_ID} \
		--id threed-model-viewer \
		--name "3D Model Viewer"\
		--field-types Asset \
		--src $(URL)
	
	@echo 0 > .contentful-version

update:
	@echo $(VERSION) → $(NEW_VERSION)
	
	export CONTENTFUL_MANAGEMENT_ACCESS_TOKEN=${CMA_TOKEN};
	contentful-extension update \
		--space-id ${SPACE_ID} \
		--id threed-model-viewer \
		--name "3D Model Viewer"\
		--version $(NEW_VERSION) \
		--field-types Asset \
		--src $(URL)
	
	@echo $(NEW_VERSION) > .contentful-version

delete:
	 contentful-extension delete \
		--space-id $(SPACE_ID) \
		--id threed-model-viewer \
		--version $(VERSION)

list:
	 @contentful-extension read \
		--space-id $(SPACE_ID) \
		--all

