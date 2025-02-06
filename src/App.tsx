import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { AdminRoute } from "./components/admin/AdminRoute";
import { Landing } from "./pages/Landing";
import { LearnMore } from "./pages/LearnMore";
import { Brackets } from "./pages/Brackets";
import { CreateTeam } from "./pages/CreateTeam";
import { Profile } from "./pages/Profile";
import { Rooms } from "./pages/Rooms";
import { AdminRooms } from "./pages/admin/AdminRooms";
import { SetMatches } from "./pages/admin/SetMatches";
import { ComingSoon } from "./pages/ComingSoon";
import {Admin} from "./pages/admin";
import { ManageTeams } from "./pages/admin/ManageTeams";
import { TNC } from "./pages/TNC";
import { Refund } from "./pages/Refund";
import { Privacy } from "./pages/Privacy";
import { ContactPage } from "./pages/ContactPage";
import { Shipping } from "./pages/Shipping";
import { createUserProfile } from "./services/api";
import { Schedule } from "./pages/admin/Schedule";
import { Toaster } from 'react-hot-toast';

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
    <>
      <Toaster position="top-right" />
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
                <Brackets />
              }
            />
            <Route
              path="/rooms"
              element={
                <>
                  <SignedIn>
                    <Rooms />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton/>
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <SignedIn>
                    <AdminRoute>
                      <Admin />
                    </AdminRoute>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton/>
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/admin/teams"
              element={
                <>
                  <SignedIn>
                    <AdminRoute>
                      <ManageTeams />
                    </AdminRoute>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton/>
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/admin/schedule"
              element={
                <>
                <SignedIn>
                  <AdminRoute>
                    <Schedule />
                  </AdminRoute>
                </SignedIn>
                <SignedOut>
                <SignInButton/>
              </SignedOut>
              </>
              }
            />
            <Route
              path="/admin/room"
              element={
                <>
                <SignedIn>
                  <AdminRoute>
                    <AdminRooms />
                  </AdminRoute>
                </SignedIn>
                <SignedOut>
                <SignInButton/>
              </SignedOut>
              </>
              }
            />
            <Route
              path="/admin/matches"
              element={
                <>
                <SignedIn>
                  <AdminRoute>
                    <SetMatches />
                  </AdminRoute>
                </SignedIn>
                <SignedOut>
                <SignInButton/>
              </SignedOut>
              </>
              }
            />
            <Route
              path="/tnc"
              element={
                <TNC />
              }
            />
            <Route
              path="/refund"
              element={
                <Refund />
              }
            />
            <Route
              path="/privacy"
              element={
                <Privacy />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage />
              }
            />
            <Route
              path="/shipping"
              element={
                <Shipping />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}