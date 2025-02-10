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
        console.error("Error fetching posts:", error);
        return NextResponse.json({error: "Failed to fetch posts"});
    }
}
