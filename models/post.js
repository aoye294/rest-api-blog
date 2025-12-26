
import { connection } from "../database/mysql/post.js";

export class PostModel {
    static async getPosts() {
        const [result] = await connection.query("SELECT BIN_TO_UUID(id) as id, title, content, category, post_date, author FROM post");
        return result;
    }

    static async getPostById({ id }) {
        const [result] = await connection.query("SELECT BIN_TO_UUID(id) as id, title, content, category, post_date, author FROM post WHERE id = UUID_TO_BIN(?)", [id]);
        return result
    }

    static async getPostByTitle({ title }) {
        const [result] = await connection.query("SELECT BIN_TO_UUID(id) as id, title, content, category, post_date, author FROM post WHERE title LIKE ?", [`%${title}%`]);
        return result
    }

    static async createPost(data) {

        const post = { ...data };
        await connection.query("INSERT INTO post SET ?", [post]);
        return post
    }

    static async updatePost({ current, data }) {
        const {id} = current[0]
        console.log(id)
        const [result] = await connection.query("UPDATE post SET ? WHERE id = UUID_TO_BIN(?)", [data, id]);
        return result
    }

    static async deletePost({ id }) {
        const _id = await this.getPostById({ id });
        if (_id.length === 0) return {data: `El post con id ${id} no fue encontrado`, success: false};
        const [result] = await connection.query("DELETE FROM post WHERE id = UUID_TO_BIN(?)", [id]);
        return {data: `El post con id ${id} fue eliminado`, success: true};
    }
}
