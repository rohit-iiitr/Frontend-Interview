import { Link, useLocation } from 'react-router-dom';
import { useBlogs } from '../hooks/useBlogs';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { PlusCircle, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

export function BlogList() {
    const { data: blogs, isLoading, error } = useBlogs();
    const location = useLocation();

    // Extract ID from pathname: /blogs/:id
    // Simple parsing is often more robust than hooks if context is tricky
    const pathParts = location.pathname.split('/');
    const activeId = pathParts[1] === 'blogs' && pathParts[2] ? pathParts[2] : null;

    if (isLoading) return <BlogListSkeleton />;
    if (error) return <div className="p-8 text-center text-destructive">Error loading blogs. Please check if the server is running.</div>;

    return (
        <div className="flex flex-col h-full bg-background/50 border-r"> {/* h-full here means full height of the sidebar container */}
            <div className="p-4 border-b flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 shadow-sm">
                <h2 className="text-xl font-bold tracking-tight">Blog Posts</h2>
                <Link to="/blogs/new">
                    <Button size="sm" className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        New
                    </Button>
                </Link>
            </div>
            {/* The scrollable area for the list itself */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {blogs?.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`} className="block">
                        <Card
                            className={cn(
                                "transition-all duration-200 hover:shadow-md border-transparent hover:border-border relative overflow-hidden",
                                activeId === blog.id
                                    ? "bg-primary/10 text-accent-foreground border-l-4 border-l-primary shadow-sm ring-1 ring-border"
                                    : "hover:bg-accent/5 hover:translate-x-1"
                            )}
                        >
                            <CardHeader className="p-4 space-y-3">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex gap-1.5 flex-wrap">
                                        {blog.category.map(cat => (
                                            <Badge key={cat} variant={activeId === blog.id ? "outline" : "secondary"} className="text-[10px] px-2 py-0.5 font-medium tracking-wide">
                                                {cat}
                                            </Badge>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 whitespace-nowrap bg-muted/50 px-2 py-1 rounded-full">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="space-y-1.5">
                                    <CardTitle className="text-base font-semibold leading-tight">{blog.title}</CardTitle>
                                    <CardDescription className={cn("line-clamp-2 text-xs", activeId === blog.id ? "text-accent-foreground/80" : "")}>
                                        {blog.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function BlogListSkeleton() {
    return (
        <div className="flex flex-col h-full border-r">
            <div className="p-4 border-b flex justify-between items-center">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-9 w-20" />
            </div>
            <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="p-4 space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-12" />
                        </div>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </Card>
                ))}
            </div>
        </div>
    )
}
