/*
 * Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.
 *
 * The class has three public methods:
 *
 * set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.
 *
 * get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.
 *
 * count(): returns the count of un-expired keys.
 */

var TimeLimitedCache = function () {
  this.keyValueRegistry = {};
  this.cacheDurationRegistry = {};
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  if (
    typeof key !== "number" ||
    typeof value !== "number" ||
    typeof duration !== "number"
  ) {
    throw new Error("Wrong parameters");
  }

  const keyExists = this.keyValueRegistry[key];

  this.keyValueRegistry[key] = value;
  this.cacheDurationRegistry[key] = Date.now() + duration;

  if (!keyExists) {
    return false;
  }

  return true;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (this.keyValueRegistry[key]) {
    if (this.cacheDurationRegistry[key] > Date.now()) {
      return this.keyValueRegistry[key];
    } else {
      delete this.keyValueRegistry[key];
      delete this.cacheDurationRegistry[key];
    }
  }

  return -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return Object.keys(this.keyValueRegistry).reduce((count, key) => {
    if (this.cacheDurationRegistry[key] > Date.now()) {
      count++;
    }

    return count;
  }, 0);
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */

module.exports = TimeLimitedCache;