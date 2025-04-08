

document.addEventListener('DOMContentLoaded', function () {

  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      console.log('Button clicked:', this.textContent);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const uploadInput = document.getElementById('upload-input');
  const profilePic = document.getElementById('profile-pic');
  const changePicBtn = document.getElementById('change-pic-btn');


  const savedPhoto = localStorage.getItem('profilePicture');
  if (savedPhoto) {
    profilePic.src = savedPhoto;
  }


  changePicBtn.addEventListener('click', function () {
    uploadInput.click();
  });


  uploadInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {

          profilePic.src = event.target.result;


          localStorage.setItem('profilePicture', event.target.result);


          profilePic.style.transform = 'scale(1.05)';
          setTimeout(() => {
            profilePic.style.transform = 'scale(1)';
          }, 300);
        };
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    profilePic.onerror = function () {
      this.src = 'https://via.placeholder.com/200';
      localStorage.removeItem('profilePicture');
    };
  });
});

document.getElementById('change-pic-btn').addEventListener('click', function (e) {
  e.stopPropagation();
  document.getElementById('upload-input').click();
});


document.querySelector('.profile-pic-container').addEventListener('mouseenter', function () {
  this.querySelector('#change-pic-btn').style.opacity = '1';
});

document.querySelector('.profile-pic-container').addEventListener('mouseleave', function () {
  this.querySelector('#change-pic-btn').style.opacity = '0';
});

document.addEventListener('DOMContentLoaded', function () {
  const editableName = document.querySelector('.editable-name');
  const editNameBtn = document.querySelector('.edit-name-btn');


  const savedName = localStorage.getItem('userName');
  if (savedName) {
    editableName.textContent = savedName;
  }


  editableName.addEventListener('mouseenter', function () {
    editNameBtn.style.opacity = '0.8';
  });

  editableName.addEventListener('mouseleave', function () {
    if (!editableName.isContentEditable) {
      editNameBtn.style.opacity = '0';
    }
  });


  editNameBtn.addEventListener('click', function () {
    editableName.contentEditable = 'true';
    editableName.focus();
    editNameBtn.style.opacity = '1';
    editNameBtn.innerHTML = '<i class="fas fa-check"></i>';
  });


  editableName.addEventListener('blur', function () {
    editableName.contentEditable = 'false';
    localStorage.setItem('userName', editableName.textContent);
    editNameBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    editNameBtn.style.opacity = '0';
  });


  editableName.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      editableName.blur();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {

  loadGameImages();

  document.querySelectorAll('.change-game-image').forEach(button => {
    button.addEventListener('click', function () {
      const gameCard = this.closest('.game-card');
      const input = gameCard.querySelector('.game-upload-input');
      input.click();

      input.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function (event) {

            resizeImage(event.target.result, 150, 225, 0.7, function (optimizedImage) {
              const img = gameCard.querySelector('.game-image');
              img.src = optimizedImage;
              localStorage.setItem(`gameThumb_${gameCard.dataset.game}`, optimizedImage);
            });
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    });
  });
});


function resizeImage(imageData, width, height, quality, callback) {
  const img = new Image();
  img.src = imageData;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');


    ctx.drawImage(img, 0, 0, width, height);


    callback(canvas.toDataURL('image/jpeg', quality));
  };
}

function loadGameImages() {
  document.querySelectorAll('.game-card').forEach(card => {
    const savedImage = localStorage.getItem(`gameThumb_${card.dataset.game}`);
    if (savedImage) {
      card.querySelector('.game-image').src = savedImage;
    } else {

      card.querySelector('.game-image').src = 'images/jogos/default-thumb.jpg';
    }
  });
}


document.querySelector('.games-container').addEventListener('wheel', (e) => {
  e.preventDefault();
  e.currentTarget.scrollLeft += e.deltaY;
});

