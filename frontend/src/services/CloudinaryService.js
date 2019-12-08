function uploadImg(file) {
    const CLOUD_NAME = 'du8vrew3w'
    const PRESET_NAME = 'vvl8kzxg'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', file)
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export default {
    uploadImg
}