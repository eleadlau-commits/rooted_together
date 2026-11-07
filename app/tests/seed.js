// Sample data for the automatic tests (python build.py test): a signed-up grower, so the Match
// tab has a match to show and the welcome page doesn't cover the screen.
export default function seed(app) {
  const area = (name) => app.storage.area(name);
  area('welcome').set('profile', { role: 'grower', answers: { interests: ['Vegetables'], experience: 'A little', free: ['Weekends'], area: 'Gilesgate' } });
}
