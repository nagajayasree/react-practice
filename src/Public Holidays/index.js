import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export default function Holidays() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('NL');
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`https://openholidaysapi.org/Countries`),
          axios.get(
            `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&languageIsoCode=${selectedCountry}&validFrom=2025-01-01&validTo=2025-06-30`
          ),
        ]);
        setCountries(res1.data);
        // console.log(res1.data);
        setHolidays(res2.data);
        // console.log(res2.data);
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    };
    fetchData();
  }, [selectedCountry]);

  return (
    <div>
      <h2>Public Holidays of a Country</h2>
      <div>
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
          }}
        >
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name
                .slice(0, 1)
                .map((n) => n.text)
                .join(' ')}
            </option>
          ))}
        </select>
        {holidays.map((holiday) => (
          <div key={holiday.id}>
            <p>
              {format(new Date(holiday.startDate), 'd MMMM')} -{' '}
              {holiday.name
                .slice(0, 1)
                .map((n) => n.text)
                .join('')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
