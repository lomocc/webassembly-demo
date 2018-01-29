require("webassembly")
    .load("program.wasm")
    .then(module => {
        console.log(`wasm: 1 + 2 = ${module.exports.add(1, 2)}`);
    });