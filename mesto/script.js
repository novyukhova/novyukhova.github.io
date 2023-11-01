// Общее
const popupEls = document.querySelectorAll('.popup');

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');
}

function closePopupByClickOverlay(event) {
    if (event.target === event.currentTarget) closePopup(event.target);
}

popupEls.forEach(popupEl => {
    popupEl.addEventListener('click', closePopupByClickOverlay);
    popupEl.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupEl));
})

// Изменение профиля
const editProfilePopupEl = document.querySelector('#edit-profile-popup');
const editProfileButtonEl = document.querySelector('.profile__edit-button');
const profileNameEl = document.querySelector('.profile__name');
const profileAboutEl = document.querySelector('.profile__about');
const editProfileFormEl = document.querySelector('[name="edit-profile"]');
const formNameEl = editProfileFormEl.querySelector('#profile-name');
const formAboutEl = editProfileFormEl.querySelector('#profile-about');

function openEditProfilePopup() {
    formNameEl.value = profileNameEl.textContent;
    formAboutEl.value = profileAboutEl.textContent;
    openPopup(editProfilePopupEl);
}

function handleEditProfileFormSubmit(event) {
    event.preventDefault();
    profileNameEl.textContent = formNameEl.value;
    profileAboutEl.textContent = formAboutEl.value;
    closePopup(editProfilePopupEl);
}

editProfileButtonEl.addEventListener('click', openEditProfilePopup);
editProfileFormEl.addEventListener('submit', handleEditProfileFormSubmit);

// Изменение ленты
const addPostPopupEl = document.querySelector('#add-post-popup');
const viewPhotoPopupEl = document.querySelector('#view-photo-popup');
const postContainer = document.querySelector('.feed');
const addPostButtonEl = document.querySelector('.profile__add-post-button')
const addPostFormEl = document.querySelector('[name="add-post"]');
const postNameInputEl = addPostFormEl.querySelector('#post-name');
const postLinkInputEl = addPostFormEl.querySelector('#post-link');
const initialPosts = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const postTemplate = document.querySelector('#post-template').content;

function openAddPostPopup() {
    postNameInputEl.value = '';
    postLinkInputEl.value = '';
    openPopup(addPostPopupEl);
}

function handleAddPostFormSubmit(event) {
    event.preventDefault();
    addPost({
        name: postNameInputEl.value,
        link: postLinkInputEl.value
    });
    closePopup(addPostPopupEl);
}

addPostButtonEl.addEventListener('click', openAddPostPopup);
addPostFormEl.addEventListener('submit', handleAddPostFormSubmit);

function openPhotoPopup(post) {
    const photoEl = viewPhotoPopupEl.querySelector('.popup__photo');
    photoEl.src = post.link;
    photoEl.alt = post.name;
    viewPhotoPopupEl.querySelector('.popup__photo-name').textContent = post.name;
    openPopup(viewPhotoPopupEl);
}

function addPost(post) {
    const postEl = postTemplate.querySelector('.post').cloneNode(true);
    const photoEl = postEl.querySelector('.post__photo');

    photoEl.src = post.link;
    photoEl.alt = post.name;
    postEl.querySelector('.post__name').textContent = post.name;

    const likeButtonEl = postEl.querySelector('.post__like-button');
    likeButtonEl.addEventListener('click', function () {
        likeButtonEl.classList.toggle('post__like-button_is-liked');
    });

    const deleteButtonEl = postEl.querySelector('.post__delete-button');
    deleteButtonEl.addEventListener('click', function () {
        postEl.remove();
    });

    const postPhotoEl = postEl.querySelector('.post__photo');
    postPhotoEl.addEventListener('click', () => openPhotoPopup(post));

    postContainer.prepend(postEl);
}

function initPosts() {
    initialPosts.forEach(addPost);
}

document.addEventListener('DOMContentLoaded', initPosts);
