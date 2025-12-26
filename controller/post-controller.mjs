import { validateBlog, validateBlogPartial } from "../schema/blog-validador.mjs"


export class PostController {

    constructor({postModel}) {
        this.postModel = postModel
    }

    getPosts = async (req, res) => {
        const blogs = await this.postModel.getPosts()
        
        if (blogs.length === 0) {
            return res.status(404).json({ message: "No tienes blogs, crea uno" })
        }
        
        res.status(200).json(blogs)
    }

    createPost = async (req, res) => {
        const result = validateBlog(req.body)

        if (!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

            const blog = await this.postModel.createPost(result.data)
        res.status(201).json(blog)
    }

    getPostByTitle = async (req, res) => {
        const { title } = req.query 

            const blog = await this.postModel.getPostByTitle({ title })

        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado", data: title })
        }
        
        res.status(200).json(blog)
    }

    getPostById = async (req, res) => {
        const { id } = req.params

            const blog = await this.postModel.getPostById({ id })

        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado", data: id })
        }
        
        res.status(200).json(blog)
    }

    updatePost = async (req, res) => {
        const { id } = req.params
        
        // Primero verificamos que exista
            const blog = await this.postModel.getPostById({ id })
        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado", data: id })
        }

        // Validamos los datos parciales
        const validation = validateBlogPartial(req.query)
        if (!validation.success) {
            return res.status(400).json({ message: validation.error.message })
        }

            const updated = await this.postModel.updatePost({ 
            current: blog, 
            data: validation.data 
        })
        
        res.status(200).json(updated)
    }

    deletePost = async (req, res) => {
        const { id } = req.params

            const blog = await this.postModel.deletePost({ id })

        if (!blog.success) {
            return res.status(404).json({ message: blog.data, status: blog.success })
        }
        
        res.status(200).json({ message: blog.data, status: blog.success})
    }

}