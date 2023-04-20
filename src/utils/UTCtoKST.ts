export const UTCtoKST = (date: any) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
 
};
