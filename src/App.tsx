import { SignedIn, SignedOut} from "@clerk/clerk-react";
import { Landing } from "./pages/Landing";

export default function App() {
  return (
    <header>
      <SignedOut>
        <Landing />
      </SignedOut>
      <SignedIn>
        <Landing/>
      </SignedIn>
    </header>
  );
}