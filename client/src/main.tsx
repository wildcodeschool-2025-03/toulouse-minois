// Import necessary modules from React and React Router
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */
// Import the main app component
import App from "./App.tsx";
import FilterGallery from "./components/FilterGallery/filter-gallery.tsx";
import FilterProvider from "./components/FilterProvider/FilterProvider.tsx";
import Gallery from "./pages/Gallery.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import ArtDetail from "./pages/ArtDetail.tsx";
import HarvardMuseumAPIContext from "../context/HavardMuseumAPIContext.tsx";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";
/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!

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
loader: async ({ params }) => {
  const { id } = params;
  const artworkId = Number.parseInt(id, 10);

  const contextValue = HarvardMuseumAPIContext.artMemo;

  if (contextValue?.artMemo) {
    const artwork = contextValue.artMemo.find((art) => art.objectid === artworkId);

    if (artwork) {
      return { artwork };
    }
  } else {
    return { error: "Les données de la galerie n'ont pas été chargées." };
  }
  return null;
},
      },
    ],
  },
]);


/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(<RouterProvider router={router} />);


/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 * To add more pages to your app, first create a new component (e.g., About.tsx).
 * Then, import that component above like this:
 *
 * import About from "./pages/About";
 *
 * Add a new route to the router:
 *
 * {
 * path: "/about",
 * element: <About />,  // Renders the About component
 * }
 *
 * 2. Try Nested Routes:
 * For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 * Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 * You can create routes that take parameters (e.g., /users/:id).
 * Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */