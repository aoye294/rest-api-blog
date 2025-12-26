import zod from "zod";

const blog = zod.object({
        title: zod.string({
            required_error: "El titulo es requerido",
            invalid_type_error: "El titulo debe ser una cadena de texto"
        }).min(3).max(100),
        content: zod.string({
            required_error: "El contenido es requerido",
            invalid_type_error: "El contenido debe ser una cadena de texto"
        }).min(10).max(1000),
        category: zod.string({
            required_error: "La categoria es requerida",
            invalid_type_error: "La categoria debe ser una cadena de texto"
        }).min(3).max(50),
        post_date: zod.preprocess((arg) => {
            if (typeof arg === "string" || typeof arg === "number") {
                const d = new Date(arg)
                return isNaN(d.getTime()) ? arg : d
            }
            return arg
        }, zod.date({
            required_error: "La fecha es requerida",
            invalid_type_error: "La fecha debe ser una fecha válida"
        })),
        author: zod.string({
            required_error: "El autor es requerido",
            invalid_type_error: "El autor debe ser una cadena de texto"
        }).min(3).max(50)
    })

const validateBlog = (input) => {
    return blog.safeParse(input)
}

const validateBlogPartial = (input) => {
    return blog.partial().safeParse(input) 
}

export { validateBlog, validateBlogPartial }
