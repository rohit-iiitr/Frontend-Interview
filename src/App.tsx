import { Routes, Route, useLocation } from 'react-router-dom';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { CreateBlogForm } from './components/CreateBlogForm';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { cn } from './lib/utils';

function App() {
  const location = useLocation();
  const isRoot = location.pathname === '/';

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Navbar />
      <div className="flex-1 w-full">
        <div className="container mx-auto flex items-start px-4 md:px-8 border-x bg-background/50 min-h-[calc(100vh-4rem)]">
          {/* Left Panel: Blog List - Sticky on Desktop */}
          <aside
            className={cn(
              "w-full md:w-[350px] lg:w-[400px] flex-shrink-0 flex flex-col border-r transition-all duration-300 bg-background",
              !isRoot && "hidden md:flex", // Hide on mobile if not root
              "md:sticky md:top-16 md:h-[calc(100vh-4rem)]" // Sticky behavior
            )}
          >
            <BlogList />
          </aside>

          {/* Right Panel: Main Content */}
          <main
            className={cn(
              "flex-1 flex flex-col bg-secondary/10 min-h-[calc(100vh-4rem)]", // Ensure min height
              isRoot && "hidden md:flex" // Hide on mobile if root (because list is shown)
            )}
          >
            <Routes>
              <Route path="/" element={<BlogDetail />} />
              {/* Note: BlogDetail handles the "empty" state for root path */}
              <Route path="/blogs/new" element={<CreateBlogForm />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
