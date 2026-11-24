/* 
  LPU Lost & Found System
  Made by: [Your Name], Reg No: [Your Reg No], Section: [Section]
  File: data.js (Sample data and initial setup)
*/

// sample items list to show on first load if localStorage is empty
var initialItems = [
  {
    id: "item-1",
    title: "Blue LPU Student ID Card",
    type: "Lost",
    category: "ID card",
    location: "Uni Mall",
    date: "2026-10-17",
    description: "Lost my blue LPU student identity card with orange lanyard near the food stalls on the ground floor of Uni Mall. Registration number ends with 4582. Very urgent as examinations are starting soon!",
    contactName: "Aman Sharma",
    contactInfo: "9876543210 (aman.122@lpu.in)",
    regNo: "12214582",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23f46a06'/><rect x='20' y='20' width='360' height='220' rx='12' fill='%23ffffff'/><rect x='20' y='20' width='360' height='50' rx='12' fill='%23222222'/><text x='40' y='52' fill='%23ffffff' font-family='Arial' font-size='18' font-weight='bold'>LOVELY PROFESSIONAL UNIVERSITY</text><rect x='45' y='90' width='80' height='95' fill='%23e0e0e0' rx='6'/><circle cx='85' cy='125' r='22' fill='%239e9e9e'/><path d='M65 170 C65 150 105 150 105 170' fill='%239e9e9e'/><text x='145' y='110' fill='%23333333' font-family='Arial' font-size='16' font-weight='bold'>STUDENT IDENTITY CARD</text><text x='145' y='135' fill='%23666666' font-family='Arial' font-size='13'>Name: Aman Sharma</text><text x='145' y='155' fill='%23666666' font-family='Arial' font-size='13'>Reg No: 12214582</text><text x='145' y='175' fill='%23666666' font-family='Arial' font-size='13'>Dept: B.Tech CSE</text><rect x='45' y='205' width='310' height='12' fill='%23e85d04' rx='4'/></svg>",
    claims: []
  },
  {
    id: "item-2",
    title: "Black HP 65W Laptop Charger",
    type: "Found",
    category: "Laptop/Charger",
    location: "Block 34",
    date: "2026-10-18",
    description: "Found an original HP 65 Watt barrel-pin smart AC power adapter in room 304 of Block 34 on the last row desk. Has a small piece of blue tape on the cord.",
    contactName: "Rohit Kumar",
    contactInfo: "9812345678 (rohit.k@lpu.in)",
    regNo: "12209123",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23e9ecef'/><rect x='80' y='70' width='160' height='110' rx='14' fill='%23212529'/><circle cx='160' cy='125' r='28' fill='%23343a40'/><text x='147' y='134' fill='%23ffffff' font-family='Arial' font-size='22' font-weight='bold'>hp</text><path d='M240 125 C300 125 310 170 340 170' stroke='%23495057' stroke-width='8' fill='none' stroke-linecap='round'/><rect x='340' y='163' width='25' height='14' rx='3' fill='%230d6efd'/><rect x='365' y='167' width='15' height='6' fill='%23adb5bd'/><path d='M80 125 C40 125 40 80 20 80' stroke='%23495057' stroke-width='6' fill='none'/><text x='110' y='220' fill='%23495057' font-family='Arial' font-size='14' font-weight='bold'>HP 65W LAPTOP CHARGER</text></svg>",
    claims: []
  },
  {
    id: "item-3",
    title: "Casio FX-991EX Scientific Calculator",
    type: "Lost",
    category: "Books",
    location: "Block 38",
    date: "2026-10-16",
    description: "Left my Casio ClassWiz calculator in Block 38 computer lab 202. The back protective slide cover has a small yellow sticker.",
    contactName: "Priya Verma",
    contactInfo: "9898989898 (priya.v@lpu.in)",
    regNo: "12208911",
    status: "Claim Pending",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23f1f3f5'/><rect x='130' y='25' width='140' height='210' rx='16' fill='%23212529'/><rect x='145' y='45' width='110' height='45' rx='6' fill='%239ec5ab'/><text x='155' y='75' fill='%230f381e' font-family='Courier New' font-size='20' font-weight='bold'>0.00000</text><g fill='%23495057'><rect x='145' y='105' width='20' height='14' rx='3'/><rect x='175' y='105' width='20' height='14' rx='3'/><rect x='205' y='105' width='20' height='14' rx='3'/><rect x='235' y='105' width='20' height='14' rx='3'/><rect x='145' y='130' width='20' height='14' rx='3'/><rect x='175' y='130' width='20' height='14' rx='3'/><rect x='205' y='130' width='20' height='14' rx='3'/><rect x='235' y='130' width='20' height='14' rx='3'/><rect x='145' y='155' width='20' height='14' rx='3'/><rect x='175' y='155' width='20' height='14' rx='3'/><rect x='205' y='155' width='20' height='14' rx='3'/><rect x='235' y='155' width='20' height='14' rx='3'/><rect x='145' y='180' width='50' height='18' rx='3' fill='%23e85d04'/><rect x='205' y='180' width='50' height='18' rx='3' fill='%230d6efd'/></g><text x='150' y='220' fill='%23adb5bd' font-family='Arial' font-size='10'>CASIO fx-991EX</text></svg>",
    claims: [
      {
        claimantName: "Priya Verma",
        claimantReg: "12208911",
        claimantPhone: "9898989898",
        proofText: "It has a yellow cartoon sticker on the back battery slot and my initials P.V. scribbled inside the cover with a marker.",
        claimDate: "2026-10-17",
        status: "Pending"
      }
    ]
  },
  {
    id: "item-4",
    title: "Milton Stainless Steel Water Bottle",
    type: "Found",
    category: "Bottle",
    location: "Food Court",
    date: "2026-10-18",
    description: "Found a silver Milton Thermosteel 1000ml flask on table number 12 near Domino's in Food Court 3. It is silver colored with a black cap.",
    contactName: "Simran Kaur",
    contactInfo: "9776541230",
    regNo: "12215674",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23e8f4f8'/><rect x='160' y='55' width='80' height='165' rx='18' fill='%23ced4da'/><rect x='170' y='70' width='60' height='140' rx='10' fill='%23e9ecef'/><rect x='175' y='32' width='50' height='25' rx='6' fill='%23343a40'/><rect x='185' y='20' width='30' height='14' rx='3' fill='%23e85d04'/><text x='178' y='145' fill='%236c757d' font-family='Arial' font-size='12' font-weight='bold' transform='rotate(-90 178 145)'>MILTON 1000ml</text></svg>",
    claims: []
  },
  {
    id: "item-5",
    title: "Apple AirPods in White Case",
    type: "Lost",
    category: "Phone",
    location: "Library",
    date: "2026-10-15",
    description: "Lost my Apple AirPods 2nd generation in a white charging case. Probably slipped from my pocket while sitting in the 3rd floor silent reading hall.",
    contactName: "Rahul Singhania",
    contactInfo: "9988776655 (rahul.s@lpu.in)",
    regNo: "12204432",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23f8f9fa'/><rect x='140' y='65' width='120' height='135' rx='34' fill='%23ffffff' stroke='%23dee2e6' stroke-width='4'/><line x1='140' y1='105' x2='260' y2='105' stroke='%23e9ecef' stroke-width='2'/><circle cx='200' cy='125' r='4' fill='%2320c997'/><rect x='185' y='194' width='30' height='5' rx='2' fill='%23ced4da'/><text x='150' y='225' fill='%236c757d' font-family='Arial' font-size='13' font-weight='bold'>APPLE AIRPODS CASE</text></svg>",
    claims: []
  },
  {
    id: "item-6",
    title: "Noise ColorFit Pulse Smartwatch",
    type: "Found",
    category: "Other",
    location: "Unipolis",
    date: "2026-10-14",
    description: "Found a black rectangular dial smartwatch with silicone strap near the stage stairs in Unipolis during the evening dance rehearsal.",
    contactName: "Ankit Patel",
    contactInfo: "9876501234 (ankit.p@lpu.in)",
    regNo: "12217890",
    status: "Verified",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23e9ecef'/><rect x='180' y='20' width='40' height='220' rx='8' fill='%23343a40'/><rect x='150' y='75' width='100' height='110' rx='18' fill='%23212529'/><rect x='160' y='85' width='80' height='90' rx='10' fill='%23111827'/><text x='170' y='130' fill='%2300f2fe' font-family='Arial' font-size='20' font-weight='bold'>10:42</text><text x='175' y='150' fill='%23ff7b00' font-family='Arial' font-size='11'>8,450 steps</text></svg>",
    claims: [
      {
        claimantName: "Kunal Jain",
        claimantReg: "12205561",
        claimantPhone: "9876509999",
        proofText: "The watch wallpaper is an anime Goku photo and the lock screen PIN is 1420.",
        claimDate: "2026-10-15",
        status: "Verified"
      }
    ]
  },
  {
    id: "item-7",
    title: "Brown WildHorn Leather Wallet",
    type: "Lost",
    category: "Wallet",
    location: "Ground",
    date: "2026-10-12",
    description: "Brown bi-fold leather wallet lost near Cricket ground pavilion. Contains my hostel gate pass, Punjab National Bank debit card and around 400 cash.",
    contactName: "Vikas Mehra",
    contactInfo: "9811223344",
    regNo: "12211223",
    status: "Returned",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23fbf5ef'/><rect x='110' y='60' width='180' height='130' rx='14' fill='%2378350f'/><rect x='120' y='70' width='160' height='110' rx='8' fill='%2392400e'/><path d='M230 110 L290 110 L290 145 L230 145 Z' fill='%2378350f'/><circle cx='250' cy='128' r='6' fill='%23d97706'/><text x='135' y='130' fill='%23fbbf24' font-family='Arial' font-size='14' font-weight='bold'>WILDHORN</text><text x='140' y='220' fill='%2378350f' font-family='Arial' font-size='13' font-weight='bold'>LEATHER WALLET</text></svg>",
    claims: [
      {
        claimantName: "Vikas Mehra",
        claimantReg: "12211223",
        claimantPhone: "9811223344",
        proofText: "Had my PNB ATM card ending in 7102 and a passport size photograph of my family.",
        claimDate: "2026-10-13",
        status: "Approved"
      }
    ]
  },
  {
    id: "item-8",
    title: "Blue Skybags College Backpack",
    type: "Found",
    category: "Books",
    location: "Hostel",
    date: "2026-10-18",
    description: "Skybags blue and grey backpack left in Boys Hostel BH-4 TV Room. Has 3 spiral notebooks of Engineering Mathematics and Physics.",
    contactName: "Harpreet Singh (Warden Office)",
    contactInfo: "9800112233",
    regNo: "BH4-STAFF",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23e0f2fe'/><path d='M130 90 Q200 40 270 90 L280 210 Q200 220 120 210 Z' fill='%230284c7'/><path d='M150 120 Q200 90 250 120 L255 195 Q200 205 145 195 Z' fill='%2338bdf8'/><rect x='170' y='145' width='60' height='35' rx='6' fill='%230369a1'/><text x='180' y='167' fill='%23ffffff' font-family='Arial' font-size='11' font-weight='bold'>Skybags</text></svg>",
    claims: []
  },
  {
    id: "item-9",
    title: "Honda Scooter Key with Marvel Keychain",
    type: "Lost",
    category: "Keys",
    location: "Block 32",
    date: "2026-10-17",
    description: "Lost my Honda Activa black ignition key with an Iron Man rubber keychain in the parking area outside Block 32.",
    contactName: "Sahil Gupta",
    contactInfo: "9765432109",
    regNo: "12213456",
    status: "Open",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23fef2f2'/><circle cx='150' cy='110' r='30' fill='none' stroke='%2364748b' stroke-width='8'/><rect x='175' y='105' width='90' height='12' fill='%2394a3b8'/><polygon points='265,105 295,111 265,117' fill='%2394a3b8'/><rect x='210' y='117' width='12' height='10' fill='%2394a3b8'/><rect x='240' y='117' width='10' height='8' fill='%2394a3b8'/><circle cx='110' cy='160' r='26' fill='%23dc2626'/><circle cx='110' cy='160' r='18' fill='%23fbbf24'/><text x='104' y='166' fill='%237f1d1d' font-family='Arial' font-size='16' font-weight='bold'>A</text><line x1='135' y1='125' x2='120' y2='140' stroke='%23475569' stroke-width='4'/></svg>",
    claims: []
  },
  {
    id: "item-10",
    title: "Fastrack Rectangle Specs in Black Case",
    type: "Found",
    category: "Other",
    location: "Library",
    date: "2026-10-13",
    description: "Black matte frame prescription spectacles in a hard black Fastrack case. Found on study table 18 in Central Library Ground Floor.",
    contactName: "Library Help Desk",
    contactInfo: "01824-517000",
    regNo: "LIB-STAFF",
    status: "Returned",
    approved: true,
    image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='%23f3f4f6'/><rect x='90' y='80' width='220' height='85' rx='30' fill='%231f2937'/><rect x='100' y='90' width='200' height='65' rx='20' fill='%23111827'/><text x='160' y='130' fill='%239ca3af' font-family='Arial' font-size='16' font-weight='bold'>FASTRACK</text><circle cx='145' cy='200' r='20' fill='none' stroke='%23374151' stroke-width='4'/><circle cx='255' cy='200' r='20' fill='none' stroke='%23374151' stroke-width='4'/><line x1='165' y1='200' x2='235' y2='200' stroke='%23374151' stroke-width='4'/></svg>",
    claims: [
      {
        claimantName: "Mohit Bansal",
        claimantReg: "12203112",
        claimantPhone: "9812981298",
        proofText: "Spectacle prescription is -1.5 in both eyes, has black and green inner temples.",
        claimDate: "2026-10-14",
        status: "Approved"
      }
    ]
  }
];

// initial notifications list
var initialNotifications = [
  {
    id: "notif-1",
    title: "New Claim Received",
    message: "Priya Verma submitted a claim for Casio Calculator in Block 38.",
    time: "10 mins ago",
    read: false
  },
  {
    id: "notif-2",
    title: "Item Returned Successfully",
    message: "Brown WildHorn Leather Wallet was marked as returned to owner.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "notif-3",
    title: "New Item Posted",
    message: "Milton Stainless Steel Water Bottle found at Food Court was posted.",
    time: "Yesterday",
    read: true
  }
];

// this function initializes data in localStorage if it doesn't exist
function initData() {
  if (!localStorage.getItem("lpu_items")) {
    localStorage.setItem("lpu_items", JSON.stringify(initialItems));
  }
  if (!localStorage.getItem("lpu_notifications")) {
    localStorage.setItem("lpu_notifications", JSON.stringify(initialNotifications));
  }
}

// run initData on file load
initData();
