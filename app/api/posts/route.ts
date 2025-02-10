import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");


    try {
        const posts = userId
            ? await prisma.post.findMany({
                where: {userId: parseInt(userId, 10)},

            })
            : await prisma.post.findMany({});

        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({error: "Error fetching posts"});
    }
}
