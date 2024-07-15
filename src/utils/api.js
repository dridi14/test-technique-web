// This file can include reusable functions for API calls if needed
export const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };
  