import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Bug, 
  Home, 
  SprayCan,
  Award,
  Tag,
  FileText,
  ChevronRight,
  MessageCircle
} from "lucide-react";

export default function HomePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
      description: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit contact form",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold brand-blue">National Pest Control</h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="brand-gray hover:brand-blue px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="brand-gray hover:brand-blue px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="brand-gray hover:brand-blue px-3 py-2 text-sm font-medium transition-colors"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="brand-gray hover:brand-blue px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>
                <a 
                  href="https://wa.me/919818750889" 
                  className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-colors inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold brand-gray leading-tight mb-6">
                Reliable Pest Solutions in Delhi
              </h1>
              <p className="text-xl brand-light-gray mb-6">
                Over 10 Years of Expert Service
              </p>
              <p className="text-lg brand-light-gray mb-8 leading-relaxed">
                National Pest Control Service has been protecting homes, schools, colleges, and major organizations across Delhi for over a decade. We pride ourselves on dependable, thorough service and a track record built on trust and results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  className="bg-brand-blue text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                >
                  Book Free Inspection
                </Button>
                <a 
                  href="tel:9818750889"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional pest control service in action" 
                className="rounded-xl shadow-2xl w-full h-auto" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-green text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="font-semibold brand-gray">10+ Years</p>
                    <p className="text-sm brand-light-gray">Expert Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-4">Our Professional Services</h2>
            <p className="text-lg brand-light-gray max-w-2xl mx-auto">
              Comprehensive pest control solutions tailored to protect your property and ensure peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="General pest control treatment" 
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-blue text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Bug size={20} />
                  </div>
                  <h3 className="text-xl font-semibold brand-gray">General Pest Control (GPC)</h3>
                </div>
                <p className="brand-light-gray mb-4">
                  Our signature service, covering all your pest management needs in one comprehensive package. Complete protection for your property.
                </p>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Termite inspection and treatment" 
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-brand-green text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Home size={20} />
                  </div>
                  <h3 className="text-xl font-semibold brand-gray">Termite Treatment</h3>
                </div>
                <p className="brand-light-gray mb-4">
                  Prevents and eliminates termite infestations to protect your property. Advanced treatment methods ensure long-term protection.
                </p>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1556909502-f6cfdb0fed08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                alt="Cockroach treatment service" 
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                    <SprayCan size={20} />
                  </div>
                  <h3 className="text-xl font-semibold brand-gray">Cockroach Treatment</h3>
                </div>
                <p className="brand-light-gray mb-4">
                  Complete solutions for a cockroach-free environment. Safe, effective treatments that eliminate infestations at the source.
                </p>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center gap-1"
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-6">About National Pest Control Service</h2>
              <p className="text-lg brand-light-gray mb-6 leading-relaxed font-medium">
                "Our mission: to let every customer sleep easy and live tension-free."
              </p>
              <p className="brand-light-gray mb-8 leading-relaxed">
                National Pest Control Service has been protecting homes, schools, colleges, and major organizations across Delhi for over a decade. We pride ourselves on dependable, thorough service and a track record built on trust and results.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold brand-blue mb-2">10+</div>
                  <div className="brand-light-gray">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="brand-light-gray">Happy Customers</div>
                </div>
              </div>
              
              {/* Owner Profile */}
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    CS
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold brand-gray">Chatru Singh</h3>
                    <p className="brand-light-gray">Owner & Founder</p>
                    <p className="text-sm brand-light-gray mt-1">Dedicated to customer satisfaction and high-quality service for over a decade.</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional pest control team" 
                className="rounded-xl shadow-2xl w-full h-auto" 
              />
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-green text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <span className="text-sm font-medium brand-gray">Licensed & Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-4">What Our Customers Say</h2>
            <p className="text-lg brand-light-gray">Trusted by thousands of satisfied customers across Delhi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 relative bg-gray-50">
              <div className="absolute -top-4 left-6 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm">"</span>
              </div>
              <p className="brand-light-gray mb-4 pt-4">
                "Fantastic service. They handled our school's pest issue quickly—highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="Customer testimonial" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div>
                  <p className="font-medium brand-gray">School Administrator</p>
                  <p className="text-sm brand-light-gray">Delhi Public School</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 relative bg-gray-50">
              <div className="absolute -top-4 left-6 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm">"</span>
              </div>
              <p className="brand-light-gray mb-4 pt-4">
                "Professional, punctual, and effective. Our office has been pest-free for months!"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616c40cf4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="Customer testimonial" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div>
                  <p className="font-medium brand-gray">Office Manager</p>
                  <p className="text-sm brand-light-gray">Tech Solutions Ltd</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 relative bg-gray-50">
              <div className="absolute -top-4 left-6 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm">"</span>
              </div>
              <p className="brand-light-gray mb-4 pt-4">
                "Reliable and trustworthy. They solved our termite problem permanently. Highly satisfied!"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="Customer testimonial" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div>
                  <p className="font-medium brand-gray">Homeowner</p>
                  <p className="text-sm brand-light-gray">Pandav Nagar Resident</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-4">Frequently Asked Questions</h2>
            <p className="text-lg brand-light-gray">Get answers to common questions about our pest control services</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <span className="font-medium brand-gray text-left">How long does treatment take?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="brand-light-gray">Most services are completed the same day; large jobs may need follow-up visits to ensure complete elimination.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <span className="font-medium brand-gray text-left">Is pest control safe for children and pets?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="brand-light-gray">Yes—we use only approved, safe chemicals and application methods that are safe for your family and pets when applied correctly.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <span className="font-medium brand-gray text-left">Do I need to leave my home during treatment?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="brand-light-gray">Usually not, but we'll advise you if necessary, based on the specific service and treatment method being used.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <span className="font-medium brand-gray text-left">How often should I get pest control service?</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="brand-light-gray">We recommend quarterly treatments for ongoing protection, but frequency depends on your specific situation and pest pressure in your area.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-4">Contact Us</h2>
            <p className="text-lg brand-light-gray">Get a free inspection and quote for your pest control needs</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-blue text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold brand-gray mb-1">Phone</h3>
                    <p className="brand-light-gray">9818750889</p>
                    <a href="tel:9818750889" className="text-blue-600 hover:text-blue-700 transition-colors">Call Now</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold brand-gray mb-1">Email</h3>
                    <p className="brand-light-gray">csravicsravi5@gmail.com</p>
                    <a href="mailto:csravicsravi5@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">Send Email</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold brand-gray mb-1">Address</h3>
                    <p className="brand-light-gray">C-220, Pandav Nagar, Delhi-110092</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold brand-gray mb-1">Business Hours</h3>
                    <p className="brand-light-gray">Open daily, 9:00AM – 7:00PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 rounded-xl">
                <h3 className="font-semibold brand-gray mb-3">Quick WhatsApp Contact</h3>
                <a 
                  href="https://wa.me/919818750889" 
                  className="bg-brand-green text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </div>
              
              <div className="mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                  alt="Professional office building" 
                  className="rounded-xl shadow-lg w-full h-48 object-cover" 
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="p-8 bg-gray-50">
              <h3 className="text-2xl font-semibold brand-gray mb-6">Book Free Inspection</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="brand-gray font-medium">Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            {...field} 
                            className="border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="brand-gray font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your phone number" 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="brand-gray font-medium">Address *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Property address" 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="brand-gray font-medium">Email (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="brand-gray font-medium">Pest Problem Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your pest problem in detail..." 
                            rows={4} 
                            {...field}
                            className="border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Submitting..." : "Book Free Inspection"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold brand-gray mb-4">Licensed & Certified</h2>
            <p className="text-lg brand-light-gray">Our credentials ensure professional and safe pest control services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="bg-brand-blue text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tag size={32} />
              </div>
              <h3 className="font-semibold brand-gray mb-2">Government Licensed</h3>
              <p className="brand-light-gray text-sm">Fully licensed pest control operator in Delhi</p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="bg-brand-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="font-semibold brand-gray mb-2">Insured Service</h3>
              <p className="brand-light-gray text-sm">Complete insurance coverage for peace of mind</p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="bg-yellow-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award size={32} />
              </div>
              <h3 className="font-semibold brand-gray mb-2">Certified Technicians</h3>
              <p className="brand-light-gray text-sm">Trained and certified pest control professionals</p>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="p-8 max-w-md mx-auto">
              <FileText size={64} className="text-blue-600 mb-4 mx-auto" />
              <h3 className="font-semibold brand-gray mb-2">Documentation Available</h3>
              <p className="brand-light-gray text-sm mb-4">
                All licenses and certifications available upon request
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                View Certificates →
              </button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">National Pest Control Service</h3>
              <p className="text-gray-300 mb-4">
                Professional pest control solutions across Delhi. Over 10 years of reliable service protecting homes and businesses.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://wa.me/919818750889" 
                  className="bg-brand-green text-white rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2"><Phone size={16} />9818750889</p>
                <p className="flex items-center gap-2"><Mail size={16} />csravicsravi5@gmail.com</p>
                <p className="flex items-center gap-2"><MapPin size={16} />C-220, Pandav Nagar, Delhi-110092</p>
                <p className="flex items-center gap-2"><Clock size={16} />Daily: 9:00AM – 7:00PM</p>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-600 my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 National Pest Control Service. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Terms & Conditions</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">Service Guarantee</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
