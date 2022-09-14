DROP TABLE bins

CREATE TABLE bins (
binID SERIAL PRIMARY KEY,
binKey VARCHAR(50) NOT NULL,
createdTime timestamp,
endPoint VARCHAR(50),
supported VARCHAR(50),
last timestamp,
count int,
status VARCHAR(50)
);


-- Sample Data
INSERT INTO bins (binKey, createdTime, endPoint, supported, last, status)
    VALUES ('abc123', '2011-10-19 10:23:54', 'www.test.com', 'DNS,HTTP', '2011-10-19 10:23:54', 'active');
