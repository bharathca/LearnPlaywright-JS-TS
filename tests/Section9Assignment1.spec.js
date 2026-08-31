import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com'
const email = "dhamaka@gmail.com";
const password = "Dhamaka@123";

async function login(page) {
    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(email);

    await page.getByLabel('Password').fill(password);

    await page.locator('#login-btn').click();

    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}
test.skip('create event via UI, book it, and verify seat reduction', async ({ page }) => {

    await login(page);
    await page.goto(`${BASE_URL}/admin/events`);
    const eventTitle = `Test Event ${Date.now()}`;


    const eventName = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventName);
    await page.locator("#admin-event-form textarea").fill("Test Event Description");
    await page.getByLabel("city").fill("Chennai");
    await page.getByLabel("venue").fill("Chennai");

    await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

    await page.getByLabel('Price ($)').fill('150');
    await page.getByLabel('Total Seats').fill('200');


    await page.locator('#add-event-btn').click();


    await expect(page.getByText('Event created!')).toBeVisible();

    console.log(`Created event: "${eventTitle}"`);


    await page.goto(`${BASE_URL}/events`);


    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();


    const targetCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(targetCard).toBeVisible({ timeout: 5000 });


    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);


    await targetCard.getByTestId('book-now-btn').click();

    const ticketCount = page.locator('#ticket-count');
    await expect(ticketCount).toHaveText('1');


    await page.getByLabel('Full Name').fill('Test Student');


    await page.locator('#customer-email').fill('test.student@example.com');


    await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

    await page.locator('.confirm-booking-btn').click();

    const bookingRefEl = page.locator('.booking-ref').first();
    await expect(bookingRefEl).toBeVisible();

    const bookingRef = (await bookingRefEl.innerText()).trim();
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

    console.log(`Booking confirmed. Ref: ${bookingRef}`);

    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const bookingCards = page.locator('#booking-card');
    await expect(bookingCards.first()).toBeVisible();

    const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
    await expect(matchingCard).toBeVisible();

    await expect(matchingCard).toContainText(eventTitle);

    console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

    await page.goto(`${BASE_URL}/events`);
    await expect(eventCards.first()).toBeVisible();

    const updatedCard = eventCards.filter({ hasText: eventTitle }).first();
    await expect(updatedCard).toBeVisible();

    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
    console.log(`Seats after booking: ${seatsAfterBooking}`);

    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});