import {
  ErrorBoundaryComponent,
  Link,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import styles from "~/tailwind.css";

import highlightCSS from 'highlight.js/styles/atom-one-dark.css';
import { CatchBoundaryComponent } from "@remix-run/react/routeModules";

export const meta: MetaFunction = () => {
  return { title: "jerolimov.io" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: highlightCSS },
  ];
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <main
          className="min-h-full bg-cover bg-top sm:bg-top"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Uh oh! I think you’re lost.
            </h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
              >
                Go back home
              </a>
            </div>
            <div>
              <h1>Caught</h1>
              <p>Status: {caught.status}</p>
              <pre>
                <code>{JSON.stringify(caught.data, null, 2)}</code>
              </pre>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
      <main
          className="min-h-full bg-cover bg-top sm:bg-top"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
            <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">404 error</p>
            <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Uh oh! I think you’re lost.
            </h1>
            <p className="mt-2 text-lg font-medium text-black text-opacity-50">
              It looks like the page you’re looking for doesn't exist.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
              >
                Go back home
              </a>
            </div>
            <div>
              <pre>
                <code>{JSON.stringify(error, null, 2)}</code>
              </pre>
            </div>
          </div>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="container mx-auto text-center py-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            <Link to="/">Christoph Jerolimov</Link>
          </h1>
        </header>

        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <svg className="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Project Nero</a>
              </div>
            </li>
          </ol>
        </nav>

        <main className="container mx-auto prose prose-slate prose-img:rounded-xl">
          <Outlet />
        </main>
        <footer className="container mx-auto prose my-10 pt-5 text-center border-t">
          <Link to="/imprint" prefetch="none">Imprint</Link>
        </footer>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
