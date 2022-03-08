#makefile for typescript

WEB_ROOT	:= wwwroot
WEB_ROOT_SCRIPTS	:= $(WEB_ROOT)/Script


SHARED_DIR	:= Views/Shared
_LAYOUT_SCRIPT	:= $(WEB_ROOT_SCRIPTS)/_Layout.js
_LAYOUT_TS	:= $(SHARED_DIR)/_Layout.ts

HOME_DIR	:= Views/Home
HOME_SCRIPT	:= $(WEB_ROOT_SCRIPTS)/Home.js
HOME_TS	:= $(HOME_DIR)/Home.ts


all: $(HOME_SCRIPT) $(_LAYOUT_SCRIPT)
	@echo "$@ : $^"

$(_LAYOUT_SCRIPT): $(_LAYOUT_TS)
	tsc $^ --outFile $@ -target es6 



$(HOME_SCRIPT): $(HOME_TS)
	tsc $^ --outFile $@ -target es6 

