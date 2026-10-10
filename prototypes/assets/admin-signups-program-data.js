/* ==========================================================================
   KadaKareer Admin — program signups mock data
   Consolidated participant records (including attendance and submissions)

   Demo data represents the first phase of a program: still recruiting
   and reviewing applications, so there's no Rejected, Completed, or
   Dropped-out yet — those only make sense once decisions have been made
   and the program has actually started running.
   ========================================================================== */

const participantsData = [
  {
    id: 'r1',
    name: 'Michael Brown',
    email: 'michael.brown@gmail.com',
    school: 'Mapúa University',
    course: 'BS Software Engineering',
    location: 'Intramuros, Manila',
    status: 'interested',
    createdAt: { date: 'Dec 08, 2025', time: '10:45 AM' },
    updatedAt: { date: 'Dec 08, 2025', time: '10:45 AM' },
    attendance: { single: true, days: [false, true, true, false, true, true, false] },
    submissions: [false, true, true]
  },
  {
    id: 'r2',
    name: 'David Kim',
    email: 'david.kim@outlook.com',
    school: 'Far Eastern University',
    course: 'BS Computer Science',
    location: 'Manila, Metro Manila',
    status: 'interested',
    createdAt: { date: 'Dec 09, 2025', time: '09:20 AM' },
    updatedAt: { date: 'Dec 09, 2025', time: '09:20 AM' },
    attendance: { single: true, days: [true, true, false, true, true, false, false] },
    submissions: [true, false, true]
  },
  {
    id: 'r3',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
    school: 'National University',
    course: 'BS Data Science',
    location: 'Manila, Metro Manila',
    status: 'interested',
    createdAt: { date: 'Dec 10, 2025', time: '10:00 AM' },
    updatedAt: { date: 'Dec 10, 2025', time: '10:00 AM' },
    attendance: { single: false, days: [false, true, false, false, true, false, false] },
    submissions: [false, true, false]
  },
  {
    id: 'r4',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
    school: 'University of the Philippines Diliman',
    course: 'BS Computer Science',
    location: 'Quezon City, Metro Manila',
    status: 'applied',
    createdAt: { date: 'Dec 11, 2025', time: '11:30 AM' },
    updatedAt: { date: 'Dec 11, 2025', time: '02:15 PM' },
    attendance: { single: true, days: [true, true, false, true, false, true, true] },
    submissions: [true, true, false],
    history: [
      { status: 'interested', admin: 'sarah.martinez@email.com', date: 'Dec 11, 2025', time: '11:30 AM' },
      { status: 'applied', admin: 'sarah.martinez@email.com', date: 'Dec 11, 2025', time: '02:15 PM' }
    ]
  },
  {
    id: 'r5',
    name: 'Emily Chen',
    email: 'emily.chen@outlook.com',
    school: 'Ateneo de Manila University',
    course: 'BS Management Information Systems',
    location: 'Quezon City, Metro Manila',
    status: 'applied',
    createdAt: { date: 'Dec 12, 2025', time: '02:20 PM' },
    updatedAt: { date: 'Dec 12, 2025', time: '02:20 PM' },
    attendance: { single: true, days: [true, true, true, true, true, true, true] },
    submissions: [true, true, true]
  },
  {
    id: 'r6',
    name: 'Rachel Patel',
    email: 'rachel.patel@gmail.com',
    school: 'Technological Institute of the Philippines',
    course: 'BS Information Technology',
    location: 'Cubao, Quezon City',
    status: 'applied',
    createdAt: { date: 'Dec 13, 2025', time: '04:10 PM' },
    updatedAt: { date: 'Dec 13, 2025', time: '04:10 PM' },
    attendance: { single: false, days: [true, false, false, false, true, false, true] },
    submissions: [false, false, true],
    history: [
      { status: 'applied', admin: 'rachel.patel@gmail.com', date: 'Dec 13, 2025', time: '04:10 PM' }
    ]
  },
  {
    id: 'r7',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    school: 'Polytechnic University of the Philippines',
    course: 'BS Computer Engineering',
    location: 'Sta. Mesa, Manila',
    status: 'approved',
    commitment: 'confirmed',
    createdAt: { date: 'Dec 05, 2025', time: '08:30 AM' },
    updatedAt: { date: 'Dec 06, 2025', time: '10:15 AM' },
    attendance: { single: false, days: [false, false, true, false, false, true, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'alex.rodriguez@email.com', date: 'Dec 05, 2025', time: '08:30 AM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 05, 2025', time: '08:30 AM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 05, 2025', time: '08:30 AM' },
      { type: 'commitment', label: 'Confirmed their spot', admin: 'alex.rodriguez@email.com', date: 'Dec 06, 2025', time: '10:15 AM' }
    ]
  },
  {
    id: 'r8',
    name: 'Kevin Santos',
    email: 'kevin.santos@gmail.com',
    school: 'Adamson University',
    course: 'BS Computer Engineering',
    location: 'Ermita, Manila',
    status: 'approved',
    commitment: 'awaiting',
    createdAt: { date: 'Dec 07, 2025', time: '02:10 PM' },
    updatedAt: { date: 'Dec 08, 2025', time: '09:00 AM' },
    attendance: { single: true, days: [true, true, true, true, true, true, true] },
    submissions: [true, true, true],
    history: [
      { status: 'applied', admin: 'kevin.santos@gmail.com', date: 'Dec 07, 2025', time: '02:10 PM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 08, 2025', time: '09:00 AM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 08, 2025', time: '09:00 AM' }
    ]
  },
  {
    id: 'r9',
    name: 'James Wilson',
    email: 'james.wilson@gmail.com',
    school: 'University of the East',
    course: 'BS Information Technology',
    location: 'Caloocan City, Metro Manila',
    status: 'approved',
    commitment: 'declined',
    createdAt: { date: 'Dec 12, 2025', time: '09:15 AM' },
    updatedAt: { date: 'Dec 13, 2025', time: '11:00 AM' },
    attendance: { single: false, days: [true, false, false, true, false, false, true] },
    submissions: [true, false, false],
    history: [
      { status: 'applied', admin: 'james.wilson@gmail.com', date: 'Dec 12, 2025', time: '09:15 AM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 12, 2025', time: '04:30 PM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 12, 2025', time: '04:30 PM' },
      { type: 'commitment', label: 'Declined their spot', admin: 'james.wilson@gmail.com', date: 'Dec 13, 2025', time: '11:00 AM' }
    ]
  },
  {
    id: 'r10',
    name: 'Diego Fernandez',
    email: 'diego.fernandez@gmail.com',
    school: 'University of San Agustin',
    course: 'BS Computer Science',
    location: 'Iloilo City, Iloilo',
    status: 'waitlisted',
    createdAt: { date: 'Dec 22, 2025', time: '10:15 AM' },
    updatedAt: { date: 'Dec 22, 2025', time: '03:00 PM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'diego.fernandez@gmail.com', date: 'Dec 22, 2025', time: '10:15 AM' },
      { status: 'waitlisted', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 22, 2025', time: '03:00 PM' }
    ]
  },
  {
    id: 'r11',
    name: 'Isabella Reyes',
    email: 'isabella.reyes@gmail.com',
    school: 'University of Santo Tomas',
    course: 'BS Information Systems',
    location: 'Sampaloc, Manila',
    status: 'applied',
    createdAt: { date: 'Dec 14, 2025', time: '09:05 AM' },
    updatedAt: { date: 'Dec 14, 2025', time: '09:05 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'isabella.reyes@gmail.com', date: 'Dec 14, 2025', time: '09:05 AM' }
    ]
  },
  {
    id: 'r12',
    name: 'Marco Villanueva',
    email: 'marco.villanueva@outlook.com',
    school: 'De La Salle University',
    course: 'BS Computer Science',
    location: 'Malate, Manila',
    status: 'applied',
    createdAt: { date: 'Dec 14, 2025', time: '01:40 PM' },
    updatedAt: { date: 'Dec 14, 2025', time: '01:40 PM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'marco.villanueva@outlook.com', date: 'Dec 14, 2025', time: '01:40 PM' }
    ]
  },
  {
    id: 'r13',
    name: 'Hannah Cruz',
    email: 'hannah.cruz@email.com',
    school: 'University of the Philippines Los Baños',
    course: 'BS Computer Science',
    location: 'Los Baños, Laguna',
    status: 'interested',
    createdAt: { date: 'Dec 15, 2025', time: '11:10 AM' },
    updatedAt: { date: 'Dec 15, 2025', time: '11:10 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false]
  },
  {
    id: 'r14',
    name: 'Paolo Dela Cruz',
    email: 'paolo.delacruz@gmail.com',
    school: 'Cebu Institute of Technology University',
    course: 'BS Information Technology',
    location: 'Cebu City, Cebu',
    status: 'approved',
    commitment: 'awaiting',
    createdAt: { date: 'Dec 10, 2025', time: '03:25 PM' },
    updatedAt: { date: 'Dec 11, 2025', time: '10:30 AM' },
    attendance: { single: true, days: [true, false, true, false, false, false, false] },
    submissions: [true, false, false],
    history: [
      { status: 'applied', admin: 'paolo.delacruz@gmail.com', date: 'Dec 10, 2025', time: '03:25 PM' },
      { status: 'approved', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 11, 2025', time: '10:30 AM' },
      { type: 'email', label: 'Acceptance email sent', admin: 'System', date: 'Dec 11, 2025', time: '10:30 AM' }
    ]
  },
  {
    id: 'r15',
    name: 'Bianca Ramos',
    email: 'bianca.ramos@gmail.com',
    school: 'Ateneo de Davao University',
    course: 'BS Computer Science',
    location: 'Davao City, Davao del Sur',
    status: 'waitlisted',
    createdAt: { date: 'Dec 23, 2025', time: '08:50 AM' },
    updatedAt: { date: 'Dec 23, 2025', time: '11:20 AM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false],
    history: [
      { status: 'applied', admin: 'bianca.ramos@gmail.com', date: 'Dec 23, 2025', time: '08:50 AM' },
      { status: 'waitlisted', admin: 'jonas.reyes@kadakareer.com', date: 'Dec 23, 2025', time: '11:20 AM' }
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
