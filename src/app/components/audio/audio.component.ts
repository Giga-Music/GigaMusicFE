import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit, OnDestroy {
  public src: string = '';

  public interval: any;

  public audio: HTMLAudioElement = {} as any;

  public audioPlayer: any = {};

  @Input('src') set setSrc(value: any) {
    if (value) {
      this.src = value;

      this.reset();
      this.init();
    }
  }

  @Input('songName') songName: string = 'The Song';

  @Output('end') end: EventEmitter<void> = new EventEmitter();

  public listeners: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  public reset(): void {
    this.removeListeners();

    if (this.audio && this.audio.pause && this.audio.remove) {
      this.audio.pause();
      this.audio.remove();
    }

    this.audioPlayer = null;
    this.audio = null as any;

    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public init(): void {
    this.audioPlayer = document.querySelector('.audio-player');
    this.audio = new Audio(this.src);
    this.audio.pause();

    //wait until audio loaded
    this.onAudioLoaded();

    //click on timeline to skip around
    this.onTimelineClick();

    //click volume slider to change volume
    this.onVolumeSliderClick();

    //check audio percentage and update time accordingly
    this.updateAudioPercentage();

    //listen To Play Button Click
    this.onPlayClick();

    //listen to "mute" click
    this.onMutedClick();
  }

  public updateAudioPercentage(): void {
    this.interval = setInterval(() => {
      const progressBar = this.audioPlayer.querySelector('.progress');
      const percentage = (this.audio.currentTime / this.audio.duration) * 100;
      progressBar.style.width = percentage + '%';

      this.audioPlayer.querySelector('.time .current').textContent =
        this.getTimeCodeFromNum(this.audio.currentTime);

      if (percentage >= 100) {
        this.end.emit();
        this.stopPlay();
        clearInterval(this.interval);
        this.interval = null;
      }
    }, 500);
  }

  public startPlay(): void{
    const playBtn = this.audioPlayer.querySelector('.controls .toggle-play');

    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
    this.audio.play();

    if(!this.interval) {
      this.updateAudioPercentage();
    }
  }

  public stopPlay(): void{
    const playBtn = this.audioPlayer.querySelector('.controls .toggle-play');

    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
    this.audio.pause();
  }

  public useAutoplayAndUnmute(): void {
    this.startPlay();

    const volumeEl = this.audioPlayer.querySelector(
      '.volume-container .volume'
    );
    volumeEl.classList.add('pi-volume-up');
    volumeEl.classList.remove('pi-volume-off');
  }

  public onPlayClick(): void {
    const playBtn = this.audioPlayer.querySelector('.controls .toggle-play');

    const handler = () => {
      if (this.audio.paused) {
        this.startPlay();
      } else {
        this.stopPlay();
      }
    };

    playBtn.addEventListener('click', handler, true);

    this.listeners.push({ item: playBtn, handler: handler });
  }

  public onMutedClick(): void {
    const volumeBtn = this.audioPlayer.querySelector('.volume-button');

    const handler = () => {
      const volumeEl = this.audioPlayer.querySelector(
        '.volume-container .volume'
      );
      this.audio.muted = !this.audio.muted;
      if (this.audio.muted) {
        volumeEl.classList.remove('pi-volume-up');
        volumeEl.classList.add('pi-volume-off');
      } else {
        volumeEl.classList.add('pi-volume-up');
        volumeEl.classList.remove('pi-volume-off');
      }
    };

    volumeBtn.addEventListener('click', handler, true);

    this.listeners.push({ item: volumeBtn, handler: handler });
  }

  public onVolumeSliderClick(): void {
    const volumeSlider = this.audioPlayer.querySelector(
      '.controls .volume-slider'
    );

    const handler = (e: any) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      this.audio.volume = newVolume;
      this.audioPlayer.querySelector(
        '.controls .volume-percentage'
      ).style.width = newVolume * 100 + '%';
    };

    volumeSlider.addEventListener('click', handler, true);

    this.listeners.push({ item: volumeSlider, handler: handler });
  }

  public onTimelineClick(): void {
    const timeline = this.audioPlayer.querySelector('.timeline');

    const handler = (e: any) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek =
        (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
      this.audio.currentTime = timeToSeek;
    };

    timeline.addEventListener('click', handler, true);

    this.listeners.push({ item: timeline, handler: handler });
  }

  public onAudioLoaded(): void {
    const handler = () => {
      this.useAutoplayAndUnmute();
      this.audioPlayer.querySelector('.time .length').textContent =
        this.getTimeCodeFromNum(this.audio.duration);
      this.audio.volume = 0.75;
    };

    this.audio.addEventListener('loadeddata', handler, true);

    this.listeners.push({ item: this.audio, handler: handler });
  }

  public getTimeCodeFromNum(num: any): string {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60 + '');
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60 + '');
    minutes -= hours * 60;

    if (hours === 0)
      return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    return `${String(hours).padStart(2, '0')}:${minutes}:${String(
      seconds % 60
    ).padStart(2, '0')}`;
  }

  public removeListeners(): void {
    this.listeners.forEach((l: any) =>
      l.item.removeEventListener('click', l.handler, true)
    );
    this.listeners = [];
  }

  ngOnDestroy(): void {
    this.audio.pause();
    this.audio.remove();
    this.removeListeners();
  }
}
