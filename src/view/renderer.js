
const { send, on } = window.electron;

console.log('DOMContentLoaded');

on('did-finish-load', (event) => {

  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const preview = document.getElementById('preview');

  uploadButton.addEventListener('click', async () => {
    console.log('uploadButton.addEventListener');
  
    if (!fileInput.files.length) {
      console.log('No file selected');
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.log('Response error:', response);
        return;
      }

      const data = await response.json();
      send('upload-success', data);
    } catch (error) {
      console.log('Fetch error:', error);
    }
  });
  
  console.log('uploadButton.addEventListener');

  fileInput.addEventListener('change', () => {

    console.log('fileInput.addEventListener');

    if (!fileInput.files.length) {
      console.log('No file selected');
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  });

  console.log('DOMContentLoaded');
});
