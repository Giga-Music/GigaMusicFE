import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {

  public src: string = '';

  public interval: any;

  public audio: HTMLAudioElement = {} as any;

  public audioPlayer: any = {};

  @Input('src') set setSrc(value: any) {
    if(value) {
      this.src = value;

      this.reset();
      this.init();
    }
  }

  @Input('songName') songName: string = 'The Song';

  @Output('end') end: EventEmitter<void> = new EventEmitter();


  constructor(){

  }

  ngOnInit(): void {

  }

  public reset(): void{
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  public init(): void{
    this.audioPlayer = document.querySelector(".audio-player");
    this.audio = new Audio(this.src);;

    //wait until audio loaded
    this.onAudioLoaded();

    //click on timeline to skip around
    this.onTimelineClick();

    //click volume slider to change volume
    this.onVolumeSliderClick()

    //check audio percentage and update time accordingly
    this.updateAudioPercentage();

    //enable autoplay and unmute
    // this.useAutoplayAndUnmute();

    //listen To Play Button Click
    this.onPlayClick();

    //listen to "mute" click
    this.onMutedClick();
  }

  public updateAudioPercentage(): void{
    this.interval = setInterval(() => {
      const progressBar = this.audioPlayer.querySelector(".progress");
      const percentage =  this.audio.currentTime / this.audio.duration * 100;
      progressBar.style.width = percentage + "%";

      this.audioPlayer.querySelector(".time .current").textContent = this.getTimeCodeFromNum(
        this.audio.currentTime
      );

      if(percentage >= 100) {
        this.end.emit();
        clearInterval(this.interval);
      }
    }, 500);
  }

  public useAutoplayAndUnmute(): void{
    const playBtn = this.audioPlayer.querySelector(".controls .toggle-play");
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    this.audio.play();

    const volumeEl = this.audioPlayer.querySelector(".volume-container .volume");
    volumeEl.classList.add("pi-volume-up");
    volumeEl.classList.remove("pi-volume-off");
  }

  public onPlayClick(): void{
    const playBtn = this.audioPlayer.querySelector(".controls .toggle-play");

    playBtn.addEventListener(
      "click",
      () => {
        if (this.audio.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          this.audio.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          this.audio.pause();
        }
      },
      false
    );
  }

  public onMutedClick(): void{
    this.audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
      const volumeEl = this.audioPlayer.querySelector(".volume-container .volume");
      this.audio.muted = !this.audio.muted;
      if (this.audio.muted) {
        volumeEl.classList.remove("pi-volume-up");
        volumeEl.classList.add("pi-volume-off");
      } else {
        volumeEl.classList.add("pi-volume-up");
        volumeEl.classList.remove("pi-volume-off");
      }
    });
  }

  public onVolumeSliderClick(): void{
    const volumeSlider = this.audioPlayer.querySelector(".controls .volume-slider");
    volumeSlider.addEventListener('click', (e: any) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      this.audio.volume = newVolume;
      this.audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
    }, false)
  }

  public onTimelineClick(): void{
    const timeline = this.audioPlayer.querySelector(".timeline");
    timeline.addEventListener("click", (e: any) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = e.offsetX / parseInt(timelineWidth) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    }, false);
  }

  public onAudioLoaded(): void {
    this.audio.addEventListener(
      "loadeddata",
      () => {
        this.useAutoplayAndUnmute();
        this.audioPlayer.querySelector(".time .length").textContent = this.getTimeCodeFromNum(
          this.audio.duration
        );
        this.audio.volume = .75;
      },
      false
    );
  }

  public getTimeCodeFromNum(num: any): string {
    let seconds = parseInt(num);
    let minutes = parseInt((seconds / 60)+'');
    seconds -= minutes * 60;
    const hours = parseInt((minutes / 60)+'');
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(
      seconds % 60
    ).padStart(2, '0')}`;
  }


  public onAudioEnd(): void{
    this.end.emit();
  }

  ngOnDestroy(): void {
    this.audio.pause();
  }
}
