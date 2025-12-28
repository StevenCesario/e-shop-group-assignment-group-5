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