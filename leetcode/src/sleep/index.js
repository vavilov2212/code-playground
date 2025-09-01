/**
 * @param {number} millis
 * @return {Promise}
 * 
 * https://leetcode.com/problems/sleep/
 */
async function sleep(millis) {
  return await new Promise(resolve => setTimeout(resolve, [millis]));
}

module.exports = sleep;