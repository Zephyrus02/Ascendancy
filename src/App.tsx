import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Landing } from "./pages/Landing";
import { LearnMore } from "./pages/LearnMore";
import { CreateTeam } from "./pages/CreateTeam";


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#111] text-white">
        <Routes>
          <Route
            path="/"
            element={
              <Landing />
            }
          />
          <Route
            path="/learn-more"
            element={
              <LearnMore />
            }
          />
          <Route
            path="/create-team"
            element={
              <>
              <SignedIn>
                <CreateTeam />
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}