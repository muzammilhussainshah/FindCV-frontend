export const setItemWithExpiration = (key, value, ttl) => {
    const now = new Date();
  
    const item = {
      value: value,
      expiration: now.getTime() + ttl,
    };
  
    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiration = (key) => {
    const itemStr = localStorage.getItem(key);
  
    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
  
    const item = JSON.parse(itemStr);
    const now = new Date();
  
    // Compare the expiration time of the item with the current time
    if (now.getTime() > item.expiration) {
      // If the item is expired, remove it from storage and return null
      localStorage.removeItem(key);
      return null;
    }
  
    return item.value;
};

export const getLanguageLevelText = (level) => {
  let languageLevelText = '';

  switch (level) {
    case 1:
        languageLevelText = 'A1';
        break;
    case 2:
        languageLevelText = 'A2';
        break;
    case 3:
        languageLevelText = 'B1';
        break;
    case 4:
        languageLevelText = 'B2';
        break;
    case 5:
        languageLevelText = 'C1';
        break;
    case 6:
        languageLevelText = 'C2';
        break;
    default:
        languageLevelText = 'B1';
        break;
  }

  return languageLevelText;

}