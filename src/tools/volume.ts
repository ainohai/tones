import { sineOscillation } from "./sineOscillation";

export const createVolumeNode = (context: AudioContext): GainNode => context.createGain();

export const setVolumeLoop = (volumeGain: GainNode, starting: number, lengthInSec: number, pauseAfterInSek: number, totalInSeconds: number) => {

    //25% ramp up, 25% ramp down
    let currentTime = starting;
    const soundFulldWhen = 0.25;
    const startMutingDownWhen = 0.75;


    while(currentTime <= starting + totalInSeconds) {

        volumeGain.gain.linearRampToValueAtTime(1, currentTime + lengthInSec * soundFulldWhen );
        volumeGain.gain.setValueAtTime(1, currentTime + lengthInSec * startMutingDownWhen);
        volumeGain.gain.linearRampToValueAtTime(0.1, currentTime + lengthInSec);
        volumeGain.gain.setValueAtTime(0.1, currentTime + lengthInSec + pauseAfterInSek - 0.015);
        
        currentTime = currentTime + lengthInSec + pauseAfterInSek;
        console.log(currentTime)
    }

    return currentTime;
}

export function sineVolume(volumeGain: GainNode, startingTime: number, minVolume: number, maxVolume: number, cycleTime: number, totalInSeconds: number, step: number){
        
    let currentTime = startingTime;

    while(currentTime <= startingTime + totalInSeconds) {

        const volume = sineOscillation(cycleTime, maxVolume, minVolume, currentTime)
         volumeGain.gain.linearRampToValueAtTime(volume, currentTime);
         currentTime += step;
    }
}