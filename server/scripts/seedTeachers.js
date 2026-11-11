import dotenv from 'dotenv';
dotenv.config();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const UNIVERSITY_ID = '41735a0e-95b5-40f9-a25b-24355a1e4e08';
const DEPARTMENT_ID = '34eb3eee-3205-4b68-80af-47f75f5ca344';

const teachers = [
  {
    full_name: "Mahbubul Alam Majumdar, PhD",
    designation: "Professor and Dean, School of Data & Computational Sciences",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2023/05/12/mahbub%20HEIC%20picture%20Oct%2023.png?itok=YVwdPR7m",
    profile_url: "https://www.bracu.ac.bd/about/people/mahbubul-alam-majumdar-phd",
    research_interests: ["Quantum Computing", "Theoretical Physics", "High-Performance Computing"],
    is_featured: true
  },
  {
    full_name: "Sadia Hamid Kazi, PhD",
    designation: "Associate Professor and Chairperson",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2022/12/01/Sadia%20Hamid%20Kazi.jpeg?itok=ScWyIZjh",
    profile_url: "https://www.bracu.ac.bd/about/people/sadia-hamid-kazi-phd",
    research_interests: ["Health Informatics", "Data Mining", "Human-Computer Interaction"],
    is_featured: true
  },
  {
    full_name: "Mohammad Kaykobad, PhD",
    designation: "Distinguished Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Professor%20Kaykobad.png?itok=c3TY77mu",
    profile_url: "https://www.bracu.ac.bd/about/people/mohammad-kaykobad-phd",
    research_interests: ["Algorithms", "Graph Theory", "Competitive Programming"],
    is_featured: true
  },
  {
    full_name: "Matin Saad Abdullah, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Mr.%20Matin%20Saad%20Abdullah_0.jpg?itok=gi7nAyX-",
    profile_url: "https://www.bracu.ac.bd/about/people/matin-saad-abdullah-phd",
    research_interests: ["Distributed Systems", "Cloud Infrastructure", "Network Security"],
    is_featured: false
  },
  {
    full_name: "Professor Chowdhury Mofizur Rahman, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/03/26/Rahman.png?itok=LvEVz4ZY",
    profile_url: "https://www.bracu.ac.bd/about/people/professor-chowdhury-mofizur-rahman-phd",
    research_interests: ["Artificial Intelligence", "Machine Learning", "Pattern Recognition"],
    is_featured: false
  },
  {
    full_name: "Md. Khalilur Rahman, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/10/01/Khalilur%20Rahman%20CSE_0.jpg?itok=KtbhKvtX",
    profile_url: "https://www.bracu.ac.bd/about/people/md-khalilur-rahman-phd",
    research_interests: ["Robotics", "Embedded Systems", "Computer Vision"],
    is_featured: false
  },
  {
    full_name: "Md. Golam Rabiul Alam, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Md.%20Golam%20Rabiul%20Alam%20CSE.jpg?itok=Hdf2rKHx",
    profile_url: "https://www.bracu.ac.bd/about/people/md-golam-rabiul-alam-phd",
    research_interests: ["Edge Computing", "IoT Security", "Federated Learning"],
    is_featured: false
  },
  {
    full_name: "Amitabha Chakrabarty, PhD",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2023/03/07/Amitabha%20CSE.jpg?itok=2SfbzrZB",
    profile_url: "https://www.bracu.ac.bd/about/people/amitabha-chakrabarty-phd",
    research_interests: ["Wireless Sensor Networks", "Pervasive Computing", "Graph Algorithms"],
    is_featured: false
  },
  {
    full_name: "Md Sadek Ferdous, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MSFerdous.jpg?itok=rvbQqBWf",
    profile_url: "https://www.bracu.ac.bd/about/people/md-sadek-ferdous-phd",
    research_interests: ["Blockchain Technologies", "Cybersecurity", "Decentralized Identity"],
    is_featured: false
  },
  {
    full_name: "Swakkhar Shatabda, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/10/01/Swakkhar%20Satabda%20CSE.jpg?itok=E_t9yBbe",
    profile_url: "https://www.bracu.ac.bd/about/people/swakkhar-shatabda-phd",
    research_interests: ["Bioinformatics", "Combinatorial Optimization", "Structural Biology Computation"],
    is_featured: false
  },
  {
    full_name: "S M Taiabul Haque, PhD",
    designation: "Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/11/06/S%20M%20Taiabul%20Haque.jpg?itok=k2bdaASp",
    profile_url: "https://www.bracu.ac.bd/about/people/s-m-taiabul-haque-phd",
    research_interests: ["Data Analytics", "Information Retrieval", "Machine Learning"],
    is_featured: false
  },
  {
    full_name: "Muhammad Iqbal Hossain, PhD",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2025/09/14/Iqbal_CSE.png?itok=ZJqD73ix",
    profile_url: "https://www.bracu.ac.bd/about/people/muhammad-iqbal-hossain-phd",
    research_interests: ["Semiconductor Devices", "Micro-architectures", "VLSI"],
    is_featured: false
  },
  {
    full_name: "Muhammad Nur Yanhaona",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/12/24/Male_dummy_1.jpg?itok=LeV7E_Uv",
    profile_url: "https://www.bracu.ac.bd/about/people/muhammad-nur-yanhaona",
    research_interests: ["Sensor Networks", "Mobile Computing", "Cyber-Physical Systems"],
    is_featured: false
  },
  {
    full_name: "Abu Mohammad Khan, PhD",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/12/24/Male_dummy_0.jpg?itok=qRgJ7DlL",
    profile_url: "https://www.bracu.ac.bd/about/people/abu-mohammad-khan-phd",
    research_interests: ["Signal Processing", "Communication Systems"],
    is_featured: false
  },
  {
    full_name: "Md. Ashraful Alam, PhD",
    designation: "Assistant Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Dr.%20Md.%20Ashraful%20Alam.jpg?itok=47mrJbdV",
    profile_url: "https://www.bracu.ac.bd/about/people/md-ashraful-alam-phd",
    research_interests: ["Software Engineering", "Empirical Evaluation", "Code Analytics"],
    is_featured: false
  },
  {
    full_name: "Farig Yousuf Sadeque",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/10/01/Farig%20Yousuf%20Sadeque_CSE.jpg?itok=PWgjZf_Y",
    profile_url: "https://www.bracu.ac.bd/about/people/farig-yousuf-sadeque",
    research_interests: ["Natural Language Processing", "Computational Social Science", "Sentiment Analysis"],
    is_featured: false
  },
  {
    full_name: "Md. Sakir Hossain, PhD",
    designation: "Associate Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2025/08/03/Sakir%20Hossain.jpg?itok=YGfv4qEJ",
    profile_url: "https://www.bracu.ac.bd/about/people/md-sakir-hossain-phd",
    research_interests: ["Computer Vision", "Medical Imaging", "Deep Learning"],
    is_featured: false
  },
  {
    full_name: "Aniqua Nusrat Zereen, PhD",
    designation: "Assistant Professor",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2023/04/11/Ms.%20Aniqua%20Nusrat%20Zereen.png?itok=RSEBlXw-",
    profile_url: "https://www.bracu.ac.bd/about/people/aniqua-nusrat-zereen-phd",
    research_interests: ["Human Centered AI", "Usability Engineering", "Accessibility"],
    is_featured: false
  },
  {
    full_name: "Mr. Annajiat Alim Rasel",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Annajiat%20Alim%20Rasel_0.jpg?itok=lGosQHuS",
    profile_url: "https://www.bracu.ac.bd/about/people/mr-annajiat-alim-rasel",
    research_interests: ["Information Systems", "Educational Technology", "Open Source Software"],
    is_featured: false
  },
  {
    full_name: "Md. Tawhid Anwar",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2025/01/02/Tawhid_New%20Website.jpg?itok=zHjhilj6",
    profile_url: "https://www.bracu.ac.bd/about/people/md-tawhid-anwar",
    research_interests: ["Database Management", "Distributed Systems"],
    is_featured: false
  },
  {
    full_name: "Rubayat Ahmed Khan",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Rubayat%20Ahmed%20Khan.jpg?itok=Ec2svaAG",
    profile_url: "https://www.bracu.ac.bd/about/people/rubayat-ahmed-khan",
    research_interests: ["Applied Machine Learning", "Data Mining"],
    is_featured: false
  },
  {
    full_name: "Md.Saiful Islam",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MR.MD_.SAIFUL%20ISLAM%20%5B8841%5D.JPG?itok=YZKxb_jX",
    profile_url: "https://www.bracu.ac.bd/about/people/mdsaiful-islam",
    research_interests: ["Cyber Security", "Network Protocols"],
    is_featured: false
  },
  {
    full_name: "Sifat E Jahan",
    designation: "Senior Lecturer (Study Leave)",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/SIFAT.%20F.%20JAHAN.jpg?itok=Q0U87cJQ",
    profile_url: "https://www.bracu.ac.bd/about/people/sifat-e-jahan",
    research_interests: ["Computer Vision", "Deep Learning"],
    is_featured: false
  },
  {
    full_name: "Moin Mostakim",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/06/14/Male_dummy.jpg?itok=0hIiip8J",
    profile_url: "https://www.bracu.ac.bd/about/people/moin-mostakim",
    research_interests: ["Artificial Intelligence", "Algorithms"],
    is_featured: false
  },
  {
    full_name: "A.M. Esfar-E-Alam",
    designation: "Senior Lecturer (study leave)",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/12/24/Male_dummy_4.jpg?itok=nNRE1JxG",
    profile_url: "https://www.bracu.ac.bd/about/people/am-esfar-e-alam",
    research_interests: ["Machine Learning", "Optimization"],
    is_featured: false
  },
  {
    full_name: "Md. Imran Bin Azad",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2026/10/01/Imran%20Bin%20Azad%20CSE.jpg?itok=YbwYkXal",
    profile_url: "https://www.bracu.ac.bd/about/people/md-imran-bin-azad",
    research_interests: ["Distributed Computing", "Cloud Storage"],
    is_featured: false
  },
  {
    full_name: "Mehnaz Seraj",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MS.MEHNAZ%20SERAJ.jpg?itok=ntvR5RWY",
    profile_url: "https://www.bracu.ac.bd/about/people/mehnaz-seraj",
    research_interests: ["Software Quality", "Agile Methodologies"],
    is_featured: false
  },
  {
    full_name: "Shakila Zaman",
    designation: "Senior Lecturer (study leave)",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MS.SHAKILA%20ZAMAN.jpg?itok=ia4HbMxZ",
    profile_url: "https://www.bracu.ac.bd/about/people/shakila-zaman",
    research_interests: ["Human Centered Computing", "Data Science"],
    is_featured: false
  },
  {
    full_name: "Mohammed Abid Abrar",
    designation: "Senior Lecturer (study leave)",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/2024/12/24/Male_dummy_5.jpg?itok=UMVDWXoD",
    profile_url: "https://www.bracu.ac.bd/about/people/mohammed-abid-abrar",
    research_interests: ["Reinforcement Learning", "Autonomous Systems"],
    is_featured: false
  },
  {
    full_name: "Najeefa Nikhat Choudhury",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MS.NAJEEFA%20NIKHAT%20CHOUDHURY.jpg?itok=zYjqwXz5",
    profile_url: "https://www.bracu.ac.bd/about/people/najeefa-nikhat-choudhury",
    research_interests: ["Artificial Intelligence", "Bioinformatics"],
    is_featured: false
  },
  {
    full_name: "Dewan Ziaul Karim",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/Dewan%20Ziaul%20Karim%20CSE.jpg?itok=jYTxbnEc",
    profile_url: "https://www.bracu.ac.bd/about/people/dewan-ziaul-karim",
    research_interests: ["Computer Networks", "Cyber Security"],
    is_featured: false
  },
  {
    full_name: "Mahrin Tasfe",
    designation: "Senior Lecturer",
    image_url: "https://www.bracu.ac.bd/sites/default/files/styles/faculty_grid_image/public/faculty-images/MS.%20MAHRIN%20TASFE.JPG?itok=-zhXPRpN",
    profile_url: "https://www.bracu.ac.bd/about/people/mahrin-tasfe",
    research_interests: ["Algorithm Design", "Computational Complexity"],
    is_featured: false
  }
];

async function seed() {
  console.log(`Starting insertion of ${teachers.length} faculty profiles into Supabase...`);

  // First clear any previous sample entries
  const delRes = await fetch(`${url}/rest/v1/researcher_profiles?source=eq.sample_directory`, {
    method: 'DELETE',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  console.log('Sample directory cleanup status:', delRes.status);

  const payload = teachers.map((t) => ({
    full_name: t.full_name,
    designation: t.designation,
    bio: `Faculty member in Department of Computer Science and Engineering, BRAC University. Specialized in ${t.research_interests.join(', ')}.`,
    research_interests: t.research_interests,
    university_id: UNIVERSITY_ID,
    department_id: DEPARTMENT_ID,
    profile_url: t.profile_url,
    image_url: t.image_url,
    status: 'approved',
    is_featured: t.is_featured,
    source: 'bracu_directory'
  }));

  const res = await fetch(`${url}/rest/v1/researcher_profiles`, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Insert error status:', res.status, errorText);
  } else {
    const inserted = await res.json();
    console.log(`SUCCESS! Inserted ${inserted.length} faculty members into Supabase researcher_profiles table!`);
  }
}

seed();
