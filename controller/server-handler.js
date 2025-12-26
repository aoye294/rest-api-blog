import path from "path";
import fs from "fs"

let blogs = []

const __dirname = path.resolve()

const loadPosts = async () => {
    const dbPath = path.join(__dirname, "blog-db.json")
    try {
        const data = await fs.promises.readFile(dbPath, "utf-8")
        blogs = JSON.parse(data)
        return blogs
    } catch (error) {
        console.log(error)
    }
}


const savePost = async () => {
    const dbPath = path.join(__dirname, "blog-db.json")
    try {
        await fs.promises.writeFile(dbPath, JSON.stringify(blogs))
    } catch (error) {
        console.log(error)
    }
}

export default {
    loadPosts,
    savePost
}