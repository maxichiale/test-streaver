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
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Error deleting post" });
    }
}
