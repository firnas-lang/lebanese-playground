wasm:
	@cd firnas_wasm && wasm-pack build --release --target web
	@cd firnas_wasm/pkg && wasm-opt -Oz -o firnas_wasm_bg.wasm firnas_wasm_bg.wasm

playground:
	@cd frontend && yarn start
