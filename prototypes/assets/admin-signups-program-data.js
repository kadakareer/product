/* ==========================================================================
   KadaKareer Admin — program signups mock data
   Consolidated participant records (including attendance and submissions)
   ========================================================================== */

const participantsData = [
  {
    id: 'r1',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    school: 'University of the Philippines Diliman',
    course: 'BS Computer Science',
    location: 'Quezon City, Metro Manila',
    status: 'completed',
    createdAt: { date: 'Dec 15, 2025', time: '11:30 AM' },
    updatedAt: { date: 'Dec 15, 2025', time: '11:30 AM' },
    attendance: { single: true, days: [true, true, false, true, false, true, true] },
    submissions: [true, true, false]
  },
  {
    id: 'r2',
    name: 'Christian Perez',
    email: 'christian.perez@email.com',
    school: 'De La Salle University',
    course: 'BS Information Technology',
    location: 'Manila, Metro Manila',
    status: 'dropped-out',
    createdAt: { date: 'Nov 15, 2025', time: '11:00 AM' },
    updatedAt: { date: 'Nov 16, 2025', time: '03:45 PM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'interested', admin: 'christian.perez@email.com', date: 'Nov 15, 2025', time: '11:00 AM' },
      { status: 'dropped-out', admin: 'jonas.reyes@kadakareer.com', date: 'Nov 16, 2025', time: '03:45 PM' }
    ]
  },
  {
    id: 'r3',
    name: 'Emily Chen',
    email: 'emily.chen@outlook.com',
    school: 'Ateneo de Manila University',
    course: 'BS Management Information Systems',
    location: 'Quezon City, Metro Manila',
    status: 'completed',
    createdAt: { date: 'Dec 10, 2025', time: '02:20 PM' },
    updatedAt: { date: 'Dec 10, 2025', time: '02:20 PM' },
    attendance: { single: true, days: [true, true, true, true, true, true, true] },
    submissions: [true, true, true]
  },
  {
    id: 'r4',
    name: 'Michael Brown',
    email: 'michael.brown@gmail.com',
    school: 'Mapúa University',
    course: 'BS Software Engineering',
    location: 'Intramuros, Manila',
    status: 'interested',
    createdAt: { date: 'Dec 08, 2025', time: '10:45 AM' },
    updatedAt: { date: 'Dec 09, 2025', time: '11:00 AM' },
    attendance: { single: true, days: [false, true, true, false, true, true, false] },
    submissions: [false, true, true]
  },
  {
    id: 'r5',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    school: 'Polytechnic University of the Philippines',
    course: 'BS Computer Engineering',
    location: 'Sta. Mesa, Manila',
    status: 'approved',
    createdAt: { date: 'Dec 05, 2025', time: '08:30 AM' },
    updatedAt: { date: 'Dec 05, 2025', time: '08:30 AM' },
    attendance: { single: false, days: [false, false, true, false, false, true, false] },
    submissions: [false, false, false]
  },
  {
    id: 'r6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    school: 'University of Santo Tomas',
    course: 'BS Information Systems',
    location: 'Sampaloc, Manila',
    status: 'completed',
    createdAt: { date: 'Dec 02, 2025', time: '11:15 AM' },
    updatedAt: { date: 'Dec 03, 2025', time: '02:45 PM' },
    attendance: { single: true, days: [true, false, true, true, false, true, true] },
    submissions: [true, true, false],
    history: [
      { status: 'interested', admin: 'lisa.thompson@email.com', date: 'Dec 02, 2025', time: '11:15 AM' },
      { status: 'applied', admin: 'lisa.thompson@email.com', date: 'Dec 02, 2025', time: '04:50 PM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 03, 2025', time: '09:10 AM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 03, 2025', time: '09:10 AM' },
      { status: 'completed', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 03, 2025', time: '02:45 PM' }
    ]
  },
  {
    id: 'r7',
    name: 'David Kim',
    email: 'david.kim@outlook.com',
    school: 'Far Eastern University',
    course: 'BS Computer Science',
    location: 'Manila, Metro Manila',
    status: 'interested',
    createdAt: { date: 'Nov 28, 2025', time: '09:20 AM' },
    updatedAt: { date: 'Nov 28, 2025', time: '09:20 AM' },
    attendance: { single: true, days: [true, true, false, true, true, false, false] },
    submissions: [true, false, true]
  },
  {
    id: 'r8',
    name: 'Rachel Patel',
    email: 'rachel.patel@gmail.com',
    school: 'Technological Institute of the Philippines',
    course: 'BS Information Technology',
    location: 'Cubao, Quezon City',
    status: 'completed',
    createdAt: { date: 'Nov 25, 2025', time: '04:10 PM' },
    updatedAt: { date: 'Nov 26, 2025', time: '10:00 AM' },
    attendance: { single: false, days: [true, false, false, false, true, false, true] },
    submissions: [false, false, true],
    history: [
      { status: 'applied', admin: 'rachel.patel@gmail.com', date: 'Nov 25, 2025', time: '04:10 PM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Nov 25, 2025', time: '06:30 PM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Nov 25, 2025', time: '06:30 PM' },
      { status: 'completed', admin: 'maria.cruz@kadakareer.com', date: 'Nov 26, 2025', time: '10:00 AM' }
    ]
  },
  {
    id: 'r9',
    name: 'Kevin Santos',
    email: 'kevin.santos@gmail.com',
    school: 'Adamson University',
    course: 'BS Computer Engineering',
    location: 'Ermita, Manila',
    status: 'applied',
    createdAt: { date: 'Nov 22, 2025', time: '02:10 PM' },
    updatedAt: { date: 'Nov 22, 2025', time: '02:10 PM' },
    attendance: { single: true, days: [true, true, true, true, true, true, true] },
    submissions: [true, true, true]
  },
  {
    id: 'r10',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    school: 'National University',
    course: 'BS Data Science',
    location: 'Manila, Metro Manila',
    status: 'interested',
    createdAt: { date: 'Nov 18, 2025', time: '10:00 AM' },
    updatedAt: { date: 'Nov 18, 2025', time: '10:00 AM' },
    attendance: { single: false, days: [false, true, false, false, true, false, false] },
    submissions: [false, true, false]
  },
  {
    id: 'r11',
    name: 'James Wilson',
    email: 'james.wilson@gmail.com',
    school: 'University of the East',
    course: 'BS Information Technology',
    location: 'Caloocan City, Metro Manila',
    status: 'approved',
    createdAt: { date: 'Dec 12, 2025', time: '09:15 AM' },
    updatedAt: { date: 'Dec 12, 2025', time: '04:30 PM' },
    attendance: { single: false, days: [true, false, false, true, false, false, true] },
    submissions: [true, false, false],
    history: [
      { status: 'applied', admin: 'james.wilson@gmail.com', date: 'Dec 12, 2025', time: '09:15 AM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 12, 2025', time: '04:30 PM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 12, 2025', time: '04:30 PM' }
    ]
  },
  {
    id: 'r12',
    name: 'Nathan Cruz',
    email: 'nathan.cruz@gmail.com',
    school: 'University of Makati',
    course: 'BS Computer Science',
    location: 'Makati City, Metro Manila',
    status: 'rejected',
    rejectReason: 'Did not meet the minimum year-level requirement for this program',
    createdAt: { date: 'Dec 20, 2025', time: '01:40 PM' },
    updatedAt: { date: 'Dec 21, 2025', time: '09:05 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'nathan.cruz@gmail.com', date: 'Dec 20, 2025', time: '01:40 PM' },
      { status: 'rejected', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 21, 2025', time: '09:05 AM' },
      { type: 'email', label: 'Rejection email sent', admin: 'System', date: 'Dec 21, 2025', time: '09:05 AM' }
    ]
  },
  {
    id: 'r13',
    name: 'Camille Bautista',
    email: 'camille.bautista@gmail.com',
    school: 'University of San Carlos',
    course: 'BS Information Technology',
    location: 'Cebu City, Cebu',
    status: 'rejected',
    rejectReason: 'Program is limited to Metro Manila-based applicants for this cohort',
    createdAt: { date: 'Dec 18, 2025', time: '10:05 AM' },
    updatedAt: { date: 'Dec 19, 2025', time: '11:20 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'interested', admin: 'camille.bautista@gmail.com', date: 'Dec 18, 2025', time: '10:05 AM' },
      { status: 'applied', admin: 'camille.bautista@gmail.com', date: 'Dec 18, 2025', time: '02:30 PM' },
      { status: 'rejected', admin: 'maria.cruz@kadakareer.com', date: 'Dec 19, 2025', time: '11:20 AM' },
      { type: 'email', label: 'Rejection email sent', admin: 'System', date: 'Dec 19, 2025', time: '11:20 AM' }
    ]
  },
  {
    id: 'r14',
    name: 'Marco Villanueva',
    email: 'marco.villanueva@outlook.com',
    school: 'Bulacan State University',
    course: 'BS Computer Engineering',
    location: 'Malolos, Bulacan',
    status: 'rejected',
    rejectReason: 'Incomplete sign-up form — missing resume attachment',
    createdAt: { date: 'Dec 14, 2025', time: '03:50 PM' },
    updatedAt: { date: 'Dec 15, 2025', time: '09:40 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'marco.villanueva@outlook.com', date: 'Dec 14, 2025', time: '03:50 PM' },
      { status: 'rejected', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 15, 2025', time: '09:40 AM' },
      { type: 'email', label: 'Rejection email sent', admin: 'System', date: 'Dec 15, 2025', time: '09:40 AM' }
    ]
  },
  {
    id: 'r15',
    name: 'Angela Reyes',
    email: 'angela.reyes@email.com',
    school: 'Cavite State University',
    course: 'BS Information Systems',
    location: 'Indang, Cavite',
    status: 'rejected',
    rejectReason: 'Duplicate application — already enrolled in a concurrent cohort',
    createdAt: { date: 'Dec 09, 2025', time: '01:10 PM' },
    updatedAt: { date: 'Dec 10, 2025', time: '08:55 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'interested', admin: 'angela.reyes@email.com', date: 'Dec 09, 2025', time: '01:10 PM' },
      { status: 'applied', admin: 'angela.reyes@email.com', date: 'Dec 09, 2025', time: '01:15 PM' },
      { status: 'rejected', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 10, 2025', time: '08:55 AM' },
      { type: 'email', label: 'Rejection email sent', admin: 'System', date: 'Dec 10, 2025', time: '08:55 AM' }
    ]
  },
  {
    id: 'r16',
    name: 'Patrick Aquino',
    email: 'patrick.aquino@gmail.com',
    school: 'Batangas State University',
    course: 'BS Computer Science',
    location: 'Batangas City, Batangas',
    status: 'rejected',
    rejectReason: 'Did not pass the technical screening questions on the sign-up form',
    createdAt: { date: 'Nov 30, 2025', time: '09:25 AM' },
    updatedAt: { date: 'Dec 01, 2025', time: '02:15 PM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'patrick.aquino@gmail.com', date: 'Nov 30, 2025', time: '09:25 AM' },
      { status: 'rejected', admin: 'maria.cruz@kadakareer.com', date: 'Dec 01, 2025', time: '02:15 PM' },
      { type: 'email', label: 'Rejection email sent', admin: 'System', date: 'Dec 01, 2025', time: '02:15 PM' }
    ]
  }
];

// Generate the lookup maps dynamically to maintain compatibility with the UI controllers
const attendanceData = {};
const submissionsData = {};

participantsData.forEach(p => {
  attendanceData[p.id] = p.attendance;
  submissionsData[p.id] = p.submissions;
});
