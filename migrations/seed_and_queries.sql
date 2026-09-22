-- Seed data: 3 teams, 8 colleagues, 3 meeting rooms, 4 desks, 6 bookings
/*
INSERT INTO teams (name, department) VALUES
('Falcons', 'Engineering'),
('Wolves', 'Marketing'),
('Otters', 'Sales');

INSERT INTO users (first_name, last_name, email, team_id) VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', 1),
('Ben', 'Carter', 'ben.carter@example.com', 1),
('Chloe', 'Davis', 'chloe.davis@example.com', 1),
('Daniel', 'Evans', 'daniel.evans@example.com', 2),
('Emma', 'Foster', 'emma.foster@example.com', 2),
('Finn', 'Grant', 'finn.grant@example.com', 2),
('Grace', 'Harris', 'grace.harris@example.com', 3),
('Henry', 'Irwin', 'henry.irwin@example.com', 3);

INSERT INTO rooms (name, floor, capacity) VALUES
('Boardroom', 1, 12),
('Huddle Room', 2, 4),
('Conference Room', 3, 8);

INSERT INTO desks (name, floor) VALUES
('Desk A1', 1),
('Desk A2', 1),
('Desk B1', 2),
('Desk B2', 2);

-- Henry (user_id 8) is intentionally left with no bookings.
-- Desk A1 (desk_id 1) is booked on two different days by different users.
INSERT INTO bookings (user_id, desk_id, booking_date, active) VALUES
(1, 1, '2026-09-15', true),
(2, 1, '2026-09-16', true),
(3, 2, '2026-09-15', true),
(4, 3, '2026-09-16', true),
(5, 4, '2026-09-17', true),
(6, 2, '2026-09-18', true);
*/

-- Queries
Select (u.name) FROM Users AS u,
Select t.Name FROM teams as t 
LEFT JOIN u on t.user_id = u.id,
Select COUNT(DISTINCT booking_date) FROM bookings as b
WHERE b.user_id = u.id,
GROUP BY (u.id);


