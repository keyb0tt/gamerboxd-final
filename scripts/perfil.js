document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      console.log('Button clicked:', this.textContent);
    });
  });

  // Profile Picture Handling
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

  // Game Cards Handling
  document.querySelectorAll('.game-card').forEach((card, index) => {
    // Set unique data-game attribute for each card
    card.dataset.game = index + 1;
    
    const button = card.querySelector('.change-game-btn');
    const input = card.querySelector('.game-upload-input');
    const img = card.querySelector('.game-image');
    
    // Load saved image for this card
    const savedImage = localStorage.getItem(`gameImage_${card.dataset.game}`);
    if (savedImage) {
      img.src = savedImage;
    }

    input.addEventListener('change', async function (e) {
      if (e.target.files && e.target.files[0]) {
        try {
          button.disabled = true;
          button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

          const result = await processImage(e.target.files[0], 512, 641);

          img.src = result.url;
          localStorage.setItem(`gameImage_${card.dataset.game}`, result.url);

          button.innerHTML = '<i class="fas fa-check"></i> Alterado!';
        } catch (error) {
          console.error('Erro:', error);
          button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro';
          alert(error.message);
        } finally {
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-camera"></i> Alterar';
            button.disabled = false;
          }, 2000);
        }
      }
    });

    button.addEventListener('click', function (e) {
      e.stopPropagation();
      input.click();
    });
  });

  async function processImage(file, width, height) {
    return new Promise((resolve, reject) => {
      if (!file.type.match('image.*')) {
        reject(new Error('Por favor, selecione uma imagem válida'));
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target.result;
      };

      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const scale = Math.max(width / img.width, height / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (width - newWidth) / 2;
        const offsetY = (height - newHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        canvas.toBlob(
          blob => {
            resolve({
              blob: blob,
              url: URL.createObjectURL(blob)
            });
          },
          'image/jpeg',
          0.9
        );
      };

      img.onerror = () => reject(new Error('Erro ao carregar a imagem'));
      reader.readAsDataURL(file);
    });
  }
});