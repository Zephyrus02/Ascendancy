import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Landing } from "./pages/Landing";
import { LearnMore } from "./pages/LearnMore";
import { CreateTeam } from "./pages/CreateTeam";
import { Profile } from "./pages/Profile";
import { ComingSoon } from "./pages/ComingSoon";
import { createUserProfile } from "./services/api";

export default function App() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const createUser = async () => {
      if (user?.id && user?.username) {
        try {
          await createUserProfile(user.id, user.username);
        } catch (error) {
          console.error('Error creating user profile:', error);
        }
      }
    };

    if (isLoaded && user) {
      createUser();
    }
  }, [user, isLoaded]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#111] text-white w-full max-w-[100vw] overflow-x-hidden">
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
          <Route
            path="/profile"
            element={
              <>
                <SignedIn>
                  <Profile />
                </SignedIn>
                <SignedOut>
                  <SignInButton />
                </SignedOut>
              </>

            }
          />
          <Route
            path="/brackets"
            element={
              <ComingSoon />
            }
          />
          <Route
            path="/rooms"
            element={
              <ComingSoon />
            }
          />
          <Route
            path="/admin"
            element={
              <ComingSoon />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}