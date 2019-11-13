document.addEventListener('DOMContentLoaded', function () {
    var screenHeigth = document.documentElement.clientHeight;
    var screenWidth = document.documentElement.clientWidth;
    var progressCircle = document.querySelectorAll('.js__progress-svg__animate');
    var coeffProgressShowed = (screenWidth > 500) ? 1 : 1;

    function animProgress() {
        if (progressCircle.length) {
            for (var i = 0; i < progressCircle.length; i++) {
                var dictTop = progressCircle[i].getBoundingClientRect().top;
                var percent = progressCircle[i].getAttribute('data-progress');
                if (screenHeigth / coeffProgressShowed > dictTop) {
                    var r = progressCircle[i].getAttribute('r');
                    var circonference = 2 * Math.PI * r;
                    var offset = circonference - percent / 100 * circonference;
                    progressCircle[i].style.strokeDashoffset = offset;
                    progressCircle[i].style.strokeDasharray = circonference + " " + circonference;
                }
            }
        }
    }
    document.addEventListener('scroll', animProgress);
});