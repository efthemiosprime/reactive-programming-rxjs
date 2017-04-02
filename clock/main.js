import Rx from 'rxjs/Rx';

const canvas = document.querySelector('#main');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = Math.min(centerX, centerY) - 10;

const hourToAngle = (hour, minute) => ((hour + minute / 60 ) / 12) * 360;
const minuteToAngle = minute => (minute / 60) * 360;
function drawClock(hour, minute, second) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    drawLine(hourToAngle(hour, minute), radius - 70, 5);
    drawLine(minuteToAngle(minute), radius - 20, 5);
    drawLine(minuteToAngle(second), radius - 20, 2);
} 

function drawCircle() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#ececec";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#474747";
    ctx.stroke();
    ctx.closePath();
}

function drawLine(angle, length, width)  {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((Math.PI/180) * angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 0 - length);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

setInterval(function() {
    let date = new Date();
    drawClock(
        date.getHours * 12,
        date.getMinutes() + 1,
        date.getSeconds() + 1
    );
})