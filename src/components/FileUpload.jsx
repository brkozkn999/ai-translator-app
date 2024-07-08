import { IconPaperclip } from '@tabler/icons-react'
import React from 'react'

const FileUpload = ({ handleFileUpload }) => {
    return (
        <label htmlFor='file-upload' className='cursor-pointer'>
            <IconPaperclip size={21} />
            <input id='file-upload' type='file' className='hidden' onChange={handleFileUpload} />
        </label>
    )
}

export default FileUpload