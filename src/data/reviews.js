// Approved client reviews, shown in the "What clients say" section on the
// Services page. Reviews are submitted via the /review form (which emails them
// to me); I paste approved ones here, commit, and they go live on the next
// deploy. The section is hidden entirely while this array is empty.
//
// Shape of an entry — copy this when adding a new review:
//   {
//     id: 1,
//     name: 'Jane Smith',
//     business: 'Acme Co',          // optional — omit or '' for individuals
//     serviceType: 'Web Design',    // matches a service reviewLabel, or 'Other'
//     rating: 5,                     // 1–5
//     text: 'Tai built us a fantastic site and was a pleasure to work with.',
//     date: '2026-06',              // optional — for your own reference/sorting
//   }
export const reviews = []
