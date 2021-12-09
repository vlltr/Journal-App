import axios from 'axios'

const uploadImage = async ( file ) => {
    
    if ( !file ) return

    try {

        const formData = new FormData() 
        formData.append('upload_preset','lh0fmqbl')
        formData.append('file', file)

        const url = 'https://api.cloudinary.com/v1_1/dpyj2dgvj/image/upload'

        const { data } = await axios.post(url, formData)
        return data.secure_url

    } catch (error) {
        console.error('Error with image handler: ' + error)
        return null
    }
}

export default uploadImage