import { useState } from "react";
import { AppRoutes } from "./components/routing/routes";
import { Header } from "./components/layouts/header";
import { Footer } from "./components/layouts/footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;