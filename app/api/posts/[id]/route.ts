import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedPost = await prisma.post.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: `Post ${id} deleted` });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Error deleting post" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
