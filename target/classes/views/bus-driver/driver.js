// Simulated driver data (in a real app, this would come from a backend)
const driverData = {
    username: 'driver1', // Hardcoded for simplicity; in reality, this would be dynamic
    todayTrips: [
        { time: '08:00 AM - 09:00 AM', route: 'Campus A to Campus B' },
        { time: '12:00 PM - 01:00 PM', route: 'Campus B to Campus A' }
    ],
    upcomingTrips: [
        { time: '04/09/2025 09:00 AM - 10:00 AM', route: 'Campus A to Campus C' },
        { time: '04/10/2025 02:00 PM - 03:00 PM', route: 'Campus C to Campus A' }
    ],
    completedTrips: [
        { time: '04/07/2025 10:00 AM - 11:00 AM', route: 'Campus A to Campus B' }
    ],
    route: {
        name: 'Route 1',
        start: 'Campus A',
        end: 'Campus B'
    }
};

// Populate Today's Trips
const todayTripsDiv = document.getElementById('today-trips');
if (driverData.todayTrips.length > 0) {
    todayTripsDiv.innerHTML = '';
    driverData.todayTrips.forEach(trip => {
        const tripP = document.createElement('p');
        tripP.textContent = `${trip.time} - ${trip.route}`;
        todayTripsDiv.appendChild(tripP);
    });
}

// Populate Upcoming Trips
const upcomingTripsDiv = document.getElementById('upcoming-trips');
if (driverData.upcomingTrips.length > 0) {
    upcomingTripsDiv.innerHTML = '';
    driverData.upcomingTrips.forEach(trip => {
        const tripP = document.createElement('p');
        tripP.textContent = `${trip.time} - ${trip.route}`;
        upcomingTripsDiv.appendChild(tripP);
    });
}

// Populate Completed Trips
const completedTripsDiv = document.getElementById('completed-trips');
if (driverData.completedTrips.length > 0) {
    completedTripsDiv.innerHTML = '';
    driverData.completedTrips.forEach(trip => {
        const tripP = document.createElement('p');
        tripP.textContent = `${trip.time} - ${trip.route}`;
        completedTripsDiv.appendChild(tripP);
    });
}

// Populate Driver Route
const routeDiv = document.getElementById('driver-route');
if (driverData.route) {
    routeDiv.innerHTML = `
        <p>Name: ${driverData.route.name}</p>
        <p>Start: ${driverData.route.start}</p>
        <p>End: ${driverData.route.end}</p>
    `;
}