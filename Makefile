wasm:
	@cd firnas_wasm && wasm-pack build --target web

start:
	@cd frontend && yarn start
