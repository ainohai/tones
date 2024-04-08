import { sineFrequency } from "../tools/frequency";
import { setVolumeLoop, sineVolume } from "../tools/volume";


export function firstSetOfFreqs(freqOsc: OscillatorNode, volumeGain: GainNode, secondVolumeGain: GainNode, context: AudioContext) {
    
    const templateTime = 0.5 * 60;
    const upperFreq = 142.
    const lowerFreq = 132;
    const cycleTime = 6.8;
    
    const startTime = context.currentTime; 

        sineFrequency(freqOsc, startTime, lowerFreq, upperFreq, templateTime, templateTime, 5);

        setVolumeLoop(volumeGain, startTime, 6, 0.8, templateTime);
        //sineVolume(secondVolumeGain, startTime, 0.3, 1, cycleTime, templateTime, 0.25);

    
    const promise = new Promise ((resolve, reject) => 

    setTimeout(() => {
        resolve(context.currentTime)}, templateTime * 1000)
    )

    return promise;
}

export function secondSetOfFreqs(freqOsc: OscillatorNode, volumeGain: GainNode, secondVolumeGain: GainNode, context: AudioContext) {
    
    const templateTime = 0.5 * 60;
    const upperFreq = 162.
    const lowerFreq = 132;
    const cycleTime = 6.8;

    const startTime = context.currentTime; 

        sineFrequency(freqOsc, startTime, lowerFreq, upperFreq, templateTime, templateTime, 5);

        //setVolumeLoop(volumeGain, startTime, 6, 0.8, templateTime);
        setVolumeLoop(volumeGain, startTime, 1.8, 0.2, templateTime);
        sineVolume(secondVolumeGain, startTime, 0.3, 1, cycleTime, templateTime, 0.25);

    const promise = new Promise ((resolve, reject) => 

    setTimeout(() => {
        resolve(context.currentTime)}, templateTime * 1000)
    )

    return promise;
}