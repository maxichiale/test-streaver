import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


const Posts = async () => {
    const posts = await prisma.post.findMany();
    console.log(posts);

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
            {posts.map((post) => (

                <div
                    className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-4">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
                </div>


            ))}
        </div>
    );
};

export default Posts;
