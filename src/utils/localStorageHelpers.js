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