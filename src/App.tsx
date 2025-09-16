import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header, Footer } from "@bcgov/design-system-react-components";
import { ServiceList } from "./components/ServiceList";
import { ServiceDetail } from "./components/ServiceDetail";
import { SearchBar } from "./components/SearchBar";
import {
  getAllServices,
  searchServices,
  getServiceById,
  getRelatedServices,
} from "./utils/serviceApi";
import type { Service } from "./types/service";

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
      } catch (err) {
        setError("Failed to load services");
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleSearch = async (
    query: string,
    tags: string[],
  ) => {
    try {
      setLoading(true);
      const results = await searchServices(query, tags);
      setServices(results);
    } catch (err) {
      setError("Search failed");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      setError("Failed to reset services");
      console.error("Reset error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive mb-2">Error</h2>
          <p className="text-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Main home component
  const HomePage = () => (
    <>
      <div className="mb-8">
        <h1 className="mb-6">Service Catalogue</h1>
        <SearchBar
          onSearch={handleSearch}
          onReset={handleReset}
        />
      </div>
      <ServiceList services={services} loading={loading} />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header title="Service Catalogue" />
        <main className="container mx-auto px-4 py-8 flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/index.html"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/preview_page.html"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/service/:id"
              element={
                <ServiceDetail
                  getServiceById={getServiceById}
                  getRelatedServices={getRelatedServices}
                />
              }
            />
            {/* Catch-all route for any unmatched paths */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}