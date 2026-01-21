import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-10 pb-6 mt-auto">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tight">CA Monk Blog</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Empowering finance professionals with the latest insights, trends, and career advice. Join our community today.
                        </p>
                        <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Linkedin className="h-4 w-8" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Facebook className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold mb-2">Platform</h4>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mentorship</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Jobs</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</a>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold mb-2">Company</h4>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press</a>
                        <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-semibold">Subscribe to our newsletter</h4>
                        <p className="text-sm text-muted-foreground">Get the latest articles sent right to your inbox.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="h-9 bg-background" />
                            <Button size="sm" className="h-9">
                                <Mail className="h-4 w-4 mr-2" />
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CA Monk. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
