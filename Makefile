wasm:
	@cd firnas_wasm && wasm-pack build --target web

playground:
	@cd frontend && yarn start
