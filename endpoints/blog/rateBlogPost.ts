import { api } from "@/services/api";

interface rateBlogPostParams {
  postId: number;
  rating: number;
}

export async function rateBlogPost({
  postId,
  rating,
}: rateBlogPostParams): Promise<null> {
  try {
    const response = await api.post("/blog-post-ratings", {
      data: {
        postId,
        rating,
      },
    });

    return response.data;
  } catch (err) {
    let errMessage = "";
    if (err instanceof Error) errMessage = err.message;
    throw new Error(errMessage);
  }
}
