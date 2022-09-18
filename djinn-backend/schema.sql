DROP TABLE bins;

CREATE TABLE bins (
binID SERIAL PRIMARY KEY,
binKey VARCHAR(100) NOT NULL,
createdTime timestamp,
endPoint VARCHAR(100),
last timestamp,
count numeric
);
