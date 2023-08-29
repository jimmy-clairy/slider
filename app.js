/**
 * Sélectionne les boutons de direction gauche et droite.
 * @type {Array} Un tableau contenant les boutons de direction.
 */
const [btnLeft, btnRight] = document.querySelectorAll('.direction-btn');

/**
 * Sélectionne toutes les diapositives et les stocke dans un tableau.
 * @type {Array} Un tableau contenant les diapositives.
 */
const slides = [...document.querySelectorAll('.slide')];

/**
 * Indice de la diapositive active.
 * @type {number}
 */
let numberSlideActive = slides.findIndex(item => item.classList.contains('active'));

/**
 * Verrou pour empêcher les interactions pendant les animations.
 * @type {boolean}
 */
let lock = false;

/**
 * Ajoute des écouteurs d'événements pour les boutons de direction.
 */
btnLeft.addEventListener('click', () => swipe('Left'));
btnRight.addEventListener('click', () => swipe('Right'));

/**
 * Gère le glissement de la diapositive dans une direction donnée.
 * @param {string} direction - La direction du glissement ('Left' ou 'Right').
 */
function swipe(direction) {
    // Si le verrou est activé, ne fait rien.
    if (lock) return;
    lock = true;

    // Récupère l'index de la diapositive précédente.
    const previousSlide = numberSlideActive;

    // Supprime les classes de sortie de la diapositive précédente et ajoute la classe d'entrée correspondante.
    slides[previousSlide].classList.remove(`slideOutLeft`, `slideOutRight`);
    slides[previousSlide].classList.add(`slideIn${direction}`);

    // Supprime la classe d'active et la classe d'entrée après une durée de transition.
    setTimeout(() => slides[previousSlide].classList.remove('active', `slideIn${direction}`), 300);

    // Met à jour l'index de la diapositive active en fonction de la direction.
    if (direction === 'Left') {
        numberSlideActive--;
        if (numberSlideActive < 0) { numberSlideActive = slides.length - 1; }
    } else if (direction === 'Right') {
        numberSlideActive++;
        if (numberSlideActive > slides.length - 1) { numberSlideActive = 0; }
    }

    // Ajoute la classe de sortie à la nouvelle diapositive active après une courte durée.
    setTimeout(() => slides[numberSlideActive].classList.add('active', `slideOut${direction}`), 200);

    // Libère le verrou après une durée d'animation.
    setTimeout(() => lock = false, 500);
}