// Test checking the process.exit() function in AS

export function exit_no_code(): void {
    process.exit();
}

export function exit_with_code(): void {
    process.exit(2);
}
