// 1. Välj våra element med querySelector
  const track = document.querySelector('.upsell-carousel-track');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  // 2. Definiera hur långt vi ska scrolla (bredden på ett kort)
  // Vi räknar ut detta dynamiskt med en arrow function för att vara säkra
  const scrollAmount = () => {
    const card = track.querySelector('.upsell-card');
    const root = getComputedStyle(document.documentElement); /* För att använda våra CSS variabler) */
    const gap = parseInt(root.getPropertyValue('--carousel-gap')) || 16;

    // Card width + Gap (16px)
    return card.offsetWidth + gap; 
  };

  // 3. Lägg till click listeners, igen med arrow functions (callback specifikt i detta fall)
  // 'left' i denna context (med scrollBy) betyder "Horizontal Offset."
  // För att scrolla i motsatta riktiningen lägger vi bara till ett minus för att signalera "motsatt"
  // UPDATE: Nu med "Rewind Loop Logic"! Om vi är i slutet av the carousel och trycker igen hamnar vi i början
  
  
  nextBtn.addEventListener('click', () => {
    // Räkna ut maximum possible scroll position
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    
    // Kolla ifall vi är nära (eller väldigt nära) slutet av the carousel
    // Vi använder ">= maxScrollLeft - 1" som en buffer för att hantera tiny pixel calculation differences
    if (track.scrollLeft >= maxScrollLeft - 1) {
        // Loopa tillbaka till början av the carousel!
        // Vi gör detta med scrollTo istället för scrollBy
        track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {  
        // Vår tidigare kod för att scrolla till höger!
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' })
    }
  });

  prevBtn.addEventListener('click', () => {
    // Kolla ifall vi är i början av the carousel
    if (track.scrollLeft <= 0) {
        // Loopa till slutet
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
        // Scrolla till vänster som vanligt
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
    }
  });