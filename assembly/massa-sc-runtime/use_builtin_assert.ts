// Test checking the assert function in AS

export function assert_no_msg(): i32 {
    // assert
    let res = false;
    assert(res == true);

    // This test should make sure that this computation is not returned (assert should stop the SC execution)
    return 1 + 1;
}

export function assert_with_msg(): i32 {
    // assert
    let res = false;
    assert(res == true, "Result is not true!");

    // This test should make sure that this computation is not returned (assert should stop the SC execution)
    return 2 + 2;
}
