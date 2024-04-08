import { createFrequencyOscillator } from "./tools/frequency";
import { setupMediaRecorder } from "./setupMediaRecorder";
import { createVolumeNode as createVolumeGain } from "./tools/volume";
import { firstSetOfFreqs, secondSetOfFreqs } from "./templates/oscillateFreqAndVol";


let mediaRecorder;
export const context = new AudioContext();
let freqOsc;
let volumeGain;
export let secondVolumeGain;

const FREQUENCY = 120;


async function start (doRecord: boolean) {

    // Check for Web Audio API support
    window.AudioContext = window.AudioContext;
    if (!window.AudioContext) {
        alert("Web Audio API is not supported in this browser");
    }

    //The AudioContext interface represents an audio-processing graph built from audio modules linked together, 
    //each represented by an AudioNode.
    const mediaStreamDestination = context.createMediaStreamDestination();
    if (doRecord) {
        mediaRecorder = setupMediaRecorder(mediaStreamDestination);
        // Is there significant delay when using context.currentTime here and later? 
        mediaRecorder.start(context.currentTime);    
    }

    //Gain node represents change in the volume. A GainNode always has exactly one input and one output, 
    //both with the same number of channels.
    // There are two volume gains in sequence to add on top of each other. 
    volumeGain = createVolumeGain(context);
    secondVolumeGain = createVolumeGain(context);
    freqOsc = createFrequencyOscillator(FREQUENCY, context);

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

    await firstSetOfFreqs(freqOsc, volumeGain, secondVolumeGain, context);
    await secondSetOfFreqs(freqOsc, volumeGain, secondVolumeGain, context);
    
    stop()

}

export function stop() {
    freqOsc.stop();

    //volumeOsc.stop();
    if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder = undefined;
    }
}


const startButton = document.createElement("button");
startButton.onclick = (event) => start(false);
startButton.innerHTML = "Start"

const recordButton = document.createElement("button");
recordButton.onclick = (event) => start(true);
recordButton.innerHTML = "Record"


const stopButton = document.createElement("button");
stopButton.onclick = (event) => stop();
stopButton.innerHTML = "Stop"


const buttonsDiv = document.getElementById("audioButtons");
buttonsDiv.append(startButton);
buttonsDiv.append(recordButton);
buttonsDiv.append(stopButton);


