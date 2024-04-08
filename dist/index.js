/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/setupMediaRecorder.ts":
/*!***********************************!*\
  !*** ./src/setupMediaRecorder.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMediaRecorder": () => (/* binding */ setupMediaRecorder)
/* harmony export */ });
let recordedChunks;
function setupMediaRecorder(mediaStreamDestination) {
    const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
    recordedChunks = [];
    mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };
    mediaRecorder.onstop = function () {
        let blob = new Blob(recordedChunks, { type: 'audio/wav' });
        recordedChunks = [];
        let url = URL.createObjectURL(blob);
        /// todo: check if there are more sensible ways. 
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'recording.wav';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return mediaRecorder;
}


/***/ }),

/***/ "./src/templates/oscillateFreqAndVol.ts":
/*!**********************************************!*\
  !*** ./src/templates/oscillateFreqAndVol.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firstSetOfFreqs": () => (/* binding */ firstSetOfFreqs),
/* harmony export */   "secondSetOfFreqs": () => (/* binding */ secondSetOfFreqs)
/* harmony export */ });
/* harmony import */ var _tools_frequency__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/frequency */ "./src/tools/frequency.ts");
/* harmony import */ var _tools_volume__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools/volume */ "./src/tools/volume.ts");


function firstSetOfFreqs(freqOsc, volumeGain, secondVolumeGain, context) {
    const templateTime = 0.5 * 60;
    const upperFreq = 142.;
    const lowerFreq = 132;
    const cycleTime = 6.8;
    const startTime = context.currentTime;
    (0,_tools_frequency__WEBPACK_IMPORTED_MODULE_0__.sineFrequency)(freqOsc, startTime, lowerFreq, upperFreq, templateTime, templateTime, 5);
    (0,_tools_volume__WEBPACK_IMPORTED_MODULE_1__.setVolumeLoop)(volumeGain, startTime, 6, 0.8, templateTime);
    //sineVolume(secondVolumeGain, startTime, 0.3, 1, cycleTime, templateTime, 0.25);
    const promise = new Promise((resolve, reject) => setTimeout(() => {
        resolve(context.currentTime);
    }, templateTime * 1000));
    return promise;
}
function secondSetOfFreqs(freqOsc, volumeGain, secondVolumeGain, context) {
    const templateTime = 0.5 * 60;
    const upperFreq = 162.;
    const lowerFreq = 132;
    const cycleTime = 6.8;
    const startTime = context.currentTime;
    (0,_tools_frequency__WEBPACK_IMPORTED_MODULE_0__.sineFrequency)(freqOsc, startTime, lowerFreq, upperFreq, templateTime, templateTime, 5);
    //setVolumeLoop(volumeGain, startTime, 6, 0.8, templateTime);
    (0,_tools_volume__WEBPACK_IMPORTED_MODULE_1__.setVolumeLoop)(volumeGain, startTime, 1.8, 0.2, templateTime);
    (0,_tools_volume__WEBPACK_IMPORTED_MODULE_1__.sineVolume)(secondVolumeGain, startTime, 0.3, 1, cycleTime, templateTime, 0.25);
    const promise = new Promise((resolve, reject) => setTimeout(() => {
        resolve(context.currentTime);
    }, templateTime * 1000));
    return promise;
}


/***/ }),

/***/ "./src/tools/frequency.ts":
/*!********************************!*\
  !*** ./src/tools/frequency.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFrequencyOscillator": () => (/* binding */ createFrequencyOscillator),
/* harmony export */   "fixedFrequency": () => (/* binding */ fixedFrequency),
/* harmony export */   "sineFrequency": () => (/* binding */ sineFrequency)
/* harmony export */ });
/* harmony import */ var _sineOscillation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sineOscillation */ "./src/tools/sineOscillation.ts");

const createFrequencyOscillator = (frequency, context) => {
    //Frequency oscillator oscillates the frequency. 
    const freqOsc = context.createOscillator();
    freqOsc.frequency.value = frequency;
    freqOsc.type = 'sine';
    return freqOsc;
};
function fixedFrequency(frequencyOscillator, toFrequency, startingTime, transitionTime) {
    frequencyOscillator.frequency.linearRampToValueAtTime(toFrequency, startingTime + transitionTime);
}
function sineFrequency(frequencyOscillator, startingTime, freqLowerBound, freqUpperBound, cycleTime, totalInSeconds, step) {
    let currentTime = startingTime;
    while (currentTime <= startingTime + totalInSeconds) {
        const freq = (0,_sineOscillation__WEBPACK_IMPORTED_MODULE_0__.sineOscillation)(cycleTime, freqUpperBound, freqLowerBound, currentTime);
        frequencyOscillator.frequency.linearRampToValueAtTime(freq, currentTime);
        currentTime += step;
    }
}


/***/ }),

/***/ "./src/tools/sineOscillation.ts":
/*!**************************************!*\
  !*** ./src/tools/sineOscillation.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sineOscillation": () => (/* binding */ sineOscillation)
/* harmony export */ });
function sineOscillation(cycleTime, upperBound, lowerBound, timepoint) {
    const sineFrequency = 1 / cycleTime;
    const oscillationRange = (upperBound - lowerBound);
    const value = lowerBound + (Math.sin(2 * Math.PI * sineFrequency * timepoint) + 1) / 2 * oscillationRange;
    return value;
}


/***/ }),

/***/ "./src/tools/volume.ts":
/*!*****************************!*\
  !*** ./src/tools/volume.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVolumeNode": () => (/* binding */ createVolumeNode),
/* harmony export */   "setVolumeLoop": () => (/* binding */ setVolumeLoop),
/* harmony export */   "sineVolume": () => (/* binding */ sineVolume)
/* harmony export */ });
/* harmony import */ var _sineOscillation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sineOscillation */ "./src/tools/sineOscillation.ts");

const createVolumeNode = (context) => context.createGain();
const setVolumeLoop = (volumeGain, starting, lengthInSec, pauseAfterInSek, totalInSeconds) => {
    //25% ramp up, 25% ramp down
    let currentTime = starting;
    const soundFulldWhen = 0.25;
    const startMutingDownWhen = 0.75;
    while (currentTime <= starting + totalInSeconds) {
        volumeGain.gain.linearRampToValueAtTime(1, currentTime + lengthInSec * soundFulldWhen);
        volumeGain.gain.setValueAtTime(1, currentTime + lengthInSec * startMutingDownWhen);
        volumeGain.gain.linearRampToValueAtTime(0.1, currentTime + lengthInSec);
        volumeGain.gain.setValueAtTime(0.1, currentTime + lengthInSec + pauseAfterInSek - 0.015);
        currentTime = currentTime + lengthInSec + pauseAfterInSek;
        console.log(currentTime);
    }
    return currentTime;
};
function sineVolume(volumeGain, startingTime, minVolume, maxVolume, cycleTime, totalInSeconds, step) {
    let currentTime = startingTime;
    while (currentTime <= startingTime + totalInSeconds) {
        const volume = (0,_sineOscillation__WEBPACK_IMPORTED_MODULE_0__.sineOscillation)(cycleTime, maxVolume, minVolume, currentTime);
        //console.log(freq);
        volumeGain.gain.linearRampToValueAtTime(volume, currentTime);
        currentTime += step;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "context": () => (/* binding */ context),
/* harmony export */   "secondVolumeGain": () => (/* binding */ secondVolumeGain),
/* harmony export */   "stop": () => (/* binding */ stop)
/* harmony export */ });
/* harmony import */ var _tools_frequency__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools/frequency */ "./src/tools/frequency.ts");
/* harmony import */ var _setupMediaRecorder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setupMediaRecorder */ "./src/setupMediaRecorder.ts");
/* harmony import */ var _tools_volume__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools/volume */ "./src/tools/volume.ts");
/* harmony import */ var _templates_oscillateFreqAndVol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/oscillateFreqAndVol */ "./src/templates/oscillateFreqAndVol.ts");




let mediaRecorder;
const context = new AudioContext();
let freqOsc;
let volumeGain;
let secondVolumeGain;
const FREQUENCY = 120;
async function start(doRecord) {
    // Check for Web Audio API support
    window.AudioContext = window.AudioContext;
    if (!window.AudioContext) {
        alert("Web Audio API is not supported in this browser");
    }
    //The AudioContext interface represents an audio-processing graph built from audio modules linked together, 
    //each represented by an AudioNode.
    const mediaStreamDestination = context.createMediaStreamDestination();
    if (doRecord) {
        mediaRecorder = (0,_setupMediaRecorder__WEBPACK_IMPORTED_MODULE_1__.setupMediaRecorder)(mediaStreamDestination);
        // Is there significant delay when using context.currentTime here and later? 
        mediaRecorder.start(context.currentTime);
    }
    //Gain node represents change in the volume. A GainNode always has exactly one input and one output, 
    //both with the same number of channels.
    // There are two volume gains in sequence to add on top of each other. 
    volumeGain = (0,_tools_volume__WEBPACK_IMPORTED_MODULE_2__.createVolumeNode)(context);
    secondVolumeGain = (0,_tools_volume__WEBPACK_IMPORTED_MODULE_2__.createVolumeNode)(context);
    freqOsc = (0,_tools_frequency__WEBPACK_IMPORTED_MODULE_0__.createFrequencyOscillator)(FREQUENCY, context);
    // Nodes can be piped in different ways: 
    // Sum 
    // volumeOsc => volumeGain  \   
    //              freqOsc     - =>  totalGain
    //           totalGainValue /
    freqOsc.connect(volumeGain);
    volumeGain.connect(secondVolumeGain);
    secondVolumeGain.connect(context.destination);
    volumeGain.connect(mediaStreamDestination);
    freqOsc.start(context.currentTime);
    await (0,_templates_oscillateFreqAndVol__WEBPACK_IMPORTED_MODULE_3__.firstSetOfFreqs)(freqOsc, volumeGain, secondVolumeGain, context);
    await (0,_templates_oscillateFreqAndVol__WEBPACK_IMPORTED_MODULE_3__.secondSetOfFreqs)(freqOsc, volumeGain, secondVolumeGain, context);
    stop();
}
function stop() {
    freqOsc.stop();
    //volumeOsc.stop();
    if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder = undefined;
    }
}
const startButton = document.createElement("button");
startButton.onclick = (event) => start(false);
startButton.innerHTML = "Start";
const recordButton = document.createElement("button");
recordButton.onclick = (event) => start(true);
recordButton.innerHTML = "Record";
const stopButton = document.createElement("button");
stopButton.onclick = (event) => stop();
stopButton.innerHTML = "Stop";
const buttonsDiv = document.getElementById("audioButtons");
buttonsDiv.append(startButton);
buttonsDiv.append(recordButton);
buttonsDiv.append(stopButton);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QyxZQUFZLENBQUMsU0FBUyxHQUFHLFFBQVE7QUFHakMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRCxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QyxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU07QUFHN0IsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMzRCxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQy9CLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpdHRsZV9kZW1vcy8uL3NyYy9zZXR1cE1lZGlhUmVjb3JkZXIudHMiLCJ3ZWJwYWNrOi8vbGl0dGxlX2RlbW9zLy4vc3JjL3RlbXBsYXRlcy9vc2NpbGxhdGVGcmVxQW5kVm9sLnRzIiwid2VicGFjazovL2xpdHRsZV9kZW1vcy8uL3NyYy90b29scy9mcmVxdWVuY3kudHMiLCJ3ZWJwYWNrOi8vbGl0dGxlX2RlbW9zLy4vc3JjL3Rvb2xzL3NpbmVPc2NpbGxhdGlvbi50cyIsIndlYnBhY2s6Ly9saXR0bGVfZGVtb3MvLi9zcmMvdG9vbHMvdm9sdW1lLnRzIiwid2VicGFjazovL2xpdHRsZV9kZW1vcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saXR0bGVfZGVtb3Mvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xpdHRsZV9kZW1vcy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xpdHRsZV9kZW1vcy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpdHRsZV9kZW1vcy8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxubGV0IHJlY29yZGVkQ2h1bmtzO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwTWVkaWFSZWNvcmRlcihtZWRpYVN0cmVhbURlc3RpbmF0aW9uOiBNZWRpYVN0cmVhbUF1ZGlvRGVzdGluYXRpb25Ob2RlKTogTWVkaWFSZWNvcmRlciB7XHJcbiAgICBjb25zdCBtZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIobWVkaWFTdHJlYW1EZXN0aW5hdGlvbi5zdHJlYW0pO1xyXG4gICAgcmVjb3JkZWRDaHVua3MgPSBbXTtcclxuXHJcbiAgICBtZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICAgIHJlY29yZGVkQ2h1bmtzLnB1c2goZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtZWRpYVJlY29yZGVyLm9uc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKHJlY29yZGVkQ2h1bmtzLCB7IHR5cGU6ICdhdWRpby93YXYnIH0pO1xyXG4gICAgICAgIHJlY29yZGVkQ2h1bmtzID0gW107XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuICAgICAgICAvLy8gdG9kbzogY2hlY2sgaWYgdGhlcmUgYXJlIG1vcmUgc2Vuc2libGUgd2F5cy4gXHJcbiAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcclxuXHJcbiAgICAgICAgYS5ocmVmID0gdXJsO1xyXG4gICAgICAgIGEuZG93bmxvYWQgPSAncmVjb3JkaW5nLndhdic7XHJcbiAgICAgICAgYS5jbGljaygpO1xyXG5cclxuICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbWVkaWFSZWNvcmRlcjtcclxufVxyXG4iLCJpbXBvcnQgeyBzaW5lRnJlcXVlbmN5IH0gZnJvbSBcIi4uL3Rvb2xzL2ZyZXF1ZW5jeVwiO1xyXG5pbXBvcnQgeyBzZXRWb2x1bWVMb29wLCBzaW5lVm9sdW1lIH0gZnJvbSBcIi4uL3Rvb2xzL3ZvbHVtZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXJzdFNldE9mRnJlcXMoZnJlcU9zYzogT3NjaWxsYXRvck5vZGUsIHZvbHVtZUdhaW46IEdhaW5Ob2RlLCBzZWNvbmRWb2x1bWVHYWluOiBHYWluTm9kZSwgY29udGV4dDogQXVkaW9Db250ZXh0KSB7XHJcbiAgICBcclxuICAgIGNvbnN0IHRlbXBsYXRlVGltZSA9IDAuNSAqIDYwO1xyXG4gICAgY29uc3QgdXBwZXJGcmVxID0gMTQyLlxyXG4gICAgY29uc3QgbG93ZXJGcmVxID0gMTMyO1xyXG4gICAgY29uc3QgY3ljbGVUaW1lID0gNi44O1xyXG4gICAgXHJcbiAgICBjb25zdCBzdGFydFRpbWUgPSBjb250ZXh0LmN1cnJlbnRUaW1lOyBcclxuXHJcbiAgICAgICAgc2luZUZyZXF1ZW5jeShmcmVxT3NjLCBzdGFydFRpbWUsIGxvd2VyRnJlcSwgdXBwZXJGcmVxLCB0ZW1wbGF0ZVRpbWUsIHRlbXBsYXRlVGltZSwgNSk7XHJcblxyXG4gICAgICAgIHNldFZvbHVtZUxvb3Aodm9sdW1lR2Fpbiwgc3RhcnRUaW1lLCA2LCAwLjgsIHRlbXBsYXRlVGltZSk7XHJcbiAgICAgICAgLy9zaW5lVm9sdW1lKHNlY29uZFZvbHVtZUdhaW4sIHN0YXJ0VGltZSwgMC4zLCAxLCBjeWNsZVRpbWUsIHRlbXBsYXRlVGltZSwgMC4yNSk7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UgKChyZXNvbHZlLCByZWplY3QpID0+IFxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoY29udGV4dC5jdXJyZW50VGltZSl9LCB0ZW1wbGF0ZVRpbWUgKiAxMDAwKVxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2Vjb25kU2V0T2ZGcmVxcyhmcmVxT3NjOiBPc2NpbGxhdG9yTm9kZSwgdm9sdW1lR2FpbjogR2Fpbk5vZGUsIHNlY29uZFZvbHVtZUdhaW46IEdhaW5Ob2RlLCBjb250ZXh0OiBBdWRpb0NvbnRleHQpIHtcclxuICAgIFxyXG4gICAgY29uc3QgdGVtcGxhdGVUaW1lID0gMC41ICogNjA7XHJcbiAgICBjb25zdCB1cHBlckZyZXEgPSAxNjIuXHJcbiAgICBjb25zdCBsb3dlckZyZXEgPSAxMzI7XHJcbiAgICBjb25zdCBjeWNsZVRpbWUgPSA2Ljg7XHJcblxyXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gY29udGV4dC5jdXJyZW50VGltZTsgXHJcblxyXG4gICAgICAgIHNpbmVGcmVxdWVuY3koZnJlcU9zYywgc3RhcnRUaW1lLCBsb3dlckZyZXEsIHVwcGVyRnJlcSwgdGVtcGxhdGVUaW1lLCB0ZW1wbGF0ZVRpbWUsIDUpO1xyXG5cclxuICAgICAgICAvL3NldFZvbHVtZUxvb3Aodm9sdW1lR2Fpbiwgc3RhcnRUaW1lLCA2LCAwLjgsIHRlbXBsYXRlVGltZSk7XHJcbiAgICAgICAgc2V0Vm9sdW1lTG9vcCh2b2x1bWVHYWluLCBzdGFydFRpbWUsIDEuOCwgMC4yLCB0ZW1wbGF0ZVRpbWUpO1xyXG4gICAgICAgIHNpbmVWb2x1bWUoc2Vjb25kVm9sdW1lR2Fpbiwgc3RhcnRUaW1lLCAwLjMsIDEsIGN5Y2xlVGltZSwgdGVtcGxhdGVUaW1lLCAwLjI1KTtcclxuXHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UgKChyZXNvbHZlLCByZWplY3QpID0+IFxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJlc29sdmUoY29udGV4dC5jdXJyZW50VGltZSl9LCB0ZW1wbGF0ZVRpbWUgKiAxMDAwKVxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG59IiwiaW1wb3J0IHsgc2luZU9zY2lsbGF0aW9uIH0gZnJvbSBcIi4vc2luZU9zY2lsbGF0aW9uXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlRnJlcXVlbmN5T3NjaWxsYXRvciA9IChmcmVxdWVuY3k6IG51bWJlciwgY29udGV4dDogQXVkaW9Db250ZXh0KTogT3NjaWxsYXRvck5vZGUgPT4ge1xyXG4gICAgICAgIC8vRnJlcXVlbmN5IG9zY2lsbGF0b3Igb3NjaWxsYXRlcyB0aGUgZnJlcXVlbmN5LiBcclxuICAgICAgICBjb25zdCBmcmVxT3NjID0gY29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XHJcbiAgICAgICAgZnJlcU9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxdWVuY3k7XHJcbiAgICAgICAgZnJlcU9zYy50eXBlID0gJ3NpbmUnO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJlcU9zYztcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhlZEZyZXF1ZW5jeShmcmVxdWVuY3lPc2NpbGxhdG9yOiBPc2NpbGxhdG9yTm9kZSwgdG9GcmVxdWVuY3k6IG51bWJlciwgc3RhcnRpbmdUaW1lOiBudW1iZXIsIHRyYW5zaXRpb25UaW1lOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgZnJlcXVlbmN5T3NjaWxsYXRvci5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUodG9GcmVxdWVuY3ksIHN0YXJ0aW5nVGltZSArIHRyYW5zaXRpb25UaW1lKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNpbmVGcmVxdWVuY3koZnJlcXVlbmN5T3NjaWxsYXRvcjogT3NjaWxsYXRvck5vZGUsIHN0YXJ0aW5nVGltZTogbnVtYmVyLCBmcmVxTG93ZXJCb3VuZDogbnVtYmVyLCBmcmVxVXBwZXJCb3VuZDogbnVtYmVyLCBjeWNsZVRpbWU6IG51bWJlciwgdG90YWxJblNlY29uZHM6IG51bWJlciwgc3RlcDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBjdXJyZW50VGltZSA9IHN0YXJ0aW5nVGltZTtcclxuXHJcbiAgICAgICAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHN0YXJ0aW5nVGltZSArIHRvdGFsSW5TZWNvbmRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJlcSA9IHNpbmVPc2NpbGxhdGlvbihjeWNsZVRpbWUsIGZyZXFVcHBlckJvdW5kLCBmcmVxTG93ZXJCb3VuZCwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgZnJlcXVlbmN5T3NjaWxsYXRvci5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoZnJlcSwgY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgKz0gc3RlcDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGZ1bmN0aW9uIHNpbmVPc2NpbGxhdGlvbihjeWNsZVRpbWU6IG51bWJlciwgdXBwZXJCb3VuZDogbnVtYmVyLCBsb3dlckJvdW5kOiBudW1iZXIsIHRpbWVwb2ludDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc2luZUZyZXF1ZW5jeSA9IDEgLyBjeWNsZVRpbWU7XHJcbiAgICAgICAgY29uc3Qgb3NjaWxsYXRpb25SYW5nZSA9ICh1cHBlckJvdW5kIC0gbG93ZXJCb3VuZCk7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBsb3dlckJvdW5kICsgKE1hdGguc2luKDIgKiBNYXRoLlBJICogc2luZUZyZXF1ZW5jeSAqIHRpbWVwb2ludCkgKyAxKSAvIDIgKiBvc2NpbGxhdGlvblJhbmdlO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBzaW5lT3NjaWxsYXRpb24gfSBmcm9tIFwiLi9zaW5lT3NjaWxsYXRpb25cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVWb2x1bWVOb2RlID0gKGNvbnRleHQ6IEF1ZGlvQ29udGV4dCk6IEdhaW5Ob2RlID0+IGNvbnRleHQuY3JlYXRlR2FpbigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFZvbHVtZUxvb3AgPSAodm9sdW1lR2FpbjogR2Fpbk5vZGUsIHN0YXJ0aW5nOiBudW1iZXIsIGxlbmd0aEluU2VjOiBudW1iZXIsIHBhdXNlQWZ0ZXJJblNlazogbnVtYmVyLCB0b3RhbEluU2Vjb25kczogbnVtYmVyKSA9PiB7XHJcblxyXG4gICAgLy8yNSUgcmFtcCB1cCwgMjUlIHJhbXAgZG93blxyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gc3RhcnRpbmc7XHJcbiAgICBjb25zdCBzb3VuZEZ1bGxkV2hlbiA9IDAuMjU7XHJcbiAgICBjb25zdCBzdGFydE11dGluZ0Rvd25XaGVuID0gMC43NTtcclxuXHJcblxyXG4gICAgd2hpbGUoY3VycmVudFRpbWUgPD0gc3RhcnRpbmcgKyB0b3RhbEluU2Vjb25kcykge1xyXG5cclxuICAgICAgICB2b2x1bWVHYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMSwgY3VycmVudFRpbWUgKyBsZW5ndGhJblNlYyAqIHNvdW5kRnVsbGRXaGVuICk7XHJcbiAgICAgICAgdm9sdW1lR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDEsIGN1cnJlbnRUaW1lICsgbGVuZ3RoSW5TZWMgKiBzdGFydE11dGluZ0Rvd25XaGVuKTtcclxuICAgICAgICB2b2x1bWVHYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4xLCBjdXJyZW50VGltZSArIGxlbmd0aEluU2VjKTtcclxuICAgICAgICB2b2x1bWVHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4xLCBjdXJyZW50VGltZSArIGxlbmd0aEluU2VjICsgcGF1c2VBZnRlckluU2VrIC0gMC4wMTUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gY3VycmVudFRpbWUgKyBsZW5ndGhJblNlYyArIHBhdXNlQWZ0ZXJJblNlaztcclxuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50VGltZSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudFRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaW5lVm9sdW1lKHZvbHVtZUdhaW46IEdhaW5Ob2RlLCBzdGFydGluZ1RpbWU6IG51bWJlciwgbWluVm9sdW1lOiBudW1iZXIsIG1heFZvbHVtZTogbnVtYmVyLCBjeWNsZVRpbWU6IG51bWJlciwgdG90YWxJblNlY29uZHM6IG51bWJlciwgc3RlcDogbnVtYmVyKXtcclxuICAgICAgICBcclxuICAgIGxldCBjdXJyZW50VGltZSA9IHN0YXJ0aW5nVGltZTtcclxuXHJcbiAgICB3aGlsZShjdXJyZW50VGltZSA8PSBzdGFydGluZ1RpbWUgKyB0b3RhbEluU2Vjb25kcykge1xyXG5cclxuICAgICAgICBjb25zdCB2b2x1bWUgPSBzaW5lT3NjaWxsYXRpb24oY3ljbGVUaW1lLCBtYXhWb2x1bWUsIG1pblZvbHVtZSwgY3VycmVudFRpbWUpXHJcbiAgICAgICAgIC8vY29uc29sZS5sb2coZnJlcSk7XHJcbiAgICAgICAgIHZvbHVtZUdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSh2b2x1bWUsIGN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgY3VycmVudFRpbWUgKz0gc3RlcDtcclxuICAgIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlRnJlcXVlbmN5T3NjaWxsYXRvciB9IGZyb20gXCIuL3Rvb2xzL2ZyZXF1ZW5jeVwiO1xyXG5pbXBvcnQgeyBzZXR1cE1lZGlhUmVjb3JkZXIgfSBmcm9tIFwiLi9zZXR1cE1lZGlhUmVjb3JkZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlVm9sdW1lTm9kZSBhcyBjcmVhdGVWb2x1bWVHYWluIH0gZnJvbSBcIi4vdG9vbHMvdm9sdW1lXCI7XHJcbmltcG9ydCB7IGZpcnN0U2V0T2ZGcmVxcywgc2Vjb25kU2V0T2ZGcmVxcyB9IGZyb20gXCIuL3RlbXBsYXRlcy9vc2NpbGxhdGVGcmVxQW5kVm9sXCI7XHJcblxyXG5cclxubGV0IG1lZGlhUmVjb3JkZXI7XHJcbmV4cG9ydCBjb25zdCBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG5sZXQgZnJlcU9zYztcclxubGV0IHZvbHVtZUdhaW47XHJcbmV4cG9ydCBsZXQgc2Vjb25kVm9sdW1lR2FpbjtcclxuXHJcbmNvbnN0IEZSRVFVRU5DWSA9IDEyMDtcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBzdGFydCAoZG9SZWNvcmQ6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAvLyBDaGVjayBmb3IgV2ViIEF1ZGlvIEFQSSBzdXBwb3J0XHJcbiAgICB3aW5kb3cuQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dDtcclxuICAgIGlmICghd2luZG93LkF1ZGlvQ29udGV4dCkge1xyXG4gICAgICAgIGFsZXJ0KFwiV2ViIEF1ZGlvIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RoZSBBdWRpb0NvbnRleHQgaW50ZXJmYWNlIHJlcHJlc2VudHMgYW4gYXVkaW8tcHJvY2Vzc2luZyBncmFwaCBidWlsdCBmcm9tIGF1ZGlvIG1vZHVsZXMgbGlua2VkIHRvZ2V0aGVyLCBcclxuICAgIC8vZWFjaCByZXByZXNlbnRlZCBieSBhbiBBdWRpb05vZGUuXHJcbiAgICBjb25zdCBtZWRpYVN0cmVhbURlc3RpbmF0aW9uID0gY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbURlc3RpbmF0aW9uKCk7XHJcbiAgICBpZiAoZG9SZWNvcmQpIHtcclxuICAgICAgICBtZWRpYVJlY29yZGVyID0gc2V0dXBNZWRpYVJlY29yZGVyKG1lZGlhU3RyZWFtRGVzdGluYXRpb24pO1xyXG4gICAgICAgIC8vIElzIHRoZXJlIHNpZ25pZmljYW50IGRlbGF5IHdoZW4gdXNpbmcgY29udGV4dC5jdXJyZW50VGltZSBoZXJlIGFuZCBsYXRlcj8gXHJcbiAgICAgICAgbWVkaWFSZWNvcmRlci5zdGFydChjb250ZXh0LmN1cnJlbnRUaW1lKTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9HYWluIG5vZGUgcmVwcmVzZW50cyBjaGFuZ2UgaW4gdGhlIHZvbHVtZS4gQSBHYWluTm9kZSBhbHdheXMgaGFzIGV4YWN0bHkgb25lIGlucHV0IGFuZCBvbmUgb3V0cHV0LCBcclxuICAgIC8vYm90aCB3aXRoIHRoZSBzYW1lIG51bWJlciBvZiBjaGFubmVscy5cclxuICAgIC8vIFRoZXJlIGFyZSB0d28gdm9sdW1lIGdhaW5zIGluIHNlcXVlbmNlIHRvIGFkZCBvbiB0b3Agb2YgZWFjaCBvdGhlci4gXHJcbiAgICB2b2x1bWVHYWluID0gY3JlYXRlVm9sdW1lR2Fpbihjb250ZXh0KTtcclxuICAgIHNlY29uZFZvbHVtZUdhaW4gPSBjcmVhdGVWb2x1bWVHYWluKGNvbnRleHQpO1xyXG4gICAgZnJlcU9zYyA9IGNyZWF0ZUZyZXF1ZW5jeU9zY2lsbGF0b3IoRlJFUVVFTkNZLCBjb250ZXh0KTtcclxuXHJcbiAgICAgICAgLy8gTm9kZXMgY2FuIGJlIHBpcGVkIGluIGRpZmZlcmVudCB3YXlzOiBcclxuICAgIC8vIFN1bSBcclxuICAgIC8vIHZvbHVtZU9zYyA9PiB2b2x1bWVHYWluICBcXCAgIFxyXG4gICAgLy8gICAgICAgICAgICAgIGZyZXFPc2MgICAgIC0gPT4gIHRvdGFsR2FpblxyXG4gICAgLy8gICAgICAgICAgIHRvdGFsR2FpblZhbHVlIC9cclxuXHJcbiAgICBmcmVxT3NjLmNvbm5lY3Qodm9sdW1lR2Fpbik7XHJcbiAgICB2b2x1bWVHYWluLmNvbm5lY3Qoc2Vjb25kVm9sdW1lR2Fpbik7XHJcbiAgICBzZWNvbmRWb2x1bWVHYWluLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICB2b2x1bWVHYWluLmNvbm5lY3QobWVkaWFTdHJlYW1EZXN0aW5hdGlvbik7XHJcbiAgICBmcmVxT3NjLnN0YXJ0KGNvbnRleHQuY3VycmVudFRpbWUpO1xyXG5cclxuICAgIGF3YWl0IGZpcnN0U2V0T2ZGcmVxcyhmcmVxT3NjLCB2b2x1bWVHYWluLCBzZWNvbmRWb2x1bWVHYWluLCBjb250ZXh0KTtcclxuICAgIGF3YWl0IHNlY29uZFNldE9mRnJlcXMoZnJlcU9zYywgdm9sdW1lR2Fpbiwgc2Vjb25kVm9sdW1lR2FpbiwgY29udGV4dCk7XHJcbiAgICBcclxuICAgIHN0b3AoKVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0b3AoKSB7XHJcbiAgICBmcmVxT3NjLnN0b3AoKTtcclxuXHJcbiAgICAvL3ZvbHVtZU9zYy5zdG9wKCk7XHJcbiAgICBpZiAobWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgIG1lZGlhUmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgICAgIG1lZGlhUmVjb3JkZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbnN0YXJ0QnV0dG9uLm9uY2xpY2sgPSAoZXZlbnQpID0+IHN0YXJ0KGZhbHNlKTtcclxuc3RhcnRCdXR0b24uaW5uZXJIVE1MID0gXCJTdGFydFwiXHJcblxyXG5jb25zdCByZWNvcmRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5yZWNvcmRCdXR0b24ub25jbGljayA9IChldmVudCkgPT4gc3RhcnQodHJ1ZSk7XHJcbnJlY29yZEJ1dHRvbi5pbm5lckhUTUwgPSBcIlJlY29yZFwiXHJcblxyXG5cclxuY29uc3Qgc3RvcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbnN0b3BCdXR0b24ub25jbGljayA9IChldmVudCkgPT4gc3RvcCgpO1xyXG5zdG9wQnV0dG9uLmlubmVySFRNTCA9IFwiU3RvcFwiXHJcblxyXG5cclxuY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW9CdXR0b25zXCIpO1xyXG5idXR0b25zRGl2LmFwcGVuZChzdGFydEJ1dHRvbik7XHJcbmJ1dHRvbnNEaXYuYXBwZW5kKHJlY29yZEJ1dHRvbik7XHJcbmJ1dHRvbnNEaXYuYXBwZW5kKHN0b3BCdXR0b24pO1xyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==