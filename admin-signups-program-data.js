/* ==========================================================================
   KadaKareer Admin — program signups mock data
   Consolidated participant records (including attendance and submissions)
   ========================================================================== */

const participantsData = [
  {
    id: 'r1',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@email.com',
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
    status: 'dropped-out',
    createdAt: { date: 'Nov 15, 2025', time: '11:00 AM' },
    updatedAt: { date: 'Nov 16, 2025', time: '03:45 PM' },
    attendance: { single: false, days: [false, false, false, false, false, false, false] },
    submissions: [false, false, false]
  },
  {
    id: 'r3',
    name: 'Emily Chen',
    email: 'emily.chen@outlook.com',
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
    status: 'registered',
    createdAt: { date: 'Dec 05, 2025', time: '08:30 AM' },
    updatedAt: { date: 'Dec 05, 2025', time: '08:30 AM' },
    attendance: { single: false, days: [false, false, true, false, false, true, false] },
    submissions: [false, false, false]
  },
  {
    id: 'r6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    status: 'completed',
    createdAt: { date: 'Dec 02, 2025', time: '11:15 AM' },
    updatedAt: { date: 'Dec 03, 2025', time: '02:45 PM' },
    attendance: { single: true, days: [true, false, true, true, false, true, true] },
    submissions: [true, true, false]
  },
  {
    id: 'r7',
    name: 'David Kim',
    email: 'david.kim@outlook.com',
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
    status: 'completed',
    createdAt: { date: 'Nov 25, 2025', time: '04:10 PM' },
    updatedAt: { date: 'Nov 26, 2025', time: '10:00 AM' },
    attendance: { single: false, days: [true, false, false, false, true, false, true] },
    submissions: [false, false, true]
  },
  {
    id: 'r9',
    name: 'Kevin Santos',
    email: 'kevin.santos@gmail.com',
    status: 'registered',
    createdAt: { date: 'Nov 22, 2025', time: '02:10 PM' },
    updatedAt: { date: 'Nov 22, 2025', time: '02:10 PM' },
    attendance: { single: true, days: [true, true, true, true, true, true, true] },
    submissions: [true, true, true]
  },
  {
    id: 'r10',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@email.com',
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
    status: 'registered',
    createdAt: { date: 'Dec 12, 2025', time: '09:15 AM' },
    updatedAt: { date: 'Dec 12, 2025', time: '04:30 PM' },
    attendance: { single: false, days: [true, false, false, true, false, false, true] },
    submissions: [true, false, false]
  }
];

// Generate the lookup maps dynamically to maintain compatibility with the UI controllers
const attendanceData = {};
const submissionsData = {};

participantsData.forEach(p => {
  attendanceData[p.id] = p.attendance;
  submissionsData[p.id] = p.submissions;
});
