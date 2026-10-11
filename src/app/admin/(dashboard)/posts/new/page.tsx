import PostForm from "../_PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Yeni Yazı</h1>
      <PostForm action={createPost} />
    </div>
  );
}
