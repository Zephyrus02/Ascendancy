import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Landing } from "./pages/Landing";
import { LearnMore } from "./pages/LearnMore";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#111] text-white">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <Landing />
                </SignedOut>
                <SignedIn>
                  <Landing />
                </SignedIn>
              </>
            }
          />
          <Route
            path="/learn-more"
            element={
              <>
                <SignedOut>
                  <LearnMore />
                </SignedOut>
                <SignedIn>
                  <LearnMore />
                </SignedIn>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}