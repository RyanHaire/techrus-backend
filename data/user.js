import bcyrpt from 'bcryptjs'
import dotend from 'dotenv'

dotenv.config()

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcyrpt.hashSync(process.env.USER_PW, 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcyrpt.hashSync(process.env.USER_PW, 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcyrpt.hashSync(process.env.USER_PW, 10),
    },
]

export default users