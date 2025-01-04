document.addEventListener('DOMContentLoaded', () => {
    shuffleCaptchaGrid();
});

document.querySelectorAll('.captcha-item').forEach(item => {
    item.addEventListener('click', () => {
        onClickedImage(item);
    })
})

let currentTargetIndex = 0;

function handleClick(action) {
    if (action === 'refresh') {
        shuffleCaptchaGrid();
    } else if (action === 'headphones') {
        // headphones action
    } else if (action === 'info') {
        // info action
    } else if (action === 'answer') {
        onSendAnswer();
    }
}

function shuffleCaptchaGrid() {
    const grid = document.querySelector('.captcha-grid');
    const items = Array.from(grid.children);

    items.forEach(item => {
        item.classList.remove('selected');
    })

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        grid.appendChild(items[j]);
    }

}

function onClickedImage(item) {
    item.classList.toggle('selected');
}

function onSendAnswer() {
    answer = getSelectedImages();
    sendAnswer(answer);
}

function getSelectedImages() {
    const selectedItems = document.querySelectorAll('.captcha-item.selected img');
    const filenames = new Set();
    selectedItems.forEach(img => {
        const src = img.getAttribute('src');
        const filename = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
        filenames.add(filename);
    })
    console.log(filenames);
    return filenames;
}

function sendAnswer(filenames) {
    const filenamesArray = Array.from(filenames);

    fetch('ENDPOINT-URL/validateAnswer', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ items: filenamesArray})
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        if (result === 'True') {
            console.log('Correct');
            updateVisibility(true);
        } else {
            console.log('Incorrect');
            updateVisibility(false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateVisibility(isCorrect) {
    console.log(isCorrect);
    const captchaContainer = document.querySelector('.captcha-container');
    const correctAnswerContainer = document.querySelector('.answer-container.correct');
    const incorrectAnswerContainer = document.querySelector('.answer-container.incorrect');

    // captchaContainer.style.visibility = 'collapse';

    if (isCorrect) {
        correctAnswerContainer.style.visibility = 'visible';
        incorrectAnswerContainer.style.visibility = 'collapse';
    } else {
        correctAnswerContainer.style.visibility = 'collapse';
        incorrectAnswerContainer.style.visibility = 'visible';
    }
}

