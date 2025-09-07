// const mocha = require('mocha');
const assert = require("assert");
const TimeLimitedCache = require("../../src/cache_with_time_limit");

describe("2622. Cache With Time Limit", () => {
  it("should create class instance with set, get, count methods", function () {
    const cache = new TimeLimitedCache();

    assert.ok(cache instanceof TimeLimitedCache);
    assert.ok(cache.set != undefined);
    assert.ok(cache.get != undefined);
    assert.ok(cache.count != undefined);
    assert.ok(typeof cache.set === "function");
    assert.ok(typeof cache.get === "function");
    assert.ok(typeof cache.count === "function");
  });

  it("should set key-value pair with duration", function () {
    const cache = new TimeLimitedCache();
    cache.set(1, 42, 10000);

    assert.ok(Object.keys(cache.keyValueRegistry).length === 1);
    assert.ok(cache.keyValueRegistry[1] === 42);
    assert.ok(cache.cacheDurationRegistry[1] > Date.now());
  });

  it("should return appropriate flag when setting key-value pair", function () {
    const cache = new TimeLimitedCache();
    const flag1 = cache.set(1, 42, 10000);

    assert.ok(
      !flag1,
      `Key "1" doesn't exist, so the "set" method should return false: ${flag1}`
    );

    const flag2 = cache.set(1, 50, 10000);

    assert.ok(
      flag2,
      `Key "1" already exists, so the "set" method should return true: ${flag2}`
    );
  });

  it("should return value if un-expired key exists", function () {
    const cache = new TimeLimitedCache();
    cache.set(1, 42, 10000);

    assert.ok(
      cache.get(1) === 42,
      `Key "1" should exist, but it doesn't: ${cache.get(1)}`
    );
  });

  it("should return -1 if the key doesn't exist", function () {
    const duration = 500;
    const cache = new TimeLimitedCache();
    cache.set(1, 42, duration);

    assert.ok(
      cache.get(2) === -1,
      `Key "2" should not exist, but it does: ${cache.get(2)}`
    );
  });

  it("should return -1 if the key is expired", function () {
    const tollerance = 20;
    const duration = 500;
    const cache = new TimeLimitedCache();
    cache.set(1, 42, duration);

    return new Promise((resolve) =>
      setTimeout(() => {
        assert.ok(cache.get(1) === -1),
          `Key "1" should be expired after ${duration}, but it still does: ${cache.get(
            1
          )}`;
        resolve();
      }, duration + tollerance)
    );
  });

  it("should return count equal to 0 if there are no un-expired keys", function () {
    const cache = new TimeLimitedCache();

    assert.ok(
      cache.count() === 0,
      `Count should be 0, but it's not: ${cache.count()}`
    );
  });

  it("should return count of un-expired keys", function () {
    const duration = 500;
    const cache = new TimeLimitedCache();
    cache.set(1, 42, duration);
    cache.set(2, 42, duration * 2);
    cache.set(3, 42, duration * 3);

    assert.ok(
      cache.count() === 3,
      `Count should be 3, but it's not: ${cache.count()}`
    );
  });

  it("should return count of un-expired keys", function () {
    const tollerance = 20;
    const duration = 500;
    const cache = new TimeLimitedCache();
    cache.set(1, 42, duration);
    cache.set(2, 42, duration * 2);
    cache.set(3, 42, duration * 3);

    return new Promise(function (resolve) {
      setTimeout(() => {
        assert.ok(cache.count() === 2),
          `Count should be 2 after ${duration}, but it's not: ${cache.count()}`;
        resolve();
      }, duration * 2 - tollerance);
    });
  });
});
