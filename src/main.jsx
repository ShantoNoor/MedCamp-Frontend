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
import AdminRoute from "./components/AdminRoute.jsx";
import UserRoute from "./components/UserRoute.jsx";

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
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));

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
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: [
  //     { path: "/dashboard", element: <DashboardRouter /> },

  //     {
  //       path: "/dashboard/my-profile",
  //       element: <MyProfile />,
  //     },
  //     {
  //       path: "/dashboard/my-parcels",
  //       element: (
  //         <UserRoute>
  //           <MyParcels />
  //         </UserRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/book-parcel",
  //       element: (
  //         <UserRoute>
  //           <BookParcel />
  //         </UserRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/update-parcel/:_id",
  //       element: (
  //         <UserRoute>
  //           <UpdateParcel />
  //         </UserRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/statistics",
  //       element: (
  //         <AdminRoute>
  //           <Statistics />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/all-parcels",
  //       element: (
  //         <AdminRoute>
  //           <AllParcel />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/all-users",
  //       element: (
  //         <AdminRoute>
  //           <AllUsers />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/all-delivery-man",
  //       element: (
  //         <AdminRoute>
  //           <AllDeliveryMan />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/my-delivery-list",
  //       element: (
  //         <DeliveryManRoute>
  //           <MyDeliveryList />
  //         </DeliveryManRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/my-reviews",
  //       element: (
  //         <DeliveryManRoute>
  //           <MyReviews />
  //         </DeliveryManRoute>
  //       ),
  //     },
  //   ],
  // },
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
