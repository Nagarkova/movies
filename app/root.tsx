import { Outlet, createRootRoute } from '@tanstack/react-router'
import './app.css'

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  )
}

export const Root = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error }) => {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (error instanceof Error) {
      details = error.message;
      stack = error.stack;
    }

    return (
      <main className="pt-16 p-4 container mx-auto">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    );
  },
})
