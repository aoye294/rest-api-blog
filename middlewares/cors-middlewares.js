import cors from "cors";

export const corsMiddleware = () => cors(
    {
        origin: "*"
    }

)

export const corsMiddlewareV2 = ({
    acceptedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001"
    ]
} = {}) => cors({
    origin: (origin, callback) => {
        if(acceptedOrigins.includes(origin) || !origin) {
            return callback(null, true);
        }
        if(!origin) 
            return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    }
})