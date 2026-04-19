// src/lib/data.js
// In-memory data store (replace with real DB/API calls later)

export const initialDisasters = [
    { id: 1, name: 'Flood - Kerala', type: 'Flood', severity: 'High', location: 'Kerala', date: '2024-07-15', status: 'Active', affectedPeople: 12000 },
    { id: 2, name: 'Cyclone Biparjoy', type: 'Cyclone', severity: 'Critical', location: 'Gujarat', date: '2024-06-10', status: 'Resolved', affectedPeople: 45000 },
    { id: 3, name: 'Earthquake - Himachal', type: 'Earthquake', severity: 'Medium', location: 'Himachal Pradesh', date: '2024-08-01', status: 'Active', affectedPeople: 3200 },
];

export const initialVictims = [
    { id: 1, name: 'Ramesh Kumar', age: 45, gender: 'Male', disasterId: 1, location: 'Ernakulam', status: 'In Relief Camp', contact: '9876543210' },
    { id: 2, name: 'Priya Nair', age: 32, gender: 'Female', disasterId: 1, location: 'Thrissur', status: 'Missing', contact: '9876543211' },
    { id: 3, name: 'Ahmed Shaikh', age: 60, gender: 'Male', disasterId: 2, location: 'Kutch', status: 'Rescued', contact: '9876543212' },
];

export const initialReliefCamps = [
    { id: 1, name: 'Camp Alpha - Ernakulam', location: 'Ernakulam', capacity: 500, currentOccupancy: 320, disasterId: 1, status: 'Active', inCharge: 'Col. Mehra' },
    { id: 2, name: 'Camp Beta - Kutch', location: 'Kutch', capacity: 1000, currentOccupancy: 780, disasterId: 2, status: 'Active', inCharge: 'Maj. Sharma' },
];

export const initialVolunteers = [
    { id: 1, name: 'Suresh Menon', skill: 'Medical', phone: '9000000001', assignedDisaster: 1, status: 'Active', organization: 'Red Cross' },
    { id: 2, name: 'Anita Patel', skill: 'Search & Rescue', phone: '9000000002', assignedDisaster: 2, status: 'Active', organization: 'NDRF' },
    { id: 3, name: 'Vijay Singh', skill: 'Logistics', phone: '9000000003', assignedDisaster: 1, status: 'Inactive', organization: 'State Gov' },
];

export const initialResources = [
    { id: 1, name: 'Food Packets', type: 'Food', quantity: 5000, unit: 'Packets', assignedCamp: 1, status: 'Available' },
    { id: 2, name: 'Drinking Water', type: 'Water', quantity: 2000, unit: 'Liters', assignedCamp: 1, status: 'Low' },
    { id: 3, name: 'Medical Kits', type: 'Medical', quantity: 300, unit: 'Kits', assignedCamp: 2, status: 'Available' },
    { id: 4, name: 'Tarpaulins', type: 'Shelter', quantity: 800, unit: 'Pieces', assignedCamp: 2, status: 'Available' },
];

export const initialAlerts = [
    { id: 1, title: 'Red Alert - Heavy Rainfall', type: 'Warning', region: 'Kerala', issuedBy: 'IMD', date: '2024-07-14', severity: 'High', status: 'Active' },
    { id: 2, title: 'Cyclone Watch - Arabian Sea', type: 'Watch', region: 'Gujarat', issuedBy: 'NDMA', date: '2024-06-08', severity: 'Critical', status: 'Resolved' },
];

export const initialAgencies = [
    { id: 1, name: 'NDRF', fullName: 'National Disaster Response Force', type: 'Central', contact: '011-26701700', headOffice: 'New Delhi', activeDeployments: 5 },
    { id: 2, name: 'SDRF', fullName: 'State Disaster Response Force', type: 'State', contact: '0484-2345678', headOffice: 'Thiruvananthapuram', activeDeployments: 8 },
    { id: 3, name: 'IMD', fullName: 'India Meteorological Department', type: 'Advisory', contact: '011-24631913', headOffice: 'New Delhi', activeDeployments: 0 },
];