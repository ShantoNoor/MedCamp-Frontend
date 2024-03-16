/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Spinner from "./components/Spinner.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OrganizerRoute from "./components/OrganizerRoute.jsx";
import ParticipantRoute from "./components/ParticipantRoute.jsx";
import ProfessionalRoute from "./components/ProfessionalRoute.jsx";

const AuthProvider = lazy(() => import("./components/AuthProvider.jsx"));
const CssBaseline = lazy(() => import("@mui/material/CssBaseline"));
const DashboardRouter = lazy(() => import("./components/DashboardRouter.jsx"));

const MainLayout = lazy(() => import("./layouts/MainLayout.jsx"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout.jsx"));

const Home = lazy(() => import("./pages/Home.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const SignOut = lazy(() => import("./pages/SignOut.jsx"));
const AvailableCamps = lazy(() => import("./pages/AvailableCamps.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));

const OrganizerProfile = lazy(() => import("./pages/OrganizerProfile.jsx"));
const AddCamp = lazy(() => import("./pages/AddCamp.jsx"));
const ManageCamps = lazy(() => import("./pages/ManageCamps.jsx"));
const ManageRegisteredCamps = lazy(() =>
  import("./pages/ManageRegisteredCamps.jsx")
);
const ParticipantProfile = lazy(() => import("./pages/ParticipantProfile.jsx"));
const RegisteredCamps = lazy(() => import("./pages/RegisteredCamps.jsx"));
const PaymentHistory = lazy(() => import("./pages/PaymentHistory.jsx"));
const FeedbackAndRatings = lazy(() => import("./pages/FeedbackAndRatings.jsx"));
const ProfessionalProfile = lazy(() =>
  import("./pages/ProfessionalProfile.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-out",
        element: <SignOut />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard", element: <DashboardRouter /> },
      {
        path: "/dashboard/organizer-profile",
        element: (
          <OrganizerRoute>
            <OrganizerProfile />
          </OrganizerRoute>
        ),
      },
      {
        path: "/dashboard/add-camp",
        element: (
          <OrganizerRoute>
            <AddCamp />
          </OrganizerRoute>
        ),
      },
      {
        path: "/dashboard/manage-camps",
        element: (
          <OrganizerRoute>
            <ManageCamps />
          </OrganizerRoute>
        ),
      },
      {
        path: "/dashboard/manage-registered-camps",
        element: (
          <OrganizerRoute>
            <ManageRegisteredCamps />
          </OrganizerRoute>
        ),
      },

      {
        path: "/dashboard/participant-profile",
        element: (
          <ParticipantRoute>
            <ParticipantProfile />
          </ParticipantRoute>
        ),
      },
      {
        path: "/dashboard/registered-camps",
        element: (
          <ParticipantRoute>
            <RegisteredCamps />
          </ParticipantRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <ParticipantRoute>
            <PaymentHistory />
          </ParticipantRoute>
        ),
      },
      {
        path: "/dashboard/feedback-and-ratings",
        element: (
          <ParticipantRoute>
            <FeedbackAndRatings />
          </ParticipantRoute>
        ),
      },

      {
        path: "/dashboard/professional-profile",
        element: (
          <ProfessionalRoute>
            <ProfessionalProfile />
          </ProfessionalRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <RouterProvider router={router}></RouterProvider>
            <CssBaseline />
          </LocalizationProvider>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster />
    </Suspense>
  </React.StrictMode>
);
