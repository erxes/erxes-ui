export const cleanIntegrationKind = (name: string) => {
  if (name.includes('nylas')) {
    name = name.replace('nylas-', '');
  }
  if (name.includes('smooch')) {
    name = name.replace('smooch-', '');
  }
  if (name === 'lead') {
    name = 'popups';
  }
  return name;
};
