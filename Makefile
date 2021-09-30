NS=rhino
VERSION ?= local
PORTS= \
	-p 6001:6001
VOLUMES= -v /var/log/docker:var/log
REPO=rhinosecuritylabs
NAME=djavanweb
INSTANCE=default
ENV= \
	-e BABEL_DISABLE_CACHE=1

.PHONY: build push shell run start stop rm release

build:
	docker build -t $(REPO)/$(NAME):$(VERSION) .

push:
	docker push $(REPO)/$(NAME):$(VERSION)

shell:
	docker run --rm --name $(NAME)-$(INSTANCE) -i -t $(PORTS) $(ENV) $(REPO)/$(NAME):$(VERSION) /bin/bash

run:
	docker run -it --rm --name $(NAME)-$(INSTANCE) $(PORTS) $(ENV) $(REPO)/$(NAME):$(VERSION)

start:
	docker run -d --name $(NAME)-$(INSTANCE) $(PORTS) $(ENV) $(REPO)/$(NAME):$(VERSION)

stop:
	docker stop $(NAME)-$(INSTANCE)

rm:
	docker rm $(NAME)-$(INSTANCE)

release: build
	make push -e VERSION=$(VERSION)

default: build
