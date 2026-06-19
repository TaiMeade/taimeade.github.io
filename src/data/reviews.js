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
export const reviews = [
    {
        id: 1,
        name: 'David Samuel Rudisill',
        business: 'Mountain Empire',
        serviceType: 'Web Design',
        rating: 5,
        text: 'I hired Tai to design a website for my septic service company, and he absolutely knocked it out of the park. From the very beginning, he listened carefully to what I needed, a clean, professional site that highlights our services, makes it easy for customers to request quotes, and builds trust in our local business. The final website looks fantastic, modern, mobile-friendly, fast-loading, and super easy to navigate. He even helped me think through the content and layout so it actually works for generating leads. Tai was responsive, professional, and delivered exactly what I wanted without any headaches. If you’re a small business owner looking for a great website, Tai is the guy to go to. Thanks again, Tai our new site is already making a difference!',
        date: '2026-06-18',
    }
]
