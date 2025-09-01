// const mocha = require('mocha');
const assert = require("assert");
const sleep = require("../../src/sleep");

describe("2621. Sleep", () => {
  const tollerance = 20;

  it("should wailt at least 100 millis", async function () {
    const delay = 100;
    const t = Date.now();
    const s = await sleep(delay).then(() => Date.now());

    assert.ok(
      s - t > 0,
      `Function did not wait: executed after ${s - t} millis`
    );
    assert.ok(
      s - t - tollerance <= delay,
      `Function did not wait: executed after ${s - t} millis`
    );
  });

  it("should wailt at least 200 millis", async function () {
    const delay = 200;
    const t = Date.now();
    const s = await sleep(delay).then(() => Date.now());

    assert.ok(
      s - t > 0,
      `Function did not wait: executed after ${s - t} millis`
    );
    assert.ok(
      s - t - tollerance <= delay,
      `Function did not wait: executed after ${s - t} millis`
    );
  });
});
