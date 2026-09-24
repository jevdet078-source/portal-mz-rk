// Mock data for the Медпортал clinic portal UI kit.
window.MP_DATA = {
  user: { name: 'Dr. Elena Petrova', role: 'Cardiologist', initials: 'EP', color: 'purple' },
  stats: [
    { id: 'appts', label: "Today's appointments", value: '14', delta: '+3', up: true, icon: 'calendar-line', color: 'blue' },
    { id: 'patients', label: 'Active patients', value: '328', delta: '+12', up: true, icon: 'group-line', color: 'green' },
    { id: 'pending', label: 'Pending lab results', value: '7', delta: '-2', up: false, icon: 'test-tube-line', color: 'orange' },
    { id: 'messages', label: 'Unread messages', value: '5', delta: '+5', up: true, icon: 'chat-3-line', color: 'purple' },
  ],
  schedule: [
    { time: '09:00', name: 'Анна Иванова', initials: 'АИ', color: 'blue', reason: 'Follow-up · Hypertension', status: 'completed', dur: '30 min' },
    { time: '09:45', name: 'Михаил Соколов', initials: 'МС', color: 'green', reason: 'ECG review', status: 'completed', dur: '20 min' },
    { time: '10:30', name: 'Ольга Кузнецова', initials: 'ОК', color: 'orange', reason: 'New consultation', status: 'in_progress', dur: '45 min' },
    { time: '11:30', name: 'Дмитрий Орлов', initials: 'ДО', color: 'purple', reason: 'Post-op check', status: 'pending', dur: '30 min' },
    { time: '13:00', name: 'Елена Морозова', initials: 'ЕМ', color: 'yellow', reason: 'Cholesterol panel', status: 'pending', dur: '20 min' },
    { time: '14:30', name: 'Сергей Волков', initials: 'СВ', color: 'green', reason: 'Telemedicine · Arrhythmia', status: 'pending', dur: '30 min', video: true },
  ],
  patients: [
    { name: 'Анна Иванова', initials: 'АИ', color: 'blue', age: 54, id: 'PT-10293', condition: 'Hypertension', risk: 'Moderate', last: '2 days ago', status: 'online' },
    { name: 'Михаил Соколов', initials: 'МС', color: 'green', age: 61, id: 'PT-10288', condition: 'Coronary artery disease', risk: 'High', last: '4 hours ago', status: 'offline' },
    { name: 'Ольга Кузнецова', initials: 'ОК', color: 'orange', age: 43, id: 'PT-10301', condition: 'Arrhythmia', risk: 'Low', last: 'Today', status: 'online' },
    { name: 'Дмитрий Орлов', initials: 'ДО', color: 'purple', age: 38, id: 'PT-10277', condition: 'Post-operative care', risk: 'Moderate', last: '1 week ago', status: 'away' },
    { name: 'Елена Морозова', initials: 'ЕМ', color: 'yellow', age: 49, id: 'PT-10312', condition: 'Hyperlipidemia', risk: 'Low', last: '3 days ago', status: 'offline' },
    { name: 'Сергей Волков', initials: 'СВ', color: 'green', age: 57, id: 'PT-10266', condition: 'Atrial fibrillation', risk: 'High', last: 'Yesterday', status: 'online' },
  ],
  vitals: [
    { label: 'Blood pressure', value: '128 / 84', unit: 'mmHg', icon: 'heart-pulse-line', color: 'red', trend: 72 },
    { label: 'Heart rate', value: '74', unit: 'bpm', icon: 'pulse-line', color: 'primary', trend: 60 },
    { label: 'Cholesterol', value: '198', unit: 'mg/dL', icon: 'drop-line', color: 'orange', trend: 48 },
    { label: 'BMI', value: '24.6', unit: 'kg/m²', icon: 'scales-2-line', color: 'green', trend: 55 },
  ],
};
