// Sample data for the automatic tests (python build.py test): someone who has asked for a
// Standard plot, so the Allotment tab shows their request and the welcome page stays closed.
export default function seed(app) {
  const area = (name) => app.storage.area(name);
  area('welcome').set('profile', { role: 'member', answers: { tier: 'Standard', interests: ['Vegetables'], experience: 'A little', days: ['Wednesday: Social Gardening'] } });
}
