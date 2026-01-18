export type UserRole = "ADMIN" | "EDITOR" | "DOCTOR";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: "ACTIVE" | "INACTIVE";
  lastLogin?: string;
}

export interface ServiceCondition {
  title: string;
  description: string;
  symptoms: string[];
  image: string;
}

export interface ServiceTreatment {
  title: string;
  description: string;
  instructions: string[];
  procedureSteps: string[];
  procedureText: string;
  idealCandidate: {
    title: string;
    description: string;
    steps: string[];
  };
  evaluationProcess: {
    title: string;
    description: string;
    steps: string[];
    bottomDescription: string;
  };
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface Service {
  serviceId: string;
  heroImage: string;
  title: string;
  badge: string;
  description: string;
  
  // Array Sections
  conditions: ServiceCondition[];
  treatments: ServiceTreatment[];
  
  // Benefits Section
  benefits: {
    title: string;
    description: string;
    list: ServiceBenefit[];
  };

  // Why Choose Section
  whyChoose: {
    title: string;
    description: string;
    image: string;
    expertise: ServiceBenefit[]; // Reuse benefit type for title/desc pairs
  };

  // FAQ
  faqTitle: string;
  faqs: { question: string; answer: string }[];

  // Booking
  booking: {
    title: string;
    description: string;
  };

  // SEO
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  url?: string;
  
  enabled: boolean;
  createdAt: string;
}

export interface ExtraField {
  heading: string;
  description: string;
}

export interface Tag {
  name: string;
}

export interface BlogPost {
  blogId: string;
  blogImage: string;
  blogTitle: string;
  categories: string[];
  tags: Tag[];
  author: string;
  timeline: string; // Date string
  extraFields: ExtraField[];
  
  // SEO
  seoTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  url?: string;
  
  enabled: boolean;
  createdAt: string;
}