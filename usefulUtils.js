
/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @param  {Function} func A function to call after N milliseconds
 * @param  {number} wait The number of milliseconds to wait
 * @param  {boolean} immediate Trigger the function on the leading edge instead of the trailing
 * @return {Function} A function, that, as long as it continues to be invoked, will not be triggered
 */
export function debounce(func, wait, immediate) {
    let timeout;
    return (...passedArgs) => {
        const context = this;
        const args = passedArgs;
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

/**
 * https://jsfiddle.net/jonathansampson/m7G64/
 * Allow callback to run at most 1 time per 100ms
 * window.addEventListener("resize", throttle(callback, 100));
 * Allow callback to run on each resize event
 * window.addEventListener("resize", callback2);
 *
 * function callback ()  { console.count("Throttled");     }
 * function callback2 () { console.count("Not Throttled"); }
 *
 * @method function
 * @param  {Function} callback The function that will be executed
 * @param  {Number}   limit    The time it will wait before excuting the callba again
 */
export function throttle(callback, limit) {
    let wait = false;                  // Initially, we're not waiting

    return (...args) => { // We return a throttled function
        if (!wait) { // If we're not waiting
            callback.apply(this, args); // Execute users function with conext and arguments
            wait = true; // Prevent future invocations
            setTimeout(() => { // After a period of time
                wait = false; // And allow future invocations
            }, limit);
        }
    };
}
