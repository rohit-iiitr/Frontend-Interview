import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { PenSquare, BookOpen } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            CA Monk Blog
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link
                            to="/"
                            className="transition-colors hover:text-foreground/80 text-foreground"
                        >
                            Home
                        </Link>
                        <Link
                            to="/blogs/new"
                            className="transition-colors hover:text-foreground/80 text-muted-foreground"
                        >
                            Create
                        </Link>
                    </nav>
                </div>

                {/* Mobile View / Action Button */}
                <div className="flex items-center space-x-4">
                    <Link to="/blogs/new">
                        <Button size="sm" className="hidden md:flex">
                            <PenSquare className="h-4 w-4 mr-2" />
                            Write a Post
                        </Button>
                        {/* Mobile Icon Button */}
                        <Button size="icon" variant="ghost" className="md:hidden">
                            <PenSquare className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
