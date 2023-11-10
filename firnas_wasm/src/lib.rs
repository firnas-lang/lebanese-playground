use firnas_compiler::compiler;
use firnas_vm::stdlib::io::StdIO;
use firnas_vm::virtual_machine;
use wasm_bindgen::prelude::*;

struct WasmStdIO {
    pub on_print: Box<dyn Fn(String) -> ()>,
}

impl StdIO for WasmStdIO {
    fn print(&self, content: &str) {
        let s = format!("{content}");
        (self.on_print)(s);
    }
}

#[wasm_bindgen]
pub fn compile(content: &str, callback: &js_sys::Function) {
    let maybe_func = compiler::Compiler::compile(
        content.to_string(),
        firnas_ext::Extensions {
            lists: false,
            lambdas: false,
        },
    );

    match maybe_func {
        Ok(func) => {
            let cb: js_sys::Function = callback.clone();
            let wasm_std_io = WasmStdIO {
                on_print: Box::new(move |output| {
                    let x = JsValue::from(output);
                    let _ = cb.call1(&JsValue::null(), &x);
                }),
            };
            let std_io = Box::new(wasm_std_io);
            let mut vm = virtual_machine::VirtualMachine::new(std_io);
            vm.interpret(func).unwrap();
        }
        Err(_) => {}
    }
}
