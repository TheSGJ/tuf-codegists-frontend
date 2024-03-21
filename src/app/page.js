import CodeInput from "@/components/CodeInput";
import ToastProvider from "@/components/ToastProvider";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between m-10">
      <h2>Add Your Code Snippets</h2>
      <CodeInput />
    </main>
  );
}
