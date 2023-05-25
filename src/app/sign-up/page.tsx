import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignUp />
    </div>
  );
}
