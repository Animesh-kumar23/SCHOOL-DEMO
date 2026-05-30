/**
 * Hardcoded placeholder content for the Phase 2 public site.
 *
 * Everything visitors see during the demo comes from here. In Phase 4 these
 * exports are replaced by server-side reads from MongoDB — pages import from
 * this module, so the swap is localised.
 */

/** Seeded Lorem Picsum photo — stable per seed, any size, no API key. */
export function photo(seed: string, w = 800, h = 600): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

/** Initials avatar on a navy background — reliable stand-in for staff photos. */
export function avatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=1e3a8a&color=ffffff&size=256&bold=true`;
}

export const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "2,000+", label: "Happy Students" },
  { value: "120+", label: "Expert Faculty" },
  { value: "98%", label: "Board Results" },
];

export const tickerItems = [
  "Admissions open for 2026–27 — apply before 30 June",
  "Annual Day celebrations on 14 December",
  "Class XII results: 100% pass, 12 students above 95%",
  "Inter-house Sports Meet winners announced",
  "Parent–Teacher Meeting scheduled for 21 June",
];

// Default Founder's Message, used as a fallback until the school fills in the
// Founder fields on the admin Settings page. Name, photo and text are all
// editable there and override these values everywhere they appear.
export const principal = {
  name: "Dr. Raja Ram Yadav",
  designation: "Founder & Chairman",
  photo: avatar("Raja Ram Yadav"),
  message: [
    "आर आर इंटरनेशनल स्कूल एंड हॉस्टल में आपका स्वागत है। हमारा मानना है कि अच्छी शिक्षा सिर्फ़ किताबों तक सीमित नहीं — यह बच्चे के संस्कार, सोच और आत्मविश्वास को भी बढ़ाती है।",
    "हमारे अनुभवी टीचर्स हर बच्चे पर ध्यान देते हैं, ताकि वह पढ़ाई के साथ-साथ एक अच्छा इंसान भी बने। हम आपको हमारे कैंपस पर आने और इस परिवार का हिस्सा बनने के लिए आमंत्रित करते हैं।",
  ],
};

export type Program = {
  title: string;
  description: string;
  icon: "GraduationCap" | "FlaskConical" | "Palette" | "Trophy" | "BookOpen" | "Users";
};

export const programs: Program[] = [
  {
    title: "Academic Excellence",
    description: "A rigorous CBSE curriculum from Nursery to Grade XII with a consistent record of outstanding board results.",
    icon: "GraduationCap",
  },
  {
    title: "Science & Innovation",
    description: "Well-equipped labs, robotics, and an Atal Tinkering Lab that turn curiosity into hands-on discovery.",
    icon: "FlaskConical",
  },
  {
    title: "Arts & Culture",
    description: "Music, dance, theatre and visual arts that help every student find and express their creative voice.",
    icon: "Palette",
  },
  {
    title: "Sports & Fitness",
    description: "Cricket, basketball, athletics, swimming and yoga on a sprawling campus with professional coaching.",
    icon: "Trophy",
  },
  {
    title: "Holistic Learning",
    description: "Value education, life skills and community service woven into everyday learning.",
    icon: "BookOpen",
  },
  {
    title: "Small Class Sizes",
    description: "A healthy student–teacher ratio ensures personalised attention for every learner.",
    icon: "Users",
  },
];

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  body: string[];
};

// Placeholder news for the demo. The Kavi Sammelan item is based on real press
// coverage; the rest are sample posts the school will replace via the admin panel.
export const news: NewsItem[] = [
  {
    slug: "kavi-sammelan-rr-foundation",
    title: "RR Foundation organises Kavi Sammelan at the school",
    excerpt:
      "A lively Kavi Sammelan was held on the school campus, bringing together poets, lawyers and community members.",
    category: "Event",
    date: "2026-02-15",
    image: photo("rr-kavi-sammelan", 1200, 700),
    body: [
      "RR Foundation organised a Kavi Sammelan on the RR International School campus, which was attended by poets, lawyers, NGO officials and the school management.",
      "Poets shared verses on values, education and society, and the school managers thanked the community for its continued support.",
      "The event was covered by the local newspaper Dastak Prabhat.",
    ],
  },
  {
    slug: "admissions-open-nursery-to-10",
    title: "Admissions open for Nursery to Class 10",
    excerpt:
      "Admissions for the new session are now open for all classes from Nursery to Class 10, with hostel facility available.",
    category: "Admissions",
    date: "2026-04-01",
    image: photo("rr-admissions", 1200, 700),
    body: [
      "RR International School & Hostel has opened admissions for the new session for all classes from Nursery to Class 10.",
      "Hostel facility with healthy food and RO water is available for outstation students.",
      "Parents can call 8340474969 or visit the school office in Jitwarpur, Samastipur for details.",
    ],
  },
  {
    slug: "entrance-exam-coaching-batches",
    title: "New entrance-exam coaching batches begin",
    excerpt:
      "Fresh coaching batches for Sainik School, Navodaya and Simultala entrance exams have started at the school.",
    category: "Coaching",
    date: "2026-03-10",
    image: "/rr/entrance-coaching.jpg",
    body: [
      "RR International School has started new in-house coaching batches for major entrance exams, including Sainik School, Jawahar Navodaya Vidyalaya and Simultala Awasiya Vidyalaya.",
      "Experienced teachers take regular classes, practice tests and doubt-clearing sessions.",
      "Interested students and parents can enquire at the school office.",
    ],
  },
  {
    slug: "republic-day-celebration",
    title: "Republic Day celebrated with flag hoisting and cultural programme",
    excerpt:
      "Students celebrated Republic Day with flag hoisting, patriotic songs and a colourful cultural programme.",
    category: "Culture",
    date: "2026-01-26",
    image: photo("rr-republic-day", 1200, 700),
    body: [
      "RR International School celebrated Republic Day with flag hoisting on the school campus.",
      "Students presented patriotic songs, speeches and dances, and teachers spoke about the values of the Constitution.",
      "The programme ended with sweets distribution for all students.",
    ],
  },
  {
    slug: "summer-camp-2026",
    title: "Summer Camp: Learn, Explore, Grow (22–29 May)",
    excerpt:
      "A week-long summer camp with dance, art, yoga, games and personality-development activities.",
    category: "Event",
    date: "2026-05-22",
    image: photo("rr-summer-camp", 1200, 700),
    body: [
      "RR International School & Hostel organised a week-long Summer Camp from 22 to 29 May.",
      "Activities included dance & music, art & craft, yoga & meditation, story telling, mind games, teamwork and personality development.",
      "The camp gave children a fun mix of learning and life skills during the holidays.",
    ],
  },
  {
    slug: "teachers-day-excellence-awards",
    title: "Teacher's Day & Janmashtami celebrated with Excellence Awards",
    excerpt:
      "The school celebrated Teacher's Day and Krishna Janmashtami and honoured students with RR Foundation Excellence Awards.",
    category: "Event",
    date: "2025-09-05",
    image: photo("rr-teachers-day", 1200, 700),
    body: [
      "RR International School celebrated Teacher's Day along with Shri Krishna Janmashtami on the campus.",
      "Students received the RR Foundation Excellence Award for their performance, presented by the school management and guests.",
      "Teachers were felicitated for their dedication and hard work.",
    ],
  },
  {
    slug: "bihar-diwas-awareness-rally",
    title: "Students take out Bihar Diwas awareness rally",
    excerpt:
      "Students of RR International School marched in a Bihar Diwas rally, spreading awareness in the community.",
    category: "Event",
    date: "2026-03-22",
    image: "/rr/bihar-diwas.jpg",
    body: [
      "Students of RR International School took out an awareness rally on Bihar Diwas in Jitwarpur, Samastipur.",
      "Children carried banners and slogans encouraging the community towards education and awareness.",
      "Teachers and staff guided the students throughout the rally.",
    ],
  },
];

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  isPast: boolean;
  body: string[];
};

export const events: EventItem[] = [
  {
    slug: "annual-day-2026",
    title: "Annual Day Celebrations",
    date: "2026-12-14",
    venue: "School Auditorium",
    image: photo("event-annual", 1200, 700),
    isPast: false,
    body: [
      "Join us for an evening of music, dance and drama as our students present the Annual Day showcase.",
      "Chief Guest and award distribution to follow the cultural programme.",
    ],
  },
  {
    slug: "parent-teacher-meeting-june",
    title: "Parent–Teacher Meeting",
    date: "2026-06-21",
    venue: "Respective Classrooms",
    image: photo("event-ptm", 1200, 700),
    isPast: false,
    body: [
      "A scheduled interaction between parents and class teachers to discuss student progress.",
      "Please carry your ward's diary and report card.",
    ],
  },
  {
    slug: "summer-workshop-2026",
    title: "Summer Skill Workshop",
    date: "2026-06-05",
    venue: "Activity Block",
    image: photo("event-workshop", 1200, 700),
    isPast: false,
    body: [
      "A two-week enrichment workshop covering coding, pottery, public speaking and chess.",
      "Open to students of Grades VI to X. Registration at the front office.",
    ],
  },
  {
    slug: "founders-day-2026",
    title: "Founder's Day",
    date: "2026-02-10",
    venue: "Main Ground",
    image: photo("event-founders", 1200, 700),
    isPast: true,
    body: [
      "The school commemorated its founding with a special assembly and felicitation of long-serving staff.",
    ],
  },
];

export type Notice = {
  id: string;
  title: string;
  category: "general" | "examination" | "admission" | "circular" | "holiday";
  date: string;
};

export const notices: Notice[] = [
  { id: "n1", title: "Summer vacation from 1 June to 30 June 2026", category: "holiday", date: "2026-05-25" },
  { id: "n2", title: "Class X & XII pre-board datesheet released", category: "examination", date: "2026-05-20" },
  { id: "n3", title: "Admission forms for 2026–27 now available", category: "admission", date: "2026-05-15" },
  { id: "n4", title: "Revised bus routes effective from 1 June", category: "circular", date: "2026-05-10" },
  { id: "n5", title: "Annual fee schedule for 2026–27", category: "general", date: "2026-05-02" },
  { id: "n6", title: "Uniform guidelines for the new session", category: "circular", date: "2026-04-26" },
  { id: "n7", title: "Holiday on account of local elections", category: "holiday", date: "2026-04-18" },
  { id: "n8", title: "Unit Test I schedule for Grades VI–IX", category: "examination", date: "2026-04-10" },
];

export type Faculty = {
  name: string;
  designation: string;
  department: string;
  qualifications: string;
  photo: string;
  bio?: string;
};

// Founder and Vice Principal are real. Teacher entries are placeholders the
// school will replace with its actual roster via the admin panel.
export const faculty: Faculty[] = [
  {
    name: "Dr. Raja Ram Yadav",
    designation: "Founder & Chairman",
    department: "Management",
    qualifications: "Ph.D. (Hindi), MBA (HR), B.E. (Mech.), UGC-NET; Ex-IAF",
    photo: avatar("Raja Ram Yadav"),
    bio: "Founder of RR International School & Hostel and the RR Foundation. A former Indian Air Force serviceman and lifelong educator, poet and motivational speaker, committed to bringing quality, value-based education to Samastipur.",
  },
  {
    name: "Anubhav Kumar",
    designation: "Vice Principal",
    department: "Management",
    qualifications: "",
    photo: "/rr/faculty-anubhav-kumar.jpeg",
  },
  { name: "Ramesh Kumar", designation: "Senior Teacher", department: "Mathematics", qualifications: "M.Sc., B.Ed.", photo: avatar("Ramesh Kumar") },
  { name: "Sunita Devi", designation: "Teacher", department: "Hindi", qualifications: "M.A. (Hindi), B.Ed.", photo: avatar("Sunita Devi") },
  { name: "Amit Kumar", designation: "Teacher", department: "Science", qualifications: "M.Sc., B.Ed.", photo: avatar("Amit Kumar") },
  { name: "Pooja Kumari", designation: "Teacher", department: "English", qualifications: "M.A. (English), B.Ed.", photo: avatar("Pooja Kumari") },
  { name: "Saurabh Jha", designation: "Computer Teacher", department: "Computer", qualifications: "MCA", photo: avatar("Saurabh Jha") },
];

export type GalleryImage = {
  url: string;
  alt: string;
  category: "events" | "campus" | "sports" | "academics" | "cultural";
};

// Real RR International photos (from the school's Facebook page).
export const gallery: GalleryImage[] = [
  { url: "/rr/classroom.jpg", alt: "Bright, colourful pre-primary classroom", category: "campus" },
  { url: "/rr/classroom-2.jpg", alt: "Colourful classroom with alphabet charts", category: "campus" },
  { url: "/rr/students-group.jpg", alt: "Students at a school celebration", category: "events" },
  { url: "/rr/student-uniform.jpg", alt: "Young student in RR International uniform", category: "campus" },
  { url: "/rr/class-session.jpg", alt: "Students in a class session", category: "academics" },
  { url: "/rr/bihar-diwas.jpg", alt: "Students at the Bihar Diwas awareness rally", category: "events" },
  { url: "/rr/ambedkar-jayanti.jpg", alt: "Ambedkar Jayanti observed at school", category: "events" },
  { url: "/rr/event-1.jpg", alt: "School function on campus", category: "events" },
  { url: "/rr/event-2.jpg", alt: "Students and staff at a school programme", category: "events" },
  { url: "/rr/entrance-coaching.jpg", alt: "Entrance-exam coaching batches at RR International", category: "academics" },
  { url: "/rr/banner.jpg", alt: "RR International School — admissions open, Nursery to Class 10", category: "campus" },
  { url: "/rr/banner-admission.jpg", alt: "RR International School & Hostel — Admission Open", category: "campus" },
];

export const academics = {
  streams: [
    { name: "Pre-Primary", classes: "Nursery – UKG", note: "Play-based, activity-led foundation." },
    { name: "Primary", classes: "Grades I – V", note: "Strong literacy and numeracy with experiential learning." },
    { name: "Middle School", classes: "Grades VI – VIII", note: "Concept-driven learning across the sciences and humanities." },
    { name: "Secondary", classes: "Grades IX – X", note: "CBSE board preparation with skill subjects." },
    { name: "Senior Secondary", classes: "Grades XI – XII", note: "Science, Commerce and Humanities streams." },
  ],
  results: [
    { exam: "Class XII (CBSE)", pass: "100%", distinction: "62%" },
    { exam: "Class X (CBSE)", pass: "100%", distinction: "71%" },
  ],
};

export const admissions = {
  steps: [
    { title: "Enquiry & Registration", detail: "Collect and submit the registration form with required documents." },
    { title: "Interaction", detail: "An informal interaction with the child and parents." },
    { title: "Assessment", detail: "A grade-appropriate assessment (Grade II and above)." },
    { title: "Offer & Admission", detail: "Confirmation of admission and fee payment to secure the seat." },
  ],
  fees: [
    { grade: "Nursery – UKG", admission: "₹25,000", annual: "₹48,000" },
    { grade: "Grades I – V", admission: "₹30,000", annual: "₹56,000" },
    { grade: "Grades VI – VIII", admission: "₹30,000", annual: "₹64,000" },
    { grade: "Grades IX – X", admission: "₹35,000", annual: "₹72,000" },
    { grade: "Grades XI – XII", admission: "₹40,000", annual: "₹84,000" },
  ],
  checklist: [
    "Birth certificate (photocopy)",
    "Transfer certificate from previous school",
    "Report card of the last class attended",
    "Aadhaar card of the student",
    "Four recent passport-size photographs",
    "Address proof of parent/guardian",
  ],
};

export const aboutContent = {
  intro: "Founded in 1998, Greenfield International School has grown into one of the region's most respected institutions, blending academic rigour with a deep commitment to character and creativity.",
  mission: "To provide a nurturing, inclusive environment that empowers every student to become a confident, compassionate and capable lifelong learner.",
  vision: "To be a centre of excellence that shapes responsible global citizens grounded in Indian values.",
  values: ["Integrity", "Respect", "Curiosity", "Compassion", "Excellence"],
  infrastructure: [
    "Smart classrooms with interactive boards",
    "Science, computer and robotics laboratories",
    "Well-stocked library and reading rooms",
    "Sports complex with indoor and outdoor facilities",
    "Auditorium, music and dance studios",
    "Safe, GPS-enabled transport fleet",
  ],
};
