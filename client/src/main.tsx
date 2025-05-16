import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import necessary modules from React and React Router
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */
// Import the main app component
import App from "./App.tsx";
import FilterGallery from "./components/FilterGallery/filter-gallery.tsx";
import FilterProvider from "./components/FilterProvider/FilterProvider.tsx";
import About from "./pages/About.tsx";
import ArtDetail from "./pages/ArtDetail.tsx";
import Gallery from "./pages/Gallery.tsx";
import Home from "./pages/Home.tsx";

// Create router configuration with routes
const GalleryWrapper = () => (
  <FilterProvider>
    <FilterGallery />
    <Gallery />
  </FilterProvider>
);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gallery",
        element: <GalleryWrapper />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/:artist/:id",
        element: <ArtDetail />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Désactive le rechargement à la réactivation
    },
  },
});

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the QueryClientProvider, which wraps the RouterProvider
createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);

/**
 * Helpful Notes:
 * ... (your existing notes)
 */
