wasm:
	@cd firnas_wasm && wasm-pack build --target web

frontend:
	@cd frontend && yarn start
