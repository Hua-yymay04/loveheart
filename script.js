const heart = document.getElementById("heart");

const words = [];
const WORD_COUNT = 70;

for (let i = 0; i < WORD_COUNT; i++) {

    const span = document.createElement("span");

    span.className = "word";
    span.innerText = "Good luck BABE!";

    heart.appendChild(span);

    words.push({
        el: span,
        t: (i / WORD_COUNT) * Math.PI * 2
    });
}

let targetX = 0;
let targetY = 0;

let rotX = 0;
let rotY = 0;

document.addEventListener("mousemove", (e) => {

    targetY =
        ((e.clientX / window.innerWidth) - 0.5) * 180;

    targetX =
        ((e.clientY / window.innerHeight) - 0.5) * 180;
});

function animate() {

    rotX += (targetX - rotX) * 0.05;
    rotY += (targetY - rotY) * 0.05;

    words.forEach(word => {

        word.t += 0.0015;

        const t = word.t;

        const hx =
            16 * Math.pow(Math.sin(t), 3);

        const hy =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        let px = hx;
        let py = hy;
        let pz = 0;

        const cosY = Math.cos(rotY * Math.PI / 180);
        const sinY = Math.sin(rotY * Math.PI / 180);

        const cosX = Math.cos(rotX * Math.PI / 180);
        const sinX = Math.sin(rotX * Math.PI / 180);

        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const perspective =
            900 / (900 - z2 * 35);

        const screenX =
            x1 * perspective * 25;

        const screenY =
            y2 * perspective * 25;

        word.el.style.left =
            `${window.innerWidth / 2 + screenX}px`;

        word.el.style.top =
            `${window.innerHeight / 2 - screenY}px`;

        word.el.style.opacity =
            Math.max(0.3, perspective);
    });

    requestAnimationFrame(animate);
}

animate();
