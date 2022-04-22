export class MuteButton {
    constructor() {
        this.setMuteIcon = this.setMuteIcon.bind(this);
        this.setUnmuteIcon = this.setUnmuteIcon.bind(this);
        this.switchIcon = this.switchIcon.bind(this);

        const muteBtn = document.createElement('div');
        muteBtn.classList.add('mute');
        this.muteBtn = muteBtn;
        this.muteBtn.addEventListener('click', this.switchIcon, false);
        this.isMuted = true;
        this.setMuteIcon();
    }
    setMuteIcon () {
        this.muteBtn.classList.add('LM_muted');
        this.muteBtn.classList.remove('LM_unmuted');
    }
    setUnmuteIcon () {
        this.muteBtn.classList.add('LM_unmuted');
        this.muteBtn.classList.remove('LM_muted');
    }
    switchIcon () {
        this.isMuted = !this.isMuted;
        return this.isMuted ? this.setMuteIcon() : this.setUnmuteIcon();
    }
}