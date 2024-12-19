# Cleanup
rm -v simple-name.wasm

# Generate wasm from wat
wat2wasm simple.wat -o simple-name.wasm --debug-names

# section 1 (2 bytes)
echo "y" > section_1.txt && ls -alh section_1.txt
wasm-custom-section ./simple-name.wasm add 1 < section_1.txt
mv -v simple-name.wasm.out simple-name.wasm
rm -v section_1.txt

# section 2 (2 bytes)
echo "k" > section_2.txt && ls -alh section_2.txt
wasm-custom-section ./simple-name.wasm add 2 < section_2.txt
mv -v simple-name.wasm.out simple-name.wasm
rm -v section_2.txt

# section 3 (2 bytes)
echo "u" > section_3.txt && ls -alh section_3.txt
wasm-custom-section ./simple-name.wasm add 3 < section_3.txt
mv -v simple-name.wasm.out simple-name.wasm
rm -v section_3.txt

# section 3 (11 bytes)
echo "azedcfgABP" > section_3_2.txt && ls -alh section_3_2.txt
wasm-custom-section ./simple-name.wasm add 3 < section_3_2.txt
mv -v simple-name.wasm.out simple-name.wasm
rm -v section_3_2.txt

# Rename
mv -v simple-name.wasm simple-custom-section.wasm

# List custom sections
echo "Custom sections (for simple-name.wasm):"
wasm-custom-section simple-custom-section.wasm list