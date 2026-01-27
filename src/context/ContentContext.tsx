import React, { createContext, useContext, useState, useCallback } from 'react';

export type ContentData = {
    brand: {
        name: string;
        accent: string;
        description: string;
    };
    hero: {
        slides: {
            title: string;
            subtitle: string;
            image: string;
        }[];
    };
    marketing: {
        highlights: {
            icon: string; // 'GraduationCap' | 'Users' | 'BookOpen' | 'Star'
            title: string;
            description: string;
        }[];
    };
    mission: {
        title: string;
        subtitle: string;
        motto: string;
        statement: string;
        author?: string;
    };
    services: {
        title: string;
        subtitle: string;
        items: {
            id: string;
            title: string;
            subtitle: string;
            description: string;
            image: string;
            features: string[];
        }[];
    };
    whyUs: {
        features: {
            image: string;
            title: string;
            description: string;
            brochure: string;
        }[];
    };
    pricing: {
        title: string;
        subtitle: string;
        schoolFees: {
            title: string;
            price: string;
            period: string;
            image: string;
            features: string[];
        }[];
        categoryFees: {
            category: string;
            policies: string;
            rows: { desc: string; price: string; policy: string; }[];
        }[];
    };
    news: {
        title: string;
        subtitle: string;
        articles: {
            id: number;
            title: string;
            summary: string;
            date: string;
            image: string;
        }[];
    };
    contact: {
        title: string;
        subtitle: string;
        email: string;
        phone: string;
        address: string;
    };
};

export const defaultContent: ContentData = {
    brand: {
        name: "Education",
        accent: "Twalumbu",
        description: "Nurturing excellence, character, and innovation in every learner. Our commitment is to provide a holistic education that prepares students for a global future."
    },
    hero: {
        slides: [
            {
                title: "Success isn’t accidental",
                subtitle: "— it’s built from the start.",
                image: "https://images.unsplash.com/photo-1523050335392-99949673ced0?q=80&w=1200&auto=format&fit=crop"
            },
            {
                title: "Innovation-Driven Learning for a Global Future",
                subtitle: "Our modern curriculum and state-of-the-art facilities ensure students are equipped with the skills needed to thrive in the 21st century.",
                image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
            },
            {
                title: "Excellence in Sports and Extra-Curriculars",
                subtitle: "Beyond the classroom, we nurture talent and teamwork through our diverse sports programs and creative arts initiatives.",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop"
            }
        ]
    },
    marketing: {
        highlights: [
            { icon: 'Education', title: "20+", description: "Experience in Education" },
            { icon: 'Programs', title: "12+", description: "Extracurricular Programes" },
            { icon: 'Ratio', title: "1:30", description: "Teacher to Pupil Ratio" }
        ]
    },
    mission: {
        title: "Mission Statement",
        subtitle: "Our Purpose",
        motto: "Excellence in Everything",
        statement: "Education is the most powerful weapon you can use to change the world.",
        author: "Nelson Mandela"
    },
    services: {
        title: "What We Offer",
        subtitle: "We provide a comprehensive educational journey from the very first steps of learning to university readiness.",
        items: [
            {
                id: 'early-childhood',
                title: 'Early Childhood Education',
                subtitle: 'Early Childhood Education',
                description: 'A nurturing start for young learners with play-based, foundational learning that builds social, emotional, and cognitive skills.',
                image: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?q=80&w=800&auto=format&fit=crop',
                features: ['Play-based learning', 'Safe environment', 'Nutritional support']
            },
            {
                id: 'lower-primary',
                title: 'Lower Primary Education',
                subtitle: 'Lower Primary Education',
                description: 'Focused on literacy, numeracy, and curiosity-driven exploration to strengthen the basics and instill confidence.',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
                features: ['Core curriculum', 'Extracurricular activities', 'Holistic development']
            },
            {
                id: 'upper-primary',
                title: 'Upper Primary Education',
                subtitle: 'Upper Primary Education',
                description: 'Where strong foundations are transformed into academic excellence and readiness for secondary education through focused learning and guided independence.',
                image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop',
                features: ['Exam preparation', 'Career guidance', 'Leadership skills']
            }
        ]
    },
    whyUs: {
        features: [
            {
                image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
                title: "Extensive Sports Program",
                description: "Our world-class sports facilities and professional coaching staff help students develop teamwork, discipline, and physical excellence through competitive and recreational sports.",
                brochure: "/assets/documents/sports-brochure.pdf"
            },
            {
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
                title: "Vibrant Arts & Science",
                description: "We believe in the power of creativity. Our arts program offers theater, music, and visual arts, while our tech labs prepare students for a digital world.",
                brochure: "/assets/documents/arts-brochure.pdf"
            },
            {
                image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
                title: "Global Leadership Focus",
                description: "Twalumbu graduates are leaders. We integrate leadership workshops, public speaking, and community service into every grade level's experience.",
                brochure: "/assets/documents/leadership-brochure.pdf"
            }
        ]
    },
    pricing: {
        title: "Transparent Pricing",
        subtitle: "We offer competitive fees with flexible payment options to ensure quality education is accessible.",
        schoolFees: [
            {
                title: "Pre-School & Kindergarten",
                price: "K4,500",
                period: "per Term",
                image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop",
                features: ["Books & Materials Incl.", "Daily Hot Lunch", "Sports & Arts Activities"]
            },
            {
                title: "Primary School (G1-G7)",
                price: "K6,200",
                period: "per Term",
                image: "https://images.unsplash.com/photo-1509062522246-373b1eef7188?q=80&w=800&auto=format&fit=crop",
                features: ["All Textbooks", "ICT & Science Labs", "Extracurricular Clubs"]
            },
            {
                title: "Secondary School (G8-G12)",
                price: "K8,500",
                period: "per Term",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
                features: ["Zambian & Intl Exams", "Advanced Labs", "Career Counseling"]
            }
        ],
        categoryFees: [
            {
                category: "Transport Services",
                policies: "Terms and conditions apply for different zones.",
                rows: [
                    { desc: "Zone A (0-5km)", price: "K1,500", policy: "Monthly" },
                    { desc: "Zone B (5-10km)", price: "K2,200", policy: "Monthly" },
                    { desc: "Zone C (10km+)", price: "K2,800", policy: "Monthly" }
                ]
            },
            {
                category: "Uniforms & Kits",
                policies: "Full kit includes blazer, sweater, and sports attire.",
                rows: [
                    { desc: "Complete Set (Boys)", price: "K1,200", policy: "Once" },
                    { desc: "Complete Set (Girls)", price: "K1,250", policy: "Once" },
                    { desc: "Sports Tracksut", price: "K450", policy: "Once" }
                ]
            }
        ]
    },
    news: {
        title: "Latest School News",
        subtitle: "Stay updated with the latest happenings, achievements, and events from Twalumbu Education Centre.",
        articles: [
            {
                id: 1,
                title: "Twalumbu Wins National Debate Championship",
                summary: "Our senior debate team emerged victorious in the Inter-School National Debate Championship held last weekend.",
                date: "May 15, 2024",
                image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop"
            },
            {
                id: 2,
                title: "New STEM Laboratory Inaugurated",
                summary: "We are excited to announce the opening of our state-of-the-art STEM laboratory, equipped with the latest technology.",
                date: "April 28, 2024",
                image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop"
            },
            {
                id: 3,
                title: "Annual Sports Day 2024 Success",
                summary: "Highlights from our most successful sports day ever, featuring record-breaking performances from our athletes.",
                date: "April 10, 2024",
                image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2070&auto=format&fit=crop"
            },
            {
                id: 4,
                title: "Community Outreach: Tree Planting",
                summary: "Student volunteers led a community tree-planting initiative as part of our sustainability program.",
                date: "March 22, 2024",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2013&auto=format&fit=crop"
            },
            {
                id: 5,
                title: "Excellence in Arts: Drama Festival",
                summary: "Our performing arts department showcased an incredible series of plays at the Regional Drama Festival.",
                date: "March 05, 2024",
                image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=2069&auto=format&fit=crop"
            }
        ]
    },
    contact: {
        title: "Contact Our Team",
        subtitle: "Have questions about admissions or school programs? Send us a message and we'll get back to you shortly.",
        email: "info@twalumbu.edu.zm",
        phone: "+260 977 123 456",
        address: "123 Scholar Avenue, Lusaka, Zambia"
    }
};

type ContentContextType = {
    content: ContentData;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
    updateContent: (path: string, value: any) => void;
    saveContent: () => void;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ContentData>(() => {
        const saved = localStorage.getItem('school_content');
        return saved ? JSON.parse(saved) : defaultContent;
    });
    const [editMode, setEditMode] = useState(false);

    const updateContent = useCallback((path: string, value: any) => {
        setContent(prev => {
            const keys = path.split('.');
            let currentValue: any = prev;
            for (const key of keys) {
                if (currentValue === undefined) break;
                currentValue = currentValue[key];
            }

            if (currentValue === value) return prev;

            const newContent = { ...prev };
            let current: any = newContent;

            for (let i = 0; i < keys.length - 1; i++) {
                current[keys[i]] = Array.isArray(current[keys[i]])
                    ? [...current[keys[i]]]
                    : { ...current[keys[i]] };
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newContent;
        });
    }, []);

    const saveContent = () => {
        localStorage.setItem('school_content', JSON.stringify(content));
        alert('Changes published successfully!');
    };

    return (
        <ContentContext.Provider value={{ content, editMode, setEditMode, updateContent, saveContent }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
