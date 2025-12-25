import path from "path";
import fs from "fs"
let blogs = []
import {validateBlog, validateBlogPartial} from "../schema/blog-validador.mjs"
import crypto from "crypto"

const __dirname = path.resolve()

const loadBlogs = async () => {
    const dbPath = path.join(__dirname, "blog-db.json")
    try {
        const data = await fs.promises.readFile(dbPath, "utf-8")
        blogs = JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}


const saveBlogs = async () => {
    const dbPath = path.join(__dirname, "blog-db.json")
    try {
        await fs.promises.writeFile(dbPath, JSON.stringify(blogs))
    } catch (error) {
        console.log(error)
    }
}

await loadBlogs()

const getBlogs = (req, res) => {
    if(blogs.length === 0){
        return res.status(404).json({message: "No tienes blogs, crea uno"})
    }
    res.status(200).json(blogs)
}

const getBlogById = (req, res) => {
    const id = req.params.id

    const blog = blogs.find(blog => blog.id === id)
    if(!blog){
        return res.status(404).json({message: "Blog no encontrado"})
    }
    res.status(200).json(blog)
}

// const getBlogByTitle = (req, res) => {
//     const title = req.params.title 

//     const blog = blogs.find(blog => blog.title === title)
//     if(!blog){
//         return res.status(404).json({message: "Blog no encontrado"})
//     }
//     res.status(200).json(blog)
// }

const postBlog = (req, res) => {

    const result = validateBlog(req.body)
    console.log(result)
    if(!result.success){
        return res.status(400).json({message: result.error.message})
    }  

    const blog = {
        id: crypto.randomUUID(),
        ...result.data
    }
    blogs.push(blog)
    saveBlogs()
    res.status(201).json(blog)
}

const updateBlog = (req, res) => {
    const id = req.params.id
    const index = blogs.findIndex(blog => blog.id === id)
    if (index === -1) {
        return res.status(404).json({message: "Blog no encontrado"})
    }

    const validation = validateBlogPartial(req.body)
    if (!validation.success) {
        return res.status(400).json({message: validation.error.message})
    }

    const updated = { ...blogs[index], ...validation.data }
    blogs[index] = updated
    saveBlogs()
    res.status(200).json(updated)
}

const deleteBlog = (req, res) => {
    const id = req.params.id
    const blog = blogs.find(blog => blog.id === id)
    if(!blog){
        return res.status(404).json({message: "Blog no encontrado"})
    }
    blogs = blogs.filter(blog => blog.id !== id)
    saveBlogs()
    res.status(200).json({message: "Blog eliminado"})
}



export default {
    loadBlogs,
    saveBlogs,
    getBlogs,
    getBlogById,
    // getBlogByTitle,
    postBlog,
    updateBlog,
    deleteBlog
}