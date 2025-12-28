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
  nextBtn.addEventListener('click', () => {
    // Scrolla till höger
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth'} )
  });

  prevBtn.addEventListener('click', () => {
    // Scrolla till vänster
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth'})
  });