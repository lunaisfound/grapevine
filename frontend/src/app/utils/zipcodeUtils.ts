export interface CityState {
    city: string;
    state: string;
  }
  
  // Function to get city and state from ZIP code using Zippopotam API
  export async function getCityStateFromZip(zipCode: string): Promise<CityState | null> {
    const url = `https://api.zippopotam.us/us/${zipCode}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.places && data.places.length > 0) {
        const city = data.places[0]['place name'];
        const state = data.places[0]['state abbreviation'];
  
        return { city, state };
      } else {
        console.error('Error fetching data:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching city/state:', error);
      return null;
    }
  }
  