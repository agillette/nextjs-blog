import Airtable from 'airtable'

const base = new Airtable({apiKey:process.env.AIRTABLE_API_KEY}).base('appkqhWa6Nc1UwXOA');

export const getRecentLinks = () => {
  return new Promise((resolve, reject) => {
    const returnArray = []
  
    base('Table 1').select({
      maxRecords: 50
    }).firstPage(function(err, records) {
      if (err) {
        console.error(err);
        reject({ err });
      }
      console.log('records: ', records)
      records.map(record => {
        const link = {
          id: record.id,
          title: record.get('Title'),
          url: record.get('URL'),
          date: record.get('Created')
        }
        returnArray.push(link)
      });
      resolve(returnArray)
    });
  })
}