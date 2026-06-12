-- Seed initial notes for Hallie's website
-- These are public notes that will be visible to all visitors

INSERT INTO public.notes (id, title, content, created_at, public, session_id, slug, category, emoji)
VALUES 
(
  gen_random_uuid(),
  'about me',
  '📍about me
my name is hallie (rhymes with "alley")

currently
• recent grad from harvard business school w/ a ms engineering & mba
• cofounder of [celery](https://celery.cool)
• builder of products that improve the human condition, looking for what''s next

previously
• designed + launched the clotriever bold at [inari medical](https://www.inarimedical.com/) (now a part of Stryker)
• supported covid-19 vaccine manufacturing at catalent (now a part of Novo Holdings)
• designed and patented the peritonex at relavo
• ran 2 marathons + led two teams for running 200+ mile relay races
• have lived in 7 states and 11 apartments since graduating from college 
• washed up college soccer player
• studied biomedical engineering at johns hopkins university',
  now(),
  true,
  NULL,
  'about-me',
  'pinned',
  '📍'
),
(
  gen_random_uuid(),
  'projects',
  'celery
• cofounder of [celery](https://celery.cool), the collective infrastructure for presence
• started as a hardware "dumbphone for kids" concept, evolved into a mobile app encouraging friends to spend less time on their phones - together
• live on the iOS app store [celery - focus is a team sport](https://apps.apple.com/us/app/celery-focus-is-a-team-sport/id6741854145)
• a firm believe that the future of personal technology is going to move away from screen-based interfaces, and passionate about building for a world that pushes people into the real world instead of pulling them out of it

inari
• cofounder of [celery](https://celery.cool), the collective infrastructure for presence
• 300+ hrs of device testing with ovine blood later + i now take the phrase "roll up your sleeves and get dirty" quite literally

while @ harvard
• lithography harvard center for nanoscale systems 
• made 50+ funky shaped bowls and plates at the harvard ceramics studio',
  now(),
  true,
  NULL,
  'projects',
  'pinned',
  '🚀'
);
