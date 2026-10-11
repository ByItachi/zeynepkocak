import CollabForm from "./_CollabForm";

export default function IsbirligiPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">Marka İş Birlikleri</h1>
      <p className="text-[#5b5f58] mb-8">
        Marka iş birliği teklifleriniz için aşağıdaki formu doldurabilirsiniz; başvurular admin
        panelinden değerlendirilip durumu güncellenir.
      </p>
      <CollabForm />
    </div>
  );
}
