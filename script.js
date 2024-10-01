const themes = [
    [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByxaqs7wvnjE_eXck4OncqbtkiHvrvyKg8Q&s',
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png',
        'https://i.pinimg.com/originals/84/29/94/8429942830ee706352fa51d1af23d503.jpg',
        'https://blog.english4u.net/images/blog/20200707094926.jpg',
        'https://s.yimg.com/ny/api/res/1.2/0VITA9_ZAFDmcuesGGabTw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://s.yimg.com/os/creatr-uploaded-images/2024-05/0a114cf0-19ac-11ef-af6b-4646974f509f',
        'https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22512212/shrek4_disneyscreencaps.com_675.jpg?quality=90&strip=all&crop=44.127604166667,30.392156862745,36.953125,57.96568627451',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfA5mugC13HoFCaYUXtn7s5z-IbY-KZZrwHw&s',
        'https://e7.pngegg.com/pngimages/524/472/png-clipart-memes-50-memes-that-will-make-you-laugh-every-time-memes-cartoons-jokes-funny-s-laugh-out-loud-lol-rofl-funny-books-drawing-internet-meme-meme-mammal-carnivoran.png'
    ],
    [
        'https://school.eatsmart.gov.hk/files/png/banana.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaOJAiN7x0fIByWec-4FFxtiJueeuBffwQ-Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBkMvGA2MOl5xiYdlsPm4w-6Jqd0mZM2AXA&s',
        'https://static01.nyt.com/images/2018/05/23/dining/23fruit/23fruit-master1050.jpg',
        'https://ihealth.bwnet.com.tw/AC_Gallery/2020/04/b201d6bd-475d-8d0b-5308-98525fcf50c2.jpg',
        'https://www.shutterstock.com/image-photo/passion-fruit-isolated-leaf-maracuya-260nw-2496831885.jpg',
        'https://blog.worldgymtaiwan.com/hs-fs/hubfs/%E6%96%87%E7%AB%A0%E5%B0%88%E7%94%A8%E5%9C%96%E7%89%87/%E4%B8%AD%E5%85%83%E6%99%AE%E6%B8%A1%E6%8B%9C%E5%A5%87%E7%95%B0%E6%9E%9C.jpg?width=700&name=%E4%B8%AD%E5%85%83%E6%99%AE%E6%B8%A1%E6%8B%9C%E5%A5%87%E7%95%B0%E6%9E%9C.jpg',
        'https://www.newsmarket.com.tw/files/2012/10/0032.jpg'
    ]
];

let currentThemeIndex = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let startTime = null;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game');
    gameBoard.innerHTML = ''; // Clear existing cards
    const selectedImages = themes[currentThemeIndex];
    shuffle(selectedImages);
    const doubledImages = [...selectedImages, ...selectedImages]; // Create pairs
    shuffle(doubledImages);

    doubledImages.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Memory Card';
        img.style.width = '100%';
        img.style.height = '100%';
        cardBack.appendChild(img);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
        matchedPairs++;

        if (matchedPairs === themes[currentThemeIndex].length) {
            showResult();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function showResult() {
    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    document.getElementById('resultMessage').textContent = `遊戲完成！總時間：${timeTaken} 秒`;
    document.getElementById('overlay').style.display = 'flex';
}

document.getElementById('restartButton').addEventListener('click', () => {
    matchedPairs = 0;
    startTime = new Date();
    document.getElementById('game').innerHTML = '';
    document.getElementById('overlay').style.display = 'none';
    createBoard();
});

document.getElementById('startButton').addEventListener('click', () => {
    startTime = new Date();
    document.getElementById('startButton').style.display = 'none'; // Hide start button
    document.getElementById('gameContainer').style.display = 'block'; // Show the game container
    document.getElementById('switchThemeButton').style.display = 'inline-block'; // Show switch theme button
    createBoard(); // Initialize the game
});

document.getElementById('switchThemeButton').addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    matchedPairs = 0;
    startTime = new Date();
    createBoard();
});
