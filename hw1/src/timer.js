import { _Howl as Howl } from "./howler/howler.js";

export class Timer {
    constructor() {
        this.timeinterval = 0;
        this.endtime = 0;
        this.pause = false;
        this.stop = 1;
        this.sound = new Howl(
            { src: ['./sounds/Usb-connection-sound-effect.mp3'] }
        );
    }

    getTimeRemaining() {
        let t = Date.parse(this.endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    initializeClock(id, endtime) {
        this.stop = 0;
        let clock = document.getElementById(id);
        let hoursSpan = clock.querySelector(".hours");
        let minutesSpan = clock.querySelector(".minutes");
        let secondsSpan = clock.querySelector(".seconds");

        if (!this.pause) {
            document.getElementById("deadline-message").className = "deadline-message";
            this.endtime = endtime;
        } else {
            this.pause = false;
        }

        const updateClock = () => {
            if (!this.pause && this.stop === 0) {
                let t = this.getTimeRemaining(this.endtime);

                if (t.total < 0) {
                    document.getElementById("deadline-message").className = "visible";
                    this.sound.play();
                    clearInterval(this.timeinterval);

                    this.stop = 1;

                    return true;
                }

                hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
                minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
                secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
            }

        }

        updateClock();

        if (!this.pause) {
            this.timeinterval = setInterval(updateClock, 1000);
        }

    }

    stopClock() {
        this.pause = true;
    }
}








