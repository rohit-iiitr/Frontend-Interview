import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../hooks/useBlogs';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { Button } from './ui/button';

export function BlogDetail() {
    const { id } = useParams();
    const { data: blog, isLoading, error } = useBlog(id);

    if (isLoading) return <BlogDetailSkeleton />;
    if (error) return (
        <div className="flex flex-col items-center justify-center p-16 text-center space-y-4">
            <div className="text-destructive font-semibold">Error loading blog</div>
            <Link to="/"><Button variant="outline">Back to Home</Button></Link>
        </div>
    );

    // Empty state for / root route on desktop
    if (!id) return (
        <div className="hidden md:flex flex-col items-center justify-center h-full p-8 text-center space-y-6 text-muted-foreground bg-muted/10 min-h-[50vh]">
            <div className="rounded-full bg-muted/30 p-8">
                <span className="text-4xl">📝</span>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-foreground">Select a blog post</h3>
                <p>Choose a post from the list to view its details</p>
            </div>
        </div>
    );

    if (!blog) return <div className="p-8 text-center text-muted-foreground">Blog not found.</div>;

    return (
        <div className="bg-background animate-in fade-in duration-500 pb-10"> {/* Removed h-full overflow-y-auto */}
            <div className="relative w-full group overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-auto min-h-[300px] object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                    <Link to="/" className="md:hidden mb-6 inline-flex items-center text-sm font-medium text-white/80 hover:text-white bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
                        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to list
                    </Link>
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {blog.category.map(cat => (
                            <Badge key={cat} className="bg-primary hover:bg-primary/90 text-primary-foreground border-none px-3 py-1 text-xs shadow-sm shadow-primary/20">{cat}</Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight shadow-black">{blog.title}</h1>
                    <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 opacity-70" />
                            {new Date(blog.date).toLocaleDateString(undefined, {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 opacity-70" />
                            <span>5 min read</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 md:px-10">
                <p className="text-xl md:text-2xl text-foreground/80 mb-10 font-serif leading-relaxed border-l-4 border-primary/50 pl-6 italic">
                    {blog.description}
                </p>
                <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-foreground/90 font-sans">
                    {blog.content}
                </div>

                <div className="mt-16 pt-8 border-t flex justify-between items-center text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">Published by CA Monk Team</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BlogDetailSkeleton() {
    return (
        <div className="h-full bg-background pb-10">
            <div className="relative h-64 md:h-80 w-full bg-muted animate-pulse" />
            <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
                <Skeleton className="h-10 w-3/4" />
                <div className="flex gap-4">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-24 w-full" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
        </div>
    )
}
