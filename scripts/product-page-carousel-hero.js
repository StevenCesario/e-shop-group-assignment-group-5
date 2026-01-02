// Vi använder DOMContentLoaded eventet för att garantera att HTML "skelettet" har laddat och skriptet
// säkert kan referera de element vi använder getElementById och querySelectorAll på. DOMContentLoaded
// väntar endast på DOM elements, inte på bilder och CSS!
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('product-main-image'); // Har nu id så att vi kan fetcha smidigt

    // Safety check! Kör scriptet om och endast om vi hittar bilden!
    if (!mainImage) {
        console.error("Oops! Kunde inte hitta 'product-main-image'. Kontrollera ditt HTML ID.");
        return; // Stoppar skriptet här så det inte kraschar
    }

    const sourceTags = document.querySelectorAll('.hero-source'); // Våra source tags som vi satt upp tidigare. The querySelectorAll method returnerar en NodeList!
    const thumbnails = document.querySelectorAll('.hero-thumbnails .thumbnail');

    // Lagra the original hero jpg source
    const originalMainSrc = mainImage.getAttribute('src');

    // Lagra the original srcsets so att vi kan återkalla de senare när det behövs!
    const originalSrcsets = []; // Initialisera som en tom Array
    sourceTags.forEach(source => { // Gå igenom vår sourceTags NodeList (NodeLists kan också använda the Array method 'forEach'! Men inte 'push'. De är "read-only objects for the interweb")
        originalSrcsets.push({ // För varje source i the sourceTags NodeList, append ett Object (Python Dict equivalent) med nycklarna...
            element: source, // ... 'element' för the source tag i vår sourceTags NodeList...
            srcset: source.getAttribute('srcset') // ... och the actual source set srcset vilket vi får genom the getAttribute method
        });
    });

    thumbnails.forEach(thumbnail => { // For each thumbnail i vår thumbnails NodeList... (använder oxå querySelectorAll!)
        thumbnail.addEventListener('click', function() { // ...lägg till en click eventListener som...
            // 1. Tar bort 'active' class:en från *alla* thumbnails
            thumbnails.forEach(t => t.classList.remove('active')); // Vi har redan använt 'thumbnail' i forEach så vi kör bara 't' här
            // 2. Lägger till 'active' class:en på den thumbnail användaren precis klickat på
            this.classList.add('active');

            const targetImage = this.getAttribute('data-image-src');

            if (targetImage === 'reset') {
                // Återkalla vår high quality hero image!
                originalSrcsets.forEach(item => {
                    item.element.setAttribute('srcset', item.srcset);
                });

                mainImage.src = originalMainSrc;
            } else {
                // Visa en "simpel" jpg
                sourceTags.forEach(source => {
                    source.removeAttribute('srcset');
                });

                mainImage.src = targetImage;
            }
        });
    });
});