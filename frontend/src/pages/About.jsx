import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Globe, Award, Users, Trophy, Shield, Factory, MapPin, Quote, ArrowRight, CheckCircle } from 'lucide-react';

const VenumAboutPage = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentAthlete, setCurrentAthlete] = useState(0);

    // Company milestones
    const milestones = [
        {
            year: "2006",
            title: "Founded in France",
            description: "Venum was born from the passion for combat sports and the desire to create premium equipment."
        },
        {
            year: "2012",
            title: "UFC Partnership",
            description: "Became the official outfitting partner of the UFC, marking our entry into elite combat sports."
        },
        {
            year: "2018",
            title: "Thailand Manufacturing",
            description: "Established state-of-the-art manufacturing facility in Thailand, ensuring premium quality craftsmanship."
        },
        {
            year: "2024",
            title: "Global B2B Network",
            description: "Expanded to serve 500+ distributors and 2,500+ gym partners worldwide."
        }
    ];

    // Manufacturing highlights
    const manufacturingFeatures = [
        {
            icon: Factory,
            title: "Thailand Craftsmanship",
            description: "Hand-crafted in our state-of-the-art facility using traditional Muay Thai leather working techniques combined with modern technology."
        },
        {
            icon: Shield,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous 15-point quality control testing to ensure it meets professional standards."
        },
        {
            icon: Award,
            title: "Premium Materials",
            description: "We use only top-grade Skintex leather, high-density foam, and reinforced stitching for maximum durability."
        },
        {
            icon: CheckCircle,
            title: "ISO Certified",
            description: "Our manufacturing processes are ISO 9001:2015 certified, ensuring consistent quality across all production lines."
        }
    ];

    // Global distribution stats
    const distributionStats = [
        { region: "North America", partners: "150+", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center" },
        { region: "Europe", partners: "200+", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=200&fit=crop&crop=center" },
        { region: "Asia Pacific", partners: "120+", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=200&fit=crop&crop=center" },
        { region: "Latin America", partners: "80+", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&crop=center" },
        { region: "Middle East & Africa", partners: "50+", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center" }
    ];

    // Customer testimonials
    const testimonials = [
        {
            name: "Mike Rodriguez",
            title: "Owner, Elite Combat Gym",
            location: "Los Angeles, CA",
            content: "Venum equipment has transformed our gym. The quality is unmatched, and our members notice the difference immediately. The B2B support team is exceptional.",
            rating: 5,
            years: "3+ years partnership"
        },
        {
            name: "Sarah Chen",
            title: "Regional Distributor",
            location: "Singapore",
            content: "Working with Venum for 5 years has been incredible. Their product range, pricing, and marketing support have helped us grow our business significantly.",
            rating: 5,
            years: "5+ years partnership"
        },
        {
            name: "James Wilson",
            title: "MMA Academy Director",
            location: "Manchester, UK",
            content: "The consistency in quality and the durability of Venum products make them perfect for high-intensity training. Our athletes love the comfort and performance.",
            rating: 5,
            years: "4+ years partnership"
        }
    ];

    // Athlete partnerships
    const athletes = [
        {
            name: "Jose Aldo",
            sport: "MMA",
            achievement: "Former UFC Featherweight Champion",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=faces",
            quote: "Venum gear gives me the confidence to perform at my best."
        },
        {
            name: "Lyoto Machida",
            sport: "MMA",
            achievement: "Former UFC Light Heavyweight Champion",
            image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=400&fit=crop&crop=faces",
            quote: "The quality and craftsmanship are exceptional."
        },
        {
            name: "Wanderlei Silva",
            sport: "MMA",
            achievement: "MMA Legend & Hall of Famer",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop&crop=faces",
            quote: "Venum understands what fighters need."
        }
    ];

    // Certifications
    const certifications = [
        { name: "ISO 9001:2015", type: "Quality Management" },
        { name: "CE Certified", type: "European Conformity" },
        { name: "UFC Official", type: "Combat Sports" },
        { name: "Fair Trade", type: "Ethical Manufacturing" }
    ];

    useEffect(() => {
        const testimonialTimer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        const athleteTimer = setInterval(() => {
            setCurrentAthlete((prev) => (prev + 1) % athletes.length);
        }, 4000);

        return () => {
            clearInterval(testimonialTimer);
            clearInterval(athleteTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/ok.jpg"
                        alt="Venum manufacturing facility"
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Since 2006</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black mb-6 text-white">
                            CRAFTING
                            <span className="text-red-600"> EXCELLENCE</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            From our origins in France to becoming the official UFC partner, Venum has been at the forefront
                            of combat sports innovation for nearly two decades.
                        </p>
                    </div>

                    {/* Company Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-black text-red-600 mb-2">18+</div>
                            <div className="text-gray-300 font-medium">Years of Excellence</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-red-600 mb-2">600+</div>
                            <div className="text-gray-300 font-medium">Global Partners</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-red-600 mb-2">50+</div>
                            <div className="text-gray-300 font-medium">Countries Served</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-black text-red-600 mb-2">1M+</div>
                            <div className="text-gray-300 font-medium">Products Delivered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company History Timeline */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 text-black">Our Journey</h2>
                        <p className="text-gray-600 text-lg">From startup to global leader in combat sports equipment</p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-red-600 hidden md:block"></div>

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 hover:border-red-600">
                                            <div className="text-red-600 font-black text-2xl mb-3">{milestone.year}</div>
                                            <h3 className="text-xl font-bold mb-3 text-black">{milestone.title}</h3>
                                            <p className="text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow-lg"></div>

                                    <div className="w-full md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Manufacturing Excellence */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="mb-6">
                                <span className="text-red-600 font-semibold text-sm tracking-wider uppercase">Made in Thailand</span>
                            </div>
                            <h2 className="text-4xl font-black mb-6 text-black">
                                Precision Craftsmanship
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Our state-of-the-art facility in Thailand combines traditional Muay Thai leather working
                                techniques with modern manufacturing technology to create equipment that meets the highest
                                professional standards.
                            </p>

                            <div className="space-y-6">
                                {manufacturingFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-black mb-2">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/gym.jpg"
                                    alt="Manufacturing facility"
                                    className="w-full h-96 object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-6xl" style={{ display: 'none' }}>
                                    🏭
                                </div>
                            </div>

                            {/* Certifications overlay */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                                <h4 className="font-bold text-black mb-3">Certifications</h4>
                                <div className="space-y-2">
                                    {certifications.slice(0, 2).map((cert, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-sm font-medium text-gray-700">{cert.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Distribution Network */}
            <section className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-6 text-white">Global Distribution Network</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Our products reach fighters and gym owners across the globe through our extensive partner network
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {distributionStats.map((region, index) => (
                            <div key={index} className="bg-zinc-900 rounded-2xl p-8 text-center hover:bg-zinc-800 transition-colors">
                                <div className="text-4xl mb-4">{region.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{region.region}</h3>
                                <div className="text-3xl font-black text-red-600 mb-2">{region.partners}</div>
                                <div className="text-gray-400 text-sm">Active Partners</div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold rounded-xl transition-colors">
                            Become a Partner
                        </button>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 text-black">What Our Partners Say</h2>
                        <p className="text-gray-600 text-lg">Real feedback from distributors and gym owners worldwide</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
                            <Quote className="w-12 h-12 text-red-600 mb-6" />

                            <div className="mb-8">
                                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                    "{testimonials[currentTestimonial].content}"
                                </p>

                                <div className="flex items-center space-x-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-black text-lg">{testimonials[currentTestimonial].name}</div>
                                    <div className="text-red-600 font-medium">{testimonials[currentTestimonial].title}</div>
                                    <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].location}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].years}</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial indicators */}
                        <div className="flex justify-center space-x-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Athlete Partnerships */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-6 mb-6">
                            <div className="h-px w-20 bg-red-600"></div>
                            <span className="text-red-600 font-bold tracking-widest uppercase text-sm">Champions Trust Venum</span>
                            <div className="h-px w-20 bg-red-600"></div>
                        </div>
                        <h2 className="text-4xl font-black mb-4 text-black">Elite Athlete Partnerships</h2>
                        <p className="text-gray-600 text-lg">World-class fighters choose Venum for performance and reliability</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {athletes.map((athlete, index) => (
                            <div
                                key={index}
                                className={`bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${index === currentAthlete ? 'ring-2 ring-red-600' : ''
                                    }`}
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-gray-200">
                                    <img
                                        src={athlete.image}
                                        alt={athlete.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-6xl" style={{ display: 'none' }}>
                                        🥊
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="text-red-600 text-sm font-semibold mb-2">{athlete.sport}</div>
                                    <h3 className="text-xl font-bold mb-2 text-black">{athlete.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{athlete.achievement}</p>
                                    <blockquote className="text-gray-700 italic">"{athlete.quote}"</blockquote>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black mb-6 text-white">Ready to Partner with Venum?</h2>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        Join our global network of distributors and gym owners. Experience the Venum difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 font-bold text-lg rounded-xl transition-colors">
                            Request Partnership Info
                        </button>
                        <button className="border-2 border-white hover:bg-white hover:text-red-600 text-white px-8 py-4 font-bold text-lg rounded-xl transition-colors">
                            Download Catalog
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VenumAboutPage;