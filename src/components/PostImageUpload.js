import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
const props = {
    action: 'http://localhost:4998/uploadpostimg',
    listType: 'picture',
    maxCount: 1,
    method: 'POST'
}
const App = ({ setCurrentUploadSrc }) => {
    const handleUploadChange = (info) => {
        const { status, response } = info.file
        if (status === 'done') {

            // 在这里获取上传完成后的图片URL
            const imageURL = response.url
            console.log(imageURL)
            setCurrentUploadSrc(imageURL)
        } else {
            console.log('连接错误')
        }
    }
    return (
        <Upload {...props}
            onChange={(info) => handleUploadChange(info)}>
            <Button icon={<UploadOutlined />}>选择照片</Button>
        </Upload>
    )
}
export default App