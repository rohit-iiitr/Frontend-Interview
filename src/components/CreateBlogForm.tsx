import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateBlog } from '../hooks/useBlogs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Loader2 } from 'lucide-react';

export function CreateBlogForm() {
    const navigate = useNavigate();
    const createPost = useCreateBlog();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        coverImage: '',
        content: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createPost.mutateAsync({
                ...formData,
                category: formData.category.split(',').map(c => c.trim().toUpperCase()).filter(c => c),
                date: new Date().toISOString()
            });
            // Add a small delay for UX
            setTimeout(() => navigate('/'), 500);
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className="h-full overflow-y-auto bg-background p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4 mb-2">
                    <Link to="/" className="md:hidden inline-flex items-center text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back
                    </Link>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Create New Blog Post</h1>
                    <p className="text-muted-foreground">Share your thoughts with the world. Fill out the details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Details</CardTitle>
                            <CardDescription>Basic information about your blog post</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="title">
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter a catchy title..."
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="description">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="A brief summary of your post..."
                                    required
                                    className="resize-none h-20"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="category">
                                    Categories
                                </label>
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="e.g., TECH, FINANCE, CAREER (comma separated)"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                                <div className="flex flex-wrap gap-2 mt-2 min-h-6">
                                    {formData.category.split(',').filter(c => c.trim()).map((cat, i) => (
                                        <Badge key={i} variant="secondary" className="text-[10px]">{cat.trim().toUpperCase()}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Content & Media</CardTitle>
                            <CardDescription>The main content and visuals</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="coverImage">
                                    Cover Image URL
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        id="coverImage"
                                        name="coverImage"
                                        placeholder="https://..."
                                        required
                                        type="url"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formData.coverImage && (
                                    <div className="mt-2 relative rounded-md overflow-hidden aspect-video border bg-muted">
                                        <img
                                            src={formData.coverImage}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none" htmlFor="content">
                                    Content
                                </label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    placeholder="Write your full story here..."
                                    required
                                    className="min-h-[300px] font-mono text-sm leading-relaxed"
                                    value={formData.content}
                                    onChange={handleChange}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button type="button" variant="ghost" onClick={() => navigate('/')}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting || createPost.isPending}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    'Publish Post'
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}
