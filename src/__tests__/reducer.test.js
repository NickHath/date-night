import { googleMapsUrl } from '../ducks/reducer';

describe('reducer actions', () => {
  test('googleMapsUrl returns a string', () => {
    const businesses = [
      { coordinates: { latitude: 40.2339058, longitude: -111.6617889 } },
      { coordinates: { latitude: 40.3680588, longitude: -111.7842192 } },
      { coordinates: { latitude: 40.18078, longitude: -111.64772 } }
    ];
    const results = googleMapsUrl(businesses);
    expect(typeof results).toBe('string');
  })

  test('googleMapsUrl returns correct URL for select array of businesses', () => {
    const businesses = [
      { coordinates: { latitude: 40.2339058, longitude: -111.6617889 } },
      { coordinates: { latitude: 40.3680588, longitude: -111.7842192 } },
      { coordinates: { latitude: 40.18078, longitude: -111.64772 } }
    ];
    const results = googleMapsUrl(businesses);
    console.log(results);
    expect(results).toBe('https://www.google.com/maps/dir/40.2339058,-111.6617889/40.3680588,-111.7842192/40.18078,-111.64772/');
  });
})

