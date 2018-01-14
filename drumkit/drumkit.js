window.onload = function () {
    //var keys = document.getElementsByClassName('key');

    function play (event) {
        var key = document.querySelector(`div[data-key="${event.keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        if (!key) return;
        /*on a new key press, reset the time if the audio is still playing*/
        audio.currentTime = 0;
        audio.play();
        key.classList.add('pressed');
    }

    var keys = document.querySelectorAll('.key');
    keys.forEach(function (key) {
        key.addEventListener('transitionend', function () {
            /*this refers to the element we registered the listener with*/
            this.classList.remove('pressed');
        });
    });

    document.addEventListener('keydown', play);
    return;
};
