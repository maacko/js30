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

    function mapMinutesToDegrees(minutes,seconds) {
        /* return (360/60)*minutes;
         *
         * Instead of having the minute hand move 6 degrees for every minute
         * elapsed, we'll move it for every second in a 60 minute period. This
         * will give us a mechanical animation that is in sync with the seconds
         * hand: the minute hand will move 360 deg in 3600seconds (3600seconds
         * in an hour). This gives us a rate of 1/10th of a degree per second.
         *
         * To get the correct position, we move the minute hand 1/10th of a
         * degree for each of the elapsed number of second (60secs * current_min
         * + current_secs).
         *
         * We need the current amount of seconds elapsed because this function
         * is invoked every second for every minute; the expression
         * 60seconds*current_minute will always give us the same result within a
         * 60 second period because the minute never changes. The expression
         * converts the number of minutes into seconds. Therefore, get the
         * current total number of seconds elapsed, we'll have add the number of
         * second elapsed within the span of the current minute.
         *
         * The expression below results in the number of degrees that the hand
         * should move given the current amount of seconds elapsed within a span
         * of an hour.
         */
        return (1/10)*(minutes*60 + seconds);
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
        var degreesmin = mapMinutesToDegrees(minutes, seconds) + 90;
        var degreehour = mapHourToDegrees(hour) + 90;
        secHand.style.transform = `rotate(${degrees}deg)`;
        minHand.style.transform = `rotate(${degreesmin}deg)`;
        hourHand.style.transform = `rotate(${degreehour}deg)`;

    }

    setInterval(moveseconds, 1000);
}
