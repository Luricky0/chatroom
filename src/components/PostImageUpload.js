import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
const props = {
    action: 'http://localhost:4998/upload',
    listType: 'picture',
    maxCount:1,
    method:'POST'

};
const App = ({setCurrentUploadSrc}) => {
    const handleUploadChange=(info)=>{
        setCurrentUploadSrc("https://th.bing.com/th/id/OIF.wT3P3LocGXV5LT6e7vUr4g?rs=1&pid=ImgDetMain")
        // const { status, response } = info.file;
        // if (status === 'done') {
        //     console.log('Upload finished:', response.url);
        //     // 在这里获取上传完成后的图片URL
        //
        // }
    }
    return (
        <Upload {...props}
                onChange={(info)=>handleUploadChange(info)}>
            <Button icon={<UploadOutlined />}>选择照片</Button>
        </Upload>
    );
}
export default App;