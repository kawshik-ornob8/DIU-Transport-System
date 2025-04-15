const transportData = {
    schedule: [{
            bus: 'Campus Express',
            time: '08:00 AM',
            route: 'Main Campus Loop',
            status: 'On Time',
            delay: ''
        },
        {
            bus: 'Night Rider',
            time: '10:30 PM',
            route: 'City Connector',
            status: 'Delayed',
            delay: '15 min'
        },
        {
            bus: 'Weekend Shuttle',
            time: '09:15 AM',
            route: 'Residential Area',
            status: 'On Time',
            delay: ''
        }
    ],
    routes: [{
            id: 1,
            name: 'Main Campus Loop',
            stops: ['Main Gate', 'Library', 'Science Block', 'Sports Complex'],
            duration: '45m',
            busType: 'AC Coach'
        },
        {
            id: 2,
            name: 'City Connector',
            stops: ['Central Station', 'Shopping Mall', 'University Main Gate'],
            duration: '30m',
            busType: 'Standard'
        },
        {
            id: 3,
            name: 'Residential Area',
            stops: ['Faculty Housing', 'Student Dorms', 'Main Campus'],
            duration: '25m',
            busType: 'Mini Bus'
        }
    ],
    prices: [{
            route: 'Main Campus Loop',
            price: 5.00,
            discount: 0.50,
            type: 'Student'
        },
        {
            route: 'City Connector',
            price: 7.00,
            discount: 1.00,
            type: 'Faculty'
        },
        {
            route: 'Residential Area',
            price: 3.50,
            discount: 0.25,
            type: 'Student'
        }
    ],
    bookings: [{
            id: 1,
            bus: 'Campus Express',
            route: 'Main Campus Loop',
            time: '08:00 AM',
            date: '15 Apr 2025',
            price: 4.50,
            status: 'Confirmed',
            seat: '12A'
        },
        {
            id: 2,
            bus: 'Night Rider',
            route: 'City Connector',
            time: '10:30 PM',
            date: '14 Apr 2025',
            price: 6.00,
            status: 'Pending',
            seat: '08B'
        },
        {
            id: 3,
            bus: 'Weekend Shuttle',
            route: 'Residential Area',
            time: '09:15 AM',
            date: '16 Apr 2025',
            price: 3.25,
            status: 'Confirmed',
            seat: '05C'
        }
    ]
};

// DOM Population Functions
function populateSchedule() {
    const scheduleDiv = document.getElementById('bus-schedule');

    if (transportData.schedule.length === 0) {
        scheduleDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No scheduled buses available</p>';
        return;
    }

    scheduleDiv.innerHTML = transportData.schedule.map(trip => `
        <div class="p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-semibold">${trip.bus}</h4>
                    <p class="text-sm text-gray-500">${trip.route}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded-full ${trip.status === 'On Time' ? 
                    'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${trip.status}
                </span>
            </div>
            <div class="mt-2 text-sm">
                <i class="fas fa-clock mr-2"></i>${trip.time}
                ${trip.delay ? `
                <span class="ml-3 text-orange-600">
                    <i class="fas fa-exclamation-circle"></i> ${trip.delay}
                </span>` : ''}
            </div>
        </div>
    `).join('');
}

function populateRoutes() {
    const routesDiv = document.getElementById('bus-routes');
    
    if (transportData.routes.length === 0) {
        routesDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No routes available</p>';
        return;
    }
    
    routesDiv.innerHTML = transportData.routes.map(route => `
        <div class="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h4 class="font-semibold">${route.name}</h4>
                    <span class="text-xs text-gray-500">${route.busType}</span>
                </div>
                <span class="text-sm text-gray-500">${route.duration}</span>
            </div>
            <div class="text-sm text-gray-600">
                <i class="fas fa-map-marker-alt mr-2"></i>
                ${route.stops.slice(0, 2).join(' → ')}${route.stops.length > 2 ? '...' : ''}
            </div>
            <button class="mt-2 text-xs text-blue-600 hover:underline">
                View all stops
            </button>
        </div>
    `).join('');
}

function populatePrices() {
    const pricesDiv = document.getElementById('ticket-prices');
    
    if (transportData.prices.length === 0) {
        pricesDiv.innerHTML = '<p class="text-gray-500 text-center py-4">No pricing information available</p>';
        return;
    }
    
    pricesDiv.innerHTML = transportData.prices.map(price => `
        <div class="p-3 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors">
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-semibold">${price.route}</h4>
                    <span class="text-xs text-gray-500">${price.type}</span>
                </div>
                <div class="text-right">
                    <div class="font-semibold">$${(price.price - price.discount).toFixed(2)}</div>
                    ${price.discount > 0 ? `
                        <div class="text-xs line-through text-gray-400">$${price.price.toFixed(2)}</div>
                        <div class="text-xs text-green-600">Save $${price.discount.toFixed(2)}</div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function populateBookings() {
    const bookingsList = document.getElementById('bookings-list');
    
    if (transportData.bookings.length === 0) {
        bookingsList.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No recent bookings found
                </td>
            </tr>
        `;
        return;
    }
    
    bookingsList.innerHTML = transportData.bookings.map(booking => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">
                <div class="font-medium">${booking.bus}</div>
                <div class="text-sm text-gray-500">Seat ${booking.seat}</div>
            </td>
            <td class="px-6 py-4">${booking.route}</td>
            <td class="px-6 py-4">
                <div>${booking.time}</div>
                <div class="text-sm text-gray-500">${booking.date}</div>
            </td>
            <td class="px-6 py-4 font-semibold">$${booking.price.toFixed(2)}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs ${booking.status === 'Confirmed' ? 
                    'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${booking.status}
                </span>
            </td>
            <td class="px-6 py-4">
                <button class="text-green-600 hover:text-green-800 mr-3" title="View Ticket">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="text-red-600 hover:text-red-800" title="Cancel">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Populate all sections
    populateSchedule();
    populateRoutes();
    populatePrices();
    populateBookings();

    // Populate route selector
    const routeSelect = document.getElementById('route-select');
    transportData.prices.forEach(price => {
        const option = document.createElement('option');
        option.value = price.route;
        option.textContent = `${price.route} (${price.type}) - $${(price.price - price.discount).toFixed(2)}`;
        routeSelect.appendChild(option);
    });

    // Handle ticket purchase
    document.getElementById('buy-ticket-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const selectedRoute = routeSelect.value;
        const priceInfo = transportData.prices.find(p => p.route === selectedRoute);

        if (!priceInfo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a valid route',
                confirmButtonColor: '#16a34a'
            });
            return;
        }

        const { value: accept } = await Swal.fire({
            title: 'Confirm Purchase',
            html: `
                <div class="text-left">
                    <p class="mb-2">You are purchasing a <span class="font-semibold">${priceInfo.type}</span> ticket for:</p>
                    <div class="bg-gray-50 p-3 rounded-lg mb-3">
                        <div class="font-bold text-lg">${priceInfo.route}</div>
                        <div class="flex justify-between mt-2">
                            <span>Price:</span>
                            <span class="font-semibold">$${(priceInfo.price - priceInfo.discount).toFixed(2)}</span>
                        </div>
                        ${priceInfo.discount > 0 ? `
                        <div class="flex justify-between text-sm text-green-600">
                            <span>Discount:</span>
                            <span>$${priceInfo.discount.toFixed(2)}</span>
                        </div>
                        ` : ''}
                    </div>
                    <p class="text-sm text-gray-500">This ticket is non-refundable</p>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Confirm Payment',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            allowOutsideClick: false
        });

        if (accept) {
            Swal.fire({
                title: 'Success!',
                html: `
                    <div class="text-center">
                        <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                        <p class="mb-2">Your ticket has been booked successfully!</p>
                        <div class="bg-gray-50 p-3 rounded-lg inline-block text-left">
                            <div class="font-bold">${priceInfo.route}</div>
                            <div class="text-sm">$${(priceInfo.price - priceInfo.discount).toFixed(2)}</div>
                        </div>
                    </div>
                `,
                confirmButtonColor: '#16a34a'
            }).then(() => {
                // Refresh bookings after purchase
                populateBookings();
            });
        }
    });
});