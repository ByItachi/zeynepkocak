import PageForm from "../_PageForm";
import { savePage } from "../actions";

export default function NewPage() {
  const action = savePage.bind(null, null);
  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Yeni Sayfa</h1>
      <PageForm action={action} />
    </div>
  );
}
