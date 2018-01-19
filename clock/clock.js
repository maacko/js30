window.onload = function () {
    function mapSecondsToDegrees(seconds) {
        /* Since the second hand moves 360degrees every 60 seconds, that means
         * every second it moves 6 degrees (divide the circle, 360deg, into 60
         * second pieces which gives us 6 degrees per second).
         *
         * The correct position of the clock hand is 6deg per second * the
         * number of seconds elapsed. In other words, we sum 6deg for each
         * second in the total seconds elapsed.
         *
         * Note that the result is the angle the hand makes with its initial
         * position. We'll assume that the hand's initial angle is 0deg which
         * corresponds to the 0 second.
         *
         * However, since CSS has a default of 0 deg horizontally on the left
         * with rotations occurring in a clockwise fashion. We'll have to rotate
         * the hand 90deg in order to move it in the correct position. This is
         * defined in the stylesheet. As a consequence, we'll also have to add
         * 90 degrees to this calculation to adjust for this transformation.
         * This way, when the page loads, the second hand is rendered in the
         * correct position.
         *
         * Here, however, we just calculate the angle and have the user
         * adjust their calculations for the initial angle separately.
         */

        return (360/60)*seconds;
    }

    function mapMinutesToDegrees(minutes) {
        return (360/60)*minutes;
    }

    function mapHourToDegrees(hour) {
        return (360/12)*hour;
    }

    function moveseconds(){
            /*we should move this outside the function since we're taking extra
             * time by searching the DOM tree each second. We only need to do
             * this once*/
        var secHand = document.querySelector('.second-hand');
        var minHand = document.querySelector('.minute-hand');
        var hourHand = document.querySelector('.hour-hand');
        /*interesting...I get the date three separate times, doesn't this
         * unsync the thing? I doubt it since the hour doesn't change fast
         * hours and minutes don't change as fast as the second. I don't
         * think this is good practice though since we're wasting time
         * computing the Date three separate times.*/
        var seconds = new Date().getSeconds();
        var minutes = new Date().getMinutes();
        var hour = new Date().getHours();
        //var totalSecondsElapsed = minutes*60 + seconds;
        //add 90deg to account for the fact that the hand's initial position is
        //at 90deg.
        //var degrees = mapSecondsToDegrees(totalSecondsElapsed) + 90;
        var degrees = mapSecondsToDegrees(seconds) + 90;
        var degreesmin = mapMinutesToDegrees(minutes) + 90;
        var degreehour = mapHourToDegrees(hour) + 90;
        secHand.style.transform = `rotate(${degrees}deg)`;
        minHand.style.transform = `rotate(${degreesmin}deg)`;
        hourHand.style.transform = `rotate(${degreehour}deg)`;

    }

    setInterval(moveseconds, 1000);
}
