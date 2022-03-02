#makefile for typescript

WEB_ROOT	:= wwwroot
WEB_ROOT_SCRIPTS	:= $(WEB_ROOT)/Script


SHARED_DIR	:= Views/Shared
_LAYOYT_SCRIPT	:= $(WEB_ROOT_SCRIPTS)/_Layout.js
_LAYOYT_TS	:= $(SHARED_DIR)/_Layout.ts

$(_LAYOYT_SCRIPT): $(_LAYOYT_TS)
	@echo "$@ : $^"
	@tsc $^ --outFile $@


HOME_DIR	:= Views/Home
HOME_SCRIPT	:= $(WEB_ROOT_SCRIPTS)/Home.js
HOME_TS	:= $(HOME_DIR)/Home.ts

$(HOME_SCRIPT): $(HOME_TS)
	@echo "$@ : $^"
	@tsc $^ --outFile $@



all: $(HOME_SCRIPT) $(_LAYOYT_SCRIPT)
	@echo "$@ : $^"

run: all
	@dotnet run