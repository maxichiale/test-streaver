//https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import {PrismaClient, User, Post} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const posts : Post[] = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
    const users : User[] = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());


    await Promise.all(users.map(async (user) => {
        try {
            await prisma.user.create({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    posts: {
                        create: posts.filter(post => post.userId === user.id).map(post => ({
                            id: post.id,
                            title: post.title,
                            body: post.body,
                        })),
                    },
                },
            });
        } catch (error) {
            console.error(`Failed to create user ${user.id}:`, error);
        }
    }));


    // for (const user of users) {
    //     await prisma.user.create({
    //         data: {
    //             id: user.id,
    //             name: user.name,
    //             email: user.email,
    //             posts: {
    //                 create: posts.filter(post => post.userId === user.id).map(post => ({
    //                     id: post.id,
    //                     title: post.title,
    //                     body: post.body,
    //                 })),
    //             },
    //         },
    //     });
    // }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

