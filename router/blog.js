import { Router } from 'express'
import { PostController } from '../controller/post-controller.mjs'

export const createPostRouter = ({ postModel }) => {
    const blogRouter = Router()

    const postController = new PostController({ postModel })

    blogRouter.get('/', postController.getPosts)
    blogRouter.post('/', postController.createPost)
    blogRouter.get('/post/title', postController.getPostByTitle)
    blogRouter.get('/:id', postController.getPostById)
    blogRouter.patch('/:id', postController.updatePost)
    blogRouter.delete('/:id', postController.deletePost)

    return blogRouter
}