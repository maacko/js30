window.onload = function () {
    //var keys = document.querySelectorAll('.key');
    //var keys = document.getElementsByClassName('key');
    document.addEventListener('keydown', function (event) {
        var key = document.querySelector(`div[data-key="${event.keyCode}"]`);

        if (!key) return;

        key.classList.add('pressed');
    });
        
    return;
}
