window.onload = function () {
    var keys = document.querySelectorAll('.key');
    //var keys = document.getElementsByClassName('key');
    keys.forEach(function (key) {
        key.addEventListener('transitionend', function () {
            /*this refers to the element we registered the listener with*/
            this.classList.remove('pressed');
        });
    });
    document.addEventListener('keydown', function (event) {
        var key = document.querySelector(`div[data-key="${event.keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        if (!key) return;
        audio.play();
        key.classList.add('pressed');
    });
        
    return;
};
