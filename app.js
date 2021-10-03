const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryList = document.querySelector(".js-gallery");
const modalImg = document.querySelector(".lightbox__image");
const modal = document.querySelector(".lightbox");
const button = document.querySelector(".lightbox__button");

const markup = galleryItems.map(({preview, original, description}, index) => `<li class="gallery__item">
      <a class="gallery__link" href=''>
      <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/> </a> </li>`,
)
  .join('');

galleryList.innerHTML = markup;

const onOpenModalClick = e => {
  e.preventDefault();

  if (e.target.localName === 'img') {
    modalImg.src = e.target.dataset.source;
    modalImg.alt = e.target.alt;
    modalImg.dataset.index = e.target.dataset.index;
    modal.classList.add('is-open');
  }
};

const onKeyboardClick = e => {
  if (e.key === 'Escape') {
    modal.classList.remove('is-open');
  }
  
};

const onCloseModalClick = e => {
  if (e.target.localName !== 'img') {
    modal.classList.remove('is-open');

    modalImg.src = '';
    modalImg.alt = '';
  }
};

window.addEventListener('click', onOpenModalClick);
window.addEventListener('keyup', onKeyboardClick);
window.addEventListener('click', onCloseModalClick);
window.removeEventListener('click', onKeyboardClick);

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onArrowLeft() {
  let index =+ modalImg.dataset.index;
  if (index === 0) {
    newSrc(galleryItems.length - 1);
    return;
  }
  newSrc(index, -1);
};

function onArrowRight() {
  let index = + modalImg.dataset.index;
  if (index === galleryItems.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
};

function newSrc(index, step = 0) {
  modalImg.dataset.index = `${index + step}`;
  modalImg.src = galleryItems[index + step].original;
};