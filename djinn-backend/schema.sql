DROP TABLE bins;

CREATE TABLE bins (
binID SERIAL PRIMARY KEY,
binKey VARCHAR(100) NOT NULL,
createdTime timestamp,
endPoint VARCHAR(100),
last timestamp,
count numeric
);


-- Sample Data
INSERT INTO bins (binKey, createdTime, endPoint, last, count)
    VALUES ('abc123', '2011-10-19 10:23:54', 'www.test.com', '2011-10-19 10:23:54', 1);
    -- COUNT IS ACTUALLY 0 AT THE BEGINNING
