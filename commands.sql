CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (title, author, url)
values (
  'How I do my first commit for a new project',
  'Joshua Priddle',
  'https://josh.fail/2023/how-i-do-my-first-commit-for-a-new-project/'
);

insert into blogs (title, author, url)
values (
  'The Best Essay',
  'Paul Graham',
  'https://paulgraham.com/best.html'
);
