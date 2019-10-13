import axios from "axios";
import { hashFile } from '@/util/SendImage.js'
import api from "./api";

// 新 axios 实例用于第三方请求
const localUploadInstance = axios.create()

export async function createTask (file,prefixPath) {
    return api.post('/storage',{
        filename: file.name,
        size: file.size,
        mime_type: file.type,
        storage: {
            channel: 'public'
        },
        prefixPath:prefixPath,
        hash: await hashFile(file),
    },{
        validateStatus: s => s === 201,
    })
}


async function uploadByPut (task, file) {
    return localUploadInstance.put(task.uri, file, {
        headers: task.headers,
    })
}

async function uploadByPost (task, file) {
    return localUploadInstance.post(task.uri, file, {
        headers: task.headers,
    })
}

export default async function (file,prefixPath) {
    const { data: task } = await createTask(file,prefixPath)

    switch (task.method) {
        case 'PUT':
            await uploadByPut(task, file)
            break
        case 'POST':
            await uploadByPost(task, file)
            break
        default:
            throw new Error('不支持')
    }

    return task
}